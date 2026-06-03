import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import portrait from "@/assets/portrait-1.jpg";
import reception from "@/assets/reception.jpg";
import petals from "@/assets/petals.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Melt Aways" },
    { name: "description", content: "Melt Aways is a body-contouring and wellness spa in Trinidad & Tobago built around respectful, consultation-led care." },
    { property: "og:title", content: "About Melt Aways" },
    { property: "og:description", content: "A space where women feel seen, respected, and guided." },
  ]}),
  component: About,
});

function About() {
  return (
    <div>
      <Section className="text-center max-w-3xl">
        <Eyebrow>about us</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink leading-tight">A wellness home built for confidence.</h1>
        <p className="mt-6 text-lg text-taupe leading-relaxed">
          Melt Aways was built to give women a place where they can feel seen, respected, and guided through body and wellness
          treatments without judgement. We combine body-contouring services, wellness treatments, anti-aging support, and
          personalised consultation to help clients make informed decisions and feel confident in their results.
        </p>
      </Section>
      <Section className="!py-0 grid lg:grid-cols-2 gap-10">
        <div className="rounded-[2rem] overflow-hidden aspect-[4/5]"><img src={portrait} alt="Confident client" className="w-full h-full object-cover" loading="lazy" /></div>
        <div className="rounded-[2rem] overflow-hidden aspect-[4/5]"><img src={reception} alt="Reception" className="w-full h-full object-cover" loading="lazy" /></div>
      </Section>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-[2rem] overflow-hidden aspect-square"><img src={petals} alt="Petals" className="w-full h-full object-cover" loading="lazy" /></div>
          <div>
            <Eyebrow>our values</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-light text-ink">What guides us.</h2>
            <ul className="mt-8 grid grid-cols-2 gap-y-4 gap-x-6 text-ink">
              {["Confidence","Transformation","Care","Respect","Wellness","Privacy","Trust","Empowerment","Personalised Guidance"].map(v => (
                <li key={v} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />{v}</li>
              ))}
            </ul>
            <Link to="/booking" className="mt-10 inline-flex rounded-full bg-primary text-primary-foreground px-7 py-4 font-medium soft-shadow">Book Consultation</Link>
          </div>
        </div>
      </Section>
    </div>
  );
}