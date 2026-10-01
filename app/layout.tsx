import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blurglass.vercel.app"),
  title: "BlurGlass — Privacy-First Screen Shield for macOS",
  description:
    "BlurGlass uses on-device camera intelligence to shield your screen the moment you look away, step away, or someone glances over your shoulder.",
  icons: {
    icon: [
      { url: "/app_icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/app_icon.svg",
    apple: "/app_icon_1024.png",
  },
  openGraph: {
    title: "BlurGlass — Your screen is visible only when you look at it.",
    description:
      "100% on-device camera vision privacy shield for Mac. Zero cloud uploads.",
    url: "https://blurglass.vercel.app",
    siteName: "BlurGlass",
    images: [
      {
        url: "/app_icon_1024.png",
        width: 1024,
        height: 1024,
        alt: "BlurGlass Privacy Shield",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlurGlass — Look away and hide your screen.",
    description:
      "100% on-device camera vision privacy shield for Mac. Zero cloud uploads.",
    images: ["/app_icon_1024.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
