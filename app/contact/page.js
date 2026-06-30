export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Contact</div>
          <h1>Get in Touch</h1>
          <p>For interviews, speaking engagements, rights inquiries, or just to say hello.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="contact-info-item">
            <div>✉️</div>
            <div>
              <strong style={{ fontFamily: "var(--font-ui)" }}>Email</strong>
              <p style={{ margin: "4px 0 0", opacity: 0.7 }}>hello@solomonbibe.com</p>
            </div>
          </div>
          <div className="contact-info-item">
            <div>📍</div>
            <div>
              <strong style={{ fontFamily: "var(--font-ui)" }}>Based in</strong>
              <p style={{ margin: "4px 0 0", opacity: 0.7 }}>Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
