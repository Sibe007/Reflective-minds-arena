import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();
    const name = (body.name || "").trim();
    const source = body.source || "footer";

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN is not set — newsletter signup cannot save.");
      return NextResponse.json({ error: "Signups are not fully configured yet." }, { status: 500 });
    }

    const existing = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await client.create({
      _type: "subscriber",
      email,
      name,
      source,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
  }
}