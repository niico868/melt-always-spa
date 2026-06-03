import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { FAQS } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ — Melt Aways" },
    { name: "description", content: "Common questions about consultations, treatments, results, and booking at Melt Aways." },
  ]}),
  component: Faq,
});

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="max-w-3xl">
      <div className="text-center mb-12">
        <Eyebrow>questions</Eyebrow>
        <h1 className="text-4xl lg:text-5xl font-light text-ink">Things clients often ask.</h1>
      </div>
      <div className="divide-y divide-border border-y border-border">
        {FAQS.map((f, i) => (
          <div key={f.q} className="py-5">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 text-left">
              <span className="text-lg text-ink">{f.q}</span>
              {open === i ? <Minus className="w-5 h-5 text-primary shrink-0" /> : <Plus className="w-5 h-5 text-primary shrink-0" />}
            </button>
            {open === i && <p className="mt-3 text-taupe leading-relaxed">{f.a}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

*** Add File: src/routes/policies.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { POLICIES } from "@/lib/site";

export const Route = createFileRoute("/policies")({
  head: () => ({ meta: [
    { title: "Policies — Melt Aways" },
    { name: "description", content: "Booking, consultation, deposit, cancellation, refund and privacy policies for Melt Aways." },
  ]}),
  component: Policies,
});

function Policies() {
  return (
    <Section className="max-w-4xl">
      <div className="text-center mb-14">
        <Eyebrow>policies</Eyebrow>
        <h1 className="text-4xl lg:text-5xl font-light text-ink">Our policies.</h1>
        <p className="mt-4 text-sm text-taupe italic">Final policy approval pending — sections will be finalised with the client.</p>
      </div>
      <div className="space-y-6">
        {POLICIES.map(p => (
          <div key={p.title} className="bg-background rounded-3xl border border-border/60 p-7 card-shadow">
            <h2 className="text-xl text-ink">{p.title}</h2>
            <p className="mt-2 text-taupe leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}