export default {
  name: "sibtechProduct",
  title: "SIBTECH AFRICA Product",
  type: "document",
  fields: [
    { name: "title", title: "Product Title", type: "string", description: "Example: IT Officer-in-a-Box", validation: (Rule) => Rule.required() },
    { name: "slug", title: "URL Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "tagline", title: "Tagline", type: "string", description: "Example: Complete Small Business IT Management System" },
    { name: "description", title: "Description", type: "array", of: [{ type: "block" }], description: "The main pitch — what problem this solves. Use the toolbar to bold, italicize, add headings, lists, or links." },
    {
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
      description: "One line per item, e.g. \"PDF IT Management Manual\". Shown as a checklist.",
    },
    {
      name: "whoItsFor",
      title: "Designed For",
      type: "array",
      of: [{ type: "string" }],
      description: "One line per audience, e.g. \"Small business owners\".",
    },
    { name: "price", title: "Price (₦ Naira)", type: "number", description: "Enter the real Naira amount, e.g. 21999. Charged directly in Naira — no currency conversion.", validation: (Rule) => Rule.required().positive() },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    {
      name: "digitalFile",
      title: "Digital File (for site checkout delivery)",
      type: "file",
      description: "Upload the actual product file(s) here — this is what gets emailed to buyers after payment, the same way ebooks are delivered.",
    },
    { name: "featured", title: "Featured on SIBTECH AFRICA page?", type: "boolean", initialValue: true },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "coverImage" },
  },
};