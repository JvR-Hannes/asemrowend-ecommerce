import { getProductBySlug } from "@/lib/db-products";
import AddToCartButton from "./add-to-cart-button";
import { formatZAR } from "@/lib/money";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <main className="mt-6 mx-auto max-w-2xl p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-[var(--brand-secondary)]">
        {product.name}
      </h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mt-6 w-full rounded-lg object-cover"
        />
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
