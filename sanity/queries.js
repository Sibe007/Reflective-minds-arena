import { client } from "./client";

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc){
      _id, title, "slug": slug.current, category, tags, excerpt,
      coverImage, publishedAt, readTime, featured
    }`
  );
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, category, tags, excerpt,
      coverImage, publishedAt, readTime, featured, body
    }`,
    { slug }
  );
}

export async function getAllBooks() {
  return client.fetch(
    `*[_type == "book"] | order(featured desc){
      _id, title, "slug": slug.current, subtitle, coverImage, blurb,
      price, oldPrice, format, category, featured, stripePriceId
    }`
  );
}

export async function getBookBySlug(slug) {
  return client.fetch(
    `*[_type == "book" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, subtitle, coverImage, blurb,
      longDescription, sampleChapter, price, oldPrice, format, category,
      featured, stripePriceId
    }`,
    { slug }
  );
}
export async function getSitePage(pageId) {
  return client.fetch(
    `*[_type == "sitePage" && pageId == $pageId][0]`,
    { pageId }
  );
}