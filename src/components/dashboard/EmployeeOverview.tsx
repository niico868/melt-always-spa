import { employeeData } from "@/data/mockData";

export function EmployeeOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-gray-900">Employee overview</h3>
        <a className="text-sm text-[#E8246A] hover:underline cursor-pointer">View all</a>
      </div>
      <div>
        {employeeData.map((e) => {
          const pct = Math.round((e.slotsBooked / e.slotsTotal) * 100);
          const avatarCls = e.avatarTone === "pink"
            ? "bg-[#FBEAF0] text-[#E8246A]"
            : "bg-purple-100 text-purple-700";
          return (
            <div key={e.name} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className={`${avatarCls} w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0`}>
                {e.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">{e.name}</div>
                <div className="text-xs text-gray-500 mb-2">{e.role}</div>
                <div className="text-xs text-gray-400 mb-1">{e.slotsBooked} / {e.slotsTotal} slots today</div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className="bg-[#E8246A] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}