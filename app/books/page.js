import Link from "next/link";
import { getAllBooks } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";

export const revalidate = 30;

export default async function BooksPage() {
  const books = await getAllBooks();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Books</div>
          <h1>The Books</h1>
          <p>Fiction, essays, and memoir — each one built around a single, stubborn question.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {books.length === 0 ? (
            <div className="empty-state">
              No books published yet. Add one in the{" "}
              <Link href="/studio">Content Studio</Link>.
            </div>
          ) : (
            <div className="grid-3">
              {books.map((b) => (
                <div className="product-card" key={b._id}>
                  <Link href={`/books/${b.slug}`}>
                    <div className="book-cover" style={{ aspectRatio: "2/3", padding: 20 }}>
                      {b.coverImage ? (
                        <img
                          src={urlFor(b.coverImage).width(400).url()}
                          alt={b.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div>
                          <div className="title">{b.title}</div>
                          <div className="sub">{b.subtitle}</div>
                        </div>
                      )}
                    </div>
                  </Link>
                  <h3 style={{ marginTop: 14 }}>{b.title}</h3>
                  <div className="product-price">
                    {b.oldPrice && <del>${b.oldPrice.toFixed(2)}</del>} ${b.price.toFixed(2)}
                  </div>
                  <Link href={`/books/${b.slug}`}>
                    <button className="btn btn-outline btn-sm btn-block">View book</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
