import { prisma } from "./prisma";

export async function getActivePromotion() {
    const now = new Date();

    return prisma.promotion.findFirst({
        where: {
      active: true,
      OR: [
        { endDate: null },
        { endDate: { gt: now } }
      ]
    },
    orderBy: {
      createdAt: "desc",
    },
    });
}