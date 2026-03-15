import { prisma } from "./prisma";

export async function getProducts() {
    return prisma.product.findMany({
        orderBy: { name: "asc" },
    });
}

export async function getProductBySlug(slug: string) {
    return prisma.product.findUnique({
        where: { slug },
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