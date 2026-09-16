export default {
  name: "abandonedCart",
  title: "Abandoned Cart",
  type: "document",
  fields: [
    { name: "email", title: "Customer Email", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "items",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "slug", title: "Slug", type: "string" },
            { name: "format", title: "Format", type: "string" },
            { name: "price", title: "Price", type: "number" },
            { name: "qty", title: "Quantity", type: "number" },
          ],
        },
      ],
    },
    { name: "capturedAt", title: "Last Updated", type: "datetime" },
    { name: "reminderSent", title: "Reminder Email Sent", type: "boolean", initialValue: false, hidden: true },
  ],
  preview: {
    select: { title: "email", subtitle: "capturedAt" },
  },
};