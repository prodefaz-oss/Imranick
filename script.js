/* =========================================================
   IMRANICK — v2 interactions
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     CONTACT — fill these in so the forms actually reach you.
     email:    'you@example.com'  → forms open the visitor's email app
     whatsapp: '8801XXXXXXXXX'    → booking form opens WhatsApp (country code, no + or spaces)
     If both are set, WhatsApp is used for bookings and email for quick messages.
     --------------------------------------------------------- */
  const CONTACT = {
    email: '',
    whatsapp: ''
  };

  /* ---------- utils ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = () => innerWidth <= 760;
  const pad = n => String(n).padStart(2, '0');
  const tc = (frames, fps = 25) => {
    frames = Math.max(0, Math.floor(frames));
    const f = frames % fps, s = Math.floor(frames / fps) % 60, m = Math.floor(frames / (fps * 60)) % 60, h = Math.floor(frames / (fps * 3600));
    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  };
  const money = n => '$' + Math.round(n).toLocaleString('en-US');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, moved: false };
  const tickers = [];
  let lenis = null;

  function tween(el, to, { dur = 800, fmt = n => Math.round(n).toLocaleString('en-US') } = {}) {
    const from = parseFloat(el.dataset.v ?? el.textContent.replace(/[^0-9.]/g, '')) || 0;
    el.dataset.v = to;
    cancelAnimationFrame(el._raf);
    if (reduced) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(from + (to - from) * e);
      if (k < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  /* ---------- placeholder art (used until real covers are added) ---------- */
  const O = '#FF5500', O2 = '#FF7733';
  function art(motif) {
    const bg = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#18181e"/><stop offset=".6" stop-color="#0b0b0e"/><stop offset="1" stop-color="#2a1206"/></linearGradient><radialGradient id="r" cx=".62" cy=".45" r=".55"><stop offset="0" stop-color="${O}" stop-opacity=".34"/><stop offset="1" stop-color="${O}" stop-opacity="0"/></radialGradient><pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern><linearGradient id="o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${O2}"/><stop offset="1" stop-color="#c94300"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a46"/><stop offset="1" stop-color="#17171d"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><rect width="1200" height="900" fill="url(#p)"/><rect width="1200" height="900" fill="url(#r)"/>`;
    let m = '';
    switch (motif) {
      case 'orbit':
        m = `<g transform="translate(600 450)" fill="none"><circle r="260" stroke="${O}" stroke-width="3" stroke-dasharray="12 10" opacity=".6"/><circle r="185" stroke="#fff" stroke-opacity=".22" stroke-width="2"/><circle r="110" fill="${O}" fill-opacity=".15" stroke="${O}" stroke-width="3"/><ellipse rx="310" ry="96" stroke="${O}" stroke-opacity=".55" stroke-width="2.5" transform="rotate(-24)"/><ellipse rx="310" ry="96" stroke="#fff" stroke-opacity=".28" stroke-width="2" transform="rotate(32)"/><circle r="24" fill="${O}" stroke="none"/><circle cx="-196" cy="-84" r="11" fill="#fff" stroke="none"/><circle cx="214" cy="92" r="11" fill="${O}" stroke="none"/><circle cx="92" cy="-206" r="8" fill="${O2}" stroke="none"/></g>`;
        break;
      case 'type3d': {
        let layers = '';
        for (let i = 9; i >= 1; i--) layers += `<text x="${600 + i * 5}" y="${600 + i * 5}" fill="${i > 5 ? '#6b2400' : O}" opacity="${0.5 + (9 - i) * 0.06}">Aa</text>`;
        m = `<g font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="430" text-anchor="middle" letter-spacing="-20">${layers}<text x="600" y="600" fill="#fff">Aa</text></g><rect x="330" y="680" width="540" height="14" rx="7" fill="#fff" fill-opacity=".12"/><rect x="330" y="680" width="300" height="14" rx="7" fill="${O}"/>`;
        break;
      }
      case 'print':
        m = `<g transform="translate(600 450)"><rect x="-190" y="-250" width="300" height="430" rx="10" fill="#1b1b22" stroke="#fff" stroke-opacity=".18" transform="rotate(-12)"/><rect x="-110" y="-240" width="300" height="430" rx="10" fill="url(#o)" transform="rotate(7)"/><g transform="rotate(-2)"><rect x="-150" y="-220" width="300" height="430" rx="10" fill="#f1f0ec"/><circle cx="-80" cy="-140" r="34" fill="${O}"/><rect x="-115" y="-60" width="230" height="22" rx="4" fill="#0b0b0e"/><rect x="-115" y="-26" width="160" height="22" rx="4" fill="#0b0b0e"/><rect x="-115" y="20" width="230" height="8" rx="4" fill="#9ca3af"/><rect x="-115" y="40" width="200" height="8" rx="4" fill="#9ca3af"/><rect x="-115" y="60" width="215" height="8" rx="4" fill="#9ca3af"/><rect x="-115" y="150" width="90" height="26" rx="13" fill="${O}"/></g></g>`;
        break;
      case 'play':
        m = `<g transform="translate(600 400)"><circle r="190" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/><circle r="240" fill="none" stroke="${O}" stroke-opacity=".4" stroke-width="2" stroke-dasharray="14 10"/><circle r="130" fill="${O}" fill-opacity=".16" stroke="${O}" stroke-width="3"/><path d="M-38-62 70 0-38 62Z" fill="${O}"/></g><g transform="translate(250 730)"><rect width="700" height="12" rx="6" fill="#fff" fill-opacity=".1"/><rect width="430" height="12" rx="6" fill="${O}"/><circle cx="430" cy="6" r="14" fill="#fff"/></g>`;
        break;
      case 'filmstrip': {
        let holes = '', frames = '';
        for (let i = 0; i < 20; i++) holes += `<rect x="${-700 + i * 72}" y="-122" width="30" height="20" rx="4" fill="#0b0b0e"/><rect x="${-700 + i * 72}" y="102" width="30" height="20" rx="4" fill="#0b0b0e"/>`;
        for (let i = 0; i < 6; i++) frames += `<rect x="${-680 + i * 236}" y="-88" width="216" height="176" rx="8" fill="${i === 3 ? 'url(#o)' : 'url(#d)'}"/>`;
        m = `<g transform="translate(600 450) rotate(-9)"><rect x="-760" y="-140" width="1520" height="280" fill="#d8d6d0"/>${holes}${frames}<path d="M44-28 92 0 44 28Z" fill="#fff"/></g>`;
        break;
      }
      case 'phones': {
        const phone = (x, y, s, hot) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-105" y="-186" width="210" height="372" rx="30" fill="${hot ? 'url(#o)' : 'url(#d)'}" stroke="#fff" stroke-opacity=".2" stroke-width="3"/><rect x="-70" y="90" width="140" height="26" rx="8" fill="${hot ? '#0b0b0e' : O}"/><rect x="-50" y="124" width="100" height="10" rx="5" fill="#fff" fill-opacity=".5"/>${hot ? '<path d="M-22-40 34 0-22 40Z" fill="#fff"/>' : ''}</g>`;
        m = phone(395, 470, .86, false) + phone(805, 470, .86, false) + phone(600, 440, 1.05, true);
        break;
      }
    }
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">${bg}${m}</svg>`);
  }

  /* ---------- grain ---------- */
  function grain() {
    const c = document.createElement('canvas'); c.width = c.height = 160;
    const x = c.getContext('2d'), d = x.createImageData(160, 160);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    x.putImageData(d, 0, 0);
    $('.grain').style.backgroundImage = `url(${c.toDataURL()})`;
  }

  /* ---------- smooth scroll + anchors ---------- */
  function initLenis() {
    if (lenis || !window.Lenis || reduced) return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    if (document.body.classList.contains('is-loading') || document.body.classList.contains('menu-open') || $('.modal.open')) lenis.stop();
  }
  function initScroll() {
    initLenis();
    window.__lenisReady = initLenis; // Lenis loads async from the CDN; the site works without it
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      const target = id === '#top' || id === '#' ? 0 : $(id);
      if (target == null) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      else if (target === 0) scrollTo({ top: 0, behavior: 'smooth' });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- preloader ---------- */
  function preloader() {
    return new Promise(resolve => {
      const pre = $('#preloader'), wipe = $('.pre-wipe');
      let seen = false;
      try { seen = sessionStorage.getItem('imk-seen') === '1'; sessionStorage.setItem('imk-seen', '1'); } catch (e) { /* storage blocked */ }
      if (reduced) { pre.classList.add('skip'); document.body.classList.remove('is-loading'); resolve(); return; }
      const dur = seen ? 650 : 1700;
      const count = $('#preCount'), bar = $('#preBar'), tcEl = $('#preTc');
      requestAnimationFrame(() => requestAnimationFrame(() => pre.classList.add('start')));
      const t0 = performance.now();
      const fontsReady = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1200))]);
      const step = now => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        count.textContent = String(Math.round(e * 100)).padStart(3, '0');
        bar.style.width = e * 100 + '%';
        tcEl.textContent = tc(e * 100);
        if (k < 1) requestAnimationFrame(step);
        else fontsReady.then(() => {
          wipe.classList.add('go');
          setTimeout(() => { pre.classList.add('done'); }, 420);
          setTimeout(() => { document.body.classList.remove('is-loading'); resolve(); }, 650);
          setTimeout(() => { pre.remove(); wipe.remove(); }, 1800);
        });
      };
      requestAnimationFrame(step);
    });
  }

  function intro() {
    const title = $('.hero-title');
    $$('.hero-title .line-in').forEach((l, i) => l.style.setProperty('--d', (0.08 + i * 0.09) + 's'));
    $$('[data-intro]').forEach((el, i) => el.style.setProperty('--d', (0.35 + i * 0.08) + 's'));
    title.classList.add('in');
    document.body.classList.add('intro-done');
    setTimeout(() => $$('.hero [data-count]').forEach(countUp), 700);
    lenis && lenis.start();
  }

  function countUp(el) {
    const to = +el.dataset.count, start = +(el.dataset.start || 0);
    el.dataset.v = start;
    tween(el, to, { dur: 1800, fmt: n => String(Math.round(n)) });
  }

  /* =========================================================
     CURSOR — crop marks (designer) + timecode (editor)
     ========================================================= */
  function cursor() {
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');
    const root = $('.cursor'), dot = $('#curDot'), frame = $('#curFrame'), sizeEl = $('#curSize');
    const bubble = $('#curBubble'), bubbleText = $('#curBubbleText'), tcEl = $('#curTc');
    let fx = mouse.x, fy = mouse.y, fw = 36, fh = 36, bx = mouse.x, by = mouse.y, bs = 0, bTarget = 1;
    let target = null, mode = 'default', press = 0, pressK = 1, speed = 0, frames = 0, lastMove = 0, px = mouse.x, py = mouse.y, lastSize = '';

    addEventListener('mousemove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.moved = true; lastMove = performance.now();
      root.classList.remove('hidden');
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => root.classList.add('hidden'));
    document.addEventListener('mouseover', e => setTarget(e.target.closest('[data-cursor], a, button, input, textarea, select, summary, .switch')));
    addEventListener('mousedown', e => { press = 1; if (!reduced) cuts(e.clientX, e.clientY); });
    addEventListener('mouseup', () => { press = 0; });

    function setTarget(el) {
      target = null;
      if (!el) { mode = 'default'; }
      else if (el.matches('input, textarea, select')) { mode = 'text'; }
      else if (el.dataset.cursor === 'view') {
        mode = 'bubble';
        bubbleText.textContent = el.dataset.cursorText || 'View';
        bTarget = el.dataset.cursorText === 'Seek' || el.dataset.cursorText === 'Drag' ? 0.72 : 1;
      } else {
        const r = el.getBoundingClientRect();
        if (r.width > 560 || r.height > 220) mode = 'default';
        else { mode = 'snap'; target = el; }
      }
      root.classList.toggle('is-bubble', mode === 'bubble');
      root.classList.toggle('is-text', mode === 'text');
      frame.classList.toggle('snap', mode === 'snap');
    }

    function cuts(x, y) {
      for (let i = 0; i < 8; i++) {
        const c = document.createElement('i');
        c.className = 'cut';
        c.style.setProperty('--x', x - 1 + 'px'); c.style.setProperty('--y', y - 5 + 'px'); c.style.setProperty('--r', i * 45 + 'deg');
        document.body.appendChild(c);
        c.addEventListener('animationend', () => c.remove());
      }
    }

    tickers.push(() => {
      const now = performance.now();
      const d = Math.hypot(mouse.x - px, mouse.y - py);
      px = mouse.x; py = mouse.y;
      speed = lerp(speed, d, 0.2);
      frames += d * 0.4;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;

      let tx, ty, tw, th;
      if (mode === 'snap' && target && target.isConnected) {
        const r = target.getBoundingClientRect();
        tw = r.width + 12; th = r.height + 12;
        tx = r.left + r.width / 2 + (mouse.x - (r.left + r.width / 2)) * 0.06;
        ty = r.top + r.height / 2 + (mouse.y - (r.top + r.height / 2)) * 0.06;
        const label = `${Math.round(r.width)} × ${Math.round(r.height)}`;
        if (label !== lastSize) { sizeEl.textContent = label; lastSize = label; }
      } else {
        const s = 34 + Math.min(speed * 0.9, 30);
        tw = th = s; tx = mouse.x; ty = mouse.y;
      }
      const k = mode === 'snap' ? 0.25 : 0.2;
      fx = lerp(fx, tx, k); fy = lerp(fy, ty, k); fw = lerp(fw, tw, 0.22); fh = lerp(fh, th, 0.22);
      pressK = lerp(pressK, press ? 0.78 : 1, 0.3);
      frame.style.width = fw + 'px'; frame.style.height = fh + 'px';
      frame.style.transform = `translate3d(${fx - fw / 2}px, ${fy - fh / 2}px, 0) scale(${pressK})`;

      bx = lerp(bx, mouse.x, 0.22); by = lerp(by, mouse.y, 0.22);
      bs = lerp(bs, mode === 'bubble' ? bTarget * (press ? 0.88 : 1) : 0, 0.18);
      bubble.style.transform = `translate3d(${bx}px, ${by}px, 0) scale(${bs})`;
      bubbleText.style.transform = `scale(${clamp(bs * 1.2, 0, 1)})`;

      const moving = now - lastMove < 900 && mode === 'default';
      tcEl.classList.toggle('on', moving);
      tcEl.style.transform = `translate3d(${mouse.x + 18}px, ${mouse.y + 18}px, 0)`;
      tcEl.textContent = tc(frames);
    });
  }

  /* ---------- magnetic buttons ---------- */
  function magnetic() {
    if (!fine || reduced) return;
    $$('.magnetic').forEach(el => {
      const strength = el.classList.contains('cta-circle') || el.classList.contains('badge') ? 0.35 : 0.25;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- hero dot field ---------- */
  function heroCanvas() {
    const hero = $('#hero'), c = $('#heroCanvas'), ctx = c.getContext('2d'), orb = $('#heroOrb');
    let w = 0, h = 0, dots = [], visible = true, mx = -999, my = -999, ox = 0, oy = 0;
    const gap = 30, R = 190;
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = gap / 2; y < h; y += gap) for (let x = gap / 2; x < w; x += gap) dots.push(x, y);
      ox = w * 0.6; oy = h * 0.4;
    }
    resize();
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
    tickers.push(t => {
      if (!visible) return;
      const r = hero.getBoundingClientRect();
      let lx, ly;
      if (mouse.moved && fine) { lx = mouse.x - r.left; ly = mouse.y - r.top; }
      else { lx = w * (0.5 + 0.3 * Math.sin(t * 0.0004)); ly = h * (0.45 + 0.22 * Math.sin(t * 0.0007)); }
      mx = mx < -900 ? lx : lerp(mx, lx, 0.12); my = my < -900 ? ly : lerp(my, ly, 0.12);
      ox = lerp(ox, lx, 0.05); oy = lerp(oy, ly, 0.05);
      orb.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      const hot = [];
      const time = reduced ? 0 : t * 0.0012;
      for (let i = 0; i < dots.length; i += 2) {
        const x = dots[i], y = dots[i + 1];
        const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { hot.push(x, y, Math.sqrt(d2), dx, dy); continue; }
        const wv = Math.sin(time + x * 0.008 + y * 0.011);
        const s = 1 + (wv > 0.6 ? (wv - 0.6) * 2 : 0);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      for (let i = 0; i < hot.length; i += 5) {
        const d = hot[i + 2] || 1, f = 1 - d / R, f2 = f * f;
        const x = hot[i] + hot[i + 3] / d * f2 * 16, y = hot[i + 1] + hot[i + 4] / d * f2 * 16;
        ctx.fillStyle = `rgba(255,${Math.round(85 + (1 - f) * 120)},${Math.round((1 - f) * 120)},${0.25 + f * 0.75})`;
        ctx.beginPath(); ctx.arc(x, y, 1 + f2 * 2.6, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  /* ---------- role scramble ---------- */
  function scramble() {
    const el = $('#roleScramble'); if (!el) return;
    const roles = ['Graphic Designer', 'Video Editor', 'Motion Designer', 'Brand Builder', 'Colourist'];
    const chars = '!<>-_/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let i = 0;
    function to(text) {
      const from = el.textContent, len = Math.max(from.length, text.length), q = [];
      for (let n = 0; n < len; n++) { const s = Math.floor(Math.random() * 14), e = s + Math.floor(Math.random() * 14); q.push({ f: from[n] || '', t: text[n] || '', s, e }); }
      let frame = 0;
      const run = () => {
        let out = '', done = 0;
        for (const c of q) {
          if (frame >= c.e) { done++; out += c.t; }
          else if (frame >= c.s) out += `<span style="opacity:.55">${chars[Math.floor(Math.random() * chars.length)]}</span>`;
          else out += c.f;
        }
        el.innerHTML = out;
        if (done < q.length) { frame++; requestAnimationFrame(run); }
      };
      run();
    }
    setInterval(() => { i = (i + 1) % roles.length; reduced ? (el.textContent = roles[i]) : to(roles[i]); }, 2800);
  }

  /* ---------- nav, menu, progress, HUD ---------- */
  function closeMenu() {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    $('#burger').setAttribute('aria-expanded', 'false');
    $('#menu').setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
  }
  function nav() {
    const navEl = $('#nav'), burger = $('#burger'), menu = $('#menu');
    burger.addEventListener('click', () => {
      const open = !document.body.classList.contains('menu-open');
      if (!open) return closeMenu();
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      lenis && lenis.stop();
    });
    const bar = $('#progressBar'), hudTc = $('#hudTc'), hudScene = $('#hudScene');
    let lastY = 0;
    tickers.push((t, y) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? clamp(y / max, 0, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
      hudTc.textContent = tc(p * 150 * 25);
      if (Math.abs(y - lastY) > 4) {
        const down = y > lastY;
        navEl.classList.toggle('hide', down && y > 400 && !document.body.classList.contains('menu-open'));
        lastY = y;
      }
    });
    const links = $$('.nav-links a');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const scene = e.target.dataset.scene;
        if (scene) hudScene.textContent = scene;
        const id = e.target.id === 'timeline' ? 'craft' : e.target.id === 'faq' || e.target.id === 'contact' ? '' : e.target.id;
        links.forEach(l => l.classList.toggle('is-active', l.dataset.nav === id));
      });
    }, { rootMargin: '-48% 0px -48% 0px' });
    $$('[data-scene]').forEach(s => io.observe(s));
  }

  /* ---------- reveals ---------- */
  function reveals() {
    $$('[data-reveal]').forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.hasAttribute('data-reveal'));
      el.style.setProperty('--d', Math.min(sibs.indexOf(el), 6) * 0.08 + 's');
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal], .big-cta').forEach(el => io.observe(el));
    $$('.big-cta .line-in').forEach((l, i) => l.style.setProperty('--d', i * 0.1 + 's'));
    $$('[data-letters]').forEach(el => {
      el.innerHTML = el.textContent.split(' ').map(w => `<span class="wd">${[...w].map(c => `<span class="ch">${esc(c)}</span>`).join('')}</span>`).join(' ');
    });
  }

  /* ---------- marquee ---------- */
  function marquee() {
    const rows = $$('.mq-row').map(row => {
      const track = $('.mq-track', row);
      const w = track.offsetWidth;
      const copies = Math.ceil((innerWidth * 2) / w) + 1;
      for (let i = 0; i < copies; i++) row.appendChild(track.cloneNode(true));
      return { row, track, dir: +row.dataset.mq, x: 0, w };
    });
    let visible = false;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe($('.marquee'));
    let sv = 0;
    addEventListener('resize', () => rows.forEach(r => { r.w = r.track.offsetWidth; }));
    tickers.push((t, y, v) => {
      if (!visible) return;
      sv = lerp(sv, v, 0.1);
      const dirMul = sv < -0.5 ? -1 : 1;
      rows.forEach(r => {
        r.x -= (0.6 + Math.min(Math.abs(sv) * 0.25, 14)) * r.dir * dirMul * (reduced ? 0 : 1);
        if (r.x <= -r.w) r.x += r.w;
        if (r.x > 0) r.x -= r.w;
        r.row.style.transform = `translate3d(${r.x}px,0,0) skewX(${clamp(-sv * 0.25, -8, 8)}deg)`;
      });
    });
  }

  /* ---------- scroll-filled about text ---------- */
  function fillText() {
    const el = $('#fillText'); if (!el) return;
    const hl = /^(IMRANICK\.?|2016,|motion|storytelling\.|directly)$/;
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w${hl.test(w) ? ' hl' : ''}">${esc(w)}</span>`).join(' ');
    const words = $$('.w', el);
    let last = -1;
    tickers.push(() => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const p = clamp((innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.25), 0, 1);
      const n = Math.round(p * words.length);
      if (n === last) return;
      last = n;
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  }

  /* =========================================================
     FOUNDER VOICE NOTE
     ========================================================= */
  function voice() {
    const audio = $('#voiceAudio'), box = $('.voice'), play = $('#voicePlay'), navBtn = $('#navAudio');
    const canvas = $('#voiceCanvas'), ctx = canvas.getContext('2d'), wave = $('#voiceWave');
    const timeEl = $('#voiceTime'), durEl = $('#voiceDur'), speedBtn = $('#voiceSpeed');
    const N = 110;
    let peaks = Array.from({ length: N }, (_, i) => 0.25 + 0.55 * Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.13)) + Math.random() * 0.15);
    let hover = -1, cw = 0, ch = 0;
    const fmt = s => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;

    // real waveform from the mp3 (falls back to the generated one)
    fetch(audio.getAttribute('src')).then(r => r.arrayBuffer()).then(buf => {
      const AC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      return new AC(1, 1, 44100).decodeAudioData(buf);
    }).then(ab => {
      const data = ab.getChannelData(0), block = Math.floor(data.length / N), out = [];
      for (let i = 0; i < N; i++) { let m = 0; for (let j = 0; j < block; j += 16) m = Math.max(m, Math.abs(data[i * block + j])); out.push(m); }
      const max = Math.max(...out) || 1;
      peaks = out.map(v => 0.12 + 0.88 * (v / max));
      draw(performance.now());
    }).catch(() => {});

    function size() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cw = wave.clientWidth; ch = wave.clientHeight;
      canvas.width = cw * dpr; canvas.height = ch * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    }
    function draw(t) {
      if (!cw) return;
      ctx.clearRect(0, 0, cw, ch);
      const prog = audio.duration ? audio.currentTime / audio.duration : 0, step = cw / N, bw = Math.max(2, step * 0.55);
      const playing = !audio.paused;
      for (let i = 0; i < N; i++) {
        const f = i / N;
        let a = peaks[i];
        if (playing && !reduced) { const g = Math.exp(-Math.pow((f - prog) * N / 5, 2)); a *= 1 + g * 0.35 * (0.5 + 0.5 * Math.sin(t * 0.02 + i)); }
        const bh = Math.max(3, a * ch * 0.92);
        ctx.fillStyle = prog > 0 && f <= prog ? O : (hover >= 0 && f <= hover ? 'rgba(255,119,51,0.45)' : 'rgba(255,255,255,0.2)');
        const x = i * step + (step - bw) / 2, y = (ch - bh) / 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, bw / 2); else ctx.rect(x, y, bw, bh);
        ctx.fill();
      }
    }
    size();
    addEventListener('resize', size);

    // transcript → word spans
    const cues = $$('#voiceTranscript [data-start]').map(span => {
      span.innerHTML = span.textContent.split(' ').map(w => `<span class="vw">${esc(w)}</span>`).join(' ');
      return { s: +span.dataset.start, e: +span.dataset.end, words: $$('.vw', span) };
    });
    function syncWords() {
      const t = audio.currentTime;
      cues.forEach(c => {
        const n = c.words.length;
        const k = t >= c.e ? n : t < c.s ? -1 : Math.floor((t - c.s) / (c.e - c.s) * n);
        c.words.forEach((w, i) => { w.classList.toggle('said', i < k || (k === n)); w.classList.toggle('now', i === k && k < n); });
      });
    }

    const toggle = () => {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    };
    play.addEventListener('click', toggle);
    navBtn.addEventListener('click', toggle);
    audio.addEventListener('play', () => { box.classList.add('playing'); navBtn.classList.add('playing'); play.setAttribute('aria-label', 'Pause founder audio'); });
    audio.addEventListener('pause', () => { box.classList.remove('playing'); navBtn.classList.remove('playing'); play.setAttribute('aria-label', 'Play founder audio'); draw(performance.now()); });
    audio.addEventListener('ended', () => { audio.currentTime = 0; syncWords(); draw(0); });
    audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', () => { timeEl.textContent = fmt(audio.currentTime); });
    tickers.push(t => { if (!audio.paused) { draw(t); syncWords(); } });

    wave.addEventListener('mousemove', e => { const r = wave.getBoundingClientRect(); hover = (e.clientX - r.left) / r.width; if (audio.paused) draw(0); });
    wave.addEventListener('mouseleave', () => { hover = -1; if (audio.paused) draw(0); });
    wave.addEventListener('click', e => {
      const r = wave.getBoundingClientRect(), f = clamp((e.clientX - r.left) / r.width, 0, 1);
      const seek = () => { audio.currentTime = f * audio.duration; syncWords(); draw(0); };
      if (audio.duration) seek(); else audio.addEventListener('loadedmetadata', seek, { once: true });
      if (audio.paused) audio.play().catch(() => {});
    });
    const speeds = [1, 1.25, 1.5, 0.75];
    speedBtn.addEventListener('click', () => {
      const i = (speeds.indexOf(audio.playbackRate) + 1) % speeds.length;
      audio.playbackRate = speeds[i];
      speedBtn.textContent = speeds[i].toFixed(speeds[i] % 1 ? 2 : 1).replace(/0$/, '') + '×';
    });
    $('#voiceRestart').addEventListener('click', () => { audio.currentTime = 0; syncWords(); audio.play().catch(() => {}); });
  }

  /* =========================================================
     WORK
     ========================================================= */
  const WORKS = Array.isArray(window.WORKS) ? window.WORKS : [];
  const motifFor = (() => {
    const design = ['orbit', 'type3d', 'print'], video = ['play', 'filmstrip', 'phones'];
    let d = 0, v = 0;
    const map = new Map();
    WORKS.forEach(w => map.set(w.id, w.category === 'video' ? video[v++ % 3] : design[d++ % 3]));
    return w => map.get(w.id) || 'orbit';
  })();
  const coverOf = w => w.cover || art(motifFor(w));
  let currentList = WORKS.slice();

  function works() {
    const grid = $('#workGrid'), pill = $('#filterPill');
    $('#countAll').textContent = WORKS.length;
    $('#countDesign').textContent = WORKS.filter(w => w.category === 'design').length;
    $('#countVideo').textContent = WORKS.filter(w => w.category === 'video').length;

    const autoSizes = ['w7', 'w5', 'w5', 'w7', 'w6', 'w6'];
    const sizeMap = { wide: 'w7', narrow: 'w5', full: 'w12', '': 'w6' };

    function render(filter) {
      currentList = filter === 'all' ? WORKS.slice() : WORKS.filter(w => w.category === filter);
      grid.innerHTML = currentList.map((w, i) => {
        const size = w.size === 'full' ? 'w12' : filter === 'all' ? (sizeMap[w.size || ''] || 'w6') : autoSizes[i % autoSizes.length];
        const isVid = w.category === 'video';
        return `<article class="card ${size}" data-i="${i}" data-cursor="view" data-cursor-text="${isVid ? 'Play' : 'View'}" tabindex="0" role="button" aria-label="Open ${esc(w.title)}">
          <div class="card-cover">
            <div class="card-media"><img src="${esc(coverOf(w))}" alt="${esc(w.title)}" loading="lazy" />${w.preview ? `<video muted loop playsinline preload="none" src="${esc(w.preview)}"></video>` : ''}</div>
            <div class="card-badges"><span class="tag">${isVid ? 'Video editing' : 'Graphic design'}</span>${w.client ? `<span class="tag">${esc(w.client)}</span>` : ''}</div>
            <span class="card-play" aria-hidden="true">${isVid ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' : '<svg viewBox="0 0 24 24" style="fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round"><path d="M7 17 17 7M8 7h9v9"/></svg>'}</span>
          </div>
          <div class="card-info">
            <div><h3 class="card-title"><span>${esc(w.title)}</span></h3><div class="card-sub">${esc(w.role || '')}</div></div>
            <span class="card-year">${esc(w.year || '')}</span>
          </div>
        </article>`;
      }).join('') || '<p class="work-note">New projects coming soon.</p>';

      const cards = $$('.card', grid);
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { threshold: 0.1 });
      cards.forEach((c, i) => {
        c.style.setProperty('--d', (i % 2) * 0.12 + 's');
        io.observe(c);
        const media = $('.card-media', c), vid = $('video', c);
        if (fine && !reduced) {
          c.addEventListener('mousemove', e => {
            const r = c.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            media.style.transform = `translate(${x * -18}px, ${y * -18}px) scale(1.06)`;
          });
          c.addEventListener('mouseleave', () => { media.style.transform = ''; });
        }
        if (vid) {
          vid.addEventListener('playing', () => vid.classList.add('ready'));
          c.addEventListener('mouseenter', () => vid.play().catch(() => {}));
          c.addEventListener('mouseleave', () => vid.pause());
        }
        c.addEventListener('click', () => openProject(+c.dataset.i));
        c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(+c.dataset.i); } });
      });
    }

    function movePill(btn) {
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.transform = `translateX(${btn.offsetLeft}px)`;
    }
    const btns = $$('.filter');
    btns.forEach(b => b.addEventListener('click', () => {
      if (b.classList.contains('is-active')) return;
      btns.forEach(x => x.classList.toggle('is-active', x === b));
      movePill(b);
      $$('.card', grid).forEach(c => c.classList.add('out'));
      setTimeout(() => render(b.dataset.filter), reduced ? 0 : 320);
    }));
    render('all');
    requestAnimationFrame(() => movePill($('.filter.is-active')));
    addEventListener('resize', () => movePill($('.filter.is-active')));
    if (document.fonts) document.fonts.ready.then(() => movePill($('.filter.is-active')));
  }

  /* ---------- project modal ---------- */
  let projIndex = 0;
  function mediaFor(src) {
    const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Project video"></iframe>`;
    const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return `<iframe src="https://player.vimeo.com/video/${vm[1]}?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Project video"></iframe>`;
    if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) return `<video src="${esc(src)}" controls autoplay playsinline></video>`;
    return `<img src="${esc(src)}" alt="" />`;
  }
  function openProject(i) {
    projIndex = (i + currentList.length) % currentList.length;
    const w = currentList[projIndex]; if (!w) return;
    const items = [];
    if (w.video) items.push({ type: 'video', src: w.video, thumb: coverOf(w) });
    items.push({ type: 'img', src: coverOf(w), thumb: coverOf(w) });
    (w.gallery || []).forEach(g => items.push({ type: 'img', src: g, thumb: g }));
    const media = $('#projMedia'), thumbs = $('#projThumbs');
    const show = k => {
      media.innerHTML = items[k].type === 'video' ? mediaFor(items[k].src) : `<img src="${esc(items[k].src)}" alt="${esc(w.title)}" />`;
      $$('button', thumbs).forEach((b, j) => b.classList.toggle('is-active', j === k));
    };
    thumbs.innerHTML = items.length > 1 ? items.map((it, k) => `<button type="button" aria-label="Show item ${k + 1}"><img src="${esc(it.thumb)}" alt="" />${it.type === 'video' ? '' : ''}</button>`).join('') : '';
    $$('button', thumbs).forEach((b, k) => b.addEventListener('click', () => show(k)));
    show(0);
    $('#projCat').textContent = w.category === 'video' ? 'Video editing' : 'Graphic design';
    $('#projTitle').textContent = w.title;
    $('#projSummary').textContent = w.summary || '';
    $('#projTags').innerHTML = (w.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
    const meta = [['Client', w.client], ['Year', w.year], ['Role', w.role], ['Tools', (w.tools || []).join(', ')]].filter(m => m[1]);
    $('#projMeta').innerHTML = meta.map(m => `<div><dt>${m[0]}</dt><dd>${esc(m[1])}</dd></div>`).join('');
    const nav = currentList.length > 1;
    $('#projPrev').style.visibility = $('#projNext').style.visibility = nav ? 'visible' : 'hidden';
    openModal($('#projModal'));
  }
  function projectModal() {
    $('#projPrev').addEventListener('click', () => openProject(projIndex - 1));
    $('#projNext').addEventListener('click', () => openProject(projIndex + 1));
    $('#projBook').addEventListener('click', () => {
      const w = currentList[projIndex];
      closeModal($('#projModal'));
      setTimeout(() => openBooking({ service: w.category === 'video' ? 'Video Editing' : 'Graphic Design', notes: `I'd like something similar to “${w.title}”.` }), 350);
    });
  }

  /* ---------- modals ---------- */
  let lastFocus = null;
  function openModal(m) {
    lastFocus = document.activeElement;
    m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
    lenis && lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => { const f = $('.modal-x', m); f && f.focus({ preventScroll: true }); }, 60);
  }
  function closeModal(m) {
    if (!m.classList.contains('open')) return;
    m.classList.remove('open'); m.setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
    document.documentElement.style.overflow = '';
    if (m.id === 'projModal') setTimeout(() => { $('#projMedia').innerHTML = ''; }, 400);
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  function modals() {
    $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(m); }));
    addEventListener('keydown', e => {
      if (e.key === 'Escape') { $$('.modal.open').forEach(closeModal); closeMenu(); }
      const proj = $('#projModal.open');
      if (proj && e.key === 'ArrowRight') openProject(projIndex + 1);
      if (proj && e.key === 'ArrowLeft') openProject(projIndex - 1);
    });
  }

  /* ---------- booking ---------- */
  let pickedService = 'Graphic Design';
  function setService(s) {
    pickedService = s || pickedService;
    $$('#servicePick .seg-btn').forEach(b => b.classList.toggle('is-active', b.dataset.pick === pickedService));
  }
  function openBooking(opts = {}) {
    $('#bookForm').hidden = false; $('#bookDone').hidden = true; $('#bookStatus').textContent = '';
    if (opts.service) setService(opts.service);
    if (opts.plan) $('#bPlan').value = opts.plan;
    if (opts.notes) $('#bNotes').value = opts.notes;
    openModal($('#bookModal'));
  }
  const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
  function sendOut(subject, body, preferWhatsApp) {
    if (preferWhatsApp && CONTACT.whatsapp) {
      window.open(`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(subject + '\n\n' + body)}`, '_blank', 'noopener');
      return true;
    }
    if (CONTACT.email) {
      location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return true;
    }
    if (CONTACT.whatsapp) {
      window.open(`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(subject + '\n\n' + body)}`, '_blank', 'noopener');
      return true;
    }
    return false;
  }
  function booking() {
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-book], [data-plan]');
      if (!b || b.closest('.modal')) return;
      e.preventDefault();
      closeMenu();
      openBooking({ service: b.dataset.service, plan: b.dataset.plan });
    });
    $$('.svc').forEach(s => s.addEventListener('click', () => openBooking({ service: s.dataset.service, notes: `Interested in: ${$('.svc-title', s).textContent}` })));
    $$('#servicePick .seg-btn').forEach(b => b.addEventListener('click', () => setService(b.dataset.pick)));
    $('#bookCallForm').addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#bName').value.trim(), email = $('#bEmail').value.trim(), status = $('#bookStatus');
      if (!name) { status.textContent = 'Please add your name.'; status.className = 'form-msg mono err'; $('#bName').focus(); return; }
      if (!validEmail(email)) { status.textContent = 'Please add a valid email.'; status.className = 'form-msg mono err'; $('#bEmail').focus(); return; }
      const slot = $('#bSlot').value, plan = $('#bPlan').value.trim(), notes = $('#bNotes').value.trim();
      const body = `Name: ${name}\nEmail: ${email}\nFocus: ${pickedService}\nPreferred slot: ${slot}\nPackage: ${plan}\n\n${notes}`;
      sendOut(`Call request — ${pickedService}`, body, true);
      $('#bookSummary').innerHTML = `Thanks, <b>${esc(name)}</b>! Your <b>${esc(pickedService)}</b> call (<b>${esc(slot)}</b>, ${esc(plan)}) is requested. I’ll confirm at <b>${esc(email)}</b>.`;
      $('#bookForm').hidden = true; $('#bookDone').hidden = false;
      e.target.reset(); $('#bPlan').value = plan;
    });
    $('#quickForm').addEventListener('submit', e => {
      e.preventDefault();
      const email = $('#quickEmail').value.trim(), msg = $('#quickMsg').value.trim(), status = $('#quickStatus');
      if (!validEmail(email)) { status.textContent = 'Please add a valid email.'; status.className = 'form-msg mono err'; return; }
      if (!msg) { status.textContent = 'Tell me a little about the project.'; status.className = 'form-msg mono err'; return; }
      sendOut('Project enquiry from the website', `From: ${email}\n\n${msg}`, false);
      status.textContent = '✓ Message received — I’ll get back to you within 24 hours.'; status.className = 'form-msg mono';
      e.target.reset();
    });
  }

  /* ---------- services hover preview ---------- */
  function services() {
    const float = $('#svcFloat'), inner = $('#svcFloatIn'), list = $('#svcList');
    inner.innerHTML = ['orbit', 'phones', 'filmstrip', 'type3d'].map(m => `<div><img src="${art(m)}" alt="" /></div>`).join('');
    if (!fine) return;
    let on = false, x = 0, y = 0, rot = 0;
    $$('.svc', list).forEach(s => s.addEventListener('mouseenter', () => {
      inner.style.transform = `translateY(${-s.dataset.svc * 100}%)`;
    }));
    list.addEventListener('mouseenter', () => { on = true; float.classList.add('on'); x = mouse.x; y = mouse.y; });
    list.addEventListener('mouseleave', () => { on = false; float.classList.remove('on'); });
    tickers.push(() => {
      if (!on && !float.classList.contains('on')) return;
      const nx = lerp(x, mouse.x + 170, 0.12), ny = lerp(y, mouse.y, 0.12);
      rot = lerp(rot, clamp((nx - x) * 0.6, -12, 12), 0.15);
      x = nx; y = ny;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${on ? 1 : 0.6})`;
    });
  }

  /* ---------- design lab ---------- */
  function designLab() {
    const presets = {
      cyber: { theme: 'theme-cyber', cat: 'BRAND SYSTEM 01', dims: '3000 × 3000 PX · CMYK/RGB', sub: 'SOLAR PULSE® VISUAL IDENTITY', head: 'HIGH VOLTAGE<br /><em>TYPOGRAPHY.</em>', desc: 'Rounded geometric shapes, deep carbon blacks and electric orange focal points for maximum shelf & screen authority.' },
      minimal: { theme: 'theme-minimal', cat: 'EDITORIAL POSTER 02', dims: 'A1 PRINT · 300 DPI', sub: 'SWISS MODERN EXHIBITION', head: 'PRECISION IN<br /><em>NEGATIVE SPACE.</em>', desc: 'Balanced monochrome hierarchy paired with bold orange callouts and razor-sharp modular grid alignment.' },
      energy: { theme: 'theme-energy', cat: '3D PACKAGING 03', dims: 'CAN DIELINE · METALLIC INK', sub: 'IGNIS NITRO COLD BREW', head: 'MATTE BLACK &amp;<br /><em>CITRUS FLARE.</em>', desc: 'Tactile packaging system with custom vector badges, nutrition table styling and 3D studio lighting renders.' }
    };
    const ab = $('#artboard'), body = $('.ab-body', ab);
    $$('#labPresets .seg-btn').forEach(b => b.addEventListener('click', () => {
      const p = presets[b.dataset.preset];
      $$('#labPresets .seg-btn').forEach(x => x.classList.toggle('is-active', x === b));
      ab.className = 'artboard ' + p.theme;
      $('#abCat').textContent = p.cat; $('#labDims').textContent = p.dims;
      $('#abSub').textContent = p.sub; $('#abHead').innerHTML = p.head; $('#abDesc').textContent = p.desc;
      body.classList.remove('ab-swap'); void body.offsetWidth; body.classList.add('ab-swap');
    }));
    $$('.tog').forEach(t => t.addEventListener('click', () => {
      t.classList.toggle('is-on');
      $('#' + t.dataset.layer).classList.toggle('off', !t.classList.contains('is-on'));
    }));
    if (fine && !reduced) {
      const stage = $('#labStage');
      stage.addEventListener('mousemove', e => {
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        ab.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      stage.addEventListener('mouseleave', () => { ab.style.transform = ''; });
    }
  }

  /* ---------- colour grade slider ---------- */
  function gradeScene(final) {
    return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky${final}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1b30"/><stop offset=".35" stop-color="#3b3560"/><stop offset=".55" stop-color="#c8664a"/><stop offset=".68" stop-color="#f4b26a"/></linearGradient>
        <radialGradient id="sun${final}" cx="980" cy="560" r="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe7b8"/><stop offset=".18" stop-color="#ffc27a" stop-opacity=".9"/><stop offset="1" stop-color="#ff8a3d" stop-opacity="0"/></radialGradient>
        <linearGradient id="sea${final}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a46"/><stop offset="1" stop-color="#07070b"/></linearGradient>
        <linearGradient id="tt${final}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d6b78" stop-opacity=".55"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#ff5500" stop-opacity=".45"/></linearGradient>
        <radialGradient id="vig${final}" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#sky${final})"/>
      <circle cx="980" cy="560" r="330" fill="url(#sun${final})"/>
      <circle cx="980" cy="575" r="78" fill="#ffe9c4"/>
      <path d="M0 520 L180 430 L330 500 L520 380 L700 480 L860 420 L1040 520 L1220 400 L1400 470 L1600 410 L1600 620 L0 620Z" fill="#6d4a6a" opacity=".7"/>
      <path d="M0 580 L140 520 L300 570 L460 490 L640 575 L820 530 L1000 600 L1180 520 L1360 585 L1600 530 L1600 640 L0 640Z" fill="#3a2638"/>
      <rect y="620" width="1600" height="280" fill="url(#sea${final})"/>
      <g fill="#ffd39a">
        <rect x="900" y="640" width="160" height="6" rx="3" opacity=".8"/><rect x="930" y="664" width="110" height="5" rx="3" opacity=".6"/>
        <rect x="880" y="690" width="200" height="5" rx="3" opacity=".45"/><rect x="945" y="716" width="80" height="4" rx="2" opacity=".35"/>
        <rect x="910" y="745" width="140" height="4" rx="2" opacity=".22"/>
      </g>
      <path d="M180 900 L230 760 Q300 700 420 720 L560 740 Q600 800 640 900Z" fill="#0a0709"/>
      <g fill="#0a0709"><circle cx="420" cy="612" r="17"/><path d="M402 632 Q420 622 438 632 L446 700 L432 700 L428 728 L412 728 L408 700 L394 700Z"/><path d="M438 640 L470 600 L476 606 L446 652Z"/></g>
      <g fill="none" stroke="#1a1016" stroke-width="3" stroke-linecap="round"><path d="M600 300 q12 -10 24 0 q12 -10 24 0"/><path d="M680 260 q9 -8 18 0 q9 -8 18 0"/><path d="M560 250 q8 -7 16 0 q8 -7 16 0"/></g>
      ${final ? `<rect width="1600" height="900" fill="url(#tt${final})" style="mix-blend-mode:soft-light"/><rect width="1600" height="900" fill="url(#vig${final})"/>` : ''}
    </svg>`;
  }
  function grade() {
    const view = $('#gradeView'), val = $('#gradeVal');
    $('#gradeLog').innerHTML = gradeScene(0);
    $('#gradeFinal').innerHTML = gradeScene(1);
    let g = 60;
    const set = v => { g = clamp(v, 3, 97); view.style.setProperty('--g', g + '%'); val.textContent = Math.round(g); };
    set(60);
    let drag = false;
    const fromEvent = e => { const r = view.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
    view.addEventListener('pointerdown', e => { drag = true; view.setPointerCapture(e.pointerId); fromEvent(e); });
    view.addEventListener('pointermove', e => { if (drag) fromEvent(e); });
    view.addEventListener('pointerup', () => { drag = false; });
    view.addEventListener('pointercancel', () => { drag = false; });
    view.tabIndex = 0; view.setAttribute('role', 'slider'); view.setAttribute('aria-label', 'Colour grade comparison'); view.setAttribute('aria-valuemin', '0'); view.setAttribute('aria-valuemax', '100');
    view.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { set(g - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(g + 5); e.preventDefault(); }
      view.setAttribute('aria-valuenow', Math.round(g));
    });
    // intro sweep when it first comes into view
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || reduced) return;
      io.disconnect();
      const t0 = performance.now();
      const run = now => {
        const k = Math.min(1, (now - t0) / 1800);
        const v = k < 0.45 ? lerp(60, 12, Math.sin(k / 0.45 * Math.PI / 2)) : lerp(12, 60, 1 - Math.pow(1 - (k - 0.45) / 0.55, 3));
        if (!drag) set(v);
        if (k < 1 && !drag) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    io.observe(view);
  }

  /* ---------- scroll-scrubbed timeline ---------- */
  function timeline() {
    const sec = $('#timeline'), tl = $('#tl'), head = $('#tlPlayhead'), tcEl = $('#tlTc');
    const frameEl = $('#tlFrame'), cap = $('#tlCaption');
    const tracks = {
      v3: { title: 'Track V3 — Kinetic Typography & Motion UI', desc: 'Custom spring-physics animated captions, glowing product callouts and branded lower thirds that keep viewers past the first 15 seconds.', clips: [[0, 9, 'HOOK', 'Stop scrolling.'], [14, 24, 'TITLE', 'Meet IMRANICK'], [33, 44, 'CALLOUT', 'Every cut counts'], [48, 58, 'LOWER 3RD', 'Imran — Editor'], [66, 76, 'POP', 'Hold attention'], [86, 100, 'CTA', 'Book a call →']] },
      v2: { title: 'Track V2 — Speed Ramps & B-Roll', desc: 'Velocity-mapped transitions, whip-pans and rotoscoped subject masks synced to the beat for seamless visual momentum.', clips: [[8, 18, 'B-ROLL RAMP'], [30, 40, 'MATCH CUT'], [52, 61, 'WHIP PAN'], [70, 80, 'B-ROLL'], [88, 96, 'DRONE']] },
      v1: { title: 'Track V1 — Story Cut & Film Emulation', desc: 'Zero-fluff story pacing with custom DaVinci Resolve node trees, rich carbon blacks and signature warm orange highlights.', clips: [[0, 22, 'A-CAM 01'], [22, 41, 'A-CAM 02'], [41, 63, 'INTERVIEW'], [63, 82, 'A-CAM 03'], [82, 100, 'OUTRO']] },
      a1: { title: 'Track A1 — Sound Design & Mastering', desc: 'Sub-bass drops, crisp Foley, risers and broadcast-ready vocal compression mastered to −14 LUFS for YouTube and Reels.', clips: [[0, 100, 'MUSIC + SFX']] }
    };
    const looks = [
      'radial-gradient(circle at 70% 40%, #ff8a3d 0%, #5a1d05 45%, #0b0b0e 80%)',
      'radial-gradient(circle at 30% 60%, #3d7a85 0%, #10232a 50%, #060608 85%)',
      'linear-gradient(135deg, #2a2a33 0%, #FF5500 140%)',
      'radial-gradient(circle at 50% 30%, #f4b26a 0%, #7a2d10 50%, #0b0b0e 85%)',
      'linear-gradient(160deg, #101018 20%, #3a2638 60%, #c8664a 120%)'
    ];
    const brollLooks = ['linear-gradient(90deg,#FF5500,#ffb27a)', 'repeating-linear-gradient(115deg,#18181e 0 40px,#23232b 40px 80px)', 'linear-gradient(200deg,#0d6b78,#08080a)', 'radial-gradient(circle at 50% 50%,#ffe0b8,#ff5500 40%,#140600 80%)', 'linear-gradient(180deg,#9bb7d4,#3b3560 60%,#0b0b0e)'];

    const clipEls = {};
    Object.entries(tracks).forEach(([k, tr]) => {
      const lane = $('#lane' + k.toUpperCase());
      clipEls[k] = tr.clips.map(([s, e, label]) => {
        const c = document.createElement('div');
        c.className = 'clip ' + k; c.style.left = s + '%'; c.style.width = (e - s) + '%';
        c.innerHTML = k === 'a1' ? '<canvas></canvas>' : esc(label);
        lane.appendChild(c);
        return { el: c, s, e };
      });
    });
    // audio waveform clip
    const wc = $('.clip.a1 canvas');
    function drawA1() {
      const r = wc.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      wc.width = r.width * dpr; wc.height = r.height * dpr;
      const x = wc.getContext('2d'); x.scale(dpr, dpr); x.fillStyle = 'rgba(255,119,51,.75)';
      for (let i = 0; i < r.width; i += 3) {
        const a = (0.25 + 0.75 * Math.abs(Math.sin(i * 0.05) * Math.sin(i * 0.013 + 1))) * (r.height * 0.42);
        x.fillRect(i, r.height / 2 - a, 2, a * 2);
      }
    }
    drawA1(); addEventListener('resize', drawA1);
    $('#tlRuler').innerHTML = [0, 5, 10, 15, 20, 25, 30].map(s => `<span style="left:${s / 30 * 100}%">${s}s</span>`).join('');

    let manual = null, lastQ = -1, lastCap = null, lastLook = null;
    function setTrack(k) {
      $$('.tl-row').forEach(r => r.classList.toggle('is-active', r.dataset.track === k));
      $$('.tl-pick').forEach(b => b.classList.toggle('is-active', b.dataset.track === k));
      $('#tlTrackTitle').textContent = tracks[k].title;
      $('#tlTrackDesc').textContent = tracks[k].desc;
    }
    $$('.tl-pick').forEach(b => b.addEventListener('click', () => { manual = b.dataset.track; setTrack(manual); }));
    $$('.tl-row').forEach(r => r.addEventListener('click', () => { manual = r.dataset.track; setTrack(manual); }));
    setTrack('v3');

    tickers.push(() => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = clamp(-r.top / (r.height - innerHeight), 0, 1), pc = p * 100;
      const laneLeft = isMobile() ? 50 : 58;
      const width = tl.clientWidth - laneLeft - 14;
      head.style.transform = `translateX(${p * width}px)`;
      tcEl.textContent = tc(p * 30 * 60, 60);
      let capText = '', look = '';
      Object.entries(clipEls).forEach(([k, list]) => list.forEach((c, i) => {
        const live = pc >= c.s && pc < c.e + (c.e === 100 ? 1 : 0);
        c.el.classList.toggle('live', live);
        if (live && k === 'v3') capText = tracks.v3.clips[i][3];
        if (live && k === 'v2') look = brollLooks[i % brollLooks.length];
        if (live && k === 'v1' && !look) look = looks[i % looks.length];
      }));
      if (look !== lastLook) { frameEl.style.background = look; lastLook = look; }
      frameEl.style.transform = `scale(${1.05 + (pc % 20) / 200})`;
      if (capText !== lastCap) { cap.innerHTML = capText ? `<span>${esc(capText)}</span>` : ''; lastCap = capText; }
      const q = Math.min(3, Math.floor(p * 4));
      if (q !== lastQ) { lastQ = q; manual = null; setTrack(['v3', 'v2', 'v1', 'a1'][q]); }
    });
  }

  /* ---------- process line ---------- */
  function processLine() {
    const steps = $('#steps'), fill = $('#stepsFill'), items = $$('.step', steps);
    tickers.push(() => {
      const r = steps.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const p = clamp((innerHeight * 0.75 - r.top) / (r.height * 0.9), 0, 1);
      fill.style.transform = isMobile() ? `scaleY(${p})` : `scaleX(${p})`;
      items.forEach((s, i) => s.classList.toggle('lit', p >= i / items.length + 0.02));
    });
  }

  /* ---------- pricing ---------- */
  function pricing() {
    const seg = $('#billing'), pill = $('#billingPill'), btns = $$('.seg-btn', seg);
    const move = b => { pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft - 4}px)`; };
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('is-active', x === b));
      move(b);
      const mode = b.dataset.mode;
      $$('.plan .amt').forEach(a => tween(a, +a.dataset[mode], { dur: 700 }));
      $$('.plan .per').forEach(p => { p.textContent = p.dataset[mode]; });
    }));
    requestAnimationFrame(() => move($('.seg-btn.is-active', seg)));
    addEventListener('resize', () => move($('.seg-btn.is-active', seg)));
    if (document.fonts) document.fonts.ready.then(() => move($('.seg-btn.is-active', seg)));
    $$('.plan .amt').forEach(a => { a.dataset.v = a.dataset.monthly; });

    // configurator
    const state = { name: 'Full Creative Partner', base: 2450, brand: false, thumb: false, langs: 0, promo: 0 };
    const totalEl = $('#sumTotal'); totalEl.dataset.v = 2450;
    function update() {
      $('#sumName').textContent = state.name;
      $('#sumBase').textContent = money(state.base) + '/mo';
      const rows = [];
      let add = 0;
      if (state.brand) { rows.push(['Brand identity & print kit', 109]); add += 109; }
      if (state.thumb) { rows.push(['Thumbnail & banner pack', 79]); add += 79; }
      if (state.langs) { rows.push([`${state.langs} extra language${state.langs > 1 ? 's' : ''}`, state.langs * 39]); add += state.langs * 39; }
      if (state.promo) rows.push(['Promo IMRANICK10 (−10%)', -Math.round((state.base + add) * state.promo)]);
      $('#sumAddons').innerHTML = rows.length ? rows.map(r => `<div><span>${r[1] < 0 ? '' : '+ '}${esc(r[0])}</span><span class="mono">${r[1] < 0 ? '−' + money(-r[1]) : '+' + money(r[1])}</span></div>`).join('') : '<span class="empty">No add-ons yet</span>';
      tween(totalEl, Math.round((state.base + add) * (1 - state.promo)), { dur: 600, fmt: n => money(n) });
    }
    $$('#configBases .cb').forEach(b => b.addEventListener('click', () => {
      $$('#configBases .cb').forEach(x => x.classList.toggle('is-active', x === b));
      state.name = b.dataset.name; state.base = +b.dataset.price; update();
    }));
    $$('.switch').forEach(s => s.addEventListener('click', () => {
      const on = s.getAttribute('aria-pressed') !== 'true';
      s.setAttribute('aria-pressed', on); s.closest('.addon').classList.toggle('on', on);
      state[s.dataset.addon] = on; update();
    }));
    $('#langPlus').addEventListener('click', () => { state.langs = Math.min(9, state.langs + 1); $('#langCount').textContent = state.langs; $('#langCount').closest('.addon').classList.toggle('on', state.langs > 0); update(); });
    $('#langMinus').addEventListener('click', () => { state.langs = Math.max(0, state.langs - 1); $('#langCount').textContent = state.langs; $('#langCount').closest('.addon').classList.toggle('on', state.langs > 0); update(); });
    const applyPromo = () => {
      const code = $('#promoInput').value.trim().toUpperCase(), msg = $('#promoMsg');
      if (code === 'IMRANICK10') { state.promo = 0.1; msg.textContent = '✓ 10% discount applied to your first month.'; msg.classList.add('ok'); }
      else { state.promo = 0; msg.textContent = code ? 'That code didn’t work — try IMRANICK10.' : 'Try IMRANICK10 for 10% off your first month.'; msg.classList.remove('ok'); }
      update();
    };
    $('#promoApply').addEventListener('click', applyPromo);
    $('#promoInput').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyPromo(); } });
    $('#configStart').addEventListener('click', () => {
      const extras = [state.brand && 'brand kit', state.thumb && 'thumbnail pack', state.langs && `${state.langs} extra language(s)`, state.promo && 'promo IMRANICK10'].filter(Boolean);
      openBooking({ plan: state.name, service: state.name === 'Brand & Visual Pack' ? 'Graphic Design' : state.name === 'Motion & Ad Scale' ? 'Video Editing' : 'Both (Full Plan)', notes: `Plan: ${state.name}${extras.length ? ' + ' + extras.join(', ') : ''} — est. ${totalEl.textContent}/month` });
    });
    update();
  }

  /* ---------- FAQ smooth accordion ---------- */
  function faq() {
    $$('.qa').forEach(d => {
      const s = $('summary', d), b = $('.qa-body', d);
      s.addEventListener('click', e => {
        e.preventDefault();
        if (reduced) { d.open = !d.open; return; }
        if (d.open) {
          const a = b.animate([{ height: b.scrollHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
          d.classList.add('closing');
          a.onfinish = () => { d.open = false; d.classList.remove('closing'); };
        } else {
          d.open = true;
          b.animate([{ height: '0px', opacity: 0 }, { height: b.scrollHeight + 'px', opacity: 1 }], { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)' });
        }
      });
    });
  }

  /* ---------- clock + year ---------- */
  function clock() {
    const el = $('#clock');
    const tick = () => {
      const d = new Date(Date.now() + (new Date().getTimezoneOffset() + 360) * 60000);
      el.textContent = `Studio time — ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} (GMT+6)`;
    };
    tick(); setInterval(tick, 1000);
    $('#year').textContent = new Date().getFullYear();
  }

  /* ---------- main loop ---------- */
  let lastY = scrollY, vel = 0;
  function loop(t) {
    if (lenis) lenis.raf(t);
    const y = scrollY;
    vel = lerp(vel, y - lastY, 0.25);
    lastY = y;
    for (const f of tickers) f(t, y, vel);
    requestAnimationFrame(loop);
  }

  /* ---------- boot ---------- */
  function boot() {
    if ('scrollRestoration' in history && !location.hash) { history.scrollRestoration = 'manual'; scrollTo(0, 0); }
    document.body.classList.add('is-loading');
    grain();
    initScroll();
    lenis && lenis.stop();
    cursor();
    magnetic();
    heroCanvas();
    scramble();
    nav();
    reveals();
    marquee();
    fillText();
    voice();
    works();
    projectModal();
    modals();
    booking();
    services();
    designLab();
    grade();
    timeline();
    processLine();
    pricing();
    faq();
    clock();
    requestAnimationFrame(loop);
    preloader().then(intro);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
