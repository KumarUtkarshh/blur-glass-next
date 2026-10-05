"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DownloadIcon,
  HomeIcon,
  AppleBrandLogo,
} from "@/components/ItsHoverIcons";

// ─── Types ────────────────────────────────────────────────────────────────────

type DownloadState =
  | "loading"     // Fetching download info from Dodo
  | "ready"       // Download URL resolved, ready to trigger
  | "downloading" // User clicked Download
  | "error";      // API call / retries exhausted

// ─── Payment Failed View ──────────────────────────────────────────────────────

function PaymentFailedView({ sessionId }: { sessionId: string | null }) {
  return (
    <main className="success-page-ref">
      <div className="success-ref-wrapper">

        {/* Red Error Badge */}
        <div className="payment-fail-bubble" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <h1 className="success-ref-heading" style={{ color: "#111827" }}>Payment was not completed</h1>
        <p className="success-ref-subheading">
          Your payment could not be processed. No charge has been made to your account.
        </p>

        {/* Error Card */}
        <div className="success-download-card">
          <div className="payment-fail-icon-wrap" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h2 className="card-app-title" style={{ marginBottom: "8px" }}>Payment unsuccessful</h2>
          <p className="card-app-subtitle" style={{ marginBottom: "20px", maxWidth: "320px", textAlign: "center" }}>
            This can happen due to an incorrect card number, insufficient funds, or a temporary issue with your bank.
          </p>

          <div className="fail-reasons-list">
            <div className="fail-reason-item">
              <span className="fail-reason-dot" style={{ background: "#fef2f2", color: "#ef4444" }}>✕</span>
              <span>Card declined or insufficient funds</span>
            </div>
            <div className="fail-reason-item">
              <span className="fail-reason-dot" style={{ background: "#fef2f2", color: "#ef4444" }}>✕</span>
              <span>Incorrect card details entered</span>
            </div>
            <div className="fail-reason-item">
              <span className="fail-reason-dot" style={{ background: "#fef2f2", color: "#ef4444" }}>✕</span>
              <span>3D Secure / bank authentication failed</span>
            </div>
          </div>

          <div className="card-buttons-group" style={{ marginTop: "24px" }}>
            <Link href="/" className="btn-download-primary" style={{ textDecoration: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
              </svg>
              <span>Try again</span>
            </Link>

            <Link href="/" className="btn-home-secondary">
              <HomeIcon size={18} strokeWidth={2} color="currentColor" />
              <span>Back to Home</span>
            </Link>
          </div>

          {sessionId && (
            <p className="card-footer-ready-text" style={{ marginTop: "16px" }}>
              Reference:{" "}
              <code style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" }}>
                {sessionId}
              </code>
            </p>
          )}
        </div>

      </div>
    </main>
  );
}

// ─── Payment Success View ─────────────────────────────────────────────────────

function SuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id") || searchParams.get("checkout_session_id");
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");

  // All hooks must be called unconditionally — the conditional render happens below
  const [downloadState, setDownloadState] = useState<DownloadState>("loading");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("BlurGlass.dmg");
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch download info — retries up to 6 times (30 s total) to handle Dodo processing lag
  useEffect(() => {
    // Skip download fetch if payment failed
    if (status === "failed" || status === "cancelled") return;

    let isMounted = true;

    async function fetchDownloadInfo() {
      if (!sessionId && !paymentId) {
        setDownloadState("error");
        return;
      }

      try {
        const query = new URLSearchParams();
        if (sessionId) query.set("session_id", sessionId);
        if (paymentId) query.set("payment_id", paymentId);
        query.set("format", "json");

        const res = await fetch(`/api/download?${query.toString()}`);
        const data = await res.json();

        if (!isMounted) return;

        if (data.success && data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);
          if (data.fileName) setFileName(data.fileName);
          if (data.customerEmail) setCustomerEmail(data.customerEmail);
          setDownloadState("ready");
        } else {
          if (data.customerEmail) setCustomerEmail(data.customerEmail);

          // Retry up to 6 times with 5-second intervals (Dodo may take a moment to provision)
          if (retryCount < 6) {
            retryTimer.current = setTimeout(() => {
              if (isMounted) setRetryCount((c) => c + 1);
            }, 5000);
          } else {
            setDownloadState("error");
          }
        }
      } catch {
        if (!isMounted) return;
        if (retryCount < 6) {
          retryTimer.current = setTimeout(() => {
            if (isMounted) setRetryCount((c) => c + 1);
          }, 5000);
        } else {
          setDownloadState("error");
        }
      }
    }

    fetchDownloadInfo();

    return () => {
      isMounted = false;
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [sessionId, paymentId, retryCount, status]);

  // Render payment failed view if Dodo returned status=failed in the return URL
  if (status === "failed" || status === "cancelled") {
    return <PaymentFailedView sessionId={sessionId} />;
  }

  const isLoading = downloadState === "loading";
  const isReady = downloadState === "ready";
  const isDownloading = downloadState === "downloading";
  const isError = downloadState === "error";

  const handleDownloadClick = () => {
    if (!downloadUrl) return;
    setDownloadState("downloading");
    // Create a temporary anchor to trigger the file download
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloadState("ready"), 4000);
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
          {customerEmail && (
            <> A copy of the download link has been sent to{" "}
              <strong>{customerEmail}</strong>.
            </>
          )}
        </p>

        {/* Product Capsule Pill */}
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

            {/* Loading / Verifying State */}
            {isLoading && (
              <button className="btn-download-primary" disabled aria-label="Preparing download…">
                <svg className="btn-icon-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span>
                  {retryCount > 0
                    ? `Preparing download… (${retryCount}/6)`
                    : "Verifying payment…"}
                </span>
              </button>
            )}

            {/* Ready / Downloading State */}
            {(isReady || isDownloading) && (
              <button
                onClick={handleDownloadClick}
                className="btn-download-primary"
                disabled={isDownloading}
                aria-label={`Download ${fileName}`}
                id="download-blurglass-btn"
              >
                {isDownloading ? (
                  <>
                    <svg className="btn-icon-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span>Starting Download…</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon size={18} strokeWidth={2.2} color="currentColor" />
                    <span>Download BlurGlass 1.0</span>
                  </>
                )}
              </button>
            )}

            {/* Error / Fallback State */}
            {isError && (
              <div className="download-error-box">
                <p className="download-error-msg">
                  {customerEmail ? (
                    <>
                      Your download link was sent to{" "}
                      <strong>{customerEmail}</strong>. Check your inbox (and spam folder).
                    </>
                  ) : (
                    <>
                      Your download link is being prepared. Check your email inbox for a
                      message from BlurGlass, or contact support.
                    </>
                  )}
                </p>
                <button
                  className="btn-retry-sm"
                  onClick={() => { setDownloadState("loading"); setRetryCount(0); }}
                >
                  Try again
                </button>
              </div>
            )}

            {/* Secondary: Back to Home */}
            <Link href="/" className="btn-home-secondary">
              <HomeIcon size={18} strokeWidth={2} color="currentColor" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Footer Note */}
          <p className="card-footer-ready-text">
            {isReady
              ? "Your download is ready."
              : isLoading
              ? "Please wait while we verify your payment…"
              : isError
              ? "Check your email for the download link."
              : "Your download is starting…"}
          </p>

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
          Loading confirmation…
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
