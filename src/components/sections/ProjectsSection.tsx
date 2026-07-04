"use client";

import { FiGlobe, FiGithub, FiArrowUpRight } from "react-icons/fi";
import type { Project, ProjectActionLabels } from "@/types/cms";
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
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full max-w-[800px] mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="z-10 rounded-xl border bg-primary px-4 py-1">
              <span className="text-sm font-medium text-primary-foreground">{sectionLabel}</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>

          <div className="flex flex-col gap-y-3 items-center justify-center">
            {heading ? (
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{heading}</h2>
            ) : null}
            {description ? (
              <p className="max-w-[600px] text-balance text-center text-muted-foreground md:text-lg/relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mx-auto grid max-w-[800px] auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:cursor-pointer hover:ring-2 hover:ring-muted"
            >
              <div className="relative shrink-0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  href={project.storeUrl || project.githubUrl || "#"}
                >
                  <div className="flex h-48 w-full items-center justify-center bg-accent">
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
                </a>

                <div className="absolute right-2 top-2 flex flex-wrap gap-2">
                  {project.storeUrl ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.storeUrl}
                    >
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-transparent bg-black px-2.5 py-0.5 text-xs font-semibold text-white shadow transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        <FiGlobe className="size-3" />
                        {actionLabels?.live || "Website"}
                      </div>
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.githubUrl}
                    >
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-transparent bg-black px-2.5 py-0.5 text-xs font-semibold text-white shadow transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        <FiGithub className="size-3" />
                        {actionLabels?.source || "Source"}
                      </div>
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{project.title}</h3>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Open ${project.title}`}
                    href={project.storeUrl || project.githubUrl || "#"}
                  >
                    <FiArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {project.techStack?.length ? (
                  <div className="mt-auto flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="inline-flex h-6 w-fit items-center rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-foreground transition-colors"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
