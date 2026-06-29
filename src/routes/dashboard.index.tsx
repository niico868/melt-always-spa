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
    <div className="lg:h-full flex flex-col px-3 sm:px-4 pt-3 pb-4 gap-3 lg:overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 flex-shrink-0">
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#1A1A2E] leading-tight truncate">
            Welcome back, <span className="text-[#E8246A]">Krystal C</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500">Here's what's happening with your spa today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 bg-white flex items-center gap-1.5 whitespace-nowrap">
            <CalendarDays size={14} className="text-gray-400" />
            <span className="hidden xs:inline sm:inline">May 24, 2025</span>
            <span className="xs:hidden sm:hidden">May 24</span>
          </button>
          <button className="bg-[#E8246A] text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-[#C91D5C] transition-colors whitespace-nowrap">
            <Plus size={14} />
            <span className="hidden sm:inline">New appointment</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Main area: content grid + quick actions rail */}
      <div className="lg:flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_170px] gap-3">
        <div className="lg:min-h-0 grid lg:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-3">
          {/* KPI strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard data={appointmentsKpi} />
            <KpiCard data={consultationsKpi} />
            <KpiCard data={customersKpi} />
            <KpiCard data={salesKpi} />
          </div>
          {/* Middle row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:min-h-0">
            <div className="min-h-[200px] lg:min-h-0"><RecentSales /></div>
            <div className="min-h-[200px] lg:min-h-0"><RecentConsultations /></div>
            <div className="min-h-[200px] lg:min-h-0"><TopServicesChart /></div>
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:min-h-0">
            <div className="lg:min-h-0"><AlertsTray /></div>
            <div className="lg:min-h-0"><UpcomingAppointments /></div>
            <div className="lg:min-h-0 min-h-[220px]"><ConsultationChart /></div>
          </div>
        </div>
        <div className="lg:min-h-0">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}