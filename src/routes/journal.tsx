import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [
    { title: "Treatment Journal — Melt Aways" },
    { name: "description", content: "Educational content, treatment guidance, seasonal preparation tips, and body sculpting education from Melt Aways." },
    { property: "og:title", content: "Treatment Journal — Melt Aways" },
    { property: "og:description", content: "Treatment guidance, preparation tips, and body sculpting education from the Melt Aways team." },
  ]}),
  component: Journal,
});

const articles = [
  { slug: "carnival-prep", title: "When To Start Body Sculpting Before Carnival", excerpt: "How early most clients begin treatment plans for a confident Carnival season." },
  { slug: "fat-vs-tightening", title: "Fat Melting vs Skin Tightening", excerpt: "Two different treatment goals. Here is how we help clients understand the difference." },
  { slug: "first-consultation", title: "What To Know Before Your First Consultation", excerpt: "Simple guidance so you can feel comfortable and prepared at your first visit." },
  { slug: "prep-body-contouring", title: "How To Prepare For Body Contouring Treatments", excerpt: "Hydration, lifestyle, and the small steps that support your treatment plan." },
  { slug: "visiting-clients", title: "Treatment Planning For Visiting Clients", excerpt: "A simple guide for clients flying in for Carnival, Christmas, weddings, and vacation." },
];

function Journal() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center mb-14">
        <Eyebrow>Treatment Journal</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink leading-tight">Honest guidance, treatment education, and seasonal preparation.</h1>
        <p className="mt-5 text-taupe leading-relaxed">
          A growing library of articles from the Melt Aways team. We share what we share with clients in consultation,
          so you can feel informed before you book.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(a => (
          <article key={a.slug} className="bg-background rounded-3xl border border-border/60 card-shadow p-7 flex flex-col">
            <div className="aspect-[16/9] rounded-2xl bg-blush mb-5" aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Article</p>
            <h2 className="mt-2 text-xl text-ink leading-snug">{a.title}</h2>
            <p className="mt-3 text-sm text-taupe leading-relaxed flex-1">{a.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm text-primary font-medium">
              Read soon <ArrowRight className="w-4 h-4" />
            </span>
          </article>
        ))}
      </div>
      <p className="text-center mt-12 text-sm text-taupe">
        More articles coming soon. <Link to="/booking" className="text-primary font-medium hover:underline">Book a consultation</Link> to get answers tailored to your goals.
      </p>
    </Section>
  );
}