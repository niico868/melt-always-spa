import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/sidebar/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}