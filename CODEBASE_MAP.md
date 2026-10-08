# Codebase Architecture Map

```mermaid
mindmap
root((blur-glass-next))
  EntryPoints
    [app/layout.tsx]
    [app/page.tsx]
  Pages & Routes
    Marketing
      (Hero & Video Player)
      (Compatibility Specs)
      (Comfort Zone Slider)
      (FAQ Accordion)
    Checkout & Post-Purchase
      [app/checkout/success/page.tsx]
  API & Backend
    Checkout Session
      [app/api/checkout/route.ts]
    Binary Delivery
      [app/api/download/route.ts]
    Webhooks
      [app/api/webhooks/dodo/route.ts]
  UI Components
    Hero Fold
      [Hero.tsx]
      [InteractivePreview.tsx]
    Actions & Payments
      [CheckoutButton.tsx]
    Feature Showcases
      [ComfortZone.tsx]
      [Compatibility.tsx]
      [FAQ.tsx]
    Navigation & Layout
      [Header.tsx]
      [Footer.tsx]
    Icons
      [icons/apple-brand-logo.tsx]
      [icons/download-icon.tsx]
  Infrastructure & SDKs
    Payments Layer
      [lib/dodopayments.ts]
    Public Media Assets
      [public/blurglass.mp4]
      [public/app_icon.svg]
  Native Desktop App
    [blur_glass_source]
      (Flutter macOS Engine)
      (Apple Vision Detection)
```

## High-Level State & Context Cache

- **Current Technical Debt:** Automated headless browser testing encountered driver CDN connectivity issues; local testing works via Next.js dev server on port 3000.
- **Active Feature Branch Context:** Embedded hero video player with macOS window frame, sound toggle, interactive scrubber, and direct checkout CTA.
- **Critical Absolute Paths:**
  - Landing Page: `/Users/utkarsh/Documents/blur-glass-next/app/page.tsx`
  - Video Preview: `/Users/utkarsh/Documents/blur-glass-next/components/InteractivePreview.tsx`
  - Checkout Button: `/Users/utkarsh/Documents/blur-glass-next/components/CheckoutButton.tsx`
  - Checkout API: `/Users/utkarsh/Documents/blur-glass-next/app/api/checkout/route.ts`
  - Dodo Payments Client: `/Users/utkarsh/Documents/blur-glass-next/lib/dodopayments.ts`
  - Styling: `/Users/utkarsh/Documents/blur-glass-next/app/globals.css`
