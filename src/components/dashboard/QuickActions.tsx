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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
      <h3 className="text-xs font-semibold text-gray-900 mb-2">Quick actions</h3>
      <div className="flex justify-between flex-wrap gap-2">
        {ACTIONS.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center gap-1 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-[#FBEAF0] flex items-center justify-center group-hover:bg-[#F4C0D1] transition-colors">
              <Icon className="text-[#E8246A] size-3.5" />
            </div>
            <span className="text-[9px] text-gray-600 group-hover:text-gray-900 transition-colors text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}