export const metadata = {
  title: "Events — Solomon B. Ibe",
  description: "Speaking engagements, book launches, and appearances by Solomon B. Ibe.",
};

export default function EventsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Events</div>
          <h1>Events</h1>
          <p>Speaking engagements, book launches, and public appearances.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="eyebrow">Upcoming Events</span>
          <h2 style={{ marginTop: 14, marginBottom: 32 }}>Where to find me</h2>
          <div style={{
            background: "var(--sand)", padding: 40, borderRadius: 2,
            textAlign: "center", opacity: 0.7
          }}>
            <p style={{ fontSize: "1.1rem" }}>No upcoming events scheduled at this time.</p>
            <p>Check back soon or subscribe to the newsletter to be notified of new events.</p>
            <a href="/newsletter" className="btn btn-dark" style={{ marginTop: 14, display: "inline-flex" }}>
              Join the Newsletter
            </a>
          </div>

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