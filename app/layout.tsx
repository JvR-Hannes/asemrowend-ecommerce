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
        className={`${geistSans.variable} ${geistMono.variable} page-shell antialiased`}
      >
        <CartProvider>
          {activePromotion && (
            <div className="bg-[linear-gradient(135deg,#7c3aed,#ec4899)] px-4 py-2 text-center text-sm font-semibold text-white shadow-lg">
              <span className="block sm:inline">
                ✨ {activePromotion.title} — {activePromotion.message}
              </span>
              <span className="block sm:inline sm:ml-2">
                <PromotionCountdown endDate={activePromotion.endDate} />
              </span>
            </div>
          )}

          <header className="sticky top-0 z-40 border-b border-white/60 bg-white/72 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <Link
                href="/"
                className="group flex items-center justify-center gap-3 sm:justify-start"
              >
                <div className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-black/5 transition duration-200 group-hover:-translate-y-0.5">
                  <img
                    src="/logo.jpg"
                    alt="Asemrowend Logo"
                    className="h-10 w-10 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12"
                  />
                </div>

                <div>
                  <span className="gradient-text text-lg font-black tracking-[0.2em] sm:text-xl">
                    ASEMROWEND
                  </span>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--brand-muted)] sm:text-[0.78rem]">
                    Playful luxury essentials
                  </p>
                </div>
              </Link>

              <nav className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
                <Link
                  href="/"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--brand-text)] transition hover:bg-white hover:shadow sm:text-base"
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--brand-text)] transition hover:bg-white hover:shadow sm:text-base"
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

          <footer className="mt-20 border-t border-white/60 bg-white/60 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
              <div className="soft-card flex flex-col items-center gap-4 rounded-[2rem] px-6 py-8 text-center">
                <h3 className="gradient-text text-2xl font-black tracking-[0.18em] sm:text-3xl">
                  ASEMROWEND
                </h3>

                <p className="max-w-xl text-sm leading-6 text-[var(--brand-muted)] sm:text-base">
                  Feminine accessories, polished presentation, and a storefront
                  that feels more premium from the first glance.
                </p>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  <Link
                    href="/products"
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[var(--brand-blue)] shadow-sm transition hover:-translate-y-0.5 hover:shadow md:text-base"
                  >
                    Shop Products
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center text-sm font-medium text-[var(--brand-muted)] sm:text-base">
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
