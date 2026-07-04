import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { items, email } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Payments are not configured yet." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // Calculate total in kobo (Paystack uses kobo, not naira)
    const totalNaira = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    // Convert USD to NGN (approximate rate — update this regularly)
    const usdToNgn = 1600;
    const totalKobo = Math.round(totalNaira * usdToNgn * 100);

    const itemNames = items.map(i => `${i.title}${i.qty > 1 ? ` x${i.qty}` : ""}`).join(", ");

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
        metadata: {
          items: itemNames,
          custom_fields: [
            {
              display_name: "Items Ordered",
              variable_name: "items_ordered",
              value: itemNames,
            },
          ],
        },
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