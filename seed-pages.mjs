// One-time script to create the missing singleton page documents in Sanity.
// After running this, Studio's update/publish actions will work normally on them.
//
// Setup:
//   1. npm install @sanity/client
//   2. Get a WRITE token: https://www.sanity.io/manage/project/ngfau3ce/api
//      -> API -> Tokens -> Add API token -> Permissions: "Editor" (or "Write")
//   3. Run:  SANITY_WRITE_TOKEN=your_token_here node seed-pages.mjs

import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var. See comments at top of this file.");
  process.exit(1);
}

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const docs = [
  {
    _id: "home-page",
    _type: "homePage",
    eyebrow: "Nigerian Author | Exploring Belief, Culture, Identity",
    heading: "The Stories We Inherit. The Truths We Choose.",
  },
  {
    _id: "about-page",
    _type: "aboutPage",
    heading: "About Solomon B. Ibe",
  },
  {
    _id: "contact-page",
    _type: "contactPage",
    email: "hello@reflectivemindsarena.com.ng",
  },
];

for (const doc of docs) {
  const result = await client.createIfNotExists(doc);
  console.log(`OK: ${result._id} (${result._type})`);
}

console.log("\nDone. Open /studio and edit these pages normally now.");
