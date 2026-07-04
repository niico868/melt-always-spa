import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { DataTable, fmtDate, type Column } from "@/components/dashboard/DataTable";
import { useCustomers, type Customer } from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/customers")({ component: CustomersPage });

function CustomersPage() {
  const { data, isLoading, error } = useCustomers();
  const columns: Column<Customer>[] = [
    { key: "full_name", header: "Name", render: r => <span className="font-medium text-gray-800">{r.full_name}</span> },
    { key: "phone", header: "Phone", render: r => r.phone ?? "—" },
    { key: "email", header: "Email", render: r => r.email ?? "—" },
    { key: "notes", header: "Notes", render: r => <span className="text-gray-500 truncate block max-w-xs">{r.notes ?? "—"}</span> },
    { key: "created_at", header: "Joined", render: r => fmtDate(r.created_at) },
  ];
  return (
    <DashboardPage title="Customers" subtitle={`${data?.length ?? 0} total`}>
      <DataTable rows={data} columns={columns} loading={isLoading} error={error} searchPlaceholder="Search customers…" empty="No customers yet." />
    </DashboardPage>
  );
}