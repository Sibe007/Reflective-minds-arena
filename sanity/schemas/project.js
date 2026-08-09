export default {
  name: "project",
  title: "Architecture Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      description: "Example: Living Room — Lekki Residence",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      description: "Example: Residential, Commercial, Renovation",
      options: {
        list: ["Residential", "Commercial", "Renovation", "Institutional"],
      },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Optional — a line or two about the project, scope, or materials used.",
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Featured projects can be highlighted or sorted first.",
      initialValue: false,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first. Leave blank to sort by newest.",
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
};