import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { getLeads, updateLead, LEAD_STATUSES, type Lead } from "@/lib/site";
import { getSession, signOut, getTreatments, getUsers, type TreatmentRecord, type ClientProfile } from "@/lib/auth";
import { Search, LogOut, TrendingUp, Calendar, Users, DollarSign, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin — Melt Aways" },
    { name: "robots", content: "noindex" },
  ]}),
  component: Admin,
});

const SECTIONS = ["Dashboard","Leads","Consultation Requests","Customers","Treatment History","Daily Sales","Bookings","Payments","Packages","Products","Reviews","Gallery Uploads","Staff Notes"];

function Admin() {
  const nav = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const [customers, setCustomers] = useState<ClientProfile[]>([]);
  const [tick, setTick] = useState(0);
  const [me, setMe] = useState<ClientProfile | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s || (s.role !== "admin" && s.role !== "staff")) { nav({ to: "/login" }); return; }
    setMe(s);
    setLeads(getLeads());
    setTreatments(getTreatments());
    setCustomers(getUsers());
  }, [tick, nav]);

  if (!me) return null;

  return (
    <Section>
      <ConstructionBanner />
      <div className="mb-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{me.role === "admin" ? "Admin Portal" : "Staff Portal"}</Eyebrow>
            <h1 className="text-3xl lg:text-5xl font-light text-ink">Dashboard</h1>
            <p className="mt-2 text-sm text-taupe">Signed in as <span className="text-ink">{me.fullName}</span> · {me.email}</p>
          </div>
          <button onClick={() => { signOut(); nav({ to: "/" }); }} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:bg-blush transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="bg-background rounded-3xl border border-border/60 p-4 h-fit">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActive(s)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm transition ${active === s ? "bg-blush text-primary font-medium" : "text-taupe hover:bg-cream"}`}>
              {s}
            </button>
          ))}
        </aside>
        <div>
          {active === "Dashboard" && <Overview leads={leads} treatments={treatments} customers={customers} />}
          {(active === "Leads" || active === "Consultation Requests") && <LeadsTable leads={leads} onChange={() => setTick(t => t+1)} />}
          {active === "Customers" && <CustomersPanel customers={customers} />}
          {active === "Treatment History" && <TreatmentsPanel treatments={treatments} />}
          {active === "Daily Sales" && <SalesPanel treatments={treatments} />}
          {!["Dashboard","Leads","Consultation Requests","Customers","Treatment History","Daily Sales"].includes(active) && (
            <div className="bg-background rounded-3xl border border-border/60 p-10 text-center text-taupe">
              <p className="font-script text-3xl text-gold mb-2">Coming Soon</p>
              <p>{active}. Foundation in place, ready to be expanded.</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function ConstructionBanner() {
  return (
    <div className="mb-6 rounded-2xl px-5 py-3 text-center text-white font-medium tracking-wide"
      style={{ background: "linear-gradient(90deg, #F472B6, #EC4899, #F472B6)" }}>
      ✦ Dashboard under construction — preview build ✦
    </div>
  );
}

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-background border border-border/60 rounded-3xl p-5 card-shadow">
      <div className="flex items-center gap-2 text-taupe text-xs uppercase tracking-wider"><span className="text-primary">{icon}</span>{label}</div>
      <div className="mt-2 text-2xl font-light text-ink">{value}</div>
      {sub && <div className="text-xs text-taupe mt-1">{sub}</div>}
    </div>
  );
}

function Overview({ leads, treatments, customers }: { leads: Lead[]; treatments: TreatmentRecord[]; customers: ClientProfile[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = treatments.filter(t => t.date === today && t.status === "Completed").reduce((s, t) => s + t.amount, 0);
  const weekSales = treatments.filter(t => {
    const d = new Date(t.date).getTime();
    return t.status === "Completed" && (Date.now() - d) < 7 * 86400000;
  }).reduce((s, t) => s + t.amount, 0);
  const newLeads = leads.filter(l => l.status === "New Lead").length;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<DollarSign className="w-4 h-4" />} label="Today's Sales" value={`TT$${todaySales.toLocaleString()}`} sub="Completed treatments" />
        <Stat icon={<TrendingUp className="w-4 h-4" />} label="Last 7 Days" value={`TT$${weekSales.toLocaleString()}`} />
        <Stat icon={<Users className="w-4 h-4" />} label="Registered Clients" value={String(customers.length)} sub={`${newLeads} new lead${newLeads === 1 ? "" : "s"}`} />
        <Stat icon={<Calendar className="w-4 h-4" />} label="Sessions This Week" value={String(treatments.filter(t => (Date.now() - new Date(t.date).getTime()) < 7 * 86400000).length)} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-background border border-border/60 rounded-3xl p-6 card-shadow">
          <h3 className="font-medium text-ink mb-3">Recent Leads</h3>
          {leads.slice(0, 5).map(l => (
            <div key={l.id} className="flex justify-between py-2 border-b border-border/40 last:border-0 text-sm">
              <div><div className="text-ink">{l.fullName || "—"}</div><div className="text-xs text-taupe">{l.concern}</div></div>
              <span className="text-xs rounded-full bg-blush text-primary px-2.5 py-1 self-start">{l.status}</span>
            </div>
          )) || <p className="text-sm text-taupe">No leads yet.</p>}
          {!leads.length && <p className="text-sm text-taupe">No leads yet.</p>}
        </div>
        <div className="bg-background border border-border/60 rounded-3xl p-6 card-shadow">
          <h3 className="font-medium text-ink mb-3">Recent Sessions</h3>
          {treatments.slice(0, 5).map(t => (
            <div key={t.id} className="flex justify-between py-2 border-b border-border/40 last:border-0 text-sm">
              <div><div className="text-ink">{t.service}</div><div className="text-xs text-taupe">{t.practitioner} · {t.date}</div></div>
              <span className="text-ink">TT${t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomersPanel({ customers }: { customers: ClientProfile[] }) {
  const [q, setQ] = useState("");
  const filtered = customers.filter(c => [c.fullName, c.email, c.phone].join(" ").toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="bg-background border border-border/60 rounded-3xl card-shadow overflow-hidden">
      <div className="p-5 border-b border-border/60 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search clients by name, email, phone…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-cream border border-input text-sm outline-none focus:border-primary" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs text-taupe"><Filter className="w-3 h-3" /> Filters</button>
        <button className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs text-taupe"><Download className="w-3 h-3" /> Export</button>
      </div>
      {filtered.length === 0 ? (
        <div className="p-10 text-center text-taupe text-sm">No clients match. Clients who sign up appear here.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left text-xs uppercase tracking-wider text-taupe">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">DOB</th><th className="px-4 py-3">Joined</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 text-ink">{c.fullName}</td>
                  <td className="px-4 py-3 text-taupe"><div>{c.email}</div><div className="text-xs">{c.phone}</div></td>
                  <td className="px-4 py-3 text-taupe">{c.dob || "—"}</td>
                  <td className="px-4 py-3 text-taupe">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TreatmentsPanel({ treatments }: { treatments: TreatmentRecord[] }) {
  const [q, setQ] = useState("");
  const [practitioner, setPractitioner] = useState("");
  const [service, setService] = useState("");
  const practitioners = useMemo(() => Array.from(new Set(treatments.map(t => t.practitioner))), [treatments]);
  const services = useMemo(() => Array.from(new Set(treatments.map(t => t.service))), [treatments]);
  const filtered = treatments.filter(t =>
    (!q || [t.service, t.area, t.practitioner, t.clerk].join(" ").toLowerCase().includes(q.toLowerCase())) &&
    (!practitioner || t.practitioner === practitioner) &&
    (!service || t.service === service)
  );
  return (
    <div className="bg-background border border-border/60 rounded-3xl card-shadow overflow-hidden">
      <div className="p-5 border-b border-border/60 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search sessions…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-cream border border-input text-sm outline-none focus:border-primary" />
        </div>
        <select value={practitioner} onChange={e => setPractitioner(e.target.value)} className="rounded-full bg-cream border border-input px-4 py-2.5 text-sm">
          <option value="">All practitioners</option>{practitioners.map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={service} onChange={e => setService(e.target.value)} className="rounded-full bg-cream border border-input px-4 py-2.5 text-sm">
          <option value="">All services</option>{services.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs uppercase tracking-wider text-taupe">
            <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Service</th><th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Practitioner</th><th className="px-4 py-3">Clerk</th>
              <th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Amount</th></tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-t border-border">
                <td className="px-4 py-3 text-ink">{t.date}</td>
                <td className="px-4 py-3 text-ink">{t.service}</td>
                <td className="px-4 py-3 text-taupe">{t.area}</td>
                <td className="px-4 py-3 text-taupe">{t.practitioner}</td>
                <td className="px-4 py-3 text-taupe">{t.clerk}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-blush text-primary text-xs px-3 py-1">{t.status}</span></td>
                <td className="px-4 py-3 text-right text-ink">TT${t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalesPanel({ treatments }: { treatments: TreatmentRecord[] }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const filtered = treatments.filter(t => t.status === "Completed" &&
    (!from || t.date >= from) && (!to || t.date <= to));
  const total = filtered.reduce((s, t) => s + t.amount, 0);
  const byDay = filtered.reduce<Record<string, number>>((acc, t) => { acc[t.date] = (acc[t.date] || 0) + t.amount; return acc; }, {});
  return (
    <div className="space-y-5">
      <div className="bg-background border border-border/60 rounded-3xl p-5 card-shadow flex flex-wrap gap-3 items-end">
        <div><label className="text-xs text-taupe">From</label><input type="date" value={from} onChange={e => setFrom(e.target.value)} className="block mt-1 rounded-2xl bg-cream border border-input px-3 py-2 text-sm" /></div>
        <div><label className="text-xs text-taupe">To</label><input type="date" value={to} onChange={e => setTo(e.target.value)} className="block mt-1 rounded-2xl bg-cream border border-input px-3 py-2 text-sm" /></div>
        <div className="ml-auto text-right">
          <div className="text-xs text-taupe uppercase tracking-wider">Total</div>
          <div className="text-3xl font-light text-ink">TT${total.toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-background border border-border/60 rounded-3xl card-shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs uppercase tracking-wider text-taupe">
            <tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Sessions</th><th className="px-4 py-3 text-right">Sales</th></tr>
          </thead>
          <tbody>
            {Object.entries(byDay).sort(([a], [b]) => b.localeCompare(a)).map(([d, amt]) => (
              <tr key={d} className="border-t border-border">
                <td className="px-4 py-3 text-ink">{d}</td>
                <td className="px-4 py-3 text-taupe">{filtered.filter(t => t.date === d).length}</td>
                <td className="px-4 py-3 text-right text-ink">TT${amt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadsTable({ leads, onChange }: { leads: Lead[]; onChange: () => void }) {
  if (!leads.length) {
    return <div className="bg-background rounded-3xl border border-border/60 p-10 text-center text-taupe">No leads yet. Submissions from the Booking page will appear here.</div>;
  }
  return (
    <div className="bg-background rounded-3xl border border-border/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left text-xs uppercase tracking-wider text-taupe">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Concern</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.id} className="border-t border-border align-top">
                <td className="px-4 py-3"><div className="font-medium text-ink">{l.fullName}</div><div className="text-xs text-taupe">{new Date(l.createdAt).toLocaleString()}</div></td>
                <td className="px-4 py-3 text-taupe"><div>{l.phone}</div><div>{l.email}</div></td>
                <td className="px-4 py-3 text-taupe">{l.location}</td>
                <td className="px-4 py-3 text-taupe">
                  {l.concern}
                  <div className="text-xs">{l.targetArea}</div>
                  {l.suggestedPackage && <div className="text-xs text-primary mt-1">Suggested: {l.suggestedPackage}</div>}
                </td>
                <td className="px-4 py-3 text-taupe">{l.preferredDate} {l.preferredTime}</td>
                <td className="px-4 py-3">
                  <select defaultValue={l.status}
                    onChange={e => { updateLead(l.id, { status: e.target.value as Lead["status"] }); onChange(); }}
                    className="rounded-full bg-blush text-primary text-xs px-3 py-1.5 border-none outline-none">
                    {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}