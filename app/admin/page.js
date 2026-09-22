import { cookies } from "next/headers";
import Link from "next/link";
import { verifyDownloadToken } from "../../lib/downloadToken";
import { isAdminEmail } from "../../lib/adminAuth";
import { sanityAdmin } from "../../lib/sanityAdminClient";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

const STATUS_OPTIONS = ["All", "Pending", "Shipped", "Delivered"];

async function getAdminData(statusFilter) {
  const orderFilter =
    statusFilter && statusFilter !== "All"
      ? `*[_type == "physicalOrder" && status == $status] | order(createdAt desc)`
      : `*[_type == "physicalOrder"] | order(createdAt desc)`;

  const [physicalOrders, deliveries, webinarRegs, abandonedCarts] = await Promise.all([
    sanityAdmin.fetch(
      `${orderFilter}{ reference, email, items, status, shippingName, shippingCity, shippingState, shippingCountry, createdAt }`,
      statusFilter && statusFilter !== "All" ? { status: statusFilter } : {}
    ),
    sanityAdmin.fetch(
      `*[_type == "delivery"] | order(deliveredAt desc){ reference, email, itemsDelivered, deliveredAt }`
    ),
    sanityAdmin.fetch(
      `*[_type == "webinarRegistration"] | order(registeredAt desc){ eventTitle, name, email, paid, reference, registeredAt }`
    ),
    sanityAdmin.fetch(
      `*[_type == "abandonedCart"] | order(capturedAt desc){ email, items, capturedAt, reminderSent }`
    ),
  ]);

  return {
    physicalOrders: physicalOrders || [],
    deliveries: deliveries || [],
    webinarRegs: webinarRegs || [],
    abandonedCarts: abandonedCarts || [],
  };
}

const cardStyle = { background: "var(--sand)", padding: 20, borderRadius: 2, marginBottom: 12 };
const rowHeader = { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 };
const meta = { opacity: 0.65, fontSize: ".85rem", margin: 0 };

export default async function AdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const session = sessionToken ? verifyDownloadToken(sessionToken) : null;

  if (!session || session.purpose !== "admin-session" || !isAdminEmail(session.email)) {
    return (
      <section className="page-hero" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.8rem" }}>Session Expired</h1>
          <p>Please sign in again to view the admin dashboard.</p>
          <Link href="/admin/login">
            <button className="btn btn-primary" style={{ marginTop: 12 }}>Sign In</button>
          </Link>
        </div>
      </section>
    );
  }

  const params = (await searchParams) || {};
  const statusFilter = STATUS_OPTIONS.includes(params.status) ? params.status : "All";

  const { physicalOrders, deliveries, webinarRegs, abandonedCarts } = await getAdminData(statusFilter);

  const pendingCount = physicalOrders.filter((o) => o.status === "Pending").length;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Admin</div>
          <h1>Admin Dashboard</h1>
          <p>Signed in as {session.email}</p>
          <form action="/api/admin/logout" method="POST" style={{ marginTop: 16 }}>
            <button type="submit" className="btn btn-outline btn-sm" style={{ color: "var(--parchment)" }}>
              Sign Out
            </button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Summary */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <div style={{ ...cardStyle, flex: "1 1 160px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{physicalOrders.length}</div>
              <div style={meta}>Paperback orders{pendingCount > 0 ? ` (${pendingCount} pending)` : ""}</div>
            </div>
            <div style={{ ...cardStyle, flex: "1 1 160px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{deliveries.length}</div>
              <div style={meta}>Digital deliveries</div>
            </div>
            <div style={{ ...cardStyle, flex: "1 1 160px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{webinarRegs.length}</div>
              <div style={meta}>Webinar registrations</div>
            </div>
            <div style={{ ...cardStyle, flex: "1 1 160px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{abandonedCarts.length}</div>
              <div style={meta}>Abandoned carts</div>
            </div>
          </div>

          {/* Paperback orders */}
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow">Paperback Orders</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginTop: 14, marginBottom: 24 }}>
              <h2 style={{ margin: 0 }}>Shipping status</h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STATUS_OPTIONS.map((s) => (
                  <Link
                    key={s}
                    href={s === "All" ? "/admin" : `/admin?status=${s}`}
                    className="btn btn-outline btn-sm"
                    style={s === statusFilter ? { background: "var(--gold, #C68B3D)", color: "#0F1A14" } : {}}
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
            {physicalOrders.length === 0 && <p style={{ opacity: 0.7 }}>No orders in this view.</p>}
            {physicalOrders.map((o) => (
              <div key={o.reference} style={cardStyle}>
                <div style={rowHeader}>
                  <span style={{ fontWeight: 600 }}>{(o.items || []).map((i) => `${i.title} ×${i.qty}`).join(", ")}</span>
                  <span className="badge">{o.status}</span>
                </div>
                <p style={meta}>
                  {o.shippingName} · {o.email} · Ref {o.reference}
                </p>
                <p style={meta}>
                  Shipping to {[o.shippingCity, o.shippingState, o.shippingCountry].filter(Boolean).join(", ")}
                  {" · "}Ordered {formatDate(o.createdAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Digital deliveries */}
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow">Digital Deliveries</span>
            <h2 style={{ marginTop: 14, marginBottom: 24 }}>Ebooks & resources sent</h2>
            {deliveries.length === 0 && <p style={{ opacity: 0.7 }}>No deliveries yet.</p>}
            {deliveries.map((d) => (
              <div key={d.reference} style={cardStyle}>
                <div style={rowHeader}>
                  <span style={{ fontWeight: 600 }}>
                    {(d.itemsDelivered || []).map((i) => i.title).join(", ") || "—"}
                  </span>
                </div>
                <p style={meta}>
                  {d.email} · Ref {d.reference} · Delivered {formatDate(d.deliveredAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Webinar registrations */}
          <div style={{ marginBottom: 56 }}>
            <span className="eyebrow">Webinars</span>
            <h2 style={{ marginTop: 14, marginBottom: 24 }}>Registrations</h2>
            {webinarRegs.length === 0 && <p style={{ opacity: 0.7 }}>No registrations yet.</p>}
            {webinarRegs.map((w, i) => (
              <div key={i} style={cardStyle}>
                <div style={rowHeader}>
                  <span style={{ fontWeight: 600 }}>{w.eventTitle}</span>
                  <span className="badge">{w.paid ? "Paid" : "Free"}</span>
                </div>
                <p style={meta}>
                  {w.name ? `${w.name} · ` : ""}{w.email}
                  {w.reference ? ` · Ref ${w.reference}` : ""} · Registered {formatDate(w.registeredAt)}
                </p>
              </div>
            ))}
          </div>

          {/* Abandoned carts */}
          <div>
            <span className="eyebrow">Abandoned Carts</span>
            <h2 style={{ marginTop: 14, marginBottom: 24 }}>Recovery queue</h2>
            {abandonedCarts.length === 0 && <p style={{ opacity: 0.7 }}>No abandoned carts recorded.</p>}
            {abandonedCarts.map((c, i) => (
              <div key={i} style={cardStyle}>
                <div style={rowHeader}>
                  <span style={{ fontWeight: 600 }}>
                    {(c.items || []).map((it) => it.title).join(", ") || "—"}
                  </span>
                  <span className="badge">{c.reminderSent ? "Reminder sent" : "Not yet reminded"}</span>
                </div>
                <p style={meta}>
                  {c.email} · Last updated {formatDate(c.capturedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}