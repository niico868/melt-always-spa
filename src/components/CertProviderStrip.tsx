import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { INSTITUTIONS, CATEGORY_PILLS, CERT_COUNT } from "@/lib/certifications";

export function CertProviderStrip() {
  return (
    <section className="relative bg-gradient-to-b from-background to-blush/20 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary/80">
              <ShieldCheck className="w-4 h-4" /> Credentialed Care
            </p>
            <h2 className="mt-4 font-serif text-3xl lg:text-5xl text-ink leading-[1.1]">
              Professionally Trained.
              <span className="block italic text-primary">Continuously Certified.</span>
            </h2>
            <p className="mt-5 text-taupe leading-relaxed">
              Your treatments are performed by practitioners who continue investing in
              internationally recognized education and advanced aesthetic training.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
            <div className="text-center lg:text-left">
              <div className="font-serif text-6xl lg:text-7xl text-primary leading-none">
                <CountUp value={CERT_COUNT} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-taupe">
                Professional Certifications
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center lg:max-w-xl">
              {CATEGORY_PILLS.map((p) => (
                <span
                  key={p}
                  className="text-xs px-3 py-1.5 rounded-full bg-background border border-border/70 text-ink/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-14 border-y border-border/60 py-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:gap-x-12">
              {INSTITUTIONS.map((name, i) => (
                <li key={name} className="flex items-center gap-8 lg:gap-12">
                  <span className="font-serif text-sm lg:text-base tracking-wide text-taupe/70 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                    {name}
                  </span>
                  {i < INSTITUTIONS.length - 1 && (
                    <span className="hidden sm:inline-block w-px h-4 bg-border" aria-hidden />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-8 text-center">
          <Link
            to="/certifications"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            View All Certifications <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
