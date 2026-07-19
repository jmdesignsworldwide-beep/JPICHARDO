'use client';

import type { ReactNode } from 'react';
import { ButtonAnchor } from '@/components/ui/Button';
import { track } from './track';

type Target = 'instagram' | 'tiktok' | 'linktree' | 'devotional';

/** ButtonAnchor con registro de clic al devocional (IG / TikTok / Linktree). */
export function TrackedDevotionalButton({
  href,
  target,
  variant = 'primary',
  ariaLabel,
  children,
}: {
  href: string;
  target: Target;
  variant?: 'primary' | 'secondary' | 'ghost';
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <ButtonAnchor
      href={href}
      variant={variant}
      aria-label={ariaLabel}
      onClick={() => track({ type: 'devotional', target })}
    >
      {children}
    </ButtonAnchor>
  );
}
