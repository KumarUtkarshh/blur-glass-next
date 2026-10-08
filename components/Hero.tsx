"use client";

import InteractivePreview from "./InteractivePreview";
import CheckoutButton from "./CheckoutButton";

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="pulse-dot" />
            Apple Vision Intelligence for macOS
          </div>

          <h1 id="hero-title" className="hero-title">
            The screen is readable only by you.
          </h1>

          <p className="hero-intro">
            BlurGlass uses on-device Apple Vision camera intelligence to frost
            your macOS screen the moment you look away, step away, or a second
            face enters view.
          </p>

          <div className="hero-purchase">
            <CheckoutButton
              className="buy-button"
              aria-label="Purchase BlurGlass for $3.99 one-time"
            >
              Get BlurGlass <span>$3.99</span>
            </CheckoutButton>
          </div>
        </div>

        <InteractivePreview />
      </div>
    </section>
  );
}
