import floral from "@/assets/floral-accents.png.asset.json";

type Variant = "corner-tr" | "corner-bl" | "corner-tl" | "corner-br" | "center" | "hero" | "footer";

/**
 * Decorative gold botanical accent. Sourced from a black-background PNG so we use
 * mix-blend-mode: screen to drop the black and keep the gold linework.
 */
export function FloralAccent({
  variant = "corner-tr",
  className = "",
  opacity = 0.13,
}: {
  variant?: Variant;
  className?: string;
  opacity?: number;
}) {
  const base = "pointer-events-none absolute select-none";
  const map: Record<Variant, string> = {
    "corner-tr": "top-0 right-0 w-40 lg:w-56 -translate-y-3 translate-x-3 rotate-12",
    "corner-bl": "bottom-0 left-0 w-40 lg:w-56 translate-y-3 -translate-x-3 -rotate-12",
    "corner-tl": "top-0 left-0 w-40 lg:w-52 -translate-y-3 -translate-x-3 -rotate-6",
    "corner-br": "bottom-0 right-0 w-40 lg:w-56 translate-y-3 translate-x-3 rotate-6",
    "center":    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 lg:w-80",
    "hero":      "bottom-0 right-0 w-[55%] lg:w-[40%] max-w-[640px] translate-y-6 translate-x-4",
    "footer":    "top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[90%] max-w-[1100px]",
  };
  return (
    <img
      src={floral.url}
      alt=""
      aria-hidden
      loading="lazy"
      className={`${base} ${map[variant]} ${className}`}
      style={{ mixBlendMode: "screen", opacity }}
    />
  );
}

/** Thin gold full-width divider between sections. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-5 lg:px-10 ${className}`} aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}