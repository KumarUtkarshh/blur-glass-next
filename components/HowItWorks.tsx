"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Center your gaze",
      description:
        "Put on your AirPods and look at your screen. Calibrate from the menu bar or press your shortcut so the app precisely locks where your display is positioned.",
    },
    {
      number: "2",
      title: "Turn naturally",
      description:
        "A configurable 2–30° comfort zone, set to 15° by default, ignores natural minor movements you make while reading, typing, and thinking.",
    },
    {
      number: "3",
      title: "Let the screen soften",
      description:
        "Cross the comfort zone and a full-screen frosted glass gradient starts covering your screen with a smooth transition distance before the entire display becomes fully blurred.",
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
          <h2 id="how-title" className="section-h2">
            A quiet reflex for your Mac.
          </h2>
          <p className="section-desc">
            Set it once from the menu bar, then let your AirPods handle the rest
            seamlessly in the background.
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
