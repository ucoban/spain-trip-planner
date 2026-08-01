/* GET /api/file?pathname=… — stream one private document to the browser.
 *
 * Private blobs have no publicly reachable URL, so this route is how the
 * preview <img>, the PDF <iframe> and the Download link get their bytes.
 * The unlock cookie rides along automatically because they're same-origin.
 */
import { get } from '@vercel/blob';
import { isUnlocked } from './_auth.js';
import { parsePath } from './_wallet.js';

// Only ever render these inline. Anything else — an .html or .svg upload,
// say — would otherwise execute in this origin and could pull the rest of
// the wallet out through the visitor's own session.
const INLINE = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'application/pdf'
]);

const text = (body, status) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'private, no-store' } });

export default async function handler(request) {
  if (!isUnlocked(request)) return text('Locked', 401);

  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get('pathname') || '';
  const doc = parsePath(pathname);
  if (!doc || doc.pathname !== pathname) return text('Bad request', 400);

  let result;
  try {
    result = await get(pathname, {
      access: 'private',
      ifNoneMatch: request.headers.get('if-none-match') ?? undefined
    });
  } catch (error) {
    console.error('file error', error);
    return text('Could not read that document.', 502);
  }
  if (!result) return text('Not found', 404);

  const headers = {
    ETag: result.blob.etag,
    // Cache in the browser only, and revalidate every time so the auth
    // check above runs on every request. Never s-maxage: a private blob
    // must not sit in the shared CDN cache.
    'Cache-Control': 'private, no-cache',
    'X-Content-Type-Options': 'nosniff'
  };

  if (result.statusCode === 304) return new Response(null, { status: 304, headers });

  const type = result.blob.contentType || 'application/octet-stream';
  const inline = INLINE.has(type) && !searchParams.has('download');
  // Quotes and backslashes would break out of the quoted-string.
  const filename = doc.name.replace(/["\\]/g, '_');

  return new Response(result.stream, {
    headers: {
      ...headers,
      'Content-Type': type,
      'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${filename}"`
    }
  });
}
