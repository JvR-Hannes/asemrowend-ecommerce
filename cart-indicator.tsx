"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartIndicator() {
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="ml-4">
      Cart ({totalItems})
    </Link>
  );
}
