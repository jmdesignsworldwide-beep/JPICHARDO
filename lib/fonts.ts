import { Inter, Newsreader } from 'next/font/google';

// TIPOGRAFÍA DEFINITIVA (bloqueada) — fuente única de verdad.
// Inter → TODO el texto (display, subtítulos, cuerpo, botones, labels, nav).
// Newsreader itálica → SOLO gancho, versículos y citas.

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const fontAccent = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-accent',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

export const fontVariables = `${fontSans.variable} ${fontAccent.variable}`;
