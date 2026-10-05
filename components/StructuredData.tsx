export default function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://blurglass.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#software`,
        "name": "BlurGlass",
        "headline": "Privacy-First Screen Shield for macOS",
        "description": "BlurGlass uses on-device camera intelligence to instantly shield your macOS screen whenever you look away, step away, or someone glances over your shoulder. Zero cloud uploads, 100% private.",
        "operatingSystem": "macOS 14 Sonoma, macOS 15 Sequoia or later",
        "applicationCategory": "SecurityApplication",
        "applicationSubCategory": "Privacy & Screen Protection",
        "softwareVersion": "1.0.0",
        "price": "3.99",
        "priceCurrency": "USD",
        "offers": {
          "@type": "Offer",
          "price": "3.99",
          "priceCurrency": "USD",
          "priceValidUntil": "2030-12-31",
          "availability": "https://schema.org/InStock",
          "url": baseUrl,
          "seller": {
            "@type": "Organization",
            "name": "BlurGlass",
            "url": baseUrl
          }
        },
        "featureList": [
          "10 FPS on-device gaze and head pose detection via Apple Vision framework",
          "Hardware-encrypted Touch ID keychain biometric enrollment",
          "Configurable 5° to 45° comfort zone glance angle",
          "System-wide impenetrable NSPanel frosted overlay across all Spaces",
          "Zero cloud uploads - all processing in volatile RAM",
          "Apple Silicon (M1, M2, M3, M4) and Intel Mac support"
        ],
        "screenshot": `${baseUrl}/app_icon_1024.png`,
        "image": `${baseUrl}/app_icon_1024.png`,
        "author": {
          "@type": "Organization",
          "name": "BlurGlass",
          "url": baseUrl
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "128",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "BlurGlass",
        "description": "Privacy-first screen shield for macOS using on-device vision intelligence.",
        "publisher": {
          "@type": "Organization",
          "name": "BlurGlass",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/app_icon_1024.png`
          }
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "BlurGlass",
        "url": baseUrl,
        "logo": `${baseUrl}/app_icon_1024.png`
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does BlurGlass actually do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BlurGlass uses your Mac's camera at 10 FPS to track head pose and gaze. The instant you look away, step away from your desk, or an unauthorized face enters view, an impenetrable frosted shield blurs your display in milliseconds."
            }
          },
          {
            "@type": "Question",
            "name": "Does BlurGlass record or upload camera video?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Never. All camera processing happens strictly in volatile RAM using Apple's on-device Vision framework. Frames are immediately discarded. No video is ever saved to disk or transmitted across any network."
            }
          },
          {
            "@type": "Question",
            "name": "How are owner biometric templates secured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your enrolled face vector embeddings are sealed directly inside your Mac's hardware-encrypted Keychain using Touch ID (kSecAttrAccessibleWhenUnlockedThisDeviceOnly). Nobody else can unlock or disable your shield."
            }
          },
          {
            "@type": "Question",
            "name": "Which hardware and macOS versions are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BlurGlass requires macOS 14 Sonoma or macOS 15 Sequoia with a built-in FaceTime HD camera or external USB/Thunderbolt webcam. Both Apple Silicon (M1/M2/M3/M4) and Intel Macs are fully supported."
            }
          },
          {
            "@type": "Question",
            "name": "Can I adjust sensitivity and response thresholds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The natural comfort zone ranges from 5° to 45°, letting you ignore normal reading movements while immediately shielding your screen when you glance away or leave your workspace."
            }
          },
          {
            "@type": "Question",
            "name": "Is it a subscription?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. BlurGlass is a $3.99 one-time purchase with no recurring fees, lifetime updates, and licensing for up to 5 personal Macs."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
