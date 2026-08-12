export default {
  name: "subscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    { name: "email", title: "Email", type: "string" },
    { name: "name", title: "Name", type: "string" },
    { name: "subscribedAt", title: "Subscribed At", type: "datetime" },
    { name: "source", title: "Source", type: "string", description: "Where they signed up, e.g. footer" },
  ],
  orderings: [
    {
      title: "Newest First",
      name: "subscribedDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "email", subtitle: "name" },
  },
};