The details/customer links are not opening because the list routes (`/dashboard/appointments`, `/dashboard/customers`, `/dashboard/sales`) also have child detail routes (`/$id`), but those parent route components render only the list page and do not render an `<Outlet />`. In TanStack routing, child pages cannot appear unless the parent route provides an outlet. So the URL can match, but the detail screen is effectively trapped behind the list page.

Plan:

1. Fix the route structure properly
   - Convert these parent route files into lightweight layout routes that render `<Outlet />`:
     - `/dashboard/appointments`
     - `/dashboard/customers`
     - `/dashboard/sales`
   - Add index child route files for the existing list screens:
     - `/dashboard/appointments/` -> appointments list
     - `/dashboard/customers/` -> customers list
     - `/dashboard/sales/` -> sales list
   - This will make existing links like customer names, Details, invoice rows, and back buttons open the correct pages.

2. Keep full pages for laptop/desktop workflows
   - Appointment detail remains a full appointment management page with notes, services, medical info, financials, and status.
   - Customer profile remains a full customer profile page with overview, medical, treatments, appointments, consultations, sales, and notes.
   - Sales invoice detail remains a full invoice page.

3. Add responsive pop-up behavior where it helps
   - For quick viewing from dense dashboard/list contexts, add responsive detail modals/drawers that are full-screen on mobile and centered/wide on tablet/laptop.
   - Use the existing modal pattern but improve sizing so it works from phone to laptop:
     - mobile: full-screen sheet
     - tablet/laptop: max-width panel with scrollable body
   - Keep the actual detail routes available so back arrows, direct links, refresh, and laptop workflows still work reliably.

4. Make all customer names and detail actions consistent
   - Ensure customer names across appointments, consultations, sales, and dashboard widgets use proper typed `<Link>` navigation to `/dashboard/customers/$id`.
   - Ensure appointment Details buttons navigate or open the detail view consistently, not a silent edit dialog.

5. Verify the fix
   - Check that `/dashboard/appointments`, `/dashboard/appointments/:id`, `/dashboard/customers`, `/dashboard/customers/:id`, `/dashboard/sales`, and `/dashboard/sales/:id` all render visibly.
   - Test a customer name click and an appointment Details click on mobile-sized and laptop-sized layouts.