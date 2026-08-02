/* España · the Çelik plan: the field guide page.
   Renders every place and every tip mined from the vlogs and blogs
   (skeleton in guide-data.js, words in i18n.js under guide.*). */
(() => {
  'use strict';

  const T = window.I18N.t;
  const G = T.guide;
  const tpl = window.I18N.fmt;
  const DATA = window.GUIDE;
  const $ = id => document.getElementById(id);

  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const k in (attrs || {})) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'style') n.style.cssText = v;
      else if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) n.append(c); });
    return n;
  }

  const mapsUrl = window.PlaceLinks.url;
  const dayOf = act => Number(act.slice(1, act.indexOf('b')));

  // Place references inside notes and tips open Google Maps too (places.js).
  const withPlaces = text => window.PlaceLinks.split(text).map(p => typeof p === 'string' ? p : el('a', {
    text: p.text, href: p.href, target: '_blank', rel: 'noopener',
    title: tpl(G.mapsTitle, { name: p.text }),
    style: 'color:inherit;text-decoration:underline;text-decoration-style:dotted;' +
      'text-decoration-color:var(--color-accent-2-600);text-underline-offset:3px'
  }));

  const chip = (text, opts) => el(opts && opts.href ? 'a' : 'span', {
    class: 'g-chip', text,
    href: opts && opts.href, target: opts && opts.href ? '_blank' : null,
    rel: opts && opts.href ? 'noopener' : null,
    style: 'background:' + ((opts && opts.bg) || 'var(--color-neutral-200)') +
      ';color:' + ((opts && opts.fg) || 'var(--color-neutral-800)')
  });

  const blogChips = idxs => (idxs || []).map(i => chip(DATA.blogs[i].name, {
    href: DATA.blogs[i].url, bg: 'var(--color-accent-2-100)', fg: 'var(--color-accent-2-900)'
  }));

  function placeRow(p) {
    const badges = [];
    if (p.m > 0) {
      const label = p.m === 1 ? G.vlogChipOne : tpl(G.vlogChipMany, { n: p.m });
      badges.push(chip(p.yt ? label + ' ▶' : label, {
        href: p.yt, bg: 'var(--color-accent-100)', fg: 'var(--color-accent-900)'
      }));
    }
    if (p.act) badges.push(chip(tpl(G.planChip, { day: tpl(T.ui.dayN, { n: dayOf(p.act) }) }), {
      bg: 'var(--color-accent)', fg: '#fff'
    }));
    return el('div', { class: 'g-place' },
      el('div', { style: 'display:flex;gap:8px;align-items:baseline;flex-wrap:wrap' },
        el('a', {
          text: p.name, href: mapsUrl(p.q), target: '_blank', rel: 'noopener',
          title: tpl(G.mapsTitle, { name: p.name }),
          style: 'font-family:var(--font-heading);font-size:17.5px;text-decoration:none;color:var(--color-text)'
        }),
        badges
      ),
      el('p', {
        style: 'margin:4px 0 0;font-size:13.5px;line-height:1.55;color:var(--color-neutral-800);text-wrap:pretty'
      }, withPlaces(G.notes[p.id] || '')),
      (p.blogs && p.blogs.length) ? el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-top:7px' }, blogChips(p.blogs)) : null
    );
  }

  function renderPlaces() {
    const wrap = $('placeGroups');
    for (const g of DATA.groups) {
      const items = DATA.places.filter(p => p.group === g);
      if (!items.length) continue;
      wrap.append(el('div', { class: 'card' },
        el('div', { style: 'display:flex;gap:10px;align-items:baseline;flex-wrap:wrap' },
          el('h3', { text: G.groups[g], style: 'font-family:var(--font-heading);font-weight:400;font-size:24px;margin:0' }),
          el('span', { text: tpl(G.groupCount, { n: items.length }), style: 'font-size:12.5px;color:var(--color-neutral-600)' })
        ),
        el('div', { class: 'g-cols', style: 'margin-top:8px' },
          el('div', {}, items.filter((p, i) => i % 2 === 0).map(placeRow)),
          el('div', {}, items.filter((p, i) => i % 2 === 1).map(placeRow))
        )
      ));
    }
  }

  function tipRow(t) {
    const srcChips = t.src.map(s => s === 'v'
      ? chip(G.fromVlogs, { bg: 'var(--color-accent-100)', fg: 'var(--color-accent-900)' })
      : blogChips([s])[0]);
    return el('div', { class: 'g-tip' },
      el('span', {}, withPlaces(G.tips[t.id] || '')),
      el('span', { style: 'display:inline-flex;gap:6px;flex-wrap:wrap;margin-left:8px;vertical-align:1px' }, srcChips)
    );
  }

  function renderTips() {
    const wrap = $('tipGroups');
    for (const cat of DATA.cats) {
      const items = DATA.tips.filter(t => t.cat === cat);
      if (!items.length) continue;
      wrap.append(el('div', { class: 'card' },
        el('div', { style: 'display:flex;gap:10px;align-items:baseline;flex-wrap:wrap' },
          el('h3', { text: G.cats[cat], style: 'font-family:var(--font-heading);font-weight:400;font-size:24px;margin:0' }),
          el('span', { text: tpl(G.groupCount, { n: items.length }), style: 'font-size:12.5px;color:var(--color-neutral-600)' })
        ),
        el('div', { style: 'margin-top:8px' }, items.map(tipRow))
      ));
    }
  }

  function renderSources() {
    const wrap = $('sourceLists');
    const list = (title, rows) => el('div', {},
      el('h3', { text: title, style: 'font-family:var(--font-heading);font-weight:400;font-size:22px;margin:0 0 8px' }),
      el('div', {}, rows.map(r => el('div', { style: 'padding:6px 0;border-top:1px solid var(--color-neutral-300);font-size:13px;line-height:1.5' },
        el('a', { text: r.text, href: r.href, target: '_blank', rel: 'noopener' })
      )))
    );
    wrap.append(
      list(tpl(G.sourcesVideos, { n: DATA.videos.length }),
        DATA.videos.map(v => ({ text: v.title, href: 'https://youtube.com/watch?v=' + v.id }))),
      list(tpl(G.sourcesBlogs, { n: DATA.blogs.length }),
        DATA.blogs.map(b => ({ text: b.name, href: b.url })))
    );
  }

  function applyStatic() {
    document.title = G.htmlTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', G.metaDesc);
    $('brand').textContent = T.static.brand;
    $('backLink').textContent = G.backToPlan;
    $('kicker').textContent = G.kicker;
    $('pageTitle').textContent = G.title;
    $('pageIntro').textContent = tpl(G.intro, {
      places: DATA.places.length, tips: DATA.tips.length,
      vlogs: DATA.videos.length, blogs: DATA.blogs.length
    });
    $('placesTitle').textContent = G.placesTitle;
    $('placesIntro').textContent = tpl(G.placesIntro, { n: DATA.places.length });
    $('tipsTitle').textContent = G.tipsTitle;
    $('tipsIntro').textContent = tpl(G.tipsIntro, { n: DATA.tips.length });
    $('sourcesTitle').textContent = G.sourcesTitle;
    $('sourcesIntro').textContent = G.sourcesIntro;
    $('langGroup').setAttribute('aria-label', T.static.langIn);
  }

  document.querySelectorAll('[data-lang]').forEach(btn => {
    const on = btn.dataset.lang === window.I18N.lang;
    btn.setAttribute('aria-pressed', String(on));
    btn.className = 'btn ' + (on ? 'btn-primary' : 'btn-secondary');
    btn.addEventListener('click', () => window.I18N.set(btn.dataset.lang));
  });

  applyStatic();
  renderPlaces();
  renderTips();
  renderSources();
})();
