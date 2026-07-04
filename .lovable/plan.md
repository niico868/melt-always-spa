# Build out all 9 dashboard pages in one pass

## Goal
Replace the 9 `ComingSoon` stubs with real, testable pages in a single build turn — cheapest path to a working admin dashboard.

## Pages to build
Customers · Sales & Payments · Services · Products · Interest Tracking · Employees · Reports · Marketing · Settings

## Strategy for lowest credit cost
1. **One batch, one turn.** All 9 pages built in a single response using parallel file writes — no back-and-forth iterations.
2. **Reuse one shared layout component.** Create `DashboardPage` (header + toolbar slot + content slot) so each page is ~40 lines instead of 150. Consistent look, tiny files.
3. **Reuse one shared `DataTable`** (search, sort, pagination, row actions) so 7 of the 9 pages are just a column definition + query hook.
4. **Wire straight to existing Supabase tables** (customers, appointments, consultations, sales, services, products, employees, alerts) via a single `useTable(tableName)` hook using TanStack Query. No new server functions for read paths — the client uses the authenticated Supabase browser client with the RLS policies already in place.
5. **Skip visual polish now.** shadcn defaults + the existing pink accent. No custom illustrations, no motion, no design directions.
6. **No new migrations, no new secrets, no auth changes.** Everything runs against tables that already exist.

## What each page ships with (v1, testing-ready)

| Page | v1 content |
|---|---|
| Customers | Table: name, phone, email, location, created. Search. Row click → drawer with lead history. |
| Sales & Payments | Table: date, customer, service, amount, method, status. Filter by month. Totals strip. |
| Services | Table: name, category, price, duration, active toggle. "Add service" dialog (create/edit/delete). |
| Products | Table: name, SKU, price, stock, active. "Add product" dialog (create/edit/delete). |
| Interest Tracking | Grouped list of consultation leads by status (from existing LEAD_STATUSES). Drag-to-change-status later — v1 uses a status dropdown per row. |
| Employees | Table: name, role, email, phone, active. "Add employee" dialog. Role uses the existing `user_roles` pattern. |
| Reports | 4 KPI tiles (month sales, appointments, new customers, avg ticket) + 2 charts reusing `ConsultationChart` and `TopServicesChart` with a date-range picker. |
| Marketing | Simple broadcast composer (subject + body + audience selector) that writes to a `marketing_campaigns` table — send button disabled with "Coming soon" tooltip. List of past drafts. |
| Settings | Tabs: Business info (name, hours, phone, address — reads/writes a single `settings` row), Locations, Team access (link to Employees). |

## Technical notes
- New shared files: `src/components/dashboard/DashboardPage.tsx`, `src/components/dashboard/DataTable.tsx`, `src/lib/dashboard-tables.ts` (query hooks).
- Replace the 9 `dashboard.<name>.tsx` route files' `component:` to point at the new page components.
- Marketing + Settings need two small tables (`marketing_campaigns`, `business_settings`) → one migration with GRANTs + RLS restricted to `authenticated` + admin `has_role` check.
- All mutations use the existing `supabase` browser client; RLS enforces admin-only writes.
- No changes to `Sidebar`, `dashboard.tsx` layout, or `dashboard.index.tsx`.

## What is explicitly out of scope for this pass
- Custom design/animations
- Bulk import/export
- Advanced Reports (cohort, funnel)
- Real email sending for Marketing
- Fine-grained per-employee permissions beyond the existing `admin`/`staff` roles

Ship this v1, click through in preview, then iterate only on the pages that need it — that's the cheapest path to a testable dashboard today.
