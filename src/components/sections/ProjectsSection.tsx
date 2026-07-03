"use client";

import { motion } from "framer-motion";
import { FiGlobe } from "react-icons/fi";
import type { Project, ProjectActionLabels } from "@/types/cms";
import { Badge } from "@/components/ui/badge";

interface ProjectsSectionProps {
  projects: Project[];
  sectionLabel?: string;
  actionLabels?: ProjectActionLabels;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProjectsSection({
  projects,
  sectionLabel,
  actionLabels,
}: ProjectsSectionProps) {
  if (!sectionLabel) return null;

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              variants={cardVariants}
              className="flex flex-col rounded-2xl border border-foreground/10 bg-card p-7 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-foreground">
                {project.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {project.techStack?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 pt-1">
                {project.storeUrl ? (
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-foreground/20 bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
                  >
                    <FiGlobe className="text-sm" />
                    {actionLabels?.live || "Live Demo"}
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
