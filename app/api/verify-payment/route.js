import { NextResponse } from "next/server";

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

    if (data.status && data.data?.status === "success") {
      return NextResponse.json({
        verified: true,
        amount: data.data.amount / 100,
        currency: data.data.currency,
        reference: data.data.reference,
      });
    }

    return NextResponse.json({ verified: false, error: "Payment was not successful." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ verified: false, error: "Could not verify payment." }, { status: 500 });
  }
}