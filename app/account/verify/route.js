import { NextResponse } from "next/server";
import { verifyDownloadToken, signDownloadToken } from "../../../lib/downloadToken";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

  const data = token ? verifyDownloadToken(token) : null;

  if (!data || data.purpose !== "account-login" || !data.email) {
    return NextResponse.redirect(`${siteUrl}/account/login?error=invalid`);
  }

  // Login link confirmed — issue a longer-lived session token (30 days)
  const sessionToken = signDownloadToken(
    { email: data.email, purpose: "account-session" },
    60 * 60 * 24 * 30
  );

  const response = NextResponse.redirect(`${siteUrl}/account`);
  response.cookies.set("account_session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}