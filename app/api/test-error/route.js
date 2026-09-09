export async function GET() {
  throw new Error("Test error to verify Sentry source maps — safe to trigger, will be deleted after");
}