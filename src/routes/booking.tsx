import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Check, ArrowRight, Home } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { SITE, saveLead, waLink, type Lead } from "@/lib/site";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [
    { title: "Book Consultation — Melt Aways" },
    { name: "description", content: "Start with a consultation. We will guide you toward the right treatment path." },
  ]}),
  component: Booking,
});

const concerns = [
  "Fat reduction","Cavitation","Body contouring","Skin tightening","Anti-aging",
  "Wellness","Peptides","Slimming injections","Lymphatic drainage",
  "Muscle toning","Breast filler","Butt filler","Not sure yet",
];

const targetAreaOptions = [
  "Abdomen","Waist","Back","Arms","Thighs","Hips","Buttocks",
  "Breast area","Face","Neck","Chin","Full body","Postpartum area","Not sure yet",
];

type Suggestion = { pkg: string; message: string };

function suggestPackage(concern: string, areas: string[]): Suggestion {
  const c = concern.toLowerCase();
  const a = areas.map(x => x.toLowerCase());
  const has = (...keys: string[]) => keys.some(k => a.includes(k));

  if (c === "not sure yet" || (areas.length === 0 && c === "")) {
    return {
      pkg: "Personal Treatment Consultation",
      message: "Thank you for submitting your consultation request. Since you are not fully sure which treatment is right for you, your starting recommendation is a Personal Treatment Consultation. Our team will review your goals and help guide you toward the most suitable treatment path.",
    };
  }
  if (["fat reduction","cavitation","body contouring"].includes(c) || has("abdomen","waist","back","thighs","hips")) {
    return {
      pkg: "Melt & Contour Plan",
      message: "Thank you for submitting your consultation request. Based on what you selected, your starting recommendation is the Melt & Contour Plan. This is designed for clients looking to reduce stubborn areas, improve body shape, and begin a guided contouring journey. Our team will review your details and confirm the right treatment path for you.",
    };
  }
  if (["skin tightening","anti-aging"].includes(c)) {
    return {
      pkg: "Firm & Glow Plan",
      message: "Thank you for submitting your consultation request. Based on your selections, your starting recommendation is the Firm & Glow Plan. This is designed for clients who want support with firmer-looking skin, smoother texture, and a refreshed appearance. Our team will review your details before confirming the best treatment path.",
    };
  }
  if (["wellness","peptides","slimming injections","lymphatic drainage"].includes(c)) {
    return {
      pkg: "Body Reset Plan",
      message: "Thank you for submitting your consultation request. Based on your selections, your starting recommendation is the Body Reset Plan. This is designed for clients looking for wellness support, drainage, recovery, or guided body support from the inside out. Our team will review your details and contact you with the next step.",
    };
  }
  if (c === "muscle toning") {
    return {
      pkg: "Sculpt & Tone Plan",
      message: "Thank you for submitting your consultation request. Based on your selections, your starting recommendation is the Sculpt & Tone Plan. This is designed for clients who want to support muscle definition, body shape, and a more toned appearance. Our team will review your details and confirm if this is the right fit.",
    };
  }
  if (["breast filler","butt filler"].includes(c)) {
    return {
      pkg: "Shape & Volume Consultation",
      message: "Thank you for submitting your consultation request. Based on your selections, your starting recommendation is a Shape & Volume Consultation. This is for clients interested in enhancement, balance, and body confidence. Our team will review your details carefully and guide you through the safest next step.",
    };
  }
  return {
    pkg: "Personal Treatment Consultation",
    message: "Thank you for submitting your consultation request. Our team will review your goals and help guide you toward the most suitable treatment path.",
  };
}

function Booking() {
  const [submitted, setSubmitted] = useState<Suggestion | null>(null);
  const [consent, setConsent] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [otherArea, setOtherArea] = useState("");

  function toggleArea(area: string) {
    setAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    const f = new FormData(e.currentTarget);
    const concern = String(f.get("concern") || "");
    const allAreas = [...areas, ...(otherArea.trim() ? [otherArea.trim()] : [])];
    const suggestion = suggestPackage(concern, allAreas);
    const lead: Lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "New Lead",
      fullName: String(f.get("fullName") || ""),
      phone: String(f.get("phone") || ""),
      email: String(f.get("email") || ""),
      location: String(f.get("location") || ""),
      concern,
      targetArea: allAreas.join(", "),
      targetAreas: allAreas,
      targetAreaOther: otherArea.trim(),
      priorTreatments: String(f.get("priorTreatments") || ""),
      medical: String(f.get("medical") || ""),
      medication: String(f.get("medication") || ""),
      pregnancy: String(f.get("pregnancy") || ""),
      preferredDate: String(f.get("preferredDate") || ""),
      preferredTime: String(f.get("preferredTime") || ""),
      notes: String(f.get("notes") || ""),
      suggestedPackage: suggestion.pkg,
    };
    saveLead(lead);
    setSubmitted(suggestion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    const waMsg = `Hi Melt Aways, I completed the consultation form and my suggested package was ${submitted.pkg}. I would like to continue with booking.`;
    return (
      <Section className="max-w-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-blush text-primary flex items-center justify-center mx-auto"><Check className="w-7 h-7" /></div>
        <Eyebrow>Thank You</Eyebrow>
        <h1 className="text-3xl lg:text-5xl font-light text-ink">Your request has been received.</h1>
        <p className="mt-5 text-taupe leading-relaxed">
          Thank you for trusting Melt Aways. Your consultation request has been received. Based on your answers,
          we have suggested a starting package below. Our team will review your details and contact you to confirm
          the right treatment path.
        </p>
        <div className="mt-8 bg-background border border-border/60 rounded-3xl p-7 text-left card-shadow">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Suggested Package</p>
          <h2 className="mt-2 font-script text-4xl text-gold leading-tight">{submitted.pkg}</h2>
          <p className="mt-4 text-taupe leading-relaxed">{submitted.message}</p>
          <p className="mt-4 text-xs italic text-taupe">
            This is a suggested starting point. Final treatment must be confirmed by Melt Aways after consultation.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={waLink(waMsg)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3.5 font-medium">
            <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
          </a>
          <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-medium soft-shadow">
            View Treatments <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 font-medium hover:bg-blush transition">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="max-w-3xl">
      <div className="text-center mb-12 bg-cream rounded-3xl px-6 py-10 border border-border/60">
        <Eyebrow>Find Your Treatment Path</Eyebrow>
        <h1 className="text-4xl lg:text-5xl font-light text-ink">Start with a consultation.</h1>
        <p className="mt-3 text-ink/70 font-medium">Take the guesswork out of your body journey.</p>
        <p className="mt-4 text-ink/70 leading-relaxed max-w-xl mx-auto">
          Fill out the form below and receive a tailored starting package based on your goals, plus
          personalised tips from our team. Honest guidance, no pressure, no diagnosis. Just a clear
          first step toward feeling confident in your body.
        </p>
      </div>
      <form onSubmit={onSubmit} className="bg-background rounded-3xl border border-border/60 card-shadow p-7 lg:p-10 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name" name="fullName" required />
          <Field label="Phone number" name="phone" type="tel" required />
          <Field label="Email" name="email" type="email" required />
          <Select label="Preferred location" name="location" options={["Woodbrook","St Augustine"]} required />
          <Select label="Main concern" name="concern" options={concerns} required />
          <Field label="Prior body or aesthetic treatments?" name="priorTreatments" placeholder="Yes / No, brief notes" />
          <Field label="Medical conditions?" name="medical" placeholder="Yes / No, brief notes" />
          <Field label="Medication?" name="medication" placeholder="Yes / No, brief notes" />
          <Select label="Pregnant or recently postpartum?" name="pregnancy" options={["No","Yes, pregnant","Yes, postpartum","Prefer not to say"]} required />
          <Field label="Preferred appointment date" name="preferredDate" type="date" />
          <Field label="Preferred time" name="preferredTime" type="time" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Target area <span className="text-taupe font-normal">(select all that apply)</span></label>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {targetAreaOptions.map(opt => {
              const checked = areas.includes(opt);
              return (
                <label key={opt}
                  className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm cursor-pointer transition ${checked ? "bg-blush border-primary text-primary" : "bg-cream/40 border-input text-ink hover:border-primary/50"}`}>
                  <input type="checkbox" className="accent-primary"
                    checked={checked} onChange={() => toggleArea(opt)} />
                  {opt}
                </label>
              );
            })}
          </div>
          <input
            value={otherArea}
            onChange={e => setOtherArea(e.target.value)}
            placeholder="Other (please specify)"
            className="mt-3 w-full rounded-2xl border border-input bg-cream/40 px-4 py-3 outline-none focus:border-primary transition" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Notes or goals</label>
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
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/20 px-7 py-4 font-medium hover:bg-blush transition inline-flex items-center gap-2">
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