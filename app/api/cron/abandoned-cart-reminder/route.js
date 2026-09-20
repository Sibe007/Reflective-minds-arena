import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const REMINDER_DELAY_HOURS = 2;

function formatPrice(n) {
  return `$${Number(n).toFixed(2)}`;
}

function buildEmailHtml(items) {
  const rows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;">${i.title}${i.format === "paperback" ? " (Paperback)" : ""}${i.qty > 1 ? ` × ${i.qty}` : ""}</td>
          <td style="padding:8px 0; text-align:right;">${formatPrice(i.price * i.qty)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>You left something in your cart</h2>
      <p>Just a friendly reminder — these are still waiting for you:</p>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        ${rows}
      </table>
      <p>
        <a href="https://reflectivemindsarena.com.ng/checkout" style="display:inline-block; background:#111; color:#fff; padding:12px 24px; text-decoration:none; border-radius:4px;">
          Continue to Checkout
        </a>
      </p>
      <p style="font-size: 13px; color: #666; margin-top: 24px;">
        If your cart shows empty when you get there, just add these titles back — we saved this list, but your browser holds the cart itself.
      </p>
    </div>
  `;
}

export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const cutoff = new Date(
      Date.now() - REMINDER_DELAY_HOURS * 60 * 60 * 1000
    ).toISOString();

    const carts = await client.fetch(
      `*[_type == "abandonedCart" && reminderSent != true && capturedAt < $cutoff]{
        _id, email, items
      }`,
      { cutoff }
    );

    let sent = 0;
    let failed = 0;

    for (const cart of carts) {
      if (!cart.items || cart.items.length === 0) continue;

      try {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            sender: {
              name: "Reflective Minds Arena",
              email: "hello@reflectivemindsarena.com.ng",
            },
            to: [{ email: cart.email }],
            subject: "You left something in your cart",
            htmlContent: buildEmailHtml(cart.items),
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`Brevo send failed for ${cart.email}:`, errText);
          failed++;
          continue;
        }

        await client.patch(cart._id).set({ reminderSent: true }).commit();
        sent++;
      } catch (err) {
        console.error(`Error processing cart ${cart._id}:`, err);
        failed++;
      }
    }

    return Response.json({ ok: true, checked: carts.length, sent, failed });
  } catch (err) {
    console.error("abandoned-cart-reminder error:", err);
    return Response.json({ ok: false, error: String(err) }, { status: 500 });
  }
}