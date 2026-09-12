import { PortableText } from "@portabletext/react";
import { getPostBySlug, getRelatedPosts } from "../../../sanity/queries";
import { urlFor } from "../../../sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const imageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined;

  return {
    title: `${post.title} — Solomon B. Ibe`,
    description: post.excerpt || "An essay by Solomon B. Ibe.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "An essay by Solomon B. Ibe.",
      url: `https://reflectivemindsarena.com.ng/blog/${post.slug}`,
      type: "article",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
}
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const relatedPosts = await getRelatedPosts(slug, post.category);

  const imageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).url() : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.excerpt && { description: post.excerpt }),
    ...(imageUrl && { image: imageUrl }),
    author: { "@type": "Person", name: "Solomon B. Ibe" },
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    mainEntityOfPage: `https://reflectivemindsarena.com.ng/blog/${post.slug}`,
  };

  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <div className="breadcrumb">Home / Blog / {post.category}</div>
        <span className="eyebrow">{post.category}</span>
        <h1 style={{ marginTop: 14 }}>{post.title}</h1>
        <div className="post-meta" style={{ fontSize: ".84rem", marginBottom: 30 }}>
          <span>By Solomon B. Ibe</span>
          {post.readTime && (
            <>
              <span>·</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
                {post.coverImage ? (
          <div className="post-hero-img" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <Image
              src={urlFor(post.coverImage).width(1200).url()}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 900px"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="post-hero-img">
            <span>{post.category}</span>
          </div>
        )}
                <div className="post-content">
          {post.body ? (
            <PortableText value={post.body} />
          ) : (
            <p style={{ opacity: 0.6 }}>{post.excerpt}</p>
          )}
        </div>

        {relatedPosts && relatedPosts.length > 0 && (
          <div style={{ marginTop: 70 }}>
            <span className="eyebrow">From the Journal</span>
            <h2 style={{ marginTop: 14, marginBottom: 32 }}>More Essays</h2>
            <div className="grid-3">
              {relatedPosts.map((p) => (
                <Link href={`/blog/${p.slug}`} key={p._id}>
                  <article className="post-card">
                    <div className="post-thumb" style={{ position: "relative", overflow: "hidden" }}>
                      {p.coverImage ? (
                        <Image
                          src={urlFor(p.coverImage).width(500).url()}
                          alt={p.title}
                          fill
                          sizes="(max-width: 900px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span>{p.category}</span>
                      )}
                    </div>
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
        )}
      </div>
    </section>
  );
}