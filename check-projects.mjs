const token = process.env.SANITY_WRITE_TOKEN;
const projectId = "ngfau3ce";
const dataset = "production";
const query = encodeURIComponent(`*[_type == "project"]`);
const url = "https://" + projectId + ".api.sanity.io/v2024-01-01/data/query/" + dataset + "?query=" + query;
const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
console.log("status " + res.status);
console.log(await res.text());
