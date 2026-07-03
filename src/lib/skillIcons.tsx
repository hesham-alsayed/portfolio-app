import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiFramer,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  react: <FaReact />,
  nextjs: <SiNextdotjs />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  tailwindcss: <SiTailwindcss />,
  redux: <SiRedux />,
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
  framer: <SiFramer />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  git: <FaGitAlt />,
  github: <FaGithub />,
  mongodb: <SiMongodb />,
  postgresql: <SiPostgresql />,
  prisma: <SiPrisma />,
  backend: <FaNodeJs />,
  database: <SiMongodb />,
};

export function getSkillIcon(iconKey: string): ReactNode {
  const key = iconKey?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return iconMap[key as keyof typeof iconMap] || <FaReact />;
}
