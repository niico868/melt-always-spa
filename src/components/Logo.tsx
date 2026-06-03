import { SITE } from "@/lib/site";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={SITE.logo} alt="Melt Aways" className={className} width={160} height={160} />;
}