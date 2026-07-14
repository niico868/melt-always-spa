import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsPage } from "@/pages/AppointmentsPage";

export const Route = createFileRoute("/dashboard/appointments/")({
  validateSearch: (s: Record<string, unknown>) => ({ new: s.new === "1" || s.new === 1 ? "1" : undefined }),
  component: AppointmentsPage,
});