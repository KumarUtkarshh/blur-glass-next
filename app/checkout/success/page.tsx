"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("checkout_session_id");
  const paymentId = searchParams.get("payment_id");

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("BlurGlass.dmg");
  const [isFetchingLink, setIsFetchingLink] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchDownloadInfo() {
      if (!sessionId && !paymentId) {
        setIsFetchingLink(false);
        return;
      }
      try {
        const query = new URLSearchParams();
        if (sessionId) query.set("session_id", sessionId);
        if (paymentId) query.set("payment_id", paymentId);
        query.set("format", "json");

        const res = await fetch(`/api/download?${query.toString()}`);
        const data = await res.json();
        if (isMounted && data.success && data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          if (data.fileName) setFileName(data.fileName);
        }
      } catch (err) {
        console.warn("Could not fetch direct download link:", err);
      } finally {
        if (isMounted) setIsFetchingLink(false);
      }
    }

    fetchDownloadInfo();
    return () => {
      isMounted = false;
    };
  }, [sessionId, paymentId]);

  const handleDownloadClick = () => {
    setDownloading(true);
    const targetUrl = downloadUrl || `/api/download?session_id=${sessionId || ""}`;
    window.location.href = targetUrl;
    setTimeout(() => setDownloading(false), 3000);
  };

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

          {/* Primary Action Button: Download DMG */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handleDownloadClick}
              className="buy-button"
              disabled={downloading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "15px 32px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: downloading ? "wait" : "pointer",
                border: "none",
                background: "linear-gradient(180deg, #0077ED 0%, #0062C4 100%)",
                boxShadow: "0 4px 18px rgba(0, 122, 255, 0.4)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{downloading ? "Starting Download..." : `Download ${fileName}`}</span>
            </button>

            <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.55)" }}>
              Compatible with macOS 14 Sonoma &amp; macOS 15 Sequoia (Apple Silicon &amp; Intel)
            </span>
          </div>

          {/* Digital Delivery Status Banner */}
          <div
            style={{
              marginTop: "28px",
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(52, 199, 89, 0.12)",
              border: "1px solid rgba(52, 199, 89, 0.25)",
              textAlign: "left",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
            }}
          >
            <div style={{ color: "#34c759", marginTop: "2px", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div style={{ color: "#f5f5f7", fontWeight: "600", fontSize: "15px", marginBottom: "4px" }}>
                Digital Product Delivery
              </div>
              <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "13.5px", lineHeight: "1.5", margin: 0 }}>
                In addition to the download button above, Dodo Payments has dispatched your official purchase receipt and a backup download link directly to your email.
              </p>
            </div>
          </div>

          {/* Quick Setup Guide */}
          <div className="setup-steps" style={{ marginTop: "32px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#f5f5f7", marginBottom: "16px" }}>
              Quick 3-Step Setup
            </h3>
            
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-text">
                <strong>Install App</strong>
                <p>Open <code>{fileName}</code> from your Downloads folder and drag BlurGlass into your <code>Applications</code> folder.</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-text">
                <strong>Grant Local Camera Access</strong>
                <p>When prompted by macOS, allow camera access. BlurGlass processes all vision 100% on-device (zero cloud uploads).</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-text">
                <strong>Instant Glance Shielding</strong>
                <p>Register your face in under 5 seconds. The moment you look away or leave your desk, your display frosts in milliseconds.</p>
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
