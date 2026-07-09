"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaBolt } from "react-icons/fa";
import { urlForFile } from "@/lib/sanity/image";
import type { PersonalInfo } from "@/types/cms";
import { SpiderWebCanvas } from "@/components/ui/SpiderWebCanvas";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export function HeroSection({ personalInfo }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative mt-8 flex min-h-screen items-center justify-center overflow-hidden px-6">
      <SpiderWebCanvas />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-screen-md text-center">
        <motion.span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
          <FaBolt className="h-3 w-3" />
          {personalInfo.role}
        </motion.span>

        <motion.h1 className="mt-2 text-3xl font-bold tracking-tight !leading-[1.15] sm:text-5xl md:text-4xl lg:text-6xl">
          Building Scalable & Engaging Web Experiences
        </motion.h1>

        {personalInfo.subheadline ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-[17px] leading-relaxed text-muted-foreground md:text-lg">
            {personalInfo.subheadline}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90">
            See What I Do
            <FaArrowDown className="h-4 w-4" />
          </a>
          {personalInfo.cvFile ? (
            <a
              href={urlForFile(personalInfo.cvFile)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
