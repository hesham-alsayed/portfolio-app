"use client";

import { motion } from "framer-motion";
import type { PersonalInfo } from "@/types/cms";

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  sectionLabel?: string;
}

export function AboutSection({
  personalInfo,
  sectionLabel,
}: AboutSectionProps) {
  if (!sectionLabel) return null;

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {sectionLabel}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-foreground/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-6 text-center"
        >
          {personalInfo.location ? (
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
              {personalInfo.location}
            </div>
          ) : null}

          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {personalInfo.bio}
          </p>

          {personalInfo.email ? (
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              <span className="underline underline-offset-4">
                {personalInfo.email}
              </span>
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
