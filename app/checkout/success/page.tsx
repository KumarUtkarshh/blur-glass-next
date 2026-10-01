"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DownloadIcon,
  HomeIcon,
  AppleBrandLogo,
} from "@/components/ItsHoverIcons";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || searchParams.get("checkout_session_id");
  const paymentId = searchParams.get("payment_id");

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchDownloadInfo() {
      if (!sessionId && !paymentId) return;
      try {
        const query = new URLSearchParams();
        if (sessionId) query.set("session_id", sessionId);
        if (paymentId) query.set("payment_id", paymentId);
        query.set("format", "json");

        const res = await fetch(`/api/download?${query.toString()}`);
        const data = await res.json();
        if (isMounted && data.success && data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
        }
      } catch (err) {
        console.warn("Could not fetch direct download link:", err);
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
    setTimeout(() => setDownloading(false), 3500);
  };

  return (
    <main className="success-page-ref">
      <div className="success-ref-wrapper">
        
        {/* Mint Green Success Checkmark Badge */}
        <div className="success-check-bubble" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Header Typography */}
        <h1 className="success-ref-heading">Thank you for your purchase!</h1>
        <p className="success-ref-subheading">
          Your purchase is complete. BlurGlass is ready to protect your screen.
        </p>

        {/* Product Capsule Pill with official ItsHover AppleBrandLogo */}
        <div className="success-product-capsule">
          <AppleBrandLogo size={20} strokeWidth={2} className="apple-logo-svg" />
          <div className="capsule-text-col">
            <span className="capsule-title">BlurGlass</span>
            <span className="capsule-sub">Version 1.0 • macOS</span>
          </div>
        </div>

        {/* Main White Download Card */}
        <div className="success-download-card">
          
          {/* App Icon */}
          <div className="card-app-icon-wrapper">
            <Image
              src="/app_icon.svg"
              alt="BlurGlass for macOS"
              width={76}
              height={76}
              priority
            />
          </div>

          <h2 className="card-app-title">BlurGlass for macOS</h2>
          <p className="card-app-subtitle">Version 1.0 • DMG installer</p>

          <div className="card-buttons-group">
            {/* Primary Dark Download Button with official ItsHover DownloadIcon */}
            <button
              onClick={handleDownloadClick}
              className="btn-download-primary"
              disabled={downloading}
              aria-label="Download BlurGlass 1.0"
            >
              {downloading ? (
                <>
                  <svg className="btn-icon-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>Starting Download...</span>
                </>
              ) : (
                <>
                  <DownloadIcon size={18} strokeWidth={2.2} color="currentColor" />
                  <span>Download BlurGlass 1.0</span>
                </>
              )}
            </button>

            {/* Secondary Back to Home Button with official ItsHover HomeIcon */}
            <Link href="/" className="btn-home-secondary">
              <HomeIcon size={18} strokeWidth={2} color="currentColor" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="card-footer-ready-text">Your download is ready.</p>

        </div>

      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
          Loading confirmation...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
