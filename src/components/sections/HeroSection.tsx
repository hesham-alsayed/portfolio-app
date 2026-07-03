"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaCode, FaEnvelope } from "react-icons/fa";
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
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.h1 className="whitespace-nowrap text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 text-lg font-medium text-muted-foreground sm:text-xl"
        >
          {personalInfo.role}
        </motion.p>

        {personalInfo.subheadline ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-6 mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {personalInfo.subheadline}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {personalInfo.heroActions?.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/20 bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
            >
              {action.label === "View Projects" ? <FaCode /> : null}
              {action.label === "Contact Me" ? <FaEnvelope /> : null}
              {action.label}
            </a>
          ))}
          {personalInfo.resumeUrl ? (
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-md border border-foreground/20 bg-background px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
            >
              <FaDownload />
              Resume
            </a>
          ) : null}
        </motion.div>
      </motion.div>
    </section>
  );
}
