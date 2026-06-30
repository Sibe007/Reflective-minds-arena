import { PortableText } from "@portabletext/react";
import { getBookBySlug } from "../../../sanity/queries";
import { urlFor } from "../../../sanity/image";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";

export const revalidate = 30;

export default async function BookPage({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return notFound();

  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="breadcrumb">Home / Books / {book.title}</div>
        <div className="book-detail">
          <div>
            <div className="book-cover" style={{ aspectRatio: "2/3" }}>
              {book.coverImage ? (
                <img
                  src={urlFor(book.coverImage).width(500).url()}
                  alt={book.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div>
                  <div className="title">{book.title}</div>
                  <div className="sub">{book.subtitle}</div>
                </div>
              )}
            </div>
            <div className="fb-actions" style={{ marginTop: 24, flexDirection: "column" }}>
              <AddToCartButton book={book} />
            </div>
          </div>
          <div>
            <span className="eyebrow">{book.category}</span>
            <h1 style={{ fontSize: "2.2rem", marginTop: 14 }}>{book.title}</h1>
            {book.subtitle && (
              <h3 style={{ opacity: 0.6, fontWeight: 400, fontStyle: "italic", marginTop: -8 }}>
                {book.subtitle}
              </h3>
            )}
            <div className="fb-price">
              {book.oldPrice && <del>${book.oldPrice.toFixed(2)}</del>} ${book.price.toFixed(2)}
            </div>
            <p style={{ fontSize: "1.05rem", opacity: 0.8 }}>{book.blurb}</p>

            {book.longDescription && (
              <div style={{ marginTop: 20 }}>
                <h3>Description</h3>
                <PortableText value={book.longDescription} />
              </div>
            )}

            {book.sampleChapter && (
              <div style={{ marginTop: 30 }}>
                <h3>Sample Chapter</h3>
                <div
                  style={{
                    whiteSpace: "pre-line",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    background: "var(--sand)",
                    padding: 24,
                    borderRadius: 2,
                  }}
                >
                  {book.sampleChapter}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}