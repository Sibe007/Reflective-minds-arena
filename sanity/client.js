import { createClient } from "next-sanity";

export const projectId = "ngfau3ce";
export const dataset = "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast cached reads for the live site
});
