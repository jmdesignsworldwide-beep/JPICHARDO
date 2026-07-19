import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

// El portal es privado: nunca indexado, nunca enlazado públicamente (salvo el
// acceso discreto del footer). Layout raíz propio (separado del sitio público).
export const metadata: Metadata = {
  title: 'Portal',
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: '#0A1A2F',
  colorScheme: 'dark',
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-navy-900 font-sans text-cream-50 antialiased">
        {children}
      </body>
    </html>
  );
}
