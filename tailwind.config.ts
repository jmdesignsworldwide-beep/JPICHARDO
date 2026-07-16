import type { Config } from 'tailwindcss';

/**
 * SISTEMA DE DISEÑO LOCKED — base oscura y sobria; el dorado entra como LUZ.
 * Paleta (6 valores nombrados):
 *   midnight #0B1220 · navy #14233D · gold #C9A24B · gold-lite #E8CE8A
 *   bone #F3EEE3 · slate #8A97AD
 * Se conservan los nombres de clase existentes remapeando sus valores.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1220',
        bone: '#F3EEE3',
        slate: '#8A97AD',
        gold: {
          DEFAULT: '#C9A24B',
          400: '#E8CE8A', // gold-lite (highlights/foil)
          500: '#C9A24B', // dorado principal
          600: '#A67C2E', // dorado profundo
        },
        navy: {
          DEFAULT: '#14233D',
          600: '#1E3A5F',
          800: '#14233D',
          900: '#0B1220', // midnight (fondo base)
        },
        ink: {
          900: '#0B0B0C',
          950: '#070A12',
        },
        // Clases heredadas remapeadas al nuevo sistema:
        cream: { 50: '#F3EEE3' }, // → bone
        silver: '#8A97AD', // → slate
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        serif: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Manrope', 'system-ui', 'sans-serif'],
        label: ['var(--font-label)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
        wide2: '0.14em',
        tightish: '-0.02em',
      },
      backgroundImage: {
        'gold-foil':
          'linear-gradient(120deg, #A67C2E 0%, #C9A24B 30%, #E8CE8A 50%, #C9A24B 70%, #A67C2E 100%)',
        'hero-gold': 'linear-gradient(135deg, #E8CE8A 0%, #C9A24B 55%, #A67C2E 100%)',
        // Amanecer sobrio: luz dorada arriba → midnight abajo (no dorado plano)
        'hero-sky':
          'radial-gradient(120% 90% at 50% -10%, #E8CE8A 0%, #C9A24B 12%, #7A5A34 30%, #2A2A3D 52%, #14233D 70%, #0B1220 100%)',
        'navy-veil':
          'linear-gradient(180deg, rgba(11,18,32,0) 0%, rgba(11,18,32,0.55) 62%, #0B1220 100%)',
      },
      boxShadow: {
        gold: '0 10px 40px -12px rgba(201,162,75,0.4)',
        // Borde luminoso fino (no nube difusa)
        light: '0 0 0 1px rgba(201,162,75,0.35), 0 0 14px rgba(201,162,75,0.14)',
        book: '0 40px 80px -24px rgba(0,0,0,0.7), 0 16px 32px -16px rgba(0,0,0,0.55)',
        glass: '0 10px 40px -12px rgba(0,0,0,0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
