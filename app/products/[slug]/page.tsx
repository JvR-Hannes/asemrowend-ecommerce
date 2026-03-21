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
    <main className="mx-auto mt-6 max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-[var(--brand-secondary)]">
        {product.name}
      </h1>

      {product.imageUrl && (
        <div className="relative mt-6 h-80 w-full overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <p className="mt-4 text-xl font-semibold text-[var(--brand-text)]">
        {product.description}
      </p>

      <strong className="mt-6 block text-3xl font-bold text-[var(--brand-accent)]">
        {formatZAR(product.priceCents)}
      </strong>

      <AddToCartButton product={product} />
    </main>
  );
}
