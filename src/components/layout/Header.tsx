"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SectionLabels } from "@/types/cms";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface HeaderProps {
  siteTitle?: string;
  sectionLabels?: SectionLabels;
}

const sections = ["about", "projects", "skills", "experience", "contact"];

export function Header({ siteTitle, sectionLabels }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#hero" className="text-sm font-semibold tracking-tight">
          {siteTitle || "Portfolio"}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {sections.map((section) => {
            const label =
              sectionLabels?.[section as keyof SectionLabels] ||
              section.charAt(0).toUpperCase() + section.slice(1);
            return (
              <a
                key={section}
                href={`#${section}`}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md"
            aria-label="Menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((section) => {
                const label =
                  sectionLabels?.[section as keyof SectionLabels] ||
                  section.charAt(0).toUpperCase() + section.slice(1);
                return (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
