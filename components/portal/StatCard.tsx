import type { LucideIcon } from 'lucide-react';
import { NumberTicker } from '@/components/motion/NumberTicker';

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-gold-400">
        <Icon className="h-5 w-5" strokeWidth={1.6} />
        <span className="font-label text-[0.62rem] uppercase tracking-label">{label}</span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tightish text-foil">
        <NumberTicker value={value} />
      </p>
      {hint && <p className="mt-1 text-xs text-cream-50/55">{hint}</p>}
    </div>
  );
}
