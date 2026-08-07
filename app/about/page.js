import { getSitePage } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import Link from "next/link";

export const revalidate = 30;

export default async function AboutPage() {
  const page = await getSitePage("about");

  const heading = page?.aboutHeading || "About the Author";
  const subheading = page?.aboutSubheading || "Nigerian author, Interior Architect, and independent publisher based in Lagos.";
  const bio1 = page?.aboutBio || "";
  const bio2 = page?.aboutBio2 || "";
  const pullQuote = page?.aboutPullQuote || "I did not become a writer to be understood. I became one to make sure certain things were not lost.";
  const influences = page?.aboutInfluences || [];
  const awards = page?.aboutAwards || [];
  const whyIWrite1 = page?.homeWhyIWrite || "";
  const whyIWrite2 = page?.homeWhyIWrite2 || "";
  const whyIWrite3 = page?.homeWhyIWrite3 || "";

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
              {page?.aboutPhoto ? (
                <img src={urlFor(page.aboutPhoto).width(600).url()} alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src="/author.jpg" alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              )}
            </div>
            <div className="reveal">
              <span className="eyebrow">Author Profile</span>
              <h2 style={{ marginTop: 14 }}>Solomon B. Ibe</h2>
              {bio1 && <p style={{ fontSize: "1.05rem", opacity: 0.82 }}>{bio1}</p>}
              {bio2 && <p style={{ fontSize: "1.05rem", opacity: 0.82 }}>{bio2}</p>}
              <div className="hero-ctas" style={{ marginTop: 20 }}>
                <Link href="/books"><button className="btn btn-primary">Browse My Books</button></Link>
                <Link href="/contact"><button className="btn btn-outline">Get in Touch</button></Link>
              </div>
            </div>
          </div>

          {pullQuote && (
            <div className="pull-quote reveal" style={{ marginTop: 48 }}>
              {pullQuote}
            </div>
          )}

          {(whyIWrite1 || whyIWrite2 || whyIWrite3) && (
            <div className="reveal" style={{ marginTop: 60, background: "var(--sand)", padding: 40, borderRadius: 2 }}>
              <span className="eyebrow">Why I Write</span>
              <h2 style={{ marginTop: 14 }}>The question beneath every book</h2>
              {whyIWrite1 && <p style={{ fontSize: "1.08rem", opacity: 0.82, marginTop: 20 }}>{whyIWrite1}</p>}
              {whyIWrite2 && <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite2}</p>}
              {whyIWrite3 && <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite3}</p>}
            </div>
          )}

          {influences && influences.length > 0 && (
            <div className="reveal" style={{ marginTop: 60 }}>
              <span className="eyebrow">Literary Influences</span>
              <h2 style={{ marginTop: 14 }}>Writers who shaped my thinking</h2>
              <div className="influence-row" style={{ marginTop: 20 }}>
                {influences.map((name, i) => (
                  <span className="influence-tag" key={i}>{name}</span>
                ))}
              </div>
            </div>
          )}

          {awards && awards.length > 0 && (
            <div className="reveal" style={{ marginTop: 60 }}>
              <span className="eyebrow">Achievements</span>
              <h2 style={{ marginTop: 14 }}>Awards and Publications</h2>
              <ul className="award-list">
                {awards.map((a, i) => (
                  <li key={i}>
                    <span>{a.title}</span>
                    <span className="yr">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
