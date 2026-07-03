"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/types/cms";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

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
  if (!sectionLabel || experience.length === 0) return null;

  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={sectionLabel} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {experience.map((item, index) => (
            <TimelineItem
              key={item._id}
              item={item}
              index={index}
              presentLabel={presentLabel}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
