import Link from "next/link";
import { getFeaturedProducts } from "@/lib/db-products";
import ProductCard from "@/app/components/product-card";
import { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

const highlights = [
  "Soft, premium fabrics",
  "Fast South Africa delivery",
  "Designed for everyday style",
];

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:py-18">
        <div className="glass-panel animated-border relative mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-14 lg:py-16">
          <div className="hero-orb left-[-3rem] top-12 h-24 w-24 bg-pink-300" />
          <div className="hero-orb right-[20%] top-[-1rem] h-20 w-20 bg-violet-300" />
          <div className="hero-orb bottom-[-1rem] right-[-1rem] h-28 w-28 bg-blue-300" />

          <div className="relative z-10">
            <span className="fade-up inline-flex rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-purple)] shadow-sm backdrop-blur">
              New look, same comfort
            </span>

            <h1 className="fade-up-delay mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Stylish scrunchies with a{" "}
              <span className="gradient-text">softer, brighter vibe</span>
            </h1>

            <p className="fade-up-delay mt-5 max-w-2xl text-base leading-7 text-[var(--brand-muted)] sm:text-lg">
              Asemrowend brings playful color, premium comfort, and easy
              everyday styling to customers across South Africa.
            </p>

            <div className="fade-up-delay-2 mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="gradient-button rounded-full px-7 py-3 text-sm font-semibold text-white transition sm:text-base"
              >
                Shop Products
              </Link>

              <Link
                href="/products"
                className="rounded-full border border-[var(--brand-border)] bg-white/80 px-7 py-3 text-sm font-semibold text-[var(--brand-text)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white sm:text-base"
              >
                Explore Collection
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/80 bg-white/80 px-4 py-2 text-sm font-medium text-[var(--brand-text)] shadow-sm"
                >
                  ✦ {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="soft-card shimmer rounded-[2rem] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#fde7f3_0%,#f3e8ff_100%)] p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-pink)]">
                    Style first
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[var(--brand-electric)]">
                    Elevated everyday wear
                  </div>
                </div>

                <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#dbeafe_0%,#f5f3ff_100%)] p-5">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue)]">
                    Comfort always
                  </div>
                  <div className="mt-3 text-2xl font-bold text-[var(--brand-electric)]">
                    Gentle hold, all day
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(124,58,237,0.1),rgba(236,72,153,0.12),rgba(37,99,235,0.1))] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-purple)]">
                  Made for gifting and daily styling
                </div>
                <p className="mt-3 text-base leading-7 text-[var(--brand-muted)]">
                  Refresh your accessories collection with vibrant, feminine
                  tones and a cleaner premium storefront experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-pink)]">
              Featured picks
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Bestselling favorites
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-semibold text-[var(--brand-button)] hover:underline sm:inline"
          >
            Browse the full range →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-base font-bold hover:underline"
            style={{ color: "var(--brand-button)" }}
          >
            View All Products →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="soft-card grid gap-5 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-3 lg:gap-6">
          {[
            ["Pretoria based", "Local brand with nationwide delivery."],
            [
              "Premium finish",
              "A cleaner, more fashion-forward shopping experience.",
            ],
            [
              "Made to feel good",
              "Comfortable accessories for daily wear and gifting.",
            ],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[1.5rem] bg-white/80 p-5">
              <h3 className="text-lg font-bold text-[var(--brand-electric)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)] sm:text-base">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
