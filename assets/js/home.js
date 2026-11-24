/* =====================================================================
   Homepage behaviour: the hero figure, the selected-work carousel, the
   pipeline stages and the stack constellation. No dependencies.
   Everything here is an enhancement: without it the page shows every
   slide, every stage and the full technology list.
   ===================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ---------- Hero: the figure explains the box you point at ---------- */
  const say = $('#heroSay');
  if (say) {
    const resting = say.textContent;
    $$('.bp-node').forEach((node) => {
      node.addEventListener('pointerenter', () => { node.classList.add('is-on'); say.textContent = node.dataset.say; });
      node.addEventListener('pointerleave', () => { node.classList.remove('is-on'); say.textContent = resting; });
    });
  }

  /* ---------- Hero: coordinates readout and a grid that leans with the pointer ----------
     One write per frame, coalesced through rAF; off for touch and for reduced motion. */
  const hero = $('.hero');
  const grid = $('.hero__grid');
  const rx = $('#rx');
  const ry = $('#ry');
  if (hero && finePointer.matches && !reduce.matches) {
    let frame = 0;
    let px = 0;
    let py = 0;
    const pad = (n) => String(Math.max(0, Math.round(n))).padStart(4, '0');
    const paint = () => {
      frame = 0;
      const r = hero.getBoundingClientRect();
      if (rx) rx.textContent = pad(px - r.left);
      if (ry) ry.textContent = pad(py - r.top);
      const nx = (px - r.left) / r.width - 0.5;
      const ny = (py - r.top) / r.height - 0.5;
      grid?.style.setProperty('--gx', (nx * -14).toFixed(1) + 'px');
      grid?.style.setProperty('--gy', (ny * -10).toFixed(1) + 'px');
    };
    hero.addEventListener('pointermove', (e) => {
      px = e.clientX; py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    }, { passive: true });
    hero.addEventListener('pointerenter', () => hero.classList.add('has-pointer'));
    hero.addEventListener('pointerleave', () => hero.classList.remove('has-pointer'));
  }

  /* ---------- Carousel ---------- */
  const carousel = $('.carousel');
  if (carousel) {
    const slides = $$('.slide', carousel);
    const tabs = $$('.carousel__tab', carousel);
    let index = Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));

    const go = (i, focusTab = false) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => {
        const on = n === index;
        s.classList.toggle('is-active', on);
        s.inert = !on;                       // no focus, no clicks, no screen reader on hidden slides
      });
      tabs.forEach((t, n) => {
        if (n === index) t.setAttribute('aria-current', 'true');
        else t.removeAttribute('aria-current');
      });
      if (focusTab) tabs[index]?.focus();
      window.dispatchEvent(new Event('carousel:change'));
    };

    $$('.carousel__step', carousel).forEach((b) =>
      b.addEventListener('click', () => go(index + Number(b.dataset.step))));
    tabs.forEach((t) => t.addEventListener('click', () => go(Number(t.dataset.go))));

    carousel.addEventListener('keydown', (e) => {
      if (e.target.closest('video, input')) return;   // the film's own controls own the arrow keys
      const onTab = e.target.matches('.carousel__tab');
      const from = onTab ? Number(e.target.dataset.go) : index;   // a focused tab is where the arrow starts
      if (e.key === 'ArrowRight') { e.preventDefault(); go(from + 1, onTab); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(from - 1, onTab); }
    });

    // a horizontal swipe on touch screens
    let sx = 0;
    let sy = 0;
    const viewport = $('.carousel__viewport', carousel);
    viewport.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; } }, { passive: true });
    viewport.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'mouse' || !sx) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - sy) * 1.5) go(index + (dx < 0 ? 1 : -1));
      sx = 0;
    }, { passive: true });

    // the film leans a few pixels toward the pointer
    if (finePointer.matches && !reduce.matches) {
      $$('.slide__media', carousel).forEach((m) => {
        const v = $('video', m);
        m.addEventListener('pointermove', (e) => {
          const r = m.getBoundingClientRect();
          v.style.setProperty('--px', (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(1) + 'px');
          v.style.setProperty('--py', (((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(1) + 'px');
        }, { passive: true });
        m.addEventListener('pointerleave', () => { v.style.setProperty('--px', '0px'); v.style.setProperty('--py', '0px'); });
      });
    }
    // posters for the slides not yet shown: fetched once the carousel is about to be seen
    const lazy = $$('video[data-poster]', carousel);
    const givePosters = () => lazy.forEach((v) => { v.poster = v.dataset.poster; v.removeAttribute('data-poster'); });
    if ('IntersectionObserver' in window) {
      const near = new IntersectionObserver((entries, obs) => {
        if (entries.some((e) => e.isIntersecting)) { givePosters(); obs.disconnect(); }
      }, { rootMargin: '300px 0px' });
      near.observe(carousel);
    } else givePosters();

    carousel.classList.add('is-ready');
    go(index);
  }

  /* ---------- Pipeline: an ARIA tab list ---------- */
  const pipeline = $('.pipeline');
  if (pipeline) {
    const tabs = $$('[role="tab"]', pipeline);
    const stages = $$('.stage', pipeline);
    const rail = $('.pipeline__rail', pipeline);
    const select = (i, focus) => {
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).hidden = !on;
        stages[n].classList.toggle('is-done', n < i);
      });
      pipeline.style.setProperty('--progress', String(i / (tabs.length - 1)));
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i, false));
      t.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
        if (next === undefined) return;
        e.preventDefault();
        select(Math.min(last, Math.max(0, next)), true);
      });
    });
    const measure = () => rail && pipeline.style.setProperty('--rail-w', rail.getBoundingClientRect().width + 'px');
    measure();
    window.addEventListener('resize', measure, { passive: true });
    select(0, false);
  }

  /* ---------- Stack constellation: technologies on the rim, projects in the middle ---------- */
  const con = $('.constellation');
  const dataEl = $('#stackData');
  if (con && dataEl) {
    const data = JSON.parse(dataEl.textContent);
    const panel = $('.constellation__panel', con);
    const hint = Array.from(panel.childNodes, (n) => n.cloneNode(true));
    const techNodes = new Map($$('.cnode', con).map((n) => [n.dataset.tech, n]));
    const hubs = new Map($$('.chub', con).map((n) => [n.dataset.project, n]));
    const edges = $$('.cedges path', con);
    const chips = $$('.chip', con);
    let picked = null;   // 't:<tech>' or 'p:<project>'

    const el = (tag, cls, text) => { const x = document.createElement(tag); if (cls) x.className = cls; if (text) x.textContent = text; return x; };
    const linkList = (items) => {
      const ul = el('ul', 'cpanel__list');
      items.forEach(([href, text]) => { const li = el('li'); const a = el('a', '', text); a.href = href; li.append(a); ul.append(li); });
      return ul;
    };

    const pick = (id) => {
      picked = picked === id ? null : id;
      con.classList.toggle('has-pick', !!picked);
      const [type, key] = picked ? [picked[0], picked.slice(2)] : [null, null];
      const nearT = new Set();
      const nearP = new Set();
      edges.forEach((p) => {
        const on = (type === 't' && p.dataset.t === key) || (type === 'p' && p.dataset.p === key);
        p.classList.toggle('is-on', on);
        if (on) { nearT.add(p.dataset.t); nearP.add(p.dataset.p); }
      });
      techNodes.forEach((n, t) => { n.classList.toggle('is-on', type === 't' && t === key); n.classList.toggle('is-near', nearT.has(t)); });
      hubs.forEach((n, k) => { n.classList.toggle('is-on', type === 'p' && k === key); n.classList.toggle('is-near', nearP.has(k)); });
      chips.forEach((c) => c.setAttribute('aria-pressed', String(type === 't' && c.dataset.tech === key)));
      if (!picked) { panel.replaceChildren(...hint.map((n) => n.cloneNode(true))); return; }
      if (type === 't') {
        const projects = data.tech[key] || [];
        panel.replaceChildren(
          el('p', 'cpanel__name', key),
          el('p', 'cpanel__count', projects.length === 1 ? 'Shipped in 1 project' : `Shipped in ${projects.length} projects`),
          linkList(projects.map(([k, n]) => [`work/${k}.html`, n])));
      } else {
        const p = data.project[key];
        panel.replaceChildren(
          el('p', 'cpanel__name', p.name),
          el('p', 'cpanel__count', `${p.kind}, ${p.techs.length} technologies`),
          el('p', 'cpanel__techs', p.techs.join(', ')),
          linkList([[`work/${key}.html`, 'Read the case study']]));
      }
    };
    techNodes.forEach((n, t) => n.addEventListener('click', () => pick('t:' + t)));
    hubs.forEach((n, k) => n.addEventListener('click', () => pick('p:' + k)));
    chips.forEach((c) => c.addEventListener('click', () => pick('t:' + c.dataset.tech)));
  }
})();
