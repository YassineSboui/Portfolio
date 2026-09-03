# Yassine Sboui — Portfolio

My personal portfolio website. A fast, dependency-free single-page site
(hand-written HTML, CSS, and vanilla JS) — no framework runtime, no build step.

Live: <https://yassinesboui.github.io/Portfolio/>

## Highlights

- Zero JavaScript framework — instant load, great Lighthouse scores
- Terminal-style hero: the introduction is typed out as shell commands
- Looping code backdrop behind the hero, built from real snippets of my own projects
- Per-project demo videos, recorded from the running applications
- Dark / light theme with system preference + persistence
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Fully responsive with an accessible mobile nav
- Videos are `preload="none"` and only play while on screen

## Featured projects

| Project | Stack | Demo |
| --- | --- | --- |
| NeoForm V2 — multi-tenant form & workflow platform (NeoLedge) | Vue 3 · .NET 8 · PostgreSQL · Blockly | private |
| Talent Bridge — data/BI/NLP/ML recruitment platform | Python · FastAPI · Vue 3 · Power BI | video |
| Medical Prescription NLP — symptom & entity analysis | Python · FastAPI · scikit-learn | video |
| MRAYAQ — menswear brand site | Vue 3 · .NET 8 minimal API | video |
| Smart City Traffic Simulator — intelligent intersection sim | C | — |

## Structure

```text
index.html              # markup & content
assets/css/styles.css   # theming, layout, animations
assets/js/main.js       # theme toggle, nav, scroll reveal
assets/img/             # optimized photo & favicons
assets/video/           # code backdrop + project demo reels
```

## Run locally

Just open `index.html`, or serve the folder:

```bash
npx serve .
```

## Deploy (GitHub Pages)

Served straight from the repository root — push to `main` and enable Pages.
Paths are relative, so it works under the `/Portfolio/` subpath.

---

© Yassine Sboui — Designed & built from scratch.
