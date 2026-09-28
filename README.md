# Naman Dadhich — Portfolio

Personal portfolio built with Next.js 15, React Three Fiber and Framer Motion.

## Highlights

- Fixed WebGL scene: a shader-displaced iridescent form that glides between per-section poses, reacts to cursor and scroll velocity, and lowers geometry detail on phones.
- Lenis smooth scrolling, masked text reveals, scroll-linked highlights, sticky stacking project cards and a scroll-pinned hackathon gallery.
- Responsive from 320px phones to wide desktops, with `prefers-reduced-motion` respected throughout.
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
