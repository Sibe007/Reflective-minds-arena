import { NextResponse } from "next/server";
import { verifyDownloadToken, signDownloadToken } from "../../../lib/downloadToken";
import { isAdminEmail } from "../../../lib/adminAuth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

  const data = token ? verifyDownloadToken(token) : null;

  if (!data || data.purpose !== "admin-login" || !data.email || !isAdminEmail(data.email)) {
    return NextResponse.redirect(`${siteUrl}/admin/login?error=invalid`);
  }

  // Login link confirmed — issue a session token. Shorter-lived than the
  // customer account session (7 days vs 30) since this reaches order data
  // for every customer, not just one person's own orders.
  const sessionToken = signDownloadToken(
    { email: data.email, purpose: "admin-session" },
    60 * 60 * 24 * 7
  );

  const response = NextResponse.redirect(`${siteUrl}/admin`);
  response.cookies.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}