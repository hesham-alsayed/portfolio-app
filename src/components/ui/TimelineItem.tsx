"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/types/cms";
import { formatExperienceRange } from "@/lib/utils";

interface TimelineItemProps {
  item: Experience;
  index: number;
  presentLabel?: string;
}

export function TimelineItem({ item, index, presentLabel }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-8 before:absolute before:left-[7px] before:top-3 before:h-full before:w-px before:bg-border last:before:hidden"
    >
      <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />

      <div className="rounded-xl border border-border bg-surface/30 p-5 transition-colors hover:border-accent/20">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {item.role}
            </h3>
            <p className="text-sm text-muted">{item.company}</p>
          </div>
          <span className="text-xs font-medium text-accent">
            {formatExperienceRange(
              item.startDate,
              item.endDate,
              item.isCurrent,
              presentLabel,
            )}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
