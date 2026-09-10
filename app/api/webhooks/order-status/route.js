import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendStatusEmail(toEmail, { itemTitles, status, trackingNote }) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping status email.");
    return;
  }

  const isShipped = status === "Shipped";
  const subject = isShipped ? "Your order has shipped!" : "Your order has been delivered";
  const heading = isShipped ? "Your order is on its way!" : "Your order has arrived";
  const body = isShipped
    ? "Good news — your paperback order has shipped and is on its way to you."
    : "Your paperback order has been marked as delivered. We hope you enjoy it!";

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>${heading}</h2>
      <p>${body}</p>
      <ul style="padding-left:18px;">${itemTitles.map((t) => `<li>${t}</li>`).join("")}</ul>
      <p style="color:#777; font-size:.85rem;">Questions about your order? Just reply to this email.</p>
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
        subject,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo status email failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo status email error:", err);
  }
}

export async function POST(req) {
  // Verify this request actually came from Sanity
  const secret = req.headers.get("sanity-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _id, status, email, items, shippedEmailSent, deliveredEmailSent } = body;

    if (!_id || !email || !status) {
      return Response.json({ ok: true, skipped: "Missing required fields" });
    }

    const itemTitles = (items || []).map((i) => i.title).filter(Boolean);

    if (status === "Shipped" && !shippedEmailSent) {
      await sendStatusEmail(email, { itemTitles, status: "Shipped" });
      await client.patch(_id).set({ shippedEmailSent: true }).commit();
      return Response.json({ ok: true, sent: "shipped" });
    }

    if (status === "Delivered" && !deliveredEmailSent) {
      await sendStatusEmail(email, { itemTitles, status: "Delivered" });
      await client.patch(_id).set({ deliveredEmailSent: true }).commit();
      return Response.json({ ok: true, sent: "delivered" });
    }

    return Response.json({ ok: true, skipped: "No new status transition" });
  } catch (err) {
    console.error("order-status webhook error:", err);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}