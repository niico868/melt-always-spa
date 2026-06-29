import { AlertTriangle, AlertCircle } from "lucide-react";
import { alertsData } from "@/data/mockData";

export function AlertsTray() {
  return (
    <div className="bg-[#FFFBF0] rounded-xl border border-amber-200 p-3">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="text-amber-600" size={14} />
        <h3 className="text-sm font-semibold text-gray-900">Alerts</h3>
        <span className="bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center ml-1">3</span>
      </div>
      <div>
        {alertsData.map((a, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5 border-b border-amber-100 last:border-0">
            <AlertCircle className="size-3 text-amber-600 flex-shrink-0" />
            <div className="text-[10px] text-gray-700 flex-1">{a.message}</div>
            {a.type === "action" ? (
              <button className="text-[9px] text-white bg-[#E8246A] hover:bg-[#C91D5C] rounded-md px-1.5 py-0.5">
                {a.actionLabel}
              </button>
            ) : (
              <button className="text-[9px] text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md px-1.5 py-0.5 bg-white hover:bg-gray-50">
                Dismiss
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}