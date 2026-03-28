"use client";

import { useCart } from "@/context/cart-context";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Product } from "@/lib/products";

export default function AddToCartButton({
  product,
}: {
  product: PrismaProduct;
}) {
  const { addToCart } = useCart();

  const cartProduct: Product = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    priceCents: product.priceCents,
    currency: "ZAR",
    description: product.description,
    active: product.active,
    stock: product.stock,
  };

  return (
    <button
      onClick={() => {
        addToCart(cartProduct);

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "add_to_cart", {
            currency: "ZAR",
            value: product.priceCents / 100,
            items: [
              {
                item_id: product.id,
                item_name: product.name,
              },
            ],
          });
        }
      }}
      className="gradient-button mt-8 rounded-full px-6 py-3 text-base font-semibold text-white transition sm:text-lg"
    >
      Add to cart
    </button>
  );
}
