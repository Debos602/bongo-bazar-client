'use client';

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface CountdownTimerProps {
  /** Target date — defaults to 3 days from first render. */
  endsAt?: string;
}

const calcRemaining = (target: number) => {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, finished: diff === 0 };
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function CountdownTimer({ endsAt }: CountdownTimerProps) {
  const [t, setT] = useState<ReturnType<typeof calcRemaining> | null>(null);

  useEffect(() => {
    const target = endsAt
      ? new Date(endsAt).getTime()
      : Date.now() + 1000 * 60 * 60 * 24 * 3;

    const update = () => setT(calcRemaining(target));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (t?.finished) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/80 text-emerald-100 px-4 py-2 text-sm font-semibold">
        <Flame className="w-4 h-4" />
        নতুন ডিল শীঘ্রই আসছে
      </div>
    );
  }

  const cells = [
    { label: 'দিন', value: pad(t?.days ?? 0) },
    { label: 'ঘন্টা', value: pad(t?.hours ?? 0) },
    { label: 'মিনিট', value: pad(t?.minutes ?? 0) },
    { label: 'সেকেন্ড', value: pad(t?.seconds ?? 0) },
  ];

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3">
      <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80 text-xs font-semibold uppercase tracking-wider">
        <Flame className="w-3.5 h-3.5 text-emerald-200" />
        শেষ হচ্ছে
      </span>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {cells.map((c, i) => (
          <div key={c.label} className="flex items-center">
            <div
              className="min-w-[44px] sm:min-w-[56px] px-2 sm:px-3 py-2 rounded-lg text-center ring-1 ring-white/15 shadow-inner"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)',
              }}
            >
              <div
                className="text-xl sm:text-2xl font-black text-white tabular-nums leading-none"
                data-numeric="true"
              >
                {c.value}
              </div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-200/80 mt-1 font-semibold">
                {c.label}
              </div>
            </div>
            {i < cells.length - 1 && (
              <span className="text-white/40 text-xl sm:text-2xl font-black px-0.5">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
