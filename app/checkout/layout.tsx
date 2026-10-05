import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Status | BlurGlass',
  description: 'BlurGlass macOS digital download & order confirmation status.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
