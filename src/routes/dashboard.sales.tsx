import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/pages/ComingSoon";
export const Route = createFileRoute("/dashboard/sales")({
  component: () => <ComingSoon page="Sales & Payments" />,
});