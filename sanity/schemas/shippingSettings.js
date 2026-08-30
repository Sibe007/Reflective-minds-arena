export default {
  name: "shippingSettings",
  title: "Shipping Settings",
  type: "document",
  fields: [
    {
      name: "nigeriaFeeNaira",
      title: "Nigeria Shipping Fee (₦)",
      type: "number",
      description: "Flat shipping fee for orders shipping within Nigeria, in Naira.",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "internationalFeeUsd",
      title: "International Shipping Fee ($)",
      type: "number",
      description: "Flat shipping fee for orders shipping outside Nigeria, in US Dollars.",
      validation: (Rule) => Rule.required().min(0),
    },
  ],
  preview: {
    prepare() {
      return { title: "Shipping Settings" };
    },
  },
};