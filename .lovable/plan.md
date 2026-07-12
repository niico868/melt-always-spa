# Appointments Module — Phase 1

Currency TTD, 12.5% VAT. Deferring: real WhatsApp/email/SMS sending (wa.me links only), file uploads, loyalty/memberships, AI features, multi-branch/rooms.

## Database changes (one migration)

New tables (all with RLS + GRANTs):

- **appointment_services** — join table so one appointment can have many services. Columns: `appointment_id`, `service_id`, `price_snapshot`, `duration_min_snapshot`. Prices/durations snapshot at booking so history stays accurate.
- **appointment_notes** — quick operational notes and internal staff notes. Columns: `appointment_id`, `kind` (`quick` | `internal` | `treatment`), `body`, `author_id`, `author_name`, `created_at`.
- **appointment_medical** — per-appointment medical snapshot. Columns: `appointment_id`, `allergies`, `medications`, `contraindications`, `additional_notes`. One row per appointment.
- **invoices** — one invoice per appointment (auto-created on appointment insert via trigger). Columns: `appointment_id`, `customer_id`, `invoice_number` (auto MEA-000001), `subtotal`, `discount`, `tax` (12.5%), `total`, `status` (Draft/Sent/Paid/PartiallyPaid/Void).
- **payments** — payment ledger against invoices. Columns: `invoice_id`, `amount`, `method` (Cash/Card/Bank Transfer/WiPay/Other), `kind` (`payment` | `refund` | `discount` | `deposit`), `note`, `recorded_by`, `recorded_at`.

New columns on existing `appointments`:

- `quick_note text`
- `room text nullable`
- `duration_min int` (computed from services on save)

Backfill: for existing appointments, insert one `appointment_services` row from current `service_id`, then keep the legacy `service_id` column populated for backward compat (dashboard KPIs read it). New code writes to both until we clean up in a later phase.

Views/RPCs:

- `appointment_summary` view: appointment + aggregated services (names, total price, total duration) + invoice totals + amount_paid + remaining_balance.
- `has_role` already exists; RLS policies allow staff/admin/manager/receptionist full access, clients read-own via `customer_id` → `profiles.id`.

## UI changes

### Appointments list (`/dashboard/appointments`)

New/changed columns: When · Client (link) · Services (comma list w/ +N badge) · Therapist · Status · Payment Status · Remaining Balance · Medical (icon indicators: allergy/med/contra tooltips) · Quick Note (inline-editable input) · Actions.

Actions row adds: **Send Reminder** button → opens `https://wa.me/<phone>?text=<encoded>` in a new tab with pre-filled clinic name + date/time + services list.

Client name is now a `<Link>` to `/dashboard/appointments/$id` (new route).

### New appointment dialog

Service selector becomes multi-select (checkbox popover). Total price + total duration auto-calculate and display live. Adds Room field.

### Appointment Details page (`/dashboard/appointments/$id`)

Full page (not modal) with back arrow. Sections in a two-column layout:

- **Client Information** (read-only card, edit opens customer profile later)
- **Appointment Details** (inline-editable: date/time, services multi-select, therapist, room, duration auto)
- **Financial** — deposit paid, remaining, discount, promo, method, status; buttons: Add Payment (dialog), Issue Refund (dialog), Print Receipt (window.print of a receipt template)
- **Medical** — free-text fields for allergies/meds/contraindications/notes; docs list placeholder (upload deferred)
- **Treatment Notes** — rich-ish textarea list, each entry stamps author + timestamp
- **Internal Staff Notes** — same shape as treatment notes, visually distinct, staff-only

All edits save via server functions with optimistic React Query invalidation.

## Technical

Server functions in `src/lib/appointments.functions.ts`:
- `getAppointment(id)` — full detail bundle
- `updateAppointment(id, patch)`
- `setAppointmentServices(id, serviceIds[])` — replaces join rows, recomputes duration + invoice totals
- `upsertAppointmentMedical(id, fields)`
- `addAppointmentNote(id, kind, body)` / `deleteAppointmentNote(noteId)`
- `updateQuickNote(id, text)`
- `addPayment(invoiceId, {amount, method, kind, note})` — recalculates invoice status
- `issueRefund(invoiceId, {amount, method, note})`

All protected by `requireSupabaseAuth` + `has_role` check for staff/admin/manager/receptionist.

Files created:
- `src/routes/dashboard.appointments.$id.tsx`
- `src/lib/appointments.functions.ts`
- `src/components/appointments/*` (FinancialCard, MedicalCard, NotesCard, PaymentsDialog, MultiServiceSelect, WhatsAppReminderButton)

Files edited:
- `src/pages/AppointmentsPage.tsx` — new columns, multi-service dialog, quick-note inline edit, wa.me button, client link
- One migration for all schema.

## Out of scope this phase

Documents/photo uploads, loyalty, AI, multi-branch, real messaging pipeline, Customers/Sales/Accounts overhauls (each is its own phase).
