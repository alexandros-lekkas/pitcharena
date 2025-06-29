import type { ReactNode } from "react";
import { Figtree } from "next/font/google";

import { AuthProvider } from "@/lib/providers/auth-provider";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="default">
      <AuthProvider>
        <body className={`${figtree.className} text-base-content`}>
          <Navbar />

          <main className="min-h-screen bg-background text-foreground">
            {children}
          </main>

          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
