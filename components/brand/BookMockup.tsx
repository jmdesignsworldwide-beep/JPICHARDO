'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookCover } from './BookCover';

/**
 * Mockup 3D flotante de la portada del libro. Perspectiva CSS + sombra
 * realista + leve flotación (respetando prefers-reduced-motion).
 */
export function BookMockup({
  className = '',
  floating = true,
}: {
  className?: string;
  floating?: boolean;
}) {
  const reduce = useReducedMotion();
  const animate =
    floating && !reduce
      ? { y: [0, -14, 0], rotateX: [0, 1.5, 0] }
      : undefined;

  return (
    <div className={`relative ${className}`} style={{ perspective: '1400px' }}>
      {/* Halo dorado detrás */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(closest-side, rgba(224,193,115,0.55), transparent 72%)',
        }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={animate}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d', rotateY: -14 }}
          className="relative mx-auto w-[240px] sm:w-[280px] md:w-[320px]"
        >
          {/* Lomo del libro */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-[18px] -translate-x-[17px] rounded-l-sm"
            style={{
              transform: 'rotateY(90deg) translateX(-9px)',
              transformOrigin: 'left center',
              background:
                'linear-gradient(90deg, #0A1A2F, #12233D 40%, #A67C2E)',
            }}
          />
          {/* Cara frontal */}
          <div className="relative overflow-hidden rounded-sm shadow-book ring-1 ring-gold-500/30">
            <BookCover className="block w-full" />
            {/* Brillo diagonal */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Sombra proyectada en el suelo */}
        <div
          aria-hidden
          className="mx-auto mt-6 h-6 w-[60%] rounded-[50%] blur-xl"
          style={{ background: 'rgba(0,0,0,0.55)' }}
        />
      </motion.div>
    </div>
  );
}
