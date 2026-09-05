import { createClient } from "@sanity/client";
import { signDownloadToken } from "./downloadToken";

const client = createClient({
  projectId: "ngfau3ce",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendOrderEmail(toEmail, { ebookLinks, paperbackItems, webinarItems, shippingAddress, siteUrl }) {
  if (!process.env.BREVO_API_KEY) {
    console.error("BREVO_API_KEY is not set — skipping delivery email.");
    return;
  }

  let sections = "";

  if (ebookLinks && ebookLinks.length > 0) {
    const linksHtml = ebookLinks
      .map((b) => `<li style="margin-bottom:10px;"><strong>${b.title}</strong> — <a href="${b.downloadUrl}">Download your file</a></li>`)
      .join("");
    sections += `
      <p>Your payment has been confirmed. Here ${ebookLinks.length > 1 ? "are your download links" : "is your download link"}:</p>
      <ul style="padding-left:18px;">${linksHtml}</ul>
      <p style="color:#777; font-size:.85rem;">These links expire in 48 hours. If you have any trouble, just reply to this email.</p>
    `;
  }
  if (paperbackItems && paperbackItems.length > 0) {
    const itemsHtml = paperbackItems
      .map((i) => `<li style="margin-bottom:6px;">${i.title}${i.qty > 1 ? ` × ${i.qty}` : ""}</li>`)
      .join("");
    sections += `
      <p>Your paperback order is confirmed and will be prepared for shipping soon:</p>
      <ul style="padding-left:18px;">${itemsHtml}</ul>
      ${shippingAddress ? `<p style="color:#555; font-size:.9rem;">Shipping to: ${shippingAddress.name}, ${shippingAddress.address1}${shippingAddress.address2 ? ", " + shippingAddress.address2 : ""}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}, ${shippingAddress.country}</p>` : ""}
      <p style="color:#777; font-size:.85rem;">We'll email you again once your order ships.</p>
    `;
  }
  if (webinarItems && webinarItems.length > 0) {
    const itemsHtml = webinarItems
      .map(
        (w) =>
          `<li style="margin-bottom:10px;"><strong>${w.title}</strong>${w.date ? ` — ${w.date}` : ""} — <a href="${w.joinUrl}">Join here</a>${w.platform ? ` (via ${w.platform})` : ""}</li>`
      )
      .join("");
    sections += `
      <p>You're registered for ${webinarItems.length > 1 ? "these webinars" : "this webinar"}:</p>
      <ul style="padding-left:18px;">${itemsHtml}</ul>
      <p style="color:#777; font-size:.85rem;">Save this email — you'll need the link above to join.</p>
    `;
  }

  const html = `
    <div style="font-family:sans-serif; max-width:520px; margin:0 auto;">
      <h2>Thank you for your order!</h2>
      ${sections}
    </div>
  `;

  let subject = "Your order is confirmed";
  if (ebookLinks?.length > 0) subject = "Your download is ready";
  else if (webinarItems?.length > 0) subject = "You're registered!";

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
        subject,
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

/**
 * Delivers a confirmed Paystack transaction, if not already delivered.
 * Ebook and resource items get signed download links emailed (same mechanism
 * for both — a resource is just a second kind of digital file). Paperback
 * items create a Physical Order document in Sanity (status "Pending") for
 * fulfillment tracking. Webinar items get the private join link emailed and
 * a Webinar Registration record created (paid: true), the same list free
 * registrations land in.
 * Safe to call multiple times for the same reference — it will only actually
 * process once, since it checks and records a "delivery" document in Sanity first.
 */
export async function deliverOrder({ reference, customerEmail, metadata, siteUrl }) {
  if (!reference || !customerEmail) return { delivered: false, reason: "Missing reference or email." };

  // Check if we've already delivered this order
  const existing = await client.fetch(
    `*[_type == "delivery" && reference == $reference][0]`,
    { reference }
  );

  if (existing) {
    return { delivered: false, reason: "Already delivered." };
  }

  const orderItemsRaw = metadata?.order_items;
  if (!orderItemsRaw) return { delivered: false, reason: "No order_items in metadata." };

  const orderItems = JSON.parse(orderItemsRaw);

  // Explicit buckets by format — not an inverse filter — so an item can
  // never accidentally fall into the wrong bucket and get looked up
  // against the wrong Sanity document type.
  const paperbackOrderItems = orderItems.filter((i) => i.format === "paperback");
  const resourceOrderItems = orderItems.filter((i) => i.format === "resource");
  const webinarOrderItems = orderItems.filter((i) => i.format === "webinar");
  const ebookOrderItems = orderItems.filter(
    (i) => i.format !== "paperback" && i.format !== "resource" && i.format !== "webinar"
  );

  if (
    ebookOrderItems.length === 0 &&
    paperbackOrderItems.length === 0 &&
    resourceOrderItems.length === 0 &&
    webinarOrderItems.length === 0
  ) {
    return { delivered: false, reason: "No items found in order." };
  }

  let booksWithLinks = [];
  if (ebookOrderItems.length > 0) {
    const ebookSlugs = ebookOrderItems.map((i) => i.slug).filter(Boolean);
    const books = await client.fetch(
      `*[_type == "book" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id, url } } }`,
      { slugs: ebookSlugs }
    );
    const deliverable = books.filter((b) => b.digitalFile?.asset?._id);
    booksWithLinks = deliverable.map((b) => {
      const token = signDownloadToken({
        assetId: b.digitalFile.asset._id,
        title: b.title,
        ref: reference,
      });
            return {
        title: b.title,
        slug: b.slug,
        downloadUrl: `${siteUrl}/api/download/${token}`,
      };
    });
  }

  let resourcesWithLinks = [];
  if (resourceOrderItems.length > 0) {
    const resourceSlugs = resourceOrderItems.map((i) => i.slug).filter(Boolean);
    const resources = await client.fetch(
      `*[_type == "resource" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id, url } } }`,
      { slugs: resourceSlugs }
    );
    const deliverable = resources.filter((r) => r.digitalFile?.asset?._id);
    resourcesWithLinks = deliverable.map((r) => {
      const token = signDownloadToken({
        assetId: r.digitalFile.asset._id,
        title: r.title,
        ref: reference,
      });
            return {
        title: r.title,
        slug: r.slug,
        downloadUrl: `${siteUrl}/api/download/${token}`,
      };
    });
  }

  const allDownloadLinks = [...booksWithLinks, ...resourcesWithLinks];

  let webinarItemsForEmail = [];
  let webinarsToRegister = [];
  if (webinarOrderItems.length > 0) {
    const webinarSlugs = webinarOrderItems.map((i) => i.slug).filter(Boolean);
    const events = await client.fetch(
      `*[_type == "event" && slug.current in $slugs]{ title, "slug": slug.current, date, platform, joinLink }`,
      { slugs: webinarSlugs }
    );
    const deliverable = events.filter((e) => e.joinLink);
    webinarItemsForEmail = deliverable.map((e) => ({
      title: e.title,
      joinUrl: e.joinLink,
      date: e.date
        ? new Date(e.date).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })
        : null,
      platform: e.platform,
    }));
    webinarsToRegister = deliverable.map((e) => ({ title: e.title, slug: e.slug }));
  }

  let shippingAddress = null;
  if (paperbackOrderItems.length > 0) {
    if (metadata?.shipping_address) {
      try {
        shippingAddress = JSON.parse(metadata.shipping_address);
      } catch (e) {
        console.error("Could not parse shipping_address metadata:", e);
      }
    }

    await client.create({
      _type: "physicalOrder",
      reference,
      email: customerEmail,
      items: paperbackOrderItems.map((i) => ({ title: i.title, qty: i.qty })),
      shippingName: shippingAddress?.name || "",
      shippingAddress1: shippingAddress?.address1 || "",
      shippingAddress2: shippingAddress?.address2 || "",
      shippingCity: shippingAddress?.city || "",
      shippingState: shippingAddress?.state || "",
      shippingPostalCode: shippingAddress?.postalCode || "",
      shippingCountry: shippingAddress?.country || "",
      shippingPhone: shippingAddress?.phone || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
  }

  if (webinarsToRegister.length > 0) {
    await Promise.all(
      webinarsToRegister.map((w) =>
        client.create({
          _type: "webinarRegistration",
          eventTitle: w.title,
          eventSlug: w.slug,
          name: "",
          email: customerEmail,
          paid: true,
          reference,
          registeredAt: new Date().toISOString(),
        })
      )
    );
  }

  if (
    allDownloadLinks.length === 0 &&
    paperbackOrderItems.length === 0 &&
    webinarItemsForEmail.length === 0
  ) {
    return { delivered: false, reason: "No deliverable files, physical items, or webinar links found." };
  }

  await sendOrderEmail(customerEmail, {
    ebookLinks: allDownloadLinks,
    paperbackItems: paperbackOrderItems,
    webinarItems: webinarItemsForEmail,
    shippingAddress,
    siteUrl,
  });

    // Record that this order has been delivered, so we never process it twice
  const itemsDelivered = [
    ...booksWithLinks.map((b) => ({ title: b.title, slug: b.slug, type: "ebook" })),
    ...resourcesWithLinks.map((r) => ({ title: r.title, slug: r.slug, type: "resource" })),
  ];
  await client.create({
    _type: "delivery",
    reference,
    email: customerEmail,
    deliveredAt: new Date().toISOString(),
    itemsDelivered,
  });
  return {
    delivered: true,
    books: allDownloadLinks,
    physicalOrderCreated: paperbackOrderItems.length > 0,
    webinars: webinarItemsForEmail,
  };
}
