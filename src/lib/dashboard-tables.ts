import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ---------- Customers ----------
export type Customer = { id: string; full_name: string; email: string | null; phone: string | null; notes: string | null; created_at: string };
export function useCustomers() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Customer[];
    },
  });
}

// ---------- Sales ----------
export type Sale = {
  id: string; description: string; amount: number; sold_at: string;
  customer_id: string | null; customers: { full_name: string } | null;
};
export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase.from("sales")
        .select("id, description, amount, sold_at, customer_id, customers(full_name)")
        .order("sold_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Sale[];
    },
  });
}

// ---------- Services ----------
export type Service = { id: string; name: string; base_price: number; fill_color: string; created_at: string };
export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as Service[];
    },
  });
}
export function useUpsertService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: { id?: string; name: string; base_price: number; fill_color?: string }) => {
      if (row.id) {
        const { error } = await supabase.from("services").update({ name: row.name, base_price: row.base_price, fill_color: row.fill_color ?? "#FDF2F7" }).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert({ name: row.name, base_price: row.base_price, fill_color: row.fill_color ?? "#FDF2F7" });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}
export function useDeleteService() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

// ---------- Products ----------
export type Product = { id: string; name: string; sku: string | null; price: number; stock: number; low_stock_threshold: number; created_at: string };
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("name");
      if (error) throw error;
      return (data ?? []) as Product[];
    },
  });
}
export function useUpsertProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: { id?: string; name: string; sku: string; price: number; stock: number; low_stock_threshold: number }) => {
      const payload = { name: row.name, sku: row.sku || null, price: row.price, stock: row.stock, low_stock_threshold: row.low_stock_threshold };
      if (row.id) {
        const { error } = await supabase.from("products").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

// ---------- Employees ----------
export type Employee = { id: string; full_name: string; role: string; avatar_tone: string; slots_total: number; created_at: string };
export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase.from("employees").select("*").order("full_name");
      if (error) throw error;
      return (data ?? []) as Employee[];
    },
  });
}
export function useUpsertEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: { id?: string; full_name: string; role: string; slots_total: number; avatar_tone?: string }) => {
      const payload = { full_name: row.full_name, role: row.role, slots_total: row.slots_total, avatar_tone: row.avatar_tone ?? "#FDF2F7" };
      if (row.id) {
        const { error } = await supabase.from("employees").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("employees").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}
export function useDeleteEmployee() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("employees").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
}

// ---------- Consultations (Interest Tracking) ----------
export type Consultation = { id: string; client_name: string; service_name: string | null; status: string; submitted_at: string };
export function useConsultations() {
  return useQuery({
    queryKey: ["consultations", "all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("consultations")
        .select("id, client_name, service_name, status, submitted_at")
        .order("submitted_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Consultation[];
    },
  });
}
export function useUpdateConsultationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consultations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export const CONSULT_STATUSES = [
  "New Lead", "Contacted", "Consultation Booked", "Treatment Recommended",
  "Package Offered", "Paid", "Completed", "Follow-Up Needed", "Not Suitable", "Lost Lead",
] as const;

// ---------- Simple modal dialog helper ----------