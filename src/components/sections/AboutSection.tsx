"use client";

import { motion } from "framer-motion";
import { FaGithub, FaDownload, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import type { About } from "@/types/cms";

interface AboutSectionProps {
  about: About | null;
  githubUrl?: string;
}

export function AboutSection({ about, githubUrl }: AboutSectionProps) {
  if (!about) return null;

  const b1Label = about.button1Label || "View Github";
  const b2Label = about.button2Label || "Download CV";

  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-12 lg:flex-row-reverse lg:items-start"
        >
          <div className="hidden lg:block w-80">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-accent">
              {about.imageUrl ? (
                <img src={about.imageUrl} alt={about.sectionName} className="h-full w-full object-cover" />
              ) : (
                <FaUser className="h-16 w-16 text-muted-foreground/40" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border">
              {about.sectionName || "About Me"}
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {about.heading}
            </h2>

            {about.location ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaMapMarkerAlt className="h-3.5 w-3.5" />
                {about.location}
              </p>
            ) : null}

            <p className="text-lg leading-relaxed text-muted-foreground">
              {about.body}
            </p>

            {about.bio ? (
              <p className="text-base leading-relaxed text-muted-foreground/80">
                {about.bio}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              {(b1Label === "View Github" ? githubUrl : about.button1Url) ? (
                <a
                  href={b1Label === "View Github" ? (githubUrl || about.button1Url) : about.button1Url}
                  target={b1Label === "View Github" ? "_blank" : undefined}
                  rel={b1Label === "View Github" ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
                >
                  {b1Label === "View Github" ? <FaGithub className="h-4 w-4" /> : null}
                  {b1Label}
                </a>
              ) : null}
              {about.button2Url ? (
                <a
                  href={about.button2Url}
                  className="inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  {b2Label === "Download CV" ? <FaDownload className="h-4 w-4" /> : null}
                  {b2Label}
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
