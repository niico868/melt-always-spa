## Goal

Remove the 5 selected images from the homepage and rebalance the affected sections so they still look intentional and premium.

## Images to remove

1. Hero portrait (`homeModel1`)
2. Hero floating petals overlay
3. Seasonal campaign model (`homeModel2`)
4. Visiting Trinidad model (`homeModel3`)
5. Split feature reception room (`reception`)

## Changes to `src/routes/index.tsx`

1. **Hero section**: Drop the right-side image column (portrait + floating petals). Convert the hero to a single centered column: headline, supporting paragraph, and CTA buttons centered with comfortable max width. Keep the soft blush background.

2. **Seasonal campaign block**: Remove the model image side. Re-center the campaign copy (eyebrow, heading, body, CTA) on the blush card with balanced vertical padding so it reads as a focused promo panel rather than a half-empty grid.

3. **Visiting Trinidad section**: Remove the model image side. Keep the copy column, center it, and add a subtle bordered/blush card treatment so the section still has visual weight.

4. **Split feature (reception) section**: Remove the image side. Either:
   - Collapse to a single centered "our space" text block with a quiet divider above and below, OR
   - Remove the section entirely if it reads as redundant once the image is gone.
   Default: keep the copy, centered, with a thin top/bottom rule.

5. **Imports cleanup**: Remove now-unused imports for `homeModel1`, `homeModel2`, `homeModel3`, the petals asset, and `reception`.

## Out of scope

- Gallery, services, reviews, trust strip, and final CTA sections stay as they are.
- No copy rewrites beyond what's needed to make a centered single-column layout read well.
- No changes to other routes or shared components.
