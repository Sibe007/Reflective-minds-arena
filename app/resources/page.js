import Link from "next/link";

export const metadata = {
  title: "Resources — Solomon B. Ibe",
  description: "Free and paid writing resources, guides, and tools for readers and writers.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Resources</div>
          <h1>Resources</h1>
          <p>Free and paid tools for writers working with memory, culture, and craft.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Free Downloads</span>
          <h2 style={{ marginTop: 14, marginBottom: 32 }}>Start here — no cost</h2>
          <div className="grid-3">
            <div className="resource-card reveal">
              <div className="resource-icon">①</div>
              <div>
                <h3>Reading Group Guide</h3>
                <p style={{ opacity: 0.7, marginBottom: 14 }}>
                  Discussion questions for book clubs working through The Evolution of Man.
                </p>
                <a href="#" className="btn btn-outline btn-sm">Download Free</a>
              </div>
            </div>
            <div className="resource-card reveal">
              <div className="resource-icon">②</div>
              <div>
                <h3>10 Memoir Opening Lines</h3>
                <p style={{ opacity: 0.7, marginBottom: 14 }}>
                  Study examples of memoir openings that earn the reader's trust in one sentence.
                </p>
                <a href="#" className="btn btn-outline btn-sm">Download Free</a>
              </div>
            </div>
            <div className="resource-card reveal">
              <div className="resource-icon">③</div>
              <div>
                <h3>Igbo Naming Quick Reference</h3>
                <p style={{ opacity: 0.7, marginBottom: 14 }}>
                  A short primer on naming conventions for writers researching Igbo culture.
                </p>
                <a href="#" className="btn btn-outline btn-sm">Download Free</a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 70 }}>
            <span className="eyebrow">Writing Guides</span>
            <h2 style={{ marginTop: 14, marginBottom: 32 }}>Go deeper</h2>
            <div className="grid-3">
              <div className="product-card reveal">
                <div className="product-thumb">
                  <div className="t">The Memoirist's Question List</div>
                </div>
                <h3>The Memoirist's Question List</h3>
                <p style={{ opacity: 0.7, fontSize: ".9rem" }}>120 prompts for excavating the memories that matter.</p>
                <div className="product-price">$7.00</div>
                <a href="https://reflective-minds-arena.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm btn-block">Buy Now</a>
              </div>
              <div className="product-card reveal">
                <div className="product-thumb">
                  <div className="t">Building a Believable Healer</div>
                </div>
                <h3>Building a Believable Healer</h3>
                <p style={{ opacity: 0.7, fontSize: ".9rem" }}>A craft guide on writing spiritual gifts into fiction with cultural integrity.</p>
                <div className="product-price">$5.00</div>
                <a href="https://reflective-minds-arena.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm btn-block">Buy Now</a>
              </div>
              <div className="product-card reveal">
                <div className="product-thumb">
                  <div className="t">Self-Publishing in Nigeria & Beyond</div>
                </div>
                <h3>Self-Publishing in Nigeria &amp; Beyond</h3>
                <p style={{ opacity: 0.7, fontSize: ".9rem" }}>A practical walkthrough of independent publishing logistics across Africa.</p>
                <div className="product-price">$39.00</div>
                <a href="https://reflective-minds-arena.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm btn-block">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}