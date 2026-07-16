import { Space_Grotesk, Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// Display / títulos — grotesque moderna de alto contraste (look Vercel/Linear).
export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

// Acento — serif italic refinada SOLO para el gancho y el versículo (calidez).
export const fontAccent = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-accent',
  weight: ['400'],
  style: ['normal', 'italic'],
});

// Body → Geist Sans · Labels/eyebrows → Geist Mono (self-hosted, Vercel).
// Exponen --font-geist-sans / --font-geist-mono.
export const fontVariables = `${fontDisplay.variable} ${fontAccent.variable} ${GeistSans.variable} ${GeistMono.variable}`;
