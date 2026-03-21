"use client";

import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { formatZAR } from "@/lib/money";

export default function CartPage() {
  const { items } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty.{" "}
          <Link href="/products" className="text-blue-600 underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.slug}
              className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-600">
                  {formatZAR(item.product.priceCents)} x {item.quantity}
                </p>
              </div>

              <p className="font-semibold sm:text-right">
                {formatZAR(item.product.priceCents * item.quantity)}
              </p>
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">{formatZAR(total)}</span>
          </div>

          <div className="mt-6">
            <Link
              href="/checkout"
              className="inline-flex w-full items-center justify-center rounded bg-black px-6 py-3 text-white hover:bg-gray-800 sm:w-auto"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
