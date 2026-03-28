"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartIndicator() {
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="rounded-full bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(236,72,153,0.14))] px-4 py-2 text-sm font-semibold text-[var(--brand-purple)] shadow-sm transition hover:-translate-y-0.5 hover:shadow sm:text-base"
    >
      Cart <span className="ml-1">({totalItems})</span>
    </Link>
  );
}
