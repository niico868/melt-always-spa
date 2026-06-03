import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section, Eyebrow } from "@/components/Section";
import { getLeads, updateLead, LEAD_STATUSES, type Lead } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin — Melt Aways" },
    { name: "robots", content: "noindex" },
  ]}),
  component: Admin,
});

const SECTIONS = ["Leads","Consultation Requests","Bookings","Customers","Payments","Packages","Products","Reviews","Gallery Uploads","Staff Notes","Treatment History","Session Tracking"];

function Admin() {
  const [active, setActive] = useState("Leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => { setLeads(getLeads()); }, [tick]);

  return (
    <Section>
      <div className="mb-10">
        <Eyebrow>admin</Eyebrow>
        <h1 className="text-3xl lg:text-5xl font-light text-ink">Dashboard</h1>
        <p className="mt-2 text-sm text-taupe">Private foundation — leads currently stored in browser. Connect Lovable Cloud to persist across devices.</p>
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
          {active === "Leads" || active === "Consultation Requests" ? (
            <LeadsTable leads={leads} onChange={() => setTick(t => t+1)} />
          ) : (
            <div className="bg-background rounded-3xl border border-border/60 p-10 text-center text-taupe">
              <p className="font-script text-3xl text-gold mb-2">coming soon</p>
              <p>{active} — foundation in place, ready to be expanded.</p>
            </div>
          )}
        </div>
      </div>
    </Section>
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
                <td className="px-4 py-3 text-taupe">{l.concern}<div className="text-xs">{l.targetArea}</div></td>
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