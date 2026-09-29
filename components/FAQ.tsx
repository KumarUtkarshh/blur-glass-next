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
      a: "No. BlurGlass is a $3.99 one-time purchase with no recurring fees, lifetime updates, and licensing for up to 5 personal Macs.",
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
                className={`faq-item ${isOpen ? "open" : ""}`}
                style={{
                  borderBottom:
                    idx === faqs.length - 1 ? "none" : "1px solid var(--line)",
                }}
              >
                <button
                  type="button"
                  className="faq-summary"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <span>{faq.q}</span>
                  <div
                    className={`faq-icon-toggle ${isOpen ? "open" : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="faq-plus-svg"
                    >
                      <path
                        d="M7 2.5V11.5M2.5 7H11.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
