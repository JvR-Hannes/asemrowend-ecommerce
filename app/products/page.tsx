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
    <section className="px-4 py-8 sm:px-6">
      <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Our Products</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
