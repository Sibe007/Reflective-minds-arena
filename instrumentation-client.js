import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://b392e9fb0d8bb7d774d57cadce3a19a1@o4511970805678080.ingest.us.sentry.io/4511970813149184",
  sendDefaultPii: true,
  tracesSampleRate: 0.2,
});