"use server";

import { getOrderById } from "@/lib/orders";
import { OrderStatus } from "@prisma/client";
import crypto from "crypto";

export async function startIkPayPayment(orderId: string) {
    const order = await getOrderById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status !== OrderStatus.pending) {
        throw new Error("Order already processed");
    }

    const amountInCents = order.totalCents;

    const requestBody = {
    entityID: orderId,
    externalEntityID: orderId,
    amount: amountInCents,
    currency: "ZAR",
    requesterUrl: process.env.PUBLIC_BASE_URL,
    mode: process.env.IKHOKHA_MODE || "live",
    externalTransactionID: orderId,
    urls: {
      callbackUrl: `${process.env.PUBLIC_BASE_URL}/api/webhooks/ikpay`,
      successPageUrl: `${process.env.PUBLIC_BASE_URL}/payment/success?reference=${orderId}`,
      failurePageUrl: `${process.env.PUBLIC_BASE_URL}/payment/cancel?reference=${orderId}`,
      cancelUrl: `${process.env.PUBLIC_BASE_URL}/payment/cancel?reference=${orderId}`,
    },
  };

  const bodyString = JSON.stringify(requestBody);

  const url = new URL(process.env.IKHOKHA_API_URL!);
  const path = url.pathname;

  const rawPayload = path + bodyString;

  function jsStringEscape(str: string) {
    return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/'/g, "\\'")
    .replace(/\u0000/g, "\\0");
  }

  const escapedPayload = jsStringEscape(rawPayload);

  const signature = crypto
  .createHmac("sha256", process.env.IKHOKHA_APP_SECRET!.trim())
  .update(escapedPayload)
  .digest("hex");

  const response = await fetch(process.env.IKHOKHA_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "IK-APPID": process.env.IKHOKHA_APP_ID!,
      "IK-SIGN": signature,
    },
    body: bodyString,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`iKhokha error: ${errorText}`);
  }

  const data = await response.json();

  if (data.responseCode !== "00") {
    throw new Error(`iKhokha failed: ${data.message}`);
  }

  return data.paylinkUrl;
}