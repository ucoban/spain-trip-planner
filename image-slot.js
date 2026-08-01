/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Static-site adaptation of the design tool's image-slot component: the
 * original persists drops to a .image-slots.state.json sidecar through the
 * host bridge, which doesn't exist on a static host, so this one keeps the
 * dropped image in localStorage instead. Same look and interaction: dashed
 * ring, drop or click to browse, canvas downscale to WebP, hover controls.
 *
 * Attributes:
 *   id           Persistence key — required for the drop to survive reload.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   fit          'cover' | 'contain'                      (default 'cover')
 *   placeholder  Empty-state caption.                     (default 'Drop an image')
 *
 * Sizing: fills its container (width/height 100%); set width/height inline
 * for a fixed-size slot.
 */
(() => {
  const KEY = 'celik-spain-images';
  const MAX_DIM = 1200;
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // Localized through window.I18N when the page provides it (i18n.js loads
  // first on this site); the literals keep the component usable on its own.
  const S = () => (window.I18N && window.I18N.t && window.I18N.t.slot) || {
    browseHtml: 'or <u>browse files</u>',
    replace: 'Replace',
    remove: 'Remove',
    badType: 'Drop a PNG, JPEG, WebP, or AVIF image.',
    readFail: 'Could not read that image.',
    storageFull: 'Storage is full — remove a wallet document to make room for the photo.',
    dropImage: 'Drop an image'
  };

  let slots = {};
  try { slots = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { slots = {}; }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(slots)); return true; }
    catch (e) { alert(S().storageFull); return false; }
  }

  // Encode through a canvas so storage carries resized bytes, not the raw
  // upload: longest side capped at 2× the slot's rendered width (retina)
  // and at MAX_DIM. WebP keeps alpha and stays small for photos.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      if (bitmap.close) bitmap.close();
    }
  }

  const stylesheet =
    ':host{display:block;position:relative;font:13px/1.3 system-ui,-apple-system,sans-serif;' +
    '  width:100%;height:100%;aspect-ratio:3/2}' +
    '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
    '.frame img{width:100%;height:100%;-webkit-user-drag:none;user-select:none}' +
    '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' +
    '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' +
    '  cursor:pointer;user-select:none}' +
    '.empty svg{opacity:.45}' +
    '.empty .cap,.empty .sub{opacity:.75}' +
    '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' +
    '.empty .sub{font-size:11px}' +
    '.empty .sub u{text-underline-offset:2px}' +
    '.empty:hover .sub{opacity:1}' +
    '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' +
    '  opacity:.35;transition:border-color .12s,opacity .12s}' +
    ':host([data-over]) .frame{outline:2px solid var(--color-accent,#c67139);outline-offset:-2px;' +
    '  background:color-mix(in srgb,var(--color-accent,#c67139) 10%,transparent)}' +
    ':host([data-over]) .ring{border-color:var(--color-accent,#c67139);opacity:1}' +
    ':host([data-filled]) .ring{display:none}' +
    '.ctl{position:absolute;top:8px;right:8px;display:flex;gap:6px;opacity:0;' +
    '  pointer-events:none;transition:opacity .12s;z-index:2;white-space:nowrap}' +
    // An empty slot has nothing to replace or remove — drop the controls
    // out of the tab order and the a11y tree entirely, not just out of sight.
    ':host(:not([data-filled])) .ctl{display:none}' +
    ':host([data-filled]:hover) .ctl,:host([data-filled]:focus-within) .ctl{opacity:1;pointer-events:auto}' +
    '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' +
    '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' +
    '  backdrop-filter:blur(6px)}' +
    '.ctl button:hover{background:rgba(0,0,0,.8)}' +
    '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' +
    '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
    '@media (prefers-reduced-motion:reduce){.ring,.ctl{transition:none}}';

  const icon =
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' +
    '<path d="m21 15-5-5L5 21"/></svg>';

  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ['shape', 'radius', 'fit', 'placeholder']; }

    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' + stylesheet + '</style>' +
        '<div class="frame">' +
        '  <img alt="" draggable="false" style="display:none">' +
        '  <div class="empty">' + icon +
        '    <div class="cap"></div>' +
        '    <div class="sub">' + S().browseHtml + '</div></div>' +
        '  <div class="ring"></div>' +
        '</div>' +
        '<div class="ctl"><button type="button" data-act="replace">' + S().replace + '</button>' +
        '  <button type="button" data-act="remove">' + S().remove + '</button></div>' +
        '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._img = root.querySelector('img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._input = root.querySelector('input');
      this._err = null;
      this._depth = 0;
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', (e) => {
        const act = e.target && e.target.dataset && e.target.dataset.act;
        if (act === 'replace') this._input.click();
        if (act === 'remove') { delete slots[this.id]; persist(); this._render(); }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
    }

    connectedCallback() {
      if (!this.id) console.warn('<image-slot> without an id will not persist its dropped image.');
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      this._render();
    }

    disconnectedCallback() {
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
    }

    attributeChangedCallback() { if (this.shadowRoot) this._render(); }

    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) { this._depth = 0; this.removeAttribute('data-over'); }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }

    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError(S().badType);
        return;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        slots[this.id || ''] = url;
        if (persist()) this._render();
        else delete slots[this.id || ''];
      } catch (err) {
        this._setError(S().readFail);
        console.warn('<image-slot> ingest failed:', err);
      }
    }

    _setError(msg) {
      if (this._err) { this._err.remove(); this._err = null; }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err'; d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => { if (this._err === d) { d.remove(); this._err = null; } }, 3000);
    }

    _render() {
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      const radius = shape === 'circle' ? '50%'
        : shape === 'pill' ? '999px'
        : shape === 'rect' ? '0'
        : (parseFloat(this.getAttribute('radius')) || 12) + 'px';
      this._frame.style.borderRadius = radius;
      this.shadowRoot.querySelector('.ring').style.borderRadius = radius;
      this._cap.textContent = this.getAttribute('placeholder') || S().dropImage;
      const url = slots[this.id || ''];
      if (url) {
        this._img.src = url;
        this._img.style.display = 'block';
        this._img.style.objectFit = (this.getAttribute('fit') || 'cover').toLowerCase();
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
      } else {
        this._img.removeAttribute('src');
        this._img.style.display = 'none';
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }

  customElements.define('image-slot', ImageSlot);
})();
