import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageCircle, ArrowRight, Plane, Sparkles, Heart,
  ClipboardList, UserCog, Wand2, LineChart, Sprout, Star, Quote,
} from "lucide-react";
import { Section, Eyebrow } from "@/components/Section";
import { SERVICES, REVIEWS, SITE, CONCIERGE_WA } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { CountUp } from "@/components/motion/CountUp";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BA_IMAGES } from "@/lib/ba";
import { JOURNAL_POSTS } from "@/lib/journal";
import equipment from "@/assets/equipment.jpg";
import treatment from "@/assets/treatment.jpg";
import petals from "@/assets/petals.jpg";
import womanConfident from "@/assets/woman-confident.jpg";
import heroBanner from "@/assets/hero-banner-treatment.png.asset.json";
import maCarnival from "@/assets/ma-carnival.png.asset.json";
import maVisiting from "@/assets/ma-visiting.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melt Aways · Personalized Body Contouring for Real Bodies | Trinidad & Tobago" },
      { name: "description", content: "Consultation-led body contouring, skin tightening, and wellness treatments in Trinidad & Tobago. Personalized care plans built around real goals, real bodies, and honest conversation." },
      { property: "og:title", content: "Melt Aways · Personalized Body Contouring for Real Bodies" },
      { property: "og:description", content: "Real bodies. Real goals. Consultation first. Premium body contouring and wellness in Trinidad & Tobago." },
      { property: "og:image", content: heroBanner.url },
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
    <section className="relative overflow-hidden min-h-[640px] lg:min-h-[760px]">
      <HeroCarousel />
      <div className="bg-bloom" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-12 pt-16 lg:pt-28 pb-20 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <p className="script-hero text-primary/85 mb-5">Welcome to Melt Aways</p>
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
            <p className="mt-7 text-lg text-ink/88 leading-relaxed max-w-xl">
              You don't need to fit a mold to walk through our doors. Melt Aways is a space for real bodies,
              real concerns, and honest conversations.
            </p>
          </Reveal>
          <Reveal delay={0.85}>
            <p className="mt-4 text-base text-ink/78 leading-relaxed max-w-xl">
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
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-4 text-sm font-medium text-ink/90 hover:text-primary">
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={1.15}>
            <p className="mt-8 text-xs uppercase tracking-[0.22em] text-ink/70">
              Personalized care · Real bodies · Consultation first
            </p>
          </Reveal>
        </div>
        <div className="hidden lg:block lg:col-span-5" aria-hidden />
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
          <Sprout className="w-4 h-4" /> Real Results. Real People.
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
          <Stat value="60+" label="Happy Clients" sub="and counting" duration={5} />
          <a
            href="https://share.google/efNeYdAQwEjKkmsPC"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl hover:bg-blush/30 transition-colors"
            aria-label="See our Google reviews"
          >
            <Stat value="4.9" label="Google Rating" sub="Read on Google ↗" icon={<StarRow />} />
          </a>
          <Stat value="Trusted" label="Across Trinidad and Tobago" sub="and beyond" icon={<Sparkles className="w-7 h-7 text-primary" />} large={false} />
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
  { name: "Client A.J.", treatment: "Body Contouring",     duration: "After 6 sessions", quote: "I feel lighter, stronger, and more confident in my own skin.", image: BA_IMAGES[6] },
  { name: "Client R.M.", treatment: "Fat Melting",         duration: "After 8 weeks",    quote: "My clothes fit better and I finally feel like myself again.",   image: BA_IMAGES[0] },
  { name: "Client K.P.", treatment: "Skin Tightening",     duration: "After 4 sessions", quote: "I see a difference every time I look in the mirror.",          image: BA_IMAGES[5] },
  { name: "Client N.S.", treatment: "Stretch Mark Care",   duration: "After 6 weeks",    quote: "My waist is more defined and I feel so much better.",          image: BA_IMAGES[2] },
];

function ResultCard({ name, treatment, duration, quote, image }: { name: string; treatment: string; duration: string; quote: string; image: string }) {
  return (
    <article className="bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow lift-on-hover hover:-translate-y-1 text-left">
      <div className="aspect-[4/5] overflow-hidden bg-blush">
        <img src={image} alt={`${name} – ${treatment} before & after`} className="w-full h-full object-contain" loading="lazy" />
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

function Stat({ value, label, sub, icon, large = true, duration }: { value: string; label: string; sub: string; icon?: React.ReactNode; large?: boolean; duration?: number }) {
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
            <CountUp value={numeric} decimals={decimals} suffix={suffix} duration={duration} />
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
  type Step = { icon: React.ReactNode; tag: string; title: string; body: string };
  const steps: Step[] = [
    { icon: <ClipboardList className="w-5 h-5" />, tag: "CONSULT",     title: "We Start With Understanding",      body: "Every plan begins with a private, unhurried conversation about your goals, lifestyle, and history." },
    { icon: <UserCog className="w-5 h-5" />,       tag: "PERSONALIZE", title: "No One-Size-Fits-All Treatments",  body: "We design a treatment pathway shaped around your body, your timeline, and your comfort level." },
    { icon: <Wand2 className="w-5 h-5" />,         tag: "TREAT",       title: "Treatments With Purpose",          body: "Every session is intentional. We treat with care, explain as we go, and never rush a result." },
    { icon: <LineChart className="w-5 h-5" />,     tag: "TRACK",       title: "Progress You Can See",             body: "We document measurements and milestones so progress is clear, honest, and personal." },
    { icon: <Sprout className="w-5 h-5" />,        tag: "MAINTAIN",    title: "Long-Term Confidence",             body: "Maintenance plans support results between sessions and keep confidence steady year-round." },
  ];
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 75%", "end 25%"] });
  const vineLen = useTransform(scrollYProgress, [0, 0.92], [0, 1]);
  const bloomScale = useTransform(scrollYProgress, [0.85, 1], [0.4, 1]);
  const bloomOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  // Pre-compute leaf opacities (hooks cannot live inside .map)
  const leaf0 = useTransform(scrollYProgress, [0.13, 0.23], [0, 1]);
  const leaf1 = useTransform(scrollYProgress, [0.31, 0.41], [0, 1]);
  const leaf2 = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  const leaf3 = useTransform(scrollYProgress, [0.69, 0.79], [0, 1]);
  const leaves = [
    { cx: 18, cy: 180, op: leaf0 },
    { cx: 42, cy: 360, op: leaf1 },
    { cx: 18, cy: 550, op: leaf2 },
    { cx: 42, cy: 740, op: leaf3 },
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

      <div ref={wrapRef} className="mt-16 relative">
        {/* Vine SVG — grows with scroll */}
        <svg
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-16 pointer-events-none"
          viewBox="0 0 60 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M30 0 C 18 120, 42 220, 30 340 S 14 540, 30 680 S 46 860, 30 980"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary/60"
            style={{ pathLength: vineLen }}
          />
          {/* Tiny leaves along the vine */}
          {leaves.map((l, i) => (
            <motion.circle
              key={i}
              cx={l.cx}
              cy={l.cy}
              r="4"
              className="fill-fresh"
              style={{ opacity: l.op }}
            />
          ))}
          {/* Final bloom */}
          <motion.g style={{ scale: bloomScale, opacity: bloomOpacity, transformOrigin: "30px 985px" }}>
            <circle cx="30" cy="985" r="10" className="fill-primary/80" />
            <circle cx="22" cy="978" r="6" className="fill-rose" />
            <circle cx="38" cy="978" r="6" className="fill-rose" />
            <circle cx="22" cy="992" r="6" className="fill-rose" />
            <circle cx="38" cy="992" r="6" className="fill-rose" />
            <circle cx="30" cy="985" r="3.5" className="fill-gold" />
          </motion.g>
        </svg>
        {/* Mobile subtle line */}
        <div className="lg:hidden absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" aria-hidden />

        <ol className="space-y-12 lg:space-y-20 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <li key={s.tag} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center`}>
              <Reveal
                direction={i % 2 === 0 ? "left" : "right"}
                duration={1.0}
                className={`${i % 2 ? "lg:order-2" : "lg:order-1"} bg-background border border-border/60 rounded-3xl p-7 lg:p-9 card-shadow lift-on-hover hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 text-primary">
                  <span className="w-11 h-11 rounded-full bg-blush flex items-center justify-center">
                    {s.icon}
                  </span>
                  <span className="text-xs tracking-[0.25em] uppercase">Step 0{i + 1} · {s.tag}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl lg:text-3xl text-ink">{s.title}</h3>
                <p className="mt-3 text-taupe leading-relaxed">{s.body}</p>
              </Reveal>
              <div className={`hidden lg:block ${i % 2 ? "lg:order-1" : "lg:order-2"}`} aria-hidden />
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
    { label: "New Mothers",                       hash: "new-mothers" },
    { label: "Busy Professionals",                hash: "busy-professionals" },
    { label: "Carnival Preparation",              hash: "carnival" },
    { label: "Wedding Preparation",               hash: "wedding" },
    { label: "Vacation Preparation",              hash: "vacation" },
    { label: "Confidence Rebuilding",             hash: "confidence" },
    { label: "Stubborn Areas Despite Exercise",   hash: "stubborn-areas" },
    { label: "Visiting Trinidad",                 hash: "visiting" },
  ];
  return (
    <section className="bg-cream py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="rounded-[2rem] overflow-hidden border border-border/60 bg-background card-shadow lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-stretch">
          <div className="p-8 lg:p-10">
            <div className="max-w-2xl">
              <Eyebrow>Who We Help</Eyebrow>
              <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
                Care designed around your <em className="not-italic text-primary">season of life</em>.
              </h2>
              <p className="mt-4 text-taupe leading-relaxed">
                Whatever brought you here, you are not the first to walk in with this question. We help clients at every stage.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-3">
              {people.map((p, i) => (
                <Link
                  key={p.label}
                  to="/faq"
                  hash={p.hash}
                  className="group bg-background rounded-2xl border border-border/60 px-4 py-3.5 lift-on-hover hover:-translate-y-0.5 hover:bg-blush/40 flex items-center gap-3"
                >
                  <span className="w-7 h-7 rounded-full bg-blush flex items-center justify-center text-primary shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-primary/70">0{i + 1}</span>
                    <span className="block font-serif text-sm lg:text-base text-ink leading-snug truncate">{p.label}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary/40 ml-auto group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[260px] lg:min-h-full bg-cream">
            <img src={maCarnival.url} alt="Carnival travel planning inspiration for Melt Aways clients" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden" aria-hidden />
            <div className="absolute inset-y-0 left-0 hidden lg:block w-28 bg-gradient-to-r from-background via-background/72 to-transparent" aria-hidden />
          </div>
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
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.initials} className="bg-background rounded-3xl p-8 card-shadow lift-on-hover hover:-translate-y-1 relative">
              <Quote className="w-7 h-7 text-primary/40 absolute top-6 right-6" />
              <StarRow />
              <p className="mt-5 font-serif text-lg text-ink/90 leading-relaxed">{truncateWords(r.text, 16)}</p>
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
  return (
    <Section>
      <div className="rounded-[2.5rem] bg-gradient-to-br from-blush via-background to-cream border border-border/60 p-10 lg:p-16 overflow-hidden relative text-center max-w-4xl mx-auto">
        <div className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-rose/30 blur-3xl" aria-hidden />
        <div className="relative">
          <Eyebrow>Treatment Finder</Eyebrow>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
            Not sure where to start?
            <span className="block italic text-primary">Let's point you in the right direction.</span>
          </h2>
          <p className="mt-6 text-taupe leading-relaxed max-w-2xl mx-auto">
            Complete a quick intake form with your personal details, goals, concerns, and timeline.
            Based on your answers, we'll suggest suitable treatment options and let you know if you
            qualify for a free consultation.
          </p>
          <Link to="/treatment-finder" className="mt-8 inline-flex items-center gap-2 rounded-full bg-fresh text-fresh-foreground px-7 py-4 font-medium btn-lux soft-shadow">
            Start Treatment Finder <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}


/* ─────────────────── VISITING TRINIDAD ─────────────────── */
function VisitingTrinidad() {
  return (
    <Section className="!py-16">
      <div className="rounded-[2rem] overflow-hidden border border-border/60 bg-background card-shadow lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)] lg:items-stretch">
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <p className="script-hero text-primary mb-2">Visiting Trinidad & Tobago 🇹🇹</p>
          <h3 className="mt-1 font-serif text-2xl lg:text-3xl text-ink leading-snug">Plan your treatment before you arrive.</h3>
          <p className="mt-3 text-taupe leading-relaxed max-w-2xl">
            Coming home for Carnival, Christmas, or vacation? Start a consultation before you land so we can plan around your event dates and availability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/visiting" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 lift-on-hover soft-shadow">
              <Plane className="w-4 h-4" /> Plan My Visit
            </Link>
            <a href={CONCIERGE_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 font-medium hover:opacity-90 lift-on-hover">
              <MessageCircle className="w-4 h-4" /> Concierge
            </a>
          </div>
        </div>
        <div className="relative min-h-[260px] lg:min-h-full bg-cream">
          <img src={maVisiting.url} alt="Travel planning setup for visiting Melt Aways clients" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background via-background/70 to-transparent lg:hidden" aria-hidden />
          <div className="absolute inset-y-0 left-0 hidden lg:block w-28 bg-gradient-to-r from-background via-background/72 to-transparent" aria-hidden />
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── ABOUT ─────────────────── */
function About() {
  const values = [
    "We lead with care.",
    "We protect your privacy.",
    "We honour every body.",
    "We guide with honesty.",
    "We treat with skill, patience, and intention.",
    "We celebrate progress that feels real.",
  ];
  return (
    <Section>
      <div className="max-w-3xl mx-auto text-center">
        <Eyebrow>About Melt Aways</Eyebrow>
        <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
          A space where clients feel <em className="not-italic text-primary">seen, respected, and guided</em>.
        </h2>
        <p className="mt-6 text-taupe leading-relaxed">
          Melt Aways exists to give women and men a place where they can talk about their body and
          their goals without judgement. We focus on clear guidance, personal attention, and treatment
          plans built around your comfort, your confidence, and the results you want to achieve.
        </p>
      </div>
      <div className="md:hidden mt-10 max-w-4xl mx-auto text-left">
        <div className="grid grid-cols-3 grid-rows-2 rounded-[1.75rem] overflow-hidden border border-border/60 bg-background card-shadow h-[32svh] max-h-[260px] min-h-[220px]">
          <div className="col-span-1 row-span-2 border-r border-border/60 bg-blush/25 p-3">
            <div className="text-[0.62rem] uppercase tracking-[0.18em] text-primary/70 mb-2">Values</div>
            <ul className="space-y-1.5 text-[0.68rem] leading-[1.25] text-ink/85">
              <li>Care first.</li>
              <li>Privacy protected.</li>
              <li>Every body welcome.</li>
              <li>Guidance stays honest.</li>
              <li>Progress should feel real.</li>
            </ul>
          </div>
          <div className="col-span-2 border-b border-border/60 p-3">
            <div className="text-[0.62rem] uppercase tracking-[0.18em] text-primary/70 mb-2">Mission</div>
            <p className="text-[0.68rem] leading-[1.3] text-ink/85">
              Personal, private, results-focused body and wellness care guided by trained specialists who listen first.
            </p>
          </div>
          <div className="col-span-2 p-3">
            <div className="text-[0.62rem] uppercase tracking-[0.18em] text-primary/70 mb-2">Philosophy</div>
            <p className="text-[0.68rem] leading-[1.3] text-ink/85">
              We understand the person before the treatment so every plan feels safe, respectful, and genuinely personal.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:grid mt-12 grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
        <Reveal direction="left" className="bg-background border border-border/60 rounded-3xl p-7 card-shadow">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/70 mb-2">Mission</div>
          <p className="text-ink/90 leading-relaxed">
            To make non-surgical body and wellness care feel personal, private, and results-focused —
            delivered by trained treatment specialists who listen first, guide honestly, and help
            every client feel more confident in their own body.
          </p>
        </Reveal>
        <Reveal direction="up" className="bg-background border border-border/60 rounded-3xl p-7 card-shadow">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/70 mb-2">Values</div>
          <ul className="space-y-2 text-ink/90">
            {values.map((v) => (
              <li key={v} className="flex gap-2.5 leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal direction="right" className="bg-background border border-border/60 rounded-3xl p-7 card-shadow">
          <div className="text-xs uppercase tracking-[0.22em] text-primary/70 mb-2">Philosophy</div>
          <p className="text-ink/90 leading-relaxed">
            Melt Aways care begins with understanding the person, not just the treatment. We welcome
            all bodies, listen without judgement, and create safe, personalized treatment plans that
            support confidence, comfort, and real progress.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ─────────────────── JOURNAL PREVIEW ─────────────────── */
function JournalPreview() {
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
          {JOURNAL_POSTS.map((post) => (
            <Link key={post.slug} to="/journal/$slug" params={{ slug: post.slug }} className="group bg-background rounded-3xl overflow-hidden border border-border/60 card-shadow lift-on-hover hover:-translate-y-1">
              <div className="aspect-[5/3] overflow-hidden bg-blush">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" width={1280} height={720} />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.22em] text-primary/70">{post.category}</div>
                <h3 className="mt-2 font-serif text-xl text-ink leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm text-taupe leading-relaxed">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {post.ctaText} <ArrowRight className="w-4 h-4" />
                </span>
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

function truncateWords(text: string, maxWords: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  return words.length > maxWords ? `${words.slice(0, maxWords).join(" ")}...` : text;
}
