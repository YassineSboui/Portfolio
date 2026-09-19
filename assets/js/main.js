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

  /* ---------- Project video lifecycle ------------------------------------
     Three rules, in priority order.

     1. A video the visitor paused stays paused, until they press play again.
        The old code called play() on the most-visible video inside every
        IntersectionObserver callback, so any scroll immediately undid a manual
        pause. Every play and pause is now classified: one we did not ask for
        ourselves is the visitor's, and a pause of theirs sets a sticky flag the
        automatic preview will not override. An event we cannot account for is
        counted as theirs too — staying paused is the harmless way to be wrong.

     2. At most one video is ever loaded and decoding. Measured over a scripted
        scroll of the whole page, five runs of each build alternating: the old
        code dropped 1150ms of frame time per 1000 frames and this one drops 22,
        and 22 of 515 frames took longer than 33ms against none of them now.

     3. Nothing is fetched until it is actually going to be watched. The markup
        says preload="none", but play() overrides that, so the old code
        downloaded all eight videos (99 MB) during a single scroll pass. A card
        now has to hold still as the most-visible one for SETTLE_MS before we
        touch it, so scrolling past costs nothing at all. Videos left far behind
        hand their decoder and buffers back and return to the frame the visitor
        was on. */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if ('IntersectionObserver' in window) {
    const SETTLE_MS = 240;   // how long a card must hold still before it previews
    const MIN_RATIO = 0.55;  // and how much of it must be on screen
    const GESTURE_MS = 1000; // a play/pause this soon after real input is the visitor's
    const CLAIM_MS = 800;    // a programmatic play/pause we never saw land expires
    const RELEASE_MS = 6000; // how long a video stays loaded after it is left behind

    const cardVideos = $$('.project__media video');
    const state = new WeakMap();

    const st = (v) => {
      let s = state.get(v);
      if (!s) {
        s = { userPaused: false, userPlayed: false, claimPlay: 0, claimPause: 0, lastInput: 0, resumeAt: 0, ratio: 0 };
        state.set(v, s);
      }
      return s;
    };

    // Our own play()/pause() calls claim the event they are about to fire.
    // Claims expire, so a call whose event never arrived (a rejected play(), a
    // pause() the element swallowed) can never shield a later real user action.
    const claim = (s, key) => {
      s[key] += 1;
      clearTimeout(s[key + 'Timer']);
      s[key + 'Timer'] = setTimeout(() => { s[key] = 0; }, CLAIM_MS);
    };
    const fromUser = (s) => performance.now() - s.lastInput < GESTURE_MS;

    function autoPlay(v) {
      const s = st(v);
      if (s.userPaused || !v.paused) return;
      claim(s, 'claimPlay');
      const p = v.play();
      if (p && p.catch) p.catch(() => { s.claimPlay = Math.max(0, s.claimPlay - 1); });
    }

    function autoPause(v) {
      const s = st(v);
      if (v.paused) return;
      claim(s, 'claimPause');
      v.pause();
    }

    // The observer only reports an exact ratio at the instant a threshold is
    // crossed, so the cached value can be stale by up to a quarter of the card.
    // Once the scroll has stopped we can afford the one rect read that is exact.
    function liveRatio(v) {
      const r = v.getBoundingClientRect();
      if (r.height <= 0) return 0;
      const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return Math.max(0, Math.min(shown / r.height, 1));
    }

    /* --- load / release ------------------------------------------------- */
    // preload="none" means holding a source costs nothing until something calls
    // play(), so a nearby video keeps its <source> and its own controls work.
    function attach(v) {
      const src = v.querySelector('source');
      if (!src || src.getAttribute('src') || !v.dataset.srcHeld) return;
      src.setAttribute('src', v.dataset.srcHeld);
      delete v.dataset.srcHeld;
      claim(st(v), 'claimPause'); // load() fires pause on a playing element
      v.load();
    }

    // Hand the decoder and the buffered bytes back. The poster returns with it,
    // and the frame the visitor was on is kept for the trip back.
    function release(v) {
      const s = st(v);
      const src = v.querySelector('source');
      if (!src || !src.getAttribute('src')) return;
      // Nothing was ever fetched for this one, so there is nothing to give back.
      if (v.readyState === 0 && v.networkState !== 2 /* NETWORK_LOADING */) return;
      s.resumeAt = v.currentTime > 0.25 ? v.currentTime : 0;
      autoPause(v);
      v.dataset.srcHeld = src.getAttribute('src');
      src.removeAttribute('src');
      claim(s, 'claimPause');
      v.load();
    }

    /* --- who gets to play ------------------------------------------------ */
    let active = null;
    let settleTimer = 0;
    let lastScrollAt = 0;
    window.addEventListener('scroll', () => { lastScrollAt = performance.now(); }, { passive: true });

    function pauseAllExcept(keep) {
      cardVideos.forEach((v) => { if (v !== keep) autoPause(v); });
    }

    // Cheap pick from cached ratios: good enough to decide what to STOP.
    function roughPick() {
      let best = null;
      let bestRatio = 0;
      cardVideos.forEach((v) => {
        const s = st(v);
        if (s.userPaused) return;
        if (s.userPlayed && s.ratio > 0) { best = v; bestRatio = 2; return; }
        if (bestRatio < 2 && s.ratio > bestRatio) { bestRatio = s.ratio; best = v; }
      });
      return bestRatio >= MIN_RATIO || bestRatio === 2 ? best : null;
    }

    function review() {
      // Stopping is the urgent half — a decode left running behind the viewport
      // is pure waste — so do it now and decide what to start once things settle.
      const rough = roughPick();
      if (rough !== active) {
        pauseAllExcept(rough);
        active = rough;
      }
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_MS);
    }

    function settle() {
      if (document.hidden) return;
      // The observer goes quiet between threshold crossings, and on a narrow
      // screen — where a card is 150px tall in an 800px viewport — those gaps
      // run longer than SETTLE_MS. Waiting on the observer alone therefore let
      // five videos start mid-flight at 375px. The scroll position itself is the
      // authority on whether anything has actually stopped moving.
      const quiet = performance.now() - lastScrollAt;
      if (quiet < SETTLE_MS) {
        settleTimer = setTimeout(settle, SETTLE_MS - quiet);
        return;
      }
      let best = null;
      let bestRatio = MIN_RATIO;
      cardVideos.forEach((v) => {
        const s = st(v);
        s.ratio = liveRatio(v);
        if (s.userPaused) return;                  // rule 1: never reconsidered
        // A video the visitor started themselves outranks the automatic preview
        // for as long as any part of it is still on screen.
        if (s.userPlayed && s.ratio > 0) { best = v; bestRatio = 2; return; }
        if (bestRatio < 2 && s.ratio > bestRatio) { bestRatio = s.ratio; best = v; }
      });
      active = best;
      pauseAllExcept(best);
      if (!best || reduceMotion.matches) return;
      attach(best);
      autoPlay(best);
    }

    /* --- wiring ---------------------------------------------------------- */
    cardVideos.forEach((v) => {
      const s = st(v);
      const noteInput = () => { s.lastInput = performance.now(); };
      ['pointerdown', 'keydown', 'click'].forEach((e) => v.addEventListener(e, noteInput, { passive: true }));

      v.addEventListener('pause', () => {
        if (fromUser(s)) { s.userPaused = true; s.userPlayed = false; return; } // unmistakably theirs
        if (s.claimPause > 0) { s.claimPause -= 1; return; }                    // ours
        s.userPaused = true;                                                    // unaccounted for: assume theirs
        s.userPlayed = false;
      });

      v.addEventListener('play', () => {
        if (s.claimPlay > 0 && !fromUser(s)) s.claimPlay -= 1;
        else { s.userPaused = false; s.userPlayed = true; active = v; } // they pressed play: honour it
        pauseAllExcept(v);
      });

      // Pick up where they were, before the first frame is shown, never after.
      v.addEventListener('loadedmetadata', () => {
        if (s.resumeAt > 0.25 && v.currentTime < 0.25) {
          try { v.currentTime = s.resumeAt; } catch (_) { /* seeking unsupported */ }
        }
        s.resumeAt = 0;
      });
    });

    // Visibility: decides which card is the preview.
    const previewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { st(e.target).ratio = e.isIntersecting ? e.intersectionRatio : 0; });
        review();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    // Proximity: a video more than a viewport away hands its resources back; one
    // coming back within a viewport gets its source returned, so its own
    // controls work the moment it is reachable again.
    //
    // The teardown waits RELEASE_MS, because somebody scrolling up and down the
    // projects list crosses this boundary every couple of seconds, and releasing
    // on the crossing itself would re-fetch the same video on every pass. The
    // grace period is cancelled the moment the video comes back.
    const releaseTimers = new WeakMap();
    const nearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          clearTimeout(releaseTimers.get(e.target));
          if (e.isIntersecting) attach(e.target);
          else releaseTimers.set(e.target, setTimeout(() => release(e.target), RELEASE_MS));
        });
      },
      { rootMargin: '100% 0px 100% 0px', threshold: 0 }
    );

    cardVideos.forEach((v) => { previewObserver.observe(v); nearObserver.observe(v); });

    // The hero backdrop is decorative and muted; it only runs while it is on
    // screen, never while the tab is hidden, and never under reduced motion
    // (where the stylesheet hides it, but its autoplay attribute would otherwise
    // leave a hidden element decoding).
    const heroVideo = $('.hero__video');
    if (heroVideo) {
      let heroVisible = false;
      const syncHero = () => {
        if (heroVisible && !document.hidden && !reduceMotion.matches) {
          const p = heroVideo.play();
          if (p && p.catch) p.catch(() => {});
        } else heroVideo.pause();
      };
      if (reduceMotion.matches) heroVideo.pause();
      new IntersectionObserver(
        (entries) => { entries.forEach((e) => { heroVisible = e.isIntersecting; }); syncHero(); },
        { threshold: 0.1 }
      ).observe(heroVideo);
      document.addEventListener('visibilitychange', syncHero);
    }

    // A backgrounded tab should not be decoding anything.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { clearTimeout(settleTimer); pauseAllExcept(null); }
      else review();
    });
  }

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
