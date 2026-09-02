'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';

interface CategoryBentoGridProps {
  categories: Category[];
}

export default function CategoryBentoGrid({ categories }: CategoryBentoGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayCategories = categories.slice(0, 6);

  const getCategoryImage = (category: Category): string => {
    const raw = category.Image || category.products?.[0]?.product?.image || '';
    return raw ? `${raw}?w=1200&q=80&auto=format&fit=crop` : '';
  };

  return (
    <div className="">
      <div className="relative flex justify-between items-center mb-8 px-4">
        <div className="absolute left-0 h-full w-1 bg-green-500 rounded-r-md"></div>
        <div>
          <h2 className="font-bold text-[28px] text-[#191C1D]">Shop by Category</h2>
          <p className="text-[#586059] text-[16px]">Explore our wide range of products</p>
        </div>
      </div>

      {/* Bento Grid — one hero cell, the rest fill in around it */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 px-4 md:auto-rows-[220px]">
        {displayCategories.map((category, index) => {
          const isHero = index === 0;
          const isWide = index === 1;
          const isTall = index === 3;
          const categoryImage = getCategoryImage(category);

          const spanClass = isHero || isTall
            ? 'md:col-span-1 md:row-span-2'
            : isWide
            ? 'md:col-span-2 md:row-span-1'
            : '';

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group relative flex overflow-hidden rounded-2xl min-h-[220px] ring-1 ring-inset ring-white/10 transition-shadow duration-300 hover:ring-emerald-400/50 hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.35)] ${spanClass}`}
            >
              {/* Background image */}
              {categoryImage ? (
                <Image
                  src={categoryImage}
                  alt={category.name}
                  fill
                  sizes={isHero || isTall ? '(min-width:768px) 34vw, 100vw' : isWide ? '(min-width:768px) 66vw, 100vw' : '(min-width:768px) 33vw, 100vw'}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-neutral-900" />
              )}

              {/* Bottom-up tinted gradient — a deep emerald-black instead of flat black, keeps the top of the image clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140F]/90 via-[#06140F]/25 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end w-full p-6">
                <h3 className="font-semibold text-white text-xl md:text-2xl leading-tight">
                  {category.name}
                </h3>
                <p className="text-emerald-50/70 text-sm mt-1 max-w-[26ch]">
                  {isHero
                    ? `Explore high-performance ${category.name.toLowerCase()} for work and play.`
                    : `Browse the latest in ${category.name.toLowerCase()}.`}
                </p>

                {isHero && (
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-900/30 transition-all group-hover:from-emerald-400 group-hover:to-teal-400">
                    Browse all
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}