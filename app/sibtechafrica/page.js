import { getAllSibtechProducts } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import BuySibtechButton from "../../components/BuySibtechButton";

const ACCENT = "#1F6E6E"; // distinct teal accent for this page only — rest of the site keeps its gold

export const metadata = {
  title: "SIBTECH AFRICA | Practical Digital Solutions for Smarter Businesses",
  description:
    "Explore SIBTECH AFRICA digital products, business tools, IT management systems, templates and practical resources designed to help businesses, entrepreneurs and creators work smarter and grow.",
  openGraph: {
    title: "SIBTECH AFRICA | Practical Digital Solutions for Smarter Businesses",
    description: "Digital products and business tools for smarter, more organized businesses.",
    url: "https://reflectivemindsarena.com.ng/sibtechafrica",
    type: "website",
  },
};

export const revalidate = 30;

const FAQS = [
  {
    q: "Are SIBTECH AFRICA products physical products?",
    a: "No. SIBTECH AFRICA products are digital products delivered electronically — you'll get a download link by email right after payment.",
  },
  {
    q: "How do I receive my purchase?",
    a: "After successful payment, a download link is sent to the email you provide at checkout.",
  },
  {
    q: "Can I use the products for my business?",
    a: "Yes, unless a specific product states otherwise. Always check a product's own usage terms before redistribution or resale.",
  },
  {
    q: "What is your refund policy?",
    a: "Please review our Refund Policy before purchasing.",
  },
];

export default async function SibtechAfricaPage() {
  const products = await getAllSibtechProducts();
  const featured = products?.[0];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / SIBTECH AFRICA</div>
          <span className="eyebrow" style={{ color: ACCENT }}>SIBTECH AFRICA · DIGITAL PRODUCTS &amp; BUSINESS TOOLS</span>
          <h1 style={{ marginTop: 14 }}>Practical Digital Solutions for Smarter Businesses</h1>
          <p style={{ maxWidth: 640, marginTop: 14, opacity: 0.85 }}>
            SIBTECH AFRICA creates practical digital products, business tools, templates, guides and
            technology resources designed to help small businesses, entrepreneurs, creators and
            organizations work smarter, stay organized and grow.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ marginBottom: 56 }}>
            <div>
              <h3 style={{ color: ACCENT }}>Digital Products</h3>
              <p style={{ opacity: 0.75 }}>Downloadable resources designed for practical use.</p>
            </div>
            <div>
              <h3 style={{ color: ACCENT }}>Business-Focused</h3>
              <p style={{ opacity: 0.75 }}>Created around real business and operational needs.</p>
            </div>
            <div>
              <h3 style={{ color: ACCENT }}>African Perspective</h3>
              <p style={{ opacity: 0.75 }}>Built with African entrepreneurs and businesses in mind.</p>
            </div>
          </div>

          {featured ? (
            <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 48, paddingBottom: 56, borderBottom: "1px solid var(--line)" }}>
              <div className="book-cover" style={{ aspectRatio: "2/3", position: "relative" }}>
                {featured.coverImage ? (
                  <Image
                    src={urlFor(featured.coverImage).width(400).url()}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 900px) 40vw, 280px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div><div className="title">{featured.title}</div></div>
                )}
              </div>
              <div>
                <span className="eyebrow" style={{ color: ACCENT }}>Featured Product</span>
                <h2 style={{ marginTop: 10 }}>{featured.title}</h2>
                {featured.tagline && (
                  <h3 style={{ opacity: 0.6, fontWeight: 400, fontStyle: "italic" }}>{featured.tagline}</h3>
                )}
                {featured.description && (
                <div style={{ opacity: 0.8, marginTop: 16 }}>
                <PortableText value={featured.description} />
                </div>
                )}

                {featured.whatsIncluded?.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <h3>What's Included</h3>
                    <ul style={{ marginTop: 10, paddingLeft: 20, opacity: 0.85 }}>
                      {featured.whatsIncluded.map((item, i) => (
                        <li key={i} style={{ marginBottom: 6 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {featured.whoItsFor?.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <h3>Designed For</h3>
                    <p style={{ opacity: 0.75, marginTop: 6 }}>{featured.whoItsFor.join(" · ")}</p>
                  </div>
                )}

                <div style={{ marginTop: 28, maxWidth: 360, border: "1px solid var(--line)", borderRadius: 2, padding: "20px 24px", background: "var(--sand)" }}>
                  {featured.hasDigitalFile ? (
                    <BuySibtechButton slug={featured.slug} price={featured.price} />
                  ) : (
                    <p style={{ opacity: 0.6, fontSize: ".9rem" }}>This product isn't available for purchase yet.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products yet</h3>
              <p>Add SIBTECH AFRICA products in the Content Studio to display them here.</p>
            </div>
          )}

          <div style={{ marginTop: 70 }}>
            <span className="eyebrow" style={{ color: ACCENT }}>Why SIBTECH AFRICA Exists</span>
            <h2 style={{ marginTop: 14, marginBottom: 20 }}>Your Business May Be Small. Your IT Management Doesn't Have to Be.</h2>
            <p style={{ opacity: 0.8, maxWidth: 680 }}>
              Many small businesses rely on computers, smartphones, internet connections, cloud services,
              software, printers, files and digital accounts every day — but without a structured system,
              important technology tasks can easily become disorganized. SIBTECH AFRICA's products give you
              a ready-made, practical approach instead of starting from scratch.
            </p>
          </div>

          <div style={{ marginTop: 70, background: "var(--sand)", padding: 40, borderRadius: 2 }}>
            <span className="eyebrow" style={{ color: ACCENT }}>FAQ</span>
            <h2 style={{ marginTop: 14, marginBottom: 28 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {FAQS.map((f, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: "1.05rem" }}>{f.q}</h3>
                  <p style={{ opacity: 0.75, marginTop: 6 }}>{f.a}</p>
                </div>
              ))}
            </div>
            <Link href="/refund-policy">
              <button className="btn btn-outline btn-sm" style={{ marginTop: 20, borderColor: ACCENT, color: ACCENT }}>
                View Refund Policy
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}