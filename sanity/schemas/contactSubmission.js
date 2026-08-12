export default {
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  fields: [
    { name: "firstName", title: "First Name", type: "string" },
    { name: "lastName", title: "Last Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "subject", title: "Subject", type: "string" },
    { name: "message", title: "Message", type: "text", rows: 6 },
    { name: "submittedAt", title: "Submitted At", type: "datetime" },
    { name: "read", title: "Marked as Read", type: "boolean", initialValue: false },
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "subject", subtitle: "email", read: "read" },
    prepare({ title, subtitle, read }) {
      return {
        title: `${read ? "✓" : "●"} ${title || "(no subject)"}`,
        subtitle,
      };
    },
  },
};