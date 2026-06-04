import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { SERVICES } from "@/lib/site";
import t1 from "@/assets/treatment.jpg";
import t2 from "@/assets/equipment.jpg";
import t3 from "@/assets/petals.jpg";
import t4 from "@/assets/woman-confident.jpg";
import t5 from "@/assets/reception.jpg";
import t6 from "@/assets/hero-spa.jpg";
import t7 from "@/assets/products.jpg";
import t8 from "@/assets/portrait-1.jpg";

const imgs = [t1, t2, t3, t4, t5, t6, t7, t8, t1, t2, t3, t4];

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — Melt Aways" },
    { name: "description", content: "Body-contouring, fat melting, skin tightening, anti-aging, cavitation, lymphatic drainage and more — consultation-led at Melt Aways." },
  ]}),
  component: Services,
});

function Services() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Eyebrow>Our Treatments</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink leading-tight">Treatments designed around you.</h1>
        <p className="mt-5 text-taupe">Each service begins with a consultation so we can recommend the right path for your goals.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <article key={s.slug} className="group bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow flex flex-col">
            <div className="aspect-[4/3] overflow-hidden bg-blush">
              <img src={imgs[i]} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <h3 className="text-xl text-ink">{s.name}</h3>
              <p className="mt-2 text-sm text-taupe flex-1 leading-relaxed">{s.desc}</p>
              <div className="mt-3 text-xs text-taupe/70">Service price pending · Duration pending</div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <Link to="/booking" className="text-primary font-medium hover:underline">Book Consultation</Link>
                <span className="text-border">·</span>
                <Link to="/packages" className="text-ink font-medium hover:underline">View Packages</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}