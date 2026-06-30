export default {
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "URL Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: "subtitle", title: "Subtitle", type: "string" },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "blurb", title: "Short Blurb", type: "text", rows: 3, description: "Shown on book cards and homepage" },
    { name: "longDescription", title: "Full Description", type: "array", of: [{ type: "block" }] },
    { name: "sampleChapter", title: "Sample Chapter Excerpt", type: "text", rows: 8 },
    { name: "price", title: "Price (USD)", type: "number", validation: (Rule) => Rule.required().positive() },
    { name: "oldPrice", title: "Original Price (for discounts, optional)", type: "number" },
    { name: "format", title: "Available Formats", type: "string", description: "e.g. 'eBook · Paperback · Audiobook'" },
    { name: "category", title: "Category", type: "string", options: { list: ["Fiction", "Essays", "Memoir", "Nonfiction"] } },
    { name: "featured", title: "Featured on Homepage?", type: "boolean", initialValue: false },
    {
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description: "Paste the Price ID from your Stripe dashboard for this product (e.g. price_1AbC...). Leave blank until Stripe is set up.",
    },
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "coverImage" },
  },
};
