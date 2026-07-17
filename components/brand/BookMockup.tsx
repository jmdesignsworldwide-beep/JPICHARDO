'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Mockup 3D REAL de "Comenzando Mi Viaje" (render con lomo, grosor y sombra
 * ya incluidos, fondo transparente). Se anima con profundidad:
 * flotación en loop, tilt 3D siguiendo el cursor, resplandor dorado detrás
 * (el "motivo de luz") y sombra ambiental que reacciona al tilt.
 */
export function BookMockup({
  className = '',
  floating = true,
  priority = false,
}: {
  className?: string;
  floating?: boolean;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [26, -26]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative mx-auto w-[260px] sm:w-[320px] md:w-[380px] ${className}`}
      style={{ perspective: '1500px' }}
    >
      {/* Resplandor dorado detrás (motivo de luz) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(232,206,138,0.4), rgba(201,162,75,0.12), transparent 72%)',
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 34, scale: 0.96 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={floating && !reduce ? { y: [0, -16, 0] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transformStyle: 'preserve-3d',
            rotateX: reduce ? 0 : rotateX,
            rotateY: reduce ? 0 : rotateY,
          }}
        >
          <Image
            src="/libro-portada.png"
            alt="Portada del libro Comenzando Mi Viaje, por el Pastor José Pichardo"
            width={1024}
            height={1536}
            priority={priority}
            sizes="(max-width: 768px) 60vw, 380px"
            className="h-auto w-full select-none drop-shadow-[0_36px_48px_rgba(0,0,0,0.55)]"
          />
        </motion.div>

        {/* Sombra ambiental proyectada en el suelo (reacciona al tilt) */}
        <motion.div
          aria-hidden
          className="mx-auto mt-4 h-7 w-[62%] rounded-[50%] blur-2xl"
          style={{ background: 'rgba(0,0,0,0.6)', x: reduce ? 0 : shadowX }}
        />
      </motion.div>
    </div>
  );
}
