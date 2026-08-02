/* The plan itself, once somebody replans it.
 *
 *   GET /api/itinerary — the saved plan, or { plan: null } if nobody has
 *                        changed anything yet (the site then uses the plan
 *                        baked into app.js and i18n.js)
 *   PUT /api/itinerary — { plan } → validate, store, echo back
 *
 * Like the wallet, the plan lives in the private Blob store so an edit made
 * on the laptop shows up on Izem's phone. Unlike the wallet, reading it is
 * public — the itinerary was never a secret, it ships in the page source.
 * Writing goes through the same unlock cookie as everything else.
 */
import { get, put } from '@vercel/blob';
import { isUnlocked, json, locked } from './_auth.js';

const PATH = 'itinerary/plan.json';
const LANGS = ['en', 'tr'];
const CATS = ['travel', 'sights', 'museum', 'boat', 'swim', 'food', 'event'];
const DAY_COUNT = 7; // 8-14 August — the dates are the one thing not editable

const ID = /^[A-Za-z0-9_-]{1,32}$/; // must survive _wallet.js safeSegment intact
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX_ACTS_PER_DAY = 24;
const MAX_BOOKINGS = 40;
const MAX_JSON = 400_000;

const bad = () => json({ error: 'That plan does not look right.' }, 400);

// A per-language text field: { en: '…', tr: '…' }. Trims and caps each
// language; `required` means at least one language has to say something.
function words(value, max, required) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const out = {};
  for (const lang of LANGS) {
    const s = typeof value[lang] === 'string' ? value[lang].trim() : '';
    out[lang] = s.slice(0, max);
  }
  if (required && !LANGS.some(lang => out[lang])) return null;
  return out;
}

function cleanAct(act, seen) {
  if (!act || typeof act !== 'object') return null;
  if (typeof act.id !== 'string' || !ID.test(act.id) || seen.has(act.id)) return null;
  seen.add(act.id);
  if (typeof act.t !== 'string' || !TIME.test(act.t)) return null;
  if (!CATS.includes(act.cat)) return null;

  let eur = null;
  if (act.eur != null) {
    eur = Number(act.eur);
    if (!Number.isFinite(eur) || eur < 0 || eur > 100000) return null;
    eur = Math.round(eur * 100) / 100;
  }

  const title = words(act.title, 200, true);
  const desc = words(act.desc, 4000, false);
  const tip = words(act.tip, 2000, false);
  if (!title || !desc || !tip) return null;

  return { id: act.id, t: act.t, cat: act.cat, eur, title, desc, tip };
}

// Rebuild the plan field by field rather than storing what the client sent:
// anything not on this list never reaches the store.
function cleanPlan(plan) {
  if (!plan || typeof plan !== 'object') return null;
  if (!Array.isArray(plan.days) || plan.days.length !== DAY_COUNT) return null;
  if (!Array.isArray(plan.bookings) || plan.bookings.length > MAX_BOOKINGS) return null;

  const seen = new Set();
  const days = [];
  for (const day of plan.days) {
    if (!day || typeof day !== 'object') return null;
    const title = words(day.title, 200, true);
    const city = words(day.city, 100, false);
    const sub = words(day.sub, 400, false);
    if (!title || !city || !sub) return null;
    if (!Array.isArray(day.acts) || day.acts.length > MAX_ACTS_PER_DAY) return null;
    const acts = [];
    for (const act of day.acts) {
      const clean = cleanAct(act, seen);
      if (!clean) return null;
      acts.push(clean);
    }
    days.push({ title, city, sub, acts });
  }

  const bookings = [];
  for (const row of plan.bookings) {
    if (!row || typeof row !== 'object') return null;
    if (typeof row.id !== 'string' || !ID.test(row.id) || seen.has(row.id)) return null;
    seen.add(row.id);
    const text = words(row.text, 400, true);
    if (!text) return null;
    bookings.push({ id: row.id, text });
  }

  const clean = { v: 1, days, bookings };
  return JSON.stringify(clean).length > MAX_JSON ? null : clean;
}

export default async function handler(request) {
  try {
    if (request.method === 'GET') {
      const result = await get(PATH, { access: 'private' });
      if (!result) return json({ plan: null });
      let plan = null;
      try { plan = JSON.parse(await new Response(result.stream).text()); } catch { /* corrupt → act unsaved */ }
      return json({ plan });
    }

    if (request.method === 'PUT') {
      if (!isUnlocked(request)) return locked();
      let body = {};
      try { body = await request.json(); } catch { return bad(); }
      const plan = cleanPlan(body.plan);
      if (!plan) return bad();
      await put(PATH, JSON.stringify(plan), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json'
      });
      return json({ plan });
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('itinerary error', error);
    return json({ error: 'The plan is unreachable right now.' }, 502);
  }
}
