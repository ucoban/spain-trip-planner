/* The travel wallet itself.
 *
 *   GET    /api/docs  — every document, rebuilt from the store's pathnames
 *   POST   /api/docs  — multipart { file, act } → one uploaded document
 *   PATCH  /api/docs  — { pathname, act } → re-pin a document to another stop
 *   DELETE /api/docs  — { pathname } → remove a document
 */
import { del, list, put, rename } from '@vercel/blob';
import { isUnlocked, json, locked } from './_auth.js';
import { MAX_BYTES, ROOT, newId, parsePath, pathFor, safeSegment } from './_wallet.js';

async function readBody(request) {
  try { return await request.json(); } catch { return {}; }
}

// Reject anything that isn't a pathname this app wrote. parsePath is strict
// about shape, so traversal attempts never reach a Blob call.
function resolve(pathname) {
  const doc = parsePath(pathname);
  return doc && doc.pathname === pathname ? doc : null;
}

async function listDocs() {
  const docs = [];
  let cursor;
  do {
    const page = await list({ prefix: ROOT + '/', limit: 1000, cursor });
    for (const blob of page.blobs) {
      const doc = parsePath(blob.pathname);
      if (doc) docs.push({ ...doc, size: blob.size, uploadedAt: blob.uploadedAt });
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  docs.sort((a, b) => String(a.uploadedAt).localeCompare(String(b.uploadedAt)));
  return docs;
}

// Named method exports — see api/unlock.js for why there's no default.
async function handler(request) {
  if (!isUnlocked(request)) return locked();

  try {
    if (request.method === 'GET') {
      return json({ docs: await listDocs() });
    }

    if (request.method === 'POST') {
      const form = await request.formData();
      const file = form.get('file');
      if (!file || typeof file.arrayBuffer !== 'function') {
        return json({ error: 'No file in the request.' }, 400);
      }
      if (file.size === 0) return json({ error: 'That file is empty.' }, 400);
      if (file.size > MAX_BYTES) {
        return json({ error: `${file.name || 'That file'} is over 4 MB — too big for the wallet.` }, 413);
      }

      const name = file.name || 'document';
      const pathname = pathFor(form.get('act'), newId(), name);
      const blob = await put(pathname, file, {
        access: 'private',
        addRandomSuffix: false,
        contentType: file.type || 'application/octet-stream'
      });

      return json({ doc: { ...parsePath(blob.pathname), size: file.size, uploadedAt: new Date().toISOString() } });
    }

    if (request.method === 'PATCH') {
      const { pathname, act } = await readBody(request);
      const doc = resolve(pathname);
      if (!doc) return json({ error: 'Unknown document.' }, 400);

      const target = pathFor(act, doc.id, doc.name);
      if (target === doc.pathname) return json({ doc });

      const moved = await rename(doc.pathname, target, { access: 'private' });
      return json({ doc: parsePath(moved.pathname) });
    }

    if (request.method === 'DELETE') {
      const { pathname } = await readBody(request);
      const doc = resolve(pathname);
      if (!doc) return json({ error: 'Unknown document.' }, 400);
      await del(doc.pathname);
      return json({ ok: true });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('wallet error', error);
    return json({ error: 'The wallet is unreachable right now.' }, 502);
  }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
