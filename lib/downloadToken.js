import crypto from "crypto";

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET;

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64").toString("utf8");
}

export function signDownloadToken(payload, expiresInSeconds = 172800) {
  if (!SECRET) throw new Error("DOWNLOAD_TOKEN_SECRET is not set.");
  const exp = Date.now() + expiresInSeconds * 1000;
  const data = { ...payload, exp };
  const encoded = base64url(JSON.stringify(data));
  const signature = crypto.createHmac("sha256", SECRET).update(encoded).digest("hex");
  return `${encoded}.${signature}`;
}

export function verifyDownloadToken(token) {
  if (!SECRET) throw new Error("DOWNLOAD_TOKEN_SECRET is not set.");
  const [encoded, signature] = (token || "").split(".");
  if (!encoded || !signature) return null;

  const expectedSignature = crypto.createHmac("sha256", SECRET).update(encoded).digest("hex");
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  let data;
  try {
    data = JSON.parse(base64urlDecode(encoded));
  } catch {
    return null;
  }

  if (!data.exp || Date.now() > data.exp) return null;

  return data;
}