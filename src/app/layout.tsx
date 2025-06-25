import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="default">
      <body className={`${inter.className} text-base-content`}>
        <Navbar />

        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
