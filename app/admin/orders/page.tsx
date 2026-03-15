import { getOrders } from "@/lib/orders";
import { formatZAR } from "@/lib/money";
import { formatOrderNumber } from "@/lib/orderNumber";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Orders</h1>

      {orders.length === 0 && (
        <p className="mt-6 text-gray-500">No orders yet.</p>
      )}

      <div className="mt-6 space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
              <a
                href={`/admin/orders/${order.id}`}
                className="text-lg font-semibold underline"
              >
                Order {formatOrderNumber(order.id)}
              </a>

              <span
                className={`rounded px-3 py-1 text-xs font-semibold capitalize
                ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Date */}
            <p className="mt-1 text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {/* Total */}
            <p className="mt-3 font-medium">
              Total: {formatZAR(order.totalCents)}
            </p>

            {/* Items */}
            <div className="mt-3 text-sm text-gray-700">
              {order.items.map((item) => (
                <div key={item.id}>
                  {item.quantity} × {item.name}
                </div>
              ))}
            </div>

            {/* Item count */}
            <p className="mt-3 text-xs text-gray-500">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
