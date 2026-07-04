import heroVideo from "@/assets/hero-video.mp4.asset.json";

/**
 * HeroMedia — full-bleed autoplaying background video with a warm readability
 * wash so the left-aligned headline stays legible.
 */
export function HeroMedia() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="w-full h-full object-cover object-center"
      />

      {/* Mobile readability wash — heavier on the top-left where the headline sits */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 78%, transparent) 38%, color-mix(in oklab, var(--background) 40%, transparent) 70%, color-mix(in oklab, var(--background) 14%, transparent) 100%)",
        }}
      />
      {/* Desktop wash — left column readable, right side lets video breathe */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--background) 88%, transparent) 0%, color-mix(in oklab, var(--background) 70%, transparent) 32%, color-mix(in oklab, var(--background) 24%, transparent) 62%, transparent 100%)",
        }}
      />

      {/* Warm tint that always backs the text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(232, 209, 196, 0.16)", mixBlendMode: "multiply" }}
      />
    </div>
  );
}

// Preserve the old name as an alias to avoid breaking any lingering imports.
export function HeroCarousel() {
  return <HeroMedia />;
}

// Old-style eager-load for the still images is no longer required; the block
// below is intentionally left as a no-op placeholder for the previous
// implementation.
function _legacy() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);
  void setReady; void setI; void i; void ready;
  return null;
}