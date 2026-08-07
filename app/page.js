import Link from "next/link";
import { getAllPosts, getSitePage } from "../sanity/queries";
import { urlFor } from "../sanity/image";

export const revalidate = 30;

export default async function HomePage() {
  const [posts, page] = await Promise.all([getAllPosts(), getSitePage("home-page")]);
  const latestPosts = posts.slice(0, 3);

  const eyebrow = page?.homeEyebrow || "Nigerian Author | Exploring Belief, Culture, Identity, and Human Freedom";
  const heading = page?.homeHeading || "The Stories We Inherit. The Truths We Choose.";
  const subheading = page?.homeSubheading || "Through fiction and nonfiction, I explore the forces that shape human lives: belief, fear, culture, memory, suffering, resilience, and the courage required to think for oneself.";
  const intro = page?.homeIntro || "I am Solomon B. Ibe, a Nigerian author and Interior Architect based in Lagos, Nigeria.";
  const quote = page?.homeQuote || "The most powerful prisons are rarely built with walls. They are built with beliefs we never realize we were taught to protect.";

  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <span className="eyebrow hero-eyebrow">{eyebrow}</span>
            <h1>
              {heading.includes(".") ? (
                <>{heading.split(".")[0]}.<br /><em>{heading.split(".").slice(1).join(".").trim()}</em></>
              ) : (<em>{heading}</em>)}
            </h1>
            <p className="hero-sub">{subheading}</p>
            <p style={{ color: "rgba(245,237,225,.72)", fontSize: "1rem", maxWidth: "54ch", marginBottom: 32 }}>{intro}</p>
            <div className="hero-ctas">
              <Link href="/books"><button className="btn btn-primary">Explore My Books</button></Link>
              <Link href="/store"><button className="btn btn-outline" style={{ color: "var(--parchment)" }}>Visit Store</button></Link>
              <Link href="/about"><button className="btn btn-ghost" style={{ color: "var(--gold-bright)" }}>About the Author →</button></Link>
            </div>
          </div>
          <div className="hero-figure">
            {page?.homeAuthorPhoto ? (
              <img src={urlFor(page.homeAuthorPhoto).width(800).url()} alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            ) : (
              <img src="/author.jpg" alt="Solomon B. Ibe" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            )}
            <div className="cap">Solomon B. Ibe — Lagos, Nigeria</div>
          </div>
        </div>
        <div className="container">
          <div className="hero-stats">
            <div><strong>3</strong><span>Published Books</span></div>
            <div><strong>Fiction &amp; Nonfiction</strong><span>Genres</span></div>
            <div><strong>Lagos, Nigeria</strong><span>Based in</span></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--green-deep)", padding: "70px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)", color: "var(--parchment)", lineHeight: 1.5, margin: "0 0 20px" }}>"{quote}"</p>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: ".82rem", color: "var(--gold-bright)", letterSpacing: ".06em" }}>— Solomon B. Ibe</span>
          <div style={{ marginTop: 24 }}>
            <Link href="/about"><button className="btn btn-outline" style={{ color: "var(--parchment)" }}>Meet the Author</button></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow">From the Journal</span><h2 style={{ marginTop: 14 }}>Latest essays &amp; reflections</h2></div>
            <Link href="/blog"><button className="btn btn-ghost">View all posts →</button></Link>
          </div>
          <div className="grid-3">
            {latestPosts.length === 0 && <p style={{ opacity: 0.6 }}>No posts yet — add your first one in the <Link href="/studio">Content Studio</Link>.</p>}
            {latestPosts.map((p) => (
              <Link href={"/blog/" + p.slug} key={p._id}>
                <article className="post-card">
                  <div className="post-thumb"><span>{p.category}</span></div>
                  <div className="post-body">
                    <div className="post-cat">{p.category}</div>
                    <h3>{p.title}</h3>
                    <p className="post-excerpt">{p.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section newsletter">
        <div className="container nl-box">
          <span className="eyebrow">Join the Conversation</span>
          <h2 style={{ marginTop: 14 }}>Essays, reflections, and explorations of belief, culture, identity, and human freedom.</h2>
          <p style={{ opacity: 0.7 }}>One letter a month. No spam, ever.</p>
          <form className="nl-form" action="#" method="post">
            <input type="email" name="email" placeholder="Your email address" required />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
