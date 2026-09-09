import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: "reflective-minds-arena",
  project: "javascript-nextjs",
  silent: true,
});