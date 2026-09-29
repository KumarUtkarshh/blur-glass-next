"use client";

import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="BlurGlass home">
          <Image
            src="/app_icon.svg"
            alt="BlurGlass Icon"
            width={36}
            height={36}
            priority
          />
          <span>BlurGlass</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#comfort">Comfort Zone</a>
          <a href="#questions">Questions</a>
        </nav>

        <div className="header-cta-group">
          <CheckoutButton className="header-buy-btn">
            <span>Get BlurGlass</span>
            <span style={{ opacity: 0.8 }}>$3.99</span>
          </CheckoutButton>
        </div>
      </div>
    </header>
  );
}
