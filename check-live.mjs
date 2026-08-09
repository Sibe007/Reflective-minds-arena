const token = process.env.SANITY_WRITE_TOKEN;
const projectId = "ngfau3ce";
const dataset = "production";
const ids = ["about-page", "my-story-page"];
for (const id of ids) {
  const url = "https://" + projectId + ".api.sanity.io/v2024-01-01/data/doc/" + dataset + "/" + id;
  const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
  const text = await res.text();
  console.log("--- " + id + " (status " + res.status + ") ---");
  console.log(text);
}
