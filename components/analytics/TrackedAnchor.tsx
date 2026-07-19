'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track, type TrackPayload } from './track';

/**
 * Ancla externa que registra un evento de analítica al hacer clic (sin
 * bloquear la apertura del enlace). Se usa para clics al Amazon de cada libro
 * y a los enlaces del devocional.
 */
export function TrackedAnchor({
  event,
  children,
  ...props
}: { event: TrackPayload; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} onClick={() => track(event)}>
      {children}
    </a>
  );
}
