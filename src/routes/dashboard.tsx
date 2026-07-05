import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useSession } from "@/lib/use-session";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardLayout,
});

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { session, loading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  useEffect(() => {
    if (!session) return;
    supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data }) => {
      if (data?.nextLevel === "aal2" && data.currentLevel !== "aal2") {
        navigate({ to: "/auth" });
      }
    });
  }, [session, navigate]);

  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F5F7]">
        <div className="text-sm text-gray-500">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="flex lg:h-screen min-h-screen lg:overflow-hidden bg-[#F4F5F7]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile slide-out sidebar */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            <Sidebar />
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="relative z-10 self-start mt-3 ml-2 text-white bg-black/30 rounded-full p-1.5"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <main className="flex-1 min-w-0 lg:overflow-hidden flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-[#E8246A] text-white px-3 py-2.5 shadow">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="p-1 rounded hover:bg-white/10"
          >
            <Menu size={20} />
          </button>
          <div className="font-extrabold tracking-tight text-sm">Melt AWAYS</div>
          <div className="w-7" />
        </div>
        <div className="flex-1 min-h-0 lg:overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}