"use client";

import { motion } from "framer-motion";
import type { Project, ProjectActionLabels } from "@/types/cms";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
  sectionLabel?: string;
  actionLabels?: ProjectActionLabels;
}

export function ProjectsSection({
  projects,
  sectionLabel,
  actionLabels,
}: ProjectsSectionProps) {
  if (!sectionLabel || projects.length === 0) return null;

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={sectionLabel} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              liveLabel={actionLabels?.live}
              sourceLabel={actionLabels?.source}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
