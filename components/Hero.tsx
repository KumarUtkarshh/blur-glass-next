"use client";

import InteractivePreview from "./InteractivePreview";

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            The screen is readable only by you.
          </h1>

          <p className="hero-intro">
            BlurGlass uses on-device camera intelligence to frost your screen
            the moment you look away or a second face enters view.
          </p>

          <div className="hero-purchase">
            <a
              className="buy-button"
              data-buy
              href="https://buy.polar.sh/polar_cl_eXbMk6MFQGpY3czW4xuZaFpYgRfg0YXdZxz5u1tOWjl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get BlurGlass <span>$3.99</span>
            </a>
          </div>

          <ul className="hero-notes" aria-label="Product requirements">
            <li>macOS 14+</li>
            <li>FaceTime HD / Webcam</li>
            <li>Zero Cloud Uploads</li>
          </ul>
        </div>

        <InteractivePreview />
      </div>
    </section>
  );
}
