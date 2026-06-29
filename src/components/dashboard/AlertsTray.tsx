import { AlertTriangle, AlertCircle } from "lucide-react";
import { alertsData } from "@/data/mockData";

export function AlertsTray() {
  return (
    <div className="bg-[#FFFBF0] rounded-xl border border-amber-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-600" size={20} />
        <h3 className="text-base font-semibold text-gray-900">Alerts</h3>
        <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-1">3</span>
      </div>
      <div>
        {alertsData.map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-amber-100 last:border-0">
            <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
            <div className="text-sm text-gray-700 flex-1">{a.message}</div>
            {a.type === "action" ? (
              <button className="text-xs text-white bg-[#E8246A] hover:bg-[#C91D5C] rounded-md px-3 py-1">
                {a.actionLabel}
              </button>
            ) : (
              <button className="text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md px-3 py-1 bg-white hover:bg-gray-50">
                Dismiss
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}