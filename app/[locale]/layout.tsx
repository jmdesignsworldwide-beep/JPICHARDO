import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { JsonLd } from '@/components/seo/JsonLd';
import { churchJsonLd } from '@/lib/jsonld';
import { site } from '@/lib/config';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0A1A2F',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} · ${site.ministry}`,
      template: `%s · ${site.name}`,
    },
    description:
      locale === 'en'
        ? 'A church with a fresh message to bless you. Home of the book “Comenzando Mi Viaje” by Pastor José Pichardo.'
        : 'Una iglesia con un mensaje fresco para bendecirte. Hogar del libro “Comenzando Mi Viaje” del Pastor José Pichardo.',
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/logo-jpichardo.png' }],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: '/logo-jpichardo.png',
          width: 1254,
          height: 1254,
          alt: `${site.name} · ${site.ministry}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Habilita renderizado estático con next-intl.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-navy-900 font-sans text-cream-50 antialiased">
        <JsonLd data={churchJsonLd} />
        <SmoothScroll />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-label focus:text-xs focus:uppercase focus:text-navy-900"
          >
            {locale === 'en' ? 'Skip to content' : 'Saltar al contenido'}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
