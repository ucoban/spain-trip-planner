/* GET  /api/unlock — is this browser already unlocked?
 * POST /api/unlock — { passphrase } → sets the unlock cookie.
 */
import { checkPassphrase, clearCookie, configured, isUnlocked, issueCookie, json } from './_auth.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(request) {
  if (request.method === 'GET') {
    return json({ unlocked: isUnlocked(request), configured: configured() });
  }

  if (request.method === 'DELETE') {
    return json({ unlocked: false }, 200, { 'Set-Cookie': clearCookie() });
  }

  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (!configured()) {
    return json({ error: 'WALLET_PASSPHRASE is not set on this deployment.' }, 500);
  }

  let body = {};
  try { body = await request.json(); } catch { /* falls through to the check below */ }

  if (!checkPassphrase(body.passphrase)) {
    // There's no request store to rate-limit against, so make each wrong
    // guess cost a second. Enough to make an online brute force pointless
    // against a decent passphrase.
    await sleep(1000);
    return json({ error: 'Wrong passphrase.' }, 401);
  }

  return json({ unlocked: true }, 200, { 'Set-Cookie': issueCookie() });
}
