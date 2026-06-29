import {
  CalendarPlus, UserPlus, Receipt, ListPlus, Package, Mail, BarChart2, Settings,
  type LucideIcon,
} from "lucide-react";

const ACTIONS: { icon: LucideIcon; label: string }[] = [
  { icon: CalendarPlus, label: "New appointment" },
  { icon: UserPlus, label: "Add customer" },
  { icon: Receipt, label: "Record sale" },
  { icon: ListPlus, label: "Add service" },
  { icon: Package, label: "Add product" },
  { icon: Mail, label: "Send message" },
  { icon: BarChart2, label: "View reports" },
  { icon: Settings, label: "Business settings" },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 h-full flex flex-col min-h-0">
      <h3 className="text-sm font-semibold text-gray-900 mb-1 px-1 flex-shrink-0">Quick actions</h3>
      <div className="flex-1 min-h-0 flex flex-col justify-between gap-0.5">
        {ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-2 cursor-pointer group rounded-lg px-1.5 py-1 hover:bg-[#FBEAF0] transition-colors text-left"
          >
            <div className="w-6 h-6 rounded-full bg-[#FBEAF0] group-hover:bg-white flex items-center justify-center flex-shrink-0 transition-colors">
              <Icon className="text-[#E8246A] size-3" />
            </div>
            <span className="text-[11px] text-gray-700 leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}