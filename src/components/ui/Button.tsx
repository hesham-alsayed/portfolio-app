"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "ghost";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function Button({
  variant = "primary",
  href,
  external = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed";

  const styles = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90",
    ghost:
      "border border-foreground/20 text-foreground hover:bg-muted",
  };

  const classes = `${base} ${styles[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    if (external || href.startsWith("http")) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.div {...motionProps}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
