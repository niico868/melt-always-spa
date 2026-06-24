# Melt Aways — Motion & Micro-Interaction System

Layer an elegant, restrained motion system on top of the existing site without rebuilding any pages, routes, or content. All motion respects `prefers-reduced-motion` and is tuned for calm luxury — soft fades, gentle upward reveals, subtle floats, no bouncing/spinning.

## 1. Foundations

- Add `framer-motion` (already common in stack; install if missing).
- Create `src/lib/motion.ts` with shared variants/easings:
  - `easeLux = [0.22, 1, 0.36, 1]` (soft cinematic out)
  - `fadeUp`, `fadeIn`, `staggerParent`, `imageReveal` (scale 0.97 → 1 + fade), `cardHover`.
  - Durations: 0.5–0.9s reveals, 0.2–0.3s hovers.
- Extend `src/styles.css`:
  - Keyframes: `float-y` (±6px), `bloom-drift` (slow gradient blob), `shimmer-underline`.
  - Utilities: `.reveal`, `.reveal-soft`, `.float-slow`, `.lift-on-hover`, `.btn-lux`, `.nav-underline`, `.bg-bloom`.
  - Global: smooth scroll, `@media (prefers-reduced-motion: reduce)` disables transforms/keyframes.

## 2. Reusable Motion Components (`src/components/motion/`)

- `Reveal.tsx` — wraps children, fades + 12px upward on viewport enter (once, 15% threshold).
- `RevealText.tsx` — splits heading into lines/words for staggered line-by-line reveal.
- `Stagger.tsx` — parent with configurable child delay (default 80ms).
- `FloatImage.tsx` — wraps an `<img>` with gentle Y float + optional scroll parallax (`useScroll` + `useTransform`, max ±20px).
- `CountUp.tsx` — animates numbers when in view (for stats like "500+").
- `HoverCard.tsx` — `lift-on-hover` wrapper (translateY -4px, shadow grow, scale 1.01).

These are pure presentational wrappers — no content changes.

## 3. Hero (src/routes/index.tsx)

- Header fades in on mount (opacity 0→1, 400ms).
- Hero headline: `RevealText` line-by-line, 90ms stagger.
- Paragraph: `Reveal` delay 350ms.
- CTA buttons: `Stagger` delay 600ms, 80ms between.
- Hero image cluster: `imageReveal` (scale 0.97→1, opacity 0→1, 900ms) + `FloatImage` for subtle drift.
- Background: add `.bg-bloom` — soft blush radial gradient that slowly drifts (20s loop).

## 4. Section Reveals

Wrap each homepage section block in `<Reveal>` / `<Stagger>`:
- Real Results, Method, Treatment Finder, Trust, Who We Help, Featured Treatments, Reviews, Visiting, About, Journal, Final CTA.
- Headings use `RevealText`; supporting copy delayed 150ms; cards staggered 80ms.

## 5. Results & Featured Story

- B/A cards: `Stagger` with `HoverCard`; image subtly zooms (scale 1→1.03) on hover; slider handle gets soft glow (`box-shadow` on focus/hover).
- Featured client story: sequenced reveal — image (0ms) → story (200ms) → details (400ms) → B/A (600ms).

## 6. Consultation & Progress Sections

- Apply layered/offset depth: small rotations (`-2deg`, `1.5deg`) + translate offsets on stacked imagery via Tailwind classes.
- Each layer reveals from a different direction (left/right/up) using variant presets.
- Progress reports/dashboards float gently (`float-slow`) with shadow depth.

## 7. Cards, Buttons, Nav

- Cards: `.lift-on-hover` (translateY -4px, shadow lg→xl, 250ms ease-out).
- Buttons: extend `button.tsx` `default`/`premium` variants — hover lift + brighter blush gradient + soft glow (`shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.35)]`). "Book Consultation" gets `btn-lux` with stronger glow.
- Nav links (`Header.tsx`): `.nav-underline` — center-out underline grow (200ms), color softens on hover.

## 8. Scroll & Background Atmosphere

- `scroll-behavior: smooth` on `<html>`.
- Add 1–2 fixed, very low-opacity blush blooms behind hero & CTA sections (pointer-events-none, `float-slow` 18s).
- Section transitions: soft top/bottom gradient fades between alternating bg colors.

## 9. Luxury Details

- `CountUp` on stat numbers.
- Image captions fade in on hover (group-hover opacity).
- B/A labels slide in on reveal.
- Progress bars (where present) fill on view.

## 10. Accessibility & Performance

- Global `prefers-reduced-motion` rule disables transforms, parallax, floats, and replaces reveals with instant opacity.
- All `Reveal` components use `viewport={{ once: true, amount: 0.2 }}` to avoid re-trigger jank.
- Parallax limited to transform/opacity only (GPU); no layout thrash.
- Mobile: reduce float amplitude and disable parallax under 768px via `useMediaQuery`.

## Files Touched

- New: `src/lib/motion.ts`, `src/components/motion/{Reveal,RevealText,Stagger,FloatImage,CountUp,HoverCard}.tsx`
- Edited: `src/styles.css`, `src/routes/__root.tsx` (smooth scroll + bloom layer), `src/routes/index.tsx` (wrap sections), `src/components/Header.tsx` (nav underline + fade-in), `src/components/ui/button.tsx` (lux hover variant).

## Out of Scope

- No copy, routing, data, or backend changes.
- Other routes (services, packages, gallery, etc.) get only the global utilities (smooth scroll, button/card/nav hover, reduced-motion) — no per-section reveal wiring this pass. Can be extended later.
