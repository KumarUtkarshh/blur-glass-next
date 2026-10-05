"use client";

import Image from "next/image";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="wordmark" aria-label="BlurGlass Home">
          <Image
            src="/app_icon.svg"
            alt="BlurGlass App Icon"
            width={28}
            height={28}
          />
          <span style={{ fontSize: "17px", fontWeight: "650" }}>BlurGlass</span>
        </Link>

        <span className="footer-slogan">
          The privacy screen that knows when you are looking.
        </span>

        <div className="footer-links">
          <a
            href="#how-it-works"
            style={{ color: "var(--muted)", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}
          >
            Architecture
          </a>
          <a
            href="#comfort"
            style={{ color: "var(--muted)", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}
          >
            Comfort Zone
          </a>
          <a
            href="#questions"
            style={{ color: "var(--muted)", textDecoration: "none", fontSize: "13px", fontWeight: "500" }}
          >
            FAQ
          </a>
          <CheckoutButton
            className="footer-portal-link"
            style={{ background: "none", padding: 0, textDecoration: "underline", color: "var(--accent)", fontSize: "13px", fontWeight: "600" }}
            aria-label="Buy BlurGlass license for $3.99"
          >
            Buy BlurGlass ($3.99) ↗
          </CheckoutButton>
        </div>
      </div>
    </footer>
  );
}
