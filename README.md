# Yassine Sboui — Portfolio

My personal portfolio website. A fast, dependency-free single-page site
(hand-written HTML, CSS, and vanilla JS) — no framework runtime, no build step.

Live: <https://yassinesboui.github.io/Portfolio/>

## Highlights

- No framework, no build step — one HTML file, one stylesheet, one script
- Terminal-style hero: the introduction is typed out as shell commands
- Seven demo videos recorded from the running applications, one per project
- A **Decisions** section: per project, the constraint, what I rejected, what I did,
  and what it cost
- Dark / light theme with system preference + persistence
- Scroll-reveal animations that respect `prefers-reduced-motion`, and that are opt-in —
  with JavaScript off the page still renders in full
- Recomposed rather than shrunk on touch widths, with 44px minimum tap targets
- Videos are `preload="none"`, one loads at a time, and a video you pause stays paused
  when you scroll
- Prints: the reveal gate is neutralised for paper and PDF export

## Featured projects

| Project | Stack | Demo | Source |
| --- | --- | --- | --- |
| Elise.Studio — nine-module multi-tenant platform (NeoLedge) | .NET 10 · Vue 3 · PostgreSQL RLS · YARP | video | private |
| NeoForm — low-code form, table & rules platform (NeoLedge) | ASP.NET Core · PostgreSQL · EF Core · Vue 3 | video | private |
| Symptom Triage Console — attributed predictions, published transfer recall | Python · FastAPI · scikit-learn · Streamlit | video | [GitHub](https://github.com/YassineSboui/NLP-Based-Medical-Prescription-Management-System) |
| NeoLibrary — 37-component Vue 3 design system (NeoLedge) | Vue 3 · TypeScript · PrimeVue 4 · Tailwind CSS | video | private |
| Talent Bridge — CV scoring & job matching platform | Python · FastAPI · PyTorch · sentence-transformers | video | [GitHub](https://github.com/YassineSboui/Talent-Bridge) |
| Clinic AI — WhatsApp assistant & live command center | Node.js 22 · Express · better-sqlite3 · WhatsApp Cloud API | video | private |
| MRAYAQ — menswear brand site & back office | Vue 3 · TypeScript · .NET 8 · Minimal API | video | [GitHub](https://github.com/YassineSboui/MRAYAQ) |

## Structure

```text
index.html              # markup & content
assets/css/styles.css   # theming, layout, animations
assets/js/main.js       # theme toggle, nav, scroll reveal
assets/img/             # optimized photo & favicons
assets/video/           # project demo reels + poster frames
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
