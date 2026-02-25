import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://shipping-portal-two.vercel.app"),
  title: "Shipping Industry Portal | Synergy Capital",
  description: "Comprehensive shipping industry portal covering vessel types, major ports, freight rates, market data, shipbuilding, and industry forecasts. Powered by Synergy Capital.",
  keywords: "shipping, maritime, vessels, ports, freight rates, bulk carriers, tankers, container ships, LNG, shipbuilding, Synergy Capital",
  openGraph: {
    title: "Shipping Industry Portal | Synergy Capital",
    description: "Your complete guide to the global shipping industry - vessel types, ports, routes, freight rates, market data, and forecasts.",
    type: "website",
    siteName: "Synergy Capital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shipping Industry Portal | Synergy Capital",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Industry Portal | Synergy Capital",
    description: "Your complete guide to the global shipping industry - vessel types, ports, routes, freight rates, market data, and forecasts.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
