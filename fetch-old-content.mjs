const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}
const projectId = "ngfau3ce";
const dataset = "production";
const targets = [
  { id: "about-page", time: "2026-08-08T13:41:50.000000Z" },
  { id: "my-story-page", time: "2026-08-08T13:43:09.000000Z" },
];
for (const t of targets) {
  const url = "https://" + projectId + ".api.sanity.io/v1/data/history/" + dataset + "/documents/" + t.id + "?time=" + encodeURIComponent(t.time);
  const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
  const text = await res.text();
  console.log("--- " + t.id + " (status " + res.status + ") ---");
  console.log(text);
}
