export default {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() },
    { name: "slug", title: "URL Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "African Literature",
          "Igbo Culture",
          "Personal Development",
          "Spirituality and Belief",
          "Writing and Publishing",
          "Book Reviews",
          "Storytelling",
        ],
      },
    },
    { name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] },
    { name: "excerpt", title: "Short Excerpt", type: "text", rows: 3, description: "Shown on blog listing cards" },
    { name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "publishedAt", title: "Published Date", type: "datetime" },
    { name: "readTime", title: "Read Time", type: "string", description: "e.g. '7 min read'" },
    { name: "featured", title: "Featured on Homepage?", type: "boolean", initialValue: false },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
};
