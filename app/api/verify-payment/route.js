import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { signDownloadToken } from "../../../lib/downloadToken";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendDownloadEmail(toEmail, books, siteUrl) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping delivery email.");
    return;
  }

  const linksHtml = books
    .map((b) => `<li style="margin-bottom:10px;"><strong>${b.title}</strong> — <a href="${b.downloadUrl}">Download your file</a></li>`)
    .join("");

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>Thank you for your order!</h2>
      <p>Your payment has been confirmed. Here ${books.length > 1 ? "are your download links" : "is your download link"}:</p>
      <ul style="padding-left:18px;">${linksHtml}</ul>
      <p style="color:#777; font-size:.85rem;">These links expire in 48 hours. If you have any trouble, just reply to this email.</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Reflective Minds Arena", email: "hello@reflectivemindsarena.com.ng" },
        to: [{ email: toEmail }],
        subject: "Your download is ready",
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo email send failed:", res.status, text);
    }
  } catch (err) {
    console.error("Brevo email send error:", err);
  }
}

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
      const orderItemsRaw = paystackData.metadata?.order_items;
      if (orderItemsRaw && customerEmail) {
        const orderItems = JSON.parse(orderItemsRaw);
        const slugs = orderItems.map((i) => i.slug).filter(Boolean);

        if (slugs.length > 0) {
          const books = await client.fetch(
            `*[_type == "book" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id, url } } }`,
            { slugs }
          );

          const deliverable = books.filter((b) => b.digitalFile?.asset?._id);

          if (deliverable.length > 0) {
            const booksWithLinks = deliverable.map((b) => {
              const token = signDownloadToken({
                assetId: b.digitalFile.asset._id,
                title: b.title,
                ref: reference,
              });
              return {
                title: b.title,
                downloadUrl: `${siteUrl}/api/download/${token}`,
              };
            });

            await sendDownloadEmail(customerEmail, booksWithLinks, siteUrl);
          }
        }
      }
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