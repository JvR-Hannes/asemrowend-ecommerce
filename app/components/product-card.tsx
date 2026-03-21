import Link from "next/link";
import { formatZAR } from "@/lib/money";

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
      className="flex h-full flex-col rounded-lg border-4 border-[#0C4473] bg-[#1f5a6c] p-4 transition hover:bg-[#2a6e78] hover:shadow-xl"
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-4 h-48 w-full rounded object-cover"
        />
      )}

      <h2 className="text-lg font-semibold text-white sm:text-xl">
        {product.name}
      </h2>

      <p className="mt-2 text-base font-semibold text-[var(--brand-prices)] sm:text-lg">
        {formatZAR(product.priceCents)}
      </p>

      <span className="mt-4 inline-block text-base font-semibold text-[var(--brand-light-blue)] transition hover:underline sm:text-lg">
        View Product
      </span>
    </Link>
  );
}
