"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Touch ID Biometric Enrollment",
      description:
        "Enroll your face in under 5 seconds with Touch ID. BlurGlass creates 10 encrypted mathematical feature prints stored strictly in your Mac Keychain (never synced to the cloud).",
    },
    {
      number: "2",
      title: "10 FPS Local Vision Processing",
      description:
        "Apple's native Vision framework monitors face bounding boxes, head yaw/pitch angles, and biometric match distance with negligible CPU and battery usage.",
    },
    {
      number: "3",
      title: "System-Wide Frosted Shield",
      description:
        "Cross your gaze threshold, leave your desk, or introduce a second person into the frame, and a hardware-accelerated frost shield covers all Spaces, apps, and connected screens.",
    },
  ];

  return (
    <section
      className="how-section"
      id="how-it-works"
      aria-labelledby="how-title"
    >
      <div className="container how-grid">
        <div>
          <div className="section-eyebrow">Architecture & Flow</div>
          <h2 id="how-title" className="section-h2">
            Engineered for pure privacy and zero friction.
          </h2>
          <p className="section-desc">
            BlurGlass operates quietly in the background as a lightweight macOS agent.
            No accounts, no telemetry, and no video files ever touch disk.
          </p>
        </div>

        <ol className="steps-list">
          {steps.map((step) => (
            <li key={step.number} className="step-item">
              <span className="step-number">{step.number}</span>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
