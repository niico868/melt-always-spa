import { type ReactNode } from "react";

export function DashboardPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="lg:h-full flex flex-col px-3 sm:px-4 pt-3 pb-4 gap-3 lg:overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 flex-shrink-0">
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#1A1A2E] leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-[11px] sm:text-xs text-gray-500">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex-1 min-h-0 lg:overflow-auto bg-white rounded-xl border border-gray-200">
        {children}
      </div>
    </div>
  );
}

export function PrimaryButton({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#E8246A] text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#C91D5C] transition-colors whitespace-nowrap"
    >
      {children}
    </button>
  );
}