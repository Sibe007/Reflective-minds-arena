import { NextResponse } from "next/server";

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";
  const response = NextResponse.redirect(`${siteUrl}/`, 303);
  response.cookies.delete("account_session");
  return response;
}