import { transitionOrderStatus } from "@/lib/orders";
import { OrderStatus } from "@prisma/client";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  if (searchParams.ref) {
    try {
      await transitionOrderStatus(searchParams.ref, OrderStatus.cancelled);
    } catch {
      // Ignore invalid transitions (already paid etc.)
    }
  }
  return (
    <main className="mx-auto max-w-xl py-16 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="mt-4">You can try again from your cart.</p>
    </main>
  );
}
