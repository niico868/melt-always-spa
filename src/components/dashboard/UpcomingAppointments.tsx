import { Check, Pencil } from "lucide-react";
import { useUpcomingAppointments } from "@/lib/dashboard-queries";

function StatusBadge({ status }: { status: string }) {
  const cls = status === "Confirmed"
    ? "bg-green-50 text-green-700 border-green-200"
    : "bg-amber-50 text-amber-700 border-amber-200";
  return <span className={`${cls} border rounded-full px-1.5 py-0 text-[10px] font-medium`}>{status}</span>;
}

export function UpcomingAppointments() {
  const { data, isLoading } = useUpcomingAppointments();
  const rows = (data ?? []).slice(0, 4);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 h-full flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-1 flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-900">Upcoming appointments</h3>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {isLoading && <div className="text-xs text-gray-400 py-2">Loading…</div>}
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left font-medium py-1">Time</th>
              <th className="text-left font-medium py-1">Client</th>
              <th className="text-left font-medium py-1">Status</th>
              <th className="text-right font-medium py-1 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a: any) => (
              <tr key={a.id} className="group text-xs border-b border-gray-50 last:border-0">
                <td className="text-gray-700 py-1.5 whitespace-nowrap">{new Date(a.scheduled_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</td>
                <td className="text-gray-900 font-medium py-1.5 truncate">{a.customers?.full_name ?? "—"}</td>
                <td className="py-1.5"><StatusBadge status={a.status} /></td>
                <td className="py-1.5">
                  <div className="flex gap-1 items-center justify-end">
                    <button title="Confirm" className="cursor-pointer"><Check className="size-3 text-green-600" /></button>
                    <button title="Reschedule" className="cursor-pointer"><Pencil className="size-3 text-gray-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}