import { createFileRoute } from "@tanstack/react-router";
import { Section, Eyebrow } from "@/components/Section";
import a from "@/assets/hero-spa.jpg";
import b from "@/assets/woman-confident.jpg";
import c from "@/assets/equipment.jpg";
import d from "@/assets/petals.jpg";
import e from "@/assets/treatment.jpg";
import f from "@/assets/reception.jpg";
import g from "@/assets/portrait-1.jpg";
import h from "@/assets/products.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery — Melt Aways" },
    { name: "description", content: "A look inside Melt Aways: treatment rooms, behind the scenes, client results, and lifestyle." },
  ]}),
  component: Gallery,
});

const sections = [
  { title: "Treatment Room", imgs: [a, c, f] },
  { title: "Behind the Scenes", imgs: [d, e, c] },
  { title: "Client Results", imgs: [g, b, g] },
  { title: "Before & After", imgs: [b, g, b], note: "Results vary by client. Consultation is required to determine suitable treatment options." },
  { title: "Lifestyle & Brand", imgs: [d, h, a] },
];

function Gallery() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Eyebrow>gallery</Eyebrow>
        <h1 className="text-4xl lg:text-6xl font-light text-ink">Step inside Melt Aways.</h1>
      </div>
      <div className="space-y-20">
        {sections.map(s => (
          <div key={s.title}>
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl text-ink">{s.title}</h2>
              <span className="text-xs text-taupe">Client proof pending</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {s.imgs.map((src, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl overflow-hidden card-shadow">
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
              ))}
            </div>
            {s.note && <p className="mt-4 text-xs italic text-taupe">{s.note}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}