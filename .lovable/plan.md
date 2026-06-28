## Scope

A homepage + site-wide pass covering: typography, motion system, navigation layout, hero rebuild, reviews data, About copy, Method visuals, Who We Help linking, removal of two sections, and a new Treatment Finder questionnaire page. No backend/data layer changes — all client-side.

---

## 1. Site-wide typography rule

Make every cursive (`font-script` / Great Vibes) heading at least the same size as the headline directly beneath it (target ~+4–8px above the paired serif headline). Implement once via two utility classes in `src/styles.css`:

- `.script-hero` → `font-script`, `clamp(3.25rem, 6vw, 5rem)`, tight line-height, gold tint.
- `.script-eyebrow` → `font-script`, `clamp(2rem, 3.5vw, 2.75rem)` for smaller pairings.

Replace every `font-script text-2xl/3xl/4xl` instance on `index.tsx`, `visiting`, `about` sections, `FinalCta`, `VisitingTrinidad`, etc., with these classes.

---

## 2. Site-wide motion upgrade (more pronounced)

Extend `src/lib/motion.ts` with new directional variants and raise the magnitudes:

- `fadeUp` distance 16 → **40px**, duration 0.8 → **1.0s**, blur 6 → **10px**
- New `fadeLeft` / `fadeRight` (X ±60px, blur 8px, 1.0s)
- New `slideInScale` (translateY 48px + scale 0.96 → 1, 1.1s)
- `viewportOnce.amount` 0.2 → **0.25**

Add `Reveal` `direction` prop (`up | left | right | scale`) that picks the right variant. Sprinkle alternating directions across homepage sections so cards/text slide in from sides while images rise from below. Respect `prefers-reduced-motion` (already wired).

Micro-interactions to introduce (small, premium, no bounce):

- Buttons: subtle inner shimmer sweep on hover (1.2s gradient pass) + existing lift.
- Links: keep `nav-underline`; add a 1px gold dot that fades in to the right of active nav item.
- Cards: cursor-tracked tilt (max 4°) + soft glow that follows pointer.
- Images: 700ms ease zoom-in on hover (already partial — extend to all `<img>` inside `lift-on-hover`).
- Numbers / stats: continue `CountUp`; pulse the icon once when count completes.
- Section eyebrows: thin underline that draws left-to-right on view enter.
- Scroll: a 2px gold scroll-progress bar fixed at the very top of the viewport.
- Form fields (future Treatment Finder): label floats up + bottom-border grows from center on focus.
- WhatsApp FAB: gentle pulse every 8s.

---

## 3. Header / nav restructure

Files: `src/lib/site.ts`, `src/components/Header.tsx`.

- `NAV_LEFT` becomes `[Visiting, Home, Services, Packages]` — Visiting moves to the far left.
- Logo stays centered.
- `NAV_RIGHT` becomes `[Journal, Gallery, Booking]`.
- Visiting link: text "Visiting" stays centered; render flag (🇹🇹 emoji wrapped in a `<span class="ml-1.5">` on wide viewports, or absolutely positioned **above** the word on tighter viewports) — never breaks the inline rhythm with other items. Use CSS container query / `lg:` breakpoint to swap.
- Grid weights tweaked so left/right columns split evenly around the centered logo.

---

## 4. Hero rebuild

Remove the dual image cluster (`homeModel1` main + `homeModel2` floating + caption chips).

Replace with a single **auto carousel** layered behind the hero text:

- Images cycle: `hero-banner2.png` → `hero-banner3.png` → `hero-banner.png`. Generate these three via image-gen and save to `src/assets/hero-banner.jpg`, `hero-banner-2.jpg`, `hero-banner-3.jpg` (premium wellness portraits, soft blush light, consultation/people focus — not machines).
- New component `src/components/HeroCarousel.tsx`: preloads all three, only starts auto-rotation once all are decoded; 7s per slide, 1.6s crossfade using framer-motion `AnimatePresence`, custom cubic-bezier `easeLux` curve.
- Layout: image fills the right ~55% on desktop; on tablet/mobile it sits behind the full text block.
- Gradient overlay sits **on the image**: `linear-gradient(90deg, var(--background) 0% → 35%, transparent 70%)` on desktop, vertical equivalent on mobile, so text always sits on a readable blush wash. Gradient stops animate smoothly when the slide changes (framer-motion on the overlay's `background-image`).
- A second gradient color layer behind the text always tints to match the current image (sampled colors hand-picked per slide: blush, peach, cream).

---

## 5. Stats / proof bar (RealResults)

- "Happy Clients" 500+ → **60+**; raise `CountUp` duration to **5s** for this stat only (new `duration` prop is already supported, just pass `duration={5}`).
- Google Rating: keep "4.9" but render a Google-branded star row (5 ★) and wrap the whole stat in a link to `https://share.google/efNeYdAQwEjKkmsPC` (external, `target="_blank"`, `rel="noopener"`).
- Third stat label: "Trusted Across Trinidad" → **"Trusted Across Trinidad and Tobago"**.

---

## 6. Real Results, Real Confidence — before/after cards

Replace the 4 portrait `ResultCard`s with 4 entries pulled from `BA_IMAGES` in `src/lib/ba.ts` (the same images used on the Before & After gallery page). Keep 4 total on the homepage. Each card shows the B/A image, keep the existing name/treatment/quote pattern but mark these as anonymized client results (initials + treatment + sessions). Card layout stays the same; only the image source changes.

---

## 7. The Melt Aways Method — vine animation + icon swaps

- Icon swaps:
  - Step 1: swap `UserCheck` → `UserCog` (person + checklist feel) and add a small `ClipboardCheck` glyph absolutely positioned top-right of the icon circle.
  - Step 5: swap `Leaf` → `Sprout` (growing plant) from lucide.
- New `src/components/motion/VineGrow.tsx`: an SVG vine drawn via `<path>` with `pathLength` animated by `useScroll` + `useTransform` so it grows as the user scrolls through the steps section. Endpoint blossoms into a full bloom (separate `<g>` that scales + fades in at scroll progress > 0.92).
- On desktop wrap each step card in a `Reveal direction="left|right"` (alternating) for a more pronounced text slide-in tied to scroll. On mobile keep the current upward fade.

---

## 8. Who We Help — compact cards + FAQ links

- Reduce card padding (`p-5 lg:p-6` → `p-4`), font sizes one notch down, swap the giant icon circle for a 6×6 inline icon left of the title.
- Each card becomes a `<Link>` to `/faq#<slug>` with a `clientType` query string. Add anchor IDs in `src/routes/faq.tsx` so each FAQ group renders a `<section id="new-mothers">` etc., with a small content block per audience.

---

## 9. Kind Words — review content + procedure tagging

`src/lib/site.ts` `REVIEWS` replaced with the 7 supplied testimonials. Each entry gets:

- `initials` derived from a randomized first/last initial pattern (e.g. K.B., D.S., A.R., M.J., C.P., N.G., L.W.) — anonymous but consistent.
- `service` chosen from message context: 1 = Body Contouring, 2 = Transformation Journey, 3 = Slimming Injections, 4 = Weight Loss Program, 5 = Visceral Fat & Waist Training, 6 = GLP-1 (Tirzepatide), 7 = Weight Loss Program.

Reviews page (`src/routes/reviews.tsx`): remove the line "Client proof pending. Testimonials will be replaced with verified reviews and screenshots."

Homepage Kind Words section keeps showing 3 cards (first 3) and links to `/reviews` for the full list.

---

## 10. Treatment Finder — new smart form page

- Update homepage `TreatmentFinder` copy to the new text, remove the 4 step-tile column entirely, point CTA "Start Treatment Finder" to `/treatment-finder` (new route).
- New file `src/routes/treatment-finder.tsx`: multi-step questionnaire (one question per screen, progress bar across top, framer-motion slide transitions between steps). Questions:

  1. Full name + email + phone
  2. Primary goal (multi-select: fat reduction, skin tightening, anti-aging, wellness, weight loss, contouring)
  3. Target areas (body diagram or chip multi-select)
  4. Timeline (under 1 month / 1–3 months / 3–6 months / flexible)
  5. Concerns / medical considerations (free text + pregnancy/medication flags)
  6. Preferred consultation date

- Submission saves a `Lead` via existing `saveLead()` helper (already in `site.ts`) with `status: "New Lead"` and a `suggestedPackage` chosen by simple rules in `src/lib/treatment-finder.ts` (goals + timeline → one of the existing `PACKAGES`).
- Confirmation screen explains qualification for a free consultation and offers a WhatsApp shortcut.
- Add SEO `head()` so the page also functions as a marketing landing page.

---

## 11. Removals

- Delete entire `SafetyTrust` section from homepage render + function.
- Delete the 4-step grid inside `TreatmentFinder` (per #10).

---

## 12. Visiting Trinidad & Tobago section

Apply the new `.script-hero` class to its cursive heading so it sits equal-to / slightly larger than the serif headline below. No other content changes.

---

## 13. About Melt Aways — new copy

Replace the `About` section text and rebuild the Mission / Values / Philosophy grid with the user-supplied copy. Render Mission as a single paragraph; Values as a vertical list of 6 short statements with subtle bullet markers; Philosophy as a closing paragraph. Cursive eyebrow swapped to `.script-eyebrow`.

---

## Technical Section (for the developer)

**Files created**
- `src/components/HeroCarousel.tsx`
- `src/components/motion/VineGrow.tsx`
- `src/components/ScrollProgress.tsx`
- `src/routes/treatment-finder.tsx`
- `src/lib/treatment-finder.ts`
- `src/assets/hero-banner.jpg`, `hero-banner-2.jpg`, `hero-banner-3.jpg` (image-gen, premium tier for legibility — actually fast tier is fine since no text)

**Files edited**
- `src/styles.css` — new utilities `.script-hero`, `.script-eyebrow`, shimmer keyframes, scroll-progress styles, focus-line utility.
- `src/lib/motion.ts` — stronger variants, directional variants.
- `src/components/motion/Reveal.tsx` — `direction` prop.
- `src/components/motion/CountUp.tsx` — already supports `duration`, used at 5s.
- `src/components/Header.tsx` — new nav order, flag handling.
- `src/lib/site.ts` — NAV reorder, REVIEWS rewrite.
- `src/routes/__root.tsx` — mount `<ScrollProgress />`.
- `src/routes/index.tsx` — Hero replaced, RealResults stat + B/A swap, Method icons + vine, WhoWeHelp compact + Linkified, ClientReviews data flows through, TreatmentFinder rewritten, SafetyTrust removed, About rewritten, Visiting class swap.
- `src/routes/reviews.tsx` — remove placeholder line.
- `src/routes/faq.tsx` — anchor IDs + per-audience copy.

**Out of scope**
- No backend / Cloud changes.
- No edits to Services, Packages, Gallery, Booking, Account, Admin route logic.
- No changes to global theming tokens (only new utility classes).
- Google review count (currently "120+ reviews") left as-is unless the user shares a number to use.
