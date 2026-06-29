import { AlertTriangle, AlertCircle } from "lucide-react";
import { alertsData } from "@/data/mockData";

export function AlertsTray() {
  return (
    <div className="bg-[#FFFBF0] rounded-xl border border-amber-200 p-3 h-full flex flex-col min-h-0">
      <div className="flex items-center gap-2 mb-1 flex-shrink-0">
        <AlertTriangle className="text-amber-600" size={14} />
        <h3 className="text-sm font-semibold text-gray-900">Alerts</h3>
        <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {alertsData.slice(0, 3).map((a, i) => (
          <div key={i} className="flex items-center gap-1.5 py-1 border-b border-amber-100 last:border-0">
            <AlertCircle className="size-3 text-amber-600 flex-shrink-0" />
            <div className="text-[11px] text-gray-700 flex-1 leading-snug line-clamp-2">{a.message}</div>
            {a.type === "action" ? (
              <button className="text-[10px] text-white bg-[#E8246A] hover:bg-[#C91D5C] rounded px-1.5 py-0.5 flex-shrink-0">{a.actionLabel}</button>
            ) : (
              <button className="text-[10px] text-gray-500 border border-gray-200 rounded px-1.5 py-0.5 bg-white flex-shrink-0">Dismiss</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}