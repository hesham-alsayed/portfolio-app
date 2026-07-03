"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/types/cms";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "./Button";

interface ProjectCardProps {
  project: Project;
  index: number;
  liveLabel?: string;
  sourceLabel?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ProjectCard({
  project,
  index,
  liveLabel,
  sourceLabel,
}: ProjectCardProps) {
  const imageUrl = project.image
    ? urlForImage(project.image).width(800).height(500).fit("crop").url()
    : null;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8 }}
      transition={{ delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
    >
      {imageUrl ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-accent/5">
          <span className="text-4xl font-bold text-accent/20">
            {project.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="space-y-5 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={`${project._id}-${tech}`}
              className="rounded-full bg-accent/8 px-3 py-1 text-xs font-medium text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.liveUrl && liveLabel ? (
            <Button href={project.liveUrl} external variant="primary">
              {liveLabel}
            </Button>
          ) : null}
          {project.githubUrl && sourceLabel ? (
            <Button href={project.githubUrl} external variant="secondary">
              {sourceLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
