import { NextResponse } from "next/server";
import { getShippingSettings, getBookWeightsBySlugs } from "../../../sanity/queries";

export async function POST(request) {
  try {
    const { items, email, shippingAddress } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 500 }
      );
    }

    const hasPhysicalItems = items.some((i) => i.format === "paperback");

    if (hasPhysicalItems && (!shippingAddress || !shippingAddress.name || !shippingAddress.address1)) {
      return NextResponse.json(
        { error: "Shipping address is required for paperback orders." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // Calculate total in kobo (Paystack uses kobo, not naira)
    const totalNaira = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Convert USD to NGN (approximate rate — update this regularly)
    const usdToNgn = 1600;
    let totalKobo = Math.round(totalNaira * usdToNgn * 100);

    // Shipping fee is calculated server-side from Sanity data (never trust a client-submitted
    // weight or amount — both the per-kg rate and each book's weight are looked up independently
    // here, so nothing about the fee can be tampered with from the browser).
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

    const itemNames = items.map(i => `${i.title}${i.format === "paperback" ? " (Paperback)" : ""}${i.qty > 1 ? ` x${i.qty}` : ""}`).join(", ");

    // Structured data so we can look up exactly which books were bought after payment.
    // Paystack metadata values must be strings, so we encode as JSON.
    const orderItems = items.map(i => ({ slug: i.slug, title: i.title, qty: i.qty, format: i.format || "ebook" }));

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
        email: email || "customer@example.com",
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