import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Plus, Search, Check, X, Pencil, Trash2, Clock, List, Calendar as CalIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ColumnFilterButton, applyColumnFilters, type ColumnFilters, type FilterDef } from "@/components/dashboard/ColumnFilter";

type Range = "today" | "week" | "upcoming" | "all";
type Status = "all" | "Pending" | "Confirmed" | "Completed" | "Cancelled";

function rangeBounds(r: Range) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (r === "today") {
    const end = new Date(start); end.setDate(end.getDate() + 1);
    return { gte: start.toISOString(), lt: end.toISOString() };
  }
  if (r === "week") {
    const end = new Date(start); end.setDate(end.getDate() + 7);
    return { gte: start.toISOString(), lt: end.toISOString() };
  }
  if (r === "upcoming") {
    return { gte: now.toISOString(), lt: null as string | null };
  }
  return { gte: null as string | null, lt: null as string | null };
}

function useAppointments(range: Range, status: Status, q: string) {
  return useQuery({
    queryKey: ["appointments", range, status, q],
    queryFn: async () => {
      const { gte, lt } = rangeBounds(range);
      let query = supabase
        .from("appointments")
        .select("id, scheduled_at, status, customers(id, full_name), services(id, name, base_price), employees(id, full_name)")
        .order("scheduled_at", { ascending: true });
      if (gte) query = query.gte("scheduled_at", gte);
      if (lt) query = query.lt("scheduled_at", lt);
      if (status !== "all") query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      const rows = data ?? [];
      const needle = q.trim().toLowerCase();
      if (!needle) return rows;
      return rows.filter((r: any) =>
        (r.customers?.full_name ?? "").toLowerCase().includes(needle) ||
        (r.services?.name ?? "").toLowerCase().includes(needle),
      );
    },
  });
}

function useLookups() {
  return useQuery({
    queryKey: ["appt-lookups"],
    queryFn: async () => {
      const [customers, services, employees] = await Promise.all([
        supabase.from("customers").select("id, full_name").order("full_name"),
        supabase.from("services").select("id, name, base_price").order("name"),
        supabase.from("employees").select("id, full_name").order("full_name"),
      ]);
      return {
        customers: customers.data ?? [],
        services: services.data ?? [],
        employees: employees.data ?? [],
      };
    },
  });
}

function useDayAppointments(date: string) {
  return useQuery({
    queryKey: ["appointments-day", date],
    queryFn: async () => {
      const start = new Date(date + "T00:00:00");
      const end = new Date(start); end.setDate(end.getDate() + 1);
      const { data, error } = await supabase
        .from("appointments")
        .select("id, scheduled_at, status, customers(id, full_name), services(id, name, base_price), employees(id, full_name)")
        .gte("scheduled_at", start.toISOString())
        .lt("scheduled_at", end.toISOString())
        .order("scheduled_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

function DayTimeline({ rows, isLoading, onEdit }: { rows: any[]; isLoading: boolean; onEdit: (a: any) => void }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8am → 7pm
  const byHour = new Map<number, any[]>();
  rows.forEach(r => {
    const h = new Date(r.scheduled_at).getHours();
    const arr = byHour.get(h) ?? []; arr.push(r); byHour.set(h, arr);
  });
  if (isLoading) return <div className="bg-white rounded-xl border border-gray-100 p-6 text-xs text-gray-400 text-center">Loading…</div>;
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
      {hours.map(h => {
        const items = byHour.get(h) ?? [];
        return (
          <div key={h} className="flex gap-3 px-3 py-2 min-h-[54px]">
            <div className="w-14 text-[11px] text-gray-400 font-medium pt-1">
              {h > 12 ? h - 12 : h}:00 {h >= 12 ? "PM" : "AM"}
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              {items.length === 0 && <div className="text-[11px] text-gray-300 italic pt-1">— free —</div>}
              {items.map(a => (
                <button key={a.id} onClick={() => onEdit(a)}
                  className={`text-left rounded-lg border px-2.5 py-1.5 text-[11px] hover:shadow transition ${statusClasses(a.status)}`}>
                  <div className="font-semibold">{new Date(a.scheduled_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {a.customers?.full_name ?? "—"}</div>
                  <div className="opacity-80">{a.services?.name ?? "—"}{a.employees?.full_name ? ` · ${a.employees.full_name}` : ""}</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function statusClasses(s: string) {
  switch (s) {
    case "Confirmed": return "bg-green-50 text-green-700 border-green-200";
    case "Completed": return "bg-blue-50 text-blue-700 border-blue-200";
    case "Cancelled": return "bg-rose-50 text-rose-700 border-rose-200";
    default: return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export function AppointmentsPage() {
  const qc = useQueryClient();
  const [range, setRange] = useState<Range>("upcoming");
  const [status, setStatus] = useState<Status>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [view, setView] = useState<"list" | "day">("list");
  const [dayDate, setDayDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const listQ = useAppointments(range, status, q);
  const dayQ = useDayAppointments(dayDate);
  const rawRows = view === "list" ? (listQ.data ?? []) : (dayQ.data ?? []);
  const isLoading = view === "list" ? listQ.isLoading : dayQ.isLoading;
  const [colFilters, setColFilters] = useState<ColumnFilters>({});
  const filterDefs: FilterDef[] = [
    { key: "client", label: "Client", type: "text", get: (r: any) => r.customers?.full_name ?? "" },
    { key: "service", label: "Service", get: (r: any) => r.services?.name ?? "" },
    { key: "therapist", label: "Therapist", get: (r: any) => r.employees?.full_name ?? "" },
    { key: "status", label: "Status", get: (r: any) => r.status ?? "" },
    { key: "date", label: "Date", type: "text", get: (r: any) => new Date(r.scheduled_at).toLocaleDateString() },
  ];
  const rows = applyColumnFilters(rawRows as any[], filterDefs, colFilters);

  const stats = useMemo(() => {
    const total = rows.length;
    const confirmed = rows.filter((r: any) => r.status === "Confirmed").length;
    const pending = rows.filter((r: any) => r.status === "Pending").length;
    const completed = rows.filter((r: any) => r.status === "Completed").length;
    return { total, confirmed, pending, completed };
  }, [rows]);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Appointment updated");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to update"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Appointment deleted");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to delete"),
  });

  return (
    <div className="h-full overflow-auto px-3 sm:px-4 pt-3 pb-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#1A1A2E] leading-tight">Appointments</h1>
          <p className="text-xs text-gray-500">Schedule, confirm, and manage client bookings.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-[#E8246A] hover:bg-[#C91D5C] text-white">
          <Plus size={16} /> New appointment
        </Button>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total in view" value={stats.total} tone="pink" />
        <StatCard label="Confirmed" value={stats.confirmed} tone="green" />
        <StatCard label="Pending" value={stats.pending} tone="amber" />
        <StatCard label="Completed" value={stats.completed} tone="blue" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
          <button onClick={() => setView("list")}
            className={`px-2.5 py-1.5 text-xs rounded-md font-medium inline-flex items-center gap-1 ${view==="list" ? "bg-white shadow text-[#E8246A]" : "text-gray-500"}`}>
            <List size={12} /> List
          </button>
          <button onClick={() => setView("day")}
            className={`px-2.5 py-1.5 text-xs rounded-md font-medium inline-flex items-center gap-1 ${view==="day" ? "bg-white shadow text-[#E8246A]" : "text-gray-500"}`}>
            <CalIcon size={12} /> Day
          </button>
        </div>
        {view === "day" ? (
          <Input type="date" value={dayDate} onChange={e => setDayDate(e.target.value)} className="h-9 w-full md:w-[170px]" />
        ) : (
        <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
          {(["today","week","upcoming","all"] as Range[]).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium capitalize transition ${range === r ? "bg-white shadow text-[#E8246A]" : "text-gray-500 hover:text-gray-700"}`}>
              {r}
            </button>
          ))}
        </div>
        )}
        {view === "list" && (
          <>
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by client or service…" className="pl-8 h-9" />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
          <SelectTrigger className="w-full md:w-[160px] h-9 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <ColumnFilterButton defs={filterDefs} rows={rawRows as any[]} filters={colFilters} onChange={setColFilters} />
          </>
        )}
        {view === "day" && (
          <ColumnFilterButton defs={filterDefs} rows={rawRows as any[]} filters={colFilters} onChange={setColFilters} />
        )}
      </div>

      {view === "day" ? (
        <DayTimeline rows={rows} isLoading={isLoading} onEdit={(a) => { setEditing(a); setOpen(true); }} />
      ) : (
      /* Table */
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
              <tr>
                <th className="text-left font-medium px-3 py-2">When</th>
                <th className="text-left font-medium px-3 py-2">Client</th>
                <th className="text-left font-medium px-3 py-2">Service</th>
                <th className="text-left font-medium px-3 py-2">Therapist</th>
                <th className="text-left font-medium px-3 py-2">Status</th>
                <th className="text-right font-medium px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={6} className="px-3 py-6 text-center text-xs text-gray-400">Loading…</td></tr>
              )}
              {!isLoading && rows.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-10 text-center text-xs text-gray-400">
                  <Clock className="mx-auto mb-2" size={20} />
                  No appointments in this view.
                </td></tr>
              )}
              {rows.map((a: any) => {
                const d = new Date(a.scheduled_at);
                return (
                  <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
                      <div className="text-[11px] text-gray-500">{d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</div>
                    </td>
                    <td className="px-3 py-2 font-medium text-gray-900">{a.customers?.full_name ?? "—"}</td>
                    <td className="px-3 py-2 text-gray-700">{a.services?.name ?? "—"}</td>
                    <td className="px-3 py-2 text-gray-700">{a.employees?.full_name ?? <span className="text-gray-400">Unassigned</span>}</td>
                    <td className="px-3 py-2">
                      <span className={`border rounded-full px-2 py-0.5 text-[11px] font-medium ${statusClasses(a.status)}`}>{a.status}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1 items-center justify-end">
                        {a.status !== "Confirmed" && (
                          <button title="Confirm" onClick={() => updateStatus.mutate({ id: a.id, status: "Confirmed" })}
                            className="p-1.5 rounded hover:bg-green-50 text-green-600"><Check size={14} /></button>
                        )}
                        {a.status !== "Completed" && (
                          <button title="Mark completed" onClick={() => updateStatus.mutate({ id: a.id, status: "Completed" })}
                            className="p-1.5 rounded hover:bg-blue-50 text-blue-600 text-[11px] font-semibold">Done</button>
                        )}
                        {a.status !== "Cancelled" && (
                          <button title="Cancel" onClick={() => updateStatus.mutate({ id: a.id, status: "Cancelled" })}
                            className="p-1.5 rounded hover:bg-rose-50 text-rose-600"><X size={14} /></button>
                        )}
                        <button title="Edit" onClick={() => { setEditing(a); setOpen(true); }}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Pencil size={14} /></button>
                        <button title="Delete" onClick={() => { if (confirm("Delete this appointment?")) remove.mutate(a.id); }}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}

      <AppointmentDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSaved={() => {
          qc.invalidateQueries({ queryKey: ["appointments"] });
          qc.invalidateQueries({ queryKey: ["dashboard"] });
        }}
      />
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: "pink" | "green" | "amber" | "blue" }) {
  const tones: Record<string, string> = {
    pink: "bg-[#FDF2F7] text-[#E8246A]",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex items-center justify-between">
      <div>
        <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
        <div className="text-2xl font-bold text-gray-900 leading-tight">{value}</div>
      </div>
      <div className={`size-9 rounded-lg flex items-center justify-center ${tones[tone]}`}>
        <CalendarDays size={18} />
      </div>
    </div>
  );
}

function toLocalInput(iso?: string | null) {
  const d = iso ? new Date(iso) : new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function AppointmentDialog({
  open, onOpenChange, editing, onSaved,
}: { open: boolean; onOpenChange: (v: boolean) => void; editing: any | null; onSaved: () => void; }) {
  const { data: lookups } = useLookups();
  const [customerId, setCustomerId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [when, setWhen] = useState<string>(toLocalInput());
  const [status, setStatus] = useState<string>("Pending");
  const [saving, setSaving] = useState(false);

  // Reset when opening / editing changes
  useMemo(() => {
    if (!open) return;
    setCustomerId(editing?.customers?.id ?? "");
    setServiceId(editing?.services?.id ?? "");
    setEmployeeId(editing?.employees?.id ?? "");
    setWhen(toLocalInput(editing?.scheduled_at ?? null));
    setStatus(editing?.status ?? "Pending");
  }, [open, editing]);

  async function save() {
    if (!customerId || !serviceId || !when) {
      toast.error("Client, service, and time are required");
      return;
    }
    setSaving(true);
    const payload = {
      customer_id: customerId,
      service_id: serviceId,
      employee_id: employeeId || null,
      scheduled_at: new Date(when).toISOString(),
      status,
    };
    const res = editing
      ? await supabase.from("appointments").update(payload).eq("id", editing.id)
      : await supabase.from("appointments").insert(payload);
    setSaving(false);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(editing ? "Appointment updated" : "Appointment created");
    onOpenChange(false);
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit appointment" : "New appointment"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label className="text-xs">Client</Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
              <SelectContent>
                {(lookups?.customers ?? []).map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs">Service</Label>
            <Select value={serviceId} onValueChange={setServiceId}>
              <SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger>
              <SelectContent>
                {(lookups?.services ?? []).map((s: any) => (
                  <SelectItem key={s.id} value={s.id}>{s.name} — TT${Number(s.base_price).toLocaleString()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs">Therapist (optional)</Label>
            <Select value={employeeId || "none"} onValueChange={(v) => setEmployeeId(v === "none" ? "" : v)}>
              <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Unassigned</SelectItem>
                {(lookups?.employees ?? []).map((e: any) => (
                  <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">When</Label>
              <Input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={saving} onClick={save} className="bg-[#E8246A] hover:bg-[#C91D5C] text-white">
            {saving ? "Saving…" : editing ? "Save changes" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}