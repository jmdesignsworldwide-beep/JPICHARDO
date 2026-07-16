import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Sora,
} from 'next/font/google';

// Títulos / display — serif editorial (como el título del libro)
export const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

// Citas — Cormorant Garamond
export const fontQuote = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quote',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

// Cuerpo — limpio y legible
export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// Acentos / etiquetas — geométrica moderna
export const fontLabel = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-label',
  weight: ['400', '500', '600', '700'],
});

export const fontVariables = `${fontDisplay.variable} ${fontQuote.variable} ${fontBody.variable} ${fontLabel.variable}`;
