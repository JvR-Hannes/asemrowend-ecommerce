export const config = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,

    ikpay: {
        baseUrl: process.env.IKPAY_BASE_URL!,
        merchantId: process.env.IKPAY_MERCHANT_ID!,
        secretKey: process.env.IKPAY_SECRET_KEY!,
    },
}