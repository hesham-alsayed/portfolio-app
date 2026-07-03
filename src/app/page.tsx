import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/providers/PageTransition";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { isSanityConfigured } from "@/lib/sanity/env";
import { getPortfolioData } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();

  if (!data?.siteSettings) {
    return {};
  }

  return {
    title: data.siteSettings.siteTitle,
    description: data.siteSettings.siteDescription,
  };
}

export default async function HomePage() {
  const data = await getPortfolioData();

  if (!isSanityConfigured() || !data?.personalInfo || !data.siteSettings) {
    return <main className="min-h-screen" />;
  }

  const { siteSettings, personalInfo, skills, projects, experience, socialLinks, categories } =
    data;

  return (
    <>
      <Header
        siteTitle={siteSettings.siteTitle}
        sectionLabels={siteSettings.sectionLabels}
      />

      <PageTransition>
        <main>
          <HeroSection personalInfo={personalInfo} />

          <AboutSection
            personalInfo={personalInfo}
            sectionLabel={siteSettings.sectionLabels?.about}
          />

          <ProjectsSection
            projects={projects}
            sectionLabel={siteSettings.sectionLabels?.projects}
            actionLabels={siteSettings.projectActionLabels}
          />

          <SkillsSection
            skills={skills}
            categories={categories}
            sectionLabel="Skills"
          />

          <ExperienceSection
            experience={experience}
            sectionLabel={siteSettings.sectionLabels?.experience}
            presentLabel={siteSettings.experiencePresentLabel}
          />

          <ContactSection
            contactSection={siteSettings.contactSection}
            socialLinks={socialLinks}
            email={personalInfo.email}
          />
        </main>
      </PageTransition>

      <Footer siteSettings={siteSettings} />
    </>
  );
}
