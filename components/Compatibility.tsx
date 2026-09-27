"use client";

export default function Compatibility() {
  const models = [
    {
      title: "AirPods",
      subtitle: "3rd generation or later",
      badge: "Supported",
      specs: "Spatial Audio Head Tracking Gyroscopes",
    },
    {
      title: "AirPods Pro",
      subtitle: "All generations (1st & 2nd Gen USB-C / Lightning)",
      badge: "Supported",
      specs: "Dual Optical Sensors & Accelerometers",
    },
    {
      title: "AirPods Max",
      subtitle: "All generations (Lightning & USB-C)",
      badge: "Supported",
      specs: "Nine Microphones & Precision Gyroscope Array",
    },
  ];

  return (
    <section className="compatibility-section" id="compatibility" aria-labelledby="compatibility-title">
      <div className="container compatibility-grid">
        <div>
          <h2 id="compatibility-title" className="section-h2">
            Works with head-tracking AirPods.
          </h2>
          <p className="section-desc">
            ShyGlass reads the same motion sensors Apple uses for dynamic head tracking.
            Keep your AirPods connected to your Mac while the shield is running.
          </p>
        </div>

        <div>
          <div className="model-cards" aria-label="Compatible AirPods models">
            {models.map((model, idx) => (
              <div key={idx} className="model-card">
                <div>
                  <div className="model-card-header">
                    <div className="model-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                      </svg>
                    </div>
                    <span className="model-badge">{model.badge}</span>
                  </div>
                  <div className="model-title">{model.title}</div>
                  <div className="model-subtitle">{model.subtitle}</div>
                </div>
                <div style={{ marginTop: "16px", fontSize: "11.5px", color: "var(--muted-light)" }}>
                  {model.specs}
                </div>
              </div>
            ))}
          </div>

          <p className="compatibility-note">
            Standard AirPods 1 and 2 aren&apos;t supported.{" "}
            <a
              href="https://support.apple.com/guide/airpods/control-spatial-audio-and-head-tracking-dev00eb7e0a3/web"
              target="_blank"
              rel="noopener noreferrer"
            >
              See Apple&apos;s head-tracking guide.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
