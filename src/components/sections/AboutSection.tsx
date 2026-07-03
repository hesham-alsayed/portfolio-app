"use client";

import { motion } from "framer-motion";
import type {
  PersonalInfo,
  Skill,
  SkillCategory,
  SkillCategoryLabels,
} from "@/types/cms";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";
import { getOrderedSkillCategories, groupSkillsByCategory } from "@/lib/utils";

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  skills: Skill[];
  sectionLabel?: string;
  categoryLabels?: SkillCategoryLabels;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export function AboutSection({
  personalInfo,
  skills,
  sectionLabel,
  categoryLabels,
}: AboutSectionProps) {
  if (!sectionLabel) return null;

  const grouped = groupSkillsByCategory(skills);
  const categories = getOrderedSkillCategories(skills);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={sectionLabel} />

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-medium text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {personalInfo.location}
            </div>
            <p className="text-lg font-medium text-foreground">
              {personalInfo.name}
            </p>
            <p className="text-base leading-relaxed text-muted">
              {personalInfo.bio}
            </p>
            {personalInfo.email ? (
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80"
              >
                <span className="underline underline-offset-4">
                  {personalInfo.email}
                </span>
              </a>
            ) : null}
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {categories.map((category) => {
              const label = categoryLabels?.[category as keyof SkillCategoryLabels];
              if (!label) return null;

              return (
                <motion.div
                  key={category}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">
                    {label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {grouped[category as SkillCategory].map((skill, index) => (
                      <SkillCard key={skill._id} skill={skill} index={index} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
