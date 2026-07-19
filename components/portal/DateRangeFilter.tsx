'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const OPTIONS: { value: string; label: string }[] = [
  { value: '7', label: '7 días' },
  { value: '30', label: '30 días' },
  { value: 'all', label: 'Todo' },
];

export function DateRangeFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get('range') ?? '30';

  function setRange(value: string) {
    const next = new URLSearchParams(params.toString());
    next.set('range', value);
    router.push(`/portal?${next.toString()}`);
  }

  return (
    <div className="inline-flex rounded-full border border-gold-500/25 bg-navy-900/40 p-1">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setRange(o.value)}
          className={`rounded-full px-4 py-1.5 font-label text-[0.7rem] uppercase tracking-wide2 transition-colors ${
            current === o.value ? 'bg-hero-gold text-navy-900' : 'text-cream-50/70 hover:text-gold-400'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
