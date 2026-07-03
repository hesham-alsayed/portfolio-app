import { defineField, defineType } from "sanity";

export const personalInfo = defineType({
  name: "personalInfo",
  title: "Personal Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Hero Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
    }),
    defineField({
      name: "heroActions",
      title: "Hero Actions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Button Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link / Anchor",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
