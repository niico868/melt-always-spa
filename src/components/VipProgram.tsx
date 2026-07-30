import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Crown, Hourglass, Phone, ClipboardList, Users, Sparkles, Check } from "lucide-react";
import { Section } from "@/components/Section";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  { icon: ClipboardList, title: "Personalized", sub: "Spa Roadmap" },
  { icon: Users, title: "VIP Support &", sub: "Accountability" },
  { icon: Sparkles, title: "Advanced", sub: "Treatments" },
];

export function VipProgram() {
  const [open, setOpen] = useState(false);

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
            Bring your body, beauty and wellness goals together through one customized transformation
            journey. Your VIP plan may combine suitable treatments, ongoing progress tracking and
            personalized adjustments—all under one convenient monthly payment.
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
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-medium hover:opacity-90 lift-on-hover soft-shadow"
            >
              <Crown className="w-4 h-4" /> Book Your VIP Consultation
            </button>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-full bg-background border border-ink/15 px-6 py-3.5 font-medium hover:bg-blush lift-on-hover"
            >
              Learn More About VIP
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

      <VipConsultDialog open={open} onOpenChange={setOpen} />
    </Section>
  );
}

function VipConsultDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/public/submit-consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          full_name: fd.get("full_name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          concern: fd.get("concern"),
          areas: fd.get("areas"),
          notes: fd.get("notes"),
          preferred_date: fd.get("preferred_date"),
          preferred_time: fd.get("preferred_time"),
          location: "El Dorado",
          suggested_package: "VIP Transformation Program",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      setStatus("done");
      setMessage("Thank you — your VIP consultation request has been received. Our team will reach out shortly.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Please try WhatsApp or call us.");
    }
  }

  const field = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">VIP Consultation Request</DialogTitle>
        </DialogHeader>
        {status === "done" ? (
          <p className="text-sm text-taupe leading-relaxed py-4">{message}</p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input name="full_name" required placeholder="Full name" className={field} />
            <div className="grid sm:grid-cols-2 gap-3">
              <input name="phone" required placeholder="Phone / WhatsApp" className={field} />
              <input name="email" type="email" placeholder="Email" className={field} />
            </div>
            <input name="concern" placeholder="Your main goal (e.g. fat loss, toning, skin)" className={field} />
            <input name="areas" placeholder="Areas of focus" className={field} />
            <div className="grid sm:grid-cols-2 gap-3">
              <input name="preferred_date" type="date" className={field} />
              <input name="preferred_time" type="time" className={field} />
            </div>
            <textarea name="notes" rows={3} placeholder="Anything else we should know?" className={field} />
            {status === "error" && <p className="text-sm text-destructive">{message}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-medium disabled:opacity-60"
            >
              <Crown className="w-4 h-4" />
              {status === "sending" ? "Sending…" : "Submit VIP Request"}
            </button>
            <p className="text-xs text-taupe text-center">
              Prefer to talk? Call or WhatsApp <Phone className="inline w-3 h-3" /> {SITE.phone}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}