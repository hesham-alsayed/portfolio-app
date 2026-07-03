"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import type { Experience } from "@/types/cms";
import { formatExperienceRange } from "@/lib/utils";

interface ExperienceSectionProps {
  experience: Experience[];
  sectionLabel?: string;
  presentLabel?: string;
}

export function ExperienceSection({
  experience,
  sectionLabel,
  presentLabel,
}: ExperienceSectionProps) {
  if (!sectionLabel) return null;

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {sectionLabel}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-foreground/20" />
        </motion.div>

        <div className="mt-16 space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="pb-8"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-muted">
                  {item.isCurrent ? (
                    <FaBriefcase className="text-sm text-muted-foreground" />
                  ) : (
                    <FaGraduationCap className="text-sm text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <span className="text-sm text-muted-foreground">
                      {item.company}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatExperienceRange(
                      item.startDate,
                      item.endDate,
                      item.isCurrent,
                      presentLabel,
                    )}
                  </p>
                  {item.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
