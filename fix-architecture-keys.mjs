const token = process.env.SANITY_WRITE_TOKEN;
const projectId = "ngfau3ce";
const dataset = "production";

function key() {
  return Math.random().toString(36).slice(2, 10);
}

const patch = {
  services: [
    { _key: key(), title: "Interior Design", description: "Full interior design for residential and commercial spaces, from concept to final specification." },
    { _key: key(), title: "Finishing Works", description: "Precision finishing - flooring, walls, ceilings, joinery, and fixtures executed to a high standard." },
    { _key: key(), title: "Renovation & Fit-Out", description: "Transforming existing spaces, from single rooms to full commercial fit-outs." },
  ],
  process: [
    { _key: key(), title: "Consultation", description: "We start with a conversation about how you will use the space and what matters most to you." },
    { _key: key(), title: "Design & Planning", description: "Concepts, material selections, and detailed drawings you can review before anything begins." },
    { _key: key(), title: "Execution", description: "On-site delivery with regular updates and attention to every detail." },
    { _key: key(), title: "Handover", description: "A final walkthrough and handover, with everything finished exactly as specified." },
  ],
};

const url = "https://" + projectId + ".api.sanity.io/v2024-01-01/data/mutate/" + dataset;
const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations: [{ patch: { id: "architecture-page", set: patch } }] }),
});
console.log("status " + res.status);
console.log(await res.text());
