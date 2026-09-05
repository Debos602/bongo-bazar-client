import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri, Inter } from "next/font/google";
import "./global.css";
import AuthProvider from "@/providers/AuthProvider";
import { CartProvider } from "@/providers/CartProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import InitialLoader from "@/components/shared/Initialloader";
import AIChatWidget from "@/components/AIChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bongo Bazar",
  description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${hindSiliguri.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <Toaster richColors position="top-center" />
            <Suspense fallback={<InitialLoader />}>
              {children}
              <AIChatWidget />
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
