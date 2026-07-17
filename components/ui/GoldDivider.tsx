'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Línea divisoria dorada fina con rombo central (motivo del libro). Las
 * líneas se dibujan y el rombo aparece girando al entrar en viewport.
 */
export function GoldDivider({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/70 sm:w-24" />
        <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold-400 to-gold-600" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/70 sm:w-24" />
      </div>
    );
  }

  const viewport = { once: true, margin: '-10%' } as const;

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-16 origin-right bg-gradient-to-r from-transparent to-gold-500/70 sm:w-24"
      />
      <motion.span
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="h-2 w-2 bg-gradient-to-br from-gold-400 to-gold-600"
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-16 origin-left bg-gradient-to-l from-transparent to-gold-500/70 sm:w-24"
      />
    </div>
  );
}
