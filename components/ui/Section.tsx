import type { ReactNode } from 'react';

type Tone = 'navy' | 'navy-deep' | 'cream' | 'transparent';

const tones: Record<Tone, string> = {
  navy: 'bg-navy-900 text-cream-50',
  'navy-deep': 'bg-navy-800 text-cream-50',
  cream: 'bg-cream-50 text-ink-900',
  transparent: '',
};

export function Section({
  children,
  tone = 'navy',
  className = '',
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${tones[tone]} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Etiqueta tipo eyebrow (FE · ESPERANZA) sobre un título */
export function SectionLabel({
  children,
  tone = 'gold',
  className = '',
}: {
  children: ReactNode;
  tone?: 'gold' | 'ink';
  className?: string;
}) {
  const color = tone === 'ink' ? 'text-gold-600' : 'text-gold-400';
  return (
    <span
      className={`font-label text-[0.72rem] font-semibold uppercase tracking-label ${color} ${className}`}
    >
      {children}
    </span>
  );
}

/** Título de sección en display serif */
export function SectionTitle({
  children,
  className = '',
  foil = false,
}: {
  children: ReactNode;
  className?: string;
  foil?: boolean;
}) {
  return (
    <h2
      className={`font-display text-3xl leading-tight sm:text-4xl md:text-5xl ${
        foil ? 'text-foil' : ''
      } ${className}`}
    >
      {children}
    </h2>
  );
}
