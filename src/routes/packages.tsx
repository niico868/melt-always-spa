import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { PACKAGES } from "@/lib/site";

export const Route = createFileRoute("/packages")({
  head: () => ({ meta: [
    { title: "Treatment Packages — Melt Aways" },
    { name: "description", content: "Curated treatment packages: Sculpt & Smooth, Melt & Tighten, Glow & Firm, Full Body Confidence, Wellness Reset." },
  ]}),
  component: Packages,
});

function Packages() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Eyebrow>Treatment Packages</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink leading-tight">Plans built for your goals.</h1>
        <p className="mt-5 text-taupe">Final pricing is shared after consultation so we can match the right combination of treatments to you.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PACKAGES.map(p => (
          <article key={p.name} className="bg-background rounded-3xl p-8 border border-border/60 card-shadow flex flex-col">
            <p className="font-script text-2xl text-gold leading-none">Package</p>
            <h3 className="mt-1 text-2xl text-ink">{p.name}</h3>
            <p className="mt-3 text-sm text-taupe leading-relaxed">{p.desc}</p>
            <div className="mt-5 text-xs uppercase tracking-wider text-primary">Best for</div>
            <p className="text-sm text-ink">{p.bestFor}</p>
            <div className="mt-5 text-xs uppercase tracking-wider text-primary">Includes</div>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {p.includes.map(i => <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5" />{i}</li>)}
            </ul>
            <div className="mt-6 pt-6 border-t border-border text-sm text-taupe italic">Price shared after consultation</div>
            <Link to="/booking" className="mt-5 inline-flex justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium soft-shadow hover:opacity-90 transition">Book Consultation</Link>
          </article>
        ))}
      </div>
    </Section>
  );
}