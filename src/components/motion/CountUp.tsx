import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  /** flicker briefly then cushion into final value (great for hero counters) */
  flicker?: boolean;
};

export function CountUp({ value, suffix = "", prefix = "", duration = 1.6, className, decimals = 0, flicker = false }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const totalMs = duration * 1000;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / totalMs);
      // ease-out quint — fast rise, gentle cushion at the end
      const eased = 1 - Math.pow(1 - p, 5);
      let display = value * eased;
      if (flicker) {
        // brief jitter between ~55% and ~92% of the way through so the
        // number visibly ticks up like an odometer, then smooth cushion.
        if (p > 0.55 && p < 0.92) {
          const jitterRange = Math.max(1, value * 0.04 * (1 - p));
          display += (Math.random() - 0.5) * jitterRange;
          if (display < 0) display = 0;
          if (display > value) display = value;
        }
      }
      setN(display);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce, flicker]);

  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}