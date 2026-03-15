"use server";

import { createOrder as createOrderInDb } from "@/lib/orders";
import { prisma } from "@/lib/prisma";

type OrderItemInput = {
    productId: string;
    quantity: number;
};

export async function createOrder(items: OrderItemInput[]) {
    if (!items || items.length === 0) {
        throw new Error("Order must contain at least one item");
    }

    const sanitizedItems = await Promise.all(
        items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: { id: item.productId }
        });

        if (!product) {
            throw new Error("Invalid product.");
        }

        if (!product.active) {
            throw new Error("Product is not available.");
        }

        if (item.quantity <= 0) {
            throw new Error("Invalid quantity.");
        }

        const unitPriceCents = product.priceCents;

        if (product.stock !== null && item.quantity > product.stock) {
            throw new Error(
                `Only ${product.stock} units of ${product.name} available`
            );
        }

        const subtotalCents = unitPriceCents * item.quantity;

        return {
            productId: product.id,
            name: product.name,
            unitPriceCents,
            quantity: item.quantity,
            subtotalCents,
        };
    })
);

    const totalCents = sanitizedItems.reduce(
        (sum, item) => sum + item.subtotalCents,
        0
    );

    const order = await createOrderInDb({
        totalCents,
        items: sanitizedItems,
    });

    return order;
}