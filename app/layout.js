import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProvider from "../components/CartProvider";
import ScrollReveal from "../components/ScrollReveal";
import NewsletterPopup from "../components/NewsletterPopup";
import CookieConsent from "../components/CookieConsent";
import AnalyticsScripts from "../components/AnalyticsScripts";
import Script from "next/script";

export const metadata = {
  title: "Solomon B. Ibe — Author & Independent Publisher",
  description:
    "Solomon B. Ibe is a Nigerian author and independent publisher exploring humanity, culture, resilience, belief, and the power of storytelling through fiction, essays, and memoir.",
  keywords: "Solomon B. Ibe, Nigerian author, African literature, Igbo culture, philosophy, belief, fear, fiction, nonfiction, Lagos",
  openGraph: {
    title: "Solomon B. Ibe — Author & Independent Publisher",
    description: "Nigerian author exploring belief, culture, identity, and human freedom through fiction and nonfiction.",
    url: "https://reflectivemindsarena.com.ng",
    siteName: "Reflective Minds Arena",
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://reflectivemindsarena.com.ng/#person",
      name: "Solomon B. Ibe",
      url: "https://reflectivemindsarena.com.ng",
      image: "https://reflectivemindsarena.com.ng/author.jpg",
      jobTitle: ["Author", "Interior Architect"],
      sameAs: [
        "https://www.instagram.com/isob008",
        "https://x.com/hanetglobal",
        "https://www.facebook.com/share/1az2QAevjT",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://reflectivemindsarena.com.ng/#website",
      url: "https://reflectivemindsarena.com.ng",
      name: "Reflective Minds Arena",
      publisher: { "@id": "https://reflectivemindsarena.com.ng/#person" },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <ScrollReveal />
         <NewsletterPopup />
        <CookieConsent />
        <AnalyticsScripts />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}