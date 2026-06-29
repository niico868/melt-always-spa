import { Check, Pencil } from "lucide-react";
import { appointmentsData, type AppointmentStatus } from "@/data/mockData";

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const cls = status === "Confirmed"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return <span className={`${cls} border rounded-full px-1.5 py-0 text-[9px] font-medium`}>{status}</span>;
}

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 min-w-[420px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Upcoming appointments</h3>
        <a className="text-[10px] text-[#E8246A] hover:underline cursor-pointer">View calendar</a>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-[10px] text-gray-400 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left font-medium py-1.5">Time</th>
            <th className="text-left font-medium py-1.5">Client</th>
            <th className="text-left font-medium py-1.5">Service</th>
            <th className="text-left font-medium py-1.5">Status</th>
            <th className="text-left font-medium py-1.5 w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.slice(0, 4).map((a) => (
            <tr key={a.time} className="group text-[10px] border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <td className="text-gray-700">{a.time}</td>
              <td className="text-gray-900 font-medium">{a.client}</td>
              <td className="text-gray-700">{a.service}</td>
              <td className="py-1"><StatusBadge status={a.status} /></td>
              <td className="py-1">
                <div className={`flex gap-1.5 items-center ${a.status === "Confirmed" ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`}>
                  <button title="Confirm appointment" className="cursor-pointer">
                    <Check className="size-3 text-green-600 hover:text-green-700" />
                  </button>
                  <button title="Reschedule" className="cursor-pointer">
                    <Pencil className="size-3 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}