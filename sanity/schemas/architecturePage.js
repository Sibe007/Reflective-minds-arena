export default {
  name: "architecturePage",
  title: "Architecture Portfolio Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Example: Interior Architecture & Finishing Works",
    },
    {
      name: "subheading",
      title: "Page Subheading",
      type: "text",
      rows: 3,
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      description: "A strong, wide photo of a finished space. This sets the tone for the whole page.",
    },
    {
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 5,
      description: "A short paragraph on your approach to interior architecture and finishing work.",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          title: "Service",
          fields: [
            { name: "title", title: "Service Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
    },
    {
      name: "process",
      title: "How I Work (Process Steps)",
      type: "array",
      of: [
        {
          type: "object",
          title: "Step",
          fields: [
            { name: "title", title: "Step Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title" } },
        },
      ],
      description: "Example: Consultation, Design & Planning, Execution, Handover",
    },
    {
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "object",
          title: "Project Photo",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "caption", title: "Caption", type: "string", description: "Example: Living Room — Lekki Residence" },
            { name: "category", title: "Category", type: "string", description: "Example: Residential, Commercial, Renovation" },
          ],
          preview: {
            select: { title: "caption", media: "image" },
          },
        },
      ],
    },
    {
      name: "ctaHeading",
      title: "Contact Section Heading",
      type: "string",
      description: "Example: Have a project in mind?",
    },
    {
      name: "ctaText",
      title: "Contact Section Text",
      type: "text",
      rows: 3,
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    },
    {
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    },
    {
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Include country code, digits only. Example: 2348012345678",
    },
  ],
  preview: {
    prepare() {
      return { title: "🏛️ Architecture Portfolio Page" };
    },
  },
};