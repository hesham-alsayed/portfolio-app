"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types/cms";
import { getSkillIcon } from "@/lib/skill-icons";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = getSkillIcon(skill.iconKey);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ y: -2, scale: 1.05 }}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
    >
      <Icon className="h-4 w-4" aria-hidden />
      {skill.name}
    </motion.span>
  );
}
