export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Example: About Solomon B. Ibe",
    },
    {
      name: "subheading",
      title: "Page Subheading",
      type: "string",
    },
    {
      name: "photo",
      title: "Your Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "bio1",
      title: "Biography — Paragraph 1",
      type: "text",
      rows: 6,
    },
    {
      name: "bio2",
      title: "Biography — Paragraph 2",
      type: "text",
      rows: 6,
    },
    {
      name: "pullQuote",
      title: "Your Pull Quote",
      type: "text",
      rows: 3,
    },
    {
      name: "whyIWrite1",
      title: "Why I Write — Paragraph 1",
      type: "text",
      rows: 4,
    },
    {
      name: "whyIWrite2",
      title: "Why I Write — Paragraph 2",
      type: "text",
      rows: 4,
    },
    {
      name: "whyIWrite3",
      title: "Why I Write — Paragraph 3",
      type: "text",
      rows: 3,
    },
    {
      name: "influences",
      title: "Literary Influences",
      type: "array",
      of: [{ type: "string" }],
      description: "Click Add item and type a name. Example: Chinua Achebe",
    },
    {
      name: "awards",
      title: "Awards and Publications",
      type: "array",
      of: [{
        type: "object",
        title: "Award or Publication",
        fields: [
          { name: "year", title: "Year", type: "string" },
          { name: "title", title: "Title", type: "string" },
        ],
      }],
    },
  ],
  preview: {
    prepare() {
      return { title: "👤 About Page" };
    },
  },
};
