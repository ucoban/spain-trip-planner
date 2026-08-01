/* Shared-passphrase gate for the travel wallet.
 *
 * The site itself is public — the itinerary isn't a secret. The documents
 * are: boarding passes carry full names and booking references. So every
 * /api route that touches the Blob store checks for an unlock cookie first.
 *
 * The cookie is `<expiry>.<HMAC(expiry, WALLET_PASSPHRASE)>` — a signed
 * timestamp, not the passphrase itself, so a leaked cookie expires on its
 * own and never reveals what to type. It's HttpOnly so page scripts can't
 * read it, and Lax so the browser still attaches it to the <img>, <iframe>
 * and download requests that /api/file serves.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'wallet';
const TTL = 60 * 60 * 24 * 30; // 30 days — comfortably past the return flight

const passphrase = () => process.env.WALLET_PASSPHRASE || '';

// Compare digests rather than the raw strings: timingSafeEqual throws on a
// length mismatch, and the throw itself would leak the passphrase length.
function safeEqual(a, b) {
  const digest = s => createHmac('sha256', 'compare').update(String(s)).digest();
  return timingSafeEqual(digest(a), digest(b));
}

const sign = exp => createHmac('sha256', passphrase()).update(String(exp)).digest('hex');

export const configured = () => passphrase().length > 0;

export function checkPassphrase(input) {
  return configured() && typeof input === 'string' && input.length > 0 && safeEqual(input, passphrase());
}

export function issueCookie() {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  return `${COOKIE}=${exp}.${sign(exp)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${TTL}`;
}

export const clearCookie = () => `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;

export function isUnlocked(request) {
  if (!configured()) return false;
  const match = (request.headers.get('cookie') || '').match(/(?:^|;\s*)wallet=([^;]+)/);
  if (!match) return false;
  const [exp, mac] = match[1].split('.');
  if (!exp || !mac || !/^\d+$/.test(exp)) return false;
  if (Number(exp) * 1000 <= Date.now()) return false;
  return safeEqual(mac, sign(exp));
}

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, no-store', ...headers }
  });

export const locked = () => json({ error: 'Locked — unlock the wallet first.' }, 401);
