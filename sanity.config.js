import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/client";

export default defineConfig({
  name: "default",
  title: "Solomon B. Ibe — Content Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
