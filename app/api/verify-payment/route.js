import { NextResponse } from "next/server";
import { deliverOrder } from "../../../lib/deliverOrder";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ verified: false, error: "Missing reference." }, { status: 400 });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ verified: false, error: "Payments are not configured." }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    const data = await res.json();

    if (!data.status || data.data?.status !== "success") {
      return NextResponse.json({ verified: false, error: "Payment was not successful." });
    }

    const paystackData = data.data;
    const customerEmail = paystackData.customer?.email;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    // Attempt digital delivery — this should never block confirming the payment
    // to the buyer, even if something here fails.
    try {
      await deliverOrder({
        reference: paystackData.reference,
        customerEmail,
        metadata: paystackData.metadata,
        siteUrl,
      });
    } catch (deliveryErr) {
      console.error("Digital delivery error (payment still verified):", deliveryErr);
    }

    return NextResponse.json({
      verified: true,
      amount: paystackData.amount / 100,
      currency: paystackData.currency,
      reference: paystackData.reference,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ verified: false, error: "Could not verify payment." }, { status: 500 });
  }
}