import { Link } from "@tanstack/react-router";
import { Crown, Hourglass, ClipboardList, Users, Sparkles, Check } from "lucide-react";
import { Section } from "@/components/Section";
import { SITE, waLink } from "@/lib/site";
import vipImage from "@/assets/treatments/Muscle_Toning.png.asset.json";

const BENEFITS = [
  "A treatment journey designed around your goals",
  "Suitable services combined into one structured plan",
  "Ongoing progress tracking and plan adjustments",
  "Priority appointment booking",
  "Preferred rates on selected premium services",
];

const PILLARS = [
  { icon: ClipboardList, title: "Personalized", sub: "Treatment Roadmap" },
  { icon: Users, title: "VIP Support &", sub: "Accountability" },
  { icon: Sparkles, title: "Advanced Treatments", sub: "Selected Around You" },
];

export function VipProgram() {
  return (
    <Section className="!py-16" id="vip">
      <div className="rounded-[2rem] overflow-hidden border border-border/60 bg-cream/60 card-shadow lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-stretch">
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-primary font-semibold">
            Meltaways VIP Transformation Program
          </p>
          <h2 className="mt-5 font-serif text-3xl lg:text-[2.9rem] leading-[1.08] text-gold">
            Bigger Goals Deserve<span className="block">a More Personalized Plan.</span>
          </h2>
          <p className="mt-5 text-taupe leading-relaxed max-w-xl">
            Bring your body, beauty and wellness goals together in one guided transformation programme.
            Your VIP plan can combine suitable treatments, ongoing progress tracking and personalized
            adjustments, all through one convenient monthly payment.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-primary text-primary-foreground">
                  <p.icon className="w-5 h-5" />
                </span>
                <span className="min-w-0 font-serif text-gold leading-tight">
                  {p.title}
                  <span className="block">{p.sub}</span>
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-ink/80">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-3 items-start rounded-xl border border-border/60 bg-background/70 px-5 py-4">
            <Hourglass className="w-5 h-5 shrink-0 text-primary mt-0.5" />
            <p className="text-sm text-taupe leading-relaxed">
              VIP spaces are intentionally limited so every member receives the focused attention and
              personalized care their transformation deserves.
            </p>
          </div>

          <p className="mt-8 font-serif text-xl text-ink">Ready for a plan designed around you?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/vip"
              aria-label="Find out more about the Meltaways VIP Transformation Program"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:opacity-90 lift-on-hover soft-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Crown className="w-4 h-4" aria-hidden /> Find out more
            </Link>
            <Link
              to="/vipconsult"
              aria-label="Book a VIP Transformation Program consultation"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-7 py-3.5 font-medium hover:opacity-90 lift-on-hover soft-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Book a consultation
            </Link>
          </div>
          <p className="mt-4 text-sm text-taupe">
            Sign up online, Call or{" "}
            <a
              href={waLink("Hi Melt Aways, I'd like to ask about becoming a Meltaways VIP member.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              WhatsApp {SITE.phone.replace("1(868) ", "")}
            </a>{" "}
            to ask about becoming a Meltaways VIP member.
          </p>
        </div>

        <div className="relative min-h-[280px] lg:min-h-full bg-cream order-first lg:order-none">
          <img
            src={vipImage.url}
            alt="Meltaways therapist performing a body sculpting treatment"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream/80 to-transparent lg:hidden" aria-hidden />
          <div className="absolute inset-y-0 left-0 hidden lg:block w-28 bg-gradient-to-r from-cream via-cream/70 to-transparent" aria-hidden />
        </div>
      </div>

    </Section>
  );
}