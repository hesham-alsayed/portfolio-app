export type SkillCategory = "frontend" | "backend" | "tools" | "other";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface HeroAction {
  label: string;
  href: string;
  variant?: ButtonVariant;
}

export interface PersonalInfo {
  _id: string;
  name: string;
  role: string;
  headline: string;
  subheadline?: string;
  bio: string;
  email?: string;
  location?: string;
  resumeUrl?: string;
  heroActions?: HeroAction[];
}

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  iconKey: string;
  order?: number;
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: SanityImageAsset;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
  order?: number;
}

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  iconKey: string;
  order?: number;
}

export interface SectionLabels {
  about?: string;
  projects?: string;
  experience?: string;
  contact?: string;
}

export interface ContactSectionContent {
  heading?: string;
  description?: string;
  submitLabel?: string;
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  successMessage?: string;
}

export interface ProjectActionLabels {
  live?: string;
  source?: string;
}

export interface SkillCategoryLabels {
  frontend?: string;
  backend?: string;
  tools?: string;
  other?: string;
}

export interface SiteSettings {
  _id: string;
  siteTitle: string;
  siteDescription: string;
  sectionLabels?: SectionLabels;
  contactSection?: ContactSectionContent;
  projectActionLabels?: ProjectActionLabels;
  skillCategoryLabels?: SkillCategoryLabels;
  experiencePresentLabel?: string;
  footerText?: string;
}

export interface PortfolioData {
  siteSettings: SiteSettings | null;
  personalInfo: PersonalInfo | null;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}
