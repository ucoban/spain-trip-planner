/**
 * Resolve a small gallery of photographs per itinerary stop, and write
 * photos.js.
 *
 *   node tools/photos.mjs            # resolve everything, rewrite photos.js
 *   node tools/photos.mjs mallorca   # only that trip, merged into the rest
 *   node tools/photos.mjs --dry      # print the report, write nothing
 *
 * Where the pictures come from
 * ----------------------------
 * Wikimedia Commons, which is the only source that hands over a named author
 * and a licence with the file. Both are carried into photos.js and shown in
 * the viewer, because CC-BY-SA is only free if you actually attribute it.
 *
 * Tripadvisor was the obvious alternative and cannot do this job: its
 * /attractions endpoint returns rating, review count, category and
 * coordinates but **no image at all**, only /restaurants carries one, and
 * /place — the one detail endpoint that might have had a gallery — has
 * returned scrape_failed for every id and type tried. maviapi's Google
 * Images endpoint resolves anything but hands back hotlinks with no rights
 * attached: fine inside an agent's research, wrong on a page we publish.
 * maviapi stays as the last resort here (GetYourGuide tour photography, at
 * least licensed for display) for a place Wikimedia has never photographed.
 *
 * The output is static: URLs are baked into photos.js at build time, so the
 * site makes no API calls, needs no key in the browser, and cannot break on
 * somebody else's rate limit while it is being read on a beach.
 *
 * Why the matching is strict
 * --------------------------
 * The first version let Wikipedia's search pick the article. It answered
 * "El Carmen, Valencia" with El Cid, "Santa Catalina, Palma" with a
 * 15th-century saint, and three Mallorcan stops with the same generic city
 * photo. A picture confidently of the wrong place is worse than no picture,
 * so nothing is accepted unless the article's own title still looks like what
 * was asked for — and a stop that fails is reported as a MISS to be pinned by
 * hand, never quietly filled.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const UA = 'celik-trip-planner/1.0 (https://github.com/ucoban/spain-trip-planner; b.blut95@gmail.com)';
// Both are Wikimedia thumbnail *buckets*. Asking for a width off the bucket
// list gets you a URL for the next one up while the API still reports the
// width you asked for — request 1200 and you are handed a 1280px path with
// thumbwidth: 1200, and if that 1280 was never generated it 404s. Asking for
// the bucket means the URL you get back is the URL that exists.
const FULL = 1280;   // what the viewer shows
const SMALL = 320;   // the card thumbnail and the filmstrip
const MAX_SHOTS = 6; // a gallery, not an archive

// Where a place is most likely to have its own article: English first, then
// the languages actually spoken where these trips go.
const WIKIS = ['en', 'es', 'ca', 'it', 'de'];

// What a category holds besides photographs of the place.
const NOT_A_PHOTO = /\.(svg|pdf|djvu|tiff?|ogv|webm|gif)$/i;
// Everything a place's Commons category holds that is not a photograph of
// the place: the maps and crests, but also the architect's plans, the
// portraits of whoever founded it, the paintings of it, the scanned deeds and
// the exhibition posters — in the four languages these categories are filed
// in. Cheap to extend, and every addition here was something that turned up
// in a gallery looking wrong.
const NOT_THE_PLACE = new RegExp('\\b(' + [
  'map|mapa|mapes|karte|kaart|carte|locator|location|localitzaci|localizaci|situaci',
  'coat[ _]of[ _]arms|escut|escudo|wappen|blas|flag|bandera|bandiera|logo|seal|segell',
  'plan|plano|plànol|planol|pianta|planta|grundriss|alzado|secci|elevation|blueprint|diagram|schema|chart',
  'portrait|retrat|retrato|ritratto|bust|busto|estatua[ _]de',
  'painting|pintura|quadre|cuadro|dipinto|gemälde|gravat|grabado|engraving|litograf|dibuix|dibujo|drawing|sketch',
  'manuscript|manuscrit|document|documento|acta|carta[ _]de|signature|firma|escritura',
  'poster|cartel|cartell|manifesto|banner|pancarta|advert|anunci',
  'stamp|sello|segell[ _]postal|banknote|coin|moneda|medalla|escudo[ _]de',
  'graph|gr\u00e1fico|timeline|cronolog|table|taula|tabla'
].join('|') + ')', 'i');
// A year in the filename, or the word for it: interesting, but not what the
// place looks like this August.
const HISTORICAL = /\b(1[5-9]\d{2}|190\d|191\d|192\d|193\d|194\d|195\d)\b|\b(historical|historic|antic|antigua?|antiguo|vintage|postal|postcard|ancienne)\b/i;

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

// "Sóller" and "Soller", "Plaça d'Espanya" and "Placa d Espanya" are the same
// place to a reader and must be the same string to the matcher.
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Does this article plausibly answer the query? The query's leading phrase —
 * everything before the disambiguating comma — has to survive in the title.
 */
function matches(query, title) {
  const q = fold(query.split(',')[0]);
  const t = fold(title);
  if (t.includes(q) || q.includes(t)) return true;
  const words = q.split(' ').filter(w => w.length > 3);
  return words.length > 1 && words.every(w => t.includes(w));
}

// Wikimedia hangs utm_* on the URLs it hands out; that is tracking, not
// addressing, and it would sit in our HTML forever.
const clean = u => (u || '').split('?')[0];

/**
 * URLs at one width for a batch of files, keyed by file name.
 *
 * Both sizes have to be *asked for*. The width sits in the thumbnail path and
 * rewriting it there looks like it should work — it does not:
 * upload.wikimedia.org serves the widths the API has generated and invents
 * nothing on demand, so a hand-edited `400px-` URL comes back 400 while the
 * `960px-` one the API handed over is fine. Hence a call per width.
 */
async function thumbs(host, files, width) {
  const out = new Map();
  for (let i = 0; i < files.length; i += 40) {
    const d = await api(host, {
      action: 'query', titles: files.slice(i, i + 40).map(f => 'File:' + f).join('|'),
      prop: 'imageinfo', iiprop: 'extmetadata|url', iiurlwidth: width,
      iiextmetadatafilter: 'Artist|LicenseShortName|LicenseUrl|Credit'
    });
    for (const page of d.query?.pages || []) {
      const info = page.imageinfo?.[0];
      if (info?.thumburl) out.set(page.title.replace(/^File:/, '').replace(/_/g, ' '), info);
    }
    await nap(150);
  }
  return out;
}

/** Author, licence and both sizes for a batch of files, keyed by file name. */
async function credits(files) {
  const out = new Map();
  for (const host of ['commons.wikimedia.org', 'en.wikipedia.org']) {
    const missing = files.filter(f => !out.has(f));
    if (!missing.length) break;
    const big = await thumbs(host, missing, FULL);
    const wee = await thumbs(host, missing, SMALL);
    for (const [name, info] of big) {
      const m = info.extmetadata || {};
      const text = v => (v?.value || '')
        .replace(/<[^>]*>/g, ' ')          // the API returns HTML for Artist
        .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ').trim();
      const by = text(m.Artist) || text(m.Credit) || null;
      out.set(name, {
        src: clean(info.thumburl), t: clean(wee.get(name)?.thumburl || info.thumburl),
        w: info.thumbwidth, h: info.thumbheight,
        by: by ? (by.length < 80 ? by : by.slice(0, 77) + '…') : null,
        lic: text(m.LicenseShortName) || null,
        licUrl: m.LicenseUrl?.value || null,
        page: info.descriptionurl || null
      });
    }
  }
  return out;
}

const usable = name => !NOT_A_PHOTO.test(name) && !NOT_THE_PLACE.test(name);

/**
 * Can this actually go on the page? Creative Commons, CC0 and public domain
 * can. GFDL and the GPL cannot, in practice: both want the whole licence text
 * carried with the work, which is a page of legalese under a photograph of a
 * castle, and some photographers pick GFDL-1.2-only precisely so that reusers
 * have to. Skipping them costs one frame out of a gallery of six.
 */
const publishable = s => !!s.lic && !/GFDL|GPL/i.test(s.lic);

/**
 * The article's lead image, the other images it illustrates itself with, and
 * the Commons category behind it.
 *
 * The article's own images matter more than they look: a Commons category is
 * whatever anyone ever filed there, in alphabetical order, so Palma
 * Cathedral's gave us an exhibition poster and a 1900s carriage before the
 * building. The images an article actually uses were chosen by someone to
 * show the subject, which is exactly the judgement we want and cannot make
 * from a filename.
 */
async function article(lang, title) {
  const d = await api(lang + '.wikipedia.org', {
    action: 'query', redirects: 1, titles: title,
    prop: 'pageimages|pageprops|images', piprop: 'name', ppprop: 'wikibase_item', imlimit: 40
  });
  const page = (d.query?.pages || [])[0];
  if (!page || page.missing) return null;
  return {
    name: lang + ':' + page.title,
    lead: page.pageimage && usable(page.pageimage) ? page.pageimage.replace(/_/g, ' ') : null,
    used: (page.images || []).map(i => i.title.replace(/^[^:]+:/, '')).filter(usable),
    item: page.pageprops?.wikibase_item || null
  };
}

/** The Commons category a place is filed under, via Wikidata's P373. */
async function commonsCategory(item) {
  if (!item) return null;
  const r = await fetch('https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json&property=P373&entity=' + item,
    { headers: { 'User-Agent': UA } });
  try {
    const d = await r.json();
    return d.claims?.P373?.[0]?.mainsnak?.datavalue?.value || null;
  } catch (e) { return null; }
}

/** Photographs filed under a Commons category. */
async function categoryFiles(category) {
  if (!category) return [];
  const d = await api('commons.wikimedia.org', {
    action: 'query', list: 'categorymembers', cmtitle: 'Category:' + category,
    cmtype: 'file', cmlimit: 60
  });
  return (d.query?.categorymembers || [])
    .map(m => m.title.replace(/^File:/, ''))
    .filter(usable);
}

/** Straight into the Commons file namespace, for places with no category. */
async function searchFiles(q, limit = 20) {
  const d = await api('commons.wikimedia.org', {
    action: 'query', list: 'search', srsearch: q, srnamespace: 6, srlimit: limit
  });
  return (d.query?.search || [])
    .map(h => h.title.replace(/^File:/, ''))
    .filter(usable)
    .filter(n => matches(q, n));
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
  const acts = (await r.json())?.data?.activities || [];
  const shots = acts.filter(a => a.image).slice(0, MAX_SHOTS).map(a => ({
    src: a.image.replace(/\/\d+\.jpg$/, '/' + FULL + '.jpg'),
    t: a.image.replace(/\/\d+\.jpg$/, '/' + SMALL + '.jpg'),
    by: 'GetYourGuide', lic: null, licUrl: null, page: a.url
  }));
  return shots.length ? { name: 'getyourguide:' + slug, files: [], shots } : null;
}

/**
 * One source of pictures. A query is either a plain name, or one of four
 * explicit pins for the cases where guessing has been shown not to work:
 *   "ca:Reial Cartoixa de Valldemossa"  — this exact article, this wiki
 *   "cat:Coves del Drac-Inside"         — this exact Commons category
 *   "commons:Tranvia de Soller"         — search Commons files, skip articles
 *   "file:Some Photo.jpg"               — this exact photograph, leading
 */
async function sources(q) {
  const pin = /^([a-z]{2}|commons|file|cat):(.+)$/.exec(q);
  const kind = pin ? pin[1] : null;
  const rest = pin ? pin[2] : q;
  let name = null, lead = null, files = [];

  if (kind === 'file') {
    name = 'file:' + rest;
    lead = rest;
    files = await searchFiles(rest.replace(/\.[a-z]+$/i, ''), 12);
  } else if (kind === 'cat') {
    name = 'cat:' + rest;
    files = await categoryFiles(rest);
  } else if (kind === 'commons') {
    name = 'commons:' + rest;
    files = await searchFiles(rest);
  } else {
    // A pinned wiki is taken at its word; an unpinned name has to survive the
    // redirect still looking like what was asked for.
    const langs = kind ? [kind] : WIKIS;
    for (const lang of langs) {
      const art = await article(lang, rest);
      if (!art) continue;
      if (!kind && !matches(rest, art.name.slice(3))) continue;
      name = art.name;
      lead = art.lead;

      // An article's images are not all of its subject: navboxes, "see also"
      // galleries and succession templates drag in neighbours, which is how
      // Toledo Cathedral turned up in Palma Cathedral's gallery. A Commons
      // category, by contrast, is on-topic by construction but ordered
      // alphabetically and full of details and oddities.
      //
      // So trust the two together most: a picture the article chose to show
      // *and* somebody filed under the place is as sure as this gets. Then
      // the rest of the category. Then the article's leftovers, but only the
      // ones whose own filename still names the place.
      const cat = await categoryFiles(await commonsCategory(art.item));
      const inCat = new Set(cat.map(f => f.replace(/_/g, ' ')));
      const used = art.used.map(f => f.replace(/_/g, ' '));
      // Only what the category vouches for. The article's other images are
      // where the plans, the founder's portrait and the neighbouring
      // cathedral come from, and no filename filter catches all of those.
      files = [...used.filter(f => inCat.has(f)), ...cat];
      break;
    }
    if (!name) {
      files = await searchFiles(rest);
      if (files.length) name = 'commons:' + rest;
    }
  }

  return { name, kind, rest, files: [lead, ...files].filter(Boolean) };
}

/**
 * The gallery for one stop. The query may be a list, in which case the first
 * entry supplies the lead photograph and the rest fill in behind it — which
 * is how a hand-picked lead keeps a category's worth of company:
 *   ["file:SES ILLETES-MAJORKA, AB-027.jpg", "cat:Illetes"]
 */
async function resolve(query0) {
  const parts = Array.isArray(query0) ? query0 : [query0];
  const got = [];
  for (const p of parts) got.push(await sources(p));

  const named = got.filter(g => g && g.name);
  if (!named.length) {
    const first = parts[0];
    return /^[a-z]+:/.test(first) ? null : viaMaviapi(first);
  }

  // Order is the order asked for; a file seen twice keeps its first place.
  const query = Array.isArray(query0) ? query0[0] : query0;
  const subject = (/^[a-z]+:(.+)$/.exec(query) || [, query])[1].replace(/\.[a-z]+$/i, '');
  const ordered = named.flatMap(g => g.files)
    .map(f => f.replace(/_/g, ' '))
    .filter((f, i, a) => a.indexOf(f) === i);
  if (!ordered.length) return null;

  // Ask for well more than needed: the size filter throws away the icons and
  // crests that survived the filename filter, and the ranking below wants
  // something to choose between.
  const meta = await credits(ordered.slice(0, MAX_SHOTS + 20));
  const candidates = ordered.map((f, i) => {
    const s = meta.get(f);
    return s && { ...s, f, i };
  }).filter(s => s && s.src && s.w >= 640 && s.h >= 360 && publishable(s));

  /**
   * The lead stays the lead. The rest are ranked, because a Commons category
   * comes back alphabetically and that puts a manhole cover and a shop sign
   * above the view of the town. Three signals, in order:
   *   — a filename that names the place beats one that doesn't: "Catedral de
   *     Palma 04" is somebody photographing the cathedral, "0051-Reiterstatur"
   *     is somebody photographing whatever caught their eye nearby;
   *   — a photograph plainly dated to before living memory is a fine last
   *     frame and a poor second one, the point being what the place looks
   *     like when you get there;
   *   — then simply the biggest, because establishing shots get taken with
   *     more care than the snap of a plaque beside them.
   */
  const rank = s => [
    matches(subject, s.f) ? 0 : 1,
    HISTORICAL.test(s.f) ? 1 : 0,
    -(s.w * s.h)
  ];
  const rest = candidates.slice(1).sort((a, b) => {
    const ra = rank(a), rb = rank(b);
    return ra[0] - rb[0] || ra[1] - rb[1] || ra[2] - rb[2];
  });

  const shots = [candidates[0], ...rest].filter(Boolean).slice(0, MAX_SHOTS);
  return shots.length ? { name: named.map(g => g.name).join(' + '), shots } : null;
}

const out = {};
const report = [];
for (const [trip, stops] of Object.entries(queries)) {
  if (only.length && !only.includes(trip)) continue;
  out[trip] = {};
  for (const [act, q] of Object.entries(stops)) {
    let got = null;
    try { got = await resolve(q); } catch (e) { console.error(act, q, e.message); }
    report.push([trip, act, [].concat(q).join(' + '), got ? got.name : 'MISS', got ? got.shots.length : 0]);
    if (got) out[trip][act] = got.shots;
    await nap(250);
  }
}

const width = report.reduce((n, r) => Math.max(n, r[2].length), 0);
report.forEach(r => console.log(
  (r[3] === 'MISS' ? '✗ ' : r[4] < 3 ? '· ' : '  ') +
  r[0].padEnd(9) + r[1].padEnd(7) + r[2].padEnd(width + 2) +
  String(r[4]).padStart(2) + ' → ' + r[3]));
const hit = report.filter(r => r[3] !== 'MISS');
console.log('\n' + hit.length + '/' + report.length + ' stops, ' +
  hit.reduce((n, r) => n + r[4], 0) + ' photographs, ' +
  report.filter(r => r[4] === 1).length + ' with only one');
if (dry) process.exit(0);

// Merge, so resolving one trip does not drop the others. Keys are quoted so
// this file parses as JSON on the next run — that is the whole mechanism.
const target = join(ROOT, 'photos.js');
let existing = {};
try {
  const src = readFileSync(target, 'utf8');
  existing = JSON.parse(src.slice(src.indexOf('{'), src.lastIndexOf('}') + 1));
} catch (e) { /* first run */ }

const merged = { ...existing, ...out };
const body = Object.entries(merged).map(([trip, stops]) =>
  '  "' + trip + '": {\n' + Object.entries(stops).map(([act, shots]) =>
    '    "' + act + '": [\n' + shots.map(s => '      ' + JSON.stringify(s)).join(',\n') + '\n    ]'
  ).join(',\n') + '\n  }').join(',\n');

writeFileSync(target,
  '/* A small gallery per itinerary stop — generated, do not hand-edit.\n' +
  ' *\n' +
  ' * Wikimedia Commons photographs carrying the author and licence they were\n' +
  ' * published under, resolved from tools/photo-queries.json. The first of\n' +
  ' * each list is the one on the card; app.js shows the rest in the viewer,\n' +
  ' * with the credit, which is the condition on using them at all.\n' +
  ' *\n' +
  ' * Regenerate:  node tools/photos.mjs\n' +
  ' */\n' +
  'window.PHOTOS = {\n' + body + '\n};\n');
console.log('wrote photos.js');
