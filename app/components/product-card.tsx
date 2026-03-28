import Link from "next/link";
import { formatZAR } from "@/lib/money";
import Image from "next/image";

type Product = {
  slug: string;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="soft-card card-lift group flex h-full flex-col overflow-hidden rounded-[1.75rem]"
    >
      {product.imageUrl && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="inline-flex w-fit rounded-full bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(236,72,153,0.12))] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-purple)]">
          Featured style
        </div>

        <h2 className="mt-4 text-xl font-bold text-[var(--brand-electric)] sm:text-2xl">
          {product.name}
        </h2>

        <p className="mt-2 text-lg font-bold text-[var(--brand-prices)] sm:text-xl">
          {formatZAR(product.priceCents)}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-anchor)] transition group-hover:translate-x-1 sm:text-base">
          View Product
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
