import { cookies } from "next/headers";
import Link from "next/link";
import { verifyDownloadToken, signDownloadToken } from "../../lib/downloadToken";
import { sanityAdmin } from "../../lib/sanityAdminClient";

export const metadata = {
  title: "My Account — Solomon B. Ibe",
  robots: { index: false, follow: false },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", { dateStyle: "long" });
}

async function getAccountData(email) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reflectivemindsarena.com.ng";

  const deliveries = await sanityAdmin.fetch(
    `*[_type == "delivery" && lower(email) == lower($email)]{ itemsDelivered, deliveredAt }`,
    { email }
  );

  const allItems = (deliveries || []).flatMap((d) => d.itemsDelivered || []);
  const bookSlugs = allItems.filter((i) => i.type === "ebook").map((i) => i.slug);
  const resourceSlugs = allItems.filter((i) => i.type === "resource").map((i) => i.slug);

  const [books, resources, physicalOrders, webinarRegs] = await Promise.all([
    bookSlugs.length > 0
      ? sanityAdmin.fetch(
          `*[_type == "book" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id } } }`,
          { slugs: bookSlugs }
        )
      : [],
    resourceSlugs.length > 0
      ? sanityAdmin.fetch(
          `*[_type == "resource" && slug.current in $slugs]{ title, "slug": slug.current, digitalFile{ asset-> { _id } } }`,
          { slugs: resourceSlugs }
        )
      : [],
    sanityAdmin.fetch(
      `*[_type == "physicalOrder" && lower(email) == lower($email)] | order(createdAt desc){ reference, items, status, shippingCity, shippingState, shippingCountry, createdAt }`,
      { email }
    ),
    sanityAdmin.fetch(
      `*[_type == "webinarRegistration" && lower(email) == lower($email)] | order(registeredAt desc){ eventTitle, eventSlug, paid, registeredAt }`,
      { email }
    ),
  ]);

  const downloads = [...books, ...resources]
    .filter((item) => item.digitalFile?.asset?._id)
    .map((item) => {
      const token = signDownloadToken({
        assetId: item.digitalFile.asset._id,
        title: item.title,
        ref: "account",
      });
      return { title: item.title, downloadUrl: `${siteUrl}/api/download/${token}` };
    });

  return { downloads, physicalOrders: physicalOrders || [], webinarRegs: webinarRegs || [] };
}

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("account_session")?.value;
  const session = sessionToken ? verifyDownloadToken(sessionToken) : null;

  if (!session || session.purpose !== "account-session" || !session.email) {
    return (
      <section className="page-hero" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.8rem" }}>Session Expired</h1>
          <p>Please sign in again to view your account.</p>
          <Link href="/account/login">
            <button className="btn btn-primary" style={{ marginTop: 12 }}>Sign In</button>
          </Link>
        </div>
      </section>
    );
  }

  const { downloads, physicalOrders, webinarRegs } = await getAccountData(session.email);
  const hasNothing = downloads.length === 0 && physicalOrders.length === 0 && webinarRegs.length === 0;

  return (
    <>
            <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / My Account</div>
          <h1>My Account</h1>
          <p>Signed in as {session.email}</p>
          <form action="/api/account/logout" method="POST" style={{ marginTop: 16 }}>
            <button type="submit" className="btn btn-outline btn-sm" style={{ color: "var(--parchment)" }}>
              Sign Out
            </button>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {hasNothing && (
            <p style={{ opacity: 0.7 }}>No orders found for this email yet.</p>
          )}

          {downloads.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <span className="eyebrow">Digital Downloads</span>
              <h2 style={{ marginTop: 14, marginBottom: 24 }}>Your files</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {downloads.map((d, i) => (
                  <div key={i} style={{ background: "var(--sand)", padding: 20, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <span style={{ fontWeight: 600 }}>{d.title}</span>
                    <a href={d.downloadUrl} className="btn btn-outline btn-sm">Download</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {physicalOrders.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <span className="eyebrow">Paperback Orders</span>
              <h2 style={{ marginTop: 14, marginBottom: 24 }}>Shipping status</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {physicalOrders.map((o) => (
                  <div key={o.reference} style={{ background: "var(--sand)", padding: 20, borderRadius: 2 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontWeight: 600 }}>{(o.items || []).map((i) => i.title).join(", ")}</span>
                      <span className="badge">{o.status}</span>
                    </div>
                    <p style={{ opacity: 0.65, fontSize: ".85rem", margin: 0 }}>
                      Shipping to {[o.shippingCity, o.shippingState, o.shippingCountry].filter(Boolean).join(", ")}
                      {" · "}Ordered {formatDate(o.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {webinarRegs.length > 0 && (
            <div>
              <span className="eyebrow">Webinars</span>
              <h2 style={{ marginTop: 14, marginBottom: 24 }}>Your registrations</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {webinarRegs.map((w, i) => (
                  <div key={i} style={{ background: "var(--sand)", padding: 20, borderRadius: 2 }}>
                    <div style={{ fontWeight: 600 }}>{w.eventTitle}</div>
                    <p style={{ opacity: 0.65, fontSize: ".85rem", margin: "4px 0 0" }}>
                      Registered {formatDate(w.registeredAt)} · Join link sent to your email
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}