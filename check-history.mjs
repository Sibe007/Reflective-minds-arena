const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}
const projectId = "ngfau3ce";
const dataset = "production";
const ids = ["about-page", "my-story-page"];
for (const id of ids) {
  const url = "https://" + projectId + ".api.sanity.io/v1/data/history/" + dataset + "/transactions/" + id + "?excludeContent=true";
  const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
  const text = await res.text();
  console.log("--- " + id + " (status " + res.status + ") ---");
  console.log(text);
}
