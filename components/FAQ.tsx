"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      q: "What does ShyGlass actually do?",
      a: "It reads head-motion data from compatible AirPods and compares it with the position you calibrated as center. Once you move beyond your comfort zone, a directional frosted blur covers your screen until you look back.",
    },
    {
      q: "Which hardware do I need?",
      a: "You need a Mac running macOS 14 (Sonoma) or later and AirPods 3 or later, AirPods Pro, or AirPods Max. Standard AirPods 1 and 2 don’t support head tracking. The app confirms the connection in Settings before you enable the shield.",
    },
    {
      q: "Do I need to wear both AirPods?",
      a: "No. ShyGlass receives head-motion data from one compatible earbud, so the other can stay in its charging case.",
    },
    {
      q: "Why does it need Screen Recording permission?",
      a: "The blur is rendered from a current snapshot of your display. That snapshot stays in memory on your Mac, is never saved, and is never uploaded anywhere. Capture immediately stops when the shield is clear.",
    },
    {
      q: "Can I adjust when the blur begins?",
      a: "Yes. The natural-movement setting starts at 15° and ranges from 2° to 30°. Full coverage is separately adjustable from 5° to 30°. You can recenter with the shield on or off from the menu bar or your chosen keyboard shortcut.",
    },
    {
      q: "Is it a subscription?",
      a: "No. ShyGlass is $3.99 once, with no recurring charges or account lock-in, and one license can be activated on up to five of your personal Macs.",
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
            What ShyGlass sees, what it needs, and what stays strictly private
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
