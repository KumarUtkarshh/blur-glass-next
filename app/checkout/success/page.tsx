"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("checkout_session_id");

  return (
    <main className="success-page">
      <div className="container" style={{ maxWidth: "760px", padding: "64px 20px 100px" }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/" className="wordmark" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <Image
              src="/app_icon.svg"
              alt="BlurGlass Icon"
              width={44}
              height={44}
              priority
            />
            <span style={{ fontSize: "20px", fontWeight: "650", letterSpacing: "-0.01em" }}>BlurGlass</span>
          </Link>
        </div>

        {/* Success Card */}
        <div className="success-card">
          <div className="success-badge-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="success-title">Thank you for getting BlurGlass!</h1>
          <p className="success-subtitle">
            Your payment of <strong>$3.99</strong> was successfully completed via Dodo Payments.
          </p>

          {sessionId && (
            <div className="session-tag">
              <span>Session ID:</span> <code>{sessionId.slice(0, 16)}...</code>
            </div>
          )}

          {/* Action Button */}
          <div style={{ marginTop: "32px" }}>
            <a
              href="https://github.com/utkarsh/blur-glass/releases/latest"
              className="buy-button"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", fontSize: "16px" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download BlurGlass for macOS (.dmg)</span>
            </a>
          </div>

          {/* Quick Setup Guide */}
          <div className="setup-steps">
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#f5f5f7", marginBottom: "16px" }}>
              Quick 3-Step Setup
            </h3>
            
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-text">
                <strong>Install App</strong>
                <p>Open <code>BlurGlass.dmg</code> and drag BlurGlass into your Applications folder.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-text">
                <strong>Grant Local Camera Access</strong>
                <p>When prompted, allow camera access. BlurGlass processes all video 100% on-device (zero cloud uploads).</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-text">
                <strong>Enjoy Glance Protection</strong>
                <p>Lock on your face with Touch ID or keyboard shortcut. Your screen instantly frosts when you look away.</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "36px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "24px" }}>
            <Link href="/" style={{ color: "#007AFF", fontSize: "14px", textDecoration: "none", fontWeight: "500" }}>
              ← Return to BlurGlass Homepage
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#86868b" }}>Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
