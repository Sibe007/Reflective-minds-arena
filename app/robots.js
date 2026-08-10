export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/checkout", "/api"],
    },
    sitemap: "https://reflectivemindsarena.com.ng/sitemap.xml",
  };
}