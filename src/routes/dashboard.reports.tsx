import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { fmtMoney } from "@/components/dashboard/DataTable";
import { ConsultationChart } from "@/components/dashboard/ConsultationChart";
import { TopServicesChart } from "@/components/dashboard/TopServicesChart";
import { useSales, useCustomers } from "@/lib/dashboard-tables";
import { useDashboardKpis } from "@/lib/dashboard-queries";

export const Route = createFileRoute("/dashboard/reports")({ component: ReportsPage });

function ReportsPage() {
  const { data: kpis } = useDashboardKpis();
  const { data: sales } = useSales();
  const { data: customers } = useCustomers();

  const avgTicket = useMemo(() => {
    if (!sales || sales.length === 0) return 0;
    const sum = sales.reduce((s, r) => s + Number(r.amount), 0);
    return sum / sales.length;
  }, [sales]);

  return (
    <DashboardPage title="Reports" subtitle="Business performance at a glance">
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Tile label="Sales (month)" value={fmtMoney(kpis?.salesMonth ?? 0)} />
          <Tile label="Appointments today" value={String(kpis?.appointmentsToday ?? 0)} />
          <Tile label="Total customers" value={String(customers?.length ?? 0)} />
          <Tile label="Avg ticket" value={fmtMoney(avgTicket)} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[280px]">
          <ConsultationChart />
          <TopServicesChart />
        </div>
      </div>
    </DashboardPage>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="text-[10px] uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-lg font-bold text-[#1A1A2E] mt-1">{value}</div>
    </div>
  );
}