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
      name: "freeFile",
      title: "Free Download File",
      type: "file",
      description: "Upload the actual file for a free resource (Resource Type = Free Download). Visitors download it directly — no payment step.",
    },
    {
      name: "digitalFile",
      title: "Paid Download File",
      type: "file",
      description: "Upload the actual file for a paid resource. Delivered by secure emailed link after payment, the same way ebooks are delivered.",
    },
    {
      name: "buyUrl",
      title: "External Buy/Download Link (optional, legacy)",
      type: "url",
      description: "Only needed if you want to link out to an external store (e.g. Lemon Squeezy) instead of selling through this site. Leave empty to sell directly — the site's own checkout will be used automatically once a Paid Download File is uploaded.",
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
