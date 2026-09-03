/**
 * Minimal shared Brevo sender. deliverOrder.js keeps its own richer
 * sendOrderEmail (which composes multi-section order emails); this is for
 * simpler, single-purpose emails like free webinar registration.
 */
export async function sendBrevoEmail({ toEmail, subject, html }) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping email.");
    return { sent: false };
  }

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
      console.error("Brevo email send failed:", res.status, text);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error("Brevo email send error:", err);
    return { sent: false };
  }
}
