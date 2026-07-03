"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className="mb-16 space-y-4"
    >
      <div className="inline-flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {title}
        </span>
      </div>
      {subtitle ? (
        <p className="max-w-2xl text-base text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
