/* España · the Çelik plan — itinerary state, wallet, replanning, rendering.
   Cheap per-device state (ticked moments, currency, language) lives in
   localStorage. What everyone must share — the documents and any replanned
   itinerary — lives behind /api in the private Blob store.

   No words live in this file: every user-facing string — itinerary text
   included — comes from window.I18N (i18n.js), which loads first. This file
   keeps only the trip's skeleton: ids, times, prices, categories, colours.
   Once someone replans, the skeleton and its words both come from the saved
   plan document instead (see "the plan" below). */
(() => {
  'use strict';

  const T = window.I18N.t;
  const tpl = window.I18N.fmt;

  const CATS = {
    travel: { bg: 'transparent', fg: 'var(--color-neutral-700)', bd: '1px solid var(--color-neutral-400)' },
    sights: { bg: 'var(--color-accent-200)', fg: 'var(--color-accent-900)' },
    museum: { bg: 'var(--color-accent-100)', fg: 'var(--color-accent-800)' },
    boat: { bg: 'var(--color-accent-2-200)', fg: 'var(--color-accent-2-900)' },
    swim: { bg: 'var(--color-accent-2-100)', fg: 'var(--color-accent-2-800)' },
    food: { bg: 'var(--color-neutral-200)', fg: 'var(--color-neutral-800)' },
    event: { bg: 'var(--color-accent-300)', fg: 'var(--color-accent-900)' },
    stay: { bg: 'var(--color-neutral-800)', fg: 'var(--color-neutral-100)' }
  };

  const FILTERS = ['all', 'boat', 'swim', 'sights', 'museum', 'food', 'event'];

  const DAYS = [
    { dom: '8', dot: 'var(--color-accent)', acts: [
      { id: 'd1b1', t: '07:30', cat: 'travel', eur: 89 },
      { id: 'd1b2', t: '15:00', cat: 'travel', eur: 5 },
      { id: 'd1s1', t: '16:00', cat: 'stay', eur: null },
      { id: 'd1b3', t: '18:30', cat: 'sights', eur: 0 },
      { id: 'd1b4', t: '21:00', cat: 'food', eur: 25 }
    ] },
    { dom: '9', dot: 'var(--color-accent)', acts: [
      { id: 'd2b1', t: '09:00', cat: 'sights', eur: 36 },
      { id: 'd2b2', t: '13:00', cat: 'food', eur: 18 },
      { id: 'd2b3', t: '17:30', cat: 'sights', eur: 18 },
      { id: 'd2b4', t: '21:00', cat: 'event', eur: 59 }
    ] },
    { dom: '10', dot: 'var(--color-accent)', acts: [
      { id: 'd3b1', t: '08:15', cat: 'travel', eur: 50 },
      { id: 'd3b2', t: '10:00', cat: 'sights', eur: 16 },
      { id: 'd3b3', t: '18:00', cat: 'swim', eur: 0 },
      { id: 'd3b4', t: '20:30', cat: 'food', eur: 35 }
    ] },
    { dom: '11', dot: 'linear-gradient(135deg, var(--color-accent) 50%, var(--color-accent-2) 50%)', acts: [
      { id: 'd4b1', t: '09:00', cat: 'food', eur: 6 },
      { id: 'd4b2', t: '09:45', cat: 'sights', eur: 0 },
      { id: 'd4b3', t: '10:30', cat: 'museum', eur: 14 },
      { id: 'd4b4', t: '12:15', cat: 'sights', eur: 4 },
      { id: 'd4b5', t: '14:05', cat: 'travel', eur: 74 },
      { id: 'd4s1', t: '17:30', cat: 'stay', eur: null },
      { id: 'd4b6', t: '18:30', cat: 'sights', eur: 0 },
      { id: 'd4b7', t: '21:00', cat: 'food', eur: 22 }
    ] },
    { dom: '12', dot: 'var(--color-accent-2)', acts: [
      { id: 'd5b1', t: '08:45', cat: 'food', eur: 8 },
      { id: 'd5b2', t: '10:00', cat: 'sights', eur: 2 },
      { id: 'd5b3', t: '11:30', cat: 'sights', eur: 9 },
      { id: 'd5b4', t: '13:30', cat: 'food', eur: 15 },
      { id: 'd5b5', t: '17:30', cat: 'swim', eur: 2 },
      { id: 'd5b6', t: '20:45', cat: 'sights', eur: 2 },
      { id: 'd5b7', t: '21:30', cat: 'food', eur: 20 }
    ] },
    { dom: '13', dot: 'var(--color-accent-2)', acts: [
      { id: 'd6b1', t: '09:00', cat: 'sights', eur: 0 },
      { id: 'd6b2', t: '10:30', cat: 'sights', eur: 43 },
      { id: 'd6b3', t: '14:15', cat: 'food', eur: 25 },
      { id: 'd6b4', t: '19:00', cat: 'boat', eur: 7 },
      { id: 'd6b5', t: '20:45', cat: 'event', eur: 0 }
    ] },
    { dom: '14', dot: 'var(--color-neutral-500)', acts: [
      { id: 'd7b1', t: '09:00', cat: 'sights', eur: 0 },
      { id: 'd7b2', t: '12:30', cat: 'travel', eur: 100 }
    ] }
  ];

  const BOOKINGS = ['k1', 'k1b', 'k11', 'k12', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'];

  // Where each stop is, as a Google Maps search query — a named place opens
  // the place card (photos, hours, directions), which a bare lat/lng pin
  // would not. Keyed by stop id like the words in i18n.js; the queries are
  // place names, so one table serves every language.
  const MAPS = {
    d1b1: 'East Midlands Airport',
    d1b2: 'Passeig de Gràcia station, Barcelona',
    d1s1: 'Hotel HCC Taber, Carrer d\'Aragó 256, Barcelona',
    d1b3: 'Barri Gòtic, Barcelona',
    d1b4: 'Carrer de la Mercè, Barcelona',
    d2b1: 'Basílica de la Sagrada Família, Barcelona',
    d2b2: 'Casa Milà, Barcelona',
    d2b3: 'Park Güell, Barcelona',
    d2b4: 'Casa Batlló, Barcelona',
    d3b1: 'Plaça Espanya station, Barcelona',
    d3b2: 'Santa Maria de Montserrat Abbey',
    d3b3: 'Platja de la Barceloneta, Barcelona',
    d3b4: 'Restaurant Can Solé, Barcelona',
    d4b1: 'Mercat de Santa Caterina, Barcelona',
    d4b2: 'Basílica de Santa Maria del Mar, Barcelona',
    d4b3: 'Museu Picasso, Barcelona',
    d4b4: 'La Rambla, Barcelona',
    d4b5: 'Barcelona Sants railway station',
    d4s1: 'easyHotel Valencia Ciutat Vella, València',
    d4b6: 'Parc Gulliver, València',
    d4b7: 'Russafa, València',
    d5b1: 'Mercat Central, València',
    d5b2: 'La Lonja de la Seda, València',
    d5b3: 'València Cathedral',
    d5b4: 'Ciutat Vella, València',
    d5b5: 'Platja de la Malva-rosa, València',
    d5b6: 'Torres de Serranos, València',
    d5b7: 'Barrio del Carmen, València',
    d6b1: 'Ciutat de les Arts i les Ciències, València',
    d6b2: 'Oceanogràfic, València',
    d6b3: 'El Palmar, València',
    d6b4: 'La Albufera, València',
    d6b5: 'El Palmar, València',
    d7b1: 'Jardí del Túria, València',
    d7b2: 'València Airport'
  };
  // For stops the table doesn't know (added or renamed while replanning),
  // the link searches the stop's own title, steered towards the right city.
  // Day 4 spans both cities, so it gets no hint rather than a wrong one.
  const MAP_CITY = ['Barcelona', 'Barcelona', 'Barcelona', '', 'València', 'València', 'València'];
  const mapsUrl = window.PlaceLinks.url;
  function mapQuery(a, title) {
    const baked = T.acts[a.id];
    if (MAPS[a.id] && (!state.plan || (baked && baked.title === title))) return MAPS[a.id];
    if (!title) return null;
    return MAP_CITY[state.day] ? title + ', ' + MAP_CITY[state.day] : title;
  }

  const LINK_ICON = '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>';
  const PIN_ICON = '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>';

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  };

  const state = {
    day: 0,
    filter: 'all',
    done: read('celik-spain-done', {}),
    // Ticks and currency stay in localStorage — they're trivial to redo and
    // nobody needs them on another device. Documents don't: see the wallet
    // section below.
    docs: [],
    locked: true,
    walletMsg: null,
    busy: false,
    // The replanned itinerary, if anyone has replanned. null means the plan
    // baked into this file and i18n.js still stands. See the plan section.
    plan: null,
    editing: false,
    sync: 'idle', // 'saving' | 'saved' | 'error'
    syncMsg: null,
    currency: localStorage.getItem('celik-spain-currency') === 'EUR' ? 'EUR' : 'GBP'
  };

  // — the plan: baked-in until somebody replans —————————————————————
  // The itinerary ships in DAYS + i18n.js, but the first edit materialises
  // all of it — every language at once — into one plan document that lives
  // in the same private Blob store as the wallet, so a stop added on the
  // laptop is on Izem's phone too. Every render below reads through these
  // resolvers rather than touching DAYS or T directly.
  const LANGS = window.I18N.langs;
  const local = w => (w && (w[window.I18N.lang] || w.en || w[LANGS.find(l => w[l])])) || '';

  const dayActs = i => (state.plan ? state.plan.days[i] : DAYS[i]).acts;
  const allActs = () => DAYS.flatMap((d, i) => dayActs(i));
  const actWords = a => state.plan
    ? { title: local(a.title), desc: local(a.desc), tip: local(a.tip) }
    : T.acts[a.id];
  const dayWords = i => state.plan
    ? { city: local(state.plan.days[i].city), title: local(state.plan.days[i].title), sub: local(state.plan.days[i].sub) }
    : T.days[i];
  const bookingRows = () => state.plan ? state.plan.bookings : BOOKINGS.map(id => ({ id }));
  const bookingText = b => state.plan ? local(b.text) : T.bookings[b.id];

  // Day + title labels for the wallet's pin select and the preview header,
  // rebuilt each render because replanning changes titles and order.
  let ACT_LABELS = {};
  function indexActs() {
    ACT_LABELS = {};
    DAYS.forEach((d, i) => dayActs(i).forEach(a => {
      ACT_LABELS[a.id] = tpl(T.ui.dayN, { n: i + 1 }) + ' · ' + actWords(a).title;
    }));
  }
  indexActs();

  // Ids end up in wallet pathnames (_wallet.js), so stick to its charset.
  const newActId = () => 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  function defaultPlan() {
    const wordsOf = pick => {
      const w = {};
      LANGS.forEach(l => { w[l] = pick(window.I18N.pack(l)) || ''; });
      return w;
    };
    return {
      v: 1,
      days: DAYS.map((d, i) => ({
        title: wordsOf(p => p.days[i].title),
        city: wordsOf(p => p.days[i].city),
        sub: wordsOf(p => p.days[i].sub),
        acts: d.acts.map(a => ({
          id: a.id, t: a.t, cat: a.cat, eur: a.eur ?? null,
          title: wordsOf(p => (p.acts[a.id] || {}).title),
          desc: wordsOf(p => (p.acts[a.id] || {}).desc),
          tip: wordsOf(p => (p.acts[a.id] || {}).tip)
        }))
      })),
      bookings: BOOKINGS.map(id => ({ id, text: wordsOf(p => p.bookings[id]) }))
    };
  }
  const ensurePlan = () => state.plan || (state.plan = defaultPlan());

  // — DOM helper —————————————————————————————————————————————————
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const k in (attrs || {})) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'style') n.style.cssText = v;
      else if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'svg') n.innerHTML = v;
      else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2).toLowerCase(), v);
      else n.setAttribute(k, v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) n.append(c); });
    return n;
  }
  // SVG needs its own namespace — createElement('svg') yields an inert
  // HTMLUnknownElement that never draws.
  const svg = (size, path) => {
    const n = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const attrs = {
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      'stroke-width': '2.75', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true'
    };
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    n.innerHTML = path;
    return n;
  };
  const $ = id => document.getElementById(id);

  // Booking lines and tips carry real booking URLs, and every kind of prose
  // names places. Rendering through textContent would leave both dead, so
  // split the text: https:// runs become booking anchors, and known place
  // names (PlaceLinks, places.js) become Google Maps anchors — DOM nodes
  // only, nothing parsed as HTML, so itinerary text can never inject markup.
  const URL_RE = /https?:\/\/[^\s"<>]+/g;
  const placeAnchor = p => el('a', {
    href: p.href, target: '_blank', rel: 'noopener', text: p.text,
    title: tpl(T.ui.openMap, { title: p.text }),
    onclick: e => e.stopPropagation(),
    style: 'color:inherit;text-decoration:underline;text-decoration-style:dotted;' +
      'text-decoration-color:var(--color-accent-2-600);text-underline-offset:3px'
  });
  const withPlaces = seg => window.PlaceLinks.split(seg)
    .map(p => typeof p === 'string' ? p : placeAnchor(p));
  function withLinks(text) {
    const parts = [];
    let last = 0;
    for (const m of String(text).matchAll(URL_RE)) {
      if (m.index > last) parts.push(...withPlaces(text.slice(last, m.index)));
      let url = m[0];
      const trail = (url.match(/[.,;:)!?]+$/) || [''])[0];
      if (trail) url = url.slice(0, url.length - trail.length);
      parts.push(el('a', {
        href: url, target: '_blank', rel: 'noopener noreferrer', text: url,
        onclick: e => e.stopPropagation(),
        style: 'color:inherit;font-weight:700;text-decoration:underline;overflow-wrap:anywhere'
      }));
      if (trail) parts.push(trail);
      last = m.index + m[0].length;
    }
    parts.push(...withPlaces(text.slice(last)));
    return parts;
  }

  // — static text ————————————————————————————————————————————————
  // The markup ships with English as its fallback; this swaps every tagged
  // node to the active language before the first render.
  function applyStatic() {
    document.title = T.htmlTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T.metaDesc);
    // Prose blocks get their place references linked; everything else —
    // buttons, labels, headings — stays plain text (no anchors inside
    // interactive elements).
    const PROSE = new Set(['heroText', 'vlogsText', 'ahmetDesc', 'izemDesc']);
    document.querySelectorAll('[data-i18n]').forEach(n => {
      const key = n.getAttribute('data-i18n');
      const s = T.static[key];
      if (s == null) return;
      if (PROSE.has(key)) n.replaceChildren(...withLinks(s));
      else n.textContent = s;
    });
    const ATTRS = {
      'data-i18n-placeholder': 'placeholder',
      'data-i18n-title': 'title',
      'data-i18n-aria-label': 'aria-label'
    };
    for (const dataAttr in ATTRS) {
      document.querySelectorAll('[' + dataAttr + ']').forEach(n => {
        const s = T.static[n.getAttribute(dataAttr)];
        if (s != null) n.setAttribute(ATTRS[dataAttr], s);
      });
    }
  }

  // — persistence ————————————————————————————————————————————————
  function toggle(id) {
    state.done[id] = !state.done[id];
    try { localStorage.setItem('celik-spain-done', JSON.stringify(state.done)); } catch (e) {}
    render();
  }
  // — travel wallet ——————————————————————————————————————————————
  // Documents used to sit in localStorage as base64 data URLs, which meant
  // they never left the browser that uploaded them and the whole wallet had
  // to fit in the 5 MB origin quota — one boarding-pass scan filled it. They
  // now live in a private Vercel Blob store behind /api, unlocked with a
  // shared passphrase. The unlock cookie is HttpOnly, which is what lets the
  // preview <img>, <iframe> and download link fetch /api/file directly.
  const MAX_UPLOAD = 4 * 1024 * 1024;
  const fileUrl = (doc, download) =>
    '/api/file?pathname=' + encodeURIComponent(doc.pathname) + (download ? '&download=1' : '');

  async function apiSend(method, body) {
    const res = await fetch('/api/docs', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return finishRequest(res);
  }
  async function finishRequest(res) {
    let payload = {};
    try { payload = await res.json(); } catch (e) { /* non-JSON error page */ }
    // A 401 always means the cookie is gone or was never valid — but let the
    // server say why, so a wrong passphrase reads as one rather than as an
    // expired session. The server speaks English; I18N.server re-voices its
    // known messages in the active language.
    if (res.status === 401) state.locked = true;
    if (!res.ok) throw new Error(payload.error ? window.I18N.server(payload.error) : T.ui.requestFailed);
    return payload;
  }

  // Every mutation re-reads the list from the store rather than patching the
  // local copy, so two phones editing the wallet converge instead of drifting.
  async function walletAction(run) {
    state.busy = true; state.walletMsg = null; render();
    try {
      await run();
      state.docs = (await finishRequest(await fetch('/api/docs'))).docs || [];
    } catch (e) {
      state.walletMsg = e.message;
    } finally {
      state.busy = false;
      render();
    }
  }

  async function refreshWallet() {
    try {
      const res = await fetch('/api/unlock');
      const status = await res.json();
      state.locked = !status.unlocked;
      if (!status.configured) state.walletMsg = T.ui.noPassphrase;
      if (state.locked) { render(); return; }
      state.docs = (await finishRequest(await fetch('/api/docs'))).docs || [];
    } catch (e) {
      state.walletMsg = T.ui.walletUnreachable;
    }
    render();
  }

  async function unlock(passphrase) {
    state.busy = true; state.walletMsg = null; render();
    try {
      await finishRequest(await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase })
      }));
      state.locked = false;
      state.docs = (await finishRequest(await fetch('/api/docs'))).docs || [];
    } catch (e) {
      state.locked = true;
      state.walletMsg = e.message;
    } finally {
      state.busy = false;
      render();
    }
  }

  // — replanning ————————————————————————————————————————————————
  // Same convergence idea as the wallet, but for one JSON document: every
  // change PUTs the whole plan. Writes go through the same unlock cookie;
  // reads are public, like the itinerary itself.
  let saveTimer = null, saveBusy = false, saveAgain = false;

  async function loadPlan() {
    try {
      const res = await fetch('/api/itinerary');
      if (!res.ok) return;
      const payload = await res.json();
      if (payload.plan) { state.plan = payload.plan; render(); }
    } catch (e) { /* static server or offline — the baked-in plan stands */ }
  }

  function mutatePlan(change) {
    change(ensurePlan());
    state.sync = 'saving';
    clearTimeout(saveTimer);
    // Coalesce a burst of arrow-taps into one PUT.
    saveTimer = setTimeout(savePlan, 700);
    render();
  }

  async function savePlan() {
    if (saveBusy) { saveAgain = true; return; }
    if (!state.plan) return;
    saveBusy = true;
    state.sync = 'saving';
    try {
      await finishRequest(await fetch('/api/itinerary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: state.plan })
      }));
      if (!saveAgain) state.sync = 'saved';
    } catch (e) {
      state.sync = 'error';
      state.syncMsg = e.message;
      // The cookie expired mid-edit: ask for the passphrase rather than
      // leaving a retry chip that can only fail again.
      if (state.locked && state.editing) openReplanUnlock(savePlan);
    } finally {
      saveBusy = false;
      if (saveAgain) { saveAgain = false; savePlan(); }
      render();
    }
  }

  function toggleReplan() {
    if (state.editing) {
      state.editing = false;
      if (state.sync === 'saved') state.sync = 'idle';
      render();
      return;
    }
    const enter = () => { state.editing = true; state.filter = 'all'; render(); };
    if (state.locked) openReplanUnlock(enter); else enter();
  }

  function upload(actId) {
    const input = el('input', { type: 'file', multiple: true });
    input.onchange = () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      // One request per file keeps every body well under the 4.5 MB ceiling
      // Vercel puts on a Function request.
      walletAction(async () => {
        const rejected = [];
        for (const f of files) {
          if (f.size > MAX_UPLOAD) { rejected.push(tpl(T.ui.overSize, { name: f.name })); continue; }
          const form = new FormData();
          form.append('file', f);
          form.append('act', actId || '');
          await finishRequest(await fetch('/api/docs', { method: 'POST', body: form }));
        }
        if (rejected.length) throw new Error(rejected.join('; ') + T.ui.tooBig);
      });
    };
    input.click();
  }

  // Anything a previous visit stashed in localStorage is still the only copy
  // of that document, so it's offered as a one-click move rather than being
  // dropped on the floor.
  const legacyDocs = read('celik-spain-docs', []).filter(d => d && d.dataUrl);
  function migrateLegacy() {
    walletAction(async () => {
      for (const d of legacyDocs) {
        const blob = await (await fetch(d.dataUrl)).blob();
        const form = new FormData();
        form.append('file', new File([blob], d.name || 'document', { type: blob.type }));
        form.append('act', d.act || '');
        await finishRequest(await fetch('/api/docs', { method: 'POST', body: form }));
      }
      localStorage.removeItem('celik-spain-docs');
      legacyDocs.length = 0;
    });
  }
  function fmt(eur) {
    if (eur == null) return null;
    if (eur === 0) return T.ui.free;
    return (state.currency === 'GBP' ? '£' + Math.round(eur * 0.87) : '€' + eur) + ' ' + T.ui.pp;
  }
  const sizeLabel = bytes => {
    const kb = bytes / 1024;
    return kb > 900 ? (kb / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(kb)) + ' KB';
  };

  // — dialogs ————————————————————————————————————————————————————
  // Overlay + focus trap shared by the document preview and every replan
  // dialog. Returns the close function.
  let lastFocus = null;
  function presentDialog(dialog, focusEl) {
    lastFocus = document.activeElement;
    const overlay = el('div', {
      'data-r': 'overlay', onclick: close,
      style: 'position:fixed;inset:0;z-index:2000;background:rgba(32,30,29,.45);display:flex;align-items:center;justify-content:center;padding:24px'
    }, dialog);

    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const focusable = dialog.querySelectorAll('a[href],button:not(:disabled),input,select,textarea,iframe,[tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function close() {
      document.removeEventListener('keydown', onKey, true);
      overlay.remove();
      if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    }
    document.addEventListener('keydown', onKey, true);
    document.body.append(overlay);
    (focusEl || dialog).focus();
    return close;
  }

  function openPreview(docId) {
    const doc = state.docs.find(d => d.id === docId);
    if (!doc) return;
    // A doc can stay pinned to a stop that was since replanned away; it
    // reads as general rather than as a blank.
    const meta = ((doc.act && ACT_LABELS[doc.act]) || T.ui.generalTrip) + ' · ' + sizeLabel(doc.size);

    const body = doc.kind === 'image'
      ? el('img', { src: fileUrl(doc), alt: tpl(T.ui.previewOf, { name: doc.name }),
          style: 'display:block;width:100%;height:60vh;object-fit:contain;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
      : doc.kind === 'pdf'
        ? el('iframe', { src: fileUrl(doc), title: tpl(T.ui.previewOf, { name: doc.name }),
            style: 'width:100%;height:60vh;border:none;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
        : el('p', { text: T.ui.noPreview,
            style: 'margin:0;padding:28px;border:1px dashed var(--color-neutral-400);border-radius:var(--radius-lg);font-size:14px;color:var(--color-neutral-700);text-align:center' });

    let close;
    const closeBtn = el('button', { type: 'button', class: 'btn btn-ghost btn-icon', 'aria-label': T.ui.closePreview, text: '×', onclick: () => close() });
    const dialog = el('div', {
      'data-r': 'dialog', class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': T.ui.docPreview,
      style: 'max-width:760px;width:100%;max-height:88vh;display:flex;flex-direction:column;gap:14px;background:var(--color-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);padding:20px 22px;overflow:auto',
      onclick: e => e.stopPropagation()
    },
      el('div', { style: 'display:flex;align-items:center;gap:12px' },
        el('div', { style: 'flex:1;min-width:0' },
          el('div', { text: doc.name, style: 'font-family:var(--font-heading);font-size:19px;overflow-wrap:anywhere' }),
          el('div', { text: meta, style: 'font-size:12.5px;color:var(--color-neutral-700);margin-top:2px' })
        ),
        el('a', { class: 'btn btn-secondary', href: fileUrl(doc, true), download: doc.name, text: T.ui.download }),
        closeBtn
      ),
      body
    );
    close = presentDialog(dialog, closeBtn);
  }

  // — replan dialogs —————————————————————————————————————————————
  const fieldWrap = (labelText, control) => el('div', { class: 'field', style: 'min-width:0' },
    el('label', { text: labelText }), control);

  // One control per language, in side-by-side EN/TR columns. read() borrows
  // a blank language from the filled one, so the two versions of the plan
  // never drift apart silently.
  function langFields(defs) {
    const controls = {};
    const cols = LANGS.map(l => {
      const kids = [el('span', { class: 'tag tag-neutral', text: l.toUpperCase(), style: 'justify-self:start' })];
      defs.forEach(d => {
        const label = d.label + ' · ' + l.toUpperCase();
        const c = d.kind === 'area'
          ? el('textarea', { class: 'input', rows: d.rows || 4, 'aria-label': label, style: 'border-radius:var(--radius-md)' })
          : el('input', { type: 'text', class: 'input', 'aria-label': label });
        c.value = (d.value && d.value[l]) || '';
        (controls[d.key] = controls[d.key] || {})[l] = c;
        kids.push(fieldWrap(label, c));
      });
      return el('div', { style: 'display:grid;gap:12px;align-content:start' }, kids);
    });
    return {
      node: el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px' }, cols),
      read(key) {
        const w = {};
        LANGS.forEach(l => { w[l] = controls[key][l].value.trim(); });
        const donor = LANGS.map(l => w[l]).find(Boolean) || '';
        LANGS.forEach(l => { if (!w[l]) w[l] = donor; });
        return w;
      }
    };
  }

  function editDialog(titleText, bodyKids, onSave) {
    let close;
    const dialog = el('div', {
      'data-r': 'dialog', class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': titleText,
      style: 'max-width:680px;width:100%;max-height:90vh;overflow:auto;background:var(--color-bg);box-shadow:var(--shadow-lg)',
      onclick: e => e.stopPropagation()
    },
      el('div', { class: 'dialog-title', text: titleText }),
      bodyKids,
      el('p', { text: T.ui.langNote, style: 'margin:0;font-size:12px;color:var(--color-neutral-600)' }),
      el('div', { class: 'dialog-actions' },
        el('button', { type: 'button', class: 'btn btn-secondary', text: T.ui.cancel, onclick: () => close() }),
        el('button', { type: 'button', class: 'btn btn-primary', text: T.ui.save, onclick: () => { onSave(); close(); } })
      )
    );
    close = presentDialog(dialog, null);
    const first = dialog.querySelector('input,select,textarea');
    if (first) first.focus();
  }

  function openActDialog(dayIdx, actId) {
    const plan = ensurePlan();
    const src = actId ? plan.days[dayIdx].acts.find(a => a.id === actId) : null;
    if (actId && !src) return;

    const timeIn = el('input', { type: 'time', class: 'input', 'aria-label': T.ui.fTime });
    timeIn.value = src ? src.t : '12:00';
    const catSel = el('select', { class: 'input', 'aria-label': T.ui.fCat },
      Object.keys(CATS).map(k => el('option', { value: k, text: T.cats[k] })));
    catSel.value = src ? src.cat : 'sights';
    const eurIn = el('input', { type: 'number', min: '0', step: '0.5', class: 'input', 'aria-label': T.ui.fPrice, title: T.ui.fPriceHint });
    eurIn.value = src && src.eur != null ? src.eur : '';
    const daySel = el('select', { class: 'input', 'aria-label': T.ui.fDay },
      plan.days.map((d, i) => el('option', { value: String(i), text: tpl(T.ui.dayOption, { n: i + 1, title: local(d.title) }) })));
    daySel.value = String(dayIdx);

    const texts = langFields([
      { key: 'title', label: T.ui.fTitle, kind: 'input', value: src && src.title },
      { key: 'desc', label: T.ui.fDesc, kind: 'area', rows: 5, value: src && src.desc },
      { key: 'tip', label: T.ui.fTip, kind: 'area', rows: 3, value: src && src.tip }
    ]);

    editDialog(src ? T.ui.editStopTitle : T.ui.newStop, [
      el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px' },
        fieldWrap(T.ui.fTime, timeIn),
        fieldWrap(T.ui.fCat, catSel),
        fieldWrap(T.ui.fPrice, eurIn),
        fieldWrap(T.ui.fDay, daySel)
      ),
      texts.node
    ], () => {
      const title = texts.read('title');
      LANGS.forEach(l => { if (!title[l]) title[l] = window.I18N.pack(l).ui.newStop; });
      const t = /^\d{2}:\d{2}$/.test(timeIn.value) ? timeIn.value : (src ? src.t : '12:00');
      const eur = eurIn.value === '' ? null : Math.max(0, Number(eurIn.value) || 0);
      const target = Math.min(DAYS.length - 1, Math.max(0, Number(daySel.value) || 0));
      state.day = target;
      mutatePlan(p => {
        const fields = { t, cat: catSel.value, eur, title, desc: texts.read('desc'), tip: texts.read('tip') };
        const from = p.days[dayIdx].acts;
        const i = src ? from.findIndex(a => a.id === src.id) : -1;
        // Staying put keeps its hand-arranged position; a new or moved stop
        // slots in where its time belongs.
        if (i >= 0 && target === dayIdx) { Object.assign(from[i], fields); return; }
        const act = i >= 0 ? Object.assign(from.splice(i, 1)[0], fields) : { id: newActId(), ...fields };
        const into = p.days[target].acts;
        const at = into.findIndex(x => x.t > act.t);
        if (at < 0) into.push(act); else into.splice(at, 0, act);
      });
    });
  }

  function moveAct(dayIdx, id, delta) {
    mutatePlan(p => {
      const acts = p.days[dayIdx].acts;
      const i = acts.findIndex(x => x.id === id);
      const j = i + delta;
      if (i < 0 || j < 0 || j >= acts.length) return;
      acts.splice(j, 0, acts.splice(i, 1)[0]);
    });
  }

  function removeAct(dayIdx, id) {
    const act = dayActs(dayIdx).find(x => x.id === id);
    if (!act) return;
    const pinned = state.docs.some(d => d.act === id);
    if (!confirm(tpl(pinned ? T.ui.confirmRemoveStopDocs : T.ui.confirmRemoveStop, { title: actWords(act).title }))) return;
    mutatePlan(p => {
      const acts = p.days[dayIdx].acts;
      const i = acts.findIndex(x => x.id === id);
      if (i >= 0) acts.splice(i, 1);
    });
  }

  function openDayDialog(i) {
    const day = ensurePlan().days[i];
    const texts = langFields([
      { key: 'title', label: T.ui.fTitle, kind: 'input', value: day.title },
      { key: 'city', label: T.ui.fCity, kind: 'input', value: day.city },
      { key: 'sub', label: T.ui.fSub, kind: 'area', rows: 2, value: day.sub }
    ]);
    editDialog(T.ui.dayWordsTitle, [texts.node], () => {
      mutatePlan(p => {
        const d = p.days[i];
        const title = texts.read('title');
        // A day keeps its old name rather than going blank.
        LANGS.forEach(l => { if (!title[l]) title[l] = d.title[l]; });
        d.title = title;
        d.city = texts.read('city');
        d.sub = texts.read('sub');
      });
    });
  }

  function openBookingDialog(id) {
    const row = id ? ensurePlan().bookings.find(b => b.id === id) : null;
    if (id && !row) return;
    const texts = langFields([
      { key: 'text', label: T.ui.fTitle, kind: 'area', rows: 2, value: row && row.text }
    ]);
    editDialog(row ? T.ui.editBookingTitle : T.ui.newBookingTitle, [texts.node], () => {
      const text = texts.read('text');
      if (!LANGS.some(l => text[l])) return; // nothing written, nothing to keep
      mutatePlan(p => {
        if (row) row.text = text;
        else p.bookings.push({ id: newActId(), text });
      });
    });
  }

  function removeBooking(id) {
    if (!confirm(T.ui.confirmRemoveBooking)) return;
    mutatePlan(p => {
      const i = p.bookings.findIndex(b => b.id === id);
      if (i >= 0) p.bookings.splice(i, 1);
    });
  }

  function openReplanUnlock(then) {
    let close;
    const note = el('p', {
      role: 'status', hidden: true,
      style: 'margin:0;font-size:12.5px;line-height:1.45;color:var(--color-accent-2-900);background:var(--color-accent-2-100);border-radius:12px;padding:8px 12px'
    });
    const pass = el('input', {
      type: 'password', class: 'input', autocomplete: 'current-password',
      placeholder: T.ui.passPlaceholder, 'aria-label': T.ui.passPlaceholder,
      onkeydown: e => { if (e.key === 'Enter') go(); }
    });
    const goBtn = el('button', { type: 'button', class: 'btn btn-primary', text: T.ui.unlock, onclick: go });
    async function go() {
      if (!pass.value || state.busy) return;
      goBtn.disabled = true;
      goBtn.textContent = T.ui.working;
      await unlock(pass.value);
      if (!state.locked) { close(); then(); return; }
      goBtn.disabled = false;
      goBtn.textContent = T.ui.unlock;
      note.textContent = state.walletMsg || T.ui.requestFailed;
      note.hidden = false;
      pass.focus();
    }
    const dialog = el('div', {
      'data-r': 'dialog', class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': T.ui.replanLockedTitle,
      style: 'background:var(--color-bg);box-shadow:var(--shadow-lg)', onclick: e => e.stopPropagation()
    },
      el('div', { class: 'dialog-title', text: T.ui.replanLockedTitle }),
      el('p', { class: 'dialog-body', text: T.ui.replanLockedBody, style: 'margin:0' }),
      pass, note,
      el('div', { class: 'dialog-actions' },
        el('button', { type: 'button', class: 'btn btn-secondary', text: T.ui.cancel, onclick: () => close() }),
        goBtn
      )
    );
    close = presentDialog(dialog, pass);
  }

  // — render —————————————————————————————————————————————————————
  function renderDayPills() {
    const row = $('dayPills');
    row.replaceChildren(...DAYS.map((d, i) => {
      const sel = i === state.day;
      return el('button', {
        type: 'button', 'aria-pressed': String(sel), 'data-key': 'day-' + i,
        onclick: () => { state.day = i; render(); },
        style: 'display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;' +
          'cursor:pointer;font-family:inherit;font-size:13.5px;font-weight:600;' +
          'border:1px solid ' + (sel ? 'var(--color-accent)' : 'var(--color-neutral-300)') + ';' +
          'background:' + (sel ? 'var(--color-accent)' : 'var(--color-neutral-100)') + ';' +
          'color:' + (sel ? '#fff' : 'var(--color-text)')
      },
        el('span', { style: 'width:9px;height:9px;border-radius:50%;flex-shrink:0;background:' + (sel ? 'rgba(255,255,255,.85)' : d.dot) }),
        el('span', { text: tpl(T.pill, { dow: T.dows[i], dom: d.dom }) })
      );
    }));
  }

  function renderFilters() {
    const row = $('filterRow');
    // Replanning always works on the whole day — a filter would make the
    // reorder arrows jump over stops it had hidden.
    row.hidden = state.editing;
    row.replaceChildren(...FILTERS.map(key => {
      const sel = key === state.filter;
      return el('button', {
        type: 'button', text: T.filters[key], 'aria-pressed': String(sel), 'data-key': 'filter-' + key,
        onclick: () => { state.filter = key; render(); },
        style: 'padding:6px 14px;border-radius:999px;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;' +
          'border:1px solid ' + (sel ? 'var(--color-accent-2-700)' : 'var(--color-neutral-400)') + ';' +
          'background:' + (sel ? 'var(--color-accent-2-700)' : 'transparent') + ';' +
          'color:' + (sel ? '#fff' : 'var(--color-neutral-800)')
      });
    }));
  }

  function activityCard(a, pos, total) {
    const isDone = !!state.done[a.id];
    const c = CATS[a.cat];
    const x = actWords(a);
    const cost = fmt(a.eur);
    const mapsQ = mapQuery(a, x.title);
    const attached = state.docs.filter(d => d.act === a.id);

    const docRow = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px' },
      attached.map(d => el('button', {
        type: 'button', onclick: () => openPreview(d.id), 'data-key': 'doc-' + d.id,
        style: 'display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:12px;font-weight:700;background:var(--color-accent-100);color:var(--color-accent-900);border:none;border-radius:999px;padding:5px 12px;cursor:pointer'
      }, svg(11, LINK_ICON), el('span', { text: d.name }))),
      el('button', {
        type: 'button', 'data-key': 'attach-' + a.id, disabled: state.busy,
        text: state.locked ? T.ui.attachLocked : T.ui.attach,
        title: state.locked ? T.ui.attachTitle : null,
        onclick: () => { if (state.locked) $('walletPass') && $('walletPass').focus(); else upload(a.id); },
        style: 'display:inline-flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;font-weight:700;background:none;border:1px dashed var(--color-neutral-400);color:var(--color-neutral-700);border-radius:999px;padding:5px 12px;cursor:pointer'
      })
    );

    return el('div', { class: 'card', style: isDone ? 'opacity:.55' : '' },
      el('div', { 'data-r': 'actrow', style: 'display:flex;gap:16px;align-items:flex-start' },
        el('div', { text: a.t, style: 'min-width:50px;font-weight:700;font-size:14px;padding-top:3px;color:var(--color-neutral-800)' }),
        el('div', { style: 'flex:1' },
          el('div', { style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px' },
            el('span', { text: x.title, style: 'font-family:var(--font-heading);font-size:19px;text-decoration:' + (isDone ? 'line-through' : 'none') }),
            el('span', { text: T.cats[a.cat], style: 'font-size:11.5px;font-weight:700;letter-spacing:.02em;padding:3px 11px;border-radius:999px;background:' + c.bg + ';color:' + c.fg + ';border:' + (c.bd || 'none') }),
            cost && el('span', { class: 'tag tag-neutral', text: cost }),
            mapsQ && el('a', {
              href: mapsUrl(mapsQ), target: '_blank', rel: 'noopener', 'data-key': 'map-' + a.id,
              'aria-label': tpl(T.ui.openMap, { title: x.title }),
              style: 'display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:.02em;' +
                'padding:3px 11px;border-radius:999px;border:1px solid var(--color-accent-2-400);' +
                'color:var(--color-accent-2-800);text-decoration:none'
            }, svg(11, PIN_ICON), el('span', { text: T.ui.mapLink }))
          ),
          x.desc && el('p', { style: 'margin:0;font-size:14.5px;line-height:1.55;color:var(--color-neutral-800);text-wrap:pretty' }, withLinks(x.desc)),
          x.tip && el('p', { style: 'margin:10px 0 0;font-size:13px;line-height:1.5;background:var(--color-accent-2-100);color:var(--color-accent-2-900);border-radius:14px;padding:8px 14px;display:inline-block' }, withLinks(x.tip)),
          docRow
        ),
        state.editing ? editCluster(a, x, pos, total) : el('button', {
          type: 'button', 'data-r': 'check', text: isDone ? '✓' : '', 'data-key': 'check-' + a.id,
          'aria-pressed': String(isDone), 'aria-label': tpl(isDone ? T.ui.untick : T.ui.tick, { title: x.title }),
          onclick: () => toggle(a.id),
          style: 'width:30px;height:30px;border-radius:50%;flex-shrink:0;cursor:pointer;padding:0;' +
            'border:2px solid var(--color-accent);background:' + (isDone ? 'var(--color-accent)' : 'transparent') + ';' +
            'color:#fff;font-size:15px;font-weight:700;line-height:26px'
        })
      )
    );
  }

  // Replaces the tick while replanning: you're arranging the day, not
  // living it. Same round-pill geometry as the tick it stands in for.
  function editCluster(a, x, pos, total) {
    const ctl = (glyph, label, onclick, opts) => el('button', {
      type: 'button', text: glyph, 'aria-label': label, 'data-key': (opts.key || glyph) + '-' + a.id,
      disabled: opts.disabled, onclick,
      style: 'width:32px;height:32px;border-radius:50%;flex-shrink:0;padding:0;font-family:inherit;' +
        'border:1px solid var(--color-neutral-400);background:var(--color-neutral-100);' +
        'color:var(--color-neutral-800);font-size:14px;line-height:1;' +
        (opts.disabled ? 'opacity:.35;cursor:default' : 'cursor:pointer') + (opts.style || '')
    });
    return el('div', { style: 'display:flex;flex-direction:column;gap:6px;flex-shrink:0' },
      ctl('↑', tpl(T.ui.moveEarlier, { title: x.title }), () => moveAct(state.day, a.id, -1), { key: 'up', disabled: pos === 0 }),
      ctl('↓', tpl(T.ui.moveLater, { title: x.title }), () => moveAct(state.day, a.id, 1), { key: 'down', disabled: pos === total - 1 }),
      ctl('✎', tpl(T.ui.editStop, { title: x.title }), () => openActDialog(state.day, a.id), { key: 'edit' }),
      ctl('×', tpl(T.ui.removeStop, { title: x.title }), () => removeAct(state.day, a.id), {
        key: 'del', style: ';color:var(--color-accent-700);border-color:var(--color-accent-400)'
      })
    );
  }

  function renderDay() {
    const dt = dayWords(state.day);
    $('dayTitle').textContent = dt.title;
    $('dayCity').textContent = dt.city;
    $('daySub').replaceChildren(...withLinks(dt.sub));
    const acts = dayActs(state.day).filter(a => state.editing || state.filter === 'all' || a.cat === state.filter);
    const cards = acts.map((a, i) => activityCard(a, i, acts.length));
    if (state.editing) {
      cards.push(el('button', {
        type: 'button', 'data-key': 'addstop', text: T.ui.addStop,
        onclick: () => openActDialog(state.day, null),
        style: 'font-family:var(--font-heading);font-size:15px;color:var(--color-neutral-700);background:none;cursor:pointer;' +
          'border:2px dashed var(--color-neutral-400);border-radius:calc(var(--radius-lg) * 1.15);padding:18px;text-align:center'
      }));
    }
    $('actList').replaceChildren(...cards);
    $('emptyMsg').hidden = acts.length > 0 || state.editing;
  }

  function renderTracker() {
    const acts = allActs();
    const doneCount = acts.filter(a => state.done[a.id]).length;
    const pct = Math.round((doneCount / (acts.length || 1)) * 100);
    const counts = { done: doneCount, total: acts.length };
    $('navCount').textContent = tpl(T.ui.navCount, counts);
    $('pct').textContent = pct + '%';
    $('trackerCount').textContent = tpl(T.ui.trackerCount, counts);
    $('bar').style.width = pct + '%';
  }

  function renderBookings() {
    const smallCtl = (glyph, label, key, onclick, extra) => el('button', {
      type: 'button', text: glyph, 'aria-label': label, 'data-key': key, onclick,
      style: 'width:24px;height:24px;border-radius:50%;flex-shrink:0;cursor:pointer;padding:0;font-family:inherit;' +
        'border:1px solid var(--color-neutral-400);background:var(--color-neutral-100);' +
        'color:var(--color-neutral-800);font-size:12px;line-height:1' + (extra || '')
    });
    const rows = bookingRows().map(b => {
      const isDone = !!state.done[b.id];
      // Booking lines hold live anchors, and an <a> can't sit inside a
      // <button> — so the tick circle is the button and the row div toggles
      // too, except when the click landed on a link.
      const row = el('div', {
        'data-key': 'book-' + b.id,
        onclick: e => { if (!e.target.closest('a')) toggle(b.id); },
        style: 'display:flex;gap:10px;align-items:flex-start;padding:0;cursor:pointer;text-align:left;font-family:inherit;flex:1;min-width:0'
      },
        el('button', {
          type: 'button', text: isDone ? '✓' : '', 'aria-pressed': String(isDone),
          'aria-label': tpl(isDone ? T.ui.untick : T.ui.tick, { title: bookingText(b) }),
          style: 'width:21px;height:21px;border-radius:50%;flex-shrink:0;margin-top:1px;cursor:pointer;padding:0;' +
            'border:2px solid var(--color-accent-2-600);background:' + (isDone ? 'var(--color-accent-2-600)' : 'transparent') + ';' +
            'color:#fff;font-size:12px;font-weight:700;line-height:17px;text-align:center'
        }),
        el('span', { style: 'font-size:13px;line-height:1.45;color:var(--color-neutral-800);overflow-wrap:anywhere;text-decoration:' + (isDone ? 'line-through' : 'none') }, withLinks(bookingText(b)))
      );
      if (!state.editing) return row;
      return el('div', { style: 'display:flex;gap:6px;align-items:flex-start' },
        row,
        smallCtl('✎', T.ui.editBooking, 'bedit-' + b.id, () => openBookingDialog(b.id)),
        smallCtl('×', T.ui.removeBooking, 'bdel-' + b.id, () => removeBooking(b.id),
          ';color:var(--color-accent-700);border-color:var(--color-accent-400)')
      );
    });
    if (state.editing) {
      rows.push(el('button', {
        type: 'button', 'data-key': 'addbooking', text: T.ui.addBooking,
        onclick: () => openBookingDialog(null),
        style: 'font-family:inherit;font-size:12.5px;font-weight:700;color:var(--color-neutral-700);background:none;cursor:pointer;' +
          'border:1px dashed var(--color-neutral-400);border-radius:999px;padding:7px 12px;text-align:center'
      }));
    }
    $('bookingList').replaceChildren(...rows);
  }

  // The passphrase field is rebuilt on every render like everything else, so
  // a failed attempt would otherwise clear what was typed.
  let passDraft = '';

  function renderWalletGate() {
    const gate = $('walletGate');
    // replaceChildren stringifies null into a literal "null" text node, so
    // the conditional rows have to be filtered out rather than passed through.
    const fill = (...kids) => gate.replaceChildren(...kids.filter(Boolean));
    const note = msg => el('p', {
      text: msg, role: 'status',
      style: 'margin:10px 0 0;font-size:12.5px;line-height:1.45;color:var(--color-accent-2-900);background:var(--color-accent-2-100);border-radius:12px;padding:8px 12px'
    });

    if (state.locked) {
      const field = el('input', {
        type: 'password', id: 'walletPass', 'data-key': 'walletpass', autocomplete: 'current-password',
        placeholder: T.ui.passPlaceholder, 'aria-label': T.ui.passPlaceholder, disabled: state.busy,
        oninput: e => { passDraft = e.target.value; },
        onkeydown: e => { if (e.key === 'Enter' && passDraft) unlock(passDraft); },
        style: 'flex:1;min-width:0;font-family:inherit;font-size:13px;padding:8px 12px;border-radius:999px;border:1px solid var(--color-neutral-400);background:var(--color-bg);color:var(--color-text)'
      });
      field.value = passDraft;
      fill(
        el('div', { style: 'display:flex;gap:8px;align-items:center' },
          field,
          el('button', {
            type: 'button', class: 'btn btn-primary', 'data-key': 'walletunlock', disabled: state.busy,
            text: state.busy ? '…' : T.ui.unlock, onclick: () => passDraft && unlock(passDraft)
          })
        ),
        state.walletMsg && note(state.walletMsg),
        // Their only copy is still in this browser. Say so, or it looks lost.
        legacyDocs.length && note(legacyDocs.length > 1
          ? tpl(T.ui.legacyNoteMany, { n: legacyDocs.length })
          : T.ui.legacyNoteOne)
      );
      return;
    }

    fill(
      legacyDocs.length && el('button', {
        type: 'button', class: 'btn btn-secondary btn-block', 'data-key': 'walletmigrate', disabled: state.busy,
        text: legacyDocs.length > 1 ? tpl(T.ui.migrateMany, { n: legacyDocs.length }) : T.ui.migrateOne,
        onclick: migrateLegacy
      }),
      state.walletMsg && note(state.walletMsg)
    );
  }

  function renderWallet() {
    renderWalletGate();
    $('uploadGeneral').hidden = state.locked;
    $('uploadGeneral').disabled = state.busy;
    $('uploadGeneral').textContent = state.busy ? T.ui.working : T.ui.addDoc;

    const list = $('walletList');
    if (!state.docs.length) { list.style.display = 'none'; list.replaceChildren(); return; }
    list.style.display = 'grid';
    list.replaceChildren(...state.docs.map(d => {
      const select = el('select', {
        'aria-label': tpl(T.ui.pinTo, { name: d.name }), 'data-key': 'pin-' + d.id, disabled: state.busy,
        onchange: e => walletAction(() => apiSend('PATCH', { pathname: d.pathname, act: e.target.value })),
        style: 'flex:1;min-width:0;font-family:inherit;font-size:12px;padding:5px 10px;border-radius:999px;border:1px solid var(--color-neutral-400);background:var(--color-bg);color:var(--color-neutral-800)'
      },
        el('option', { value: '', text: T.ui.generalTrip }),
        Object.keys(ACT_LABELS).map(k => el('option', { value: k, text: ACT_LABELS[k] }))
      );
      select.value = d.act || '';
      return el('div', { style: 'display:grid;gap:7px;padding:10px 12px;background:var(--color-neutral-100);border-radius:14px' },
        el('div', { style: 'display:flex;gap:8px;align-items:center' },
          el('span', { style: 'flex-shrink:0;color:var(--color-accent-700);display:flex' }, svg(13, LINK_ICON)),
          el('button', {
            type: 'button', text: d.name, onclick: () => openPreview(d.id), 'data-key': 'walletdoc-' + d.id,
            style: 'flex:1;min-width:0;font-family:inherit;font-size:13px;font-weight:700;overflow-wrap:anywhere;background:none;border:none;padding:0;cursor:pointer;text-align:left;color:var(--color-accent-700)'
          }),
          el('button', {
            type: 'button', text: '×', 'aria-label': tpl(T.ui.removeDoc, { name: d.name }), 'data-key': 'walletdel-' + d.id,
            disabled: state.busy,
            onclick: () => { if (confirm(tpl(T.ui.confirmRemove, { name: d.name }))) walletAction(() => apiSend('DELETE', { pathname: d.pathname })); },
            style: 'background:none;border:none;cursor:pointer;font-size:17px;line-height:1;color:var(--color-neutral-600);padding:0 2px'
          })
        ),
        el('div', { style: 'display:flex;gap:8px;align-items:center' },
          select,
          el('span', { text: sizeLabel(d.size), style: 'font-size:11.5px;color:var(--color-neutral-600);flex-shrink:0' })
        )
      );
    }));
  }

  function renderReplan() {
    const btn = $('replanBtn');
    btn.hidden = false;
    btn.textContent = state.editing ? T.ui.replanDone : T.ui.replan;
    btn.className = 'btn ' + (state.editing ? 'btn-primary' : 'btn-secondary');
    const pencil = $('dayEdit');
    pencil.hidden = !state.editing;
    pencil.setAttribute('aria-label', T.ui.editDay);
    pencil.title = T.ui.editDay;
    $('replanBar').hidden = !state.editing;
    $('replanHint').textContent = T.ui.replanHint;

    const chip = $('syncChip');
    chip.hidden = state.sync === 'idle';
    chip.textContent = state.sync === 'saving' ? T.ui.syncSaving
      : state.sync === 'saved' ? T.ui.syncSaved
      : T.ui.syncError;
    chip.title = state.sync === 'error' ? (state.syncMsg || '') : '';
    chip.style.cursor = state.sync === 'error' ? 'pointer' : 'default';
    chip.style.background = state.sync === 'error' ? 'var(--color-accent-200)' : 'var(--color-accent-2-200)';
    chip.style.color = state.sync === 'error' ? 'var(--color-accent-900)' : 'var(--color-accent-2-900)';
  }

  // Every list is rebuilt from scratch on each render, which would throw
  // away the focused control — ticking an activity with the keyboard would
  // drop you back to the top of the page. Each control carries a stable
  // data-key so focus can land back on the same one afterwards.
  // — what the assistant reads ——————————————————————————————————
  // chat.js turns this into the briefing it sends with every question. It
  // reads through the same resolvers as the page, so a replanned stop, a
  // ticked moment and a document in the wallet all reach the answer. The
  // words come out in the language on screen; the ids stay, so a stop the
  // assistant names can be matched back to the one on the page.
  window.TripPlan = {
    locked: () => state.locked,
    snapshot: () => ({
      currency: state.currency,
      replanned: !!state.plan,
      days: DAYS.map((d, i) => ({
        n: i + 1,
        dom: d.dom,
        ...dayWords(i),
        acts: dayActs(i).map(a => {
          const words = actWords(a) || {};
          return {
            id: a.id, t: a.t, cat: a.cat, eur: a.eur ?? null,
            title: words.title || '', desc: words.desc || '', tip: words.tip || '',
            // The baked-in table only: a stop added or retitled while
            // replanning has no entry, and its own title says it better than
            // a guessed map query would.
            where: MAPS[a.id] || null,
            done: !!state.done[a.id]
          };
        })
      })),
      bookings: bookingRows().map(b => ({ text: bookingText(b), done: !!state.done[b.id] })),
      docs: state.docs.map(d => ({ name: d.name, pinned: (d.act && ACT_LABELS[d.act]) || null }))
    })
  };

  // chat.js hides itself while the wallet is locked; it can't see `state`,
  // so say when that changes rather than making it poll.
  let toldLocked = null;
  function announceLock() {
    if (state.locked === toldLocked) return;
    toldLocked = state.locked;
    document.dispatchEvent(new CustomEvent('celik:lock', { detail: { locked: state.locked } }));
  }

  function render() {
    const active = document.activeElement;
    const key = active && active.getAttribute ? active.getAttribute('data-key') : null;
    indexActs();
    renderReplan();
    renderDayPills();
    renderFilters();
    renderDay();
    renderTracker();
    renderBookings();
    renderWallet();
    announceLock();
    if (key) {
      const next = document.querySelector('[data-key="' + CSS.escape(key) + '"]');
      if (next) next.focus();
    }
  }

  $('uploadGeneral').addEventListener('click', () => upload(''));
  $('replanBtn').addEventListener('click', toggleReplan);
  $('dayEdit').addEventListener('click', () => openDayDialog(state.day));
  $('syncChip').addEventListener('click', () => {
    if (state.sync === 'error') { clearTimeout(saveTimer); savePlan(); }
  });
  // A tab closed inside the debounce window would lose the newest edit.
  window.addEventListener('beforeunload', e => {
    if (state.sync === 'saving' || saveBusy) { e.preventDefault(); e.returnValue = ''; }
  });
  document.querySelectorAll('[data-currency]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currency = btn.dataset.currency;
      try { localStorage.setItem('celik-spain-currency', state.currency); } catch (e) {}
      document.querySelectorAll('[data-currency]').forEach(b => {
        const on = b.dataset.currency === state.currency;
        b.setAttribute('aria-pressed', String(on));
        b.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary');
      });
      render();
    });
    const on = btn.dataset.currency === state.currency;
    btn.setAttribute('aria-pressed', String(on));
    btn.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary');
  });

  // Switching language reloads the page — ticks, currency and the unlock
  // cookie all survive, and the map iframe comes back in the new language.
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const on = btn.dataset.lang === window.I18N.lang;
    btn.setAttribute('aria-pressed', String(on));
    btn.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary');
    btn.addEventListener('click', () => window.I18N.set(btn.dataset.lang));
  });

  applyStatic();
  render();
  refreshWallet();
  loadPlan();
})();
