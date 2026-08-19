import fs from "fs";
import path from "path";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing SANITY_API_TOKEN env var.");
  process.exit(1);
}

const projectId = "ngfau3ce";
const dataset = "production";

async function run() {
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/export/${dataset}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error("Export failed:", res.status, await res.text());
    process.exit(1);
  }

  const text = await res.text();

  const backupsDir = path.join(process.cwd(), "backups");
  if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });

  const dateStr = new Date().toISOString().slice(0, 10);
  const filePath = path.join(backupsDir, `sanity-backup-${dateStr}.ndjson`);
  fs.writeFileSync(filePath, text);

  console.log(`Backup written to ${filePath} (${(text.length / 1024).toFixed(1)} KB)`);
}

run();
