import { getAllEvents } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import WebinarRegisterForm from "../../components/WebinarRegisterForm";
import AddToWebinarCartButton from "../../components/AddToWebinarCartButton";

export const metadata = {
  title: "Events — Solomon B. Ibe",
  description: "Speaking engagements, book launches, webinars, and appearances by Solomon B. Ibe.",
  openGraph: {
    title: "Events — Solomon B. Ibe",
    description: "Speaking engagements, book launches, webinars, and appearances by Solomon B. Ibe.",
    url: "https://reflectivemindsarena.com.ng/events",
    type: "website",
  },
};

export const revalidate = 30;

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
}

function buildEventJsonLd(events, siteUrl) {
  return events
    .filter((e) => e.date)
    .map((e) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: e.title,
      startDate: e.date,
      ...(e.description && { description: e.description }),
      eventAttendanceMode:
        e.type === "webinar"
          ? "https://schema.org/OnlineEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location:
        e.type === "webinar"
          ? { "@type": "VirtualLocation", url: `${siteUrl}/events` }
          : { "@type": "Place", name: e.location || "Location to be announced" },
      organizer: { "@type": "Person", name: "Solomon B. Ibe" },
      ...(e.ticketUrl && {
        offers: {
          "@type": "Offer",
          url: e.ticketUrl,
          availability: "https://schema.org/InStock",
        },
      }),
    }));
}

export default async function EventsPage() {
  const events = await getAllEvents();

  const webinars = events.filter((e) => e.type === "webinar");
  const otherEvents = events.filter((e) => e.type !== "webinar");
  const siteUrl = "https://reflectivemindsarena.com.ng";
  const eventsJsonLd = buildEventJsonLd(events, siteUrl);

  return (
    <>
      {eventsJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Events</div>
          <h1>Events</h1>
          <p>Speaking engagements, book launches, webinars, and public appearances.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {webinars.length > 0 && (
            <>
              <span className="eyebrow">Webinars</span>
              <h2 style={{ marginTop: 14, marginBottom: 32 }}>Join live, online</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 70 }}>
                {webinars.map((w) => (
                  <div
                    key={w._id}
                    style={{ background: "var(--sand)", padding: 32, borderRadius: 2 }}
                  >
                    {w.coverImage && (
                      <div style={{ marginBottom: 20, borderRadius: 2, overflow: "hidden" }}>
                        <img
                          src={urlFor(w.coverImage).width(900).url()}
                          alt={w.title}
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    )}
                    <h3 style={{ marginBottom: 6 }}>{w.title}</h3>
                    {w.date && (
                      <p style={{ opacity: 0.65, fontSize: ".9rem", marginBottom: 10 }}>
                        {formatDate(w.date)}
                      </p>
                    )}
                    {w.description && (
                      <p style={{ opacity: 0.8, marginBottom: 20 }}>{w.description}</p>
                    )}
                    <div style={{ maxWidth: 320 }}>
                      {!w.hasJoinLink ? (
                        <span
                          className="btn btn-dark btn-sm"
                          style={{ opacity: 0.5, cursor: "default", pointerEvents: "none" }}
                        >
                          Coming soon
                        </span>
                      ) : w.price ? (
                        <AddToWebinarCartButton
                          webinar={{ slug: w.slug, title: w.title, price: w.price }}
                        />
                      ) : (
                        <WebinarRegisterForm slug={w.slug} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <span className="eyebrow">Upcoming Events</span>
          <h2 style={{ marginTop: 14, marginBottom: 32 }}>Where to find me</h2>
          {otherEvents.length === 0 ? (
            <div
              style={{
                background: "var(--sand)",
                padding: 40,
                borderRadius: 2,
                textAlign: "center",
                opacity: 0.7,
              }}
            >
              <p style={{ fontSize: "1.1rem" }}>No upcoming events scheduled at this time.</p>
              <p>Check back soon or subscribe to the newsletter to be notified of new events.</p>
              
                href="/newsletter"
                className="btn btn-dark"
                style={{ marginTop: 14, display: "inline-flex" }}
              >
                Join the Newsletter
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {otherEvents.map((e) => (
                <div
                  key={e._id}
                  style={{ background: "var(--sand)", padding: 28, borderRadius: 2 }}
                >
                  {e.coverImage && (
                    <div style={{ marginBottom: 16, borderRadius: 2, overflow: "hidden" }}>
                      <img
                        src={urlFor(e.coverImage).width(900).url()}
                        alt={e.title}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                  <h3 style={{ marginBottom: 6 }}>{e.title}</h3>
                  <p style={{ opacity: 0.65, fontSize: ".9rem", marginBottom: 10 }}>
                    {[formatDate(e.date), e.location].filter(Boolean).join(" — ")}
                  </p>
                  {e.description && (
                    <p style={{ opacity: 0.8, marginBottom: e.ticketUrl ? 16 : 0 }}>
                      {e.description}
                    </p>
                  )}
                  {e.ticketUrl && (
                    
                      href={e.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      Tickets / Registration
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 70 }}>
            <span className="eyebrow">Speaking & Appearances</span>
            <h2 style={{ marginTop: 14, marginBottom: 20 }}>Book Solomon for your event</h2>
            <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
              Solomon B. Ibe is available for speaking engagements, panel discussions,
              literary festivals, university lectures, and corporate events on topics including:
            </p>
            <ul style={{ opacity: 0.8, lineHeight: 2, paddingLeft: 20 }}>
              <li>The Architecture of Belief — how societies construct the minds inside them</li>
              <li>African storytelling traditions and their relevance today</li>
              <li>Independent publishing in Nigeria and across Africa</li>
              <li>Philosophy, identity, and human freedom</li>
              <li>Writing as a tool for cultural preservation</li>
            </ul>
            <a href="/contact" className="btn btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}