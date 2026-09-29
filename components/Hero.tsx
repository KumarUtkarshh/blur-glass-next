"use client";

import InteractivePreview from "./InteractivePreview";
import CheckoutButton from "./CheckoutButton";

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
            <CheckoutButton className="buy-button">
              Get BlurGlass <span>$3.99</span>
            </CheckoutButton>
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
