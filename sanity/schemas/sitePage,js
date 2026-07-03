export default {
  name: "sitePage",
  title: "Site Pages",
  type: "document",
  fields: [
    {
      name: "pageId",
      title: "Page",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Home Page", value: "home" },
          { title: "About Page", value: "about" },
          { title: "Contact Page", value: "contact" },
        ],
      },
    },
    {
      name: "homeEyebrow",
      title: "HOME — Eyebrow line (small text above heading)",
      type: "string",
    },
    {
      name: "homeHeading",
      title: "HOME — Main Heading",
      type: "string",
    },
    {
      name: "homeSubheading",
      title: "HOME — Subheading paragraph",
      type: "text",
      rows: 3,
    },
    {
      name: "homeIntro",
      title: "HOME — Introduction paragraph",
      type: "text",
      rows: 4,
    },
    {
      name: "homeQuote",
      title: "HOME — Pull Quote",
      type: "text",
      rows: 3,
    },
    {
      name: "homeAuthorPhoto",
      title: "HOME — Author Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "homeWhyIWrite",
      title: "HOME — Why I Write (paragraph 1)",
      type: "text",
      rows: 4,
    },
    {
      name: "homeWhyIWrite2",
      title: "HOME — Why I Write (paragraph 2)",
      type: "text",
      rows: 4,
    },
    {
      name: "homeWhyIWrite3",
      title: "HOME — Why I Write (paragraph 3)",
      type: "text",
      rows: 4,
    },
    {
      name: "aboutHeading",
      title: "ABOUT — Page Heading",
      type: "string",
    },
    {
      name: "aboutSubheading",
      title: "ABOUT — Subheading",
      type: "string",
    },
    {
      name: "aboutPhoto",
      title: "ABOUT — Author Photo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "aboutBio",
      title: "ABOUT — Biography (paragraph 1)",
      type: "text",
      rows: 5,
    },
    {
      name: "aboutBio2",
      title: "ABOUT — Biography (paragraph 2)",
      type: "text",
      rows: 5,
    },
    {
      name: "aboutPullQuote",
      title: "ABOUT — Pull Quote",
      type: "text",
      rows: 3,
    },
    {
      name: "aboutInfluences",
      title: "ABOUT — Literary Influences",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "aboutAwards",
      title: "ABOUT — Awards & Publications",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "year", title: "Year", type: "string" },
          { name: "title", title: "Award/Publication Title", type: "string" },
        ],
      }],
    },
    {
      name: "contactEmail",
      title: "CONTACT — Email Address",
      type: "string",
    },
    {
      name: "contactLocation",
      title: "CONTACT — Location",
      type: "string",
    },
    {
      name: "contactResponseTime",
      title: "CONTACT — Response Time",
      type: "string",
    },
    {
      name: "contactInstagram",
      title: "CONTACT — Instagram URL",
      type: "url",
    },
    {
      name: "contactTwitter",
      title: "CONTACT — X / Twitter URL",
      type: "url",
    },
    {
      name: "contactFacebook",
      title: "CONTACT — Facebook URL",
      type: "url",
    },
  ],
  preview: {
    select: { title: "pageId" },
    prepare({ title }) {
      return {
        title: title === "home" ? "Home Page"
          : title === "about" ? "About Page"
          : "Contact Page",
      };
    },
  },
};