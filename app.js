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
    { dow: 'Tue', dom: '22', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Wigston → Barcelona', sub: 'Tuesday 22 Sep · plane day — into the Gothic Quarter by dusk', acts: [
      { id: 'd1a1', t: '07:30', cat: 'travel', title: 'Fly EMA → Barcelona', desc: 'Taxi from Wigston at 07:30 — East Midlands is 45 minutes up the M1. Wheels up 10:35, wheels down 13:55. One cabin bag each.', eur: 95 },
      { id: 'd1a2', t: '15:00', cat: 'travel', title: 'Aerobús + check-in', desc: 'A2 bus to Plaça de Catalunya, ten-minute walk to the Eixample apartment. Bags down, out again by four.', eur: 8 },
      { id: 'd1a3', t: '17:30', cat: 'sights', title: 'Gothic Quarter first wander', desc: 'Cathedral cloister (say hi to the thirteen geese), Plaça Sant Felip Neri, then the lampposts of Plaça Reial.', tip: 'Izem: the Reial lamps are Gaudí’s first ever commission — student work, pre-everything.', eur: 0 },
      { id: 'd1a4', t: '20:30', cat: 'food', title: 'Tapas crawl, Carrer de la Mercè', desc: 'Standing-room bars: bravas, pan con tomate, a vermut each. Order badly, point a lot, repeat.', eur: 25 }
    ] },
    { dow: 'Wed', dom: '23', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Gaudí, all day', sub: 'Wednesday 23 Sep · the full pilgrimage, ending on a rooftop with cava', acts: [
      { id: 'd2a1', t: '09:00', cat: 'sights', title: 'Sagrada Família', desc: 'First slot of the day, before the crowds. Nativity façade outside, then the stone forest and the stained-glass wall of fire and sea.', tip: 'Izem: add the Passion tower — the spiral stair down is the drawing of the day.', eur: 26 },
      { id: 'd2a2', t: '12:30', cat: 'food', title: 'Menú del día, Eixample', desc: 'Three courses and a glass of wine for meal-deal money. If arroz is on the board, it’s decided.', eur: 15 },
      { id: 'd2a3', t: '15:00', cat: 'sights', title: 'Park Güell', desc: 'The mosaic salamander, the wavy bench with the city behind it, the colonnade holding up a road. Timed entry — don’t be late.', eur: 10 },
      { id: 'd2a4', t: '18:45', cat: 'event', title: 'Casa Batlló — Magic Nights', desc: 'Twilight visit through the dragon house, then live music and a drink up on the scaled rooftop.', tip: 'Ahmet: yes, the drink is included.', eur: 45 }
    ] },
    { dow: 'Thu', dom: '24', dot: 'var(--color-accent)', city: 'Barcelona', title: 'Sea day + La Mercè', sub: 'Thursday 24 Sep · swim, sail, then Barcelona on fire (on purpose)', acts: [
      { id: 'd3a1', t: '09:30', cat: 'swim', title: 'Barceloneta morning swim', desc: 'The sea is still about 23 °C in late September. Swim first, croissant after — the local order of operations.', eur: 0 },
      { id: 'd3a2', t: '11:30', cat: 'boat', title: 'Las Golondrinas harbour cruise', desc: 'Ninety minutes out of Port Vell, past the breakwater and back along the beaches. The “swallow boats” have run since 1888.', eur: 12 },
      { id: 'd3a3', t: '14:00', cat: 'food', title: 'Paella at Can Solé', desc: 'Open since 1903, two streets back from the sand. Get the arròs negre as well — braver than it looks.', eur: 30 },
      { id: 'd3a4', t: '16:30', cat: 'museum', title: 'Museu Picasso', desc: 'Five Gothic palaces of early Picasso, ending in the room of Las Meninas he painted at seventy-six.', tip: 'Ahmet: student card = reduced entry.', eur: 12 },
      { id: 'd3a5', t: '19:00', cat: 'event', title: 'La Mercè: castellers', desc: 'Human towers in Plaça de Sant Jaume — the city’s biggest festival happens to be this exact week. Free, packed, unforgettable.', eur: 0 },
      { id: 'd3a6', t: '21:30', cat: 'event', title: 'Correfoc — the fire run', desc: 'Devils and dragons shower sparks down Via Laietana. Cotton clothes, stand at the edges, leave the nice jacket at home.', eur: 0 }
    ] },
    { dow: 'Fri', dom: '25', dot: 'linear-gradient(135deg, var(--color-accent) 50%, var(--color-accent-2) 50%)', city: 'BCN → València', title: 'Montjuïc, then south', sub: 'Friday 25 Sep · one last hill, then the coast train to city two', acts: [
      { id: 'd4a1', t: '09:00', cat: 'sights', title: 'Cable car up Montjuïc', desc: 'Over the port to the castle ramparts — the goodbye view of Barcelona, ships and all.', eur: 14 },
      { id: 'd4a2', t: '11:00', cat: 'museum', title: 'MNAC in an hour', desc: 'The Romanesque fresco halls (nothing else like them), then coffee on the steps above the Magic Fountain.', eur: 12 },
      { id: 'd4a3', t: '14:05', cat: 'travel', title: 'Euromed to València', desc: 'Sants → València Nord, 2h40 down the coast. Sit on the left — the Mediterranean does the entertainment.', eur: 30 },
      { id: 'd4a4', t: '18:00', cat: 'sights', title: 'Turia Gardens hello-walk', desc: 'Nine kilometres of park where the river used to be. Walk as far as the Gulliver playground and back.', eur: 0 },
      { id: 'd4a5', t: '21:00', cat: 'food', title: 'Dinner in Ruzafa', desc: 'València’s liveliest barrio. Agua de València comes by the jug — one jug, shared, that’s the rule.', eur: 22 }
    ] },
    { dow: 'Sat', dom: '26', dot: 'var(--color-accent-2)', city: 'València', title: 'Calatrava day', sub: 'Saturday 26 Sep · the white city, then Europe’s biggest aquarium', acts: [
      { id: 'd5a1', t: '09:30', cat: 'sights', title: 'City of Arts & Sciences', desc: 'The Hemisfèric eye, the Umbracle palm walk, white ribs against blue sky in every direction.', tip: 'Izem: sketchbook day. Morning light on the Hemisfèric is the shot.', eur: 0 },
      { id: 'd5a2', t: '11:00', cat: 'museum', title: 'Science Museum', desc: 'Príncipe Felipe — hands-on halls inside a concrete whale skeleton. Touching things is mandatory.', eur: 9 },
      { id: 'd5a3', t: '13:30', cat: 'food', title: 'Lunch under the Umbracle', desc: 'Something cold and quick in the shade — the afternoon belongs to the fish.', eur: 15 },
      { id: 'd5a4', t: '15:00', cat: 'sights', title: 'Oceanogràfic', desc: 'Europe’s biggest aquarium: the shark tunnel, belugas, and a jellyfish room built for standing very still in.', eur: 34 },
      { id: 'd5a5', t: '19:30', cat: 'event', title: 'Sunset at Veles e Vents', desc: 'Vermut on the marina terraces, under the building that looks like it’s about to set sail.', eur: 8 }
    ] },
    { dow: 'Sun', dom: '27', dot: 'var(--color-accent-2)', city: 'València', title: 'Old town Sunday', sub: 'Sunday 27 Sep · Gothic València, market breakfast, golden hour', acts: [
      { id: 'd6a1', t: '09:30', cat: 'sights', title: 'La Lonja de la Seda', desc: 'The UNESCO silk exchange — Gothic columns twisted like rope pulled tight. Two euros, somehow.', tip: 'Izem: the Sala de Contratación. Fifteen minutes of just looking.', eur: 2 },
      { id: 'd6a2', t: '11:00', cat: 'food', title: 'Central Market + horchata', desc: 'One of Europe’s great iron-and-glass markets, across the street. Horchata and fartons at the counter — Ahmet’s new personality.', eur: 6 },
      { id: 'd6a3', t: '12:30', cat: 'sights', title: 'Cathedral + El Miguelete', desc: '207 steps up the bell tower for the whole city in one slow turn. The cathedral also claims the Holy Grail. Sure.', eur: 9 },
      { id: 'd6a4', t: '17:00', cat: 'museum', title: 'Fallas Museum', desc: 'Every year since 1934 one giant ninot is pardoned from the March bonfires. This is where the survivors live.', eur: 2 },
      { id: 'd6a5', t: '19:30', cat: 'sights', title: 'Serranos Towers, golden hour', desc: 'Climb the medieval gate as the light goes honey-coloured over the old riverbed.', eur: 2 }
    ] },
    { dow: 'Mon', dom: '28', dot: 'var(--color-accent-2)', city: 'València', title: 'Albufera + the beach', sub: 'Monday 28 Sep · beach morning, lagoon evening', acts: [
      { id: 'd7a1', t: '10:30', cat: 'swim', title: 'Malvarosa beach', desc: 'Wide, flat, warm — proper swimming, then lying down professionally. Promenade horchata within arm’s reach.', eur: 0 },
      { id: 'd7a2', t: '13:30', cat: 'food', title: 'Paella at its birthplace', desc: 'El Palmar village, where paella is actually from. Rabbit-and-bean valenciana, or all i pebre eel stew for the brave.', eur: 25 },
      { id: 'd7a3', t: '16:30', cat: 'boat', title: 'Albufera lagoon boat trip', desc: 'A flat-bottomed albuferenc glides you through reeds and rice paddies — Europe’s rice bowl from water level.', eur: 8 },
      { id: 'd7a4', t: '19:45', cat: 'event', title: 'Albufera sunset', desc: 'The sky show locals drive out for. Stay on the jetty until the last orange is gone.', eur: 0 }
    ] },
    { dow: 'Tue', dom: '29', dot: 'var(--color-neutral-500)', city: 'Home', title: 'Adiós, España', sub: 'Tuesday 29 Sep · last walk, fly home', acts: [
      { id: 'd8a1', t: '09:00', cat: 'sights', title: 'Last loop of the Turia', desc: 'Under Calatrava’s white bridges one more time. Buy the fartons that will not survive the flight.', eur: 0 },
      { id: 'd8a2', t: '12:30', cat: 'travel', title: 'Fly València → East Midlands', desc: 'Metro to the airport in 25 minutes. Land at EMA 16:05, taxi to Wigston, kettle on by six.', eur: 95 }
    ] }
  ];

  const BOOKINGS = [
    { id: 'b1', label: 'Flights: EMA → Barcelona out, València → EMA home' },
    { id: 'b2', label: 'Sagrada Família — 09:00 slot, Wed 23' },
    { id: 'b3', label: 'Park Güell timed entry, Wed 23' },
    { id: 'b4', label: 'Casa Batlló Magic Nights, Wed 23' },
    { id: 'b5', label: 'Museu Picasso (Ahmet: student rate)' },
    { id: 'b6', label: 'Euromed train, Fri 25 — left-side seats' },
    { id: 'b7', label: 'Arts & Sciences + Oceanogràfic combo ticket' },
    { id: 'b8', label: 'Albufera boat — book for Monday evening' }
  ];

  const LINK_ICON = '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>';

  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  };

  const state = {
    day: 0,
    filter: 'all',
    done: read('celik-spain-done', {}),
    docs: read('celik-spain-docs', []),
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
  function saveDocs(docs) {
    try { localStorage.setItem('celik-spain-docs', JSON.stringify(docs)); }
    catch (e) { alert('The wallet is full — remove a document to make room.'); return; }
    state.docs = docs;
    render();
  }
  function upload(actId) {
    const input = el('input', { type: 'file', multiple: true });
    input.onchange = () => {
      const files = Array.from(input.files || []);
      let pending = files.length;
      if (!pending) return;
      const added = [];
      const finish = () => { if (--pending === 0 && added.length) saveDocs(state.docs.concat(added)); };
      files.forEach(f => {
        if (f.size > 3 * 1024 * 1024) { alert(f.name + ' is over 3 MB — too big for the wallet.'); finish(); return; }
        const r = new FileReader();
        r.onload = () => {
          added.push({
            id: 'f' + Date.now() + Math.random().toString(36).slice(2, 6),
            name: f.name, size: f.size, act: actId || '', dataUrl: r.result
          });
          finish();
        };
        r.onerror = finish;
        r.readAsDataURL(f);
      });
    };
    input.click();
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
    const isImage = doc.dataUrl.indexOf('data:image/') === 0;
    const isPdf = doc.dataUrl.indexOf('data:application/pdf') === 0;
    const meta = (doc.act ? ACT_INDEX[doc.act] : 'General — whole trip') + ' · ' + sizeLabel(doc.size);

    const body = isImage
      ? el('div', { role: 'img', 'aria-label': 'Preview of ' + doc.name,
          style: 'width:100%;height:60vh;background-image:url("' + doc.dataUrl + '");background-size:contain;background-repeat:no-repeat;background-position:center;border-radius:var(--radius-lg);background-color:var(--color-neutral-100)' })
      : isPdf
        ? el('iframe', { src: doc.dataUrl, title: 'Preview of ' + doc.name,
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
        el('a', { class: 'btn btn-secondary', href: doc.dataUrl, download: doc.name, text: 'Download' }),
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
        type: 'button', text: '+ ticket / doc', onclick: () => upload(a.id), 'data-key': 'attach-' + a.id,
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

  function renderWallet() {
    const list = $('walletList');
    if (!state.docs.length) { list.style.display = 'none'; list.replaceChildren(); return; }
    list.style.display = 'grid';
    list.replaceChildren(...state.docs.map(d => {
      const select = el('select', {
        'aria-label': 'Pin ' + d.name + ' to a stop', 'data-key': 'pin-' + d.id,
        onchange: e => saveDocs(state.docs.map(x => x.id === d.id ? Object.assign({}, x, { act: e.target.value }) : x)),
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
            onclick: () => saveDocs(state.docs.filter(x => x.id !== d.id)),
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
})();
