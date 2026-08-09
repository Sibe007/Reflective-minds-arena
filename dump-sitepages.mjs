import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const ids = ["home-page", "about-page", "contact-page"];

for (const id of ids) {
  const doc = await client.getDocument(id);
  console.log(`\n--- ${id} ---`);
  console.log(JSON.stringify(doc, null, 2));
}