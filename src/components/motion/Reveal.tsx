import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, baseTransition, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variants?: Variants;
  as?: "div" | "section" | "li" | "article" | "span";
};

export function Reveal({
  children,
  delay = 0,
  duration,
  className,
  variants = fadeUp,
  as = "div",
}: Props) {
  const Comp: any = (motion as any)[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      transition={{ ...baseTransition, delay, ...(duration ? { duration } : {}) }}
    >
      {children}
    </Comp>
  );
}