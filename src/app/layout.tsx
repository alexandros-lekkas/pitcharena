import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="default">
      <body className={`${inter.className} bg-base-100 text-base-content`}>
        {/* Header placeholder */}
        <header className="flex justify-between items-center px-6 py-4 w-full bg-primary text-primary-foreground">
          <span className="text-xl font-bold tracking-tight">Pitch Arena</span>
          {/* Add nav or auth buttons here in the future */}
        </header>
        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>
      </body>
    </html>
  );
}
