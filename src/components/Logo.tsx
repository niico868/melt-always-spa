import { SITE } from "@/lib/site";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={SITE.logo} alt="Melt Aways — Where we destroy fat and reveal the you inside" className={className} />;
}