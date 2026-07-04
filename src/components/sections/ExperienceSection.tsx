"use client";

import { FiCalendar, FiBriefcase } from "react-icons/fi";
import type { Experience } from "@/types/cms";

interface ExperienceSectionProps {
  experience: Experience[];
  sectionLabel?: string;
  heading?: string;
  description?: string;
  presentLabel?: string;
}

function formatDate(startDate: string, endDate?: string, isCurrent?: boolean, presentLabel?: string) {
  const s = startDate;
  const e = isCurrent ? (presentLabel || "Present") : (endDate || "");
  return e ? `${s} - ${e}` : s;
}

export function ExperienceSection({
  experience,
  sectionLabel,
  heading,
  description,
}: ExperienceSectionProps) {

  return (
    <section id="experience" className="relative px-6 py-20">
      <div className="mx-auto max-w-screen-md">
        <div className="mb-12 text-center">
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
        </div>

        <div className="space-y-0">
          {experience.map((item, index) => (
            <div
              key={item._id}
              className={`relative pl-8 ${index < experience.length - 1 ? "pb-12" : ""}`}
            >
              <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted">
                <div className="absolute -left-[5px] top-0 h-3 w-3 rounded-full border-2 border-primary bg-background" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent">
                    <FiBriefcase className="size-5 text-muted-foreground" />
                  </div>
                  <span className="text-lg font-semibold">{item.company}</span>
                </div>

                <div>
                  <h3 className="text-xl font-medium">{item.role}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <FiCalendar className="size-4" />
                    <span>{formatDate(item.startDate, item.endDate, item.isCurrent)}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
