export default {
  name: "myStoryPage",
  title: "My Story Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "bio1",
      title: "My Story — Paragraph 1",
      type: "text",
      rows: 6,
      description: "Write your personal story here — where you came from, your journey.",
    },
    {
      name: "bio2",
      title: "My Story — Paragraph 2",
      type: "text",
      rows: 6,
    },
    {
      name: "bio3",
      title: "My Story — Paragraph 3",
      type: "text",
      rows: 6,
    },
    {
      name: "photo",
      title: "Your Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "pullQuote",
      title: "A Quote from Your Story",
      type: "text",
      rows: 3,
    },
    {
      name: "influences",
      title: "Writers Who Influenced You",
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
      description: "Click Add item for each award or publication.",
    },
  ],
  preview: {
    prepare() {
      return { title: "📖 My Story Page" };
    },
  },
};
