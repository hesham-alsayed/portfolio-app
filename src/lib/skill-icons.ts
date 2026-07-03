import type { IconType } from "react-icons";
import {
  FaCode,
  FaDatabase,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaServer,
} from "react-icons/fa";
import {
  SiCss,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const skillIconMap: Record<string, IconType> = {
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  nodejs: FaNodeJs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  graphql: SiGraphql,
  redux: SiRedux,
  docker: FaDocker,
  aws: FaAws,
  firebase: SiFirebase,
  python: FaPython,
  git: FaGitAlt,
  figma: FaFigma,
  vercel: SiVercel,
  database: FaDatabase,
  backend: FaServer,
};

export function getSkillIcon(iconKey: string): IconType {
  return skillIconMap[iconKey.toLowerCase()] ?? FaCode;
}
