import { Check, Pencil } from "lucide-react";
import { appointmentsData, type AppointmentStatus } from "@/data/mockData";

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const cls = status === "Confirmed"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return <span className={`${cls} border rounded-full px-2 py-0.5 text-xs font-medium`}>{status}</span>;
}

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-900">Upcoming appointments</h3>
        <a className="text-xs text-[#E8246A] hover:underline cursor-pointer">View calendar</a>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left font-medium py-2">Time</th>
            <th className="text-left font-medium py-2">Client</th>
            <th className="text-left font-medium py-2">Service</th>
            <th className="text-left font-medium py-2">Status</th>
            <th className="text-left font-medium py-2 w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.slice(0, 4).map((a) => (
            <tr key={a.time} className="group text-sm border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <td className="text-gray-700 py-2">{a.time}</td>
              <td className="text-gray-900 font-medium py-2">{a.client}</td>
              <td className="text-gray-700 py-2">{a.service}</td>
              <td className="py-2"><StatusBadge status={a.status} /></td>
              <td className="py-2">
                <div className={`flex gap-2 items-center ${a.status === "Confirmed" ? "opacity-0 group-hover:opacity-100 transition-opacity" : ""}`}>
                  <button title="Confirm appointment" className="cursor-pointer">
                    <Check className="size-4 text-green-600 hover:text-green-700" />
                  </button>
                  <button title="Reschedule" className="cursor-pointer">
                    <Pencil className="size-4 text-gray-400 hover:text-gray-600" />
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