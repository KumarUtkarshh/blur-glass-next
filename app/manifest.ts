import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BlurGlass — Privacy-First Screen Shield for macOS',
    short_name: 'BlurGlass',
    description:
      'BlurGlass uses on-device camera intelligence to shield your screen the moment you look away, step away, or someone glances over your shoulder.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/app_icon_128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/app_icon_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/app_icon_1024.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  };
}
