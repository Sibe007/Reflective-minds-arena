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
      <section className="hero">
        <div className="container">
          <div>
            <span className="eyebrow hero-eyebrow">Independent Nigerian Author &amp; Publisher</span>
            <h1>Stories that carry <em>memory</em>, not just narrative.</h1>
            <p className="hero-sub">
              I write fiction, essays, and memoir rooted in Igbo culture and the long
              tradition of storytelling as inheritance.
            </p>
            <div className="hero-ctas">
              <Link href="/store"><button className="btn btn-primary">Buy My Books</button></Link>
              <Link href="/blog"><button className="btn btn-outline" style={{ color: "var(--parchment)" }}>Read the Blog</button></Link>
              <Link href="/about"><button className="btn btn-ghost" style={{ color: "var(--gold-bright)" }}>About the Author →</button></Link>
            </div>
          </div>
          <div className="hero-figure">
            <div className="cap">Solomon B. Ibe — Lagos, Nigeria</div>
          </div>
        </div>
      </section>

      {featuredBook && (
        <section className="section featured-book">
          <div className="container fb-grid">
            <div className="fb-cover">
              <div className="book-cover">
                {featuredBook.coverImage ? (
                  <img
                    src={urlFor(featuredBook.coverImage).width(500).url()}
                    alt={featuredBook.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div>
                    <div className="title">{featuredBook.title}</div>
                    <div className="sub">{featuredBook.subtitle}</div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <span className="eyebrow">Featured Book</span>
              <h2 style={{ marginTop: 14 }}>{featuredBook.title}</h2>
              <p style={{ opacity: 0.75 }}>{featuredBook.blurb}</p>
              <div className="fb-price">
                {featuredBook.oldPrice && <del>${featuredBook.oldPrice.toFixed(2)}</del>}{" "}
                ${featuredBook.price.toFixed(2)}
              </div>
              <div className="fb-actions">
                <Link href={`/books/${featuredBook.slug}`}>
                  <button className="btn btn-primary">View Book</button>
                </Link>
                <Link href="/store">
                  <button className="btn btn-outline">Visit Store</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">From the Journal</span>
              <h2 style={{ marginTop: 14 }}>Latest from the blog</h2>
            </div>
            <Link href="/blog"><button className="btn btn-ghost">View all posts →</button></Link>
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

      <section className="section newsletter">
        <div className="container nl-box">
          <span className="eyebrow">Join the Newsletter</span>
          <h2 style={{ marginTop: 14 }}>Stories, essays, and early access — straight to your inbox.</h2>
          <form className="nl-form" action="#" method="post">
            <input type="email" name="email" placeholder="Your email address" required />
            <button className="btn btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
