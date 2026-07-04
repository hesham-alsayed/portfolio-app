"use client";

import { motion } from "framer-motion";
import { FaGithub, FaDownload, FaUser } from "react-icons/fa";
import type { PersonalInfo } from "@/types/cms";

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  githubUrl?: string;
  sectionLabel?: string;
}

export function AboutSection({
  personalInfo,
  githubUrl,
  sectionLabel,
}: AboutSectionProps) {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12 md:flex-row-reverse md:items-start"
        >
          <div className="w-80">
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-accent">
              <FaUser className="h-16 w-16 text-muted-foreground/40" />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <p className="text-sm font-medium text-muted-foreground">
              {sectionLabel || "About Me"}
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Passionate about creating impactful web experiences
            </h2>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
                >
                  <FaGithub className="h-4 w-4" />
                  View Github
                </a>
              ) : null}
              {personalInfo.resumeUrl ? (
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <FaDownload className="h-4 w-4" />
                  Download CV
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
