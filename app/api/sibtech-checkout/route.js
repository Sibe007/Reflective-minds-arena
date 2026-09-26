import { NextResponse } from "next/server";
import { getSibtechProductBySlug } from "../../../sanity/queries";
import { rateLimit } from "../../../lib/rateLimit";

export async function POST(request) {
  const { limited } = rateLimit(request, {
    key: "sibtech-checkout",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) {
    return NextResponse.json({ error: "Too many attempts. Please try again shortly." }, { status: 429 });
  }

  try {
    const { slug, email } = await request.json();

    if (!slug || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Missing product or a valid email address." }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Payments are not configured yet." }, { status: 500 });
    }

    // Price is looked up server-side from Sanity, never trusted from the client.
    const product = await getSibtechProductBySlug(slug);
    if (!product || !product.price) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // Price is already in Naira — convert straight to kobo, no exchange-rate math.
    const amountKobo = Math.round(product.price * 100);

    const orderItems = [{ slug: product.slug, title: product.title, qty: 1, format: "sibtech" }];

    const metadata = {
      items: product.title,
      order_items: JSON.stringify(orderItems),
      custom_fields: [
        { display_name: "Product", variable_name: "product", value: product.title },
      ],
    };

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        currency: "NGN",
        callback_url: `${siteUrl}/checkout/success`,
        metadata,
      }),
    });

    const data = await response.json();

    if (data.status && data.data?.authorization_url) {
      return NextResponse.json({ url: data.data.authorization_url });
    } else {
      return NextResponse.json({ error: data.message || "Could not initialize payment." }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not reach payment processor." }, { status: 500 });
  }
}