"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
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

export function ProjectsSection({
  projects,
  sectionLabel,
  heading,
  description,
  actionLabels,
}: ProjectsSectionProps) {

  return (
    <section id="projects" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex items-center rounded-md border border-transparent bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
            {sectionLabel}
          </p>

          {heading ? (
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {heading}
            </h2>
          ) : null}

          {description ? (
            <p className="mt-2 text-lg text-muted-foreground sm:mt-4">
              {description}
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-accent transition-all hover:border-primary/50"
            >
              <div className="relative h-64 overflow-hidden bg-accent">
                {project.image ? (
                  <img
                    src={urlForImage(project.image).width(600).height(300).url()}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>

                <p className="mb-4 text-muted-foreground">
                  {project.description}
                </p>

                {project.techStack?.length ? (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex gap-3">
                  {project.storeUrl ? (
                    <a
                      href={project.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      {actionLabels?.live || "Live Demo"}
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-none transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <FiGithub className="h-4 w-4" />
                      {actionLabels?.source || "View Code"}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
