import { getProducts } from "@/lib/db-products";
import Link from "next/link";
import { formatZAR } from "@/lib/money";
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Products</h1>

      <Link
        href="/admin/products/new"
        className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
      >
        New product
      </Link>

      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>{formatZAR(product.priceCents)}</p>
            </div>

            <Link
              href={`/admin/products/${product.id}/edit`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
