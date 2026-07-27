## What I found on the walk-through

The bones of the journey exist (public booking → consultation → appointment → auto-invoice → auto-treatment log → customer profile tabs), but four categories of disconnect make it feel unstitched:

**A. No "Client Status" concept anywhere.** Every module tracks its own object status, but there's nothing that answers "where is this person in their relationship with the clinic?" — the trigger surface for all your planned automations.

**B. Status vocabularies conflict.**
- Appointments enum is `Pending / Confirmed / Completed / Cancelled` — missing `Checked In`, `In Progress`, `No Show`, `Rescheduled`.
- Consultations is edited with two different lists on two pages (`New / Contacted / Booked / Closed` on Consultations vs. `New Lead / Follow-Up Needed / Consultation Booked / Package Offered / Paid / Lost Lead / Not Suitable` on Interests), over the same column.
- No Treatment status object at all — "treatment" today is just a completed appointment row.
- Payment status lives only on the invoice (`Sent / PartiallyPaid / Paid / Void`) — no `Deposit Paid`, `Unpaid`, `Refunded` labels.

**C. Orphaned data feeds.** The `sales` table is read by 3 surfaces (Dashboard "Recent sales", "Top services" chart, Customer profile Sales tab & lifetime-spend stat) but **nothing in the app ever writes to it.** Real money flows through `invoices` + `payments`. Those widgets are structurally always empty.

**D. Missing cross-links.**
- Invoice detail → no link back to source appointment.
- Customer profile → no invoice list, no link into `/dashboard/sales/$id`.
- Dashboard "Recent sales" row → no click-through.
- Consultation without matched customer → no way to create one inline before booking.
- Interests page → no "Create appointment" action (only Consultations page has it).
- Marketing page is 100% localStorage placeholder, no real segmentation.
- Reports "No-show / cancel rate" is a hard-coded 13%.

---

## The plan

### 1. Client Status lifecycle (foundation for automations)
- Add `client_status` enum on `customers`: `lead, registered, consultation_booked, consultation_completed, active_treatment, treatment_plan_completed, maintenance, inactive, archived`.
- Add `client_status_changed_at` and `last_activity_at` columns.
- Auto-transition rules via DB triggers:
  - Public booking form insert → `lead`.
  - `auth.users` insert linked to a customer → `registered`.
  - Appointment insert (kind=consultation) → `consultation_booked`.
  - Appointment status → `Completed` (consultation) → `consultation_completed`.
  - First non-consultation appointment `Confirmed`/`Completed` → `active_treatment`.
  - All planned treatments in a plan `Completed` → `treatment_plan_completed`.
  - Time-based (nightly cron via `pg_cron`): >90 days idle after plan → `maintenance`; >12 months idle → `inactive`.
- Manual override + `archived` transition available in Customer profile.
- Emits a `client_status_changed` row into a new `client_events` table — this is the single event source every future automation subscribes to (no need to wire email today).

### 2. Split & unify object statuses
- **Appointment**: `Pending, Confirmed, Checked In, In Progress, Completed, Cancelled, No Show, Rescheduled`.
- **Consultation**: `Not Started, Booked, Completed, Follow-Up Required, Converted to Treatment`. Single source of truth (`CONSULT_STATUSES`) used by both Consultations page and Interests page — drops the two conflicting vocabularies.
- **New Treatment object**: promote `customer_treatments` (currently auto-log only) to a first-class record with status `Planned, Scheduled, In Progress, Completed, Paused, Discontinued` and an optional `treatment_plan_id` grouping. Auto-log stays but now creates `Completed` rows in a plan when linked.
- **Payment status** exposed on invoice list: derive `Unpaid / Deposit Paid / Partially Paid / Paid / Refunded` from existing `payments` rows (no schema change beyond adding `Refunded` label when net paid ≤ 0 after refund).

### 3. Fix the orphaned `sales` widgets
- Rewrite `useRecentSales`, `useTopServices`, and `useCustomerSales` in `src/lib/dashboard-queries.ts` / `dashboard-tables.ts` to read from `payments` + `invoices` + `invoice_items` (grouping by linked service for Top Services).
- Delete or archive the unused `sales` table after callers migrate. Keeps one revenue source of truth.

### 4. Add the missing cross-links
- **Invoice detail** (`dashboard.sales.$id.tsx`): "Open appointment" and "Open customer" buttons.
- **Customer profile** (`dashboard.customers.$id.tsx`): add **Invoices** tab (real `invoices` filtered by `customer_id`, each row links to `/dashboard/sales/$id`); recompute lifetime spend/visits from real invoices+payments.
- **Dashboard "Recent sales"**: row click → `/dashboard/sales/$id`.
- **Consultations page**: in `BookFromConsultationDialog`, add an "Add new customer" inline option when the consultation has no `customer_id`.
- **Interests page**: add the same "Create appointment" button that Consultations has.
- **Reports page**: replace the hard-coded no-show rate with a live query (`count(status='No Show') / count(*)` last 90d), plus consultation→appointment conversion rate.

### 5. Prep for automated messaging (no send yet)
- The `client_events` table + Client Status transitions above are the triggers your future email/SMS/WhatsApp automations will listen to. Each automation is a subscriber to one event type — no code change to the journey when we add them later.
- Placeholder trigger map, disabled today:
  ```text
  registered              → welcome
  consultation_booked     → confirmation + reminder T-24h
  consultation_completed  → recommendation email
  active_treatment        → prep + reminder per appointment
  treatment_plan_completed→ congrats + review request
  maintenance             → maintenance reminder
  inactive                → re-engagement
  ```
- When you're ready, we scaffold Lovable app-email templates against these events — no journey changes needed.

### Out of scope for this pass (call out explicitly)
- Actual email/SMS sending, template design, unsubscribe pages — deferred until you say "wire it up".
- Full Marketing page rebuild — that's a separate module once real segmentation from Client Status exists.

---

## Technical details

**Migration order (single migration file):**
1. `CREATE TYPE public.client_status AS ENUM (...)`; add columns + backfill from existing appointments (customers with a completed non-consult appointment → `active_treatment`, etc.).
2. `CREATE TABLE public.client_events (id, customer_id, event_type, from_status, to_status, metadata jsonb, created_at)` with GRANT + RLS (staff read/insert, admin all).
3. `CREATE TYPE public.appointment_status` (rename existing text column), migrate values (`Scheduled`→`Pending` stays, add new members).
4. `CREATE TYPE public.consultation_status` — migrate the two vocabularies to the unified set via `CASE` map.
5. `ALTER TABLE customer_treatments ADD COLUMN status public.treatment_status DEFAULT 'Completed', treatment_plan_id uuid`; new `treatment_plans` table.
6. Triggers: `tg_customer_client_status_from_event()` fires on `appointments`/`consultations`/`auth.users`; each transition writes to `client_events` + updates `customers.client_status`.
7. `pg_cron` nightly job → mark `inactive` / `maintenance` based on `last_activity_at`.

**Code touchpoints (post-migration):**
- `src/lib/dashboard-queries.ts` — rewrite `useRecentSales`, `useTopServices`.
- `src/lib/dashboard-tables.ts` — replace `useCustomerSales` with invoice-based version; add `useCustomerInvoices`.
- `src/pages/ConsultationsPage.tsx` — unified status list + inline new-customer.
- `src/routes/dashboard.interests.tsx` — shared status list + create-appointment action.
- `src/routes/dashboard.customers.$id.tsx` — new Invoices tab, live spend.
- `src/routes/dashboard.sales.$id.tsx` — appointment/customer link buttons + row click on Recent Sales.
- `src/routes/dashboard.reports.tsx` — real conversion/no-show queries.
- `src/routes/dashboard.appointments.$id.tsx` + `AppointmentsPage.tsx` — expanded status dropdown.

No changes to `src/integrations/supabase/*` (auto-generated).