"use client";

import { useState } from "react";

export default function ComfortZone() {
  const [testAngle, setTestAngle] = useState<number>(15);
  const comfortThreshold = 15;
  const fullCoverOffset = 18; // 15 + 18 = 33 deg

  // Calculate position percentage from 0 to 45 degrees
  const maxDeg = 40;
  const indicatorPercent = Math.min(100, (testAngle / maxDeg) * 100);

  return (
    <section className="comfort-section" id="comfort" aria-labelledby="comfort-title">
      <div className="container comfort-grid">
        <div className="comfort-copy">
          <h2 id="comfort-title" className="section-h2">
            Room to move.
            <br />
            Nothing to manage.
          </h2>
          <p className="section-desc">
            Choose how much movement feels normal, adjust the blur strength, and
            assign your own global shortcut for recentering. Escape always clears an active shield.
          </p>
        </div>

        <div className="degree-scale-card">
          <div
            className="scale-track-wrap"
            aria-label="Default shield response from center through eighteen degrees past the comfort threshold"
          >
            <div className="scale-track-bar">
              <i style={{ left: "0%" }} />
              <i style={{ left: "37.5%" }} />
              <i style={{ left: "82.5%" }} />
              <i style={{ left: "100%" }} />

              {/* Real-time interactive cursor indicator */}
              <div
                className="scale-cursor-indicator"
                style={{ left: `${indicatorPercent}%` }}
                title={`Current tested angle: ${testAngle}°`}
              />
            </div>
          </div>

          <div className="scale-labels">
            <span>
              Centered
              <b>0°</b>
            </span>
            <span>
              Default comfort
              <b>15°</b>
            </span>
            <span>
              Default full cover
              <b>+18° (33°)</b>
            </span>
          </div>

          <div className="scale-interactive-slider">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--ink)" }}>
                Test Sensitivity Scale: <span style={{ color: "var(--accent)" }}>{testAngle}°</span>
              </span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                {testAngle <= comfortThreshold
                  ? "✓ Crisp & Unblurred (Clear)"
                  : testAngle < comfortThreshold + fullCoverOffset
                  ? `⚡ Softening (${Math.round(((testAngle - comfortThreshold) / fullCoverOffset) * 100)}% Blur)`
                  : "🔒 100% Shielded"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={testAngle}
              onChange={(e) => setTestAngle(Number(e.target.value))}
              style={{ width: "100%", height: "6px", cursor: "pointer" }}
              aria-label="Test degree slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
