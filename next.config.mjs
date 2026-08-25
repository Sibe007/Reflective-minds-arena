import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: "reflective-minds-arena",
  project: "javascript-nextjs",
  silent: true,
});