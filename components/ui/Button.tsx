import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-label font-semibold tracking-wide2 uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.7rem]',
  lg: 'px-8 py-4 text-xs',
};

const variants: Record<Variant, string> = {
  primary:
    'btn-shine bg-hero-gold text-navy-900 shadow-gold hover:shadow-[0_16px_50px_-12px_rgba(201,162,75,0.6)] hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.99]',
  secondary:
    'border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400',
  ghost: 'text-cream-50/80 hover:text-gold-400',
};

function classesFor(variant: Variant, size: Size, className: string) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

/** Enlace interno (con locale) */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link href={href} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Enlace externo (redes, mapa, Amazon) */
export function ButtonAnchor({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & ComponentProps<'a'>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classesFor(variant, size, className)}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Botón de acción (submit, etc.) */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
