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
  const [fileName, setFileName] = useState<string>("BlurGlass 1.0 DMG");
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
          if (data.fileName) {
            setFileName(data.fileName.replace(/\.dmg$/i, "") + " DMG");
          }
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
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Header Typography */}
        <h1 className="success-ref-heading">Thank you for your purchase!</h1>
        <p className="success-ref-subheading">
          Your purchase is complete. BlurGlass is ready to protect your screen.
        </p>

        {/* Product Capsule Pill */}
        <div className="success-product-capsule">
          <svg className="apple-logo-svg" width="18" height="18" viewBox="0 0 170 170" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.77-11.71-14.19-5.74-8.93-10.27-18.7-13.6-29.31-3.33-10.6-5-20.73-5-30.38 0-14.36 3.65-26.06 10.96-35.1 7.31-9.04 16.5-13.68 27.56-13.91 4.58 0 9.8 1.16 15.65 3.48 5.86 2.32 9.47 3.52 10.83 3.6 1.48 0 5.37-1.32 11.68-3.96 6.31-2.64 11.73-3.83 16.27-3.56 12.07.63 21.6 4.96 28.58 12.98-10.68 6.47-15.91 15.42-15.69 26.85.22 8.97 3.73 16.48 10.53 22.52 6.8 6.04 14.88 9.42 24.23 10.14-2.12 6.47-4.66 12.59-7.63 18.35zM119.22 31.84c0-7.39 2.67-14.28 8.01-20.67 5.34-6.39 12-10.37 19.98-11.17.43 1.07.64 2.19.64 3.35 0 7.39-2.82 14.47-8.45 21.23-5.63 6.77-12.33 10.45-20.18 11.06z" />
          </svg>
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
            {/* Primary Dark Download Button */}
            <button
              onClick={handleDownloadClick}
              className="btn-download-primary"
              disabled={downloading}
              aria-label="Download BlurGlass 1.0 DMG"
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download {fileName}</span>
                </>
              )}
            </button>

            {/* Secondary Back to Home Button */}
            <Link href="/" className="btn-home-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
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
