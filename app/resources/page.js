import { getAllResources } from "../../sanity/queries";
import AddToResourceCartButton from "../../components/AddToResourceCartButton";

export const metadata = {
  title: "Resources — Solomon B. Ibe",
  description: "Free and paid writing resources, guides, and tools for readers and writers.",
};

const NUMERALS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

export default async function ResourcesPage() {
  const resources = await getAllResources();

  const freeResources = resources.filter((r) => r.type === "free");
  const paidResources = resources.filter((r) => r.type !== "free");

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
          {freeResources.length > 0 && (
            <>
              <span className="eyebrow">Free Downloads</span>
              <h2 style={{ marginTop: 14, marginBottom: 32 }}>Start here — no cost</h2>
              <div className="grid-3">
                {freeResources.map((r, idx) => (
                  <div className="resource-card reveal" key={r._id}>
                    <div className="resource-icon">{NUMERALS[idx] || idx + 1}</div>
                    <div>
                      <h3>{r.title}</h3>
                      <p style={{ opacity: 0.7, marginBottom: 14 }}>{r.description}</p>
                      {r.freeFileUrl ? (
                        <a href={r.freeFileUrl} className="btn btn-outline btn-sm" download>
                          Download Free
                        </a>
                      ) : (
                        <span
                          className="btn btn-outline btn-sm"
                          style={{ opacity: 0.5, cursor: "default", pointerEvents: "none" }}
                        >
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {paidResources.length > 0 && (
            <div style={{ marginTop: freeResources.length > 0 ? 70 : 0 }}>
              <span className="eyebrow">Writing Guides</span>
              <h2 style={{ marginTop: 14, marginBottom: 32 }}>Go deeper</h2>
              <div className="grid-3">
                {paidResources.map((r) => (
                  <div className="product-card reveal" key={r._id}>
                    <div className="product-thumb">
                      <div className="t">{r.title}</div>
                    </div>
                    <h3>{r.title}</h3>
                    <p style={{ opacity: 0.7, fontSize: ".9rem" }}>{r.description}</p>
                    <div className="product-price">${(r.price || 0).toFixed(2)}</div>
                    {r.hasDigitalFile ? (
                      <AddToResourceCartButton
                        resource={{ slug: r.slug, title: r.title, price: r.price }}
                      />
                    ) : r.buyUrl ? (
                      <a
                        href={r.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark btn-sm btn-block"
                      >
                        Buy Now
                      </a>
                    ) : (
                      <span
                        className="btn btn-dark btn-sm btn-block"
                        style={{ opacity: 0.5, cursor: "default", pointerEvents: "none" }}
                      >
                        Coming soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resources.length === 0 && (
            <p style={{ opacity: 0.7 }}>Resources are being added — check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
