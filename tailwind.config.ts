import type { Config } from 'tailwindcss';

/**
 * Design tokens — dorado · negro · azul (sección 4 del brief).
 * Los colores se exponen también como CSS variables en globals.css
 * para poder usarlos en gradientes y sombras.
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
        gold: {
          400: '#E0C173',
          500: '#C9A24B',
          600: '#A67C2E',
        },
        navy: {
          600: '#1E3A5F',
          800: '#12233D',
          900: '#0A1A2F',
        },
        ink: {
          900: '#141416',
          950: '#0B0B0C',
        },
        cream: {
          50: '#F7F3EA',
        },
        silver: '#C7CBD1',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        serif: ['var(--font-quote)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        label: ['var(--font-label)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.32em',
        wide2: '0.18em',
      },
      backgroundImage: {
        'gold-foil':
          'linear-gradient(120deg, #A67C2E 0%, #E0C173 30%, #F3E2AE 50%, #E0C173 70%, #A67C2E 100%)',
        'hero-gold': 'linear-gradient(135deg, #E0C173 0%, #A67C2E 100%)',
        'hero-sky':
          'linear-gradient(180deg, #F3B76B 0%, #C9773E 22%, #6E3F63 48%, #1E3A5F 72%, #0A1A2F 100%)',
        'navy-veil':
          'linear-gradient(180deg, rgba(10,26,47,0) 0%, rgba(10,26,47,0.55) 60%, #0A1A2F 100%)',
      },
      boxShadow: {
        gold: '0 10px 40px -12px rgba(201,162,75,0.45)',
        book: '0 30px 60px -20px rgba(0,0,0,0.65), 0 12px 24px -12px rgba(0,0,0,0.5)',
        glass: '0 8px 32px -8px rgba(0,0,0,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotateX(0deg)' },
          '50%': { transform: 'translateY(-14px) rotateX(1.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
