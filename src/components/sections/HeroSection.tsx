"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowDown, FaBolt } from "react-icons/fa";
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <SpiderWebCanvas />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-screen-md text-center"
      >
        <motion.span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
          <FaBolt className="h-3 w-3" />
          {personalInfo.role}
        </motion.span>

        <motion.p className="mt-8 text-lg font-semibold text-foreground sm:text-xl">
          Hi, I&apos;m {personalInfo.name}
        </motion.p>

        <motion.h1 className="mt-2 text-4xl font-bold tracking-tight !leading-[1.15] sm:text-5xl md:text-6xl lg:text-7xl">
          Building Scalable & Engaging
          <br />
          Web Experiences
        </motion.h1>

        {personalInfo.subheadline ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-[17px] leading-relaxed text-muted-foreground md:text-lg"
          >
            {personalInfo.subheadline}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90"
          >
            See What I Do
            <FaArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
