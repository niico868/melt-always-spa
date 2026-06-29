import { Sparkles } from "lucide-react";
import { recentSalesData } from "@/data/mockData";

export function RecentSales() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Recent sales</h3>
      <div>
        {recentSalesData.map((s) => (
          <div key={s.service} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-[#FBEAF0] flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-[#E8246A]" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{s.service}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.date}</div>
            </div>
            <div className="text-sm font-semibold text-gray-900 ml-auto">TT${s.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <a className="text-[#E8246A] text-sm font-medium hover:underline cursor-pointer mt-4 block">View all sales →</a>
    </div>
  );
}