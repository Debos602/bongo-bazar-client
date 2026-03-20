import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "sonner";
import MessengerButton from "@/components/shared/MessengerButton";
import { Suspense } from "react";
import InitialLoader from "@/components/shared/Initialloader";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster richColors position="top-center" />
          <MessengerButton />
          <Suspense fallback={<InitialLoader />}>  {/* ← এইটুকু add করুন */}
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}