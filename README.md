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
| Elise.Studio — nine-module multi-tenant platform (NeoLedge) | .NET 10 · Vue 3 · PostgreSQL RLS · YARP | private |
| NeoForm — low-code form, table & workflow platform (NeoLedge) | ASP.NET Core · Vue 3 · PostgreSQL · Blockly | private |
| Symptom Triage Console — attributed predictions, published transfer recall | Python · FastAPI · scikit-learn · Streamlit | video |
| NeoLibrary — 37-component Vue 3 design system (NeoLedge) | Vue 3 · PrimeVue 4 · Tailwind · Storybook | private |
| Talent Bridge — CV scoring & job matching platform | Python · FastAPI · Vue 3 · scikit-learn | video |
| Clinic AI — WhatsApp assistant & live command center | Node.js · WhatsApp Cloud API · SQLite | private |
| MRAYAQ — menswear brand site & back office | Vue 3 · .NET 8 minimal API · SQL Server | video |

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
