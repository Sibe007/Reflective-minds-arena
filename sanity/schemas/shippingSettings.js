export default {
  name: "shippingSettings",
  title: "Shipping Settings",
  type: "document",
  fields: [
    {
      name: "nigeriaPerKgNaira",
      title: "Nigeria Shipping Rate (₦ per kg)",
      type: "number",
      description: "Shipping cost per kilogram for orders shipping within Nigeria, in Naira. Total shipping = this rate × total weight of paperbacks in the order.",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "internationalPerKgUsd",
      title: "International Shipping Rate ($ per kg)",
      type: "number",
      description: "Shipping cost per kilogram for orders shipping outside Nigeria, in US Dollars. Total shipping = this rate × total weight of paperbacks in the order.",
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  preview: {
    prepare() {
      return { title: "Shipping Settings" };
    },
  },
};