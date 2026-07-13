// components/modules/Products/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";


 
export default function ProductCard({ post }: { post: Product; }) {
  const imageSrc = post.image || post.thumbnail || "/logo.png";
  const altText = (post.name || post.title || "প্রোডাক্ট") as string;
  const badgeTag = post.tags?.[0];

  // ✅ ফিক্স: duplicate ?? সরানো হয়েছে + discount শুধু তখনই দেখাবে যখন আসল দাম > বর্তমান দাম
  const price = post.price ?? null;
  const originalPrice = price; // যদি আপনার Post টাইপে regularPrice / oldPrice ফিল্ড থাকে তাহলে এখানে বসাবেন
  const currentPrice = price;

  const discount =
    originalPrice && currentPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  return (
    <Link href={`/products/${post.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm group-hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 transition-all duration-300">

        {/* Image Area */}
        <div className="relative w-full overflow-hidden" style={{ paddingTop: "100%" }}>
          <div className="absolute inset-0 bg-[#f3f5f7]" />

          {discount && discount > 0 && (
            <div className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
              -{discount}% OFF
            </div>
          )}

          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full bg-white p-2 shadow-lg pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20s-7-4.35-9.5-8.5C.5 8 2 4.5 5.5 4c2-.3 3.5.7 4.5 2.2C11 4.7 12.5 3.7 14.5 4 18 4.5 19.5 8 17.5 11.5 15 15.65 12 20 12 20z" />
              </svg>
            </div>
          </div>

          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-contain h-[256px] w-auto"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 bg-white">
          <div className="mb-4 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
              {altText}
            </h3>
            <div className="flex items-center gap-2">
              {currentPrice && (
                <span className="text-xl font-extrabold text-[#15803d]">
                  ৳ {currentPrice.toLocaleString()}
                </span>
              )}
              {originalPrice && discount && (
                <span className="text-sm line-through text-gray-400">
                  ৳ {originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="w-full rounded-[18px] border border-gray-200 py-3 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}