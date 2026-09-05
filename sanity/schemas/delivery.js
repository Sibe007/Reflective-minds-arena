export default {
  name: "delivery",
  title: "Delivery Record",
  type: "document",
    fields: [
    { name: "reference", title: "Payment Reference", type: "string", validation: (Rule) => Rule.required() },
    { name: "email", title: "Customer Email", type: "string" },
    { name: "deliveredAt", title: "Delivered At", type: "datetime" },
    {
      name: "itemsDelivered",
      title: "Items Delivered",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "slug", title: "Slug", type: "string" },
            {
              name: "type",
              title: "Type",
              type: "string",
              options: { list: ["ebook", "resource"] },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "reference", subtitle: "email" },
  },
};