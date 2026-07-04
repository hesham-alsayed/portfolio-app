"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaCode, FaEnvelope, FaBolt } from "react-icons/fa";
import type { PersonalInfo } from "@/types/cms";
import { SpiderWebCanvas } from "@/components/ui/SpiderWebCanvas";

interface HeroSectionProps {
  personalInfo: PersonalInfo;
}

export function HeroSection({ personalInfo }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const text = personalInfo.headline || personalInfo.name;
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [personalInfo.headline, personalInfo.name]);

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
        <motion.span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
          <FaBolt className="h-3 w-3" />
          {personalInfo.role}
        </motion.span>

        <motion.h1 className="mt-6 text-4xl font-bold tracking-tight !leading-[1.2] sm:text-5xl md:text-6xl">
          {displayedText.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-letter"
              style={{ animationDelay: `${i * 0.035}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
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
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          {personalInfo.heroActions?.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90 w-full sm:w-auto"
            >
              {action.label === "View Projects" ? <FaCode className="h-4 w-4" /> : null}
              {action.label === "Contact Me" ? <FaEnvelope className="h-4 w-4" /> : null}
              {action.label}
            </a>
          ))}
          {personalInfo.resumeUrl ? (
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
            >
              <FaDownload className="h-4 w-4" />
              Resume
            </a>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
