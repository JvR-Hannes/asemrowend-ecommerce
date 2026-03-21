"use server";

import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const stock = Number(formData.get("stock"));
  const active = formData.get("active") === "on";
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File | null;

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error("Product not found.");
  }

  let imageUrl = existingProduct.imageUrl;

  if (imageFile && imageFile.size > 0) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("Missing BLOB_READ_WRITE_TOKEN in environment variables.");
    }

    const slugBase = generateSlug(name || existingProduct.name);
    const extension = imageFile.name.split(".").pop() || "jpg";
    const fileName = `products/${slugBase}-${Date.now()}.${extension}`;

    const blob = await put(fileName, imageFile, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    imageUrl = blob.url;
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      priceCents: Math.round(price * 100),
      description,
      imageUrl,
      stock,
      active,
      featured,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${existingProduct.slug}`);

  redirect("/admin/products");
}