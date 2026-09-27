"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="wordmark" aria-label="ShyGlass home">
          <Image
            src="/app-icon.png"
            alt="ShyGlass Icon"
            width={38}
            height={38}
            priority
          />
          <span>ShyGlass</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#simulator">Simulator</a>
          <a href="#compatibility">AirPods</a>
          <a href="#comfort">Comfort Zone</a>
          <a href="#questions">Questions</a>
        </nav>

        <div className="header-cta-group">
          <a
            href="https://buy.polar.sh/polar_cl_eXbMk6MFQGpY3czW4xuZaFpYgRfg0YXdZxz5u1tOWjl"
            target="_blank"
            rel="noopener noreferrer"
            className="header-buy-btn"
          >
            <span>Get ShyGlass</span>
            <span style={{ opacity: 0.8 }}>$3.99</span>
          </a>
        </div>
      </div>
    </header>
  );
}
