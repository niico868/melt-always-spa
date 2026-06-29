import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsPage } from "@/pages/AppointmentsPage";
export const Route = createFileRoute("/dashboard/appointments")({
  component: AppointmentsPage,
});