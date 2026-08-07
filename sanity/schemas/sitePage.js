export default {
  name: "sitePage",
  title: "Site Pages",
  type: "document",
  groups: [
    { name: "hero", title: "🏠 Hero Section (Top of page)" },
    { name: "quote", title: "💬 Your Quote" },
    { name: "whyiwrite", title: "✍️ Why I Write Section" },
    { name: "about", title: "👤 About Page" },
    { name: "mystory", title: "📖 My Story Page" },
    { name: "contact", title: "📬 Contact Page" },
  ],
  fields: [
    {
      name: "pageId",
      title: "Which page is this?",
      type: "string",
      description: "Do not change this.",
      options: {
        list: [
          { title: "Home Page", value: "home" },
          { title: "About Page", value: "about" },
          { title: "Contact Page", value: "contact" },
        ],
      },
    },
    { name: "homeAuthorPhoto", title: "HOME — Your Photo", type: "image", options: { hotspot: true }, group: "hero" },
    { name: "homeEyebrow", title: "HOME — Small text above heading", type: "string", group: "hero" },
    { name: "homeHeading", title: "HOME — Main Heading", type: "string", group: "hero" },
    { name: "homeSubheading", title: "HOME — First paragraph", type: "text", rows: 3, group: "hero" },
    { name: "homeIntro", title: "HOME — Introduction paragraph", type: "text", rows: 4, group: "hero" },
    { name: "homeQuote", title: "HOME — Pull Quote", type: "text", rows: 3, group: "quote" },
    { name: "homeWhyIWrite", title: "HOME — Why I Write (paragraph 1)", type: "text", rows: 4, group: "whyiwrite" },
    { name: "homeWhyIWrite2", title: "HOME — Why I Write (paragraph 2)", type: "text", rows: 4, group: "whyiwrite" },
    { name: "homeWhyIWrite3", title: "HOME — Why I Write (paragraph 3)", type: "text", rows: 3, group: "whyiwrite" },
    { name: "aboutHeading", title: "ABOUT — Page Heading", type: "string", group: "about" },
    { name: "aboutSubheading", title: "ABOUT — Subheading", type: "string", group: "about" },
    { name: "aboutPhoto", title: "ABOUT — Your Photo", type: "image", options: { hotspot: true }, group: "about" },
    { name: "aboutBio", title: "ABOUT — Biography paragraph 1", type: "text", rows: 6, group: "about" },
    { name: "aboutBio2", title: "ABOUT — Biography paragraph 2", type: "text", rows: 6, group: "about" },
    { name: "aboutPullQuote", title: "ABOUT — Pull Quote", type: "text", rows: 3, group: "about" },
    {
      name: "aboutInfluences",
      title: "MY STORY — Writers who influenced you",
      type: "array",
      of: [{ type: "string" }],
      description: "Click Add item and type a name. Example: Chinua Achebe",
      group: "mystory",
    },
    {
      name: "aboutAwards",
      title: "MY STORY — Awards and Publications",
      type: "array",
      of: [{
        type: "object",
        title: "Award or Publication",
        fields: [
          { name: "year", title: "Year (e.g. 2025)", type: "string" },
          { name: "title", title: "Award or publication title", type: "string" },
        ],
      }],
      description: "Click Add item for each award or publication.",
      group: "mystory",
    },
    { name: "contactEmail", title: "CONTACT — Email Address", type: "string", group: "contact" },
    { name: "contactLocation", title: "CONTACT — Location", type: "string", group: "contact" },
    { name: "contactResponseTime", title: "CONTACT — Response Time", type: "string", group: "contact" },
    { name: "contactInstagram", title: "CONTACT — Instagram URL", type: "url", group: "contact" },
    { name: "contactTwitter", title: "CONTACT — X / Twitter URL", type: "url", group: "contact" },
    { name: "contactFacebook", title: "CONTACT — Facebook URL", type: "url", group: "contact" },
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) {
      const labels = { home: "🏠 Home Page", about: "👤 About Page", contact: "📬 Contact Page" };
      return { title: labels[title] || "Site Page" };
    },
  },
};
