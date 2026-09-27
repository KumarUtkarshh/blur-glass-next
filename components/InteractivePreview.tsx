"use client";

import { useState, useRef, useEffect } from "react";

export default function InteractivePreview() {
  const [activeTab, setActiveTab] = useState<"video" | "interactive">("video");
  const [angle, setAngle] = useState<number>(0);
  const [comfortThreshold, setComfortThreshold] = useState<number>(15);
  const [fullCoverThreshold, setFullCoverThreshold] = useState<number>(33);
  const [isMouseTracking, setIsMouseTracking] = useState<boolean>(false);
  const [screenContentType, setScreenContentType] = useState<"code" | "finance" | "email">("code");
  const simWindowRef = useRef<HTMLDivElement>(null);

  // Calculate blur strength based on angle & comfort threshold
  const absAngle = Math.abs(angle);
  let blurProgress = 0;
  if (absAngle > comfortThreshold) {
    const range = Math.max(1, fullCoverThreshold - comfortThreshold);
    blurProgress = Math.min(1, Math.max(0, (absAngle - comfortThreshold) / range));
  }

  const blurPx = blurProgress * 28; // Up to 28px blur
  const shieldOpacity = blurProgress * 0.94;
  const badgeOpacity = blurProgress > 0.05 ? 1 : 0;
  const badgeScale = 0.85 + blurProgress * 0.15;

  // Track mouse movement if interactive mouse mode is enabled
  useEffect(() => {
    if (!isMouseTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const deltaX = e.clientX - centerX;
      // Map screen delta to -40° to +40°
      const calculatedAngle = Math.round((deltaX / (window.innerWidth / 2)) * 40);
      setAngle(Math.max(-45, Math.min(45, calculatedAngle)));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMouseTracking]);

  // Recenter helper
  const recenter = () => {
    setAngle(0);
    setIsMouseTracking(false);
  };

  const getStatus = () => {
    if (absAngle <= comfortThreshold) {
      return {
        label: `Centered (${absAngle}° / ${comfortThreshold}° zone)`,
        class: "status-active",
      };
    } else if (blurProgress < 0.95) {
      return {
        label: `Shield Transitioning (${absAngle}° • ${Math.round(blurProgress * 100)}% cover)`,
        class: "status-shield",
      };
    } else {
      return {
        label: `Shield Fully Covered (${absAngle}°)`,
        class: "status-full",
      };
    }
  };

  const status = getStatus();

  return (
    <div className="media-container" id="simulator">
      <div className="media-tabs">
        <button
          type="button"
          className={`media-tab-btn ${activeTab === "video" ? "active" : ""}`}
          onClick={() => setActiveTab("video")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Product Film
        </button>
        <button
          type="button"
          className={`media-tab-btn ${activeTab === "interactive" ? "active" : ""}`}
          onClick={() => setActiveTab("interactive")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          Interactive Simulator
        </button>
      </div>

      <div className="product-film-card">
        {activeTab === "video" ? (
          <video
            className="product-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/shyglass-poster.jpg"
            aria-label="ShyGlass blurs the Mac screen when the AirPods wearer looks away."
          >
            <source src="/shyglass.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="simulator-window" ref={simWindowRef}>
            {/* macOS titlebar */}
            <div className="mac-titlebar">
              <div className="traffic-lights">
                <div className="traffic-dot traffic-red" />
                <div className="traffic-dot traffic-yellow" />
                <div className="traffic-dot traffic-green" />
              </div>
              <div className="window-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h10" />
                  <path d="M7 12h10" />
                  <path d="M7 17h10" />
                </svg>
                {screenContentType === "code" && "FinancialEngine.ts — Confidential"}
                {screenContentType === "finance" && "Q3_Revenue_Forecast.xlsx — Highly Sensitive"}
                {screenContentType === "email" && "Inbox — Executive Board Review"}
              </div>
            </div>

            {/* Screen Mockup Content */}
            <div className="simulated-screen-content">
              {screenContentType === "code" && (
                <div style={{ fontFamily: "monospace", fontSize: "13px", lineHeight: "1.7", color: "#cbd5e1" }}>
                  <p style={{ color: "#60a5fa" }}>// Internal Security Key Distribution & Settlement</p>
                  <p><span style={{ color: "#f472b6" }}>const</span> <span style={{ color: "#38bdf8" }}>CLIENT_PORTFOLIO_LEDGER</span> = &#123;</p>
                  <p style={{ paddingLeft: "20px" }}>totalValuation: <span style={{ color: "#34d399" }}>&quot;$48,920,400.00 USD&quot;</span>,</p>
                  <p style={{ paddingLeft: "20px" }}>clearingVaultKey: <span style={{ color: "#fbbf24" }}>&quot;sec_live_9940xca771b&quot;</span>,</p>
                  <p style={{ paddingLeft: "20px" }}>primarySigner: <span style={{ color: "#f87171" }}>&quot;0x89A...43F1&quot;</span>,</p>
                  <p style={{ paddingLeft: "20px" }}>status: <span style={{ color: "#a78bfa" }}>&quot;CONFIDENTIAL_AUTHORIZATION&quot;</span></p>
                  <p>&#125;;</p>
                  <p style={{ marginTop: "12px", color: "#94a3b8" }}>
                    &gt; Execute biometric escrow protocol... verified via Apple Secure Enclave.
                  </p>
                </div>
              )}

              {screenContentType === "finance" && (
                <div style={{ fontSize: "13px", color: "#e2e8f0" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "12px", color: "#38bdf8" }}>
                    Acquisition & Enterprise Valuation Matrix
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Projected ARR</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#34d399" }}>$14.8M</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Target Multiplier</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#fbbf24" }}>18.5x</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>Implied Enterprise Value</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#60a5fa" }}>$273.8M</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "16px", fontSize: "12px", color: "#94a3b8" }}>
                    * Restricted to C-Suite and Legal counsel under strict NDA.
                  </div>
                </div>
              )}

              {screenContentType === "email" && (
                <div style={{ fontSize: "13.5px", color: "#e2e8f0", lineHeight: "1.6" }}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", marginBottom: "10px" }}>
                    <span style={{ color: "#94a3b8" }}>Subject: </span>
                    <strong style={{ color: "#f8fafc" }}>Privileged Counsel Memorandum: Patent Filing Strategy</strong>
                  </div>
                  <p>Hi Team,</p>
                  <p>We have finalized the provisional patents for real-time AirPods sensor orientation shield algorithms...</p>
                </div>
              )}
            </div>

            {/* Dynamic Frosted Shield Blur Overlay */}
            <div
              className="sim-blur-overlay"
              style={
                {
                  "--blur-amount": `${blurPx}px`,
                  "--shield-opacity": shieldOpacity,
                  "--badge-scale": badgeScale,
                  "--badge-opacity": badgeOpacity,
                  "--blur-origin": angle >= 0 ? "70% 50%" : "30% 50%",
                } as React.CSSProperties
              }
            >
              <div className="sim-blur-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>ShyGlass Shield Protected</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Interactive Control Strip */}
      {activeTab === "interactive" && (
        <div className="simulator-controls">
          <div className="control-row">
            <div className="control-label-group">
              <span className="control-label">Head Turn Angle (Yaw)</span>
              <span className="control-hint">Simulate looking away from your Mac</span>
            </div>
            <div className="control-slider-wrap">
              <button
                type="button"
                onClick={() => setAngle((prev) => Math.max(-40, prev - 5))}
                style={{ fontSize: "16px", padding: "4px 8px", background: "var(--accent-light)", borderRadius: "6px" }}
                title="Turn Left"
              >
                ◀
              </button>
              <input
                type="range"
                min="-40"
                max="40"
                value={angle}
                onChange={(e) => {
                  setIsMouseTracking(false);
                  setAngle(Number(e.target.value));
                }}
                className="control-slider"
                aria-label="Head turn angle slider"
              />
              <button
                type="button"
                onClick={() => setAngle((prev) => Math.min(40, prev + 5))}
                style={{ fontSize: "16px", padding: "4px 8px", background: "var(--accent-light)", borderRadius: "6px" }}
                title="Turn Right"
              >
                ▶
              </button>
              <span className="angle-readout">{angle > 0 ? `+${angle}°` : `${angle}°`}</span>
            </div>
            <button
              type="button"
              onClick={recenter}
              style={{
                padding: "6px 14px",
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontWeight: "600",
                color: "var(--ink)",
              }}
            >
              Recenter (0°)
            </button>
          </div>

          <div className="control-row" style={{ paddingTop: "8px", borderTop: "1px solid var(--line-light)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12.5px", color: "var(--muted)", fontWeight: "500" }}>Presets:</span>
              <button
                type="button"
                onClick={() => { setIsMouseTracking(false); setAngle(0); }}
                style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "6px", background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                Looking Ahead (0°)
              </button>
              <button
                type="button"
                onClick={() => { setIsMouseTracking(false); setAngle(18); }}
                style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "6px", background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                Glance (18°)
              </button>
              <button
                type="button"
                onClick={() => { setIsMouseTracking(false); setAngle(35); }}
                style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "6px", background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                Look Away (35°)
              </button>
              <button
                type="button"
                onClick={() => setIsMouseTracking(!isMouseTracking)}
                style={{
                  fontSize: "12px",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  background: isMouseTracking ? "var(--ink)" : "var(--paper)",
                  color: isMouseTracking ? "var(--white)" : "var(--ink)",
                  border: "1px solid var(--line)",
                  fontWeight: "600",
                }}
              >
                {isMouseTracking ? "Disable Cursor Tracking" : "Track Mouse Cursor"}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className={`simulator-status-pill ${status.class}`}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor" }} />
                {status.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
