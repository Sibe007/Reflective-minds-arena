export default {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "role",
      title: "Role / Context",
      type: "string",
      description: "Example: Reader, or Client — Lekki Residence Project",
    },
    { name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() },
    { name: "photo", title: "Photo (optional)", type: "image", options: { hotspot: true } },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Book", "Architecture", "General"] },
      initialValue: "General",
    },
    { name: "rating", title: "Rating (1-5, optional)", type: "number", validation: (Rule) => Rule.min(1).max(5) },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "order", title: "Display Order", type: "number", description: "Lower numbers show first." },
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
};