import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { DataTable, fmtDateTime, type Column } from "@/components/dashboard/DataTable";
import { useConsultations, useUpdateConsultationStatus, CONSULT_STATUSES, type Consultation } from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/interests")({ component: InterestsPage });

function InterestsPage() {
  const { data, isLoading, error } = useConsultations();
  const updateStatus = useUpdateConsultationStatus();

  const columns: Column<Consultation>[] = [
    { key: "client_name", header: "Client", render: r => <span className="font-medium text-gray-800">{r.client_name}</span> },
    { key: "service_name", header: "Interested in", render: r => r.service_name ?? "—" },
    { key: "submitted_at", header: "Submitted", render: r => fmtDateTime(r.submitted_at) },
    {
      key: "status", header: "Status",
      render: r => (
        <select
          value={r.status}
          onChange={e => updateStatus.mutate({ id: r.id, status: e.target.value })}
          className="text-[11px] border border-gray-200 rounded px-2 py-1 bg-white"
        >
          {CONSULT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ),
    },
  ];

  return (
    <DashboardPage title="Interest Tracking" subtitle={`${data?.length ?? 0} consultation requests`}>
      <DataTable rows={data} columns={columns} loading={isLoading} error={error} searchPlaceholder="Search leads…" empty="No consultation requests yet." />
    </DashboardPage>
  );
}