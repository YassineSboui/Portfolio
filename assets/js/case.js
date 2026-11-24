/* =====================================================================
   Case-study pages: the architecture diagram (pick a component to read
   what it does and see what it connects to) and the "On this page"
   contents, which follows the section being read.
   ===================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Architecture diagram ---------- */
  $$('[data-arch]').forEach((fig) => {
    const nodes = $$('.arch__node', fig);
    const edges = $$('.arch__edge', fig);
    const detail = {
      name: $('.arch__detail-name', fig),
      tech: $('.arch__detail-tech', fig),
      desc: $('.arch__detail-desc', fig),
    };
    const info = new Map($$('.arch__list li', fig).map((li) => {
      const name = $('strong', li).textContent;
      const tech = $('.arch__tech-full', li).textContent;
      const desc = li.textContent.split(' — ').slice(1).join(' — ');
      return [li.dataset.node, { name, tech, desc }];
    }));

    const select = (id) => {
      nodes.forEach((n) => n.classList.toggle('is-on', n.dataset.node === id));
      edges.forEach((e) => e.classList.toggle('is-on', e.dataset.from === id || e.dataset.to === id));
      const d = info.get(id);
      if (!d) return;
      detail.name.textContent = d.name;
      detail.tech.textContent = d.tech;
      detail.desc.textContent = d.desc;
    };

    nodes.forEach((n) => {
      n.addEventListener('click', () => select(n.dataset.node));
      n.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(n.dataset.node); }
      });
      n.addEventListener('focus', () => select(n.dataset.node));
    });
    if (nodes[0]) select(nodes[0].dataset.node);
  });

  /* ---------- On this page ----------
     The active entry is the last section whose top has crossed the reading line just under
     the nav; at the very end of the page it is the last one, which can never reach that line. */
  const links = $$('.case__toc a');
  if (links.length) {
    const sections = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const LINE = 140;
    let queued = false;
    const update = () => {
      queued = false;
      const doc = document.documentElement;
      let i = 0;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) i = sections.length - 1;
      else sections.forEach((sec, n) => { if (sec.getBoundingClientRect().top <= LINE) i = n; });
      links.forEach((a, n) => a.classList.toggle('is-active', n === i));
    };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }
})();
