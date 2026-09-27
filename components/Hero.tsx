"use client";

import InteractivePreview from "./InteractivePreview";

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>AirPods Motion Sensor Technology</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Look away and hide your screen.
          </h1>

          <p className="hero-intro">
            ShyGlass uses the motion sensors in your AirPods to blur your Mac
            when your attention moves elsewhere. Look back and everything
            clears.
          </p>

          <div className="hero-purchase">
            <a
              className="buy-button"
              data-buy
              href="https://buy.polar.sh/polar_cl_eXbMk6MFQGpY3czW4xuZaFpYgRfg0YXdZxz5u1tOWjl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get ShyGlass <span>$3.99</span>
            </a>
            <p className="purchase-note">
              One payment. Use it on up to five Macs.
            </p>
          </div>

          <ul className="hero-notes" aria-label="Product requirements">
            <li>macOS 14 or later</li>
            <li>AirPods 3, Pro, or Max</li>
            <li>No subscription</li>
          </ul>
        </div>

        <InteractivePreview />
      </div>
    </section>
  );
}
