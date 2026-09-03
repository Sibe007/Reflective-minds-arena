export default {
  name: "webinarRegistration",
  title: "Webinar Registration",
  type: "document",
  fields: [
    {
      name: "eventTitle",
      title: "Webinar",
      type: "string",
    },
    {
      name: "eventSlug",
      title: "Webinar Slug",
      type: "string",
    },
    {
      name: "name",
      title: "Attendee Name",
      type: "string",
      description: "Collected on free registration. Not currently collected on paid registration (only email is asked for at checkout).",
    },
    {
      name: "email",
      title: "Attendee Email",
      type: "string",
    },
    {
      name: "paid",
      title: "Paid Registration?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "reference",
      title: "Payment Reference (if paid)",
      type: "string",
    },
    {
      name: "registeredAt",
      title: "Registered At",
      type: "datetime",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "eventTitle" },
  },
};
