import { getAboutPage } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import Link from "next/link";

export const revalidate = 30;

export default async function AboutPage() {
  const page = await getAboutPage();

  const heading = page?.heading || "About Solomon B. Ibe";
  const subheading = page?.subheading || "Nigerian author, Interior Architect, and independent publisher based in Lagos.";
  const bio1 = page?.bio1 || "";
  const bio2 = page?.bio2 || "";
  const pullQuote = page?.pullQuote || "I did not become a writer to be understood. I became one to make sure certain things were not lost.";
  const whyIWrite1 = page?.whyIWrite1 || "I write because every society tells stories about what is possible, what is acceptable, and who we are permitted to become.";
  const whyIWrite2 = page?.whyIWrite2 || "My work exists at the intersection of philosophy, African cultural memory, spirituality, and the human struggle for meaning.";
  const whyIWrite3 = page?.whyIWrite3 || "What becomes possible when a person dares to step beyond the boundaries they were taught to accept?";
  

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / About</div>
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-hero">
            <div className="portrait reveal">
              {page?.photo ? (
                <img src={urlFor(page.photo).width(600).url()} alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src="/author.jpg" alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              )}
            </div>
            <div className="reveal">
              <span className="eyebrow">Author Profile</span>
              <h2 style={{ marginTop: 14 }}>Solomon B. Ibe</h2>
              {bio1 ? (
                <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio1}</p>
              ) : (
                <p style={{ opacity: 0.5 }}>Add your biography in Studio — About Page — Biography Paragraph 1.</p>
              )}
              {bio2 && <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio2}</p>}
              <div className="hero-ctas" style={{ marginTop: 24 }}>
                <Link href="/books"><button className="btn btn-primary">Browse My Books</button></Link>
                <Link href="/store"><button className="btn btn-outline">Visit Store</button></Link>
                <Link href="/contact"><button className="btn btn-ghost">Get in Touch →</button></Link>
              </div>
            </div>
          </div>

          {pullQuote && <div className="pull-quote reveal" style={{ marginTop: 56 }}>{pullQuote}</div>}

          <div className="reveal" style={{ marginTop: 60, background: "var(--sand)", padding: 40, borderRadius: 2 }}>
            <span className="eyebrow">Why I Write</span>
            <h2 style={{ marginTop: 14 }}>The question beneath every book</h2>
            <p style={{ fontSize: "1.08rem", opacity: 0.82, marginTop: 20 }}>{whyIWrite1}</p>
            <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite2}</p>
            <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite3}</p>
          </div>

          
          

          <div className="reveal" style={{ marginTop: 60, background: "var(--green-deep)", padding: 40, borderRadius: 2, color: "var(--parchment)" }}>
            <span className="eyebrow" style={{ color: "var(--gold-bright)" }}>Speaking &amp; Appearances</span>
            <h2 style={{ marginTop: 14, color: "var(--parchment)" }}>Book Solomon for your event</h2>
            <p style={{ opacity: 0.8, marginTop: 14 }}>Available for speaking engagements, panel discussions, literary festivals, and corporate events.</p>
            <div style={{ marginTop: 24, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/contact"><button className="btn btn-primary">Get in Touch</button></Link>
              <Link href="/events"><button className="btn btn-outline" style={{ color: "var(--parchment)", borderColor: "var(--parchment)" }}>View Events</button></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
