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
    <header className="fixed top-6 inset-x-4 z-50 flex justify-center">
      <div className="mx-auto flex h-14 w-full max-w-screen-md items-center justify-between rounded-full border border-border bg-background px-3 shadow-xs">
        <a href="#hero" className="px-2 text-sm font-semibold tracking-tight">
          {siteTitle || "Portfolio"}
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {sections.map((section) => {
            const label =
              sectionLabels?.[section as keyof SectionLabels] ||
              section.charAt(0).toUpperCase() + section.slice(1);
            return (
              <a
                key={section}
                href={`#${section}`}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {label}
              </a>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full mt-2 w-full max-w-screen-md rounded-2xl border border-border bg-background p-2 shadow-lg md:hidden"
          >
            {sections.map((section) => {
              const label =
                sectionLabels?.[section as keyof SectionLabels] ||
                section.charAt(0).toUpperCase() + section.slice(1);
              return (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {label}
                </a>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
