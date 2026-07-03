import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/client";

export default defineConfig({
  name: "default",
  title: "✏️ Solomon B. Ibe — Website Editor",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("What would you like to edit?")
          .items([
            S.listItem()
              .title("📄 Edit My Pages")
              .child(
                S.list()
                  .title("Choose a page to edit")
                  .items([
                    S.listItem()
                      .title("🏠 Home Page")
                      .child(
                        S.document()
                          .schemaType("sitePage")
                          .documentId("home-page")
                          .title("🏠 Edit Home Page")
                      ),
                    S.listItem()
                      .title("👤 About Page")
                      .child(
                        S.document()
                          .schemaType("sitePage")
                          .documentId("about-page")
                          .title("👤 Edit About Page")
                      ),
                    S.listItem()
                      .title("📬 Contact Page")
                      .child(
                        S.document()
                          .schemaType("sitePage")
                          .documentId("contact-page")
                          .title("📬 Edit Contact Page")
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("📝 Blog Posts")
              .child(
                S.list()
                  .title("Blog Posts")
                  .items([
                    S.listItem()
                      .title("➕ Write a New Blog Post")
                      .child(
                        S.document()
                          .schemaType("post")
                          .title("New Blog Post")
                      ),
                    S.listItem()
                      .title("📋 View & Edit All Posts")
                      .child(
                        S.documentTypeList("post")
                          .title("All Blog Posts")
                          .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("📚 Books")
              .child(
                S.list()
                  .title("Books")
                  .items([
                    S.listItem()
                      .title("➕ Add a New Book")
                      .child(
                        S.document()
                          .schemaType("book")
                          .title("New Book")
                      ),
                    S.listItem()
                      .title("📋 View & Edit All Books")
                      .child(
                        S.documentTypeList("book")
                          .title("All Books")
                      ),
                  ])
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});