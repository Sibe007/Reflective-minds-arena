export default {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "email",
      title: "Your Email Address",
      type: "string",
      description: "Example: hello@reflectivemindsarena.com.ng",
    },
    {
      name: "phone",
      title: "Your Phone Number",
      type: "string",
      description: "Example: +234 801 234 5678",
    },
    {
      name: "location",
      title: "Your Location",
      type: "string",
      description: "Example: Lagos, Nigeria",
    },
    {
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: "Example: Within 2-3 business days",
    },
    {
      name: "instagram",
      title: "Instagram Link",
      type: "url",
    },
    {
      name: "twitter",
      title: "X / Twitter Link",
      type: "url",
    },
    {
      name: "facebook",
      title: "Facebook Link",
      type: "url",
    },
    {
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "Example: +234 801 234 5678",
    },
  ],
  preview: {
    prepare() {
      return { title: "📬 Contact Page" };
    },
  },
};
