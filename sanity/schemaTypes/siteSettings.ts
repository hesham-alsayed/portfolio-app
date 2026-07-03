import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sectionLabels",
      title: "Section Labels",
      type: "object",
      fields: [
        defineField({ name: "about", title: "About", type: "string" }),
        defineField({ name: "projects", title: "Projects", type: "string" }),
        defineField({
          name: "experience",
          title: "Experience",
          type: "string",
        }),
        defineField({ name: "contact", title: "Contact", type: "string" }),
      ],
    }),
    defineField({
      name: "contactSection",
      title: "Contact Section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "submitLabel",
          title: "Submit Button Label",
          type: "string",
        }),
        defineField({
          name: "nameLabel",
          title: "Name Field Label",
          type: "string",
        }),
        defineField({
          name: "emailLabel",
          title: "Email Field Label",
          type: "string",
        }),
        defineField({
          name: "messageLabel",
          title: "Message Field Label",
          type: "string",
        }),
        defineField({
          name: "successMessage",
          title: "Success Message",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "experiencePresentLabel",
      title: "Experience Present Label",
      type: "string",
    }),
    defineField({
      name: "projectActionLabels",
      title: "Project Action Labels",
      type: "object",
      fields: [
        defineField({ name: "live", title: "Live Demo Label", type: "string" }),
        defineField({
          name: "source",
          title: "Source Code Label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "skillCategoryLabels",
      title: "Skill Category Labels",
      type: "object",
      fields: [
        defineField({ name: "frontend", title: "Frontend", type: "string" }),
        defineField({ name: "backend", title: "Backend", type: "string" }),
        defineField({ name: "tools", title: "Tools", type: "string" }),
        defineField({ name: "other", title: "Other", type: "string" }),
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
