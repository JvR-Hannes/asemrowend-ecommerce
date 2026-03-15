"use server";

import { confirmPayment } from "@/lib/orders";

export async function confirmPaymentAction(
    reference: string,
) {
    return confirmPayment(reference);
}