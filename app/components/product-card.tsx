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
      className="rounded-lg border-4 border-[#0C4473] p-4 transition hover:bg-[#2a6e78] bg-[#1f5a6c] hover:shadow-xl"
    >
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-4 h-48 w-full rounded object-cover"
        />
      )}

      <h2 className="text-xl font-semibold text-white">{product.name}</h2>

      <p className="mt-2 font-semibold text-lg text-[var(--brand-prices)]">
        {formatZAR(product.priceCents)}
      </p>

      <span className="mt-4 inline-block text-lg font-semibold hover:underline transition text-[var(--brand-light-blue)]">
        View Product
      </span>
    </Link>
  );
}
