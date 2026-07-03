"use client";

import { motion } from "framer-motion";
import type { PersonalInfo } from "@/types/cms";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection({ personalInfo }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-6 py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-accent/5 blur-2xl" />
        <div className="absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-accent/5 blur-2xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-accent"
        >
          {personalInfo.role}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          {personalInfo.headline}
        </motion.h1>

        {personalInfo.subheadline ? (
          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {personalInfo.subheadline}
          </motion.p>
        ) : null}

        {personalInfo.heroActions?.length ? (
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {personalInfo.heroActions.map((action) => (
              <Button
                key={`${action.label}-${action.href}`}
                href={action.href}
                variant={action.variant ?? "primary"}
              >
                {action.label}
              </Button>
            ))}
          </motion.div>
        ) : null}

        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center gap-6 text-muted"
        >
          <span className="h-px w-12 bg-border" />
          <span className="text-xs uppercase tracking-[0.2em]">
            MERN Stack
          </span>
          <span className="h-px w-12 bg-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}
