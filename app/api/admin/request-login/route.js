import { signDownloadToken } from "../../../../lib/downloadToken";
import { rateLimit } from "../../../../lib/rateLimit";
import { isAdminEmail } from "../../../../lib/adminAuth";
import { sendBrevoEmail } from "../../../../lib/sendBrevoEmail";

export async function POST(req) {
  // Always returns the same generic response, whether or not the email is
  // an admin — prevents using this to discover admin addresses.
  const { limited } = rateLimit(req, {
    key: "admin-request-login",
    limit: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  });

  if (limited) {
    return Response.json({ ok: true });
  }

  try {
    const { email, hp } = await req.json();
    if (hp || !email || !email.includes("@")) {
      return Response.json({ ok: true });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!isAdminEmail(trimmedEmail)) {
      return Response.json({ ok: true });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";
    const token = signDownloadToken(
      { email: trimmedEmail, purpose: "admin-login" },
      900 // 15 minutes
    );
    const loginUrl = `${siteUrl}/admin/verify?token=${token}`;

    const html = `
      <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
        <h2>Sign in to the admin dashboard</h2>
        <p>Click the button below to view orders, downloads, and registrations:</p>
        <p style="margin:24px 0;">
          <a href="${loginUrl}" style="background:#C68B3D; color:#0F1A14; padding:14px 26px; text-decoration:none; border-radius:2px; font-weight:600; display:inline-block;">Sign In</a>
        </p>
        <p style="color:#777; font-size:.85rem;">This link expires in 15 minutes and can only be used once. If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;

    await sendBrevoEmail({ toEmail: trimmedEmail, subject: "Sign in to the admin dashboard", html });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("admin request-login error:", err);
    return Response.json({ ok: true });
  }
}