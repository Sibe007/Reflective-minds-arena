import { createClient } from "@sanity/client";
import { signDownloadToken } from "./downloadToken";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendDownloadEmail(toEmail, books, siteUrl) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping delivery email.");
    return;
  }

  const linksHtml = books
    .map((b) => `<li style="margin-bottom:10px;"><strong>${b.title}</strong> — <a href="${b.downloadUrl}">Download your file</a></li>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>Thank you for your order!</h2>
      <p>Your payment has been confirmed. Here ${books.length > 1 ? "are your download links" : "is your download link"}:</p>
      <ul style="padding-left:18px;">${linksHtml}</ul>
      <p style="color:#777; font-size:.85rem;">These links expire in 48 hours. If you have any trouble, just reply to this email.</p>
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
        subject: "Your download is ready",
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo email send failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo email send error:", err);
  }
}

/**
 * Delivers digital files for a confirmed Paystack transaction, if not already delivered.
 * Safe to call multiple times for the same reference — it will only actually
 * send once, since it checks and records a "delivery" document in Sanity first.
 */
export async function deliverOrder({ reference, customerEmail, metadata, siteUrl }) {
  if (!reference || !customerEmail) return { delivered: false, reason: "Missing reference or email." };

  // Check if we've already delivered this order
  const existing = await client.fetch(
    `*[_type == "delivery" && reference == $reference][0]`,
    { reference }
  );

  if (existing) {
    return { delivered: false, reason: "Already delivered." };
  }

  const orderItemsRaw = metadata?.order_items;
  if (!orderItemsRaw) return { delivered: false, reason: "No order_items in metadata." };

  const orderItems = JSON.parse(orderItemsRaw);
  const slugs = orderItems.map((i) => i.slug).filter(Boolean);
  if (slugs.length === 0) return { delivered: false, reason: "No slugs found." };

  const books = await client.fetch(
    `*[_type == "book" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id, url } } }`,
    { slugs }
  );

  const deliverable = books.filter((b) => b.digitalFile?.asset?._id);
  if (deliverable.length === 0) return { delivered: false, reason: "No deliverable files found." };

  const booksWithLinks = deliverable.map((b) => {
    const token = signDownloadToken({
      assetId: b.digitalFile.asset._id,
      title: b.title,
      ref: reference,
    });
    return {
      title: b.title,
      downloadUrl: `${siteUrl}/api/download/${token}`,
    };
  });

  await sendDownloadEmail(customerEmail, booksWithLinks, siteUrl);

  // Record that this order has been delivered, so we never send it twice
  await client.create({
    _type: "delivery",
    reference,
    email: customerEmail,
    deliveredAt: new Date().toISOString(),
  });

  return { delivered: true, books: booksWithLinks };
}