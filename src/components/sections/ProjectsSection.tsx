"use client";

import { motion } from "framer-motion";
import { FiGlobe, FiGithub } from "react-icons/fi";
import type { Project, ProjectActionLabels } from "@/types/cms";
import { Badge } from "@/components/ui/badge";
import { urlForImage } from "@/lib/sanity/image";

interface ProjectsSectionProps {
  projects: Project[];
  sectionLabel?: string;
  heading?: string;
  description?: string;
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
  heading,
  description,
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
          <p className="inline-flex items-center rounded-full bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border">
            {sectionLabel}
          </p>

          {heading ? (
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {heading}
            </h2>
          ) : null}

          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {description}
            </p>
          ) : null}

          <div className="mx-auto mt-6 h-px w-16 bg-foreground/20" />
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
              className="flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex aspect-[2/1] items-center justify-center bg-gradient-to-br from-muted to-accent">
                {project.image ? (
                  <img
                    src={urlForImage(project.image).width(600).height(300).url()}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-muted-foreground/20">
                    {project.title.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7 pt-6">
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

                <div className="mt-6 flex flex-wrap gap-3 pt-1">
                  {project.storeUrl ? (
                    <a
                      href={project.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-foreground/90 hover:-translate-y-0.5"
                    >
                      <FiGlobe className="text-sm" />
                      {actionLabels?.live || "Live Demo"}
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-foreground/20 bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
                    >
                      <FiGithub className="text-sm" />
                      {actionLabels?.source || "View Code"}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
