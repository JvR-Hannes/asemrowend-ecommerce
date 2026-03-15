import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/app/actions/update-product";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const updateProductWithId = updateProduct.bind(null, id);

  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <form action={updateProductWithId} className="mt-6 space-y-4">
        <input
          name="name"
          defaultValue={product.name}
          className="w-full border p-2"
          required
        />

        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product.priceCents / 100}
          className="w-full border p-2"
          required
        />

        <textarea
          name="description"
          defaultValue={product.description}
          className="w-full border p-2"
          required
        />

        <input
          name="stock"
          type="number"
          defaultValue={product.stock ?? ""}
          className="w-full border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product.active}
          />
          Active
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product.featured}
          />
          Featured Product
        </label>

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Update Product
        </button>
      </form>
    </main>
  );
}
