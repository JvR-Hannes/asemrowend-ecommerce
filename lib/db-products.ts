import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export async function getProducts() {
  return prisma.product.findMany({
    where: {
      active: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getAdminProducts(where?: Prisma.ProductWhereInput) {
  return prisma.product.findMany({
    where,
    orderBy: { name: "asc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: {
      slug,
      active: true,
    },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
      active: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}