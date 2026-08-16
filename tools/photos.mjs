/**
 * Resolve one photograph per itinerary stop, and write photos.js.
 *
 *   node tools/photos.mjs            # resolve everything, rewrite photos.js
 *   node tools/photos.mjs mallorca   # only that trip, merged into the rest
 *   node tools/photos.mjs --dry      # print the report, write nothing
 *
 * Where the pictures come from
 * ----------------------------
 * Wikipedia's lead image, which lives on Wikimedia Commons and comes with the
 * one thing a stock photo API will not give you: a named author and a licence
 * you are allowed to publish under. Both are carried into photos.js and shown
 * in the viewer, because CC-BY-SA is only free if you actually attribute it.
 *
 * The alternative was Google Images through maviapi (/v1/sites/google/images),
 * which resolves anything but hands back a hotlink with no rights attached —
 * fine for research inside an agent, wrong for a page we publish. maviapi is
 * still the last resort for a stop Wikipedia has never heard of; set
 * MAVIAPI_KEY and it will try GetYourGuide's tour photography, which at least
 * ships with a licence to display.
 *
 * The output is static: URLs are baked into photos.js at build time, so the
 * site makes no API calls, needs no key in the browser, and cannot break on
 * somebody else's rate limit while it is being read on a beach.
 *
 * Why the matching is strict
 * --------------------------
 * The first version of this script let Wikipedia's search pick the article.
 * It answered "El Carmen, Valencia" with El Cid, "Santa Catalina, Palma" with
 * a 15th-century saint, and three different Mallorcan stops with the same
 * generic city photo. A picture that is confidently of the wrong place is
 * worse than no picture, so nothing is accepted now unless the article's own
 * title still looks like the thing that was asked for — and a stop that fails
 * that test is reported as a MISS to be pinned by hand, not quietly filled.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'celik-trip-planner/1.0 (https://github.com/ucoban/spain-trip-planner; b.blut95@gmail.com)';
const THUMB = 900;

// Where a place is most likely to have its own article: English first, then
// the languages actually spoken where these trips go.
const WIKIS = ['en', 'es', 'ca', 'it', 'de'];

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const only = args.filter(a => !a.startsWith('--'));

const queries = JSON.parse(readFileSync(join(ROOT, 'tools/photo-queries.json'), 'utf8'));
delete queries._;

const nap = ms => new Promise(r => setTimeout(r, ms));

// Wikimedia answers a burst with a plain-text "You are making too many
// requests", not JSON and not a 429, so the retry has to be on the parse.
async function api(host, params) {
  const url = new URL('https://' + host + '/w/api.php');
  Object.entries({ format: 'json', formatversion: 2, ...params }).forEach(([k, v]) => url.searchParams.set(k, v));
  for (let i = 0; i < 5; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    const body = await r.text();
    try { return JSON.parse(body); } catch (e) { await nap(1200 * (i + 1)); }
  }
  throw new Error(host + ': rate limited');
}

// Wikipedia hangs utm_* on the URLs it hands out; that is tracking, not
// addressing, and it would sit in our HTML forever.
const clean = u => (u || '').split('?')[0];

// "Sóller" and "Soller", "Plaça d'Espanya" and "Placa d Espanya" are the same
// place to a reader and must be the same string to the matcher.
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Does this article plausibly answer the query? The query's leading phrase —
 * everything before the disambiguating comma — has to survive in the title.
 * "Casa Milà" → "La Pedrera, Barcelona" fails on the words but is a known
 * alias, so aliases get their own escape hatch in the queries file.
 */
function matches(query, title) {
  const q = fold(query.split(',')[0]);
  const t = fold(title);
  if (t.includes(q) || q.includes(t)) return true;
  // A multi-word query matches if every word of it is in the title, so
  // "Ancient Theatre of Taormina" still accepts "Ancient theatre of Taormina".
  const words = q.split(' ').filter(w => w.length > 3);
  return words.length > 1 && words.every(w => t.includes(w));
}

/** The article's lead image, following redirects, or null. */
async function leadImage(lang, title) {
  const d = await api(lang + '.wikipedia.org', {
    action: 'query', redirects: 1, titles: title,
    prop: 'pageimages', piprop: 'original|name|thumbnail', pithumbsize: THUMB
  });
  const page = (d.query?.pages || [])[0];
  if (!page || page.missing || !page.pageimage) return null;
  // Coats of arms and locator maps are what an article falls back on when it
  // has no photograph. They are drawings of a place, not pictures of it.
  if (/\.svg$/i.test(page.pageimage)) return null;
  return {
    article: lang + ':' + page.title,
    file: page.pageimage,
    lang,
    src: clean(page.thumbnail?.source) || clean(page.original?.source),
    w: page.thumbnail?.width || page.original?.width,
    h: page.thumbnail?.height || page.original?.height
  };
}

/** Straight into the Commons file namespace, for places with no article. */
async function commonsFile(q) {
  const d = await api('commons.wikimedia.org', {
    action: 'query', list: 'search', srsearch: q, srnamespace: 6, srlimit: 12
  });
  for (const hit of d.query?.search || []) {
    const name = hit.title.replace(/^File:/, '');
    if (!/\.(jpe?g|png)$/i.test(name)) continue;
    if (!matches(q, name)) continue;
    const info = await api('commons.wikimedia.org', {
      action: 'query', titles: hit.title, prop: 'imageinfo',
      iiprop: 'url', iiurlwidth: THUMB
    });
    const ii = (info.query?.pages || [])[0]?.imageinfo?.[0];
    if (!ii) continue;
    return { article: 'commons:' + name, file: name, src: ii.thumburl, w: ii.thumbwidth, h: ii.thumbheight };
  }
  return null;
}

/** Author and licence, from Commons first and the local wiki as backstop. */
async function credit(file, lang) {
  for (const host of ['commons.wikimedia.org', (lang || 'en') + '.wikipedia.org']) {
    const d = await api(host, {
      action: 'query', titles: 'File:' + file, prop: 'imageinfo',
      iiprop: 'extmetadata|url', iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl|Credit'
    });
    const info = (d.query?.pages || [])[0]?.imageinfo?.[0];
    if (!info) continue;
    const m = info.extmetadata || {};
    const text = v => (v?.value || '')
      .replace(/<[^>]*>/g, ' ')          // the API returns HTML for Artist
      .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ').trim();
    const by = text(m.Artist) || text(m.Credit) || null;
    return {
      by: by && by.length < 80 ? by : (by ? by.slice(0, 77) + '…' : null),
      lic: text(m.LicenseShortName) || null,
      licUrl: m.LicenseUrl?.value || null,
      page: info.descriptionurl || null
    };
  }
  return {};
}

/**
 * Last resort: a tour operator's photograph of the same place. Licensed for
 * display, unattributed by name, and only reached when Wikimedia has nothing.
 */
async function viaMaviapi(q) {
  const key = process.env.MAVIAPI_KEY;
  if (!key) return null;
  const slug = fold(q).replace(/ /g, '-');
  const r = await fetch('https://api.maviapi.com/v1/sites/getyourguide/activities/' + slug,
    { headers: { Authorization: 'Bearer ' + key } });
  if (!r.ok) return null;
  const hit = (await r.json())?.data?.activities?.[0];
  if (!hit?.image) return null;
  // The listing thumbnail is 68px wide; the same path serves any size.
  return { article: 'getyourguide:' + hit.id, src: hit.image.replace(/\/\d+\.jpg$/, '/' + THUMB + '.jpg'),
    by: 'GetYourGuide', page: hit.url };
}

/**
 * A query is either a plain name, or one of two explicit pins for the cases
 * where guessing has already been shown not to work:
 *   "ca:Reial Cartoixa de Valldemossa"  — this exact article, this wiki
 *   "commons:Platja d'en Repic"         — search Commons files, skip articles
 *   "file:Some Photo.jpg"               — this exact photograph, no searching
 */
async function resolve(q) {
  const pinned = /^([a-z]{2}|commons|file):(.+)$/.exec(q);

  if (pinned && pinned[1] === 'file') {
    const name = pinned[2];
    const info = await api('commons.wikimedia.org', {
      action: 'query', titles: 'File:' + name, prop: 'imageinfo', iiprop: 'url', iiurlwidth: THUMB
    });
    const ii = (info.query?.pages || [])[0]?.imageinfo?.[0];
    if (!ii) return null;
    return { article: 'file:' + name, ...(await credit(name)), src: ii.thumburl, w: ii.thumbwidth, h: ii.thumbheight };
  }

  if (pinned && pinned[1] === 'commons') {
    const hit = await commonsFile(pinned[2]);
    return hit ? { ...hit, ...(await credit(hit.file)) } : null;
  }

  if (pinned) {
    const hit = await leadImage(pinned[1], pinned[2]);
    return hit ? { ...hit, ...(await credit(hit.file, hit.lang)) } : null;
  }

  // Unpinned: the exact title on each wiki in turn, and the title has to
  // survive the redirect still looking like what was asked for.
  for (const lang of WIKIS) {
    const hit = await leadImage(lang, q);
    if (hit && matches(q, hit.article.slice(3))) return { ...hit, ...(await credit(hit.file, lang)) };
  }
  const hit = await commonsFile(q);
  if (hit) return { ...hit, ...(await credit(hit.file)) };
  return viaMaviapi(q);
}

const out = {};
const report = [];
for (const [trip, stops] of Object.entries(queries)) {
  if (only.length && !only.includes(trip)) continue;
  out[trip] = {};
  for (const [act, q] of Object.entries(stops)) {
    let got = null;
    try { got = await resolve(q); } catch (e) { console.error(act, q, e.message); }
    await nap(250);
    report.push([trip, act, q, got ? got.article : 'MISS']);
    if (!got) continue;
    out[trip][act] = {
      src: got.src, w: got.w, h: got.h,
      by: got.by || null, lic: got.lic || null, licUrl: got.licUrl || null, page: got.page || null
    };
  }
}

const width = report.reduce((n, r) => Math.max(n, r[2].length), 0);
report.forEach(r => console.log(
  (r[3] === 'MISS' ? '✗ ' : '  ') + r[0].padEnd(9) + r[1].padEnd(7) + r[2].padEnd(width + 2) + '→ ' + r[3]));
console.log('\n' + report.filter(r => r[3] !== 'MISS').length + '/' + report.length + ' resolved');
if (dry) process.exit(0);

// Merge, so resolving one trip does not drop the others.
const target = join(ROOT, 'photos.js');
let existing = {};
try {
  const src = readFileSync(target, 'utf8');
  existing = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
} catch (e) { /* first run */ }

// Keys are quoted so this file parses as JSON on the next run — that is the
// whole mechanism by which resolving one trip keeps the other two.
const merged = { ...existing, ...out };
const body = Object.entries(merged).map(([trip, stops]) =>
  '  "' + trip + '": {\n' + Object.entries(stops).map(([act, p]) =>
    '    "' + act + '": ' + JSON.stringify(p)).join(',\n') + '\n  }').join(',\n');

writeFileSync(target,
  '/* One photograph per itinerary stop — generated, do not hand-edit.\n' +
  ' *\n' +
  ' * Wikimedia Commons pictures carrying the author and licence they were\n' +
  ' * published under, resolved from tools/photo-queries.json. app.js hangs\n' +
  ' * them off the stop cards and shows the credit in the viewer, which is\n' +
  ' * the condition on using them at all.\n' +
  ' *\n' +
  ' * Regenerate:  node tools/photos.mjs\n' +
  ' */\n' +
  'window.PHOTOS = {\n' + body + '\n};\n');
console.log('wrote photos.js');
