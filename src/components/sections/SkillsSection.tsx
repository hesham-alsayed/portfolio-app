"use client";

import { motion } from "framer-motion";
import type { Skill, SkillCategory, SkillCategoryLabels } from "@/types/cms";
import { getOrderedSkillCategories, groupSkillsByCategory } from "@/lib/utils";
import { getSkillIcon } from "@/lib/skillIcons";

interface SkillsSectionProps {
  skills: Skill[];
  sectionLabel?: string;
  categoryLabels?: SkillCategoryLabels;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function SkillsSection({
  skills,
  sectionLabel,
  categoryLabels,
}: SkillsSectionProps) {
  const grouped = groupSkillsByCategory(skills);
  const categories = getOrderedSkillCategories(skills);

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {sectionLabel || "Skills"}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-foreground/20" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 space-y-16"
        >
          {categories.map((category) => {
            const label =
              categoryLabels?.[category as keyof SkillCategoryLabels] ||
              category;
            const categorySkills = grouped[category as SkillCategory];

            return (
              <motion.div key={category} variants={itemVariants}>
                <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {label}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill._id}
                      className="inline-flex items-center gap-2 rounded-xl border border-foreground/10 bg-muted/60 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-sm"
                    >
                      <span className="text-base">
                        {getSkillIcon(skill.iconKey)}
                      </span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
