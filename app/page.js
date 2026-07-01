import Link from "next/link";
import { getAllPosts, getAllBooks } from "../sanity/queries";
import { urlFor } from "../sanity/image";

export const revalidate = 30;

export default async function HomePage() {
  const [posts, books] = await Promise.all([getAllPosts(), getAllBooks()]);
  const featuredBook = books.find((b) => b.featured) || books[0];
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div>
            <span className="eyebrow hero-eyebrow">
              Nigerian Author | Exploring Belief, Culture, Identity, and Human Freedom
            </span>
            <h1>
              The Stories We Inherit.<br />
              <em>The Truths We Choose.</em>
            </h1>
            <p className="hero-sub">
              Through fiction and nonfiction, I explore the forces that shape human lives:
              belief, fear, culture, memory, suffering, resilience, and the courage
              required to think for oneself.
            </p>
            <p style={{ color: "rgba(245,237,225,.72)", fontSize: "1rem", maxWidth: "54ch", marginBottom: 32 }}>
              I am Solomon B. Ibe, a Nigerian writer whose work draws deeply from Igbo culture,
              African oral storytelling traditions, philosophy, and the enduring questions of
              human existence. My writing examines how individuals and societies construct meaning,
              maintain authority, endure suffering, and pursue transformation.
            </p>
            <div className="hero-ctas">
              <Link href="/books">
                <button className="btn btn-primary">Explore My Books</button>
              </Link>
              <Link href="/about">
                <button className="btn btn-outline" style={{ color: "var(--parchment)" }}>
                  About the Author
                </button>
              </Link>
            </div>
          </div>
          <div className="hero-figure">
            <div style={{
              width: "100%", height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", color: "rgba(217,162,78,.4)",
              fontSize: ".85rem", letterSpacing: ".06em"
            }}>
              Author Portrait
            </div>
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

      {/* ===== PULL QUOTE ===== */}
      <section style={{ background: "var(--green-deep)", padding: "70px 0" }}>
        <div className="container" style={{ maxWidth: 760, textAlign: "center" }}>
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic",
            fontSize: "clamp(1.3rem, 2.4vw, 1.85rem)", color: "var(--parchment)",
            lineHeight: 1.5, margin: "0 0 20px"
          }}>
            "The most powerful prisons are rarely built with walls. They are built
            with beliefs we never realize we were taught to protect."
          </p>
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: ".82rem",
            color: "var(--gold-bright)", letterSpacing: ".06em"
          }}>
            — Solomon B. Ibe
          </span>
        </div>
      </section>

      {/* ===== FEATURED BOOKS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Featured Books</span>
              <h2 style={{ marginTop: 14 }}>Three books. One question asked many ways.</h2>
            </div>
            <Link href="/books">
              <button className="btn btn-ghost">View all books →</button>
            </Link>
          </div>
          <div className="grid-3">
            <div className="post-card">
              <div className="post-thumb" style={{ background: "linear-gradient(135deg, #274233, #0F1A14)" }}>
                <span>Nonfiction</span>
              </div>
              <div className="post-body">
                <div className="post-cat">Philosophy &amp; Society</div>
                <h3>The Architecture of Belief</h3>
                <p className="post-excerpt">
                  How Societies Build the Minds Inside Them — and What It Costs to Think for Yourself.
                  An examination of how belief is constructed, authority maintained, and obedience quietly moralized.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  <Link href="/books/the-architecture-of-belief">
                    <button className="btn btn-ghost" style={{ padding: "8px 0" }}>Learn More →</button>
                  </Link>
                  <Link href="/store">
                    <button className="btn btn-dark btn-sm">Buy the Book</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="post-card">
              <div className="post-thumb" style={{ background: "linear-gradient(135deg, #3D1F1F, #1A0F0F)" }}>
                <span>Nonfiction</span>
              </div>
              <div className="post-body">
                <div className="post-cat">Psychology &amp; Philosophy</div>
                <h3>No Enemy but Fear</h3>
                <p className="post-excerpt">
                  Fear is rarely the enemy we believe it to be. This work explores the psychological,
                  cultural, and existential dimensions of fear — and the cost of letting it define
                  the boundaries of human possibility.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  <Link href="/books/no-enemy-but-fear">
                    <button className="btn btn-ghost" style={{ padding: "8px 0" }}>Learn More →</button>
                  </Link>
                  <Link href="/store">
                    <button className="btn btn-dark btn-sm">Buy the Book</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="post-card">
              <div className="post-thumb" style={{ background: "linear-gradient(135deg, #1A2E22, #274233)" }}>
                <span>Fiction</span>
              </div>
              <div className="post-body">
                <div className="post-cat">Literary Fiction</div>
                <h3>The Evolution of Man</h3>
                <p className="post-excerpt">
                  In a southeastern Nigerian forest, two broken souls discover that suffering does not
                  always end a life — sometimes, it transforms one. A novel about loss, healing,
                  resilience, and the redemptive power of human connection.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                  <Link href="/books/the-evolution-of-man">
                    <button className="btn btn-ghost" style={{ padding: "8px 0" }}>Learn More →</button>
                  </Link>
                  <Link href="/store">
                    <button className="btn btn-dark btn-sm">Buy the Book</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AUTHOR STATEMENT ===== */}
      <section className="section" style={{ background: "var(--sand)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="eyebrow">Why I Write</span>
          <h2 style={{ marginTop: 14 }}>The question beneath every book</h2>
          <p style={{ fontSize: "1.08rem", opacity: 0.82, marginTop: 20 }}>
            I write because every society tells stories about what is possible, what is acceptable,
            and who we are permitted to become. Some of these stories preserve wisdom. Others preserve obedience.
          </p>
          <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>
            My work exists at the intersection of philosophy, African cultural memory, spirituality,
            and the human struggle for meaning. I am interested not merely in telling stories, but in
            examining the structures beneath them: the beliefs we inherit, the fears we normalize,
            and the truths we discover only when we begin to question.
          </p>
          <p style={{ fontSize: "1.08rem", opacity: 0.82 }}>
            What becomes possible when a person dares to step beyond the boundaries they were taught to accept?
          </p>
          <Link href="/about">
            <button className="btn btn-dark" style={{ marginTop: 10 }}>More About the Author</button>
          </Link>
        </div>
      </section>

      {/* ===== LATEST BLOG POSTS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">From the Journal</span>
              <h2 style={{ marginTop: 14 }}>Latest essays &amp; reflections</h2>
            </div>
            <Link href="/blog">
              <button className="btn btn-ghost">View all posts →</button>
            </Link>
          </div>
          <div className="grid-3">
            {latestPosts.length === 0 && (
              <p style={{ opacity: 0.6 }}>
                No posts yet — add your first one in the{" "}
                <Link href="/studio">Content Studio</Link>.
              </p>
            )}
            {latestPosts.map((p) => (
              <Link href={`/blog/${p.slug}`} key={p._id}>
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

      {/* ===== NEWSLETTER ===== */}
      <section className="section newsletter">
        <div className="container nl-box">
          <span className="eyebrow">Join the Conversation</span>
          <h2 style={{ marginTop: 14 }}>
            Essays, reflections, and explorations of belief, culture, identity, and human freedom.
          </h2>
          <p style={{ opacity: 0.7 }}>
            Receive updates on new books, new essays, and ideas worth thinking about. One letter a month.
          </p>
          <form className="nl-form" action="#" method="post">
            <input type="email" name="email" placeholder="Your email address" required />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}