"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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
  const imageUrl = formData.get("imageUrl") as string;
  const stock = Number(formData.get("stock"));
  const active = formData.get("active") === "on";

  // ✅ Generate base slug
  let baseSlug = generateSlug(name);
  let slug = baseSlug;
  let counter = 1;

  // ✅ Ensure slug is unique
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      priceCents: Math.round(price * 100),
      currency: "ZAR",
      description,
      imageUrl,
      stock,
      active,
    },
  });

  redirect("/admin/products");
}