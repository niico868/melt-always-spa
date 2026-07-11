
## 1. Rebrand — Melt Aways → Melt Elite Aesthetics (MEA)

- Upload the MEA logo from `user-uploads://168165ff-4cec-44fb-9c87-aba95f57d506.png` to Lovable Assets as `src/assets/mea-logo.png.asset.json`.
- Add a second export `SITE.logoMEA` in `src/lib/site.ts` pointing to the new asset. Keep `SITE.logo` (Melt Aways) unchanged so the footer can reference both.
- Update `src/components/Logo.tsx` to render the MEA logo by default (used by `Header`, mobile menu, dashboard sidebar, auth pages, favicon-related refs).
- Update `src/routes/__root.tsx` head metadata: swap title/description/og to "Melt Elite Aesthetics (MEA) — a subsidiary of Melt Aways Spa". Update favicon to the MEA mark (upload PNG to `public/favicon.png`, delete `public/favicon.ico`).
- Rework `src/components/Footer.tsx` — show both logos side-by-side with the phrase:
  `MEA [logo] — a subsidiary of — MAS [logo]`
  Keep the tagline and existing contact/nav columns.
- Leave all other business copy ("Melt Aways" name in body text) untouched for this pass — logo swap only, per your instructions.

## 2. Homepage image performance

- Add `fetchpriority="high"` + `<link rel="preload" as="image">` in the leaf `head()` of `src/routes/index.tsx` for the hero image (LCP).
- Below-the-fold images (`VisitingTrinidad`, `RealResults`, treatment cards, B&A gallery): keep `loading="lazy"` but add `decoding="async"` and switch to `<img srcset>` with the vite-imagetools plugin to serve AVIF/WebP variants. This shrinks each image ~60–80%.
- Add `IntersectionObserver`-based **prefetching** ~600px before the section enters view (a tiny `useEagerImage` hook) so images are decoded before they're visible.
- Result: hero LCP drops, and scroll-in images appear instantly instead of popping.

## 3. Fix Comic Sans → script font flash (FOUT)

Root cause: `Great Vibes` is declared with `font-display: swap`, so the browser paints fallback (Comic Sans on some systems) first, then swaps.

Fix:
- Change `font-display: swap` → `font-display: block` for `Great Vibes` in `src/styles.css` (hides text briefly instead of flashing wrong font — appropriate for decorative headings).
- Add `<link rel="preload" as="font" type="font/ttf" href="/fonts/GreatVibes.ttf" crossorigin>` in `__root.tsx` head so it loads with the HTML, not after CSS parse.
- Do the same for Inter and swap Cormorant Garamond / Playfair from remote Google CSS (render-blocking) to self-hosted `@font-face` (already the pattern used for Inter). This removes the second network round-trip and eliminates the flash.

## 4. Auth — remove TOTP, add email invite links

- Delete the `Security` page (`src/routes/dashboard.security.tsx`) and its sidebar entry.
- Remove `verifyOtp`/MFA challenge code paths from `src/routes/auth.tsx`.
- Add a server function `sendAdminInvite(email)` in `src/lib/admin-users.functions.ts` that calls `supabaseAdmin.auth.admin.inviteUserByEmail(email, { redirectTo: '<origin>/auth?type=invite' })`, then upserts `user_roles(role='admin')` when the user id becomes available (webhook-style via a follow-up `handle_new_user` trigger update, or via a "claim role" step on first sign-in).
- Add a small "Invite Admin" panel on `dashboard.employees.tsx` (admin-only, gated by `has_role(admin)`) with an email input + Send Invite button.
- Seed the two owner emails (`meltawaystt@gmail.com`, `smugglersparadisehq@gmail.com`) with `role='admin'` in a migration so that when they accept the invite and sign in, they land straight into the admin dashboard.
- Supabase sends the invite email with a magic link → they click → set password → signed in as admin. No 6-digit code involved.

## 5. Treatment photo swaps

Upload the three attached images via `lovable-assets`:
- `user-uploads://age.png` → `src/assets/treatments/Anti_Aging.png.asset.json`
- `user-uploads://breast_fill.png` → `src/assets/treatments/Breast_Filler.png.asset.json`
- `user-uploads://lymph.png` → `src/assets/treatments/Lymphatic_Drainage.png.asset.json`

Update `SERVICE_IMAGES` in `src/routes/services.tsx` (and any references in `src/routes/index.tsx`) to point the `anti-aging`, `breast-filler`, and `lymphatic-drainage` slugs at the new assets.

## 6. Remove Wellness service

- Drop the `wellness` entry from `SERVICES` in `src/lib/site.ts`.
- Remove `wellness` from `SERVICE_IMAGES` and unused import in `src/routes/services.tsx`.
- Remove the "Wellness Reset" package (or replace "Wellness" mentions in remaining packages with the closest existing service, e.g. "Lymphatic Drainage").
- Remove wellness from the treatment-finder options in `src/lib/treatment-finder.ts` and any homepage feature strip references.

## Technical notes (implementation order)

1. Assets first (MEA logo, 3 treatment photos, favicon PNG).
2. `site.ts` + `Logo.tsx` + `Footer.tsx` + `__root.tsx` (rebrand + font preload + meta).
3. `styles.css` font-display fix.
4. Migration: seed 2 admin emails + drop wellness-related seed data if any.
5. Server fn + Employees page invite panel; delete Security route + sidebar link + auth MFA branches.
6. `services.tsx` + `index.tsx` image swaps + wellness removal.
7. Image perf: preload hero, vite-imagetools variants, `decoding="async"` on non-hero `<img>`s.

Typecheck after each block runs automatically.
