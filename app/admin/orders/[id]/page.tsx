import { getOrderById } from "@/lib/orders";
import { formatZAR } from "@/lib/money";
import { formatOrderNumber } from "@/lib/orderNumber";
import Link from "next/link";

export default async function AdminOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    return <div className="p-8">Order not found</div>;
  }

  return (
    <main className="p-8">
      <Link
        href="/admin/orders"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Orders
      </Link>
      <h1 className="text-2xl font-bold">
        Order {formatOrderNumber(order.id)}
      </h1>

      <p className="mt-2">Status: {order.status}</p>

      <p>Total: {formatZAR(order.totalCents)}</p>

      <div className="mt-6 space-y-2">
        {order.items.map((item) => (
          <div key={item.id}>
            {item.quantity} × {item.name}
          </div>
        ))}
      </div>
    </main>
  );
}
