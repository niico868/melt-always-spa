## How customers get added

Three entry points, all writing to the same `customers` table:

1. **Public consultation form** (already on site) → creates a `consultations` row. On save, also upsert a `customers` row by phone/email match and link `consultation.customer_id`.
2. **Public booking form** → same pattern, creates `appointments` + links/creates `customers`.
3. **Dashboard "Add customer"** modal on `/dashboard/customers` — manual entry by Krystal/staff (walk-ins, phone bookings).

Dedup rule: match on normalized phone first, then email. No duplicates created if either matches.

## Full customer profile (click a row → detail drawer)

New route `/dashboard/customers/$id` with tabs, backed by expanded schema:

**`customers` table gets new columns**
- `date_of_birth`, `address`, `city`, `preferred_contact` (whatsapp/email/phone)
- `tags` (text[]) — VIP, Sensitive Skin, Package Client, etc.
- `marketing_opt_in` (bool)
- `updated_at`

**New `customer_notes` table** — timestamped notes with author, so history is preserved instead of overwriting the single `notes` field. Old `notes` becomes "pinned note".

**New `customer_treatments` table** — treatment history log
- service performed, date, employee, price, before/after photo URLs, session number, outcome notes
- Auto-created when an `appointments` row flips to status = Completed

**New `customer_files` table** — consent forms, intake questionnaires, photos (Cloud storage bucket).

**Profile tabs shown in drawer:**
- **Overview** — contact, tags, pinned note, lifetime spend, visit count, last visit
- **Treatments** — timeline from `customer_treatments`
- **Appointments** — upcoming + past from `appointments`
- **Consultations** — from `consultations`
- **Sales** — from `sales` with running total
- **Notes** — threaded from `customer_notes`
- **Files** — uploads

## What the site + dashboard are still missing

**Site (public):**
- Booking form doesn't yet write to `appointments` — verify wiring
- Consultation form → confirm it links to `customers`
- Missing: services detail pages, gallery, policies page content, cookie/privacy consent, 404 polish
- No thank-you page after form submissions
- No customer-facing "My bookings" area (deferred until owner decides scope)

**Dashboard:**
- Customer detail drawer (above)
- Appointments page: calendar/day view instead of just a list
- Dashboard home KPIs pulling from empty tables — verify empty states render cleanly
- Accounts page (user management) — still on the roadmap from last turn
- Role-gated UI: hide Add/Edit/Delete buttons for staff/receptionist
- Audit log (who changed what) — nice to have
- Settings page: business hours, holiday closures, booking rules — currently localStorage
- Marketing: still localStorage
- Notifications inbox (in-app alerts) — `alerts` table exists but unused
- Backup/export: CSV export exists per table; no full data export yet

## Technical (for your dev)

- Migration adds columns to `customers` + creates `customer_notes`, `customer_treatments`, `customer_files` with RLS `staff|admin manage`, GRANTs to authenticated + service_role.
- Storage bucket `customer-files` (private) with signed URLs.
- Dedup helper `upsert_customer_by_contact(name, phone, email)` as SQL function called from public forms + admin modal.
- Trigger: on `appointments.status → 'Completed'`, insert into `customer_treatments`.
- New route `/dashboard/customers/$id` using existing `DashboardPage` + tabs. Reuse `DataTable` for each history tab.
- Public consultation/booking forms wired through `createServerFn` (public, rate-limited by phone+day) that calls the dedup function.

## What I need from you before building

1. **Scope for this pass** — do you want (a) full customer profile drawer + all 3 new tables now, or (b) start with just notes + treatments and add files later?
2. **Photos** — should treatment before/after photos be part of v1, or defer (storage bucket adds setup)?
3. **Public forms** — do you want the consultation + booking form dedup wiring done in the same pass, or dashboard-only for now?
4. **Priority order** for the "missing" list — pick your top 3 so I don't sprawl.