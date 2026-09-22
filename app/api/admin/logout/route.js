import { NextResponse } from "next/server";

export async function POST() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";
  const response = NextResponse.redirect(`${siteUrl}/admin/login`, 303);
  response.cookies.delete("admin_session");
  return response;
}