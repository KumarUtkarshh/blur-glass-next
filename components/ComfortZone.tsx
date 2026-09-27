"use client";

import { useState } from "react";

export default function ComfortZone() {
  const [testAngle, setTestAngle] = useState<number>(14);
  const comfortThreshold = 22;
  const maxDeg = 45;
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
            Choose how much movement feels normal. A configurable 22° zone ignores natural minor head shifts you make while reading, typing, and thinking.
          </p>
        </div>

        <div className="degree-scale-card">
          <div
            className="scale-track-wrap"
            aria-label="Default shield response from center through comfort threshold"
          >
            <div className="scale-track-bar">
              <i style={{ left: "0%" }} />
              <i style={{ left: "48.8%" }} />
              <i style={{ left: "100%" }} />

              <div
                className="scale-cursor-indicator"
                style={{ left: `${indicatorPercent}%` }}
                title={`Tested angle: ${testAngle}°`}
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
              <b>22°</b>
            </span>
            <span>
              Glance away
              <b>45°</b>
            </span>
          </div>

          <div className="scale-interactive-slider">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--ink)" }}>
                Test Sensitivity Scale: <span style={{ color: "var(--accent)" }}>{testAngle}°</span>
              </span>
              <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: "500" }}>
                {testAngle <= comfortThreshold
                  ? "Clear & Focused (Within Zone)"
                  : "Shield Engaged (Gaze Exited)"}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              value={testAngle}
              onChange={(e) => setTestAngle(Number(e.target.value))}
              style={{ width: "100%", height: "6px", cursor: "pointer", marginTop: "12px" }}
              aria-label="Test degree slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
