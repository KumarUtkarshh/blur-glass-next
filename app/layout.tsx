import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shyglass.app"),
  title: "ShyGlass — Your screen softens when you look away",
  description:
    "ShyGlass uses AirPods head tracking to blur your Mac when you look away. $3.99 once, for up to five Macs.",
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/app-icon.png",
  },
  openGraph: {
    title: "ShyGlass — Look away and hide your screen.",
    description: "AirPods head tracking privacy screen for your Mac.",
    url: "https://shyglass.app",
    siteName: "ShyGlass",
    images: [
      {
        url: "/shyglass-poster.jpg",
        width: 1200,
        height: 630,
        alt: "ShyGlass privacy screen preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShyGlass — Look away and hide your screen.",
    description: "AirPods head tracking privacy screen for your Mac.",
    images: ["/shyglass-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
