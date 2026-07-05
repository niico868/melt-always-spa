import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, Plus, Search, Check, Pencil, Trash2, Phone, Mail, CalendarPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ColumnFilterButton, applyColumnFilters, type ColumnFilters, type FilterDef } from "@/components/dashboard/ColumnFilter";

type Range = "today" | "week" | "month" | "all";
type Status = "all" | "New" | "Contacted" | "Booked" | "Closed";

function rangeBounds(r: Range) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (r === "today") {
    const end = new Date(start); end.setDate(end.getDate() + 1);
    return { gte: start.toISOString(), lt: end.toISOString() };
  }
  if (r === "week") {
    const s = new Date(start); s.setDate(s.getDate() - 7);
    return { gte: s.toISOString(), lt: null as string | null };
  }
  if (r === "month") {
    const s = new Date(now.getFullYear(), now.getMonth(), 1);
    return { gte: s.toISOString(), lt: null as string | null };
  }
  return { gte: null as string | null, lt: null as string | null };
}

function useConsultations(range: Range, status: Status, q: string) {
  return useQuery({
    queryKey: ["consultations-page", range, status, q],
    queryFn: async () => {
      const { gte, lt } = rangeBounds(range);
      let query = supabase
        .from("consultations")
        .select("id, client_name, service_name, status, submitted_at, customer_id, service_id, customers(id, full_name, email, phone), services(id, name, base_price)")
        .order("submitted_at", { ascending: false });
      if (gte) query = query.gte("submitted_at", gte);
      if (lt) query = query.lt("submitted_at", lt);
      if (status !== "all") query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      const rows = data ?? [];
      const needle = q.trim().toLowerCase();
      if (!needle) return rows;
      return rows.filter((r: any) =>
        (r.client_name ?? "").toLowerCase().includes(needle) ||
        (r.services?.name ?? r.service_name ?? "").toLowerCase().includes(needle) ||
        (r.customers?.email ?? "").toLowerCase().includes(needle),
      );
    },
  });
}

function useLookups() {
  return useQuery({
    queryKey: ["cons-lookups"],
    queryFn: async () => {
      const [customers, services] = await Promise.all([
        supabase.from("customers").select("id, full_name, email, phone").order("full_name"),
        supabase.from("services").select("id, name, base_price").order("name"),
      ]);
      return { customers: customers.data ?? [], services: services.data ?? [] };
    },
  });
}

function statusClasses(s: string) {
  switch (s) {
    case "Booked": return "bg-green-50 text-green-700 border-green-200";
    case "Contacted": return "bg-amber-50 text-amber-700 border-amber-200";
    case "Closed": return "bg-gray-100 text-gray-600 border-gray-200";
    default: return "bg-blue-50 text-blue-700 border-blue-200";
  }
}

export function ConsultationsPage() {
  const qc = useQueryClient();
  const [range, setRange] = useState<Range>("month");
  const [status, setStatus] = useState<Status>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [bookFrom, setBookFrom] = useState<any | null>(null);

  const { data: rawRows = [], isLoading } = useConsultations(range, status, q);
  const [colFilters, setColFilters] = useState<ColumnFilters>({});
  const filterDefs: FilterDef[] = [
    { key: "client", label: "Client", type: "text", get: (r: any) => r.client_name ?? "" },
    { key: "email", label: "Email", type: "text", get: (r: any) => r.customers?.email ?? "" },
    { key: "phone", label: "Phone", type: "text", get: (r: any) => r.customers?.phone ?? "" },
    { key: "service", label: "Service", get: (r: any) => r.services?.name ?? r.service_name ?? "" },
    { key: "status", label: "Status", get: (r: any) => r.status ?? "" },
    { key: "date", label: "Submitted", type: "text", get: (r: any) => new Date(r.submitted_at).toLocaleDateString() },
  ];
  const rows = applyColumnFilters(rawRows as any[], filterDefs, colFilters);

  const stats = useMemo(() => {
    const total = rows.length;
    const fresh = rows.filter((r: any) => r.status === "New").length;
    const contacted = rows.filter((r: any) => r.status === "Contacted").length;
    const booked = rows.filter((r: any) => r.status === "Booked").length;
    return { total, fresh, contacted, booked };
  }, [rows]);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consultations-page"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Consultation updated");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to update"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("consultations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["consultations-page"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Consultation deleted");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to delete"),
  });

  return (
    <div className="h-full overflow-auto px-3 sm:px-4 pt-3 pb-6 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#1A1A2E] leading-tight">Consultations</h1>
          <p className="text-xs text-gray-500">Track inbound leads from consultation submissions through to booked appointments.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }} className="bg-[#E8246A] hover:bg-[#C91D5C] text-white">
          <Plus size={16} /> New consultation
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total in view" value={stats.total} tone="pink" />
        <StatCard label="New" value={stats.fresh} tone="blue" />
        <StatCard label="Contacted" value={stats.contacted} tone="amber" />
        <StatCard label="Booked" value={stats.booked} tone="green" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex gap-1 bg-gray-50 rounded-lg p-1">
          {(["today","week","month","all"] as Range[]).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium capitalize transition ${range === r ? "bg-white shadow text-[#E8246A]" : "text-gray-500 hover:text-gray-700"}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by client, service, or email…" className="pl-8 h-9" />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
          <SelectTrigger className="w-full md:w-[160px] h-9 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Booked">Booked</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <ColumnFilterButton defs={filterDefs} rows={rawRows as any[]} filters={colFilters} onChange={setColFilters} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
              <tr>
                <th className="text-left font-medium px-3 py-2">Submitted</th>
                <th className="text-left font-medium px-3 py-2">Client</th>
                <th className="text-left font-medium px-3 py-2">Contact</th>
                <th className="text-left font-medium px-3 py-2">Service interest</th>
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
                  <ClipboardList className="mx-auto mb-2" size={20} />
                  No consultations in this view.
                </td></tr>
              )}
              {rows.map((c: any) => {
                const d = new Date(c.submitted_at);
                const email = c.customers?.email;
                const phone = c.customers?.phone;
                return (
                  <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
                      <div className="text-[11px] text-gray-500">{d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</div>
                    </td>
                    <td className="px-3 py-2 font-medium text-gray-900">{c.client_name}</td>
                    <td className="px-3 py-2 text-gray-700">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        {email && <a href={`mailto:${email}`} className="flex items-center gap-1 hover:text-[#E8246A]"><Mail size={11} />{email}</a>}
                        {phone && <a href={`tel:${phone}`} className="flex items-center gap-1 hover:text-[#E8246A]"><Phone size={11} />{phone}</a>}
                        {!email && !phone && <span className="text-gray-400">No contact on file</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-gray-700">{c.services?.name ?? c.service_name ?? "—"}</td>
                    <td className="px-3 py-2">
                      <span className={`border rounded-full px-2 py-0.5 text-[11px] font-medium ${statusClasses(c.status)}`}>{c.status}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1 items-center justify-end">
                        {c.status === "New" && (
                          <button title="Mark contacted" onClick={() => updateStatus.mutate({ id: c.id, status: "Contacted" })}
                            className="p-1.5 rounded hover:bg-amber-50 text-amber-600"><Check size={14} /></button>
                        )}
                        {c.status !== "Booked" && (
                          <button title="Mark booked" onClick={() => updateStatus.mutate({ id: c.id, status: "Booked" })}
                            className="p-1.5 rounded hover:bg-green-50 text-green-700 text-[11px] font-semibold">Booked</button>
                        )}
                        <button title="Create appointment" onClick={() => setBookFrom(c)}
                          className="p-1.5 rounded hover:bg-pink-50 text-[#E8246A]"><CalendarPlus size={14} /></button>
                        <button title="Edit" onClick={() => { setEditing(c); setOpen(true); }}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500"><Pencil size={14} /></button>
                        <button title="Delete" onClick={() => { if (confirm("Delete this consultation?")) remove.mutate(c.id); }}
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

      <ConsultationDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSaved={() => {
          qc.invalidateQueries({ queryKey: ["consultations-page"] });
          qc.invalidateQueries({ queryKey: ["dashboard"] });
        }}
      />

      <BookFromConsultationDialog
        consultation={bookFrom}
        onOpenChange={(v) => { if (!v) setBookFrom(null); }}
        onBooked={() => {
          qc.invalidateQueries({ queryKey: ["consultations-page"] });
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
        <ClipboardList size={18} />
      </div>
    </div>
  );
}

function ConsultationDialog({
  open, onOpenChange, editing, onSaved,
}: { open: boolean; onOpenChange: (v: boolean) => void; editing: any | null; onSaved: () => void; }) {
  const { data: lookups } = useLookups();
  const [clientName, setClientName] = useState("");
  const [customerId, setCustomerId] = useState<string>("");
  const [serviceId, setServiceId] = useState<string>("");
  const [status, setStatus] = useState<string>("New");
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useMemo(() => {
    if (!open) return;
    setClientName(editing?.client_name ?? "");
    setCustomerId(editing?.customers?.id ?? "");
    setServiceId(editing?.services?.id ?? "");
    setStatus(editing?.status ?? "New");
    setNotes("");
  }, [open, editing]);

  async function save() {
    if (!clientName.trim()) {
      toast.error("Client name is required");
      return;
    }
    setSaving(true);
    const svc = (lookups?.services ?? []).find((s: any) => s.id === serviceId);
    const payload: any = {
      client_name: clientName.trim(),
      customer_id: customerId || null,
      service_id: serviceId || null,
      service_name: svc?.name ?? null,
      status,
    };
    const res = editing
      ? await supabase.from("consultations").update(payload).eq("id", editing.id)
      : await supabase.from("consultations").insert(payload);
    setSaving(false);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(editing ? "Consultation updated" : "Consultation logged");
    onOpenChange(false);
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit consultation" : "New consultation"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label className="text-xs">Client name</Label>
            <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Full name" />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs">Existing customer (optional)</Label>
            <Select value={customerId || "none"} onValueChange={(v) => {
              const id = v === "none" ? "" : v;
              setCustomerId(id);
              const c = (lookups?.customers ?? []).find((x: any) => x.id === id);
              if (c && !clientName.trim()) setClientName(c.full_name);
            }}>
              <SelectTrigger><SelectValue placeholder="Link to customer" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not linked</SelectItem>
                {(lookups?.customers ?? []).map((c: any) => (
                  <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label className="text-xs">Service interest</Label>
              <Select value={serviceId || "none"} onValueChange={(v) => setServiceId(v === "none" ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Service" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  {(lookups?.services ?? []).map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xs">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs">Notes (optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Internal notes…" rows={3} />
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

function toLocalInput(iso?: string | null) {
  const d = iso ? new Date(iso) : new Date(Date.now() + 24 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function BookFromConsultationDialog({
  consultation, onOpenChange, onBooked,
}: { consultation: any | null; onOpenChange: (v: boolean) => void; onBooked: () => void; }) {
  const open = !!consultation;
  const { data: lookups } = useLookups();
  const [when, setWhen] = useState<string>(toLocalInput());
  const [employeeId, setEmployeeId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const customerId = consultation?.customers?.id ?? consultation?.customer_id ?? null;
  const serviceId = consultation?.services?.id ?? consultation?.service_id ?? null;

  useMemo(() => { if (open) { setWhen(toLocalInput()); setEmployeeId(""); } }, [open]);

  const { data: employees = [] } = useQuery({
    queryKey: ["employees-list"],
    queryFn: async () => (await supabase.from("employees").select("id, full_name").order("full_name")).data ?? [],
  });

  async function book() {
    if (!customerId) { toast.error("Link this consultation to a customer first"); return; }
    if (!serviceId) { toast.error("Pick a service on the consultation first"); return; }
    setSaving(true);
    const ins = await supabase.from("appointments").insert({
      customer_id: customerId,
      service_id: serviceId,
      employee_id: employeeId || null,
      scheduled_at: new Date(when).toISOString(),
      status: "Confirmed",
    });
    if (ins.error) { setSaving(false); toast.error(ins.error.message); return; }
    await supabase.from("consultations").update({ status: "Booked" }).eq("id", consultation.id);
    setSaving(false);
    toast.success("Appointment booked from consultation");
    onOpenChange(false);
    onBooked();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book appointment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 text-sm">
          <div className="text-xs text-gray-500">
            For <span className="font-medium text-gray-900">{consultation?.client_name}</span>
            {consultation?.services?.name && <> · {consultation.services.name}</>}
          </div>
          {!customerId && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
              This consultation isn't linked to a customer record. Edit it to link before booking.
            </div>
          )}
          <div className="grid gap-1.5">
            <Label className="text-xs">When</Label>
            <Input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs">Therapist (optional)</Label>
            <Select value={employeeId || "none"} onValueChange={(v) => setEmployeeId(v === "none" ? "" : v)}>
              <SelectTrigger><SelectValue placeholder="Unassigned" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Unassigned</SelectItem>
                {employees.map((e: any) => (
                  <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={saving || !customerId || !serviceId} onClick={book} className="bg-[#E8246A] hover:bg-[#C91D5C] text-white">
            {saving ? "Booking…" : "Book appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}