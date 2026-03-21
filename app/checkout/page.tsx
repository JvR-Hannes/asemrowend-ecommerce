"use client";

import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/create-order";
import { useEffect, useState } from "react";
import { startIkPayPayment } from "@/app/actions/start-payment";
import { formatZAR } from "@/lib/money";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push("/products");
    }
  }, [items, orderId, router]);

  async function handleCheckout() {
    const orderItems = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const order = await createOrder(orderItems);
    const redirectUrl = await startIkPayPayment(order.id);

    clearCart();
    window.location.href = redirectUrl;
  }

  if (orderId) {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
        <p className="mt-4">Your order ID:</p>
        <p className="mt-2 break-all font-mono text-lg">{orderId}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col gap-2 sm:flex-row sm:justify-between"
          >
            <span className="min-w-0">
              {item.product.name} x {item.quantity}
            </span>
            <span className="font-medium">
              {formatZAR(item.product.priceCents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t pt-4 font-bold sm:flex-row sm:justify-between">
        <span>Total</span>
        <span>{formatZAR(total)}</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-8 w-full rounded bg-black py-3 text-white hover:bg-gray-800"
      >
        Pay with IK Pay
      </button>
    </section>
  );
}
