import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/pages/ComingSoon";
export const Route = createFileRoute("/dashboard/reports")({
  component: () => <ComingSoon page="Reports" />,
});