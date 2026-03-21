import { createProduct } from "@/app/actions/create-product";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <main className="p-8">
      <Link
        href="/admin/products"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold">Create Product</h1>

      <form action={createProduct} className="mt-6 space-y-4">
        <input
          name="name"
          placeholder="Product name"
          className="w-full rounded border p-2"
          required
        />

        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price (ZAR)"
          className="w-full rounded border p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full rounded border p-2"
          required
        />

        <div className="space-y-1">
          <label htmlFor="image" className="block font-medium">
            Product Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="w-full rounded border p-2"
            required
          />
          <p className="text-sm text-gray-600">
            Upload a JPG, PNG, or WebP image.
          </p>
        </div>

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="w-full rounded border p-2"
        />

        <label className="flex items-center rounded gap-2">
          <input type="checkbox" name="active" defaultChecked />
          Active
        </label>

        <label className="flex items-center rounded gap-2">
          <input type="checkbox" name="featured" />
          Featured Product
        </label>

        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Create Product
        </button>
      </form>
    </main>
  );
}
