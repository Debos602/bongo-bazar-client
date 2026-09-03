'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Category } from '@/types';

interface CategoryBentoGridProps {
  categories: Category[];
}

const CATEGORY_ICON: Record<string, string> = {
  laptop: '💻',
  phone: '📱',
  tablet: '📱',
  monitor: '🖥️',
  tv: '📺',
  headphones: '🎧',
  earbuds: '🎧',
  speaker: '🔊',
  smartwatch: '⌚',
  camera: '📷',
};

const getCategoryIcon = (slug: string): string =>
  CATEGORY_ICON[slug] || '🛍️';

export default function CategoryBentoGrid({ categories }: CategoryBentoGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayCategories = categories.slice(0, 6);

  const getCategoryImage = (category: Category): string => {
    const raw =
      category.Image || category.products?.[0]?.product?.image || '';
    return raw
      ? `${raw}?w=1200&q=80&auto=format&fit=crop`
      : '';
  };

  const getProductCount = (category: Category): number =>
    category.products?.length ?? 0;

  return (
    <section className="relative">
    
  

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[200px] gap-3 sm:gap-4 px-4">
        {displayCategories.map((category, index) => {
          // Layout pattern (6 cards in a 4-col grid):
          // 0: hero   — col-span 2, row-span 2 (top-left big)
          // 1: wide   — col-span 2, row-span 1 (top-right)
          // 2: normal — col-span 1, row-span 1
          // 3: normal — col-span 1, row-span 1
          // 4: normal — col-span 1, row-span 1
          // 5: normal — col-span 1, row-span 1
          const isHero = index === 0;
          const isWide = index === 1;
          const categoryImage = getCategoryImage(category);
          const productCount = getProductCount(category);
          const icon = getCategoryIcon(category.slug);

          const spanClass = isHero
            ? 'sm:col-span-2 md:col-span-2 md:row-span-2 md:min-h-[416px]'
            : isWide
            ? 'sm:col-span-2 md:col-span-2 md:row-span-1'
            : 'col-span-1';

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group relative flex overflow-hidden rounded-2xl min-h-[200px] ring-1 ring-inset ring-black/5 transition-all duration-300 hover:ring-emerald-400/60 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(4,120,87,0.35)] ${spanClass}`}
            >
              {/* Background image */}
              {categoryImage ? (
                <Image
                  src={categoryImage}
                  alt={category.name}
                  fill
                  sizes={
                    isHero
                      ? '(min-width:768px) 50vw, 100vw'
                      : isWide
                      ? '(min-width:768px) 50vw, 100vw'
                      : '(min-width:768px) 25vw, 50vw'
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority={index === 0}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(135deg,#022c22 0%,#064e3b 50%,#047857 100%)',
                  }}
                />
              )}

              {/* Tinted gradient — emerald-tinted bottom, plus a subtle radial glow on the right */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02110b]/95 via-[#02110b]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Product count badge (top-left) */}
              {productCount > 0 && (
                <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-bold text-emerald-700 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {productCount}+ items
                </div>
              )}

              {/* Icon bubble (top-right, only on hero) */}
              {isHero && (
                <div className="absolute top-3 right-3 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-2xl sm:text-3xl shadow-lg ring-1 ring-emerald-100">
                  {icon}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end w-full p-5 sm:p-6">
                {/* Small icon for non-hero cards */}
                {!isHero && (
                  <span className="mb-2 inline-flex w-9 h-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-lg ring-1 ring-white/20 group-hover:bg-emerald-500/90 group-hover:ring-emerald-400 transition-all duration-300">
                    {icon}
                  </span>
                )}

                <h3
                  className={`font-bold text-white leading-tight tracking-tight ${
                    isHero ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-lg sm:text-xl'
                  }`}
                >
                  {category.name}
                </h3>

                <p
                  className={`text-white/80 mt-1 max-w-[28ch] ${
                    isHero ? 'text-sm sm:text-[15px]' : 'text-xs sm:text-sm'
                  }`}
                >
                  {isHero
                    ? `Explore high-performance ${category.name.toLowerCase()} for work and play.`
                    : isWide
                    ? `Browse the latest in ${category.name.toLowerCase()}.`
                    : `Shop ${category.name.toLowerCase()}.`}
                </p>

                {/* CTA — always visible on hero, hover-only on others for a calmer look */}
                <span
                  className={`mt-3 sm:mt-4 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-semibold text-white transition-all duration-300 ${
                    isHero
                      ? 'px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-900/40 group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:shadow-emerald-700/50'
                      : 'px-3.5 py-1.5 bg-emerald-600/90 group-hover:bg-emerald-500 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
                  }`}
                >
                  Browse all
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>

              {/* Bottom emerald accent line — animates on hover */}
              <span
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out z-20"
                style={{
                  background:
                    'linear-gradient(90deg,#34d399,#10b981 50%,#047857)',
                }}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
