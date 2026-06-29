import { consultationSubmissionsData, type ConsultationStatus } from "@/data/mockData";

function Badge({ status }: { status: ConsultationStatus }) {
  const map: Record<ConsultationStatus, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    Contacted: "bg-amber-50 text-amber-700 border-amber-200",
    Booked: "bg-green-50 text-green-700 border-green-200",
  };
  return <span className={`${map[status]} border rounded-full px-2 py-0.5 text-xs font-medium`}>{status}</span>;
}

export function RecentConsultations() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-base font-semibold text-gray-900">Consultation submissions</h3>
        <a className="text-xs text-[#E8246A] hover:underline cursor-pointer">View all</a>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left font-medium py-2">Client</th>
            <th className="text-left font-medium py-2">Service</th>
            <th className="text-left font-medium py-2">Date</th>
            <th className="text-left font-medium py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {consultationSubmissionsData.slice(0, 4).map((c) => (
            <tr key={c.client} className="text-sm border-b border-gray-50 last:border-0">
              <td className="text-gray-900 font-medium py-2">{c.client}</td>
              <td className="text-gray-700 py-2">{c.service}</td>
              <td className="text-gray-500 py-2">{c.date}</td>
              <td className="py-2"><Badge status={c.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="text-[#E8246A] text-xs font-medium hover:underline cursor-pointer mt-3 block">View all submissions →</a>
    </div>
  );
}