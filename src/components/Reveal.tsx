"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal wrapper, now framer-motion powered:
 * - spring on exit of viewport bottom (subtle overshoot, feels alive)
 * - stagger via delay prop (kept for existing call sites)
 * - once: true — reveals only the first time, no re-triggering on scroll-up
 * - useReducedMotion: renders final state immediately, no animation
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: reduce ? 0 : delay / 1000,
        ease: [0.21, 0.65, 0.35, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
