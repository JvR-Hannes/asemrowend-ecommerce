"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const stock = Number(formData.get("stock"));
    const active = formData.get("active") === "on";

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
