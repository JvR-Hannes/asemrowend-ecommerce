import Link from "next/link";
import { getFeaturedProducts } from "@/lib/db-products";
import ProductCard from "@/app/components/product-card";
import { Product } from "@prisma/client";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <main>
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{
          background: "var(--brand-background)",
          padding: "6rem 2rem",
        }}
      >
        <h1
          className="text-5xl font-bold"
          style={{ color: "var(--brand-text)" }}
        >
          Asemrowend Scrunchies
        </h1>

        <p
          className="mt-4 max-w-xl text-xl"
          style={{ color: "var(--brand-text)" }}
        >
          Premium hair accessories delivered across South Africa. Stylish,
          comfortable, and designed for everyday wear.
        </p>

        <Link
          href="/products"
          className="mt-6 rounded-lg px-6 py-3 text-white font-medium"
          style={{ background: "var(--brand-button)" }}
        >
          Shop Products
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl p-8">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="font-bold hover:underline text-lg"
            style={{ color: "var(--brand-button)" }}
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="mx-auto max-w-4xl p-6 text-center">
        <h2 className="text-3xl font-semibold">Why Choose Asemrowend?</h2>

        <p className="mt-4 text-[var(--brand-text)] text-lg">
          We’re a Pretoria-based online store providing quality hair accessories
          to customers across South Africa. Our scrunchies are designed for
          comfort, durability, and everyday style.
        </p>
      </section>
    </main>
  );
}
