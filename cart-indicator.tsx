"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartIndicator() {
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="font-bold hover:opacity-80"
      style={{ color: "#088e9f" }}
    >
      Cart ({totalItems})
    </Link>
  );
}
