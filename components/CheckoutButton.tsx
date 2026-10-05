"use client";

import { useState } from "react";

interface CheckoutApiResponse {
  checkoutUrl?: string;
  error?: string;
  details?: string;
}

interface CheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  productId?: string;
}

export default function CheckoutButton({
  className = "buy-button",
  children,
  style,
  productId,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = (await response.json()) as CheckoutApiResponse;

      if (!response.ok || !data.checkoutUrl) {
        const message = data.error ?? data.details ?? "Failed to start checkout session.";
        console.error("Dodo Payments checkout error:", data);
        alert(`Dodo Payments Checkout Notice:\n\n${message}\n\nPlease check DODO_PAYMENTS_SETUP.md for quick setup instructions.`);
        return;
      }

      // Redirect customer to Dodo Payments secure hosted checkout
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("Checkout request failed:", msg);
      alert(`Checkout Error:\n\n${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={className}
        style={{
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.75 : 1,
          border: "none",
          font: "inherit",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          ...style,
        }}
        aria-label="Get BlurGlass for $3.99"
      >
        {loading ? (
          <>
            <svg
              className="spinner-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
            </svg>
            <span>Connecting to Dodo...</span>
          </>
        ) : (
          children || (
            <>
              Get BlurGlass <span>$3.99</span>
            </>
          )
        )}
      </button>
    </>
  );
}
