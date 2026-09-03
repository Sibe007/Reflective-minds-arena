import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { sendBrevoEmail } from "../../../lib/sendBrevoEmail";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request) {
  try {
    const { name, email, slug } = await request.json();

    if (!name || !email || !slug) {
      return NextResponse.json({ error: "Name, email, and webinar are required." }, { status: 400 });
    }
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const event = await client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{ title, date, platform, joinLink, price }`,
      { slug }
    );

    if (!event) {
      return NextResponse.json({ error: "Webinar not found." }, { status: 404 });
    }
    if (event.price) {
      return NextResponse.json(
        { error: "This webinar requires payment — please use the paid registration option." },
        { status: 400 }
      );
    }
    if (!event.joinLink) {
      return NextResponse.json(
        { error: "This webinar isn't fully set up yet. Please check back soon." },
        { status: 400 }
      );
    }

    // Avoid creating a duplicate registration record if someone registers twice
    const existing = await client.fetch(
      `*[_type == "webinarRegistration" && eventSlug == $slug && email == $email][0]`,
      { slug, email }
    );

    if (!existing) {
      await client.create({
        _type: "webinarRegistration",
        eventTitle: event.title,
        eventSlug: slug,
        name,
        email,
        paid: false,
        registeredAt: new Date().toISOString(),
      });
    }

    const dateStr = event.date
      ? new Date(event.date).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })
      : "";

    const html = `
      <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
        <h2>You're registered!</h2>
        <p>Thanks for registering for <strong>${event.title}</strong>${dateStr ? `, on ${dateStr}` : ""}.</p>
        <p><a href="${event.joinLink}">Join the webinar here</a>${event.platform ? ` (via ${event.platform})` : ""}</p>
        <p style="color:#777; font-size:.85rem;">Save this email — you'll need the link above to join.</p>
      </div>
    `;

    await sendBrevoEmail({
      toEmail: email,
      subject: `You're registered: ${event.title}`,
      html,
    });

    return NextResponse.json({ registered: true });
  } catch (err) {
    console.error("Webinar registration error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
