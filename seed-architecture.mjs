const token = process.env.SANITY_WRITE_TOKEN;
const projectId = "ngfau3ce";
const dataset = "production";
const doc = {
  _id: "architecture-page",
  _type: "architecturePage",
  heading: "Interior Architecture & Finishing Works",
  subheading: "Spaces designed and finished with precision - where every material, joint, and surface is chosen with intent.",
  intro: "With more than a decade of experience delivering residential, commercial, and institutional projects, I approach every space as both a technical problem and a human one. Every project starts with a simple question: what is this space actually for, and how should it feel to live or work in it?",
  services: [
    { title: "Interior Design", description: "Full interior design for residential and commercial spaces, from concept to final specification." },
    { title: "Finishing Works", description: "Precision finishing - flooring, walls, ceilings, joinery, and fixtures executed to a high standard." },
    { title: "Renovation & Fit-Out", description: "Transforming existing spaces, from single rooms to full commercial fit-outs." },
  ],
  process: [
    { title: "Consultation", description: "We start with a conversation about how you will use the space and what matters most to you." },
    { title: "Design & Planning", description: "Concepts, material selections, and detailed drawings you can review before anything begins." },
    { title: "Execution", description: "On-site delivery with regular updates and attention to every detail." },
    { title: "Handover", description: "A final walkthrough and handover, with everything finished exactly as specified." },
  ],
  gallery: [],
  ctaHeading: "Have a project in mind?",
  ctaText: "Whether it is a single room or a full-building fit-out, I would be glad to talk through what you are building.",
  contactEmail: "sibe8725@gmail.com",
};
const url = "https://" + projectId + ".api.sanity.io/v2024-01-01/data/mutate/" + dataset;
const res = await fetch(url, { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ mutations: [{ createIfNotExists: doc }] }) });
console.log("status " + res.status);
console.log(await res.text());
