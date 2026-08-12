import { urlFor } from "../sanity/image";

export default function Testimonials({ testimonials, title = "What People Are Saying", eyebrow = "Testimonials" }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 style={{ marginTop: 14 }}>{title}</h2>
          </div>
        </div>
        <div className="grid-3">
          {testimonials.map((t) => (
            <div
              key={t._id}
              style={{
                background: "var(--sand)",
                border: "1px solid var(--line)",
                borderRadius: 2,
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {t.rating && (
                <div style={{ color: "var(--gold)", fontSize: ".9rem", letterSpacing: 2 }}>
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
              )}
              <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                {t.photo ? (
                  <img
                    src={urlFor(t.photo).width(80).height(80).url()}
                    alt={t.name}
                    style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--green-deep)",
                      color: "var(--parchment)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                    }}
                  >
                    {t.name ? t.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 600, fontSize: ".95rem" }}>{t.name}</div>
                  {t.role && <div style={{ fontSize: ".82rem", opacity: 0.65 }}>{t.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}