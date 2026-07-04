import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Pin, Trash2, Plus, Mail, Phone, MapPin, Cake, MessageCircle } from "lucide-react";
import { DashboardPage, PrimaryButton } from "@/components/dashboard/DashboardPage";
import { Modal, Field, inputCls } from "@/components/dashboard/Modal";
import { fmtDate, fmtDateTime, fmtMoney } from "@/components/dashboard/DataTable";
import {
  useCustomer, useCustomerNotes, useAddCustomerNote, useDeleteCustomerNote,
  useCustomerTreatments, useAddCustomerTreatment,
  useCustomerAppointments, useCustomerSales, useCustomerConsultations,
} from "@/lib/dashboard-tables";

export const Route = createFileRoute("/dashboard/customers/$id")({ component: CustomerDetail });

type Tab = "overview" | "treatments" | "appointments" | "consultations" | "sales" | "notes";

function CustomerDetail() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState<Tab>("overview");
  const { data: customer, isLoading } = useCustomer(id);

  if (isLoading) return <DashboardPage title="Loading…"><div className="p-6 text-xs text-gray-400">Loading…</div></DashboardPage>;
  if (!customer) return <DashboardPage title="Not found"><div className="p-6 text-xs text-gray-500">Customer not found. <Link to="/dashboard/customers" className="text-[#E8246A]">Back</Link></div></DashboardPage>;

  return (
    <DashboardPage
      title={customer.full_name}
      subtitle={`Customer since ${fmtDate(customer.created_at)}`}
      actions={<Link to="/dashboard/customers" className="text-xs text-gray-500 hover:text-[#E8246A] inline-flex items-center gap-1"><ArrowLeft size={12} /> Back</Link>}
    >
      <div className="border-b border-gray-100 px-3 flex gap-1 overflow-x-auto flex-shrink-0">
        {(["overview","treatments","appointments","consultations","sales","notes"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 text-xs capitalize whitespace-nowrap border-b-2 ${tab === t ? "border-[#E8246A] text-[#E8246A] font-medium" : "border-transparent text-gray-500 hover:text-gray-700"}`}>{t}</button>
        ))}
      </div>
      <div className="p-4">
        {tab === "overview" && <OverviewTab customer={customer} />}
        {tab === "treatments" && <TreatmentsTab customerId={id} />}
        {tab === "appointments" && <AppointmentsTab customerId={id} />}
        {tab === "consultations" && <ConsultationsTab customerId={id} />}
        {tab === "sales" && <SalesTab customerId={id} />}
        {tab === "notes" && <NotesTab customerId={id} />}
      </div>
    </DashboardPage>
  );
}

function OverviewTab({ customer }: { customer: any }) {
  const { data: sales } = useCustomerSales(customer.id);
  const { data: appts } = useCustomerAppointments(customer.id);
  const lifetime = (sales ?? []).reduce((s, r) => s + Number(r.amount || 0), 0);
  const visits = (appts ?? []).filter(a => a.status === "Completed").length;
  const lastVisit = (appts ?? []).find(a => a.status === "Completed")?.scheduled_at;
  return (
    <div className="grid md:grid-cols-3 gap-3 text-xs">
      <div className="md:col-span-2 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {customer.phone && <InfoRow icon={<Phone size={12} />} label="Phone" value={customer.phone} />}
          {customer.email && <InfoRow icon={<Mail size={12} />} label="Email" value={customer.email} />}
          {customer.date_of_birth && <InfoRow icon={<Cake size={12} />} label="DOB" value={fmtDate(customer.date_of_birth)} />}
          {customer.preferred_contact && <InfoRow icon={<MessageCircle size={12} />} label="Prefers" value={customer.preferred_contact} />}
          {(customer.address || customer.city) && <InfoRow icon={<MapPin size={12} />} label="Address" value={[customer.address, customer.city].filter(Boolean).join(", ")} />}
        </div>
        {customer.tags?.length ? (
          <div className="flex flex-wrap gap-1 pt-2">
            {customer.tags.map((t: string) => <span key={t} className="px-2 py-0.5 rounded-full bg-[#FDF2F7] text-[#E8246A] text-[10px] font-medium">{t}</span>)}
          </div>
        ) : null}
        {customer.notes && <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900"><strong className="block mb-1">Pinned note</strong>{customer.notes}</div>}
      </div>
      <div className="space-y-2">
        <Stat label="Lifetime spend" value={fmtMoney(lifetime)} />
        <Stat label="Visits" value={String(visits)} />
        <Stat label="Last visit" value={lastVisit ? fmtDate(lastVisit) : "—"} />
        <Stat label="Marketing" value={customer.marketing_opt_in ? "Opted in" : "—"} />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
      <span className="mt-0.5 text-gray-400">{icon}</span>
      <div><div className="text-[10px] uppercase tracking-wide text-gray-400">{label}</div><div className="text-gray-800">{value}</div></div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="p-3 bg-gray-50 rounded-lg"><div className="text-[10px] uppercase text-gray-400">{label}</div><div className="text-sm font-semibold text-gray-800">{value}</div></div>;
}

function TreatmentsTab({ customerId }: { customerId: string }) {
  const { data, isLoading } = useCustomerTreatments(customerId);
  const add = useAddCustomerTreatment();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-[11px] text-gray-500">Auto-logged when an appointment is marked Completed, or add manually.</p>
        <button onClick={() => setOpen(true)} className="text-xs text-[#E8246A] inline-flex items-center gap-1"><Plus size={12} /> Log treatment</button>
      </div>
      {isLoading ? <p className="text-xs text-gray-400">Loading…</p> :
        !data?.length ? <p className="text-xs text-gray-400 py-6 text-center">No treatments logged yet.</p> :
        <ul className="space-y-2">
          {data.map(t => (
            <li key={t.id} className="border border-gray-100 rounded-lg p-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-800">{t.service_name}{t.session_number ? ` · Session ${t.session_number}` : ""}</div>
                  <div className="text-gray-500">{fmtDateTime(t.performed_at)}{t.employee_name ? ` · ${t.employee_name}` : ""}</div>
                </div>
                <div className="text-right text-gray-800 font-medium">{fmtMoney(t.price)}</div>
              </div>
              {t.outcome_notes && <p className="mt-2 text-gray-600">{t.outcome_notes}</p>}
            </li>
          ))}
        </ul>
      }
      <Modal open={open} onClose={() => setOpen(false)} title="Log treatment">
        <form onSubmit={e => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          add.mutate({
            customer_id: customerId,
            service_name: String(f.get("service_name") || "").trim(),
            employee_name: String(f.get("employee_name") || "").trim() || null,
            performed_at: String(f.get("performed_at") || new Date().toISOString()),
            session_number: Number(f.get("session_number")) || null,
            price: Number(f.get("price")) || null,
            outcome_notes: String(f.get("outcome_notes") || "").trim() || null,
          } as any, { onSuccess: () => setOpen(false) });
        }}>
          <Field label="Service"><input name="service_name" required className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date"><input name="performed_at" type="datetime-local" defaultValue={new Date().toISOString().slice(0,16)} className={inputCls} /></Field>
            <Field label="Session #"><input name="session_number" type="number" min={1} className={inputCls} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Employee"><input name="employee_name" className={inputCls} /></Field>
            <Field label="Price (TT$)"><input name="price" type="number" step="0.01" className={inputCls} /></Field>
          </div>
          <Field label="Outcome notes"><textarea name="outcome_notes" rows={3} className={inputCls} /></Field>
          <div className="flex justify-end gap-2"><button type="button" onClick={() => setOpen(false)} className="px-3 py-1.5 text-xs text-gray-600">Cancel</button><PrimaryButton type="submit">{add.isPending ? "Saving…" : "Save"}</PrimaryButton></div>
        </form>
      </Modal>
    </div>
  );
}

function AppointmentsTab({ customerId }: { customerId: string }) {
  const { data, isLoading } = useCustomerAppointments(customerId);
  if (isLoading) return <p className="text-xs text-gray-400">Loading…</p>;
  if (!data?.length) return <p className="text-xs text-gray-400 py-6 text-center">No appointments.</p>;
  return <ul className="space-y-2">{data.map((a: any) => (
    <li key={a.id} className="border border-gray-100 rounded-lg p-3 text-xs flex justify-between">
      <div><div className="font-medium text-gray-800">{a.services?.name ?? "Service"}</div><div className="text-gray-500">{fmtDateTime(a.scheduled_at)}{a.employees?.full_name ? ` · ${a.employees.full_name}` : ""}</div></div>
      <span className="text-gray-600">{a.status}</span>
    </li>
  ))}</ul>;
}

function ConsultationsTab({ customerId }: { customerId: string }) {
  const { data, isLoading } = useCustomerConsultations(customerId);
  if (isLoading) return <p className="text-xs text-gray-400">Loading…</p>;
  if (!data?.length) return <p className="text-xs text-gray-400 py-6 text-center">No consultations.</p>;
  return <ul className="space-y-2">{data.map((c: any) => (
    <li key={c.id} className="border border-gray-100 rounded-lg p-3 text-xs flex justify-between">
      <div><div className="font-medium text-gray-800">{c.service_name ?? "General"}</div><div className="text-gray-500">{fmtDateTime(c.submitted_at)}</div></div>
      <span className="text-gray-600">{c.status}</span>
    </li>
  ))}</ul>;
}

function SalesTab({ customerId }: { customerId: string }) {
  const { data, isLoading } = useCustomerSales(customerId);
  const total = (data ?? []).reduce((s, r: any) => s + Number(r.amount || 0), 0);
  if (isLoading) return <p className="text-xs text-gray-400">Loading…</p>;
  if (!data?.length) return <p className="text-xs text-gray-400 py-6 text-center">No sales.</p>;
  return <div>
    <div className="text-[11px] text-gray-500 mb-2">Lifetime: <span className="font-semibold text-gray-800">{fmtMoney(total)}</span></div>
    <ul className="space-y-2">{data.map((s: any) => (
      <li key={s.id} className="border border-gray-100 rounded-lg p-3 text-xs flex justify-between">
        <div><div className="font-medium text-gray-800">{s.description}</div><div className="text-gray-500">{fmtDate(s.sold_at)}</div></div>
        <span className="text-gray-800 font-medium">{fmtMoney(s.amount)}</span>
      </li>
    ))}</ul>
  </div>;
}

function NotesTab({ customerId }: { customerId: string }) {
  const { data, isLoading } = useCustomerNotes(customerId);
  const add = useAddCustomerNote();
  const del = useDeleteCustomerNote();
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!body.trim()) return;
        add.mutate({ customer_id: customerId, body: body.trim(), pinned }, { onSuccess: () => { setBody(""); setPinned(false); } });
      }} className="mb-3">
        <textarea value={body} onChange={e => setBody(e.target.value)} rows={2} placeholder="Add a note…" className={inputCls} />
        <div className="flex justify-between items-center mt-2">
          <label className="text-[11px] text-gray-500 flex items-center gap-1"><input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} /> Pin</label>
          <PrimaryButton type="submit">{add.isPending ? "Saving…" : "Add note"}</PrimaryButton>
        </div>
      </form>
      {isLoading ? <p className="text-xs text-gray-400">Loading…</p> :
        !data?.length ? <p className="text-xs text-gray-400 py-6 text-center">No notes yet.</p> :
        <ul className="space-y-2">
          {data.map(n => (
            <li key={n.id} className={`border rounded-lg p-3 text-xs ${n.pinned ? "border-amber-200 bg-amber-50" : "border-gray-100"}`}>
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1"><p className="text-gray-800 whitespace-pre-wrap">{n.body}</p><div className="text-[10px] text-gray-400 mt-1">{fmtDateTime(n.created_at)}{n.pinned && <span className="ml-2 inline-flex items-center gap-1 text-amber-700"><Pin size={9} /> Pinned</span>}</div></div>
                <button onClick={() => { if (confirm("Delete note?")) del.mutate({ id: n.id, customer_id: customerId }); }} className="text-gray-300 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}