# Naman Dadhich — Portfolio

Personal portfolio built with Next.js 15, React Three Fiber and Framer Motion.

## Highlights

- **Morphing particle universe**: 18k GPU particles (9k on phones) spell the name in the hero, then morph per section into a globe, double helix, wave field, knot, galaxy and portal. They swirl apart mid-transition, scatter away from the cursor or a tap, and churn with scroll speed.
- **Cinematic intro**: a counter-and-curtain preloader, once per session, that hands off to the particles assembling.
- **Interaction layer**: custom cursor with contextual labels, scramble-text hovers, a marquee that skews with scroll velocity, magnetic buttons, 3D-tilt media, sticky stacking project cards and a scroll-pinned hackathon gallery.
- **Smooth and accessible**: Lenis smooth scrolling, readable HTML text over the WebGL, responsive from 320px phones to wide desktops, and `prefers-reduced-motion` respected throughout.
- Contact form backed by Resend (`/api/contact`).

## Development

```bash
npm install
npm run dev
```

Set `RESEND_API_KEY` in `.env` for the contact form.

## Editing content

All copy lives in `src/content/data.ts`: profile, experience, projects, skills and events. Section components read from it, so content changes don't touch layout code.

## Structure

```
src/
  app/                 routes (home, /resume, /api/contact)
  components/
    layout/            nav, footer, smooth scroll
    sections/          hero, about, experience, work, skills, events, contact
    three/             WebGL scene and shaders
    ui/                motion primitives and lazy project media
  content/data.ts      site content
```
