import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { MessageCircle, MapPin, Clock, Heart, Sparkles, ArrowRight, Plane } from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { SERVICES, REVIEWS, SITE, CONCIERGE_WA } from "@/lib/site";
import { getActiveSeason } from "@/lib/season";
import heroSpa from "@/assets/hero-spa.jpg";
import womanConfident from "@/assets/woman-confident.jpg";
import equipment from "@/assets/equipment.jpg";
import petals from "@/assets/petals.jpg";
import treatment from "@/assets/treatment.jpg";
import reception from "@/assets/reception.jpg";
import homeModel1 from "@/assets/home-model-1.jpg";
import homeModel2 from "@/assets/home-model-2.jpg";
import homeModel3 from "@/assets/home-model-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melt Aways — Reveal the You Inside | Body Contouring Spa T&T" },
      { name: "description", content: "Premium body-contouring, fat melting, skin tightening, anti-aging and wellness treatments. Woodbrook & St Augustine, Trinidad & Tobago." },
      { property: "og:title", content: "Melt Aways — Reveal the You Inside" },
      { property: "og:description", content: "Premium body-contouring & wellness spa in Trinidad & Tobago." },
    ],
  }),
  component: Index,
});

function Index() {
  const season = getActiveSeason();
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blush via-background to-cream" />
        <div className="absolute top-20 -right-32 w-[480px] h-[480px] rounded-full bg-rose/40 blur-3xl -z-10" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 lg:pt-20 pb-16 lg:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-script text-5xl lg:text-7xl text-gold leading-none">Welcome to Melt Aways</p>
            <h1 className="mt-5 text-xl lg:text-2xl font-light tracking-tight text-ink leading-snug">
              Plan your body sculpting before <em className="not-italic font-script text-primary text-3xl lg:text-4xl">Carnival, Christmas, summer trips, weddings,</em> and special events.
            </h1>
            <p className="mt-6 text-lg text-taupe max-w-xl leading-relaxed">
              Not every treatment is right for every body. We start with consultation, then recommend the
              best direction based on your goals, timeline, body concerns, and health history.
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.2em] text-primary/80">
              Personable care · Respectful service · Empowering results
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-medium hover:opacity-90 transition soft-shadow">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/visiting" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 font-medium hover:bg-blush transition">
                <Plane className="w-4 h-4" /> Visiting Trinidad?
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-4 text-sm text-taupe hover:text-primary">
                <MessageCircle className="w-4 h-4" /> Message us on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-sm">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden card-shadow">
              <img src={homeModel1} alt="Melt Aways client portrait" className="w-full h-full object-cover" width={1024} height={1280} />
            </div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-3xl overflow-hidden card-shadow hidden md:block">
              <img src={petals} alt="Rose petals" className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
            </div>
            <div className="absolute -top-4 -right-4 bg-background rounded-2xl px-4 py-3 card-shadow hidden md:flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold" />
              <div className="text-xs"><div className="font-medium">Consultation led</div><div className="text-taupe">no diagnosis, no pressure</div></div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-border bg-background/60 backdrop-blur">
          <div className="mx-auto max-w-7xl px-5 lg:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <TrustItem icon={<MapPin className="w-4 h-4" />} title="Two locations" text="Woodbrook & St Augustine" />
            <TrustItem icon={<Clock className="w-4 h-4" />} title="Open daily" text="8 AM to 4 PM" />
            <TrustItem icon={<Heart className="w-4 h-4" />} title="Personalised" text="Consultation led treatments" />
            <TrustItem icon={<Sparkles className="w-4 h-4" />} title="Women & men" text="Body & wellness confidence" />
          </div>
        </div>
      </section>

      {/* SEASONAL CAMPAIGN BLOCK */}
      <Section className="!py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush via-background to-cream border border-border/60 card-shadow">
          <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full bg-rose/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-10 lg:p-16 items-center">
            <div>
              <p className="font-script text-4xl lg:text-5xl text-gold leading-none">In Season Now</p>
              <h2 className="mt-2 text-3xl lg:text-5xl font-light text-ink leading-tight">{season.title}</h2>
              <p className="mt-5 text-taupe leading-relaxed">{season.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/booking" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium soft-shadow hover:opacity-90 transition">{season.cta}</Link>
                <Link to="/timeline" className="rounded-full border border-ink/20 px-6 py-3 font-medium hover:bg-blush transition">See Treatment Timeline</Link>
              </div>
            </div>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden card-shadow max-w-sm mx-auto w-full">
              <img src={homeModel2} alt="Melt Aways client preparing for the season" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </Section>

      {/* INTRO */}
      <Section className="text-center max-w-3xl">
        <Eyebrow>Our Philosophy</Eyebrow>
        <h2 className="text-3xl lg:text-5xl font-light text-ink leading-tight">
          Not every treatment is right for every body.
        </h2>
        <p className="mt-6 text-lg text-taupe leading-relaxed">
          We start with consultation, then recommend the best direction based on your goals, timeline,
          and health history. We help clients plan ahead of Carnival, Christmas, weddings, vacations,
          birthdays, and everyday confidence moments.
        </p>
      </Section>

      {/* SERVICES */}
      <Section className="!py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow>Treatments</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-light text-ink">Find the path that suits you.</h2>
          </div>
          <Link to="/services" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            All services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} image={[treatment, equipment, petals, womanConfident, reception, heroSpa][i]} />
          ))}
        </div>
      </Section>

      {/* VISITING TRINIDAD */}
      <Section>
        <div className="rounded-[2.5rem] bg-cream p-10 lg:p-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-script text-4xl lg:text-5xl text-gold leading-none">Visiting Trinidad & Tobago 🇹🇹</p>
            <h2 className="mt-2 text-3xl lg:text-5xl font-light text-ink leading-tight">Plan your treatment before you arrive.</h2>
            <p className="mt-5 text-taupe leading-relaxed">
              Visiting Trinidad for Carnival, Christmas, or vacation? Book your consultation before you
              arrive and let our team help you plan the right treatment schedule around your trip, event
              dates, and availability.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/visiting" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium soft-shadow hover:opacity-90 transition">
                <Plane className="w-4 h-4" /> Plan My Visit
              </Link>
              <Link to="/timeline" className="rounded-full border border-ink/20 px-6 py-3 font-medium hover:bg-blush transition">
                Treatment Timeline
              </Link>
              <a href={CONCIERGE_WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-medium hover:opacity-90 transition">
                <MessageCircle className="w-4 h-4" /> Speak With Our Treatment Concierge
              </a>
            </div>
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden card-shadow max-w-sm mx-auto w-full">
            <img src={homeModel3} alt="Melt Aways visiting client" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </Section>

      {/* SPLIT FEATURE */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="rounded-[2rem] overflow-hidden card-shadow aspect-[5/4] max-w-xl">
            <img src={reception} alt="Reception" className="w-full h-full object-cover" loading="lazy" width={1400} height={900} />
          </div>
          <div>
            <Eyebrow>About Melt Aways</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-light text-ink leading-tight">A space where clients feel seen, respected, and guided.</h2>
            <p className="mt-6 text-taupe leading-relaxed">
              Melt Aways was built to give women and men a place where they can feel supported through body
              and wellness treatments without judgement. We combine body contouring, anti aging support, and
              personal consultation so you can make informed decisions and feel confident in your results.
            </p>
            <Link to="/booking" className="mt-8 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Book your consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center mb-14">
            <Eyebrow>Kind Words</Eyebrow>
            <h2 className="text-3xl lg:text-5xl font-light text-ink">From our clients.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map(r => (
              <div key={r.initials} className="bg-background rounded-3xl p-8 card-shadow">
                <div className="text-gold text-2xl font-script mb-3">"</div>
                <p className="text-ink/90 leading-relaxed">{r.text}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-sm font-medium text-primary">{r.initials}</div>
                  <div className="text-xs"><div className="font-medium">{r.initials}</div><div className="text-taupe">{r.service}</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/reviews" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
              Read more reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <Section>
        <div className="relative rounded-[2.5rem] overflow-hidden p-10 lg:p-20 bg-gradient-to-br from-primary via-rose to-blush text-primary-foreground card-shadow">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <img src={heroSpa} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="relative max-w-2xl">
            <p className="font-script text-4xl lg:text-5xl text-background/95">Ready When You Are</p>
            <h2 className="mt-2 text-3xl lg:text-5xl font-light leading-tight">Start with a consultation. We will guide the rest.</h2>
            <p className="mt-5 text-background/90 leading-relaxed">
              Not sure where to begin? Book a personal consultation and we will help you find the right
              treatment path. Respectful, private, and never any pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="rounded-full bg-background text-ink px-7 py-4 font-medium hover:opacity-90 transition">
                Find My Treatment Path
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-4 font-medium hover:opacity-90 transition">
                <MessageCircle className="w-4 h-4" /> Continue on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-primary">{icon}</div>
      <div>
        <div className="font-medium text-ink">{title}</div>
        <div className="text-taupe text-xs">{text}</div>
      </div>
    </div>
  );
}

function ServiceCard({ service, image }: { service: { slug: string; name: string; desc: string }; image: string }) {
  return (
    <article className="group bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-blush">
        <img src={image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
      </div>
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl text-ink">{service.name}</h3>
        <p className="mt-2 text-sm text-taupe leading-relaxed flex-1">{service.desc}</p>
        <div className="mt-5 flex items-center gap-3 text-sm">
          <Link to="/services" className="text-primary font-medium hover:underline">Learn More</Link>
          <span className="text-border">·</span>
          <Link to="/booking" className="text-ink font-medium hover:underline">Book Consultation</Link>
        </div>
      </div>
    </article>
  );
}
