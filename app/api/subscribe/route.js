import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const BREVO_LIST_ID = 3;

async function addToBrevo(email, name) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping Brevo sync.");
    return;
  }
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: name ? { FIRSTNAME: name } : undefined,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo sync failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo sync error:", err);
  }
}

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

    if (!existing) {
      await client.create({
        _type: "subscriber",
        email,
        name,
        source,
        subscribedAt: new Date().toISOString(),
      });
    }

    // Always sync to Brevo, even for existing Sanity records, so re-subscribes
    // and updates still reach the actual mailing list.
    await addToBrevo(email, name);

    return NextResponse.json({ ok: true, alreadySubscribed: !!existing });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
  }
}