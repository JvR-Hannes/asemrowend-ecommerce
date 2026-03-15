import { prisma } from "./prisma";
import { OrderStatus } from "@prisma/client";

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.pending]: [
        OrderStatus.paid,
        OrderStatus.failed,
        OrderStatus.cancelled,
    ],
    [OrderStatus.paid]: [],
    [OrderStatus.failed]: [],
    [OrderStatus.cancelled]: [],
};

export async function transitionOrderStatus(
    orderId: string,
    nextStatus: OrderStatus,
    paymentReference?: string,
) {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    const currentStatus = order.status;

    if (!allowedTransitions[currentStatus].includes(nextStatus)) {
        throw new Error(
            `Invalid status transition: ${currentStatus} -> ${nextStatus}`
        );
    }

    return prisma.order.update({
        where: { id: orderId },
        data: {
            status: nextStatus,
            paymentReference,
        },
    });
}

export async function createOrder(data: {
    totalCents: number;
    items: {
        productId: string;
        name: string;
        unitPriceCents: number;
        quantity: number;
        subtotalCents: number;
    }[];
}) {
    return prisma.order.create({
        data: {
            totalCents: data.totalCents,
            status: OrderStatus.pending,
            items: {
                create: data.items.map((item) => ({
                    productId: item.productId,
                    name: item.name,
                    unitPriceCents: item.unitPriceCents,
                    quantity: item.quantity,
                    subtotalCents: item.subtotalCents,
                })),
            },
        },
        include: {
            items: true,
        },
    });
}

export async function getOrderById(id: string) {
    return prisma.order.findUnique({
        where: { id },
        include: { items: true },
    });
}

export async function confirmPayment(
    reference: string
 ) {
    const order = await prisma.order.findUnique({
        where: { id: reference },
        include: { items: true },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status === OrderStatus.paid) {
        return order;
    }

    if (order.status !== OrderStatus.pending) {
        throw new Error(
            `Cannot confirm payment for order in status: ${order.status}`
        );
    }

    await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
            const product = await tx.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                throw new Error("Product not found");
            }

            if (product.stock !== null) {
                const updated = await tx.product.updateMany({
                    where: {
                        id: product.id,
                        stock: {
                            gte: item.quantity,
                        },
                    },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });

                if (updated.count === 0) {
                    throw new Error(`Insufficient stock for ${product.name}`);
                }
            }
        }
        await tx.order.update({
            where: { id: order.id },
            data: {
                status: OrderStatus.paid,
                paymentReference: reference,
            },
        });
    });

    return prisma.order.findUnique({
        where: { id: reference },
        include: { items: true },
    });
 }

 export async function getOrders() {
    return prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: true,
        },
    });
 }