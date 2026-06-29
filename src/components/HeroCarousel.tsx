import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeLux } from "@/lib/motion";
import heroBanner from "@/assets/hero-banner-treatment.png.asset.json";
import heroBanner2 from "@/assets/hero-banner2-consult.png.asset.json";
import heroBanner3 from "@/assets/hero-banner3-consult.png.asset.json";

// Order matches the brief: hero-banner2 → hero-banner3 → hero-banner.
const SLIDES = [
  { src: heroBanner2.url, tint: "rgba(245, 226, 226, 0.22)" },
  { src: heroBanner3.url, tint: "rgba(250, 240, 226, 0.20)" },
  { src: heroBanner.url, tint: "rgba(232, 209, 196, 0.18)" },
];

export function HeroCarousel() {
  const [ready, setReady] = useState(false);
  const [i, setI] = useState(0);

  // Preload — only start rotation once every slide has decoded.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SLIDES.map(
        (s) =>
          new Promise<void>((res) => {
            const img = new Image();
            img.onload = () => res();
            img.onerror = () => res();
            img.src = s.src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [ready]);

  const slide = SLIDES[i];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Image layer */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.6, ease: easeLux }}
        >
          <img
            src={slide.src}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center lg:object-right"
            width={1024}
            height={1024}
          />
        </motion.div>
      </AnimatePresence>

      {/* Mobile readability wash — heavier on the top-left where the headline sits */}
      <motion.div
        className="absolute inset-0 pointer-events-none lg:hidden"
        initial={false}
        animate={{
          background: `linear-gradient(160deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 78%, transparent) 38%, color-mix(in oklab, var(--background) 40%, transparent) 70%, color-mix(in oklab, var(--background) 14%, transparent) 100%)`,
        }}
        transition={{ duration: 1.6, ease: easeLux }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        initial={false}
        animate={{
          background: `linear-gradient(90deg, color-mix(in oklab, var(--background) 88%, transparent) 0%, color-mix(in oklab, var(--background) 70%, transparent) 32%, color-mix(in oklab, var(--background) 24%, transparent) 62%, transparent 100%)`,
        }}
        transition={{ duration: 1.6, ease: easeLux }}
      />

      {/* Dynamic tint that follows the active slide and always backs the text */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ backgroundColor: slide.tint }}
        transition={{ duration: 1.8, ease: easeLux }}
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Show slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-primary" : "w-2.5 bg-primary/30"}`}
          />
        ))}
      </div>
    </div>
  );
}