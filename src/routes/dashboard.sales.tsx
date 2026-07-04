import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { DataTable, fmtDate, fmtMoney, type Column } from "@/components/dashboard/DataTable";
import { useSales, type Sale } from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/sales")({ component: SalesPage });

function SalesPage() {
  const { data, isLoading, error } = useSales();
  const totals = useMemo(() => {
    const rows = data ?? [];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    let month = 0, all = 0;
    for (const r of rows) {
      const amt = Number(r.amount);
      all += amt;
      if (new Date(r.sold_at).getTime() >= monthStart) month += amt;
    }
    return { month, all, count: rows.length };
  }, [data]);

  const columns: Column<Sale>[] = [
    { key: "sold_at", header: "Date", render: r => fmtDate(r.sold_at) },
    { key: "customer", header: "Customer", accessor: r => r.customers?.full_name, render: r => r.customers?.full_name ?? "Walk-in" },
    { key: "description", header: "Description" },
    { key: "amount", header: "Amount", className: "text-right", render: r => <span className="font-medium text-gray-800">{fmtMoney(r.amount)}</span> },
  ];

  return (
    <DashboardPage title="Sales & Payments" subtitle="All recorded transactions">
      <div className="grid grid-cols-3 gap-3 p-3 border-b border-gray-100">
        <Stat label="This month" value={fmtMoney(totals.month)} />
        <Stat label="All time" value={fmtMoney(totals.all)} />
        <Stat label="Transactions" value={String(totals.count)} />
      </div>
      <DataTable rows={data} columns={columns} loading={isLoading} error={error} searchPlaceholder="Search sales…" empty="No sales recorded yet." />
    </DashboardPage>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-[10px] uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-sm font-bold text-[#1A1A2E] mt-1">{value}</div>
    </div>
  );
}