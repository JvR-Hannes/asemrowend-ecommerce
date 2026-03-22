import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { getActivePromotion } from "@/lib/promotions";
import Link from "next/link";
import CartIndicator from "@/cart-indicator";
import PromotionCountdown from "@/app/components/promotion-countdown";
import Script from "next/script";
import Analytics from "@/app/components/analytics";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asemrowend Pty Ltd | Pretoria Online Store",
  description:
    "Asemrowend Pty Ltd is a Pretoria-based online store offering quality hair accessories with fast local delivery across South Africa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activePromotion = await getActivePromotion();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {activePromotion && (
            <div
              className="px-4 py-2 text-center text-sm font-semibold text-white"
              style={{ background: "var(--brand-accent)" }}
            >
              <span className="block sm:inline">
                🔥 {activePromotion.title} — {activePromotion.message}
              </span>
              <span className="block sm:inline sm:ml-2">
                <PromotionCountdown endDate={activePromotion.endDate} />
              </span>
            </div>
          )}

          <header className="bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="flex items-center justify-center gap-3 sm:justify-start hover:opacity-90"
              >
                <img
                  src="/logo.jpg"
                  alt="Asemrowend Logo"
                  className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
                />

                <span
                  className="text-lg font-bold sm:text-xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #1A6D82, #5EC5D1, #355d61, #1C949D, #111F2A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  ASEMROWEND
                </span>
              </Link>

              <nav className="flex flex-wrap items-center justify-center gap-4 sm:justify-end sm:gap-6">
                <Link
                  href="/"
                  className="text-base font-bold hover:opacity-80 sm:text-lg"
                  style={{ color: "#088e9f" }}
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="text-base font-bold hover:opacity-80 sm:text-lg"
                  style={{ color: "#088e9f" }}
                >
                  Products
                </Link>

                <CartIndicator />
              </nav>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            {children}
          </main>

          <footer
            className="mt-20 border-t"
            style={{ background: "var(--brand-background)" }}
          >
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <h3
                  className="text-xl font-bold sm:text-2xl"
                  style={{ color: "var(--brand-text)" }}
                >
                  ASEMROWEND
                </h3>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                  <Link
                    href="/products"
                    className="text-base font-bold hover:underline sm:text-lg"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    Products
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center text-sm font-semibold sm:text-base text-[var(--brand-text)]">
                © {new Date().getFullYear()} Asemrowend Pty Ltd
              </div>
            </div>
          </footer>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </CartProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
        </Script>
      </body>
    </html>
  );
}
