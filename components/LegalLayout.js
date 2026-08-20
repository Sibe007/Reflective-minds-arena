export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="eyebrow">Legal</span>
        <h1 style={{ margin: "14px 0 6px" }}>{title}</h1>
        <p style={{ opacity: 0.6, fontSize: ".92rem", marginBottom: 40 }}>Last updated: {lastUpdated}</p>
        <div className="legal-body">{children}</div>
      </div>
    </section>
  );
}