# Background music with a sound toggle

The client's ~49s MP3 becomes an ambient, looping soundtrack for the public site. Because every modern browser blocks autoplaying audio with sound, playback must start from a user gesture — so the core UX is a small, always-visible **sound toggle** the visitor taps once to turn on.

## Recommended placement

A circular **floating icon button**, fixed to the viewport, matching the existing `WhatsAppFab` styling so the two feel like a pair:

- Desktop: bottom-left corner (mirrors WhatsApp on the right).
- Mobile: same bottom-left, above the safe-area inset.
- Icon: `Volume2` when playing, `VolumeX` when muted (lucide-react, already used).
- On first load: shows a subtle one-time pulse ring + tiny tooltip "Play ambience" so users notice it. Tooltip auto-dismisses after ~4s or on first interaction.
- Tap toggles play/pause. State persists in `localStorage` so returning visitors keep their preference (default = off, per browser policy).
- Only rendered on public routes (not `/dashboard`, not `/auth`, not `/login`) — same conditional pattern already used for `Header`/`Footer` in `__root.tsx`.

Rejected alternatives (happy to switch if you prefer):
- Auto-play muted then unmute on scroll — still requires a gesture, feels broken.
- Full-screen "Enter with sound / without sound" splash — heavy for a spa site, hurts SEO/LCP.
- Putting the toggle inside the header — gets lost, doesn't follow on scroll.

## Technical notes

1. Upload the MP3 as a Lovable CDN asset (`src/assets/ambience.mp3.asset.json`) — keeps the repo light and gets cached delivery.
2. New component `src/components/AmbientAudio.tsx`:
   - Single `<audio loop preload="none">` with `src` from the asset pointer.
   - `useState` for `playing`; `useEffect` reads `localStorage` key `meltaways:ambience`.
   - Handles browser autoplay rejection gracefully (catches the `play()` promise).
   - Fades volume in/out over ~400ms for a soft start/stop instead of a hard cut.
3. Mount it in `src/routes/__root.tsx` inside the same `!isDashboard` branch that renders `WhatsAppFab`.
4. Position: `fixed bottom-6 left-6 z-40`, rounded-full, `bg-background/80 backdrop-blur` with the brand `--primary` accent on the icon, subtle shadow — visually quieter than the WhatsApp button so it doesn't compete.
5. Accessibility: `aria-label="Toggle background music"`, `aria-pressed={playing}`, respects `prefers-reduced-motion` (skips the pulse animation).

## Files touched

- **New**: `src/assets/ambience.mp3.asset.json` (CDN pointer from the uploaded MP3)
- **New**: `src/components/AmbientAudio.tsx`
- **Edit**: `src/routes/__root.tsx` (mount alongside `WhatsAppFab`)

No backend, no schema, no route changes.
