import { getAllBooks } from "../../sanity/queries";
import { urlFor } from "../../sanity/image";
import Link from "next/link";

export const revalidate = 30;

export const metadata = {
  title: "Store — Solomon B. Ibe",
  description: "Buy eBooks and Audiobooks by Solomon B. Ibe. Instant digital delivery worldwide.",
};

export default async function StorePage() {
  const books = await getAllBooks();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Store</div>
          <h1>Digital Store</h1>
          <p>eBooks and Audiobooks — delivered instantly to your email after purchase. Available worldwide.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div style={{
            background: "var(--green-deep)", color: "var(--parchment)",
            padding: "20px 28px", borderRadius: 2, marginBottom: 48,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 14
          }}>
            <strong style={{ fontFamily: "var(--font-ui)", fontSize: "1rem" }}>
              New here? Use code <span style={{ color: "var(--gold-bright)" }}>WELCOME10</span> for 10% off your first order.
            </strong>
            <Link href="/newsletter">
              <button className="btn btn-outline" style={{ color: "var(--parchment)", borderColor: "var(--parchment)" }}>
                Join Newsletter for Exclusive Discounts
              </button>
            </Link>
          </div>

          {books.length > 0 ? (
            <div>
              <span className="eyebrow">All Books</span>
              <h2 style={{ marginTop: 14, marginBottom: 40 }}>Choose your format</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
                {books.map((book) => (
                  <div key={book._id} style={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr",
                    gap: 48,
                    alignItems: "start",
                    paddingBottom: 56,
                    borderBottom: "1px solid var(--line)"
                  }}>
                    <div className="book-cover" style={{ aspectRatio: "2/3" }}>
                      {book.coverImage ? (
                        <img
                          src={urlFor(book.coverImage).width(400).url()}
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

                    <div>
                      <span className="eyebrow">{book.category}</span>
                      <h2 style={{ marginTop: 10 }}>{book.title}</h2>
                      {book.subtitle && (
                        <h3 style={{ opacity: 0.6, fontWeight: 400, fontStyle: "italic", marginTop: -6 }}>
                          {book.subtitle}
                        </h3>
                      )}
                      <p style={{ opacity: 0.78, marginTop: 16, fontSize: "1.02rem" }}>{book.blurb}</p>

                      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>

                        <div style={{
                          border: "1px solid var(--line)", borderRadius: 2,
                          padding: "20px 24px", display: "flex",
                          justifyContent: "space-between", alignItems: "center",
                          flexWrap: "wrap", gap: 14, background: "var(--sand)"
                        }}>
                          <div>
                            <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "1rem" }}>
                              eBook
                            </div>
                            <div style={{ fontFamily: "var(--font-ui)", fontSize: ".82rem", opacity: 0.6, marginTop: 4 }}>
                              PDF format · Instant delivery to your email
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
                              {book.oldPrice && (
                                <del style={{ opacity: 0.4, fontSize: "1rem", marginRight: 8 }}>
                                  ${book.oldPrice.toFixed(2)}
                                </del>
                              )}
                              ${book.price.toFixed(2)}
                            </div>
                            
                              href={book.selarEbookUrl || "https://selar.co"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                            >
                              Buy eBook
                            </a>
                          </div>
                        </div>

                        <div style={{
                          border: "1px solid var(--line)", borderRadius: 2,
                          padding: "20px 24px", display: "flex",
                          justifyContent: "space-between", alignItems: "center",
                          flexWrap: "wrap", gap: 14
                        }}>
                          <div>
                            <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: "1rem" }}>
                              Audiobook
                            </div>
                            <div style={{ fontFamily: "var(--font-ui)", fontSize: ".82rem", opacity: 0.6, marginTop: 4 }}>
                              MP3 format · Instant delivery to your email
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
                              ${book.price ? (book.price + 5).toFixed(2) : "N/A"}
                            </div>
                            
                              href={book.selarAudioUrl || "https://selar.co"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-dark"
                            >
                              Buy Audiobook
                            </a>
                          </div>
                        </div>

                      </div>

                      <div style={{ marginTop: 18 }}>
                        <Link href={`/books/${book.slug}`}>
                          <button className="btn btn-ghost">Read sample chapter</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products yet</h3>
              <p>Add your books in the <Link href="/studio">Content Studio</Link> to display them here.</p>
            </div>
          )}

          <div style={{ marginTop: 70, background: "var(--sand)", padding: 40, borderRadius: 2 }}>
            <span className="eyebrow">How it works</span>
            <h2 style={{ marginTop: 14, marginBottom: 32 }}>Simple, instant, secure</h2>
            <div className="grid-3">
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>1.</div>
                <h3>Choose your format</h3>
                <p style={{ opacity: 0.7 }}>Select eBook or Audiobook and click Buy.</p>
              </div>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>2.</div>
                <h3>Pay securely</h3>
                <p style={{ opacity: 0.7 }}>Pay with card, bank transfer, or USSD via Selar.</p>
              </div>
              <div>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>3.</div>
                <h3>Download instantly</h3>
                <p style={{ opacity: 0.7 }}>Your download link arrives in your email immediately after payment.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}