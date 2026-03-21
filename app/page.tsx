import Link from "next/link";
import { getFeaturedProducts } from "@/lib/db-products";
import ProductCard from "@/app/components/product-card";
import { Product } from "@prisma/client";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section
        className="flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24"
        style={{ background: "var(--brand-background)" }}
      >
        <h1
          className="text-3xl font-bold sm:text-4xl lg:text-5xl"
          style={{ color: "var(--brand-text)" }}
        >
          Asemrowend Scrunchies
        </h1>

        <p
          className="mt-4 max-w-xl text-base sm:text-lg lg:text-xl"
          style={{ color: "var(--brand-text)" }}
        >
          Premium hair accessories delivered across South Africa. Stylish,
          comfortable, and designed for everyday wear.
        </p>

        <Link
          href="/products"
          className="mt-6 rounded-lg px-6 py-3 font-medium text-white"
          style={{ background: "var(--brand-button)" }}
        >
          Shop Products
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="mb-6 text-center text-xl font-semibold sm:text-2xl">
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
            className="text-base font-bold hover:underline sm:text-lg"
            style={{ color: "var(--brand-button)" }}
          >
            View All Products →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Why Choose Asemrowend?
        </h2>

        <p className="mt-4 text-base text-[var(--brand-text)] sm:text-lg">
          We’re a Pretoria-based online store providing quality hair accessories
          to customers across South Africa. Our scrunchies are designed for
          comfort, durability, and everyday style.
        </p>
      </section>
    </>
  );
}
