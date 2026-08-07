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
              .title("🏠 Home Page")
              .child(S.document().schemaType("homePage").documentId("home-page").title("🏠 Home Page")),
            S.listItem()
              .title("👤 About Page")
              .child(S.document().schemaType("aboutPage").documentId("about-page").title("👤 About Page")),
            S.listItem()
              .title("📖 My Story")
              .child(S.document().schemaType("myStoryPage").documentId("my-story-page").title("📖 My Story")),
            S.listItem()
              .title("📬 Contact Page")
              .child(S.document().schemaType("contactPage").documentId("contact-page").title("📬 Contact Page")),
            S.divider(),
            S.listItem()
              .title("📝 Blog Posts")
              .child(
                S.list().title("Blog Posts").items([
                  S.listItem().title("➕ Write a New Post").child(S.document().schemaType("post").title("New Post")),
                  S.listItem().title("📋 All Posts").child(S.documentTypeList("post").title("All Posts").defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
                ])
              ),
            S.divider(),
            S.listItem()
              .title("📚 Books")
              .child(
                S.list().title("Books").items([
                  S.listItem().title("➕ Add a New Book").child(S.document().schemaType("book").title("New Book")),
                  S.listItem().title("📋 All Books").child(S.documentTypeList("book").title("All Books")),
                ])
              ),
            S.divider(),
            S.listItem()
              .title("📦 Resources")
              .child(
                S.list().title("Resources").items([
                  S.listItem().title("➕ Add a New Resource").child(S.document().schemaType("resource").title("New Resource")),
                  S.listItem().title("📋 All Resources").child(S.documentTypeList("resource").title("All Resources")),
                ])
              ),
            S.divider(),
            S.listItem()
              .title("📅 Events")
              .child(
                S.list().title("Events").items([
                  S.listItem().title("➕ Add a New Event").child(S.document().schemaType("event").title("New Event")),
                  S.listItem().title("📋 All Events").child(S.documentTypeList("event").title("All Events")),
                ])
              ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
