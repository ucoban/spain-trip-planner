/* España · the Çelik plan — the trip assistant.
 *
 * A panel that answers questions about this week. There's no retrieval and
 * no database: the whole trip is small enough to hand over at once, so every
 * question ships a briefing built right here from what the page already has
 * loaded — the live itinerary (window.TripPlan, so a replanned stop and a
 * ticked moment are in the answer), the field guide's 160 places and 133
 * tips, and both hotels. api/chat.js adds the model and streams the reply.
 *
 * The briefing splits in two. `brief` is the trip itself and changes only
 * when someone replans, so the server can park a cache breakpoint after it;
 * `live` is the date, the language, the ticks and the wallet, which move.
 *
 * As everywhere else, the words the reader sees come from i18n.js. The
 * headings inside the briefing don't: nobody reads those but the model, and
 * they stay English so the cached prefix doesn't fork per language.
 *
 * Gated on the wallet passphrase, twice: the panel refuses to compose while
 * app.js says the wallet is locked, and /api/chat checks the cookie anyway.
 */
(() => {
  'use strict';

  // Only the plan page has an itinerary to talk about.
  if (!window.TripPlan) return;

  const T = window.I18N.t;
  const C = T.chat;
  const tpl = window.I18N.fmt;
  // The field guide belongs to España; on another trip it is the wrong
  // island's places and would only mislead the answer.
  const GUIDE = (window.TRIP && !window.TRIP.hasGuide) ? null : window.GUIDE;
  const STAYS = window.STAYS;

  // Day one, so the briefing can date every day and count down to the flight.
  const START = (window.TRIP && window.TRIP.data && window.TRIP.data.start) || [2026, 7, 8]; // Sat 8 Aug 2026
  const FIRST_DAY = Date.UTC(START[0], START[1], START[2]);
  const DAY_MS = 86400000;
  const MAX_TURNS = 14; // 7 questions and their answers, then the oldest go
  const MAX_QUESTION = 4000;

  // — DOM helper (same shape as app.js and guide.js) ——————————————
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const k in (attrs || {})) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'style') n.style.cssText = v;
      else if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) n.append(c); });
    return n;
  }

  // ————————————————————————————————————————————————— the briefing —

  const locale = () => (window.I18N.lang === 'tr' ? 'tr-TR' : 'en-GB');
  // The dates are fixed; only their spelling follows the reader.
  const dayDate = i => new Date(FIRST_DAY + i * DAY_MS).toLocaleDateString(locale(), {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  });
  const money = eur => (eur == null ? '' : eur === 0 ? 'free' : '€' + eur + ' pp');

  function planSection(trip) {
    const lines = ['=== THE PLAN, DAY BY DAY ==='];
    if (trip.replanned) {
      lines.push('(Someone has replanned the week on the site. This is the current version, not the one it shipped with.)');
    }
    trip.days.forEach((day, i) => {
      lines.push('', 'DAY ' + day.n + ' · ' + dayDate(i) + ' · ' + day.city + ' · ' + day.title);
      if (day.sub) lines.push('  ' + day.sub);
      day.acts.forEach(a => {
        const tags = [T.cats[a.cat] || a.cat, money(a.eur)].filter(Boolean).join(' · ');
        lines.push('  ' + a.t + ' — ' + a.title + '  [' + tags + ']  (id ' + a.id + ')');
        if (a.where) lines.push('    Where: ' + a.where);
        if (a.desc) lines.push('    ' + a.desc);
        if (a.tip) lines.push('    Tip: ' + a.tip);
      });
    });
    return lines.join('\n');
  }

  function staysSection() {
    const lines = ['=== WHERE WE SLEEP ==='];
    const S = T.stays;
    // Looked up by key rather than listed, so a second trip's cities read
    // out of its own i18n (palTitle, whyCentrale…) with nothing to change.
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const price = (s, nights) => '£' + s.night + '/night, £' + s.total + ' for ' + nights + ' nights' +
      (s.tax > 0 ? ' plus £' + s.tax + ' taxes' : ', taxes in');
    const stat = (s, nights) => [s.area, s.km + ' km from the centre', price(s, nights),
      'guest score ' + s.score.toFixed(1) + ' from ' + s.rev + ' reviews',
      S.beds[s.id], s.cancel ? 'free cancellation' : null, s.payLater ? 'pay at the hotel' : null]
      .filter(Boolean).join(' · ');

    (STAYS ? STAYS.cities : []).forEach(city => {
      lines.push('', S[city.key + 'Title'], '  ' + S[city.key + 'Sub']);
      lines.push('  BOOKED: ' + city.pick.name + ' — ' + stat(city.pick, city.nights));
      (S['why' + cap(city.pick.id)] || []).forEach(w => lines.push('    Why: ' + w));
      lines.push('  Shortlisted but not booked:');
      city.alts.forEach(s => {
        lines.push('    ' + s.name + ' — ' + stat(s, city.nights) + (S.notes[s.id] ? ' — ' + S.notes[s.id] : ''));
      });
    });
    lines.push('', S.totalLine, S.totalNote, S.updated);
    return lines.join('\n');
  }

  function guideSection() {
    const G = T.guide;
    const lines = ['=== THE FIELD GUIDE: EVERY PLACE THE SOURCES SUGGESTED ==='];
    lines.push('Mined from ' + GUIDE.videos.length + ' travel vlogs and ' + GUIDE.blogs.length +
      ' blog articles. Most of these are NOT in the seven-day plan — they are what else is there.');
    GUIDE.groups.forEach(group => {
      const places = GUIDE.places.filter(p => p.group === group);
      if (!places.length) return;
      lines.push('', G.groups[group] + ':');
      places.forEach(p => {
        const marks = [];
        if (p.m > 0) marks.push('in ' + p.m + ' vlog' + (p.m > 1 ? 's' : ''));
        else marks.push('a blog pick');
        if (p.act) marks.push('IN THE PLAN, day ' + Number(p.act.slice(1, p.act.indexOf('b'))));
        lines.push('  ' + p.name + ' [' + marks.join(', ') + '] — ' + (G.notes[p.id] || ''));
      });
    });

    lines.push('', '=== THE FIELD GUIDE: EVERY TIP ===');
    GUIDE.cats.forEach(cat => {
      const tips = GUIDE.tips.filter(t => t.cat === cat);
      if (!tips.length) return;
      lines.push('', G.cats[cat] + ':');
      tips.forEach(t => lines.push('  - ' + (G.tips[t.id] || '')));
    });

    lines.push('', '=== THE SOURCES ===');
    lines.push('Vlogs: ' + GUIDE.videos.map(v => v.title).join(' | '));
    lines.push('Articles: ' + GUIDE.blogs.map(b => b.name).join(' | '));
    return lines.join('\n');
  }

  function brief() {
    const trip = window.TripPlan.snapshot();
    const s = T.static;
    const head = [
      '=== THE TRIP ===',
      s.h1 + '. ' + s.navDates + ' — ' + trip.days.length + ' days, two travellers, home in Wigston (Leicester, England).',
      s.heroText,
      'Home base: Leicester · Wigston — ' + s.homeNote + '. ' + s.flightLabel + ' out, ' + s.trainLabel + ' between the bases.',
      s.bcnKicker + ' ' + s.city1 + ' — ' + s.bcnNote + '. ' + s.vlcKicker + ' ' + s.city2 + ' — ' + s.vlcNote + '.',
      s.tagSea + '.',
      'Izem Çelik — ' + s.izemDesc,
      'Ahmet Çelik — ' + s.ahmetDesc,
      'What the vlogs taught us: ' + s.vlogsText,
      'Every price in the plan below is per person in euros.',
      '',
      '=== BOOK BEFORE YOU FLY ===',
      ...trip.bookings.map(b => '  - ' + b.text)
    ].join('\n');

    return [head, planSection(trip), staysSection(), GUIDE ? guideSection() : ''].join('\n\n');
  }

  // What moves while the page is open — deliberately after the server's cache
  // breakpoint, so ticking something off doesn't re-bill the whole briefing.
  function live() {
    const trip = window.TripPlan.snapshot();
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const away = Math.round((FIRST_DAY - today) / DAY_MS);
    const lines = ['=== RIGHT NOW ==='];

    lines.push('Today is ' + now.toLocaleDateString(locale(), {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }) + '. ' + (away > 0 ? 'The flight is in ' + away + ' day' + (away === 1 ? '' : 's') + '.'
      : away === 0 ? 'The flight is today.'
      : away > -trip.days.length ? 'They are on day ' + (1 - away) + ' of the trip.'
      : 'The trip is over.'));

    lines.push(window.I18N.lang === 'tr'
      ? 'The reader has the site in Turkish. Answer in Turkish.'
      : 'The reader has the site in English. Answer in English.');
    lines.push(trip.currency === 'GBP'
      ? 'Prices are showing in pounds on screen, converted at about £0.87 to the euro. Quote both if the number matters.'
      : 'Prices are showing in euros on screen.');

    const acts = trip.days.flatMap(d => d.acts);
    const ticked = acts.filter(a => a.done);
    lines.push('', 'Ticked off so far: ' + ticked.length + ' of ' + acts.length + ' moments' +
      (ticked.length ? ' — ' + ticked.map(a => a.title).join(', ') : '') + '.');
    const bookedOff = trip.bookings.filter(b => b.done);
    if (bookedOff.length) lines.push('Struck off the booking list: ' + bookedOff.map(b => b.text).join(' / ') + '.');

    lines.push(trip.docs.length
      ? 'In the travel wallet: ' + trip.docs.map(d => d.name + (d.pinned ? ' (pinned to ' + d.pinned + ')' : ' (general)')).join(', ') + '.'
      : 'The travel wallet is empty — no boarding passes or booking PDFs uploaded yet.');

    return lines.join('\n');
  }

  // ——————————————————————————————————————————— rendering an answer —
  // The model is asked for plain prose with "- " bullets, and everything it
  // sends is built as text nodes — never markup — so a stray tag in an answer
  // is just characters. Place names get the same Google Maps links the rest
  // of the site gives them.
  const placeAnchor = p => el('a', {
    text: p.text, href: p.href, target: '_blank', rel: 'noopener',
    title: tpl(T.ui.openMap, { title: p.text })
  });
  const withPlaces = seg => window.PlaceLinks.split(seg)
    .map(part => (typeof part === 'string' ? part : placeAnchor(part)));

  function inline(text) {
    const out = [];
    let last = 0;
    for (const m of text.matchAll(/\*\*([^*\n]+)\*\*/g)) {
      if (m.index > last) out.push(...withPlaces(text.slice(last, m.index)));
      out.push(el('strong', {}, withPlaces(m[1])));
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(...withPlaces(text.slice(last)));
    return out;
  }

  const BULLET = /^\s*(?:[-*•]|\d+[.)])\s+/;

  function answerNodes(text) {
    const blocks = [];
    let para = [];
    let list = null;
    const flush = () => {
      if (para.length) blocks.push(el('p', {}, inline(para.join(' '))));
      para = [];
      list = null;
    };
    // Headings are asked against, but strip the hashes rather than print them
    // if one slips through.
    for (const raw of text.split('\n')) {
      const line = raw.replace(/^\s*#{1,6}\s*/, '').trimEnd();
      if (!line.trim()) { flush(); continue; }
      if (BULLET.test(line)) {
        if (para.length) { const held = para; para = []; blocks.push(el('p', {}, inline(held.join(' ')))); }
        if (!list) { list = el('ul', {}); blocks.push(list); }
        list.append(el('li', {}, inline(line.replace(BULLET, ''))));
        continue;
      }
      list = null;
      para.push(line.trim());
    }
    if (para.length) blocks.push(el('p', {}, inline(para.join(' '))));
    return blocks;
  }

  // ——————————————————————————————————————————————————— the panel —

  const state = {
    open: false,
    locked: window.TripPlan.locked(),
    busy: false,
    error: null,
    turns: [] // { role: 'user' | 'assistant', content }
  };
  let controller = null;
  let logEl = null;
  let inputEl = null;

  const launcher = el('button', {
    type: 'button', class: 'c-launch', 'aria-expanded': 'false',
    onclick: () => (state.open ? close() : open())
  },
    el('span', { 'aria-hidden': 'true', class: 'c-launch-dot' }),
    el('span', { text: C.launch })
  );

  const panel = el('div', {
    class: 'c-panel', role: 'dialog', 'aria-label': C.title, hidden: true
  });

  function bubble(turn) {
    const mine = turn.role === 'user';
    return el('div', { class: 'c-msg ' + (mine ? 'c-mine' : 'c-theirs') },
      el('div', { class: 'c-who', text: mine ? C.you : C.assistant }),
      el('div', { class: 'c-body' }, mine ? el('p', {}, turn.content) : answerNodes(turn.content))
    );
  }

  function renderLog() {
    const kids = [];
    if (!state.turns.length) {
      kids.push(el('div', { class: 'c-intro' },
        el('p', { text: C.intro }),
        el('div', { class: 'c-seeds' }, C.seeds.map(q => el('button', {
          type: 'button', class: 'c-seed', text: q, onclick: () => ask(q)
        })))
      ));
    }
    state.turns.forEach(turn => kids.push(bubble(turn)));
    if (state.busy && state.turns.length) {
      kids.push(el('div', { class: 'c-msg c-theirs' },
        el('div', { class: 'c-who', text: C.assistant }),
        el('div', { class: 'c-body' }, el('p', { class: 'c-wait', text: C.thinking }))
      ));
    }
    if (state.error) kids.push(el('p', { class: 'c-error', role: 'status', text: state.error }));
    logEl.replaceChildren(...kids);
  }

  // Follow the answer down, unless the reader has scrolled up to re-read.
  function scrollDown(force) {
    if (!logEl) return;
    const near = logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 90;
    if (force || near) logEl.scrollTop = logEl.scrollHeight;
  }

  function renderBody() {
    if (state.locked) {
      panel.querySelector('.c-shell').replaceChildren(
        el('p', { class: 'c-locked', text: C.locked })
      );
      // The log and the composer just left the document; unlocking has to
      // build them again rather than write into the detached ones.
      logEl = null;
      inputEl = null;
      return;
    }
    if (!logEl) buildShell();
    renderLog();
    const send = panel.querySelector('.c-send');
    if (send) {
      send.textContent = state.busy ? C.stop : C.send;
      send.className = 'c-send btn ' + (state.busy ? 'btn-secondary' : 'btn-primary');
    }
    const clear = panel.querySelector('.c-clear');
    if (clear) clear.hidden = !state.turns.length || state.busy;
  }

  function buildShell() {
    logEl = el('div', { class: 'c-log', role: 'log', 'aria-live': 'polite' });
    inputEl = el('textarea', {
      class: 'c-input', rows: '1', placeholder: C.placeholder, 'aria-label': C.placeholder,
      maxlength: String(MAX_QUESTION),
      oninput: e => {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(120, e.target.scrollHeight) + 'px';
      },
      onkeydown: e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
      }
    });
    panel.querySelector('.c-shell').replaceChildren(
      logEl,
      el('div', { class: 'c-foot' },
        el('div', { class: 'c-compose' },
          inputEl,
          el('button', { type: 'button', class: 'c-send btn btn-primary', 'aria-label': C.sendLabel, text: C.send, onclick: submit })
        ),
        el('p', { class: 'c-note', text: C.note })
      )
    );
  }

  function open() {
    state.open = true;
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('c-launch-on');
    renderBody();
    if (inputEl && !state.locked) inputEl.focus();
    scrollDown(true);
  }

  function close() {
    state.open = false;
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.remove('c-launch-on');
    launcher.focus();
  }

  function submit() {
    if (state.busy) { if (controller) controller.abort(); return; }
    const question = inputEl.value.trim();
    if (!question) return;
    inputEl.value = '';
    inputEl.style.height = 'auto';
    ask(question);
  }

  function startOver() {
    if (controller) controller.abort();
    state.turns = [];
    state.error = null;
    renderBody();
  }

  // ——————————————————————————————————————————————— asking —————
  // One request per question, carrying the conversation so far. The answer
  // arrives as server-sent events; a buffered response parses identically,
  // so a proxy that refuses to stream only costs the typewriter effect.
  async function ask(question) {
    if (state.busy || state.locked) return;
    state.turns.push({ role: 'user', content: question });
    // Long conversations lose their oldest turns — but a history that starts
    // on an answer is not a conversation, so drop back to the question.
    state.turns = state.turns.slice(-MAX_TURNS);
    while (state.turns.length > 1 && state.turns[0].role !== 'user') state.turns.shift();
    state.busy = true;
    state.error = null;
    renderBody();
    scrollDown(true);

    controller = new AbortController();
    let answer = '';
    let bodyEl = null;

    const draw = () => {
      if (!bodyEl) {
        // The first words replace the "reading the plan…" placeholder.
        const waiting = logEl.querySelector('.c-wait');
        if (waiting) waiting.closest('.c-msg').remove();
        const msg = bubble({ role: 'assistant', content: '' });
        bodyEl = msg.querySelector('.c-body');
        logEl.append(msg);
      }
      bodyEl.replaceChildren(...answerNodes(answer));
      scrollDown(false);
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: brief(), live: live(), messages: state.turns }),
        signal: controller.signal
      });

      if (!res.ok || !res.body) {
        let payload = {};
        try { payload = await res.json(); } catch (e) { /* not JSON — an error page */ }
        if (res.status === 401) state.locked = true;
        throw new Error(payload.error ? window.I18N.server(payload.error) : T.ui.requestFailed);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let failure = null;
      let truncated = false;

      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let cut;
        // Frames are "event: x\ndata: {…}" separated by a blank line.
        while ((cut = buffer.indexOf('\n\n')) >= 0) {
          const frame = buffer.slice(0, cut);
          buffer = buffer.slice(cut + 2);
          const name = (frame.match(/^event: (.*)$/m) || [])[1];
          const raw = (frame.match(/^data: (.*)$/m) || [])[1];
          if (!name || !raw) continue;
          let data = {};
          try { data = JSON.parse(raw); } catch (e) { continue; }
          if (name === 'delta') { answer += data.text; draw(); }
          else if (name === 'error') failure = window.I18N.server(data.error);
          else if (name === 'done') truncated = !!data.truncated;
        }
      }

      if (failure) throw new Error(failure);
      if (truncated) answer += '\n\n' + C.truncated;
      if (!answer.trim()) throw new Error(C.empty);
      state.turns.push({ role: 'assistant', content: answer });
    } catch (error) {
      // An abort is the reader pressing Stop, and not worth an apology.
      if (error.name !== 'AbortError') state.error = error.message;
      // Half an answer is still an answer: keep what arrived, and keep the
      // question either way so a retry reads as a follow-up.
      if (answer.trim()) state.turns.push({ role: 'assistant', content: answer });
    } finally {
      controller = null;
      state.busy = false;
      renderBody();
      scrollDown(true);
    }
  }

  // ——————————————————————————————————————————————————— wiring —————

  panel.append(
    el('div', { class: 'c-head' },
      el('span', { class: 'c-title', text: C.title }),
      el('button', { type: 'button', class: 'c-clear btn btn-ghost', text: C.clear, hidden: true, onclick: startOver }),
      el('button', { type: 'button', class: 'btn btn-ghost btn-icon', 'aria-label': C.close, text: '×', onclick: close })
    ),
    el('div', { class: 'c-shell' })
  );

  document.addEventListener('celik:lock', e => {
    state.locked = e.detail.locked;
    if (state.locked && controller) controller.abort();
    if (state.open) renderBody();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && state.open) close();
  });

  document.body.append(launcher, panel);
})();
