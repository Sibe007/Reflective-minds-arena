import { getSitePage } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import Link from "next/link";

export const revalidate = 30;

export const metadata = {
  title: "About — Solomon B. Ibe",
  description: "Solomon B. Ibe is a Nigerian author and Interior Architect exploring belief, culture, identity, and human freedom through fiction and nonfiction.",
};

export default async function AboutPage() {
  const page = await getSitePage("about");

  const heading = page?.aboutHeading || "About Solomon B. Ibe";
  const subheading = page?.aboutSubheading || "Nigerian author, Interior Architect, and independent publisher based in Lagos.";
  const bio1 = page?.aboutBio || "";
  const bio2 = page?.aboutBio2 || "";
  const pullQuote = page?.aboutPullQuote || "I did not become a writer to be understood. I became one to make sure certain things were not lost — and certain questions were not buried in silence.";
  const influences = page?.aboutInfluences || ["Chinua Achebe", "Chimamanda Ngozi Adichie", "Wole Soyinka", "Ben Okri", "James Baldwin", "Frantz Fanon", "Toni Morrison", "Albert Camus"];
  const awards = page?.aboutAwards || [];
  const whyIWrite1 = page?.homeWhyIWrite || "I write because every society tells stories about what is possible, what is acceptable, and who we are permitted to become. Some of these stories preserve wisdom. Others preserve obedience.";
  const whyIWrite2 = page?.homeWhyIWrite2 || "My work exists at the intersection of philosophy, African cultural memory, spirituality, and the human struggle for meaning.";
  const whyIWrite3 = page?.homeWhyIWrite3 || "What becomes possible when a person dares to step beyond the boundaries they were taught to accept?";

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
              {bio1 ? (
                <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio1}</p>
              ) : (
                <p style={{ opacity: 0.5 }}>Add your biography in Studio — Edit My Pages — About Page — Biography paragraph 1.</p>
              )}
              {bio2 && <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio2}</p>}
              <div className="hero-ctas" style={{ marginTop: 24 }}>
                <Link href="/books"><button className="btn btn-primary">Browse My Books</button></Link>
                <Link href="/store"><button className="btn btn-outline">Visit Store</button></Link>
                <Link href="/contact"><button className="btn btn-ghost">Get in Touch →</button></Link>
              </div>
            </div>
          </div>

          {pullQuote && (
            <div className="pull-quote reveal" style={{ marginTop: 56 }}>{pullQuote}</div>
          )}

          <div className="reveal" style={{ marginTop: 60, background: "var(--sand)", padding: 40, borderRadius: 2 }}>
            <span className="eyebrow">Why I Write</span>
            <h2 style={{ marginTop: 14 }}>The question beneath every book</h2>
            <p style={{ fontSize: "1.08rem", opacity: 0.82, marginTop: 20 }}>{whyIWrite1}</p>
            <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite2}</p>
            <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>{whyIWrite3}</p>
          </div>

          <div className="reveal" style={{ marginTop: 60 }}>
            <span className="eyebrow">Literary Influences</span>
            <h2 style={{ marginTop: 14 }}>Writers who shaped my thinking</h2>
            <div className="influence-row" style={{ marginTop: 24 }}>
              {influences.map((name, i) => (
                <span className="influence-tag" key={i}>{name}</span>
              ))}
            </div>
          </div>

          {awards.length > 0 && (
            <div className="reveal" style={{ marginTop: 60 }}>
              <span className="eyebrow">Achievements</span>
              <h2 style={{ marginTop: 14 }}>Awards and Publications</h2>
              <ul className="award-list" style={{ marginTop: 20 }}>
                {awards.map((a, i) => (
                  <li key={i}>
                    <span>{a.title}</span>
                    <span className="yr">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="reveal" style={{ marginTop: 60, background: "var(--green-deep)", padding: 40, borderRadius: 2, color: "var(--parchment)" }}>
            <span className="eyebrow" style={{ color: "var(--gold-bright)" }}>Speaking &amp; Appearances</span>
            <h2 style={{ marginTop: 14, color: "var(--parchment)" }}>Book Solomon for your event</h2>
            <p style={{ opacity: 0.8, marginTop: 14 }}>Solomon is available for speaking engagements, panel discussions, literary festivals, and corporate events on topics including belief systems, African storytelling, independent publishing, and human freedom.</p>
            <div style={{ marginTop: 24 }}>
              <Link href="/contact"><button className="btn btn-primary">Get in Touch</button></Link>
              <Link href="/events"><button className="btn btn-outline" style={{ color: "var(--parchment)", borderColor: "var(--parchment)", marginLeft: 14 }}>View Events</button></Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
