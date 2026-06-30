import Link from "next/link";
import { getAllPosts } from "../../sanity/queries";

export const revalidate = 30;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Blog</div>
          <h1>The Journal</h1>
          <p>Essays, reflections, and excerpts on African literature, Igbo culture, belief, and the craft of storytelling.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="empty-state">
              No posts published yet. Add one in the{" "}
              <Link href="/studio">Content Studio</Link>.
            </div>
          ) : (
            <div className="grid-3">
              {posts.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id}>
                  <article className="post-card">
                    <div className="post-thumb"><span>{p.category}</span></div>
                    <div className="post-body">
                      <div className="post-cat">{p.category}</div>
                      <h3>{p.title}</h3>
                      <p className="post-excerpt">{p.excerpt}</p>
                      <div className="post-meta">
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
