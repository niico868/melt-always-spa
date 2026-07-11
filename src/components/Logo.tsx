import { SITE } from "@/lib/site";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={SITE.logoMEA} alt="Melt Elite Aesthetics" className={className} />;
}