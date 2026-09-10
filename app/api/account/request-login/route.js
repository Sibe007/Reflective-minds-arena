import { createClient } from "@sanity/client";
import { signDownloadToken } from "../../../../lib/downloadToken";

async function sendMagicLinkEmail(toEmail, loginUrl) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping magic link email.");
    return;
  }

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>Sign in to your account</h2>
      <p>Click the button below to view your orders, downloads, and registrations:</p>
      <p style="margin:24px 0;">
        <a href="${loginUrl}" style="background:#C68B3D; color:#0F1A14; padding:14px 26px; text-decoration:none; border-radius:2px; font-weight:600; display:inline-block;">Sign In</a>
      </p>
      <p style="color:#777; font-size:.85rem;">This link expires in 15 minutes and can only be used once. If you didn't request this, you can safely ignore this email.</p>
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
        subject: "Sign in to your account",
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo magic link email failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo magic link email error:", err);
  }
}

export async function POST(req) {
  // Always returns the same generic response, whether or not the email
  // has any orders — prevents using this to check which emails exist.
  try {
    const { email, hp } = await req.json();

    if (hp || !email || !email.includes("@")) {
      return Response.json({ ok: true });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";
    const token = signDownloadToken(
      { email: email.trim().toLowerCase(), purpose: "account-login" },
      900 // 15 minutes
    );
    const loginUrl = `${siteUrl}/account/verify?token=${token}`;

    await sendMagicLinkEmail(email.trim(), loginUrl);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("request-login error:", err);
    return Response.json({ ok: true });
  }
}
