import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Check } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { SITE, saveLead, type Lead } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [
    { title: "Book Consultation — Melt Aways" },
    { name: "description", content: "Start with a consultation. We will guide you toward the right treatment path." },
  ]}),
  component: Booking,
});

const concerns = ["Fat reduction","Skin tightening","Anti-aging","Body contouring","Wellness","Muscle toning","Filler","Lymphatic drainage","Injections","Not sure"];

function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    const f = new FormData(e.currentTarget);
    const lead: Lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "New Lead",
      fullName: String(f.get("fullName") || ""),
      phone: String(f.get("phone") || ""),
      email: String(f.get("email") || ""),
      location: String(f.get("location") || ""),
      concern: String(f.get("concern") || ""),
      targetArea: String(f.get("targetArea") || ""),
      priorTreatments: String(f.get("priorTreatments") || ""),
      medical: String(f.get("medical") || ""),
      medication: String(f.get("medication") || ""),
      pregnancy: String(f.get("pregnancy") || ""),
      preferredDate: String(f.get("preferredDate") || ""),
      preferredTime: String(f.get("preferredTime") || ""),
      notes: String(f.get("notes") || ""),
    };
    saveLead(lead);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <Section className="max-w-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-blush text-primary flex items-center justify-center mx-auto"><Check className="w-7 h-7" /></div>
        <Eyebrow>thank you</Eyebrow>
        <h1 className="text-3xl lg:text-5xl font-light text-ink">We've received your request.</h1>
        <p className="mt-5 text-taupe leading-relaxed">
          Thank you. Melt Aways has received your consultation request. Our team will review your information and
          contact you to guide you toward the right treatment path.
        </p>
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-4 font-medium">
          <MessageCircle className="w-5 h-5" /> Continue on WhatsApp
        </a>
      </Section>
    );
  }

  return (
    <Section className="max-w-3xl">
      <div className="text-center mb-12">
        <Eyebrow>find your treatment path</Eyebrow>
        <h1 className="text-4xl lg:text-5xl font-light text-ink">Start with a consultation.</h1>
        <p className="mt-4 text-taupe">Not sure what to book? Start with a consultation and we'll guide you — respectfully, privately, and without pressure.</p>
      </div>
      <form onSubmit={onSubmit} className="bg-background rounded-3xl border border-border/60 card-shadow p-7 lg:p-10 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" name="fullName" required />
          <Field label="Phone number" name="phone" type="tel" required />
          <Field label="Email" name="email" type="email" required />
          <Select label="Preferred location" name="location" options={["Woodbrook","St Augustine"]} required />
          <Select label="Main concern" name="concern" options={concerns} required />
          <Field label="Target area" name="targetArea" placeholder="e.g. stomach, arms, thighs" />
          <Field label="Prior body / aesthetic treatments?" name="priorTreatments" placeholder="Yes / No — brief notes" />
          <Field label="Medical conditions?" name="medical" placeholder="Yes / No — brief notes" />
          <Field label="Medication?" name="medication" placeholder="Yes / No — brief notes" />
          <Select label="Pregnant or recently postpartum?" name="pregnancy" options={["No","Yes — pregnant","Yes — postpartum","Prefer not to say"]} required />
          <Field label="Preferred appointment date" name="preferredDate" type="date" />
          <Field label="Preferred time" name="preferredTime" type="time" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Notes / goals</label>
          <textarea name="notes" rows={4} className="mt-2 w-full rounded-2xl border border-input bg-cream/40 px-4 py-3 outline-none focus:border-primary transition" />
        </div>
        <label className="flex items-start gap-3 text-sm text-taupe">
          <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-primary" />
          <span>I understand this form does not provide a diagnosis and a professional consultation is required before treatment.</span>
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="rounded-full bg-primary text-primary-foreground px-7 py-4 font-medium soft-shadow hover:opacity-90 transition">
            Start My Consultation
          </button>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="rounded-full border border-ink/20 px-7 py-4 font-medium hover:bg-blush transition inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Message Us Instead
          </a>
        </div>
      </form>
    </Section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}{props.required && <span className="text-primary"> *</span>}</label>
      <input {...props} className="mt-2 w-full rounded-2xl border border-input bg-cream/40 px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}
function Select({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}{required && <span className="text-primary"> *</span>}</label>
      <select name={name} required={required} defaultValue=""
        className="mt-2 w-full rounded-2xl border border-input bg-cream/40 px-4 py-3 outline-none focus:border-primary transition">
        <option value="" disabled>Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}