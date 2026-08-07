import { getAboutPage } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import Link from "next/link";

export const revalidate = 30;

export default async function MyStoryPage() {
  const page = await getAboutPage();

  const bio1 = page?.bio1 || "";
  const bio2 = page?.bio2 || "";
  const pullQuote = page?.pullQuote || "";
  const influences = page?.influences || [];
  const awards = page?.awards || [];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / My Story</div>
          <h1>My Story</h1>
          <p>The journey behind the writing — where I came from, who shaped me, and what I have built.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 48, alignItems: "start" }}>
            <div className="portrait reveal">
              {page?.photo ? (
                <img src={urlFor(page.photo).width(600).url()} alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src="/author.jpg" alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              )}
            </div>
            <div className="reveal">
              <span className="eyebrow">Biography</span>
              <h2 style={{ marginTop: 14 }}>Solomon B. Ibe</h2>
              {bio1 ? (
                <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio1}</p>
              ) : (
                <p style={{ opacity: 0.5 }}>Add your biography in Studio — About Page — Biography Paragraph 1.</p>
              )}
              {bio2 && <p style={{ fontSize: "1.05rem", opacity: 0.82, lineHeight: 1.8 }}>{bio2}</p>}
            </div>
          </div>

          {pullQuote && <div className="pull-quote reveal" style={{ marginTop: 56 }}>{pullQuote}</div>}

          <div className="reveal" style={{ marginTop: 60 }}>
            <span className="eyebrow">Literary Influences</span>
            <h2 style={{ marginTop: 14 }}>Writers who shaped my thinking</h2>
            {influences.length > 0 ? (
              <div className="influence-row" style={{ marginTop: 24 }}>
                {influences.map((name, i) => <span className="influence-tag" key={i}>{name}</span>)}
              </div>
            ) : (
              <p style={{ opacity: 0.5, marginTop: 16 }}>Add your literary influences in Studio — About Page — Literary Influences.</p>
            )}
          </div>

          <div className="reveal" style={{ marginTop: 60 }}>
            <span className="eyebrow">Achievements</span>
            <h2 style={{ marginTop: 14 }}>Awards and Publications</h2>
            {awards.length > 0 ? (
              <ul className="award-list" style={{ marginTop: 20 }}>
                {awards.map((a, i) => <li key={i}><span>{a.title}</span><span className="yr">{a.year}</span></li>)}
              </ul>
            ) : (
              <p style={{ opacity: 0.5, marginTop: 16 }}>Add your awards in Studio — About Page — Awards and Publications.</p>
            )}
          </div>

          <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/books"><button className="btn btn-primary">Browse My Books</button></Link>
            <Link href="/contact"><button className="btn btn-outline">Get in Touch</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
