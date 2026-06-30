import { getAllBooks } from "../../sanity/queries";
import StoreGrid from "../../components/StoreGrid";

export const revalidate = 30;

export default async function StorePage() {
  const books = await getAllBooks();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">Home / Store</div>
          <h1>Digital Store</h1>
          <p>eBooks and audiobooks — delivered instantly, available worldwide.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <StoreGrid books={books} />
        </div>
      </section>
    </>
  );
}
