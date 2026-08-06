export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Event Title",
      type: "string",
      description: "Example: Lagos Literary Festival 2026",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Event Date",
      type: "datetime",
      description: "When is the event?",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      description: "Example: Terra Kulture, Lagos or Online (Zoom)",
    },
    {
      name: "description",
      title: "Event Description",
      type: "text",
      rows: 4,
      description: "What is the event about?",
    },
    {
      name: "ticketUrl",
      title: "Ticket or Registration Link",
      type: "url",
      description: "Leave empty if free or no registration needed",
    },
    {
      name: "type",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Book Launch", value: "launch" },
          { title: "Speaking Engagement", value: "speaking" },
          { title: "Literary Festival", value: "festival" },
          { title: "Workshop", value: "workshop" },
          { title: "Panel Discussion", value: "panel" },
          { title: "Online Event", value: "online" },
        ],
      },
    },
    {
      name: "coverImage",
      title: "Event Image or Flyer",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "featured",
      title: "Show as upcoming event?",
      type: "boolean",
      initialValue: true,
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
};
