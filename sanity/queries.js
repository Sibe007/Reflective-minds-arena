import { client } from "./client";

export async function getAllPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc){ _id, title, "slug": slug.current, category, tags, excerpt, coverImage, publishedAt, readTime, featured }`);
}

export async function getPostBySlug(slug) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]{ _id, title, "slug": slug.current, category, tags, excerpt, coverImage, publishedAt, readTime, featured, body }`, { slug });
}

export async function getAllBooks() {
  return client.fetch(`*[_type == "book"] | order(featured desc){ _id, title, "slug": slug.current, subtitle, coverImage, blurb, price, oldPrice, format, category, featured, stripePriceId, selarEbookUrl, selarAudioUrl }`);
}

export async function getBookBySlug(slug) {
  return client.fetch(`*[_type == "book" && slug.current == $slug][0]{ _id, title, "slug": slug.current, subtitle, coverImage, blurb, longDescription, sampleChapter, price, oldPrice, format, category, featured, stripePriceId, selarEbookUrl, selarAudioUrl }`, { slug });
}

export async function getHomePage() {
  return client.fetch(`*[_type == "homePage" && _id == "home-page"][0]`);
}

export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage" && _id == "about-page"][0]`);
}

export async function getContactPage() {
  return client.fetch(`*[_type == "contactPage" && _id == "contact-page"][0]`);
}
