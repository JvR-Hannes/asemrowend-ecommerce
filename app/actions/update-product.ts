"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateProduct(
    id: string,
    formData: FormData
) {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const stock = Number(formData.get("stock"));
    const active = formData.get("active") === "on";
    const featured = formData.get("featured") === "on";

    await prisma.product.update({
        where: { id },
        data: {
            name,
            priceCents: Math.round(price * 100),
            description,
            stock,
            active,
            featured,
        },
    });

    redirect("/admin/products");
}