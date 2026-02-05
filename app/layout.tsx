import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Image for Creatives",
    template: "%s • Image for Creatives",
  },
  description:
    "A modern image platform built for designers, developers, and creators.",
  applicationName: "Image for Creatives",
  metadataBase: new URL("https://imageforcreatives.com"),
  openGraph: {
    type: "website",
    siteName: "Image for Creatives",
    title: "Image for Creatives",
    description:
      "A modern image platform built for designers, developers, and creators.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >
        {children}

        {/* UI-only, client-safe */}
        <Toaster
          richColors
          closeButton
          position="top-right"
          duration={5000}
        />
      </body>
    </html>
  );
}
