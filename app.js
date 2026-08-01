/* España · the Çelik plan — itinerary state, wallet, and rendering.
   Everything the trip remembers (ticked moments, uploaded documents, the
   chosen currency) lives in localStorage, so the plan survives a reload
   without a backend. */
(() => {
  'use strict';

  const CATS = {
    travel: { label: 'Transit', bg: 'transparent', fg: 'var(--color-neutral-700)', bd: '1px solid var(--color-neutral-400)' },
    sights: { label: 'Sights', bg: 'var(--color-accent-200)', fg: 'var(--color-accent-900)' },
    museum: { label: 'Museum', bg: 'var(--color-accent-100)', fg: 'var(--color-accent-800)' },
    boat: { label: 'Boat trip', bg: 'var(--color-accent-2-200)', fg: 'var(--color-accent-2-900)' },
    swim: { label: 'Swim', bg: 'var(--color-accent-2-100)', fg: 'var(--color-accent-2-800)' },
    food: { label: 'Food & drink', bg: 'var(--color-neutral-200)', fg: 'var(--color-neutral-800)' },
    event: { label: 'Fiesta', bg: 'var(--color-accent-300)', fg: 'var(--color-accent-900)' }
  };

  const FILTERS = [
    ['all', 'Everything'], ['boat', 'Boat trips'], ['swim', 'Swimming'], ['sights', 'Sights'],
    ['museum', 'Museums'], ['food', 'Food'], ['event', 'Fiestas']
  ];

  const DAYS = [
    { dow: 'Sat', dom: '8', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Wigston → Barcelona', sub: 'Saturday 8 Aug · plane day, into the Gothic Quarter by dusk', acts: [
      { id: 'd1b1', t: '07:30', cat: 'travel', title: 'Fly EMA → Barcelona', desc: 'Taxi from Wigston at 07:30, East Midlands is 45 minutes up the M1. Wheels up 10:35, wheels down 13:55. One cabin bag each.', eur: 95 },
      { id: 'd1b2', t: '15:00', cat: 'travel', title: 'Airport train + check-in', desc: 'R2 Nord train, every half hour, straight to Passeig de Gràcia. Ten-minute walk to the Eixample apartment, bags down, cold shower, out by six.', tip: 'From the vlogs: the airport train beats the August bus queue and costs about a fiver.', eur: 5 },
      { id: 'd1b3', t: '18:30', cat: 'sights', title: 'Gothic Quarter first wander', desc: 'Cathedral cloister (say hi to the thirteen geese), Plaça Sant Felip Neri, then the lampposts of Plaça Reial.', tip: 'Izem: the Reial lamps are Gaudí’s first ever commission. Student work, pre-everything.', eur: 0 },
      { id: 'd1b4', t: '21:00', cat: 'food', title: 'Tapas crawl, Carrer de la Mercè', desc: 'Standing-room bars: bravas, pan con tomate, a vermut each. Order badly, point a lot, repeat.', tip: 'From the vlogs: locals eat after nine, and the old-town lanes are pickpocket turf. Phones zipped, bags worn in front.', eur: 25 }
    ] },
    { dow: 'Sun', dom: '9', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Gaudí, all day', sub: 'Sunday 9 Aug · the full pilgrimage, paced for the heat', acts: [
      { id: 'd2b1', t: '09:00', cat: 'sights', title: 'Sagrada Família', desc: 'First slot of the day, before the crowds and the worst of the sun. Nativity façade outside, then the stone forest and the stained-glass wall of fire and sea.', tip: 'Izem: add the Passion tower, the spiral stair down is the drawing of the day.', eur: 26 },
      { id: 'd2b2', t: '13:00', cat: 'food', title: 'Long shaded lunch, Eixample', desc: 'Casa Milà’s stone wave from across the street on the way there. Then the August rule the vlogs all land on: a slow indoor lunch while the city bakes, nobody moves before five.', eur: 18 },
      { id: 'd2b3', t: '17:30', cat: 'sights', title: 'Park Güell', desc: 'The mosaic salamander, the wavy bench with the city behind it, the colonnade holding up a road. Timed entry, don’t be late.', tip: 'From the vlogs: go early or go late in August, never at two. The bench faces the evening light, and it’s metro L4 plus the escalators up.', eur: 13 },
      { id: 'd2b4', t: '21:00', cat: 'event', title: 'Casa Batlló Magic Nights', desc: 'Twilight visit through the dragon house, then live music and a drink up on the scaled rooftop.', tip: 'Ahmet: yes, the drink is included.', eur: 45 }
    ] },
    { dow: 'Mon', dom: '10', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Montserrat, then the sea', sub: 'Monday 10 Aug · the vloggers’ unanimous day trip, salt water by evening', acts: [
      { id: 'd3b1', t: '08:15', cat: 'travel', title: 'R5 train + rack railway up', desc: 'R5 from Plaça d’Espanya, then the cremallera up the cliff face. About an hour and a quarter, door to mountain.', tip: 'From the vlogs: roughly €24 return, and the early train beats both the coach tours and the heat.', eur: 24 },
      { id: 'd3b2', t: '10:00', cat: 'sights', title: 'Montserrat monastery + ridge walk', desc: 'The basilica and the Black Madonna, then the Sant Joan funicular to the ridge path: saw-tooth peaks with all of Catalonia below.', tip: 'From the vlogs: three separate creators called this the best thing they did near Barcelona, and all three gave the same advice. Early.', eur: 16 },
      { id: 'd3b3', t: '18:00', cat: 'swim', title: 'Barceloneta evening swim', desc: 'The sea is 26 °C in August and evening is the local swim slot: cooler sand, golden light, croissant traded for a granizado.', tip: 'From the vlogs: never leave phones on the towel while you both swim. Take turns.', eur: 0 },
      { id: 'd3b4', t: '20:30', cat: 'food', title: 'Dinner at Can Solé', desc: 'Open since 1903, two streets back from the sand. Get the arròs negre, braver than it looks.', tip: 'From the vlogs: locals treat paella strictly as a lunch dish, so tonight is the squid-ink cousin. The real paella happens lakeside on Thursday, at two.', eur: 35 }
    ] },
    { dow: 'Tue', dom: '11', dot: 'linear-gradient(135deg, var(--color-accent) 50%, var(--color-accent-2) 50%)', city: 'BCN → València', title: 'Born morning, then south', sub: 'Tuesday 11 Aug · Picasso and one brisk Rambla, then the coast train to city two', acts: [
      { id: 'd4b1', t: '09:00', cat: 'food', title: 'Breakfast, Mercat de Santa Caterina', desc: 'The wavy-roofed market on the edge of El Born. Coffee, fruit and jamón at the counter.', tip: 'From the vlogs: same produce as La Boqueria, a fraction of the crush and the prices. One creator titled a whole chapter “a market BETTER than La Boqueria”. This is that market.', eur: 6 },
      { id: 'd4b2', t: '09:45', cat: 'sights', title: 'Santa Maria del Mar + Born lanes', desc: 'The sailors’ basilica, one soaring stone room. Then the medieval lanes to the museum door.', eur: 0 },
      { id: 'd4b3', t: '10:30', cat: 'museum', title: 'Museu Picasso', desc: 'Five Gothic palaces of early Picasso, ending in the room of Las Meninas he painted at seventy-six.', tip: 'Ahmet: student card = reduced entry.', eur: 12 },
      { id: 'd4b4', t: '12:15', cat: 'sights', title: 'La Rambla, once, briskly', desc: 'Walk it once for the theatre of it, one fresh juice inside La Boqueria, done by one o’clock.', tip: 'From the vlogs: La Rambla has the highest pickpocket concentration in Barcelona, and Boqueria prices are tourist prices. Look, sip, move on.', eur: 4 },
      { id: 'd4b5', t: '14:05', cat: 'travel', title: 'Euromed to València', desc: 'Bags from the apartment, then Sants → València Nord, around three hours down the coast. Sit on the left, the Mediterranean does the entertainment.', eur: 30 },
      { id: 'd4b6', t: '18:30', cat: 'sights', title: 'Turia Gardens hello-walk', desc: 'Nine kilometres of park where the river used to be. Walk as far as the Gulliver playground and back.', tip: 'From the vlogs: the Turia is best by bike. If tonight’s walk wins you over, rent a pair on Thursday morning.', eur: 0 },
      { id: 'd4b7', t: '21:00', cat: 'food', title: 'Dinner in Russafa', desc: 'València’s liveliest barrio, the one the vlogs call the trendy stay. Agua de València comes by the jug. One jug, shared, that’s the rule.', eur: 22 }
    ] },
    { dow: 'Wed', dom: '12', dot: 'var(--color-accent-2)', city: 'València', title: 'Old town + first swim', sub: 'Wednesday 12 Aug · market breakfast, Gothic noon, beach evening', acts: [
      { id: 'd5b1', t: '08:45', cat: 'food', title: 'Mercat Central, early', desc: 'One of Europe’s great iron-and-glass markets. Horchata and fartons at the counter, jamón and manchego for later. Ahmet’s new personality.', tip: 'From the vlogs: the single most-filmed stop in every València vlog we mined. It shuts at three and sleeps on Sunday, so it has to be a morning.', eur: 8 },
      { id: 'd5b2', t: '10:00', cat: 'sights', title: 'La Lonja de la Seda', desc: 'The UNESCO silk exchange, Gothic columns twisted like rope pulled tight. Two euros, somehow.', tip: 'Izem: the Sala de Contratación. Fifteen minutes of just looking.', eur: 2 },
      { id: 'd5b3', t: '11:30', cat: 'sights', title: 'Cathedral + El Miguelete', desc: '207 steps up the bell tower for the whole city in one slow turn. The cathedral also claims the Holy Grail. Sure.', eur: 9 },
      { id: 'd5b4', t: '13:30', cat: 'food', title: 'Menú del día, old town', desc: 'Three courses and a glass of something cold for meal-deal money, the great weekday-lunch institution.', tip: 'From the vlogs: one creator called the menú del día the best thing about Spain, full stop. Look for the chalkboard, not the laminated menu.', eur: 15 },
      { id: 'd5b5', t: '17:30', cat: 'swim', title: 'Malva-rosa beach', desc: 'The 1.50 € bus or a €10 taxi to the sand. Wide, flat, 27 °C water: proper swimming, then lying down professionally.', eur: 2 },
      { id: 'd5b6', t: '20:45', cat: 'sights', title: 'Serranos Towers, golden hour', desc: 'Climb the medieval gate as the light goes honey-coloured over the old riverbed.', eur: 2 },
      { id: 'd5b7', t: '21:30', cat: 'food', title: 'Dinner in El Carmen', desc: 'Street-art lanes and tapas tables in the oldest corner of the city.', tip: 'From the vlogs (the comments, actually): viewers kept pushing bunyols, pumpkin fritters with hot chocolate. Field-tested local knowledge.', eur: 20 }
    ] },
    { dow: 'Thu', dom: '13', dot: 'var(--color-accent-2)', city: 'València', title: 'Calatrava + the lagoon', sub: 'Thursday 13 Aug · white city morning, rice country evening', acts: [
      { id: 'd6b1', t: '09:00', cat: 'sights', title: 'City of Arts & Sciences', desc: 'The Hemisfèric eye, the Umbracle palm walk, white ribs against blue sky in every direction. By bike if Tuesday’s Turia walk converted you.', tip: 'Izem: sketchbook day. Morning light on the Hemisfèric is the shot.', eur: 0 },
      { id: 'd6b2', t: '10:30', cat: 'sights', title: 'Oceanogràfic', desc: 'Europe’s biggest aquarium: the shark tunnel, belugas, and a jellyfish room built for standing very still in.', tip: 'From the vlogs: about €32 on the door, cheaper and queue-free booked online. The jellyfish room doubles as air conditioning at noon.', eur: 32 },
      { id: 'd6b3', t: '14:15', cat: 'food', title: 'Paella at its birthplace', desc: 'Bus 24 or 25 south through the rice paddies to El Palmar, where paella is actually from. Rabbit-and-bean valenciana, or all i pebre eel stew for the brave.', tip: 'From the vlogs: paella is a lunch dish that takes 25 minutes and is ordered for two or more. At two o’clock in El Palmar you are doing it exactly right.', eur: 25 },
      { id: 'd6b4', t: '19:00', cat: 'boat', title: 'Albufera lagoon boat', desc: 'A flat-bottomed albuferenc glides you through reeds and rice paddies, Europe’s rice bowl from water level.', eur: 8 },
      { id: 'd6b5', t: '20:45', cat: 'event', title: 'Albufera sunset', desc: 'The sky show locals drive out for. Stay on the jetty until the last orange is gone.', eur: 0 }
    ] },
    { dow: 'Fri', dom: '14', dot: 'var(--color-neutral-500)', city: 'Home', title: 'Adiós, España', sub: 'Friday 14 Aug · last walk, fly home', acts: [
      { id: 'd7b1', t: '09:00', cat: 'sights', title: 'Last loop of the Turia', desc: 'Under Calatrava’s white bridges one more time. Buy the fartons that will not survive the flight.', eur: 0 },
      { id: 'd7b2', t: '12:30', cat: 'travel', title: 'Fly València → East Midlands', desc: 'Metro to the airport in 25 minutes. Land at EMA, taxi to Wigston, kettle on by six.', eur: 95 }
    ] }
  ];

  const BOOKINGS = [
    { id: 'k1', label: 'Flights: EMA → Barcelona out, València → EMA home' },
    { id: 'k2', label: 'Sagrada Família 09:00 slot, Sun 9 (vlogs: August sells out weeks ahead)' },
    { id: 'k3', label: 'Park Güell timed entry, Sun 9 · 17:30' },
    { id: 'k4', label: 'Casa Batlló Magic Nights, Sun 9' },
    { id: 'k5', label: 'Montserrat: R5 + cremallera return, Mon 10' },
    { id: 'k6', label: 'Can Solé table, Mon 10 evening (arrocerías book out in August)' },
    { id: 'k7', label: 'Museu Picasso timed entry, Tue 11 (Ahmet: student rate)' },
    { id: 'k8', label: 'Euromed 14:05, Tue 11, left-side seats' },
    { id: 'k9', label: 'Oceanogràfic online tickets, Thu 13 (vlogs: skips the door queue)' },
    { id: 'k10', label: 'Albufera sunset boat, Thu 13' }
  ];

  const LINK_ICON = '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>';

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
    currency: localStorage.getItem('celik-spain-currency') === 'EUR' ? 'EUR' : 'GBP'
  };

  const ALL_ACTS = DAYS.flatMap(d => d.acts);
  const ACT_INDEX = {};
  DAYS.forEach((d, i) => d.acts.forEach(a => { ACT_INDEX[a.id] = 'Day ' + (i + 1) + ' · ' + a.title; }));

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
  const svg = (size, path) => el('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': '2.75', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    'aria-hidden': 'true', svg: path
  });
  const $ = id => document.getElementById(id);

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
    // expired session.
    if (res.status === 401) state.locked = true;
    if (!res.ok) throw new Error(payload.error || 'That did not work. Try again.');
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
      if (!status.configured) state.walletMsg = 'This deployment has no WALLET_PASSPHRASE set yet.';
      if (state.locked) { render(); return; }
      state.docs = (await finishRequest(await fetch('/api/docs'))).docs || [];
    } catch (e) {
      state.walletMsg = 'Could not reach the wallet.';
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
          if (f.size > MAX_UPLOAD) { rejected.push(f.name + ' is over 4 MB'); continue; }
          const form = new FormData();
          form.append('file', f);
          form.append('act', actId || '');
          await finishRequest(await fetch('/api/docs', { method: 'POST', body: form }));
        }
        if (rejected.length) throw new Error(rejected.join('; ') + ' — too big for the wallet.');
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
    if (eur === 0) return 'Free';
    return state.currency === 'GBP' ? '£' + Math.round(eur * 0.87) + ' pp' : '€' + eur + ' pp';
  }
  const sizeLabel = bytes => {
    const kb = bytes / 1024;
    return kb > 900 ? (kb / 1024).toFixed(1) + ' MB' : Math.max(1, Math.round(kb)) + ' KB';
  };

  // — document preview ———————————————————————————————————————————
  let lastFocus = null;
  function openPreview(docId) {
    const doc = state.docs.find(d => d.id === docId);
    if (!doc) return;
    lastFocus = document.activeElement;
    const meta = (doc.act ? ACT_INDEX[doc.act] : 'General — whole trip') + ' · ' + sizeLabel(doc.size);

    const body = doc.kind === 'image'
      ? el('img', { src: fileUrl(doc), alt: 'Preview of ' + doc.name,
          style: 'display:block;width:100%;height:60vh;object-fit:contain;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
      : doc.kind === 'pdf'
        ? el('iframe', { src: fileUrl(doc), title: 'Preview of ' + doc.name,
            style: 'width:100%;height:60vh;border:none;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
        : el('p', { text: 'No inline preview for this file type — use Download to open it.',
            style: 'margin:0;padding:28px;border:1px dashed var(--color-neutral-400);border-radius:var(--radius-lg);font-size:14px;color:var(--color-neutral-700);text-align:center' });

    const closeBtn = el('button', { type: 'button', class: 'btn btn-ghost btn-icon', 'aria-label': 'Close preview', text: '×', onclick: close });
    const dialog = el('div', {
      'data-r': 'dialog', class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Document preview',
      style: 'max-width:760px;width:100%;max-height:88vh;display:flex;flex-direction:column;gap:14px;background:var(--color-bg);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);padding:20px 22px;overflow:auto',
      onclick: e => e.stopPropagation()
    },
      el('div', { style: 'display:flex;align-items:center;gap:12px' },
        el('div', { style: 'flex:1;min-width:0' },
          el('div', { text: doc.name, style: 'font-family:var(--font-heading);font-size:19px;overflow-wrap:anywhere' }),
          el('div', { text: meta, style: 'font-size:12.5px;color:var(--color-neutral-700);margin-top:2px' })
        ),
        el('a', { class: 'btn btn-secondary', href: fileUrl(doc, true), download: doc.name, text: 'Download' }),
        closeBtn
      ),
      body
    );

    const overlay = el('div', {
      'data-r': 'overlay', id: 'previewOverlay', onclick: close,
      style: 'position:fixed;inset:0;z-index:2000;background:rgba(32,30,29,.45);display:flex;align-items:center;justify-content:center;padding:24px'
    }, dialog);

    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') return;
      const focusable = dialog.querySelectorAll('a[href],button,iframe,[tabindex]:not([tabindex="-1"])');
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
    closeBtn.focus();
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
        el('span', { text: d.dow + ' ' + d.dom })
      );
    }));
  }

  function renderFilters() {
    const row = $('filterRow');
    row.replaceChildren(...FILTERS.map(([key, label]) => {
      const sel = key === state.filter;
      return el('button', {
        type: 'button', text: label, 'aria-pressed': String(sel), 'data-key': 'filter-' + key,
        onclick: () => { state.filter = key; render(); },
        style: 'padding:6px 14px;border-radius:999px;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;' +
          'border:1px solid ' + (sel ? 'var(--color-accent-2-700)' : 'var(--color-neutral-400)') + ';' +
          'background:' + (sel ? 'var(--color-accent-2-700)' : 'transparent') + ';' +
          'color:' + (sel ? '#fff' : 'var(--color-neutral-800)')
      });
    }));
  }

  function activityCard(a) {
    const isDone = !!state.done[a.id];
    const c = CATS[a.cat];
    const cost = fmt(a.eur);
    const attached = state.docs.filter(d => d.act === a.id);

    const docRow = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px' },
      attached.map(d => el('button', {
        type: 'button', onclick: () => openPreview(d.id), 'data-key': 'doc-' + d.id,
        style: 'display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:12px;font-weight:700;background:var(--color-accent-100);color:var(--color-accent-900);border:none;border-radius:999px;padding:5px 12px;cursor:pointer'
      }, svg(11, LINK_ICON), el('span', { text: d.name }))),
      el('button', {
        type: 'button', 'data-key': 'attach-' + a.id, disabled: state.busy,
        text: state.locked ? '+ ticket / doc (locked)' : '+ ticket / doc',
        title: state.locked ? 'Unlock the travel wallet in the sidebar first' : null,
        onclick: () => { if (state.locked) $('walletPass') && $('walletPass').focus(); else upload(a.id); },
        style: 'display:inline-flex;align-items:center;gap:5px;font-family:inherit;font-size:12px;font-weight:700;background:none;border:1px dashed var(--color-neutral-400);color:var(--color-neutral-700);border-radius:999px;padding:5px 12px;cursor:pointer'
      })
    );

    return el('div', { class: 'card', style: isDone ? 'opacity:.55' : '' },
      el('div', { 'data-r': 'actrow', style: 'display:flex;gap:16px;align-items:flex-start' },
        el('div', { text: a.t, style: 'min-width:50px;font-weight:700;font-size:14px;padding-top:3px;color:var(--color-neutral-800)' }),
        el('div', { style: 'flex:1' },
          el('div', { style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px' },
            el('span', { text: a.title, style: 'font-family:var(--font-heading);font-size:19px;text-decoration:' + (isDone ? 'line-through' : 'none') }),
            el('span', { text: c.label, style: 'font-size:11.5px;font-weight:700;letter-spacing:.02em;padding:3px 11px;border-radius:999px;background:' + c.bg + ';color:' + c.fg + ';border:' + (c.bd || 'none') }),
            cost && el('span', { class: 'tag tag-neutral', text: cost })
          ),
          el('p', { text: a.desc, style: 'margin:0;font-size:14.5px;line-height:1.55;color:var(--color-neutral-800);text-wrap:pretty' }),
          a.tip && el('p', { text: a.tip, style: 'margin:10px 0 0;font-size:13px;line-height:1.5;background:var(--color-accent-2-100);color:var(--color-accent-2-900);border-radius:14px;padding:8px 14px;display:inline-block' }),
          docRow
        ),
        el('button', {
          type: 'button', 'data-r': 'check', text: isDone ? '✓' : '', 'data-key': 'check-' + a.id,
          'aria-pressed': String(isDone), 'aria-label': (isDone ? 'Untick' : 'Tick off') + ' ' + a.title,
          onclick: () => toggle(a.id),
          style: 'width:30px;height:30px;border-radius:50%;flex-shrink:0;cursor:pointer;padding:0;' +
            'border:2px solid var(--color-accent);background:' + (isDone ? 'var(--color-accent)' : 'transparent') + ';' +
            'color:#fff;font-size:15px;font-weight:700;line-height:26px'
        })
      )
    );
  }

  function renderDay() {
    const day = DAYS[state.day];
    $('dayTitle').textContent = day.title;
    $('dayCity').textContent = day.city;
    $('daySub').textContent = day.sub;
    const acts = day.acts.filter(a => state.filter === 'all' || a.cat === state.filter);
    $('actList').replaceChildren(...acts.map(activityCard));
    $('emptyMsg').hidden = acts.length > 0;
  }

  function renderTracker() {
    const doneCount = ALL_ACTS.filter(a => state.done[a.id]).length;
    const pct = Math.round((doneCount / ALL_ACTS.length) * 100);
    $('navCount').textContent = doneCount + ' of ' + ALL_ACTS.length + ' ticked';
    $('pct').textContent = pct + '%';
    $('trackerCount').textContent = doneCount + ' of ' + ALL_ACTS.length + ' moments ticked';
    $('bar').style.width = pct + '%';
  }

  function renderBookings() {
    $('bookingList').replaceChildren(...BOOKINGS.map(b => {
      const isDone = !!state.done[b.id];
      return el('button', {
        type: 'button', 'aria-pressed': String(isDone), onclick: () => toggle(b.id), 'data-key': 'book-' + b.id,
        style: 'display:flex;gap:10px;align-items:flex-start;background:none;border:none;padding:0;cursor:pointer;text-align:left;font-family:inherit'
      },
        el('span', {
          'aria-hidden': 'true', text: isDone ? '✓' : '',
          style: 'width:21px;height:21px;border-radius:50%;flex-shrink:0;margin-top:1px;' +
            'border:2px solid var(--color-accent-2-600);background:' + (isDone ? 'var(--color-accent-2-600)' : 'transparent') + ';' +
            'color:#fff;font-size:12px;font-weight:700;line-height:17px;text-align:center'
        }),
        el('span', { text: b.label, style: 'font-size:13px;line-height:1.45;color:var(--color-neutral-800);text-decoration:' + (isDone ? 'line-through' : 'none') })
      );
    }));
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
        placeholder: 'Wallet passphrase', 'aria-label': 'Wallet passphrase', disabled: state.busy,
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
            text: state.busy ? '…' : 'Unlock', onclick: () => passDraft && unlock(passDraft)
          })
        ),
        state.walletMsg && note(state.walletMsg),
        // Their only copy is still in this browser. Say so, or it looks lost.
        legacyDocs.length && note(legacyDocs.length + ' document' + (legacyDocs.length > 1 ? 's' : '') +
          ' saved on this device is waiting to be moved across — unlock to keep ' +
          (legacyDocs.length > 1 ? 'them' : 'it') + '.')
      );
      return;
    }

    fill(
      legacyDocs.length && el('button', {
        type: 'button', class: 'btn btn-secondary btn-block', 'data-key': 'walletmigrate', disabled: state.busy,
        text: 'Move ' + legacyDocs.length + ' document' + (legacyDocs.length > 1 ? 's' : '') + ' off this device',
        onclick: migrateLegacy
      }),
      state.walletMsg && note(state.walletMsg)
    );
  }

  function renderWallet() {
    renderWalletGate();
    $('uploadGeneral').hidden = state.locked;
    $('uploadGeneral').disabled = state.busy;
    $('uploadGeneral').textContent = state.busy ? 'Working…' : 'Add a document';

    const list = $('walletList');
    if (!state.docs.length) { list.style.display = 'none'; list.replaceChildren(); return; }
    list.style.display = 'grid';
    list.replaceChildren(...state.docs.map(d => {
      const select = el('select', {
        'aria-label': 'Pin ' + d.name + ' to a stop', 'data-key': 'pin-' + d.id, disabled: state.busy,
        onchange: e => walletAction(() => apiSend('PATCH', { pathname: d.pathname, act: e.target.value })),
        style: 'flex:1;min-width:0;font-family:inherit;font-size:12px;padding:5px 10px;border-radius:999px;border:1px solid var(--color-neutral-400);background:var(--color-bg);color:var(--color-neutral-800)'
      },
        el('option', { value: '', text: 'General — whole trip' }),
        Object.keys(ACT_INDEX).map(k => el('option', { value: k, text: ACT_INDEX[k] }))
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
            type: 'button', text: '×', 'aria-label': 'Remove ' + d.name, 'data-key': 'walletdel-' + d.id,
            disabled: state.busy,
            onclick: () => { if (confirm('Remove ' + d.name + ' from the wallet?')) walletAction(() => apiSend('DELETE', { pathname: d.pathname })); },
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

  // Every list is rebuilt from scratch on each render, which would throw
  // away the focused control — ticking an activity with the keyboard would
  // drop you back to the top of the page. Each control carries a stable
  // data-key so focus can land back on the same one afterwards.
  function render() {
    const active = document.activeElement;
    const key = active && active.getAttribute ? active.getAttribute('data-key') : null;
    renderDayPills();
    renderFilters();
    renderDay();
    renderTracker();
    renderBookings();
    renderWallet();
    if (key) {
      const next = document.querySelector('[data-key="' + CSS.escape(key) + '"]');
      if (next) next.focus();
    }
  }

  $('uploadGeneral').addEventListener('click', () => upload(''));
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

  render();
  refreshWallet();
})();
