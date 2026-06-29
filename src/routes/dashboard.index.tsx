import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ConsultationChart } from "@/components/dashboard/ConsultationChart";
import { TopServicesChart } from "@/components/dashboard/TopServicesChart";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentConsultations } from "@/components/dashboard/RecentConsultations";
import { AlertsTray } from "@/components/dashboard/AlertsTray";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { kpiData } from "@/data/mockData";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const appointmentsKpi = kpiData.find((k) => k.iconKey === "calendar")!;
  const consultationsKpi = kpiData.find((k) => k.iconKey === "users")!;
  const customersKpi = kpiData.find((k) => k.iconKey === "userplus")!;
  const salesKpi = kpiData.find((k) => k.iconKey === "bag")!;
  return (
    <div className="h-full flex flex-col px-4 pt-3 pb-3 gap-3 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#1A1A2E] leading-tight">
            Welcome back, <span className="text-[#E8246A]">Krystal C</span>
          </h1>
          <p className="text-xs text-gray-500">Here's what's happening with your spa today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white flex items-center gap-1.5">
            <CalendarDays size={14} className="text-gray-400" />
            May 24, 2025
          </button>
          <button className="bg-[#E8246A] text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-[#C91D5C] transition-colors">
            <Plus size={14} />
            New appointment
          </button>
        </div>
      </div>

      {/* Main area: content grid + quick actions rail */}
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_170px] gap-3">
        <div className="min-h-0 grid grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3">
          {/* KPI strip */}
          <div className="grid grid-cols-4 gap-3">
            <KpiCard data={appointmentsKpi} />
            <KpiCard data={consultationsKpi} />
            <KpiCard data={customersKpi} />
            <KpiCard data={salesKpi} />
          </div>
          {/* Middle row */}
          <div className="grid grid-cols-3 gap-3 min-h-0">
            <RecentSales />
            <RecentConsultations />
            <TopServicesChart />
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-3 gap-3 min-h-0">
            <div className="col-span-1 min-h-0"><AlertsTray /></div>
            <div className="col-span-1 min-h-0"><UpcomingAppointments /></div>
            <div className="col-span-1 min-h-0"><ConsultationChart /></div>
          </div>
        </div>
        <div className="min-h-0">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}