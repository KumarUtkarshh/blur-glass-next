"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "What does BlurGlass actually do?",
      a: "BlurGlass uses your Mac's camera at 10 FPS to track head pose and gaze. The instant you look away, step away from your desk, or an unauthorized face enters view, an impenetrable frosted shield blurs your display in milliseconds.",
    },
    {
      q: "Does BlurGlass record or upload camera video?",
      a: "Never. All camera processing happens strictly in volatile RAM using Apple's on-device Vision framework. Frames are immediately discarded. No video is ever saved to disk or transmitted across any network.",
    },
    {
      q: "How are owner biometric templates secured?",
      a: "Your enrolled face vector embeddings are sealed directly inside your Mac's hardware-encrypted Keychain using Touch ID (kSecAttrAccessibleWhenUnlockedThisDeviceOnly). Nobody else can unlock or disable your shield.",
    },
    {
      q: "Which hardware and macOS versions are supported?",
      a: "BlurGlass requires macOS 14 Sonoma or macOS 15 Sequoia with a built-in FaceTime HD camera or external USB/Thunderbolt webcam. Both Apple Silicon (M1/M2/M3/M4) and Intel Macs are fully supported.",
    },
    {
      q: "Can I adjust sensitivity and response thresholds?",
      a: "Yes. The natural comfort zone ranges from 5° to 45°, letting you ignore normal reading movements while immediately shielding your screen when you glance away or leave your workspace.",
    },
    {
      q: "Is it a subscription?",
      a: "No. BlurGlass is a $4.99 one-time purchase with no recurring fees, lifetime updates, and licensing for up to 5 personal Macs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="faq-section"
      id="questions"
      aria-labelledby="questions-title"
    >
      <div className="container faq-grid">
        <div>
          <h2 id="questions-title" className="section-h2">
            A few useful details.
          </h2>
          <p className="section-desc">
            What BlurGlass sees, what it needs, and what stays strictly private
            on your Mac.
          </p>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="faq-item"
                style={{
                  borderBottom:
                    idx === faqs.length - 1 ? "none" : "1px solid var(--line)",
                }}
              >
                <div
                  className="faq-summary"
                  onClick={() => toggle(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      toggle(idx);
                    }
                  }}
                >
                  <span>{faq.q}</span>
                  <div
                    className="faq-icon-toggle"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </div>
                </div>
                {isOpen && <p className="faq-answer">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
