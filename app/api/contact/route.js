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
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN is not set — contact form cannot save submissions.");
      return NextResponse.json(
        { error: "The contact form is not fully configured yet. Please email directly instead." },
        { status: 500 }
      );
    }

    await client.create({
      _type: "contactSubmission",
      firstName,
      lastName,
      email,
      subject: subject || "General inquiry",
      message,
      submittedAt: new Date().toISOString(),
      read: false,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not send message. Please try again or email directly." }, { status: 500 });
  }
}