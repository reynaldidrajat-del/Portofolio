# Reynaldi Drajat — Visual Portfolio

Personal portfolio website for **Reynaldi Drajat Ageng Perwira** — Assistant Manager & Business Analyst.

Built with **Next.js 16** (App Router), TypeScript, and Tailwind CSS v4.

## Features

- 🎨 **Editorial design** — Fraunces (serif display) + Inter (body), light theme with colorful per-project accents
- 📸 **Image sliders everywhere** — hero slider + per-project carousels (scroll-snap, swipe, keyboard, dots, autoplay with pause on hover/focus)
- 🌐 **Bilingual EN/ID** — full content toggle, persisted in localStorage
- ⚡ **Scroll-reveal animations** — IntersectionObserver-based, respects `prefers-reduced-motion`
- ♿ **Accessible** — semantic HTML, keyboard navigable, no horizontal overflow

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing Content

All text content lives in [`src/lib/data.ts`](src/lib/data.ts) — profile, projects, experience, and section intros, each with EN/ID pairs.

### Replacing placeholder images

Sliders currently use placeholder photos from picsum.photos. To use your real system screenshots:

1. Put your images in `public/screenshots/`
2. In `src/lib/data.ts`, change each project's `images` entries, e.g.:

```ts
images: ["/screenshots/lms-1.png", "/screenshots/lms-2.png"]
```

### Replacing the CV

Replace `public/Reynaldi-Drajat-CV.pdf` with your real CV (keep the same filename).

## Deploy

Works on any Node host. For Vercel: connect the repo at [vercel.com/new](https://vercel.com/new). For static export (GitHub Pages), add `output: "export"` to `next.config.ts`.
