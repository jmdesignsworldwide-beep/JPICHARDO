import { Fraunces, Manrope, IBM_Plex_Mono } from 'next/font/google';

// Display / títulos — serif con carácter editorial (ejes ópticos, remates).
// El rostro de la marca. Se usa también para citas en itálica.
export const fontDisplay = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

// Cuerpo — sans moderna, limpia y premium.
export const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

// Utility / labels / eyebrows — mono en mayúsculas con tracking amplio.
export const fontLabel = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-label',
  weight: ['400', '500', '600'],
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable} ${fontLabel.variable}`;
