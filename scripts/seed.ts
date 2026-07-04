import "dotenv/config";
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const client = createClient({
  projectId: "b6vc088n",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

const TYPES = ["siteSettings", "personalInfo", "skill", "project", "experience", "socialLink", "category", "about"];

async function deleteAll() {
  console.log("🗑️  Deleting existing documents...\n");
  for (const type of TYPES) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (ids.length > 0) {
      const tx = client.transaction();
      for (const id of ids) tx.delete(id);
      await tx.commit();
      console.log(`  ✓ Deleted ${ids.length} ${type}(s)`);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createDocument(doc: any) {
  const useReplace = doc._id === "siteSettings" || doc._id === "personalInfo";
  const result = useReplace ? await client.createOrReplace(doc) : await client.create(doc);
  const label = doc.name || doc.title || doc.platform || doc.company || doc._type;
  console.log(`  ✓ Created ${doc._type}: ${label}`);
  return result;
}

async function seed() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN env variable is required");
    console.error("   Get one from: https://www.sanity.io/manage/projects/b6vc088n/api#tokens");
    process.exit(1);
  }

  console.log("🌱 Seeding Sanity dataset...\n");

  await deleteAll();

  console.log("\n📦 Creating new documents...\n");

  // 1. Site Settings
  await createDocument({
    _type: "siteSettings",
    _id: "siteSettings",
    siteTitle: "Hisham Al Sayed Gomaa",
    siteDescription: "Full Stack MERN Developer — building scalable, modern, and high-performance web applications.",
    sectionLabels: {
      about: "About",
      projects: "Projects",
      experience: "Experience",
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
    skillCategoryLabels: {},
    experiencePresentLabel: "Present",
    footerText: "© 2026 Hisham Al Sayed Gomaa. Built with Next.js & Sanity.",
  });

  // 2. Personal Info
  await createDocument({
    _type: "personalInfo",
    _id: "personalInfo",
    name: "Hisham Al Sayed Gomaa",
    role: "Full Stack MERN Developer",
    headline: "Hi there, I'm Hisham",
    subheadline:
      "Passionate Full Stack Developer focused on building scalable, modern, and high-performance web applications using MERN Stack technologies. I specialize in React, Node.js, Express, and MongoDB — delivering complete end-to-end solutions with clean architecture and responsive design.",
    email: "heshamelsauied@gmail.com",
    resumeUrl: "/api/resume",
    heroActions: [
      { _key: uuid(), label: "View Projects", href: "#projects", variant: "primary" },
      { _key: uuid(), label: "Contact Me", href: "#contact", variant: "secondary" },
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
    { name: "Framer Motion", iconKey: "framer" },
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
    { name: "GitHub", iconKey: "github" },
    { name: "Postman", iconKey: "backend" },
    { name: "Axios", iconKey: "javascript" },
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
      category: "Frontend Development",
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
      category: "Backend Development",
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
      category: "Tools & Platforms",
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
      category: "Databases & ORM",
      iconKey: skill.iconKey,
      order: order++,
    });
  }

  // 4. Projects
  await createDocument({
    _type: "project",
    _id: uuid(),
    title: "E-Commerce Store",
    slug: { _type: "slug", current: "ecommerce-store" },
    description:
      "A modern customer-facing e-commerce application that provides a fast, secure, and responsive shopping experience with authentication, product discovery, cart management, wishlist, online payments, and order tracking.",
    techStack: [
      "React", "Redux Toolkit", "Tailwind CSS", "Node.js",
      "Express.js", "MongoDB", "Mongoose", "JWT Authentication",
      "PayPal API", "Cloudinary",
    ],
    storeUrl: "https://mern-stack-ecommerce-tau.vercel.app/",
    order: 0,
  });

  await createDocument({
    _type: "project",
    _id: uuid(),
    title: "E-Commerce Admin Dashboard",
    slug: { _type: "slug", current: "ecommerce-admin-dashboard" },
    description:
      "A complete administration dashboard for managing an e-commerce platform, allowing administrators to control products, categories, orders, users, coupons, and business analytics through a responsive interface.",
    techStack: [
      "React", "Redux Toolkit", "Tailwind CSS", "Node.js",
      "Express.js", "MongoDB", "Mongoose", "JWT Authentication",
      "Cloudinary", "Chart.js",
    ],
    storeUrl: "https://mern-stack-ecommerce-admin-mu.vercel.app",
    order: 1,
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

  // 7. About
  await createDocument({
    _type: "about",
    _id: uuid(),
    sectionName: "About Me",
    heading: "Passionate about creating impactful web experiences",
    body: "With over 5 years of experience in full-stack development, I specialize in building scalable web applications using modern technologies. My expertise includes React, Node.js, and cloud architecture. I'm passionate about creating elegant solutions to complex problems and sharing knowledge with the developer community.",
    bio: "I thrive in collaborative environments and enjoy turning complex problems into simple, beautiful designs. When I'm not coding, you'll find me exploring new tech, writing technical articles, or contributing to open-source projects.",
    location: "Cairo, Egypt",
    button1Label: "View Github",
    button1Url: "https://github.com/yourusername",
    button2Label: "Download CV",
    button2Url: "/api/resume",
  });

  // 8. Categories
  const categories = [
    { name: "Frontend Development", order: 0 },
    { name: "Backend Development", order: 1 },
    { name: "Databases & ORM", order: 2 },
    { name: "Tools & Platforms", order: 3 },
  ];

  for (const cat of categories) {
    await createDocument({
      _type: "category",
      _id: uuid(),
      name: cat.name,
      order: cat.order,
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
