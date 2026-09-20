import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req) {
  try {
    const { email, items } = await req.json();

    if (!email || !email.includes("@") || !items || items.length === 0) {
      return Response.json({ ok: true });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await client.fetch(
      `*[_type == "abandonedCart" && email == $email][0]{ _id }`,
      { email: normalizedEmail }
    );

    const doc = {
      _type: "abandonedCart",
      email: normalizedEmail,
      items: items.map((i) => ({
        title: i.title,
        slug: i.slug,
        format: i.format,
        price: i.price,
        qty: i.qty,
      })),
      capturedAt: new Date().toISOString(),
      reminderSent: false,
    };

    if (existing) {
      await client.patch(existing._id).set(doc).commit();
    } else {
      await client.create(doc);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("save-email error:", err);
    return Response.json({ ok: true });
  }
}