import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  to: string;
}

export function NavItem({ icon: Icon, label, to }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = to === "/dashboard" ? pathname === "/dashboard" : pathname === to || pathname.startsWith(to + "/");

  const base = "flex items-center gap-2 mx-3 rounded-lg px-4 py-3 text-sm transition-colors";
  const cls = active
    ? `${base} bg-white text-[#E8246A] font-semibold`
    : `${base} text-white/90 hover:bg-white/20`;

  return (
    <Link to={to} className={cls}>
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
}