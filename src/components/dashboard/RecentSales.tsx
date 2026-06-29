import { Sparkles } from "lucide-react";
import { recentSalesData } from "@/data/mockData";

export function RecentSales() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 h-full flex flex-col min-h-0">
      <h3 className="text-sm font-semibold text-gray-900 mb-1 flex-shrink-0">Recent sales</h3>
      <div className="flex-1 min-h-0 overflow-hidden">
        {recentSalesData.slice(0, 4).map((s) => (
          <div key={s.service} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
            <div className="w-7 h-7 rounded-lg bg-[#FBEAF0] flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-[#E8246A]" size={13} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-900 truncate">{s.service}</div>
              <div className="text-[10px] text-gray-400">{s.date}</div>
            </div>
            <div className="text-xs font-semibold text-gray-900 ml-auto">TT${s.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}