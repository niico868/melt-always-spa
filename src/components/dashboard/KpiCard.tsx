import { CalendarDays, Users, ShoppingBag, UserPlus, TrendingUp, type LucideIcon } from "lucide-react";
import type { KpiCardDatum } from "@/data/mockData";

const ICONS: Record<KpiCardDatum["iconKey"], LucideIcon> = {
  calendar: CalendarDays,
  users: Users,
  bag: ShoppingBag,
  userplus: UserPlus,
};

export function KpiCard({ data }: { data: KpiCardDatum }) {
  const Icon = ICONS[data.iconKey];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{data.title}</div>
        <div className="rounded-full bg-[#FBEAF0] w-8 h-8 flex items-center justify-center">
          <Icon className="text-[#E8246A] size-4" />
        </div>
      </div>
      <div className="text-xl font-bold text-[#1A1A2E] mt-2">{data.value}</div>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="text-[10px] text-gray-500">{data.label}</span>
        {data.trend && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600">
            <TrendingUp size={10} />
            {data.trend}
          </span>
        )}
      </div>
      {data.goalProgress && (
        <>
          <div className="text-[10px] text-gray-400 mt-2">Goal: TT$12,000</div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
            <div className="bg-[#E8246A] h-1.5 rounded-full" style={{ width: "70%" }} />
          </div>
        </>
      )}
    </div>
  );
}