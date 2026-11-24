# Yassine Sboui — Portfolio

My personal portfolio: ten products, each with a demo film recorded from the running app, a case
study per project, and an archive of everything else. Hand-written HTML, CSS and plain
JavaScript — no framework, nothing to build in the browser.

Live: <https://yassinesboui.github.io/Portfolio/>

## Highlights

- A blueprint identity: a prussian-night plate, drafting-blue line, one highlighter yellow for
  whatever is active, wide Archivo for titles and IBM Plex for reading; a cool "whiteprint" light theme
- The hero draws the real request path of Elise.Studio — the tenant checked four times — as a
  blueprint, beside the name as the output of `whoami`
- Four selected projects in a carousel; all ten in an archive with category filters and a search
  that lives in the URL (`projects.html?cat=ai&q=vue`)
- A case study per project: problem, an interactive architecture diagram, decisions, stack,
  contribution, screens and results — every figure checked against the source
- An engineering pipeline, eight defended Decisions, a stack constellation linking each technology
  to the projects that ship it, and a commit-activity chart built from the GitHub API
- Films are `preload="none"`, one decodes at a time, and a film you pause stays paused
- Keyboard-operable throughout (ARIA tabs, carousel, diagram), `prefers-reduced-motion` respected,
  and every enhancement degrades to plain content without JavaScript

## Featured projects

| Project | Stack | Demo | Source |
| --- | --- | --- | --- |
| [Tachkilti](https://yassinesboui.github.io/Portfolio/work/tachkilti.html) — Football & Padel App | Nuxt 4 · Vue 3 · TypeScript · Drizzle ORM | film | private |
| [Elise.Studio](https://yassinesboui.github.io/Portfolio/work/elise-studio.html) — Multi-Tenant Platform | .NET 10 · Vue 3 · PostgreSQL RLS · YARP | film | private |
| [NeoForm](https://yassinesboui.github.io/Portfolio/work/neoform.html) — Low-Code Platform | ASP.NET Core · PostgreSQL · EF Core · Vue 3 | film | private |
| [NeoLibrary](https://yassinesboui.github.io/Portfolio/work/neolibrary.html) — Design System | Vue 3 · TypeScript · PrimeVue 4 · Tailwind CSS | film | private |
| [Talent Bridge](https://yassinesboui.github.io/Portfolio/work/talent-bridge.html) — Matching Engine | Python · FastAPI · PyTorch · sentence-transformers | film | [GitHub](https://github.com/YassineSboui/Talent-Bridge) |
| [TripMate](https://yassinesboui.github.io/Portfolio/work/tripmate.html) — Travel Planner PWA | Next.js 16 · React 19 · TypeScript · MongoDB | film | private |
| [Clinic AI](https://yassinesboui.github.io/Portfolio/work/clinic-ai.html) — WhatsApp Assistant | Node.js 22 · Express · better-sqlite3 · WhatsApp Cloud API | film | private |
| [Auto-École](https://yassinesboui.github.io/Portfolio/work/auto-ecole.html) — Driving-School Platform | Flutter · Dart · Spring Boot 4.1 · Java 17 | film | private |
| [MRAYAQ](https://yassinesboui.github.io/Portfolio/work/mrayaq.html) — Menswear Brand Site | Vue 3 · TypeScript · .NET 8 · Minimal API | film | [GitHub](https://github.com/YassineSboui/Mrayaq-Commerce-Platform) |
| [Symptom Triage Console](https://yassinesboui.github.io/Portfolio/work/medical-nlp.html) — Medical NLP | Python · FastAPI · scikit-learn · Streamlit | film | [GitHub](https://github.com/YassineSboui/Medical-Prescription-NLP-System) |

## Structure

```text
index.html              # home: hero, selected work, pipeline, decisions, stack, journey, contact
projects.html           # the archive: all ten, filters, search, earlier work
work/<project>.html     # one case study per project
404.html                # self-contained, so it renders even when a stylesheet is what went missing
assets/css/styles.css   # the whole design system
assets/js/main.js       # shared: theme, nav, reveals, the film lifecycle
assets/js/home.js       # hero figure, carousel, pipeline, constellation
assets/js/archive.js    # filters and search
assets/js/case.js       # architecture diagrams, "on this page"
assets/video/           # demo films (web encodes) and posters
assets/img/work/        # archive thumbnails, film stills, phone screens
```

The pages are generated from verified project data; they are not edited by hand.

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
