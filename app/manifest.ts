import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.ministry}`,
    short_name: site.name,
    description: 'Somos una iglesia con un mensaje fresco para bendecirte.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1A2F',
    theme_color: '#0A1A2F',
    icons: [
      {
        src: '/logo-jpichardo.png',
        sizes: '1254x1254',
        type: 'image/png',
        purpose: 'any',
      },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
