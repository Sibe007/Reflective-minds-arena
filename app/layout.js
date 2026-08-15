import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProvider from "../components/CartProvider";
import ScrollReveal from "../components/ScrollReveal";
import NewsletterPopup from "../components/NewsletterPopup";
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HMX7W3538K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HMX7W3538K');
          `}
        </Script>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1680637696362510');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1680637696362510&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6a7983c3f2dd231d4b7462f2/1jvlaldhq';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}