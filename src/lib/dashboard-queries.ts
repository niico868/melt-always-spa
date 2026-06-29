import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ServiceRow = { id: string; name: string; base_price: number; fill_color: string };

function startOfMonth(d = new Date()) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function startOfPrevMonth(d = new Date()) { return new Date(d.getFullYear(), d.getMonth() - 1, 1); }

export function useDashboardKpis() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: async () => {
      const today = new Date();
      const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
      const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
      const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();
      const monthStart = startOfMonth().toISOString();
      const prevMonthStart = startOfPrevMonth().toISOString();

      const [aptToday, consWeek, customersMonth, salesMonth, salesPrev] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }).gte("scheduled_at", startToday).lt("scheduled_at", endToday),
        supabase.from("consultations").select("id", { count: "exact", head: true }).gte("submitted_at", weekStart),
        supabase.from("customers").select("id", { count: "exact", head: true }).gte("created_at", monthStart),
        supabase.from("sales").select("amount").gte("sold_at", monthStart),
        supabase.from("sales").select("amount").gte("sold_at", prevMonthStart).lt("sold_at", monthStart),
      ]);

      const sumThis = (salesMonth.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
      const sumPrev = (salesPrev.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
      const trend = sumPrev > 0 ? Math.round(((sumThis - sumPrev) / sumPrev) * 100) : null;

      return {
        appointmentsToday: aptToday.count ?? 0,
        consultationsWeek: consWeek.count ?? 0,
        customersMonth: customersMonth.count ?? 0,
        salesMonth: sumThis,
        salesTrend: trend,
      };
    },
  });
}

export function useRecentSales() {
  return useQuery({
    queryKey: ["dashboard", "recent-sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("id, description, amount, sold_at")
        .order("sold_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpcomingAppointments() {
  return useQuery({
    queryKey: ["dashboard", "upcoming"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, scheduled_at, status, customers(full_name), services(name)")
        .order("scheduled_at", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useRecentConsultations() {
  return useQuery({
    queryKey: ["dashboard", "consultations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("consultations")
        .select("id, client_name, service_name, status, submitted_at, services(name)")
        .order("submitted_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useTopServices() {
  return useQuery({
    queryKey: ["dashboard", "top-services"],
    queryFn: async () => {
      const monthStart = startOfMonth().toISOString();
      const { data, error } = await supabase
        .from("sales")
        .select("amount, services(name, fill_color)")
        .gte("sold_at", monthStart);
      if (error) throw error;
      const buckets = new Map<string, { name: string; revenue: number; fill: string }>();
      for (const row of data ?? []) {
        const svc = (row as any).services;
        const name = svc?.name ?? "Other";
        const fill = svc?.fill_color ?? "#FDF2F7";
        const cur = buckets.get(name) ?? { name, revenue: 0, fill };
        cur.revenue += Number(row.amount);
        buckets.set(name, cur);
      }
      const total = Array.from(buckets.values()).reduce((s, b) => s + b.revenue, 0) || 1;
      return Array.from(buckets.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
        .map(b => ({ ...b, percentage: Math.round((b.revenue / total) * 100) }));
    },
  });
}

export function useConsultationTrend() {
  return useQuery({
    queryKey: ["dashboard", "consult-trend"],
    queryFn: async () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6).toISOString();
      const { data, error } = await supabase
        .from("consultations")
        .select("submitted_at")
        .gte("submitted_at", start);
      if (error) throw error;
      const days: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        days.push({ date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count: 0 });
        for (const row of data ?? []) {
          if (row.submitted_at?.slice(0, 10) === key) days[days.length - 1].count += 1;
        }
      }
      return days;
    },
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ["dashboard", "alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("dismissed", false)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}