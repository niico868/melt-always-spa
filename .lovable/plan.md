## Goal
Eliminate dead space, raise font sizes for comfortable middle-aged readability, and reorganize `/dashboard` into clear zones. All other dashboard routes, data, colors, and component file structure stay unchanged.

## New layout

```
┌─────────────── Header (Welcome + date + New appointment) ───────────────┐
│                                                                          │
├──────────────┬───────────────────────────────┬──────────┐                
│ LEFT KPIs    │  MIDDLE COLUMN                │ QUICK    │                
│ (narrow)     │                               │ ACTIONS  │                
│              │  Sales this month (KPI +      │ (slim    │                
│ Appointments │   goal bar)                   │  rail,   │                
│              │                               │  vert.)  │                
│ New          │  Recent sales                 │          │                
│ Consultations│                               │ 8 icons  │                
│              │  Alerts                       │ stacked  │                
│ New Customers│                               │ top→     │                
│              │                               │ bottom   │                
└──────────────┴───────────────────────────────┴──────────┘                
┌──────────────────────────┬──────────────────────────────┐                
│ Consultation Submissions │ Top Services (donut)         │                
│ (narrower, larger text)  │                              │                
└──────────────────────────┴──────────────────────────────┘                
┌──────────────────────────────────────────────────────────┐               
│ Consultations chart (7-day area) │ Upcoming Appointments │               
└──────────────────────────────────────────────────────────┘               
```

Grid: 12 cols. Upper zone = 3 / 6 / 3 (left KPIs / middle stack / Quick Actions rail). Lower zones = 5 / 7 and 7 / 5.

## What changes

**Removed**
- Employee Overview card (and its import on the dashboard index — component file stays for reuse).

**Repositioned**
- `Appointments`, `New Consultations`, `New Customers` KPI cards → vertical stack in left column, compressed width.
- `Sales this month` KPI → top of middle column, keeps the goal progress bar.
- `RecentSales` → middle column, under Sales KPI.
- `AlertsTray` → middle column, under Recent Sales.
- `QuickActions` → far-right vertical rail, all 8 actions stacked (icon + label per row), full height of the upper zone.
- `RecentConsultations` (consultation submissions) → lower-left, narrower, larger font.
- `TopServicesChart` → lower-right beside it.
- `ConsultationChart` + `UpcomingAppointments` → bottom row (kept, since you asked me to flag anything missing — they were not in your description).

**Typography bump (readability for ~middle-aged eyes)**
- KPI value: `text-2xl` (was `text-xl`-ish); KPI title `text-sm`; label `text-xs`.
- Section headings: `text-base` semibold.
- Table rows / list rows: `text-sm` (was `text-xs` / `text-[10px]`).
- Alerts message: `text-sm`; action buttons `text-xs`.
- Quick Actions labels: `text-xs`, icon circle `w-9 h-9`.
- Removes most `text-[9px]` / `text-[10px]` micro-text.

**Density**
- Card padding standardized to `p-4`.
- Inter-card gap `gap-4`.
- Page padding `px-6 pt-5 pb-4`.

## Sections you didn't mention
1. **Consultations 7-day chart** — kept; placed in bottom row.
2. **Upcoming Appointments** (today's bookings) — kept; placed beside the chart.
3. **Page header** (greeting + date + New appointment button) — kept as-is.

If you'd rather drop any of these or move them, say which and I'll adjust before building.

## Files touched
- `src/routes/dashboard.index.tsx` — new grid structure, remove `EmployeeOverview` usage.
- `src/components/dashboard/QuickActions.tsx` — rewrite for vertical rail (icon + label rows).
- `src/components/dashboard/AlertsTray.tsx` — larger text, tighter compact layout for the middle column.
- `src/components/dashboard/RecentSales.tsx` — larger text, padding consistency.
- `src/components/dashboard/RecentConsultations.tsx` — narrower-friendly layout, larger row text.
- `src/components/dashboard/KpiCard.tsx` — bump value/title/label sizes; works in vertical-stack form.
- `src/components/dashboard/ConsultationChart.tsx`, `TopServicesChart.tsx`, `UpcomingAppointments.tsx` — heading + tick/legend text size bump only.

No data, route, sidebar, or color-token changes.

## Viewport target
Still fits 1280×800 at 100% zoom without vertical scroll for the upper zone; the bottom rows scroll naturally below the fold (acceptable since the priority cards are above).
