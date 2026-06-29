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
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">
            Welcome back, <span className="text-[#E8246A]">Krystal C</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your spa today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 bg-white flex items-center gap-2">
            <CalendarDays size={16} className="text-gray-400" />
            May 24, 2025
          </button>
          <button className="bg-[#E8246A] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#C91D5C] transition-colors">
            <Plus size={16} />
            New appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-6">
        {kpiData.map((k) => <KpiCard key={k.title} data={k} />)}
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-5"><ConsultationChart /></div>
        <div className="col-span-4"><TopServicesChart /></div>
        <div className="col-span-3"><RecentSales /></div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-5"><UpcomingAppointments /></div>
        <div className="col-span-4"><RecentConsultations /></div>
        <div className="col-span-3"><EmployeeOverview /></div>
      </div>

      <div className="mb-6"><AlertsTray /></div>
      <div className="mb-2"><QuickActions /></div>
    </div>
  );
}