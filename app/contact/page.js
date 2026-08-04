import { getSitePage } from "../../sanity/queries";

export const revalidate = 30;

export default async function ContactPage() {
  const page = await getSitePage("contact");

  const email = page?.contactEmail || "hello@reflectivemindsarena.com.ng";
  const location = page?.contactLocation || "Lagos, Nigeria";
  const responseTime = page?.contactResponseTime || "Within 2-3 business days";
  const instagram = page?.contactInstagram || "#";
  const twitter = page?.contactTwitter || "#";
  const facebook = page?.contactFacebook || "#";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Contact</div>
          <h1>Get in Touch</h1>
          <p>For interviews, speaking engagements, book orders, or just to say hello.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div><label>First name</label><input required /></div>
                  <div><label>Last name</label><input required /></div>
                </div>
                <div className="form-row full">
                  <div><label>Email</label><input type="email" required /></div>
                </div>
                <div className="form-row full">
                  <div>
                    <label>Subject</label>
                    <select>
                      <option>General inquiry</option>
                      <option>Interview request</option>
                      <option>Speaking engagement</option>
                      <option>Book order</option>
                      <option>Rights & permissions</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row full">
                  <div>
                    <label>Message</label>
                    <textarea rows="6" required style={{
                      width: "100%", padding: "13px 14px",
                      border: "1px solid var(--line)", borderRadius: 2,
                      fontFamily: "var(--font-body)", background: "var(--parchment)",
                      color: "var(--ink)"
                    }}></textarea>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Send Message</button>
              </form>
            </div>
            <div>
              <div className="contact-info-item">
                <div>✉️</div>
                <div>
                  <strong style={{ fontFamily: "var(--font-ui)" }}>Email</strong>
                  <p style={{ margin: "4px 0 0", opacity: 0.7 }}>{email}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div>📍</div>
                <div>
                  <strong style={{ fontFamily: "var(--font-ui)" }}>Based in</strong>
                  <p style={{ margin: "4px 0 0", opacity: 0.7 }}>{location}</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div>📅</div>
                <div>
                  <strong style={{ fontFamily: "var(--font-ui)" }}>Response time</strong>
                  <p style={{ margin: "4px 0 0", opacity: 0.7 }}>{responseTime}</p>
                </div>
              </div>
              <div style={{ marginTop: 32 }}>
                <strong style={{ fontFamily: "var(--font-ui)", fontSize: ".85rem", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Follow along
                </strong>
                <div className="social-row" style={{ marginTop: 14 }}>
                  {instagram !== "#" && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                  )}
                  {twitter !== "#" && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>
                  )}
                  {facebook !== "#" && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}