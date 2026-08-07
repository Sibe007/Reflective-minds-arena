export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "eyebrow",
      title: "Small text above heading",
      type: "string",
      description: "Example: Nigerian Author | Exploring Belief, Culture, Identity",
    },
    {
      name: "heading",
      title: "Main Heading",
      type: "string",
      description: "Example: The Stories We Inherit. The Truths We Choose.",
    },
    {
      name: "subheading",
      title: "First paragraph under heading",
      type: "text",
      rows: 3,
    },
    {
      name: "intro",
      title: "Introduction paragraph",
      type: "text",
      rows: 4,
    },
    {
      name: "quote",
      title: "Featured Quote",
      type: "text",
      rows: 3,
      description: "Shown in the dark green section",
    },
    {
      name: "authorPhoto",
      title: "Author Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
  preview: {
    prepare() {
      return { title: "🏠 Home Page" };
    },
  },
};
