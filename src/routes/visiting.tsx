import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, MessageCircle, Check } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { CONCIERGE_WA, waLink } from "@/lib/site";

export const Route = createFileRoute("/visiting")({
  head: () => ({ meta: [
    { title: "Visiting Trinidad — Plan Your Treatment | Melt Aways" },
    { name: "description", content: "Visiting Trinidad for Carnival, Christmas, Summer Trips, or Weddings? Book your consultation before you arrive and let our team plan the right treatment schedule." },,
    { property: "og:title", content: "Visiting Trinidad — Plan Your Treatment | Melt Aways" },
    { property: "og:description", content: "Plan body sculpting, skin tightening and facial treatments before you land in Trinidad." },
  ]}),
  component: Visiting,
});

function Visiting() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", country: "", travelDates: "", occasion: "", interest: "",
    concern: "", branch: "", whatsapp: "", urgency: "", priorTreatments: "", medical: "",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = [
      "Hi Melt Aways, I am planning treatment before visiting Trinidad.",
      `Name: ${form.name}`,
      `Country: ${form.country}`,
      `Travel dates: ${form.travelDates}`,
      `Occasion: ${form.occasion}`,
      `Treatment interest: ${form.interest}`,
      `Main concern: ${form.concern}`,
      `Preferred branch: ${form.branch}`,
      `WhatsApp: ${form.whatsapp}`,
      `Results timing: ${form.urgency}`,
      `Prior body treatments: ${form.priorTreatments}`,
      `Medical conditions or medications: ${form.medical}`,
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setDone(true);
  }

  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <Eyebrow>Visiting Trinidad?</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink leading-tight">Plan your treatment before you arrive.</h1>
        <p className="mt-5 text-taupe leading-relaxed">
          Visiting Trinidad for Carnival, Christmas, Summer Trips, or Weddings? Share a few details and our team will help
          you plan the right treatment schedule around your trip, event dates, and availability.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={CONCIERGE_WA} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-medium soft-shadow hover:opacity-90 transition">
            <MessageCircle className="w-4 h-4" /> Speak With Our Treatment Concierge
          </a>
          <Link to="/timeline" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-medium hover:bg-blush transition">
            See Treatment Timeline
          </Link>
        </div>
      </div>

      {done ? (
        <div className="max-w-2xl mx-auto bg-cream rounded-3xl p-10 text-center card-shadow">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/15 flex items-center justify-center">
            <Check className="w-7 h-7 text-primary" />
          </div>
          <h2 className="mt-5 text-2xl text-ink">Thank you. WhatsApp is opening.</h2>
          <p className="mt-3 text-sm text-taupe">
            Our concierge team will review your travel and treatment details and reply with a recommended plan.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="max-w-3xl mx-auto bg-background rounded-3xl p-8 lg:p-12 card-shadow border border-border/60 grid gap-5">
          <div className="flex items-center gap-3 text-primary"><Plane className="w-5 h-5" /><h2 className="text-xl text-ink">Plan My Visit</h2></div>
          <Row label="Full name"><input required value={form.name} onChange={e => set("name", e.target.value)} className={inp} /></Row>
          <Row label="Country"><input required value={form.country} onChange={e => set("country", e.target.value)} className={inp} placeholder="e.g. United States, Canada, UK" /></Row>
          <Row label="Travel dates in Trinidad"><input required value={form.travelDates} onChange={e => set("travelDates", e.target.value)} className={inp} placeholder="e.g. 12 Feb to 22 Feb" /></Row>
          <Row label="Event or occasion"><input value={form.occasion} onChange={e => set("occasion", e.target.value)} className={inp} placeholder="Carnival, wedding, birthday, vacation" /></Row>
          <Row label="Treatment interest"><input value={form.interest} onChange={e => set("interest", e.target.value)} className={inp} placeholder="Body contouring, skin tightening, facial..." /></Row>
          <Row label="Main concern"><input value={form.concern} onChange={e => set("concern", e.target.value)} className={inp} /></Row>
          <Row label="Preferred branch">
            <select value={form.branch} onChange={e => set("branch", e.target.value)} className={inp}>
              <option value="">Choose a branch</option>
              <option>Woodbrook</option>
              <option>St Augustine</option>
              <option>Either</option>
            </select>
          </Row>
          <Row label="WhatsApp number"><input required value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)} className={inp} placeholder="With country code" /></Row>
          <Row label="How soon do you want visible results?">
            <select value={form.urgency} onChange={e => set("urgency", e.target.value)} className={inp}>
              <option value="">Select a timeframe</option>
              <option>Within the next week</option>
              <option>2 to 4 weeks</option>
              <option>6 to 8 weeks</option>
              <option>3 to 6 months</option>
            </select>
          </Row>
          <Row label="Have you done body treatments before?">
            <select value={form.priorTreatments} onChange={e => set("priorTreatments", e.target.value)} className={inp}>
              <option value="">Select an answer</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </Row>
          <Row label="Any medical conditions or medications we should know?">
            <textarea rows={3} value={form.medical} onChange={e => set("medical", e.target.value)} className={inp} />
          </Row>
          <p className="text-xs text-taupe italic">Submitting opens WhatsApp so our concierge can confirm details and recommend the right plan. No diagnosis is provided online.</p>
          <button type="submit" className="rounded-full bg-primary text-primary-foreground px-7 py-4 font-medium soft-shadow hover:opacity-90 transition">
            Plan My Visit
          </button>
        </form>
      )}
    </Section>
  );
}

const inp = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-ink font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}