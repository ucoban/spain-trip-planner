/* Two trips, one site.
 *
 * The site was built around one holiday; now it holds more than one, and the
 * reader picks which on the way in. Everything that makes a trip a trip —
 * the itinerary skeleton, its words in both languages, the hotels, the map
 * geometry — lives in a `trip-<id>.js` data file that registers itself into
 * window.TRIPS. España is the exception: it is still the built-in, baked
 * into app.js / i18n.js / trip-map.html the way it always was, so its entry
 * here carries only what the picker shows. `TRIP.data` is therefore null for
 * España and the data bundle for everyone else — every consumer reads
 * "trip data, or the built-in" and stays honest about which it got.
 *
 * Loaded first and synchronously on every page, so window.TRIP exists before
 * i18n.js decides which words to serve.
 */
(() => {
  'use strict';

  const KEY = 'celik-trip';
  // The language key predates the second trip; it is site-wide, not per-trip,
  // so it keeps its old name rather than orphaning everyone's preference.
  const LANG_KEY = 'celik-spain-lang';

  const read = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  // What the picker shows. The trip's actual contents live elsewhere; this
  // is only enough to choose between them before anything else has loaded.
  const CARDS = [
    {
      id: 'spain', emoji: '🍊', hue: '--color-accent',
      title: { en: 'España', tr: 'İspanya' },
      route: { en: 'Barcelona → València', tr: 'Barcelona → València' },
      dates: { en: '8–14 August 2026', tr: '8–14 Ağustos 2026' },
      blurb: {
        en: 'Seven days, two siblings: Gaudí and Montserrat, then markets, Calatrava and lagoon sunsets.',
        tr: 'Yedi gün, iki kardeş: Gaudí ve Montserrat, ardından pazarlar, Calatrava ve albufera gün batımları.'
      },
      guide: true
    },
    {
      id: 'italy', emoji: '🍋', hue: '--color-accent-2',
      title: { en: 'Sicilia', tr: 'Sicilya' },
      route: { en: 'Palermo → Taormina', tr: 'Palermo → Taormina' },
      dates: { en: '22–29 August 2026', tr: '22–29 Ağustos 2026' },
      blurb: {
        en: 'Eight days, two shores: Norman mosaics and street food, then Etna, the Greek theatre and a bay to swim in.',
        tr: 'Sekiz gün, iki kıyı: Norman mozaikleri ve sokak lezzetleri, sonra Etna, antik tiyatro ve yüzülecek bir koy.'
      },
      guide: false
    }
  ];

  const UI = {
    en: { heading: 'Which trip?', sub: 'Pick one — the site remembers, and the switch in the nav changes it any time.', open: 'Open this plan', current: 'Showing now' },
    tr: { heading: 'Hangi tatil?', sub: 'Birini seç — site hatırlar, üstteki düğmeyle istediğin an değiştirirsin.', open: 'Bu planı aç', current: 'Şu an açık' }
  };

  const lang = (() => {
    const stored = read(LANG_KEY);
    if (stored === 'en' || stored === 'tr') return stored;
    return (navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  })();

  // ?trip=italy is how a link can point straight at one plan; it sticks, so
  // the next visit lands in the same place without the query string.
  const fromUrl = (() => {
    try {
      const q = new URLSearchParams(location.search).get('trip');
      return CARDS.some(c => c.id === q) ? q : null;
    } catch (e) { return null; }
  })();
  if (fromUrl) write(KEY, fromUrl);

  const stored = read(KEY);
  const chosen = CARDS.some(c => c.id === stored);
  const id = fromUrl || (chosen ? stored : 'spain');
  const card = CARDS.find(c => c.id === id);

  window.TRIPS = window.TRIPS || {};

  window.TRIP = {
    id,
    card,
    trips: CARDS,
    // False until the reader has actually picked; index.html shows the
    // chooser on top of España rather than a blank page while they decide.
    chosen: chosen || !!fromUrl,
    // The registered data bundle, or null when the trip is the built-in one.
    get data() { return window.TRIPS[id] || null; },
    hasGuide: !!card.guide,
    // Ticks, currency and any other per-device state are per trip: the same
    // browser holds both holidays and neither should tick the other off.
    key: name => 'celik-' + id + '-' + name,
    set(next) {
      if (!CARDS.some(c => c.id === next)) return;
      write(KEY, next);
      // Land on the plan itself: the field guide and the stays page belong
      // to a trip, and the other trip may not have them.
      const here = location.pathname.split('/').pop() || 'index.html';
      if (next !== id && here !== 'index.html' && here !== '') location.href = 'index.html';
      else location.reload();
    }
  };

  // — the picker ————————————————————————————————————————————————
  // Built here rather than in the page markup because three pages would
  // otherwise carry the same dialog, and only this file knows the trips.
  function openPicker(dismissable) {
    if (document.getElementById('tripPick')) return;
    const t = UI[lang];

    const wrap = document.createElement('div');
    wrap.id = 'tripPick';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', t.heading);
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;' +
      'padding:20px;background:rgba(28,22,14,.62);backdrop-filter:blur(3px);overflow:auto';

    const box = document.createElement('div');
    box.style.cssText = 'background:var(--color-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow-md);' +
      'padding:32px 30px;max-width:760px;width:100%;margin:auto';

    const h = document.createElement('h2');
    h.textContent = t.heading;
    h.style.cssText = 'font-family:var(--font-heading);font-weight:400;font-size:32px;margin:0 0 6px';
    const p = document.createElement('p');
    p.textContent = t.sub;
    p.style.cssText = 'margin:0 0 22px;font-size:14px;line-height:1.55;color:var(--color-neutral-700)';
    box.append(h, p);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px';

    CARDS.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = 'text-align:left;font-family:inherit;cursor:pointer;border-radius:var(--radius-lg);' +
        'padding:22px 22px 20px;background:var(--color-neutral-100);color:inherit;' +
        'border:2px solid ' + (c.id === id && window.TRIP.chosen ? 'var(' + c.hue + ')' : 'transparent') + ';' +
        'display:grid;gap:8px;transition:border-color .15s,transform .15s';
      btn.addEventListener('mouseenter', () => { btn.style.borderColor = 'var(' + c.hue + ')'; });
      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = (c.id === id && window.TRIP.chosen) ? 'var(' + c.hue + ')' : 'transparent';
      });

      const top = document.createElement('div');
      top.style.cssText = 'display:flex;align-items:center;gap:10px';
      const emoji = document.createElement('span');
      emoji.textContent = c.emoji;
      emoji.style.cssText = 'font-size:30px;line-height:1';
      const name = document.createElement('span');
      name.textContent = c.title[lang];
      name.style.cssText = 'font-family:var(--font-heading);font-size:25px';
      top.append(emoji, name);

      const route = document.createElement('div');
      route.textContent = c.route[lang];
      route.style.cssText = 'font-size:14.5px;font-weight:700;color:var(' + c.hue + '-800, var(--color-neutral-800))';

      const dates = document.createElement('div');
      dates.textContent = c.dates[lang];
      dates.style.cssText = 'font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-600)';

      const blurb = document.createElement('p');
      blurb.textContent = c.blurb[lang];
      blurb.style.cssText = 'margin:2px 0 0;font-size:13.5px;line-height:1.55;color:var(--color-neutral-700)';

      const go = document.createElement('span');
      go.textContent = (c.id === id && window.TRIP.chosen ? t.current : t.open) + ' →';
      go.style.cssText = 'font-size:13px;font-weight:700;color:var(' + c.hue + '-700, var(--color-accent-700))';

      btn.append(top, route, dates, blurb, go);
      btn.addEventListener('click', () => {
        if (c.id === id && window.TRIP.chosen) { wrap.remove(); return; }
        window.TRIP.set(c.id);
      });
      grid.appendChild(btn);
    });

    box.appendChild(grid);
    wrap.appendChild(box);

    if (dismissable) {
      wrap.addEventListener('click', e => { if (e.target === wrap) wrap.remove(); });
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { wrap.remove(); document.removeEventListener('keydown', esc); }
      });
    }
    document.body.appendChild(wrap);
    const first = wrap.querySelector('button');
    if (first) first.focus();
  }
  window.TRIP.pick = openPicker;

  // — the nav chip ——————————————————————————————————————————————
  // Where the pages want it: an explicit slot, so the button lands in the
  // same place on each rather than wherever the DOM happens to allow.
  function decorate() {
    const slot = document.getElementById('tripChipSlot');
    if (slot) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag tag-neutral';
      btn.style.cssText = 'font-family:inherit;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px';
      btn.textContent = card.emoji + ' ' + card.title[lang] + ' ▾';
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.addEventListener('click', () => openPicker(true));
      slot.replaceWith(btn);
    }
    // The tab should look like the trip it is showing.
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) {
      icon.setAttribute('href', 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">' + card.emoji + '</text></svg>'));
    }
    // A trip without a field guide should not advertise one.
    if (!window.TRIP.hasGuide) {
      document.querySelectorAll('a[href="guide.html"]').forEach(a => a.remove());
    }
    if (!window.TRIP.chosen && (document.getElementById('app'))) openPicker(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate);
  else decorate();
})();
