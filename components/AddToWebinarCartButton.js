"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToWebinarCartButton({ webinar }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleClick() {
    addItem({
      slug: webinar.slug,
      title: webinar.title,
      price: webinar.price,
      format: "webinar",
    });

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "AddToCart", {
        content_name: webinar.title,
        content_type: "product",
        currency: "USD",
        value: webinar.price,
      });
      window.gtag && window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: webinar.price,
        items: [{ item_name: webinar.title, price: webinar.price }],
      });
    }

    router.push("/checkout");
  }

  return (
    <button className="btn btn-dark btn-sm btn-block" onClick={handleClick}>
      Register — ${webinar.price.toFixed(2)}
    </button>
  );
}
