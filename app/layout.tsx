import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import { getActivePromotion } from "@/lib/promotions";
import Link from "next/link";
import CartIndicator from "@/cart-indicator";
import PromotionCountdown from "@/app/components/promotion-countdown";
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
  title: "Asemrowend Pty Ltd | Pretoria Online Store ",
  description:
    "Asemrowend Pty Ltd is a Pretoria-based online store offering quality hair accessories with fast local delivery across South Africa.",
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
              className="text-center text-white py-2 text-sm font-semibold"
              style={{ background: "var(--brand-accent)" }}
            >
              🔥 {activePromotion.title} — {activePromotion.message}
              <PromotionCountdown endDate={activePromotion.endDate} />
            </div>
          )}
          {/* Header */}
          <header className="bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
              {/* Logo / Brand */}
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-90"
              >
                <img
                  src="/logo.jpg"
                  alt="Asemrowend Logo"
                  className="h-12 w-12 object-contain"
                />

                <span
                  className="text-xl font-bold"
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

              {/* Navigation */}
              <nav className="flex items-center gap-6">
                <Link
                  href="/"
                  className="font-bold hover:opacity-80 text-lg"
                  style={{ color: "#088e9f" }}
                >
                  Home
                </Link>

                <Link
                  href="/products"
                  className="font-bold hover:opacity-80 text-lg"
                  style={{ color: "#088e9f" }}
                >
                  Products
                </Link>

                <CartIndicator />
              </nav>
            </div>
          </header>

          {/* Page Content */}
          <main className="mx-auto max-w-6xl">{children}</main>
          {/* Footer */}
          <footer
            className="mt-20 border-t"
            style={{ background: "var(--brand-background)" }}
          >
            <div className="mx-auto max-w-6xl px-6 py-10">
              {/* Footer Top */}
              <div className="flex flex-col items-center gap-4 text-center">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--brand-text)" }}
                >
                  ASEMROWEND
                </h3>

                <div className="flex gap-6 text-sm">
                  <Link
                    href="/products"
                    className="hover:underline text-lg font-bold"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    Products
                  </Link>

                  <Link
                    href="/contact"
                    className="hover:underline text-lg font-bold"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    Contact
                  </Link>

                  <Link
                    href="/privacy"
                    className="hover:underline text-lg font-bold"
                    style={{ color: "var(--brand-blue)" }}
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/admin/login"
                    className="text-xs opacity-1 hover:opacity-100"
                  >
                    Admin
                  </Link>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="mt-6 text-center font-semibold text-md text-[var(--brand-text)]">
                © {new Date().getFullYear()} Asemrowend Pty Ltd
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
