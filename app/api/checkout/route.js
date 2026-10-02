import { NextResponse } from "next/server";
import { client } from "../../../sanity/client";
import { getShippingSettings, getBookWeightsBySlugs } from "../../../sanity/queries";
import { rateLimit } from "../../../lib/rateLimit";

export async function POST(request) {
  const { limited } = rateLimit(request, {
    key: "books-checkout",
    limit: 15,
    windowMs: 15 * 60 * 1000,
  });
  if (limited) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const { items: cartItems, email, shippingAddress } = await request.json();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 500 }
      );
    }

    // ------------------------------------------------------------------
    // Look up every price from Sanity. Prices sent by the browser are
    // ignored, so nobody can change what they pay from their own device.
    // ------------------------------------------------------------------
    const bookSlugs = cartItems
      .filter((i) => i.format !== "resource")
      .map((i) => i.slug)
      .filter(Boolean);
    const resourceSlugs = cartItems
      .filter((i) => i.format === "resource")
      .map((i) => i.slug)
      .filter(Boolean);

    const [books, resources] = await Promise.all([
      bookSlugs.length
        ? client.fetch(
            `*[_type == "book" && slug.current in $slugs]{ title, "slug": slug.current, price, paperbackPrice }`,
            { slugs: bookSlugs }
          )
        : [],
      resourceSlugs.length
        ? client.fetch(
            `*[_type == "resource" && slug.current in $slugs]{ title, "slug": slug.current, price }`,
            { slugs: resourceSlugs }
          )
        : [],
    ]);

    const bookBySlug = {};
    books.forEach((b) => (bookBySlug[b.slug] = b));
    const resourceBySlug = {};
    resources.forEach((r) => (resourceBySlug[r.slug] = r));

    const items = [];
    for (const i of cartItems) {
      const format = i.format || "ebook";
      const qty = Math.min(20, Math.max(1, Math.floor(Number(i.qty)) || 1));

      if (format === "webinar") {
        return NextResponse.json(
          { error: "Webinars are registered separately. Please register from the Events page." },
          { status: 400 }
        );
      }

      let title = null;
      let price = null;

      if (format === "resource") {
        const r = resourceBySlug[i.slug];
        title = r?.title;
        price = r?.price;
      } else if (format === "paperback") {
        const b = bookBySlug[i.slug];
        title = b?.title;
        price = b?.paperbackPrice;
      } else if (format === "ebook") {
        const b = bookBySlug[i.slug];
        title = b?.title;
        price = b?.price;
      } else {
        return NextResponse.json({ error: "Unknown item type in cart." }, { status: 400 });
      }

      if (!title || !price || price <= 0) {
        return NextResponse.json(
          { error: "An item in your cart is no longer available. Please remove it and try again." },
          { status: 400 }
        );
      }

      items.push({ slug: i.slug, title, qty, format, price });
    }

    const hasPhysicalItems = items.some((i) => i.format === "paperback");

    if (
      hasPhysicalItems &&
      (!shippingAddress || !shippingAddress.name || !shippingAddress.address1)
    ) {
      return NextResponse.json(
        { error: "Shipping address is required for paperback orders." },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // Total in USD from the real Sanity prices, then converted to kobo.
    const totalUsd = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Convert USD to NGN (approximate rate — update this regularly)
    const usdToNgn = 1600;
    let totalKobo = Math.round(totalUsd * usdToNgn * 100);

    // Shipping fee is calculated server-side from Sanity data.
    let shippingFeeKobo = 0;
    let shippingFeeLabel = "";
    let totalWeightKg = 0;
    if (hasPhysicalItems) {
      const paperbackItems = items.filter((i) => i.format === "paperback");
      const paperbackSlugs = paperbackItems.map((i) => i.slug).filter(Boolean);
      const weightRows = await getBookWeightsBySlugs(paperbackSlugs);
      const weightBySlug = {};
      weightRows.forEach((r) => {
        weightBySlug[r.slug] = r.weightKg || 0;
      });
      totalWeightKg = paperbackItems.reduce(
        (sum, i) => sum + (weightBySlug[i.slug] || 0) * i.qty,
        0
      );

      const settings = await getShippingSettings();
      if (shippingAddress.countryType === "Nigeria") {
        const rate = settings?.nigeriaPerKgNaira ?? 0;
        const fee = rate * totalWeightKg;
        shippingFeeKobo = Math.round(fee * 100);
        shippingFeeLabel = `₦${fee.toFixed(0)} (${totalWeightKg.toFixed(2)}kg)`;
      } else {
        const rate = settings?.internationalPerKgUsd ?? 0;
        const fee = rate * totalWeightKg;
        shippingFeeKobo = Math.round(fee * usdToNgn * 100);
        shippingFeeLabel = `$${fee.toFixed(2)} (${totalWeightKg.toFixed(2)}kg)`;
      }
      totalKobo += shippingFeeKobo;
    }

    const itemNames = items
      .map(
        (i) =>
          `${i.title}${i.format === "paperback" ? " (Paperback)" : ""}${i.qty > 1 ? ` x${i.qty}` : ""}`
      )
      .join(", ");

    // Structured data so we can look up exactly which items were bought after payment.
    const orderItems = items.map((i) => ({
      slug: i.slug,
      title: i.title,
      qty: i.qty,
      format: i.format,
    }));

    const metadata = {
      items: itemNames,
      order_items: JSON.stringify(orderItems),
      custom_fields: [
        {
          display_name: "Items Ordered",
          variable_name: "items_ordered",
          value: itemNames,
        },
      ],
    };

    if (hasPhysicalItems) {
      metadata.shipping_fee = shippingFeeLabel;
      metadata.shipping_address = JSON.stringify(shippingAddress);
      metadata.custom_fields.push({
        display_name: "Shipping To",
        variable_name: "shipping_to",
        value: `${shippingAddress.name}, ${shippingAddress.address1}${shippingAddress.address2 ? ", " + shippingAddress.address2 : ""}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country} — ${shippingAddress.phone}`,
      });
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: totalKobo,
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