import crypto from "crypto";
import { NextResponse } from "next/server";
import { deliverOrder } from "../../../../lib/deliverOrder";

export async function POST(request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    console.error("PAYSTACK_SECRET_KEY not set — cannot verify webhook.");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  // Read the raw body first — signature verification requires the exact
  // bytes Paystack sent, not a re-serialized JSON object.
  const rawBody = await request.text();

  const signature = request.headers.get("x-paystack-signature");
  const expectedSignature = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");

  if (!signature || signature !== expectedSignature) {
    console.error("Paystack webhook signature mismatch — rejecting.");
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  // We only care about successful charges.
  if (event.event === "charge.success") {
    const paystackData = event.data;
    const customerEmail = paystackData.customer?.email;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

    try {
      await deliverOrder({
        reference: paystackData.reference,
        customerEmail,
        metadata: paystackData.metadata,
        siteUrl,
      });
    } catch (err) {
      console.error("Webhook delivery error:", err);
      // Still return 200 below — Paystack will retry on non-2xx responses,
      // and we don't want repeated retries for an error we've already logged.
    }
  }

  // Always respond 200 quickly so Paystack doesn't retry unnecessarily.
  return NextResponse.json({ received: true });
}