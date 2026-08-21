export default {
  name: "delivery",
  title: "Delivery Record",
  type: "document",
  fields: [
    { name: "reference", title: "Payment Reference", type: "string", validation: (Rule) => Rule.required() },
    { name: "email", title: "Customer Email", type: "string" },
    { name: "deliveredAt", title: "Delivered At", type: "datetime" },
  ],
  preview: {
    select: { title: "reference", subtitle: "email" },
  },
};