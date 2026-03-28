import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/db-products";
import AddToCartButton from "./add-to-cart-button";
import { formatZAR } from "@/lib/money";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found | Asemrowend Pty Ltd",
      description: "The requested product could not be found.",
    };
  }

  const description =
    product.description?.slice(0, 160) ||
    `${product.name} available from Asemrowend Pty Ltd.`;

  return {
    title: `${product.name} | Asemrowend Pty Ltd`,
    description,
    openGraph: {
      title: `${product.name} | Asemrowend Pty Ltd`,
      description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto mt-8 max-w-5xl px-2 pb-8">
      <div className="soft-card grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_0.95fr]">
        {product.imageUrl && (
          <div className="relative min-h-[360px] overflow-hidden bg-[linear-gradient(180deg,#fdf2f8_0%,#eef2ff_100%)]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6 sm:p-8 lg:p-10">
          <span className="inline-flex rounded-full bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(236,72,153,0.12))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-purple)]">
            Asemrowend favorite
          </span>

          <h1 className="mt-4 text-3xl font-black text-[var(--brand-electric)] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-7 text-[var(--brand-muted)] sm:text-lg">
            {product.description}
          </p>

          <strong className="mt-8 block text-3xl font-black text-[var(--brand-accent)] sm:text-4xl">
            {formatZAR(product.priceCents)}
          </strong>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
