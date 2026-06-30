import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProvider from "../components/CartProvider";

export const metadata = {
  title: "Solomon B. Ibe — Author & Independent Publisher",
  description:
    "Solomon B. Ibe is a Nigerian author and independent publisher exploring humanity, culture, resilience, belief, and the power of storytelling through fiction, essays, and memoir.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
