"use client";

export default function Compatibility() {
  const blocks = [
    {
      title: "Camera Vision",
      subtitle: "Face & Head Pose Tracking",
      badge: "10 FPS",
      specs: "Apple Vision Framework on-device",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
    },
    {
      title: "Touch ID Enrollment",
      subtitle: "Keychain-Secured Biometrics",
      badge: "Encrypted",
      specs: "Local feature prints in Keychain",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: "System-Wide Shield",
      subtitle: "Impenetrable Frost Overlay",
      badge: "NSPanel",
      specs: "Assistive-tech level across all Spaces",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="compatibility-section" id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="container compatibility-grid">
        <div>
          <h2 id="how-it-works-title" className="section-h2">
            How BlurGlass works.
          </h2>
          <p className="section-desc">
            All face detection and gaze tracking happens directly on your Mac.
            Nothing is ever uploaded, recorded, or saved to disk.
          </p>
        </div>

        <div>
          <div className="model-cards" aria-label="BlurGlass core technology">
            {blocks.map((block, idx) => (
              <div key={idx} className="model-card">
                <div>
                  <div className="model-card-header">
                    <div className="model-icon">{block.icon}</div>
                    <span className="model-badge">{block.badge}</span>
                  </div>
                  <div className="model-title">{block.title}</div>
                  <div className="model-subtitle">{block.subtitle}</div>
                </div>
                <div style={{ marginTop: "16px", fontSize: "11.5px", color: "var(--muted-light)" }}>
                  {block.specs}
                </div>
              </div>
            ))}
          </div>

          <p className="compatibility-note">
            Compatible with any Mac running macOS 14 Sonoma or later with a FaceTime HD or external webcam.
          </p>
        </div>
      </div>
    </section>
  );
}
