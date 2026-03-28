import { getProducts } from "@/lib/db-products";
import ProductCard from "@/app/components/product-card";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products | Asemrowend Pty Ltd",
  description:
    "Browse products available at Asemrowend, a Pretoria-based online store that serves South Africa.",
};

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-pink)]">
          Curated collection
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Our Products</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--brand-muted)] sm:text-lg">
          Browse statement pieces and everyday favorites designed to feel soft,
          elegant, and easy to wear.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
