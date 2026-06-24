import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle, ArrowRight, Plane, ShieldCheck, Sparkles, Heart,
  ClipboardList, UserCheck, Wand2, LineChart, Leaf, Star, Quote,
} from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { SERVICES, REVIEWS, SITE, CONCIERGE_WA } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Stagger } from "@/components/motion/Stagger";
import { FloatImage } from "@/components/motion/FloatImage";
import { CountUp } from "@/components/motion/CountUp";
import { HoverCard } from "@/components/motion/HoverCard";
import womanConfident from "@/assets/woman-confident.jpg";
import equipment from "@/assets/equipment.jpg";
import treatment from "@/assets/treatment.jpg";
import reception from "@/assets/reception.jpg";
import petals from "@/assets/petals.jpg";
import homeModel1 from "@/assets/home-model-1.jpg";
import homeModel2 from "@/assets/home-model-2.jpg";
import homeModel3 from "@/assets/home-model-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melt Aways · Personalized Body Contouring for Real Bodies | Trinidad & Tobago" },
      { name: "description", content: "Consultation-led body contouring, skin tightening, and wellness treatments in Trinidad & Tobago. Personalized care plans built around real goals, real bodies, and honest conversation." },
      { property: "og:title", content: "Melt Aways · Personalized Body Contouring for Real Bodies" },
      { property: "og:description", content: "Real bodies. Real goals. Consultation first. Premium body contouring and wellness in Trinidad & Tobago." },
      { property: "og:image", content: homeModel1 },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Reveal><RealResults /></Reveal>
      <Reveal><Method /></Reveal>
      <Reveal><WhoWeHelp /></Reveal>
      <Reveal><FeaturedTreatments /></Reveal>
      <Reveal><ClientReviews /></Reveal>
      <Reveal><TreatmentFinder /></Reveal>
      <Reveal><SafetyTrust /></Reveal>
      <Reveal><VisitingTrinidad /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><JournalPreview /></Reveal>
      <Reveal><FinalCta /></Reveal>
    </div>
  );
}

/* ───────────────────────── HERO ───────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blush via-background to-cream" />
      <div className="bg-bloom" aria-hidden />
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-rose/30 blur-3xl -z-10" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blush blur-3xl -z-10" />

      <div className="mx-auto max-w-[1400px] px-5 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <p className="font-script text-3xl lg:text-4xl text-primary/80 leading-none mb-5">Welcome to Melt Aways</p>
          </Reveal>
          <RevealText
            as="h1"
            className="font-serif text-[2.6rem] sm:text-5xl lg:text-[4.2rem] leading-[1.02] text-ink"
            stagger={0.12}
            delay={0.25}
            lines={[
              <>Personalized Body Contouring</>,
              <em className="not-italic italic text-primary">for Real Bodies</em>,
              <>and Real Goals.</>,
            ]}
          />
          <Reveal delay={0.7}>
            <p className="mt-7 text-lg text-taupe leading-relaxed max-w-xl">
              You don't need to fit a mold to walk through our doors. Melt Aways is a space for real bodies,
              real concerns, and honest conversations.
            </p>
          </Reveal>
          <Reveal delay={0.85}>
            <p className="mt-4 text-base text-taupe/90 leading-relaxed max-w-xl">
              Every treatment journey begins by listening first: understanding what feels important, what's
              realistic, and what kind of support would actually help. From there, a personal care plan is
              shaped with patience, respect, and guidance that feels genuinely made for the person in front of us.
            </p>
          </Reveal>
          <Reveal delay={1.0}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-fresh text-fresh-foreground px-7 py-4 font-medium btn-lux soft-shadow">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full bg-background border border-ink/15 px-7 py-4 font-medium hover:bg-blush lift-on-hover">
                See Transformations
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-4 text-sm text-taupe hover:text-primary">
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={1.15}>
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-primary/70">
              Personalized care · Real bodies · Consultation first
            </p>
          </Reveal>
        </div>

        {/* Image cluster */}
        <div className="lg:col-span-6 relative">
          <div className="relative max-w-[560px] mx-auto">
            <Reveal duration={1.1} variants={{ hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1 } }}>
              <FloatImage amplitude={6} duration={9} className="aspect-[4/5] rounded-[2.5rem] overflow-hidden card-shadow">
                <img src={homeModel1} alt="A Melt Aways client during a consultation" className="w-full h-full object-cover" width={1024} height={1280} />
              </FloatImage>
            </Reveal>

            <div className="absolute -bottom-8 -left-6 lg:-left-12 w-44 h-56 rounded-3xl overflow-hidden card-shadow hidden sm:block float-slow">
              <img src={homeModel2} alt="Personalized care moment" className="w-full h-full object-cover" loading="lazy" />
            </div>

            <div className="absolute -top-6 -right-4 lg:-right-10 bg-background/95 backdrop-blur rounded-2xl px-5 py-4 card-shadow flex items-center gap-3 max-w-[230px]">
              <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs leading-snug">
                <div className="font-medium text-ink">Consultation first</div>
                <div className="text-taupe">No pressure, no judgement</div>
              </div>
            </div>

            <div className="absolute bottom-10 -right-3 lg:-right-8 bg-background/95 backdrop-blur rounded-2xl px-5 py-4 card-shadow flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-rose border-2 border-background" />
                <div className="w-7 h-7 rounded-full bg-blush border-2 border-background" />
                <div className="w-7 h-7 rounded-full bg-cream border-2 border-background" />
              </div>
              <div className="text-xs leading-snug">
                <div className="font-medium text-ink">500+ happy clients</div>
                <div className="text-taupe">across Trinidad & Tobago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── REAL RESULTS, REAL PEOPLE ─────────────────── */
function RealResults() {
  return (
    <section className="relative bg-gradient-to-b from-background via-blush/40 to-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 text-center">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary/80">
          <Leaf className="w-4 h-4" /> Real Results. Real People.
        </p>
        <h2 className="mt-5 font-serif text-4xl lg:text-6xl text-ink leading-[1.05]">
          Real Results, Real <em className="not-italic text-primary">Confidence</em>.
        </h2>
        <p className="mt-5 text-taupe max-w-2xl mx-auto">
          See the difference personalized care and the right treatment plan can make. Each story below
          is built around a real consultation, a real goal, and a real timeline.
        </p>

        {/* Stat row */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Stat value="500+" label="Happy Clients" sub="and counting" />
          <Stat value="4.9" label="Google Rating" sub="from 120+ reviews" icon={<StarRow />} />
          <Stat value="Trusted" label="Across Trinidad" sub="and beyond" icon={<ShieldCheck className="w-7 h-7 text-primary" />} large={false} />
        </div>

        {/* Result preview cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESULT_PREVIEWS.map((r) => (
            <ResultCard key={r.name} {...r} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-taupe">Ready to start your transformation?</span>
          <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 lift-on-hover soft-shadow">
            Book Your Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full bg-background border border-ink/15 px-6 py-3 text-sm font-medium hover:bg-blush lift-on-hover">
            View All Results
          </Link>
        </div>
      </div>
    </section>
  );
}

const RESULT_PREVIEWS = [
  { name: "Jason",  treatment: "Abdomen Contouring",     duration: "Results after 6 sessions", quote: "I feel lighter, stronger, and more confident in my own skin.", image: homeModel3 },
  { name: "Ravi",   treatment: "Abdomen Contouring",     duration: "Results after 8 weeks",    quote: "My clothes fit better and I finally feel like myself again.",   image: homeModel2 },
  { name: "Keisha", treatment: "Thigh Contouring",       duration: "Results after 4 sessions", quote: "I see a difference every time I look in the mirror.",            image: homeModel1 },
  { name: "Nicole", treatment: "Love Handle Contouring", duration: "Results after 6 weeks",    quote: "My waist is more defined and I feel so much better.",            image: womanConfident },
];

function ResultCard({ name, treatment, duration, quote, image }: { name: string; treatment: string; duration: string; quote: string; image: string }) {
  return (
    <article className="bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow lift-on-hover hover:-translate-y-1 text-left">
      <div className="aspect-[4/5] overflow-hidden bg-blush">
        <img src={image} alt={`${name} – ${treatment}`} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl text-primary">{name}</h3>
        <p className="mt-0.5 text-sm font-medium text-ink">{treatment}</p>
        <p className="text-xs text-taupe">{duration}</p>
        <p className="mt-3 text-sm italic text-taupe/90 leading-relaxed border-l-2 border-primary/30 pl-3">
          "{quote}"
        </p>
      </div>
    </article>
  );
}

function Stat({ value, label, sub, icon, large = true }: { value: string; label: string; sub: string; icon?: React.ReactNode; large?: boolean }) {
  // Detect a leading numeric in the value (e.g. "500+", "4.9") for CountUp animation.
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numeric = m ? parseFloat(m[1]) : null;
  const decimals = m && m[1].includes(".") ? (m[1].split(".")[1]?.length ?? 0) : 0;
  const suffix = m ? m[2] : "";
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-5 rounded-2xl">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blush text-primary">
        {icon ?? <Heart className="w-6 h-6" />}
      </div>
      <div className="text-left">
        <div className={`font-serif text-ink ${large ? "text-4xl" : "text-2xl"}`}>
          {numeric !== null ? (
            <CountUp value={numeric} decimals={decimals} suffix={suffix} />
          ) : (
            value
          )}
        </div>
        <div className="text-sm font-medium text-ink/80">{label}</div>
        <div className="text-xs text-primary/70">{sub}</div>
      </div>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map(i => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

/* ─────────────────── THE MELT AWAYS METHOD ─────────────────── */
function Method() {
  const steps = [
    { icon: <UserCheck className="w-5 h-5" />,    tag: "CONSULT",     title: "We Start With Understanding",      body: "Every plan begins with a private, unhurried conversation about your goals, lifestyle, and history." },
    { icon: <ClipboardList className="w-5 h-5" />,tag: "PERSONALIZE", title: "No One-Size-Fits-All Treatments",  body: "We design a treatment pathway shaped around your body, your timeline, and your comfort level." },
    { icon: <Wand2 className="w-5 h-5" />,        tag: "TREAT",       title: "Treatments With Purpose",          body: "Every session is intentional. We treat with care, explain as we go, and never rush a result." },
    { icon: <LineChart className="w-5 h-5" />,    tag: "TRACK",       title: "Progress You Can See",             body: "We document measurements and milestones so progress is clear, honest, and personal." },
    { icon: <Leaf className="w-5 h-5" />,         tag: "MAINTAIN",    title: "Long-Term Confidence",             body: "Maintenance plans support results between sessions and keep confidence steady year-round." },
  ];
  return (
    <Section>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>The Melt Aways Method™</Eyebrow>
        <h2 className="font-serif text-4xl lg:text-6xl text-ink leading-[1.05]">
          Every body is different,
          <span className="block italic text-primary">so treatment never comes first.</span>
        </h2>
        <p className="mt-5 text-taupe leading-relaxed">
          Understanding comes first. Through a consultation-led approach, a personalized treatment
          pathway is created around goals, lifestyle, timeline, and comfort level.
        </p>
      </div>

      <div className="mt-16 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden />
        <ol className="space-y-10 lg:space-y-14 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <li key={s.tag} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="bg-background border border-border/60 rounded-3xl p-7 lg:p-9 card-shadow lift-on-hover hover:-translate-y-1">
                <div className="flex items-center gap-3 text-primary">
                  <span className="w-9 h-9 rounded-full bg-blush flex items-center justify-center">{s.icon}</span>
                  <span className="text-xs tracking-[0.25em] uppercase">Step 0{i + 1} · {s.tag}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl lg:text-3xl text-ink">{s.title}</h3>
                <p className="mt-3 text-taupe leading-relaxed">{s.body}</p>
              </div>
              <div className="hidden lg:block" />
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 text-center">
        <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-fresh text-fresh-foreground px-7 py-4 font-medium hover:opacity-90 lift-on-hover soft-shadow">
          Find My Treatment Path <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ─────────────────── WHO WE HELP ─────────────────── */
function WhoWeHelp() {
  const people = [
    "New Mothers",
    "Busy Professionals",
    "Carnival Preparation",
    "Wedding Preparation",
    "Vacation Preparation",
    "Confidence Rebuilding",
    "Stubborn Areas Despite Exercise",
    "Visiting Trinidad",
  ];
  return (
    <section className="bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>Who We Help</Eyebrow>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
            Care designed around your <em className="not-italic text-primary">season of life</em>.
          </h2>
          <p className="mt-4 text-taupe leading-relaxed">
            Whatever brought you here, you are not the first to walk in with this question.
            We help clients at every stage.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {people.map((p, i) => (
            <div key={p} className="group bg-background rounded-2xl border border-border/60 p-5 lg:p-6 card-shadow lift-on-hover hover:-translate-y-1 hover:bg-blush/40">
              <div className="w-9 h-9 rounded-full bg-blush flex items-center justify-center text-primary mb-4">
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary/70">0{i + 1}</div>
              <div className="mt-1 font-serif text-lg lg:text-xl text-ink leading-snug">{p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FEATURED TREATMENTS ─────────────────── */
function FeaturedTreatments() {
  const featured = SERVICES.slice(0, 4);
  const imgs = [treatment, equipment, womanConfident, petals];
  return (
    <Section>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <Eyebrow>Featured Treatments</Eyebrow>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
            A short list of the treatments clients ask for most.
          </h2>
          <p className="mt-4 text-taupe">
            Not sure which fits? Your consultation will recommend the right combination,
            sequence, and timeline.
          </p>
        </div>
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
          View all services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((s, i) => (
          <article key={s.slug} className="group bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow lift-on-hover hover:-translate-y-1 flex flex-col">
            <div className="aspect-[4/3] overflow-hidden bg-blush">
              <img src={imgs[i]} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-serif text-2xl text-ink">{s.name}</h3>
              <p className="mt-2 text-sm text-taupe leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Starting with consultation</span>
                <Link to="/booking" className="text-ink font-medium hover:text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Book <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────── CLIENT REVIEWS ─────────────────── */
function ClientReviews() {
  return (
    <section className="bg-gradient-to-b from-background via-blush/30 to-background py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
            From the people we've worked with.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r) => (
            <div key={r.initials} className="bg-background rounded-3xl p-8 card-shadow lift-on-hover hover:-translate-y-1 relative">
              <Quote className="w-7 h-7 text-primary/40 absolute top-6 right-6" />
              <StarRow />
              <p className="mt-5 font-serif text-lg text-ink/90 leading-relaxed">{r.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blush flex items-center justify-center text-sm font-medium text-primary">{r.initials}</div>
                <div className="text-sm">
                  <div className="font-medium text-ink">{r.initials}</div>
                  <div className="text-taupe text-xs">{r.service}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/reviews" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            Read more reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TREATMENT FINDER ─────────────────── */
function TreatmentFinder() {
  const steps = [
    { n: "01", label: "Concern",        body: "Tell us what's on your mind." },
    { n: "02", label: "Goal",           body: "Share the result you'd love." },
    { n: "03", label: "Timeline",       body: "When do you want to feel ready?" },
    { n: "04", label: "Recommendation", body: "A personal pathway, no pressure." },
  ];
  return (
    <Section>
      <div className="rounded-[2.5rem] bg-gradient-to-br from-blush via-background to-cream border border-border/60 p-10 lg:p-16 overflow-hidden relative">
        <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-rose/30 blur-3xl" aria-hidden />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>Treatment Finder</Eyebrow>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Not sure where to start?
              <span className="block italic text-primary">Let's find your pathway.</span>
            </h2>
            <p className="mt-5 text-taupe leading-relaxed max-w-lg">
              Answer four short questions during your consultation. We listen, then recommend the
              treatment plan that actually fits your goals and timeline.
            </p>
            <Link to="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full bg-fresh text-fresh-foreground px-7 py-4 font-medium hover:opacity-90 lift-on-hover soft-shadow">
              Start Treatment Finder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ol className="grid sm:grid-cols-2 gap-4">
            {steps.map((s) => (
              <li key={s.n} className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border/60 lift-on-hover hover:-translate-y-1">
                <div className="text-xs tracking-[0.25em] text-primary/70">STEP {s.n}</div>
                <div className="font-serif text-2xl text-ink mt-1">{s.label}</div>
                <p className="text-sm text-taupe mt-2 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── SAFETY & TRUST ─────────────────── */
function SafetyTrust() {
  const items = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Certified Practitioners", body: "Trained, experienced, and continuously refining their craft." },
    { icon: <Sparkles className="w-5 h-5" />,    title: "Premium Equipment",       body: "Modern, well-maintained machines selected with care." },
    { icon: <Heart className="w-5 h-5" />,       title: "Safety First",            body: "Every plan reviews health history before any treatment begins." },
    { icon: <UserCheck className="w-5 h-5" />,   title: "Consultation Required",   body: "We will never recommend a treatment without understanding you first." },
  ];
  return (
    <section className="bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="rounded-[2.5rem] overflow-hidden card-shadow aspect-[5/4] max-w-xl">
          <img src={reception} alt="The Melt Aways consultation space" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div>
          <Eyebrow>Safety & Trust</Eyebrow>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
            Reassurance built into every appointment.
          </h2>
          <p className="mt-4 text-taupe leading-relaxed">
            Years of experience, certified practitioners, hundreds of clients served, and a
            consultation-first standard that never gets skipped.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {items.map((it) => (
              <li key={it.title} className="flex gap-3 p-4 rounded-2xl bg-background border border-border/60">
                <span className="w-9 h-9 rounded-full bg-blush text-primary flex items-center justify-center shrink-0">{it.icon}</span>
                <div>
                  <div className="font-medium text-ink">{it.title}</div>
                  <div className="text-sm text-taupe leading-relaxed">{it.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── VISITING TRINIDAD ─────────────────── */
function VisitingTrinidad() {
  return (
    <Section className="!py-16">
      <div className="rounded-3xl bg-background border border-border/60 p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
        <div className="flex-1">
          <p className="font-script text-2xl lg:text-3xl text-primary leading-none">Visiting Trinidad & Tobago 🇹🇹</p>
          <h3 className="mt-2 font-serif text-2xl lg:text-3xl text-ink leading-snug">Plan your treatment before you arrive.</h3>
          <p className="mt-3 text-taupe leading-relaxed max-w-2xl">
            Coming home for Carnival, Christmas, or vacation? Start a consultation before you land so we
            can plan around your event dates and availability.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/visiting" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 lift-on-hover soft-shadow">
            <Plane className="w-4 h-4" /> Plan My Visit
          </Link>
          <a href={CONCIERGE_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-medium hover:opacity-90 lift-on-hover">
            <MessageCircle className="w-4 h-4" /> Concierge
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── ABOUT ─────────────────── */
function About() {
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <Eyebrow>About Melt Aways</Eyebrow>
        <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
          A space where clients feel <em className="not-italic text-primary">seen, respected, and guided</em>.
        </h2>
        <p className="mt-6 text-taupe leading-relaxed">
          Melt Aways exists to give women and men a place where they can talk about their body and
          their goals without judgement. Our mission is simple: honest consultation, personalized
          care, and treatment plans that respect the person in front of us.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { t: "Mission",       d: "Personalized care that respects real bodies and real goals." },
            { t: "Values",        d: "Honesty, patience, privacy, and consistent professionalism." },
            { t: "Philosophy",    d: "Consultation first. Treatment second. Confidence built to last." },
          ].map(v => (
            <div key={v.t} className="bg-background border border-border/60 rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.22em] text-primary/70">{v.t}</div>
              <p className="mt-2 text-sm text-ink/90 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── JOURNAL PREVIEW ─────────────────── */
function JournalPreview() {
  const posts = [
    { tag: "Treatment Guide", title: "What to expect from your first cavitation session",   img: equipment },
    { tag: "Recovery",        title: "Caring for your body between treatments",             img: petals },
    { tag: "Education",       title: "Five myths about body contouring, gently corrected",  img: treatment },
  ];
  return (
    <section className="bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Eyebrow>Journal & Education</Eyebrow>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Read, learn, and arrive prepared.
            </h2>
          </div>
          <Link to="/journal" className="text-sm font-medium text-primary inline-flex items-center gap-2 hover:gap-3 transition-all">
            Visit the journal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p => (
            <Link key={p.title} to="/journal" className="group bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow lift-on-hover hover:-translate-y-1">
              <div className="aspect-[5/3] overflow-hidden bg-blush">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-primary/70">{p.tag}</div>
                <h3 className="mt-2 font-serif text-xl text-ink leading-snug">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FINAL CTA ─────────────────── */
function FinalCta() {
  return (
    <Section>
      <div className="relative rounded-[2.5rem] overflow-hidden p-10 lg:p-20 bg-gradient-to-br from-blush via-background to-cream border border-border/60 card-shadow text-center">
        <div className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-rose/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full bg-blush blur-3xl" aria-hidden />
        <div className="relative max-w-2xl mx-auto">
          <p className="font-script text-3xl lg:text-4xl text-primary">Ready When You Are</p>
          <h2 className="mt-3 font-serif text-4xl lg:text-6xl text-ink leading-[1.05]">
            Ready to explore your best treatment path?
          </h2>
          <p className="mt-5 text-taupe leading-relaxed">
            Book a personalized consultation and receive guidance tailored to your goals, timeline, and body.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-fresh text-fresh-foreground px-7 py-4 font-medium hover:opacity-90 lift-on-hover soft-shadow">
              Book Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-4 font-medium hover:opacity-90 lift-on-hover">
              <MessageCircle className="w-4 h-4" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
