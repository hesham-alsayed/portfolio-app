"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { SectionLabels } from "@/types/cms";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  siteTitle?: string;
  sectionLabels?: SectionLabels;
}

const navItems = [
  { key: "about" as const, href: "#about" },
  { key: "projects" as const, href: "#projects" },
  { key: "experience" as const, href: "#experience" },
  { key: "contact" as const, href: "#contact" },
];

export function Header({ siteTitle, sectionLabels }: HeaderProps) {
  const visibleNavItems = navItems.filter((item) => sectionLabels?.[item.key]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#hero"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {siteTitle}
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex">
            {visibleNavItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-sm text-muted transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {sectionLabels?.[item.key]}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
