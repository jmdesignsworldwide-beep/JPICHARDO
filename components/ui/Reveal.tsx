'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type From = 'up' | 'left' | 'right' | 'scale';

const variantsFor = (from: From, y: number, blur: boolean): Variants => {
  const hidden: Record<string, number | string> = {
    opacity: 0,
    scale: from === 'scale' ? 0.9 : 0.98,
  };
  if (from === 'up') hidden.y = y;
  if (from === 'left') hidden.x = -44;
  if (from === 'right') hidden.x = 44;
  if (blur) hidden.filter = 'blur(10px)';
  return {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ...(blur ? { filter: 'blur(0px)' } : {}),
    },
  };
};

/**
 * Envoltura de entrada al scroll. Suave, una sola vez, y desactivada
 * automáticamente si el usuario prefiere movimiento reducido.
 * `from` varía la dirección (up/left/right/scale) y `blur` añade blur-in.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  from = 'up',
  blur = false,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  from?: From;
  blur?: boolean;
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
      variants={variantsFor(from, y, blur)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
