/* Blob pathname scheme for the travel wallet.
 *
 * The pathname *is* the metadata — there's no database. A document lives at
 *
 *   wallet/<activity>/<id>/<base64url of the original filename>
 *
 * so rebuilding the whole wallet is one list() call, and re-pinning a
 * document to a different stop is one rename(). The filename is base64url
 * rather than percent-encoded because base64url is [A-Za-z0-9_-] — no '%'
 * to be double-encoded on the round trip, and no '/' to smuggle in an extra
 * path segment.
 *
 * Every segment that reaches a Blob call goes through here first, so a
 * crafted pathname can't traverse out of the wallet/ prefix.
 */
export const ROOT = 'wallet';
export const GENERAL = '_general';
export const MAX_BYTES = 4 * 1024 * 1024; // Vercel caps a Function request body at 4.5 MB

const encodeName = name => Buffer.from(String(name).slice(0, 200), 'utf8').toString('base64url');

// Activity ids come from the client, so strip them to the charset the
// itinerary actually uses. '..' and '/' cannot survive this.
export const safeSegment = value => String(value || '').replace(/[^A-Za-z0-9_-]/g, '');

export const newId = () => 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const pathFor = (act, id, name) =>
  `${ROOT}/${safeSegment(act) || GENERAL}/${safeSegment(id)}/${encodeName(name)}`;

const IMAGE = /\.(png|jpe?g|webp|avif|gif)$/i;

/** Parse a stored pathname back into a wallet entry, or null if it isn't one. */
export function parsePath(pathname) {
  const parts = String(pathname || '').split('/');
  if (parts.length !== 4 || parts[0] !== ROOT) return null;
  const [, act, id, encoded] = parts;
  if (!act || !id || !encoded) return null;
  if (safeSegment(act) !== act || safeSegment(id) !== id) return null;
  if (!/^[A-Za-z0-9_-]+$/.test(encoded)) return null;

  let name;
  try { name = Buffer.from(encoded, 'base64url').toString('utf8'); } catch { return null; }
  if (!name || name.includes('\0')) return null;

  return {
    id,
    act: act === GENERAL ? '' : act,
    name,
    pathname,
    kind: IMAGE.test(name) ? 'image' : /\.pdf$/i.test(name) ? 'pdf' : 'other'
  };
}
