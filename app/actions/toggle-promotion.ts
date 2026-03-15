"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function togglePromotion(id: string, active: boolean) {
    await prisma.promotion.update({
        where: { id },
        data: {
            active: !active,
        },
    });

    redirect("/admin/promotions");
}