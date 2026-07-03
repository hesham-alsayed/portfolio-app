import type { Skill, SkillCategory } from "@/types/cms";

const categoryOrder: SkillCategory[] = [
  "frontend",
  "backend",
  "tools",
  "other",
];

export function groupSkillsByCategory(
  skills: Skill[],
): Record<SkillCategory, Skill[]> {
  const grouped: Record<SkillCategory, Skill[]> = {
    frontend: [],
    backend: [],
    tools: [],
    other: [],
  };

  for (const skill of skills) {
    grouped[skill.category]?.push(skill);
  }

  return grouped;
}

export function getOrderedSkillCategories(
  skills: Skill[],
): SkillCategory[] {
  const grouped = groupSkillsByCategory(skills);
  return categoryOrder.filter((category) => grouped[category].length > 0);
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
