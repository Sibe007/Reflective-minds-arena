export default {
  name: "physicalOrder",
  title: "Physical Order",
  type: "document",
  fields: [
    { name: "reference", title: "Payment Reference", type: "string", validation: (Rule) => Rule.required() },
    { name: "email", title: "Customer Email", type: "string" },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Book Title", type: "string" },
            { name: "qty", title: "Quantity", type: "number" },
          ],
        },
      ],
    },
    { name: "shippingName", title: "Recipient Name", type: "string" },
    { name: "shippingAddress1", title: "Address Line 1", type: "string" },
    { name: "shippingAddress2", title: "Address Line 2", type: "string" },
    { name: "shippingCity", title: "City", type: "string" },
    { name: "shippingState", title: "State / Region", type: "string" },
    { name: "shippingPostalCode", title: "Postal Code", type: "string" },
    { name: "shippingCountry", title: "Country", type: "string" },
    { name: "shippingPhone", title: "Phone Number", type: "string" },
    {
      name: "status",
      title: "Fulfillment Status",
      type: "string",
      options: { list: ["Pending", "Shipped", "Delivered"] },
      initialValue: "Pending",
    },
    { name: "createdAt", title: "Order Date", type: "datetime" },
  ],
  preview: {
    select: { title: "shippingName", subtitle: "status" },
  },
};