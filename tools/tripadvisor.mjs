/**
 * What the crowd thinks of each stop, from Tripadvisor via maviapi.
 *
 *   node tools/tripadvisor.mjs            # every trip, rewrite ratings.js
 *   node tools/tripadvisor.mjs mallorca   # one trip, merged into the rest
 *   node tools/tripadvisor.mjs --dry      # print the report, write nothing
 *
 * Needs a maviapi key: MAVIAPI_KEY, or ~/.maviapi-key.
 *
 * Why a rating and not a photograph
 * ---------------------------------
 * Tripadvisor was the obvious place to get pictures from and it cannot do it:
 * /attractions returns rating, review count, category and coordinates but no
 * image at all, only /restaurants carries one, and /place — the detail
 * endpoint that would have had a gallery — answers scrape_failed for every id
 * and type tried (checked again 2026-08-16). What it does have is the thing
 * Wikimedia has not got: sixteen thousand people saying what they made of the
 * cathedral. So that is what it is used for.
 *
 * It is worth having next to our own plan precisely when it disagrees with it.
 * Banys Àrabs is 3.4 and Platja de Palma is 3.7 — both are in the itinerary on
 * purpose, and a reader deciding what to drop on a hot afternoon deserves to
 * know which ones the crowd found underwhelming.
 *
 * The wrong-place trap
 * -------------------
 * These endpoints answer an unresolvable name with a different place rather
 * than an error: searching "Ferrocarril de Sóller" returns the *Madrid*
 * railway museum, cheerfully, with a real rating. So every hit has to survive
 * the same name check the photographs do, and a stop that fails it gets no
 * rating rather than somebody else's.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = 'https://api.maviapi.com/v1/sites/tripadvisor';

const KEY = process.env.MAVIAPI_KEY || (() => {
  try { return readFileSync(join(homedir(), '.maviapi-key'), 'utf8').trim(); } catch (e) { return null; }
})();
if (!KEY) {
  console.error('No maviapi key: set MAVIAPI_KEY or write one to ~/.maviapi-key');
  process.exit(1);
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const only = args.filter(a => !a.startsWith('--'));

const nap = ms => new Promise(r => setTimeout(r, ms));

async function get(path) {
  for (let i = 0; i < 3; i++) {
    const r = await fetch(API + path, { headers: { Authorization: 'Bearer ' + KEY } });
    const body = await r.text();
    try {
      const d = JSON.parse(body);
      if (d.error === 'scrape_failed' && i < 2) { await nap(1500 * (i + 1)); continue; }
      return d;
    } catch (e) { await nap(1500 * (i + 1)); }
  }
  return null;
}

const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** The same guard the photographs use, for the same reason. */
function matches(query, name) {
  const q = fold(query.split(',')[0]);
  const t = fold(name);
  if (t.includes(q) || q.includes(t)) return true;
  const words = q.split(' ').filter(w => w.length > 3);
  return words.length > 1 && words.every(w => t.includes(w));
}

// One list per geo, reused across every stop in that town.
const lists = new Map();
async function listing(kind, geo) {
  const key = kind + ':' + geo;
  if (!lists.has(key)) {
    const d = await get('/' + kind + '?geo=' + geo);
    lists.set(key, d?.data?.[kind] || []);
    await nap(300);
  }
  return lists.get(key);
}

/**
 * Resolve one place to its rating. The search hit's URL carries both ids —
 * `-g187463-d244037-` — which is the only way to learn which town's list to
 * look the place up in.
 */
async function rate(query) {
  // The itinerary's map queries carry a street address so Google Maps lands
  // on the right door — "Banys Àrabs, Carrer de Can Serra 7, Palma". That is
  // noise to a place search, so the bare name gets a second go.
  const terms = [query];
  const bare = query.split(',')[0].trim();
  if (bare !== query) terms.push(bare);

  for (const term of terms) {
    const hit = await search(term, query);
    if (hit) return hit;
    await nap(200);
  }
  return null;
}

async function search(term, query) {
  const d = await get('/search?q=' + encodeURIComponent(term));
  const hits = (d?.data?.results || []).filter(h => /Attraction_Review|Restaurant_Review/.test(h.url || ''));
  for (const hit of hits.slice(0, 4)) {
    if (!matches(query, hit.name || '')) continue;
    const m = /-g(\d+)-d(\d+)-/.exec(hit.url);
    if (!m) continue;
    const [, geo, det] = m;
    const kind = /Restaurant_Review/.test(hit.url) ? 'restaurants' : 'attractions';
    const found = (await listing(kind, geo)).find(x => String(x.id) === det);
    // The listing is the town's top thirty and does not page, so a real place
    // outside it has a URL and a name but no rating we can quote.
    if (!found || !found.rating) continue;
    return {
      rating: found.rating, reviews: found.review_count || null,
      cat: found.category || (found.cuisine || [])[0] || null,
      url: hit.url.split('?')[0], name: found.name
    };
  }
  return null;
}

// The stops worth rating are the ones worth photographing: real places rather
// than buses and hotel breakfasts. So the same list drives both, and the
// search term is the Google Maps query the itinerary already carries.
const queries = JSON.parse(readFileSync(join(ROOT, 'tools/photo-queries.json'), 'utf8'));
delete queries._;

global.window = { TRIPS: {} };
for (const f of ['trip-italy.js', 'trip-mallorca.js']) {
  new Function('window', readFileSync(join(ROOT, f), 'utf8'))(window);
}
// España's itinerary lives in app.js rather than in a trip file.
const builtIn = (() => {
  const src = readFileSync(join(ROOT, 'app.js'), 'utf8');
  const block = src.match(/const BUILT_IN_MAPS = \{([\s\S]*?)\n  \};/);
  const out = {};
  for (const line of (block ? block[1] : '').split('\n')) {
    const m = line.match(/^\s*(\w+): '((?:[^'\\]|\\.)*)'/);
    if (m) out[m[1]] = m[2].replace(/\\'/g, "'");
  }
  return out;
})();
const mapsFor = trip => trip === 'spain' ? builtIn : (window.TRIPS[trip] || {}).maps || {};

const out = {};
const report = [];
for (const [trip, stops] of Object.entries(queries)) {
  if (only.length && !only.includes(trip)) continue;
  out[trip] = {};
  const maps = mapsFor(trip);
  for (const act of Object.keys(stops)) {
    const q = maps[act];
    if (!q) { report.push([trip, act, '(no map query)', null]); continue; }
    let got = null;
    try { got = await rate(q); } catch (e) { console.error(act, q, e.message); }
    report.push([trip, act, q, got]);
    if (got) out[trip][act] = { rating: got.rating, reviews: got.reviews, cat: got.cat, url: got.url };
    await nap(250);
  }
}

const width = report.reduce((n, r) => Math.max(n, r[2].length), 0);
report.forEach(([trip, act, q, got]) => console.log(
  (got ? '  ' : '· ') + trip.padEnd(9) + act.padEnd(7) + q.padEnd(width + 2) +
  (got ? String(got.rating).padStart(3) + ' (' + got.reviews + ')  ' + got.name : 'no rating')));
console.log('\n' + report.filter(r => r[3]).length + '/' + report.length + ' stops rated');
if (dry) process.exit(0);

const target = join(ROOT, 'ratings.js');
let existing = {};
try {
  const src = readFileSync(target, 'utf8');
  existing = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
} catch (e) { /* first run */ }

const merged = { ...existing, ...out };
const body = Object.entries(merged).map(([trip, stops]) =>
  '  "' + trip + '": {\n' + Object.entries(stops).map(([act, r]) =>
    '    "' + act + '": ' + JSON.stringify(r)).join(',\n') + '\n  }').join(',\n');

writeFileSync(target,
  '/* What Tripadvisor\'s reviewers make of each stop — generated, do not hand-edit.\n' +
  ' *\n' +
  ' * Rating, review count and the review page, per stop id, resolved through\n' +
  ' * maviapi. Shown on the card as a chip beside the price. Only stops the\n' +
  ' * search could confirm are here: a place whose name did not survive the\n' +
  ' * check gets no rating rather than another town\'s.\n' +
  ' *\n' +
  ' * Regenerate:  node tools/tripadvisor.mjs\n' +
  ' */\n' +
  'window.RATINGS = {\n' + body + '\n};\n');
console.log('wrote ratings.js');
