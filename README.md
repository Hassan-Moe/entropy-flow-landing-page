# EntropyFlow — Landing Page

Human-friendly documentation for the EntropyFlow landing page project.

This README covers project purpose, tech stack, repository structure, how to run locally, key components, styling/theming, deployment and common troubleshooting (including favicon caching and the global click-spark overlay).

---

## Project Overview

EntropyFlow is a small Next.js landing site that demonstrates a timeline-based UI and interactive visual elements. It includes a reusable `ClickSpark` canvas effect (click-based sparks), a responsive `HeaderNav` with blur-on-scroll and mobile menu, a `HeroSection` with an animated timeline, and a themed footer.

This repository contains the UI and frontend scaffolding for the site — suitable for local development, experimentation, and deploying to hosts like Vercel.

## Tech Stack

- Next.js (app router)
- React 19
- TypeScript
- Tailwind CSS (v4 config present)
- React Icons
- Zustand (store present though not heavily used)
- Small helper libs: clsx, gsap (present), etc.

## Quickstart — run locally

Prerequisites: Node.js (16+ or as required by your environment), Yarn or npm.

Install dependencies:

```bash
yarn
# or
npm install
```

Run dev server:

```bash
yarn dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production and run:

```bash
yarn build
yarn start
```

Lint (if set up):

```bash
yarn lint
```

## Project structure (important files)

Top-level (relevant):

- `src/app/` — Next.js app router files
  - `layout.tsx` — root layout where global `Layout` is wrapped and global favicon metadata is defined
  - `globals.css` — global styles and custom CSS keyframes
  - `favicon.ico` — app-scoped favicon (Next prefers `src/app/favicon.ico` when present)
- `public/` — static assets accessible at `/` (also contains `favicon.ico`)
- `src/base-components/` — site-level reusable components
  - `layout/Layout.tsx` — wraps pages and includes global `ClickSpark` overlay
  - `click-spark/ClickSpark.tsx` — canvas-based spark effect component (clicks generate sparks)
  - `navigations/header-nav/HeaderNav.tsx` — responsive header with blur-on-scroll and hamburger menu
  - `navigations/footer-nav/FooterNav.tsx` — themed footer with links and social icons
- `src/components/hero-section/HeroSection.tsx` — hero section with timeline visualization
- `src/components/button/Button.tsx` — button component used across the site

## Key components and how they work

### ClickSpark (`src/base-components/click-spark/ClickSpark.tsx`)

- Purpose: Draws ephemeral sparks on a canvas at click coordinates. Used to add a subtle interactive flourish across the site.
- API props (defaults shown in code):
  - `sparkColor` (string) — color used for spark strokes
  - `sparkSize` (number) — pixel size for the spark line length
  - `sparkRadius` (number) — max travel radius
  - `sparkCount` (number) — number of sparks emitted per click
  - `duration` (ms) — life time of sparks
  - `extraScale` (number) — multiplier for spread
  - `className` / `style` — forwarded to wrapper element
- Implementation notes:
  - Component creates a canvas sized to its parent DOM node.
  - Click events push spark objects (angle, startTime, position) to an array and animation frame draws them over time.
  - The canvas uses `pointer-events: none` so it doesn't capture mouse interactions. When used globally, make sure wrapper also uses `pointer-events: none` so it doesn't block page interactions (see `Layout.tsx`).

### Layout (`src/base-components/layout/Layout.tsx`)

- Wraps the page. The project mounts `ClickSpark` at app root so sparks appear across the site.
- Important: `ClickSpark` wrapper style must not block pointer events (set `pointerEvents: 'none'`) — otherwise scrolling or clicking in the page will be blocked.

### HeaderNav (`src/base-components/navigations/header-nav/HeaderNav.tsx`)

- Responsive header with:
  - Blur and semi-transparent background when page is scrolled
  - Animated pulsing glow when at top (CSS keyframes in `globals.css`)
  - Mobile hamburger menu (animated dropdown matching the same blur/background theme)
- Customization: adjust blur, background color, shadow animation in `globals.css` or Tailwind classes.

### FooterNav

- A themed footer that matches header colors and style; contains site links, socials, and copyright.

### HeroSection

- The hero contains an SVG timeline visualization with nodes, glow effects, and entrance animations. It previously had `min-h-screen` which made it occupy the full viewport and hide other content — that was removed to allow normal scrolling.

## Styling and theming

- `src/app/globals.css` contains CSS variables and global keyframes used across the site.
- Tailwind classes are used extensively. You can find global variables at the top of `globals.css` (colors, fonts).
- Font loading (Google fonts) is done in `src/app/layout.tsx` via the Next `font/google` helper (variables are set in layout to use in CSS classes).

## Favicon notes & caching

- Next.js (app router) prefers `src/app/favicon.ico` if present. If you put a favicon only in `public/favicon.ico`, Next may still serve `src/app/favicon.ico` when it exists.
- If you change the favicon and still see an old icon (e.g., provider or Vercel icon), do a hard refresh and clear site data;
  - Chrome macOS: Cmd+Shift+R, or open DevTools → Network → "Disable cache" and reload.
  - Directly test the asset: http://localhost:3000/favicon.ico to ensure the dev server serves the expected file.
- If you want the `public/favicon.ico` to be the single source of truth, remove `src/app/favicon.ico` (or overwrite it) to avoid confusion.

## Troubleshooting & tips

- If page interaction or scrolling is blocked:

  - Ensure any full-page overlays (like a wrapper around `ClickSpark`) use `pointer-events: none` unless they intentionally intercept clicks.
  - In this project `ClickSpark` canvas uses `pointer-events: none`; make sure the wrapper `style` also uses `pointerEvents: 'none'` when used as a fixed overlay in `Layout`.

- Favicon not updating:
  - Clear browser cache or use DevTools to disable cache and reload.
  - Ensure only one favicon file exists at `src/app/favicon.ico` or `public/favicon.ico` to avoid ambiguity.

## Deployment notes

- Deploying to Vercel is straightforward — this is a standard Next.js app. Note that Vercel preview deployments sometimes show provider preview icons; check the deployed files if you see unexpected branding.

## Linting / types

- TypeScript is used; some CSS imports may show a TypeScript warning about missing module declarations for CSS imports. If you see "Cannot find module or type declarations for side-effect import of './globals.css'", add a d.ts declaration file such as `src/types/css.d.ts` containing:

```ts
declare module "*.css";
```

or a more specific module declaration for Tailwind if necessary.

## Contributing

- Keep styling changes consistent with the theme variables in `globals.css`.
- Add new shared UI bits to `src/base-components/` and page-specific components to `src/components/`.

## Where to start editing

- Update hero content: `src/components/hero-section/HeroSection.tsx`.
- Adjust header / menu: `src/base-components/navigations/header-nav/HeaderNav.tsx`.
- Modify click interaction: `src/base-components/click-spark/ClickSpark.tsx`.

## Additional improvements you might add

- Add unit/visual tests.
- Introduce Storybook for component development.
- Add different favicon sizes and `link rel="apple-touch-icon"` entries for iOS.
- Add a small README for each component folder describing props & behavior.

---

If you want, I can also:

- Remove duplicate `src/app/favicon.ico` (cleaner), or add multiple icon sizes and add their link tags in `layout.tsx`.
- Generate per-component READMEs describing props and examples.

Feel free to ask me to expand any section or to generate CONTRIBUTING.md or a quick developer-run checklist.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

full dummy ai README file for entropy-flow-landing-page project -- for testing purposes
