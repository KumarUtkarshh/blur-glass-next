import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  themeColor: "#f6f8fc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://blurglass.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "BlurGlass — Privacy-First Screen Shield for macOS",
    template: "%s | BlurGlass",
  },
  description:
    "BlurGlass uses on-device camera intelligence to instantly shield your macOS screen whenever you look away, step away, or someone glances over your shoulder. Zero cloud uploads, 100% private.",
  applicationName: "BlurGlass",
  authors: [{ name: "BlurGlass", url: baseUrl }],
  generator: "Next.js",
  keywords: [
    "macOS privacy app",
    "screen shield Mac",
    "look away blur screen",
    "shoulder surfing protection Mac",
    "on-device vision privacy",
    "screen privacy protector software",
    "webcam gaze detection Mac",
    "Mac screen frost blur",
    "privacy screen for MacBook",
    "Touch ID biometric screen lock",
    "Apple Vision framework screen shield",
    "macOS Sonoma privacy tool",
    "macOS Sequoia screen shield",
    "BlurGlass",
  ],
  referrer: "origin-when-cross-origin",
  creator: "BlurGlass",
  publisher: "BlurGlass",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/app_icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/app_icon_128.png", sizes: "128x128", type: "image/png" },
      { url: "/app_icon_512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/app_icon.svg",
    apple: [
      { url: "/app_icon_1024.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "BlurGlass",
    title: "BlurGlass — The Privacy Screen That Knows When You Look",
    description:
      "100% on-device camera vision privacy shield for Mac. Shields your screen instantly when you look away or an unauthorized face enters view. Zero cloud uploads.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BlurGlass — Privacy-First Screen Shield for macOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BlurGlass — Privacy-First Screen Shield for macOS",
    description:
      "100% on-device camera vision privacy shield for Mac. Shields your screen instantly when you look away or an unauthorized face enters view. Zero cloud uploads.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
