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

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const stock = Number(formData.get("stock"));
  const active = formData.get("active") === "on";
  const imageFile = formData.get("image") as File | null;

  if (!imageFile || imageFile.size === 0) {
    throw new Error("Please upload an image.");
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN in environment variables.");
  }

  let baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const extension = imageFile.name.split(".").pop() || "jpg";
  const fileName = `products/${slug}-${Date.now()}.${extension}`;

  const blob = await put(fileName, imageFile, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  await prisma.product.create({
    data: {
      name,
      slug,
      priceCents: Math.round(price * 100),
      currency: "ZAR",
      description,
      imageUrl: blob.url,
      stock,
      active,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}