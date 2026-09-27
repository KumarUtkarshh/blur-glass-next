"use client";

import { useState } from "react";

export default function MenuBarSimulation() {
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [yawThreshold, setYawThreshold] = useState<number>(22);
  const [pitchThreshold, setPitchThreshold] = useState<number>(24);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [enrolledTime, setEnrolledTime] = useState<string>("Touch ID Verified");

  const reEnroll = () => {
    setEnrolledTime("Re-enrolled via Touch ID");
  };

  return (
    <section className="container" id="menu-bar" style={{ paddingBlock: "60px 80px" }}>
      <div
        style={{
          textAlign: "center",
          maxWidth: "580px",
          margin: "0 auto 32px",
        }}
      >
        <div className="section-eyebrow" style={{ textAlign: "center" }}>macOS Integration</div>
        <h2
          className="section-h2"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
        >
          Menu Bar Control
        </h2>
        <p className="section-desc">
          Toggle protection or tune gaze sensitivity with a single click.
        </p>
      </div>

      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Mock macOS Top Menu Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(16px)",
            padding: "8px 16px",
            borderRadius: "12px",
            color: "#f8fafc",
            fontSize: "13px",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "15px" }}></span>
            <span style={{ fontWeight: "600" }}>BlurGlass</span>
            <span style={{ opacity: 0.8 }}>Protection</span>
            <span style={{ opacity: 0.8 }}>Sensitivity</span>
            <span style={{ opacity: 0.8 }}>Window</span>
            <span style={{ opacity: 0.8 }}>Help</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: menuOpen ? "rgba(255,255,255,0.22)" : "transparent",
                padding: "3px 8px",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "12.5px",
                transition: "background 0.15s ease",
              }}
              title="Click to toggle BlurGlass menu popover"
            >
              <span style={{ fontSize: "13px" }}>🛡️</span>
              <span>
                {shieldActive ? "Active" : "Paused"}
              </span>
            </button>
            <span style={{ opacity: 0.8, fontSize: "12px" }}>100% 🔋</span>
            <span style={{ opacity: 0.8, fontSize: "12px" }}>
              Tue 10:30 AM
            </span>
          </div>
        </div>

        {/* Menu Bar Dropdown Popover */}
        {menuOpen && (
          <div
            style={{
              maxWidth: "380px",
              marginLeft: "auto",
              background: "rgba(255, 255, 255, 0.96)",
              backdropFilter: "blur(24px)",
              borderRadius: "14px",
              padding: "16px",
              color: "var(--ink)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            {/* Header / Status row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "var(--ink)",
                  }}
                >
                  BlurGlass
                </div>
                <div
                  style={{
                    fontSize: "11.5px",
                    color: shieldActive ? "#16a34a" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontWeight: "550",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: shieldActive ? "#16a34a" : "#94a3b8",
                    }}
                  />
                  {shieldActive ? "FaceTime HD (10 FPS)" : "Paused"}
                </div>
              </div>

              {/* Master toggle switch */}
              <button
                type="button"
                onClick={() => setShieldActive(!shieldActive)}
                style={{
                  width: "44px",
                  height: "26px",
                  borderRadius: "100px",
                  background: shieldActive ? "#34c759" : "#cbd5e1",
                  position: "relative",
                  transition: "background 0.2s ease",
                  cursor: "pointer",
                }}
                aria-label="Toggle shield state"
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    position: "absolute",
                    top: "2px",
                    left: shieldActive ? "20px" : "2px",
                    transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            {/* Controls body */}
            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Enrollment status button */}
              <button
                type="button"
                onClick={reEnroll}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "var(--accent-light)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  color: "var(--ink)",
                  fontWeight: "600",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Keychain Biometrics</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    fontWeight: "500",
                  }}
                >
                  {enrolledTime}
                </span>
              </button>

              {/* Yaw slider */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "var(--ink)", fontWeight: "600" }}>
                    Yaw Tolerance (Left/Right)
                  </span>
                  <span style={{ color: "var(--accent)", fontWeight: "700" }}>
                    ±{yawThreshold}°
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  value={yawThreshold}
                  onChange={(e) => setYawThreshold(Number(e.target.value))}
                  style={{ width: "100%", height: "4px" }}
                />
              </div>

              {/* Pitch slider */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "var(--ink)", fontWeight: "600" }}>
                    Pitch Tolerance (Up/Down)
                  </span>
                  <span style={{ color: "var(--accent)", fontWeight: "700" }}>
                    ±{pitchThreshold}°
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  value={pitchThreshold}
                  onChange={(e) => setPitchThreshold(Number(e.target.value))}
                  style={{ width: "100%", height: "4px" }}
                />
              </div>

              {/* Hotkey Info footer */}
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "6px",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <span>
                  Toggle: <kbd style={{ background: "#f1f5f9", padding: "2px 5px", borderRadius: "4px", border: "1px solid #cbd5e1" }}>⌥ ⌘ R</kbd>
                </span>
                <span>
                  Override: <kbd style={{ background: "#f1f5f9", padding: "2px 5px", borderRadius: "4px", border: "1px solid #cbd5e1" }}>Esc</kbd>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
