import { NextRequest, NextResponse } from "next/server";
import { confirmPayment } from "@/lib/orders";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    try {
        const appId = req.headers.get("ik-appid");
        const receivedSignature = req.headers.get("ik-sign");

        if (!appId || !receivedSignature) {
            return NextResponse.json({error: "Missing signature headers" }, { status: 400});
        }

        if (appId !== process.env.IKHOKHA_APP_ID) {
            return NextResponse.json({error: "Invalid app ID" }, { status: 401});
        }

        // IMPORTANT: iKhokha signs webhook payload AFTER removing "text" field.
        // This mirrors their official JS sample.

        const rawBuffer = await req.arrayBuffer();
        const rawBody = Buffer.from(rawBuffer);

        const parsedBody = JSON.parse(rawBody.toString("utf8"));
        delete parsedBody.text; // CRITICAL STEP

        const sanitizedBodyString = JSON.stringify(parsedBody);

        const url = new URL(req.url);
        const path = url.pathname;

        function jsStringEscape(str: string) {
            return str.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
        }

        const payloadToSign = jsStringEscape(path + sanitizedBodyString);

        const calculatedSignature = crypto
            .createHmac("sha256", process.env.IKHOKHA_APP_SECRET!.trim())
            .update(payloadToSign)
            .digest("hex");

        const isValid = crypto.timingSafeEqual(
            Buffer.from(calculatedSignature, "hex"),
            Buffer.from(receivedSignature, "hex")
        );

        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const body = JSON.parse(rawBody.toString("utf8"));

        const {
            paylinkID,
            status,
            externalTransactionID,
            responseCode,
        } = body;

        if (!externalTransactionID || responseCode !== "00") {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        if (status === "SUCCESS") {
            await confirmPayment(externalTransactionID);
        }

        return NextResponse.json({ message: "Webhook processed" });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook failed" },
            { status: 500 }
        );
    }
}