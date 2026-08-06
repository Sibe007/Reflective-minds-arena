export default {
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Resource Title",
      type: "string",
      description: "Example: The Memoirist's Question List",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Free Download", value: "free" },
          { title: "Writing Guide", value: "guide" },
          { title: "Course", value: "course" },
          { title: "Reference Pack", value: "reference" },
        ],
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "What is this resource and who is it for?",
    },
    {
      name: "price",
      title: "Price (USD) — leave empty if free",
      type: "number",
    },
    {
      name: "buyUrl",
      title: "Buy/Download Link",
      type: "url",
      description: "Paste your Selar or Lemonsqueezy product link here",
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "featured",
      title: "Show on Resources page?",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
};