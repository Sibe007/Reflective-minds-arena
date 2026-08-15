import { PortableText } from "@portabletext/react";
import { getPostBySlug } from "../../../sanity/queries";
import { urlFor } from "../../../sanity/image";
import { notFound } from "next/navigation";

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
          <div className="post-hero-img" style={{ padding: 0, overflow: "hidden" }}>
            <img
              src={urlFor(post.coverImage).width(1200).url()}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      </div>
    </section>
  );
}