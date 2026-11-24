/* =====================================================================
   The project archive: category filters and a search over name, kind,
   summary and stack. The state lives in the URL (?cat=ai&q=vue), so a
   filtered view can be linked. Without JavaScript every project shows.
   ===================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const toolbar = $('#toolbar');
  if (!toolbar) return;
  toolbar.hidden = false;

  const cards = $$('.pcard');
  const filters = $$('.filter');
  const input = $('#projectSearch');
  const count = $('#resultCount');
  const empty = $('#emptyState');
  const grid = $('#projectGrid');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const params = new URLSearchParams(location.search);
  let cat = params.get('cat') || '';
  if (!filters.some((f) => f.dataset.cat === cat)) cat = '';
  input.value = params.get('q') || '';

  const render = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const ok = (!cat || c.dataset.cats.split(' ').includes(cat)) && (!q || c.dataset.search.includes(q));
      c.hidden = !ok;
      if (ok) shown += 1;
    });
    filters.forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.cat === cat)));
    count.textContent = shown === 1 ? '1 project' : `${shown} projects`;
    empty.hidden = shown > 0;
    grid.hidden = shown === 0;
    const next = new URLSearchParams();
    if (cat) next.set('cat', cat);
    if (q) next.set('q', q);
    history.replaceState(null, '', next.toString() ? `?${next}` : location.pathname);
  };

  // Cards that stay glide to their new places instead of jumping, where the browser can.
  const update = () => {
    if (document.startViewTransition && !reduce.matches) document.startViewTransition(render);
    else render();
  };

  filters.forEach((f) => f.addEventListener('click', () => { cat = f.dataset.cat; update(); }));
  let t = 0;
  input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(render, 120); });
  $('#clearFilters')?.addEventListener('click', () => { cat = ''; input.value = ''; update(); input.focus(); });

  render();
})();
