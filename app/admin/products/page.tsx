import { getAdminProducts } from "@/lib/db-products";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatZAR } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filter = params?.filter;

  let where: Prisma.ProductWhereInput = {};

  if (filter === "active") {
    where.active = true;
  } else if (filter === "inactive") {
    where.active = false;
  } else if (filter === "featured") {
    where.featured = true;
  }

  const products = await getAdminProducts(where);

  return (
    <main className="p-8">
      <Link href="/admin" className="text-sm text-blue-600 hover:underline">
        ← Back to Admin
      </Link>

      <h1 className="text-2xl font-bold">Products</h1>

      <Link
        href="/admin/products/new"
        className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
      >
        New product
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/admin/products" className="rounded border px-3 py-1">
          All
        </Link>

        <Link
          href="/admin/products?filter=active"
          className="rounded border px-3 py-1"
        >
          Active
        </Link>

        <Link
          href="/admin/products?filter=inactive"
          className="rounded border px-3 py-1"
        >
          Inactive
        </Link>

        <Link
          href="/admin/products?filter=featured"
          className="rounded border px-3 py-1"
        >
          Featured
        </Link>
      </div>

      <ul className="mt-6 space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 rounded border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              {product.imageUrl && (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}

              <div className="space-y-1">
                <h2 className="font-semibold">{product.name}</h2>
                <p>{formatZAR(product.priceCents)}</p>

                <div className="flex flex-wrap gap-2 pt-1 text-sm">
                  <span className="rounded bg-gray-100 px-2 py-1">
                    Stock: {product.stock ?? 0}
                  </span>

                  <span
                    className={`rounded px-2 py-1 text-white ${
                      product.active ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>

                  <span
                    className={`rounded px-2 py-1 text-white ${
                      product.featured ? "bg-purple-600" : "bg-gray-500"
                    }`}
                  >
                    {product.featured ? "Featured" : "Not Featured"}
                  </span>
                </div>
              </div>
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
