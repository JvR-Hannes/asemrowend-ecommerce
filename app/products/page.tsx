import { getProducts } from "@/lib/db-products";
import ProductCard from "@/app/components/product-card";

export const metadata = {
  title: "Products | Asemrowend Pty Ltd",
  description:
    "Browse products available at Asemrowend, a Pretoria-based online store that serves South Africa.",
};

export default async function ProductPage() {
  const products = await getProducts();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </ul>
    </main>
  );
}
