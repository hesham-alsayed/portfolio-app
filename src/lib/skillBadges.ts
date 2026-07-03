interface BadgeConfig {
  color: string;
  logo: string;
  logoColor: "black" | "white";
  label: string;
}

const badgeMap: Record<string, BadgeConfig> = {
  react: { color: "61DAFB", logo: "react", logoColor: "black", label: "React" },
  nextjs: { color: "000000", logo: "next.js", logoColor: "white", label: "Next.js" },
  javascript: { color: "F7DF1E", logo: "javascript", logoColor: "black", label: "JavaScript" },
  typescript: { color: "3178C6", logo: "typescript", logoColor: "white", label: "TypeScript" },
  tailwindcss: { color: "06B6D4", logo: "tailwindcss", logoColor: "white", label: "Tailwind CSS" },
  redux: { color: "764ABC", logo: "redux", logoColor: "white", label: "Redux Toolkit" },
  html: { color: "E34F26", logo: "html5", logoColor: "white", label: "HTML5" },
  css: { color: "1572B6", logo: "css3", logoColor: "white", label: "CSS3" },
  framer: { color: "000000", logo: "framer", logoColor: "white", label: "Framer Motion" },
  nodejs: { color: "339933", logo: "nodedotjs", logoColor: "white", label: "Node.js" },
  express: { color: "000000", logo: "express", logoColor: "white", label: "Express.js" },
  git: { color: "F05032", logo: "git", logoColor: "white", label: "Git" },
  github: { color: "181717", logo: "github", logoColor: "white", label: "GitHub" },
  mongodb: { color: "47A248", logo: "mongodb", logoColor: "white", label: "MongoDB" },
  postgresql: { color: "336791", logo: "postgresql", logoColor: "white", label: "PostgreSQL" },
  prisma: { color: "2D3748", logo: "prisma", logoColor: "white", label: "Prisma" },
};

const fallbackStyle: BadgeConfig = {
  color: "555555",
  logo: "",
  logoColor: "white",
  label: "",
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "").replace(/^[^a-z0-9]+/, "");
}

export function getBadgeUrl(skillName: string, iconKey?: string): string {
  const key = iconKey ? slugify(iconKey) : slugify(skillName);
  const config = badgeMap[key as keyof typeof badgeMap] || (() => {
    const slug = slugify(skillName);
    const matchedKey = Object.keys(badgeMap).find((k) => slug.includes(k) || k.includes(slug));
    return matchedKey ? badgeMap[matchedKey as keyof typeof badgeMap] : {
      ...fallbackStyle,
      label: skillName,
      color: "666666",
      logo: slugify(skillName),
    };
  })();

  const label = encodeURIComponent(skillName);
  const logo = config.logo ? `&logo=${config.logo}` : "";
  const logoColor = config.logo ? `&logoColor=${config.logoColor}` : "";

  return `https://img.shields.io/badge/${label}-${config.color}?style=for-the-badge${logo}${logoColor}`;
}
