import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Skill } from "@/types/cms";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupSkillsByCategory(
  skills: Skill[],
): Record<string, Skill[]> {
  const grouped: Record<string, Skill[]> = {};

  for (const skill of skills) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  }

  return grouped;
}

export function formatExperienceDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatExperienceRange(
  startDate: string,
  endDate?: string,
  isCurrent?: boolean,
  presentLabel?: string,
): string {
  const start = formatExperienceDate(startDate);
  const end =
    isCurrent || !endDate
      ? presentLabel ?? ""
      : formatExperienceDate(endDate);
  return end ? `${start} — ${end}` : start;
}
