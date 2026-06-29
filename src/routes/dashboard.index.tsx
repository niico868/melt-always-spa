import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Plus } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ConsultationChart } from "@/components/dashboard/ConsultationChart";
import { TopServicesChart } from "@/components/dashboard/TopServicesChart";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { RecentConsultations } from "@/components/dashboard/RecentConsultations";
import { EmployeeOverview } from "@/components/dashboard/EmployeeOverview";
import { AlertsTray } from "@/components/dashboard/AlertsTray";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { kpiData } from "@/data/mockData";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="px-5 pt-4 pb-3">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-lg font-bold text-[#1A1A2E]">
            Welcome back, <span className="text-[#E8246A]">Krystal C</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Here's what's happening with your spa today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 bg-white flex items-center gap-2">
            <CalendarDays size={14} className="text-gray-400" />
            May 24, 2025
          </button>
          <button className="bg-[#E8246A] text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2 hover:bg-[#C91D5C] transition-colors">
            <Plus size={14} />
            New appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-3">
        {kpiData.map((k) => <KpiCard key={k.title} data={k} />)}
      </div>

      <div className="grid grid-cols-12 gap-3 mb-3">
        <div className="col-span-5"><ConsultationChart /></div>
        <div className="col-span-4"><TopServicesChart /></div>
        <div className="col-span-3"><RecentSales /></div>
      </div>

      <div className="flex gap-3 pb-1 mb-3 overflow-x-auto">
        <div className="flex-1"><UpcomingAppointments /></div>
        <div className="flex-1"><RecentConsultations /></div>
        <div className="flex-1"><EmployeeOverview /></div>
      </div>

      <div className="mb-3"><AlertsTray /></div>
      <div><QuickActions /></div>
    </div>
  );
}