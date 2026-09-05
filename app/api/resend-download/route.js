import { createClient } from "@sanity/client";
import { signDownloadToken } from "../../../lib/downloadToken";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendResendEmail(toEmail, items) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping resend email.");
    return;
  }

  const linksHtml = items
    .map((i) => `<li style="margin-bottom:10px;"><strong>${i.title}</strong> — <a href="${i.downloadUrl}">Download your file</a></li>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>Here's your download link</h2>
      <p>As requested, here ${items.length > 1 ? "are fresh download links" : "is a fresh download link"} for your order:</p>
      <ul style="padding-left:18px;">${linksHtml}</ul>
      <p style="color:#777; font-size:.85rem;">This link expires in 48 hours. If you have any trouble, just reply to this email.</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Reflective Minds Arena", email: "hello@reflectivemindsarena.com.ng" },
        to: [{ email: toEmail }],
        subject: "Your download link",
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo resend email failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo resend email error:", err);
  }
}

export async function POST(req) {
  // This route always returns the same generic response, whether or not a
  // match was found — so it can never be used to check which emails or
  // order references exist in our system.
  try {
    const { email, reference, hp } = await req.json();

    // Honeypot — a hidden field real users never fill in. If it's filled,
    // silently do nothing and return the same success response.
    if (hp || !email || !reference) {
      return Response.json({ ok: true });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    const delivery = await client.fetch(
      `*[_type == "delivery" && reference == $reference && lower(email) == lower($email)][0]{ itemsDelivered }`,
      { reference: reference.trim(), email: email.trim() }
    );

    if (delivery?.itemsDelivered?.length > 0) {
      const bookSlugs = delivery.itemsDelivered.filter((i) => i.type === "ebook").map((i) => i.slug);
      const resourceSlugs = delivery.itemsDelivered.filter((i) => i.type === "resource").map((i) => i.slug);

      const [books, resources] = await Promise.all([
        bookSlugs.length > 0
          ? client.fetch(
              `*[_type == "book" && slug.current in $slugs]{ title, digitalFile{ asset-> { _id } } }`,
              { slugs: bookSlugs }
            )
          : [],
        resourceSlugs.length > 0
          ? client.fetch(
              `*[_type == "resource" && slug.current in $slugs]{ title, digitalFile{ asset-> { _id } } }`,
              { slugs: resourceSlugs }
            )
          : [],
      ]);

      const itemsWithLinks = [...books, ...resources]
        .filter((item) => item.digitalFile?.asset?._id)
        .map((item) => {
          const token = signDownloadToken({
            assetId: item.digitalFile.asset._id,
            title: item.title,
            ref: reference,
          });
          return { title: item.title, downloadUrl: `${siteUrl}/api/download/${token}` };
        });

      if (itemsWithLinks.length > 0) {
        await sendResendEmail(email.trim(), itemsWithLinks);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("resend-download error:", err);
    return Response.json({ ok: true });
  }
}