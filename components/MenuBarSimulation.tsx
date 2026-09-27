"use client";

import { useState } from "react";
import Image from "next/image";

export default function MenuBarSimulation() {
  const [shieldActive, setShieldActive] = useState<boolean>(true);
  const [comfortZone, setComfortZone] = useState<number>(15);
  const [transitionDistance, setTransitionDistance] = useState<number>(18);
  const [menuOpen, setMenuOpen] = useState<boolean>(true);
  const [calibratedTime, setCalibratedTime] = useState<string>("Just now");

  const calibrate = () => {
    const d = new Date();
    setCalibratedTime(
      `${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
    );
  };

  return (
    <section className="container" style={{ paddingBlock: "60px 80px" }}>
      <div
        style={{
          textAlign: "center",
          maxWidth: "620px",
          margin: "0 auto 36px",
        }}
      >
        <h2
          className="section-h2"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
        >
          Designed for your macOS Menu Bar.
        </h2>
        <p className="section-desc">
          Unobtrusive, ultra-lightweight, and respects your focus. Calibrate
          with a click or test your settings directly below.
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
            <span style={{ fontWeight: "600" }}>Finder</span>
            <span style={{ opacity: 0.8 }}>File</span>
            <span style={{ opacity: 0.8 }}>Edit</span>
            <span style={{ opacity: 0.8 }}>View</span>
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
            >
              <Image
                src="/app-icon.png"
                width={16}
                height={16}
                alt="ShyGlass icon"
                style={{ borderRadius: "3px" }}
              />
              <span>
                {shieldActive ? "ShyGlass: Active" : "ShyGlass: Paused"}
              </span>
            </button>
            <span style={{ opacity: 0.8, fontSize: "12px" }}>100% 🔋</span>
            <span style={{ opacity: 0.8, fontSize: "12px" }}>
              Tue Sep 27 10:30 AM
            </span>
          </div>
        </div>

        {/* Menu Bar Dropdown Popover */}
        {menuOpen && (
          <div
            style={{
              maxWidth: "380px",
              marginLeft: "auto",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(24px)",
              borderRadius: "14px",
              padding: "16px",
              color: "var(--ink)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Image
                  src="/app-icon.png"
                  width={28}
                  height={28}
                  alt="ShyGlass"
                  style={{ borderRadius: "6px" }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: "var(--ink)",
                    }}
                  >
                    ShyGlass
                  </div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      color: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#16a34a",
                      }}
                    />
                    AirPods Pro Connected
                  </div>
                </div>
              </div>

              {/* Master toggle switch */}
              <button
                type="button"
                onClick={() => setShieldActive(!shieldActive)}
                style={{
                  width: "42px",
                  height: "24px",
                  borderRadius: "100px",
                  background: shieldActive ? "#34c759" : "#cbd5e1",
                  position: "relative",
                  transition: "background 0.2s ease",
                }}
                aria-label="Toggle shield state"
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    position: "absolute",
                    top: "2px",
                    left: shieldActive ? "20px" : "2px",
                    transition: "left 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            <div
              style={{
                borderTop: "1px solid #e2e8f0",
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={calibrate}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  background: "var(--accent-light)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  color: "var(--ink)",
                  fontWeight: "600",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>🎯 Recenter / Calibrate Gaze</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    fontWeight: "normal",
                  }}
                >
                  {calibratedTime}
                </span>
              </button>

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
                    Comfort Zone Threshold
                  </span>
                  <span style={{ color: "var(--accent)", fontWeight: "650" }}>
                    {comfortZone}°
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={comfortZone}
                  onChange={(e) => setComfortZone(Number(e.target.value))}
                  style={{ width: "100%", height: "4px" }}
                />
              </div>

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
                    Transition Distance
                  </span>
                  <span style={{ color: "var(--accent)", fontWeight: "650" }}>
                    +{transitionDistance}°
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={transitionDistance}
                  onChange={(e) =>
                    setTransitionDistance(Number(e.target.value))
                  }
                  style={{ width: "100%", height: "4px" }}
                />
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "4px",
                }}
              >
                <span>
                  Global Shortcut:{" "}
                  <kbd
                    style={{
                      background: "#f1f5f9",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    ⌥ ⌘ R
                  </kbd>
                </span>
                <span>
                  Press{" "}
                  <kbd
                    style={{
                      background: "#f1f5f9",
                      padding: "2px 5px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    Esc
                  </kbd>{" "}
                  to dismiss
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
