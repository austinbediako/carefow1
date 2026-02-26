import type { Metadata } from "next";
import { Poppins, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { DotPattern } from "@/components/ui/dot-pattern";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home - Korle Bu Teaching Hospital",
  description: "Korle Bu Teaching Hospital is Ghana's leading referral centre, dedicated to world-class care and training.",
  icons: {
    icon: "https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1-32x32.png",
    apple: "https://kbth.gov.gh/wp-content/uploads/2025/01/cropped-kbth-logo-Photoroom-1-180x180.png",
  }
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
          poppins.variable,
          beVietnamPro.variable,
          "antialiased font-sans text-slate-900 min-h-screen selection:bg-blue-100 relative"
        )}
      >
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center -z-10 h-full w-full bg-slate-50">
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="mask-[radial-gradient(100vh_circle_at_center,white,transparent)] text-neutral-300/80"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
