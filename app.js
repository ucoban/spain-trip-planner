/* España · the Çelik plan — itinerary state, wallet, and rendering.
   Everything the trip remembers (ticked moments, uploaded documents, the
   chosen currency and language) lives in localStorage, so the plan survives
   a reload without a backend.

   No words live in this file: every user-facing string — itinerary text
   included — comes from window.I18N (i18n.js), which loads first. This file
   keeps only the trip's skeleton: ids, times, prices, categories, colours. */
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
    event: { bg: 'var(--color-accent-300)', fg: 'var(--color-accent-900)' }
  };

  const FILTERS = ['all', 'boat', 'swim', 'sights', 'museum', 'food', 'event'];

  const DAYS = [
    { dom: '8', dot: 'var(--color-accent)', acts: [
      { id: 'd1b1', t: '07:30', cat: 'travel', eur: 95 },
      { id: 'd1b2', t: '15:00', cat: 'travel', eur: 5 },
      { id: 'd1b3', t: '18:30', cat: 'sights', eur: 0 },
      { id: 'd1b4', t: '21:00', cat: 'food', eur: 25 }
    ] },
    { dom: '9', dot: 'var(--color-accent)', acts: [
      { id: 'd2b1', t: '09:00', cat: 'sights', eur: 26 },
      { id: 'd2b2', t: '13:00', cat: 'food', eur: 18 },
      { id: 'd2b3', t: '17:30', cat: 'sights', eur: 13 },
      { id: 'd2b4', t: '21:00', cat: 'event', eur: 45 }
    ] },
    { dom: '10', dot: 'var(--color-accent)', acts: [
      { id: 'd3b1', t: '08:15', cat: 'travel', eur: 24 },
      { id: 'd3b2', t: '10:00', cat: 'sights', eur: 16 },
      { id: 'd3b3', t: '18:00', cat: 'swim', eur: 0 },
      { id: 'd3b4', t: '20:30', cat: 'food', eur: 35 }
    ] },
    { dom: '11', dot: 'linear-gradient(135deg, var(--color-accent) 50%, var(--color-accent-2) 50%)', acts: [
      { id: 'd4b1', t: '09:00', cat: 'food', eur: 6 },
      { id: 'd4b2', t: '09:45', cat: 'sights', eur: 0 },
      { id: 'd4b3', t: '10:30', cat: 'museum', eur: 12 },
      { id: 'd4b4', t: '12:15', cat: 'sights', eur: 4 },
      { id: 'd4b5', t: '14:05', cat: 'travel', eur: 30 },
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
      { id: 'd6b2', t: '10:30', cat: 'sights', eur: 32 },
      { id: 'd6b3', t: '14:15', cat: 'food', eur: 25 },
      { id: 'd6b4', t: '19:00', cat: 'boat', eur: 8 },
      { id: 'd6b5', t: '20:45', cat: 'event', eur: 0 }
    ] },
    { dom: '14', dot: 'var(--color-neutral-500)', acts: [
      { id: 'd7b1', t: '09:00', cat: 'sights', eur: 0 },
      { id: 'd7b2', t: '12:30', cat: 'travel', eur: 95 }
    ] }
  ];

  const BOOKINGS = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'];

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
  DAYS.forEach((d, i) => d.acts.forEach(a => {
    ACT_INDEX[a.id] = tpl(T.ui.dayN, { n: i + 1 }) + ' · ' + T.acts[a.id].title;
  }));

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

  // — static text ————————————————————————————————————————————————
  // The markup ships with English as its fallback; this swaps every tagged
  // node to the active language before the first render.
  function applyStatic() {
    document.title = T.htmlTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T.metaDesc);
    document.querySelectorAll('[data-i18n]').forEach(n => {
      const s = T.static[n.getAttribute('data-i18n')];
      if (s != null) n.textContent = s;
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

  // — document preview ———————————————————————————————————————————
  let lastFocus = null;
  function openPreview(docId) {
    const doc = state.docs.find(d => d.id === docId);
    if (!doc) return;
    lastFocus = document.activeElement;
    const meta = (doc.act ? ACT_INDEX[doc.act] : T.ui.generalTrip) + ' · ' + sizeLabel(doc.size);

    const body = doc.kind === 'image'
      ? el('img', { src: fileUrl(doc), alt: tpl(T.ui.previewOf, { name: doc.name }),
          style: 'display:block;width:100%;height:60vh;object-fit:contain;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
      : doc.kind === 'pdf'
        ? el('iframe', { src: fileUrl(doc), title: tpl(T.ui.previewOf, { name: doc.name }),
            style: 'width:100%;height:60vh;border:none;border-radius:var(--radius-lg);background:var(--color-neutral-100)' })
        : el('p', { text: T.ui.noPreview,
            style: 'margin:0;padding:28px;border:1px dashed var(--color-neutral-400);border-radius:var(--radius-lg);font-size:14px;color:var(--color-neutral-700);text-align:center' });

    const closeBtn = el('button', { type: 'button', class: 'btn btn-ghost btn-icon', 'aria-label': T.ui.closePreview, text: '×', onclick: close });
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
        el('span', { text: tpl(T.pill, { dow: T.dows[i], dom: d.dom }) })
      );
    }));
  }

  function renderFilters() {
    const row = $('filterRow');
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

  function activityCard(a) {
    const isDone = !!state.done[a.id];
    const c = CATS[a.cat];
    const x = T.acts[a.id];
    const cost = fmt(a.eur);
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
            cost && el('span', { class: 'tag tag-neutral', text: cost })
          ),
          el('p', { text: x.desc, style: 'margin:0;font-size:14.5px;line-height:1.55;color:var(--color-neutral-800);text-wrap:pretty' }),
          x.tip && el('p', { text: x.tip, style: 'margin:10px 0 0;font-size:13px;line-height:1.5;background:var(--color-accent-2-100);color:var(--color-accent-2-900);border-radius:14px;padding:8px 14px;display:inline-block' }),
          docRow
        ),
        el('button', {
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

  function renderDay() {
    const day = DAYS[state.day];
    const dt = T.days[state.day];
    $('dayTitle').textContent = dt.title;
    $('dayCity').textContent = dt.city;
    $('daySub').textContent = dt.sub;
    const acts = day.acts.filter(a => state.filter === 'all' || a.cat === state.filter);
    $('actList').replaceChildren(...acts.map(activityCard));
    $('emptyMsg').hidden = acts.length > 0;
  }

  function renderTracker() {
    const doneCount = ALL_ACTS.filter(a => state.done[a.id]).length;
    const pct = Math.round((doneCount / ALL_ACTS.length) * 100);
    const counts = { done: doneCount, total: ALL_ACTS.length };
    $('navCount').textContent = tpl(T.ui.navCount, counts);
    $('pct').textContent = pct + '%';
    $('trackerCount').textContent = tpl(T.ui.trackerCount, counts);
    $('bar').style.width = pct + '%';
  }

  function renderBookings() {
    $('bookingList').replaceChildren(...BOOKINGS.map(id => {
      const isDone = !!state.done[id];
      return el('button', {
        type: 'button', 'aria-pressed': String(isDone), onclick: () => toggle(id), 'data-key': 'book-' + id,
        style: 'display:flex;gap:10px;align-items:flex-start;background:none;border:none;padding:0;cursor:pointer;text-align:left;font-family:inherit'
      },
        el('span', {
          'aria-hidden': 'true', text: isDone ? '✓' : '',
          style: 'width:21px;height:21px;border-radius:50%;flex-shrink:0;margin-top:1px;' +
            'border:2px solid var(--color-accent-2-600);background:' + (isDone ? 'var(--color-accent-2-600)' : 'transparent') + ';' +
            'color:#fff;font-size:12px;font-weight:700;line-height:17px;text-align:center'
        }),
        el('span', { text: T.bookings[id], style: 'font-size:13px;line-height:1.45;color:var(--color-neutral-800);text-decoration:' + (isDone ? 'line-through' : 'none') })
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
})();
