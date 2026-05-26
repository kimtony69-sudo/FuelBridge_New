import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400","500","600","700"],
});
const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  weight: ["400","500","600"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300","400","500","600"],
});

export const metadata = {
  title: "FuelBridge ZA: Verified EN590 Bulk Diesel Trading Platform in South Africa",
  description: "Safely trade bulk EN590 diesel with DMRE-licensed sellers and buyers. FuelBridge offers an NCNDA-protected, compliant, and transparent marketplace for South Africa’s fuel industry.",
  keywords: ["EN590", "bulk fuel", "South Africa", "DMRE", "diesel trading", "FuelBridge"],
  openGraph: {
    title: "FuelBridge ZA",
    description: "EN590 Bulk Fuel Trading Platform - South Africa",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${ibmMono.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-ink">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
