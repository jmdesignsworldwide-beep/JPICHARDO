'use client';

import { useState } from 'react';
import { Copy, Download, Check, Mail } from 'lucide-react';
import type { Subscriber } from '@/lib/portal/analytics';

export function SubscribersTable({ subscribers }: { subscribers: Subscriber[] }) {
  const [copied, setCopied] = useState(false);

  const emails = subscribers.map((s) => s.email);

  async function copyEmails() {
    try {
      await navigator.clipboard.writeText(emails.join(', '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignora */
    }
  }

  function downloadCsv() {
    const header = 'email,fecha,fuente\n';
    const body = subscribers
      .map((s) => `${s.email},${s.created_at},${s.source ?? ''}`)
      .join('\n');
    const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suscriptores-blessing-house.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-label text-[0.7rem] uppercase tracking-label text-gold-400">
          <Mail className="h-4 w-4" /> Correos recopilados ({subscribers.length})
        </h3>
        {subscribers.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={copyEmails}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 px-3 py-1.5 text-xs text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
            <button
              onClick={downloadCsv}
              className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 px-3 py-1.5 text-xs text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        )}
      </div>

      {subscribers.length === 0 ? (
        <p className="mt-4 text-sm text-cream-50/50">Aún no hay correos.</p>
      ) : (
        <div className="mt-4 max-h-80 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-navy-800/80 text-[0.62rem] uppercase tracking-label text-cream-50/50">
              <tr>
                <th className="py-2 pr-4 font-label font-medium">Correo</th>
                <th className="py-2 font-label font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.email} className="border-t border-gold-500/10">
                  <td className="py-2 pr-4 text-cream-50/85">{s.email}</td>
                  <td className="py-2 text-cream-50/55">{s.created_at.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
