import { client } from "./client";

export async function getAllPosts() {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc){ _id, title, "slug": slug.current, category, tags, excerpt, coverImage, publishedAt, readTime, featured }`);
}

export async function getPostBySlug(slug) {
  return client.fetch(`*[_type == "post" && slug.current == $slug][0]{ _id, title, "slug": slug.current, category, tags, excerpt, coverImage, publishedAt, readTime, featured, body }`, { slug });
}

export async function getAllBooks() {
  return client.fetch(`*[_type == "book"] | order(featured desc){ _id, title, "slug": slug.current, subtitle, coverImage, blurb, price, oldPrice, paperbackPrice, weightKg, format, category, featured, stripePriceId, selarEbookUrl, selarAudioUrl }`);
}

export async function getBookBySlug(slug) {
  return client.fetch(`*[_type == "book" && slug.current == $slug][0]{ _id, title, "slug": slug.current, subtitle, coverImage, blurb, longDescription, sampleChapter, price, oldPrice, paperbackPrice, weightKg, format, category, featured, stripePriceId, selarEbookUrl, selarAudioUrl }`, { slug });
}

export async function getBookWeightsBySlugs(slugs) {
  return client.fetch(`*[_type == "book" && slug.current in $slugs]{ "slug": slug.current, weightKg }`, { slugs });
}

export async function getHomePage() {
  return client.fetch(`*[_type == "homePage" && _id == "home-page"][0]`);
}

export async function getShippingSettings() {
  return client.fetch(`*[_type == "shippingSettings" && _id == "shipping-settings"][0]{ nigeriaPerKgNaira, internationalPerKgUsd }`);
}
export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage" && _id == "about-page"][0]`);
}

export async function getMyStoryPage() {
  return client.fetch(`*[_type == "myStoryPage" && _id == "my-story-page"][0]`);
}

export async function getContactPage() {
  return client.fetch(`*[_type == "contactPage" && _id == "contact-page"][0]`);
}
export async function getArchitecturePage() {
  return client.fetch(`*[_type == "architecturePage" && _id == "architecture-page"][0]`);
}
export async function getAllProjects() {
  return client.fetch(`*[_type == "project"] | order(coalesce(order, 9999) asc, _createdAt desc){ _id, title, category, coverImage, moreImages, description, featured }`);
}

export async function getTestimonials(category) {
  if (category) {
    return client.fetch(
      `*[_type == "testimonial" && category == $category] | order(coalesce(order, 9999) asc, _createdAt desc){ _id, name, role, quote, photo, category, rating, featured }`,
      { category }
    );
  }
  return client.fetch(
    `*[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt desc){ _id, name, role, quote, photo, category, rating, featured }`
  );
}

export async function getAllResources() {
  return client.fetch(`*[_type == "resource" && featured == true] | order(_createdAt asc){
    _id,
    title,
    "slug": slug.current,
    type,
    description,
    price,
    buyUrl,
    coverImage,
    "freeFileUrl": freeFile.asset->url,
    "hasDigitalFile": defined(digitalFile.asset)
  }`);
}
