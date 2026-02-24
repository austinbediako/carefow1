import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedFlow Command Center",
  description: "Digital Bed Command and Patient Flow Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.variable,
          "antialiased font-sans bg-[#F5F5F7] text-slate-900 min-h-screen selection:bg-blue-100"
        )}
      >
        {children}
      </body>
    </html>
  );
}
