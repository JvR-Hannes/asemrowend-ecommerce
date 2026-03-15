"use client";

import { useCart } from "@/context/cart-context";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Product } from "@/lib/products"; // your domain type

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
      onClick={() => addToCart(cartProduct)}
      className="
        mt-6
        rounded
        px-4
        py-2
        bg-[var(--brand-accent)]
        text-white
        text-lg
        font-bold
        cursor-pointer
        hover:bg-[var(--brand-primary)]
        transition
      "
    >
      Add to cart
    </button>
  );
}
