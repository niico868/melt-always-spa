import {
  LayoutDashboard, Calendar, ClipboardList, Users, CreditCard,
  Sparkles, Package, Heart, UserCheck, BarChart2, Megaphone, Settings,
  ShieldCheck, ScrollText, LogOut,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { useSession, signOutAndRedirect } from "@/lib/use-session";
import { useIsAdmin } from "@/lib/use-my-roles";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Calendar, label: "Appointments", to: "/dashboard/appointments" },
  { icon: ClipboardList, label: "Consultations", to: "/dashboard/consultations" },
  { icon: Users, label: "Customers", to: "/dashboard/customers" },
  { icon: CreditCard, label: "Sales & Payments", to: "/dashboard/sales" },
  { icon: Sparkles, label: "Services", to: "/dashboard/services" },
  { icon: Package, label: "Products", to: "/dashboard/products" },
  { icon: Heart, label: "Interest Tracking", to: "/dashboard/interests" },
  { icon: UserCheck, label: "Accounts", to: "/dashboard/employees" },
  { icon: BarChart2, label: "Reports", to: "/dashboard/reports" },
  { icon: Megaphone, label: "Marketing", to: "/dashboard/marketing" },
  { icon: ShieldCheck, label: "Security (2FA)", to: "/dashboard/security" },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" },
] as const;

export function Sidebar() {
  const { user, profile } = useSession();
  const isAdmin = useIsAdmin();
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Account";
  const initials = displayName.split(/\s+/).map(p => p[0]).slice(0, 2).join("").toUpperCase();
  const role = profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Staff";
  return (
    <aside className="w-[200px] min-w-[200px] h-full bg-[#E8246A] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="px-4 pt-4 mb-4">
        <div className="text-white text-base font-extrabold tracking-tight">Melt AWAYS</div>
        <div className="text-white/80 text-[10px] italic mt-1 leading-snug">
          Where we destroy fat and reveal the you inside
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV.map((n) => (
          <NavItem key={n.to} icon={n.icon} label={n.label} to={n.to} />
        ))}
        {isAdmin && <NavItem icon={ScrollText} label="Audit Log" to="/dashboard/audit" />}
      </nav>

      <div className="mt-auto">
        <div className="border-t border-white/20 mb-2" />
        <div className="bg-white/15 rounded-xl mx-2 p-2 flex items-center gap-2">
          <div className="bg-white text-[#E8246A] font-bold rounded-full w-7 h-7 flex items-center justify-center text-xs">
            {initials || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium text-xs leading-tight truncate">{displayName}</div>
            <div className="text-white/70 text-[10px] leading-tight truncate">{role}</div>
          </div>
        </div>
        <button
          onClick={() => { void signOutAndRedirect(); }}
          className="mt-2 mb-3 mx-2 flex items-center gap-2 text-white/70 text-xs hover:text-white cursor-pointer px-2 w-[calc(100%-1rem)] text-left bg-transparent border-0"
        >
          <LogOut size={14} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}