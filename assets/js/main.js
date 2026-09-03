/* =====================================================================
   Yassine Sboui — Portfolio interactions
   No dependencies. Theme toggle, mobile nav, scroll reveal, nav state.
   ===================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const STORAGE_KEY = 'ys-theme';

  // Dark is the designed default (the hero is a code surface); a visitor who
  // explicitly picks light via the toggle keeps that choice.
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) root.setAttribute('data-theme', stored);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  const closeMenu = () => {
    navMenu?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  };

  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  $$('#navMenu a').forEach((link) => link.addEventListener('click', closeMenu));

  /* ---------- Nav scrolled state ---------- */
  const nav = $('#nav');
  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Lightbox (gallery) ---------- */
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxClose = $('#lightboxClose');

  const openLightbox = (src, alt) => {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  $$('[data-full]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      openLightbox(btn.dataset.full, img ? img.alt : '');
    });
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Carousel ---------- */
  $$('.carousel').forEach((carousel) => {
    const track = $('.carousel__track', carousel);
    const slides = $$('.carousel__slide', carousel);
    const dotsWrap = $('.carousel__dots', carousel);
    if (!track || slides.length === 0) return;

    let index = 0;
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Screenshot ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dotsWrap?.appendChild(dot);
      return dot;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => {
        d.classList.toggle('is-active', di === index);
        d.setAttribute('aria-selected', String(di === index));
      });
    }

    $('.carousel__nav--prev', carousel)?.addEventListener('click', () => go(index - 1));
    $('.carousel__nav--next', carousel)?.addEventListener('click', () => go(index + 1));

    // Touch / swipe
    let startX = null;
    track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
    track.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0);
  });

  /* ---------- Terminal intro: reveal each command block in sequence ---------- */
  const term = $('#termIntro');
  if (term && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rows = $$('.term__row', term);
    term.classList.add('is-typing');
    rows.forEach((row, i) => {
      setTimeout(() => row.classList.add('is-shown'), 260 + i * 620);
    });
    // once the last row is out, drop the gate so nothing can stay hidden
    setTimeout(() => term.classList.remove('is-typing'), 260 + rows.length * 620 + 400);
  }

  /* ---------- Project videos: play only the most-visible one at a time ----------
     Decoding several 1080p videos at once (easy to hit on desktop's 2-column grid —
     up to 4 cards can be simultaneously "in view" mid-scroll) is what made scrolling
     feel like a 30fps game there while mobile's single column stayed smooth. Only
     one project video ever plays now, picked by whichever is most visible; everyone
     else stays paused regardless of their own intersection state. The hero backdrop
     video is a separate element in its own section and keeps its own simple rule. */
  if ('IntersectionObserver' in window) {
    const cardVideos = $$('.project__media video');
    const visibleRatio = new Map();

    function playMostVisibleCardVideo() {
      let best = null;
      let bestRatio = 0;
      visibleRatio.forEach((ratio, v) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = v;
        }
      });
      cardVideos.forEach((v) => {
        if (v === best) {
          const p = v.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          v.pause();
        }
      });
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleRatio.set(entry.target, entry.intersectionRatio);
          else visibleRatio.delete(entry.target);
        });
        playMostVisibleCardVideo();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    cardVideos.forEach((v) => cardObserver.observe(v));

    const heroVideo = $('.hero__video');
    if (heroVideo) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const p = heroVideo.play();
              if (p && p.catch) p.catch(() => {});
            } else {
              heroVideo.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      heroObserver.observe(heroVideo);
    }
  }

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
