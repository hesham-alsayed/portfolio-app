import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const client = createClient({
  projectId: "b6vc088n",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDocument(doc: any) {
  const result = await client.create(doc);
  console.log(`  ✓ Created ${doc._type}: ${doc.name || doc.title || doc.platform || "siteSettings"}`);
  return result;
}

async function seed() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN env variable is required");
    console.error("   Get one from: https://www.sanity.io/manage/projects/b6vc088n/api#tokens");
    process.exit(1);
  }

  console.log("🌱 Seeding Sanity dataset...\n");

  // 1. Site Settings
  await createDocument({
    _type: "siteSettings",
    _id: "siteSettings",
    siteTitle: "Hisham Al Sayed Gomaa",
    siteDescription: "Full Stack MERN Developer — building scalable, modern, and high-performance web applications.",
    sectionLabels: {
      about: "About",
      projects: "Projects",
      experience: "Education",
      contact: "Contact",
    },
    contactSection: {
      heading: "Get In Touch",
      description: "Have a project in mind or just want to say hi? Drop me a message.",
      submitLabel: "Send Message",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      successMessage: "Thanks! I'll get back to you soon.",
    },
    projectActionLabels: {
      live: "Live Demo",
      source: "Source Code",
    },
    skillCategoryLabels: {
      frontend: "Frontend Development",
      backend: "Backend Development",
      tools: "Tools & Platforms",
      other: "Databases & ORM",
    },
    experiencePresentLabel: "Present",
    footerText: "© 2026 Hisham Al Sayed Gomaa. Built with Next.js & Sanity.",
  });

  // 2. Personal Info
  await createDocument({
    _type: "personalInfo",
    _id: "personalInfo",
    name: "Hisham Al Sayed Gomaa",
    role: "Full Stack MERN Developer",
    headline: "Hi there, I'm Hesham",
    subheadline:
      "Passionate Full Stack Developer focused on building scalable, modern, and high-performance web applications using MERN Stack technologies.",
    bio: "MERN Stack Developer experienced in building full-stack web applications using React, Node.js, Express, and MongoDB. Strong knowledge of REST APIs, authentication, and state management. Focused on performance, scalability, and clean code. Quick to adapt to new technologies and passionate about building scalable applications that solve real-world problems. Effective communicator and team player with strong time management skills.",
    email: "heshamelsauied@gmail.com",
    location: "Al Sharqiya, Egypt",
    resumeUrl: "#",
    heroActions: [
      { _key: "projects", label: "View Projects", href: "#projects", variant: "primary" },
      { _key: "contact", label: "Contact Me", href: "#contact", variant: "secondary" },
    ],
  });

  // 3. Skills
  const frontendSkills = [
    { name: "React", iconKey: "react" },
    { name: "Next.js", iconKey: "nextjs" },
    { name: "JavaScript", iconKey: "javascript" },
    { name: "TypeScript", iconKey: "typescript" },
    { name: "Tailwind CSS", iconKey: "tailwindcss" },
    { name: "Redux Toolkit", iconKey: "redux" },
    { name: "HTML5", iconKey: "html" },
    { name: "CSS3", iconKey: "css" },
    { name: "Framer Motion", iconKey: "react" },
    { name: "Axios", iconKey: "javascript" },
    { name: "React Hook Form", iconKey: "react" },
    { name: "Shadcn UI", iconKey: "react" },
  ];

  const backendSkills = [
    { name: "Node.js", iconKey: "nodejs" },
    { name: "Express.js", iconKey: "express" },
    { name: "REST APIs", iconKey: "backend" },
    { name: "JWT Authentication", iconKey: "backend" },
    { name: "API Security", iconKey: "backend" },
    { name: "MVC Architecture", iconKey: "backend" },
    { name: "Role-Based Access Control", iconKey: "backend" },
  ];

  const toolsSkills = [
    { name: "Git", iconKey: "git" },
    { name: "GitHub", iconKey: "git" },
    { name: "Postman", iconKey: "backend" },
  ];

  const databaseSkills = [
    { name: "MongoDB", iconKey: "mongodb" },
    { name: "Mongoose", iconKey: "database" },
    { name: "PostgreSQL", iconKey: "postgresql" },
    { name: "Prisma", iconKey: "prisma" },
  ];

  let order = 0;
  for (const skill of frontendSkills) {
    await createDocument({
      _type: "skill",
      _id: uuid(),
      name: skill.name,
      category: "frontend",
      iconKey: skill.iconKey,
      order: order++,
    });
  }

  order = 0;
  for (const skill of backendSkills) {
    await createDocument({
      _type: "skill",
      _id: uuid(),
      name: skill.name,
      category: "backend",
      iconKey: skill.iconKey,
      order: order++,
    });
  }

  order = 0;
  for (const skill of toolsSkills) {
    await createDocument({
      _type: "skill",
      _id: uuid(),
      name: skill.name,
      category: "tools",
      iconKey: skill.iconKey,
      order: order++,
    });
  }

  order = 0;
  for (const skill of databaseSkills) {
    await createDocument({
      _type: "skill",
      _id: uuid(),
      name: skill.name,
      category: "other",
      iconKey: skill.iconKey,
      order: order++,
    });
  }

  // 4. Project
  await createDocument({
    _type: "project",
    _id: uuid(),
    title: "MERN Stack E-Commerce Platform",
    slug: { _type: "slug", current: "mern-stack-ecommerce" },
    description:
      "A modern full-stack e-commerce platform built with MERN Stack featuring an advanced admin dashboard, secure JWT authentication, product variants (colors & sizes), real-time cart with stock validation, complete order lifecycle management, coupon-based discounts, PayPal integration, and sales analytics with charts. Built with MVC architecture, fully responsive UI, Framer Motion animations, and production-ready structure.",
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "Context API",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "https://mern-stack-ecommerce-tau.vercel.app/",
    githubUrl: "https://github.com/yourusername/ecommerce",
    order: 0,
  });

  // 5. Experience (Education)
  await createDocument({
    _type: "experience",
    _id: uuid(),
    company: "Obour Institutes",
    role: "Bachelor's Degree in Computer Science",
    startDate: "2020-06-01",
    endDate: "2024-06-01",
    description:
      "Graduated with a Good grade from the Computer Science Department, Obour City, Cairo. Built a strong foundation in software engineering, algorithms, data structures, and web development.",
    order: 0,
  });

  // 6. Social Links
  const socialLinks = [
    { platform: "GitHub", url: "https://github.com/yourusername", iconKey: "github", order: 0 },
    { platform: "LinkedIn", url: "https://linkedin.com/in/yourusername", iconKey: "linkedin", order: 1 },
    { platform: "Email", url: "mailto:heshamelsauied@gmail.com", iconKey: "email", order: 2 },
  ];

  for (const link of socialLinks) {
    await createDocument({
      _type: "socialLink",
      _id: uuid(),
      platform: link.platform,
      url: link.url,
      iconKey: link.iconKey,
      order: link.order,
    });
  }

  console.log("\n✅ Seeding complete!");
  console.log("\n📌 Next steps:");
  console.log("   1. Add SANITY_WRITE_TOKEN to .env.local");
  console.log("   2. Run: npm run seed");
  console.log("   3. Open Studio to upload images: npm run sanity");
  console.log("   4. Run dev server: npm run dev");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
