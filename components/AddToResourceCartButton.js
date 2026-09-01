"use client";

import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToResourceCartButton({ resource }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleClick() {
    addItem({
      slug: resource.slug,
      title: resource.title,
      price: resource.price,
      format: "resource",
    });

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "AddToCart", {
        content_name: resource.title,
        content_type: "product",
        currency: "USD",
        value: resource.price,
      });
      window.gtag && window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: resource.price,
        items: [{ item_name: resource.title, price: resource.price }],
      });
    }

    router.push("/checkout");
  }

  return (
    <button className="btn btn-dark btn-sm btn-block" onClick={handleClick}>
      Buy Now — ${resource.price.toFixed(2)}
    </button>
  );
}
