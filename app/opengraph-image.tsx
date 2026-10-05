import { ImageResponse } from 'next/og';

export const alt = 'BlurGlass — Privacy-First Screen Shield for macOS';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c111d',
          backgroundImage:
            'radial-gradient(circle at 50% 15%, rgba(0, 122, 255, 0.25), transparent 65%), radial-gradient(circle at 10% 85%, rgba(16, 185, 129, 0.12), transparent 45%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '60px 80px',
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '100px',
            padding: '8px 24px',
            fontSize: 16,
            fontWeight: 600,
            color: '#93c5fd',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span>macOS 14 Sonoma & 15 Sequoia • Apple Silicon & Intel</span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            BlurGlass
          </div>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#f8fafc',
            textAlign: 'center',
            maxWidth: '920px',
            lineHeight: 1.25,
            marginBottom: '20px',
          }}
        >
          The screen is readable only by you.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 21,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.45,
            marginBottom: '44px',
          }}
        >
          On-device camera intelligence frosts your screen the instant you look away. Zero cloud uploads. 100% private.
        </div>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#007AFF',
              borderRadius: '14px',
              padding: '12px 26px',
              fontSize: 19,
              fontWeight: 700,
              color: '#ffffff',
            }}
          >
            Get BlurGlass — $3.99
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '14px',
              padding: '12px 24px',
              fontSize: 18,
              fontWeight: 500,
              color: '#e2e8f0',
            }}
          >
            Touch ID Keychain Secured
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '14px',
              padding: '12px 24px',
              fontSize: 18,
              fontWeight: 500,
              color: '#e2e8f0',
            }}
          >
            10 FPS On-Device Vision
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
