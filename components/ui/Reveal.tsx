'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variantsFor = (y: number): Variants => ({
  hidden: { opacity: 0, y, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
});

/**
 * Envoltura de entrada al scroll. Suave, una sola vez, y desactivada
 * automáticamente si el usuario prefiere movimiento reducido.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span' | 'p';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={variantsFor(y)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
