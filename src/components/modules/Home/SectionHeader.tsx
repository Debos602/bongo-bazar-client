import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** Small pill label above the title (e.g. "Curated for you"). */
  pill?: string;
  /** Highlighted word inside the gradient (e.g. "Category", "Deals"). */
  gradientWord?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  /** Extra accent stripe color (defaults to emerald gradient). */
  accent?: 'emerald' | 'amber' | 'rose';
  /** Show a Sparkles icon in the pill. */
  icon?: boolean;
}

const ACCENTS: Record<NonNullable<SectionHeaderProps['accent']>, string> = {
  emerald: 'linear-gradient(180deg,#10b981 0%,#047857 60%,#022c22 100%)',
  amber: 'linear-gradient(180deg,#fbbf24 0%,#f59e0b 60%,#b45309 100%)',
  rose: 'linear-gradient(180deg,#fb7185 0%,#e11d48 60%,#881337 100%)',
};

const GRADIENTS: Record<NonNullable<SectionHeaderProps['accent']>, string> = {
  emerald:
    'linear-gradient(90deg,#047857,#10b981 60%,#34d399)',
  amber: 'linear-gradient(90deg,#b45309,#f59e0b 60%,#fcd34d)',
  rose: 'linear-gradient(90deg,#be123c,#e11d48 60%,#fb7185)',
};

const PILL_BG: Record<NonNullable<SectionHeaderProps['accent']>, string> = {
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700',
};

const CTA_BORDER: Record<NonNullable<SectionHeaderProps['accent']>, string> = {
  emerald: 'border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
  amber: 'border-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600',
  rose: 'border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600',
};

export default function SectionHeader({
  pill,
  gradientWord,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  className,
  accent = 'emerald',
  icon = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8 px-4',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className="hidden sm:block w-1.5 self-stretch rounded-full"
          style={{ background: ACCENTS[accent] }}
          aria-hidden="true"
        />
        <div>
          {pill && (
            <div
              className={cn(
                'inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider',
                PILL_BG[accent]
              )}
            >
              {icon && <Sparkles className="w-3 h-3" />}
              {pill}
            </div>
          )}
          <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {title}
            {gradientWord && (
              <>
                {' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: GRADIENTS[accent] }}
                >
                  {gradientWord}
                </span>
              </>
            )}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-sm sm:text-[15px] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className={cn(
            'group inline-flex items-center gap-1.5 self-start sm:self-auto px-4 py-2 rounded-full bg-white border text-sm font-semibold transition-all duration-200 shadow-sm',
            CTA_BORDER[accent]
          )}
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
