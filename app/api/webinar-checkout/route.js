import { NextResponse } from "next/server";
import { client } from "../../../sanity/client";
import { rateLimit } from "../../../lib/rateLimit";

export async function POST(request) {
  const { limited } = rateLimit(request, {
    key: "webinar-checkout",
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const { slug, email } = await request.json();

    if (!slug || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Missing webinar or a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 500 }
      );
    }

    // The price is always looked up here from Sanity — never trusted from the browser.
    const webinar = await client.fetch(
      `*[_type == "event" && type == "webinar" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        date,
        price,
        "hasJoinLink": defined(joinLink)
      }`,
      { slug }
    );

    if (!webinar || !webinar.price) {
      return NextResponse.json({ error: "Webinar not found." }, { status: 404 });
    }

    if (!webinar.hasJoinLink) {
      return NextResponse.json(
        { error: "Registration for this webinar is not open yet." },
        { status: 400 }
      );
    }

    // Registration stays open until the webinar starts.
    if (webinar.date && new Date(webinar.date) < new Date()) {
      return NextResponse.json(
        { error: "Registration for this webinar has closed." },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // The Studio price is in naira — convert straight to kobo, no exchange rate.
    const amountKobo = Math.round(webinar.price * 100);

    const orderItems = [
      { slug: webinar.slug, title: webinar.title, qty: 1, format: "webinar" },
    ];

    const metadata = {
      items: webinar.title,
      order_items: JSON.stringify(orderItems),
      custom_fields: [
        { display_name: "Webinar", variable_name: "webinar", value: webinar.title },
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
      return NextResponse.json(
        { error: data.message || "Could not initialize payment." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not reach payment processor." },
      { status: 500 }
    );
  }
}