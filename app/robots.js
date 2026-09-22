export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/checkout", "/api", "/account", "/admin"],
    },
    sitemap: "https://reflectivemindsarena.com.ng/sitemap.xml",
  };
}