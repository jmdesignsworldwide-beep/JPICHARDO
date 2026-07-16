'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * Título que se revela palabra por palabra con blur-in al entrar en viewport.
 * Suave y editorial (como amaneciendo). Respeta prefers-reduced-motion.
 */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  text,
  className = '',
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10%' }}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap" aria-hidden>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </motion.span>
  );
}
