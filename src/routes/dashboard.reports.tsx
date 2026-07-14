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
        <div>
          <div className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold mb-2">Decision insights <span className="text-gray-400 normal-case font-normal">· placeholder metrics</span></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Tile label="Consult → Appt rate" value="60%" hint="9 of 15 consultations booked" />
            <Tile label="No-show / cancel rate" value="13%" hint="2 of 15 appointments" />
            <Tile label="Cost per lead" value={fmtMoney(42)} hint="Avg across channels" />
            <LeadSourceTile />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-[280px]">
          <ConsultationChart />
          <TopServicesChart />
        </div>
      </div>
    </DashboardPage>
  );
}

function Tile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="text-[10px] uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-lg font-bold text-[#1A1A2E] mt-1">{value}</div>
      {hint && <div className="text-[10px] text-gray-400 mt-0.5">{hint}</div>}
    </div>
  );
}

function LeadSourceTile() {
  const sources = [
    { name: "WhatsApp", count: 6, color: "bg-emerald-500" },
    { name: "Instagram", count: 5, color: "bg-pink-500" },
    { name: "Website", count: 4, color: "bg-sky-500" },
  ];
  const total = sources.reduce((s, x) => s + x.count, 0);
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="text-[10px] uppercase tracking-wide text-gray-500">Lead sources</div>
      <div className="mt-1 space-y-1">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-2 text-[11px]">
            <span className={`inline-block w-2 h-2 rounded-full ${s.color}`} />
            <span className="text-gray-700 flex-1">{s.name}</span>
            <span className="font-semibold text-[#1A1A2E]">{s.count}</span>
            <span className="text-gray-400">({Math.round((s.count / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}