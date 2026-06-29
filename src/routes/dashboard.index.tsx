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
    <div className="px-6 pt-5 pb-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A2E]">
            Welcome back, <span className="text-[#E8246A]">Krystal C</span>
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with your spa today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white flex items-center gap-2">
            <CalendarDays size={16} className="text-gray-400" />
            May 24, 2025
          </button>
          <button className="bg-[#E8246A] text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 hover:bg-[#C91D5C] transition-colors">
            <Plus size={16} />
            New appointment
          </button>
        </div>
      </div>

      {/* Upper zone: 3 / 6 / 3 — KPIs / middle stack / Quick Actions rail */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-3 flex flex-col gap-4">
          <KpiCard data={appointmentsKpi} />
          <KpiCard data={consultationsKpi} />
          <KpiCard data={customersKpi} />
        </div>
        <div className="col-span-6 flex flex-col gap-4">
          <KpiCard data={salesKpi} />
          <RecentSales />
          <AlertsTray />
        </div>
        <div className="col-span-3">
          <QuickActions />
        </div>
      </div>

      {/* Lower zone: Consultation submissions + Top services */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-7"><RecentConsultations /></div>
        <div className="col-span-5"><TopServicesChart /></div>
      </div>

      {/* Bottom zone: 7-day chart + Upcoming appointments */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7"><ConsultationChart /></div>
        <div className="col-span-5"><UpcomingAppointments /></div>
      </div>
    </div>
  );
}