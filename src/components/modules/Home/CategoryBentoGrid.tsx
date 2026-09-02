'use client';

import Link from 'next/link';
import Image from 'next/image';
import getCategoryIcon from '@/lib/categoryIcons';
import { Category } from '@/types';

interface CategoryBentoGridProps {
  categories: Category[];
}

export default function CategoryBentoGrid({ categories }: CategoryBentoGridProps) {
  console.log("CategoryBentoGrid received categories:", categories);
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayCategories = categories.slice(0, 6);

  const getCategoryImage = (category: Category): string => {
  const raw = category.Image || category.products?.[0]?.product?.image || '';
  return raw ? `${raw}?w=800&q=75&auto=format&fit=crop` : '';
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {displayCategories.map((category, index) => {
          const isLarge = index === 0 || index === 4;
          const gridColSpan = isLarge ? 'md:col-span-2' : '';
          const gridRowSpan = isLarge ? 'md:row-span-2' : '';
          const categoryImage = getCategoryImage(category);

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl ${gridColSpan} ${gridRowSpan}`}
            >
              {categoryImage ? (
                <Image
                  src={categoryImage}
                  alt={category.name}
                  fill
                  sizes={isLarge ? '(min-width:768px) 66vw, 100vw' : '(min-width:768px) 33vw, 100vw'}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              )}

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>

              <div className={`relative z-10 flex flex-col justify-between p-6 h-full ${isLarge ? 'min-h-64' : 'min-h-48'}`}>
                <div className="text-5xl md:text-6xl mb-4 drop-shadow-lg">
                  {getCategoryIcon(category.name)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg md:text-xl mb-2 drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-white text-sm opacity-95 drop-shadow-md">
                    Browse {category.name} →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}