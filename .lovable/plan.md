## Problem
When a new admin clicks their emailed invite link, Supabase redirects them to the site root (`/`) with a recovery/invite token in the URL hash. There's no page to handle it, so nothing happens and they land on the homepage still signed out.

## Fix

### 1. New public route: `/set-password`
Create `src/routes/set-password.tsx` (`ssr: false`, `noindex`) that:
- On mount, reads the URL hash (`#access_token=...&refresh_token=...&type=invite|recovery`) and calls `supabase.auth.setSession({ access_token, refresh_token })` so the user is authenticated for the update call.
- Also handles the newer `?code=...` PKCE flow via `supabase.auth.exchangeCodeForSession(code)` as a fallback.
- Shows a branded form: full name (prefilled from session user metadata if present) + new password + confirm password (min 8 chars, match check).
- On submit: `supabase.auth.updateUser({ password, data: { full_name } })`, then upserts the name into `profiles`.
- On success, redirects to `/dashboard`.
- Handles errors (expired/used link) with a clear message and a "Request a new invite" note.

### 2. Redirect invite/recovery links to `/set-password`
Update `src/lib/admin-users.functions.ts` `inviteAccount` to pass `redirectTo: \`${SITE_URL}/set-password\`` in `inviteUserByEmail`. `SITE_URL` comes from `process.env.SITE_URL` with fallback to the published URL. Same for any future password-reset call.

### 3. Root route hash handoff (safety net)
In `src/routes/__root.tsx` `RootComponent`, add a small `useEffect` that if `window.location.hash` contains `type=invite` or `type=recovery` and pathname is `/`, replace the URL with `/set-password<hash>` so old invite emails that still point at `/` still work.

### 4. Supabase Auth URL config
Add `/set-password` to the allowed redirect URLs in Supabase Auth settings — done via the auth configuration; the invite `redirectTo` must be on the allow-list.

## User instructions (what to tell the owner)
1. Delete/ignore the previous invite email.
2. From the dashboard's Accounts page, click "Invite" again for `meltawaystt@gmail.com` and `smugglersparadisehq@gmail.com`. The new email's button will now land on `/set-password`.
3. Enter a password (min 8 chars) and confirm — you'll be signed in and taken to the dashboard.
4. Future sign-ins use email + that password at `/auth`.

## Files
- add `src/routes/set-password.tsx`
- edit `src/lib/admin-users.functions.ts` (add `redirectTo`)
- edit `src/routes/__root.tsx` (hash handoff)
- Supabase auth redirect allow-list update
