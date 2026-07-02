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
      <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm group-hover:shadow-[0_8px_28px_rgba(220,38,38,0.18)] group-hover:-translate-y-1 transition-all duration-300">

        {/* Image Area */}
        <div className="relative w-full bg-gradient-to-br from-green-50 to-red-50" style={{ paddingTop: "100%" }}>
          {/* Tag Badge */}
          {badgeTag && (
            <div className="absolute top-2 left-2 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-lg"
              style={{ background: "linear-gradient(135deg, #15803d, #007a3d)" }}>
              {badgeTag}
            </div>
          )}

          {/* Discount Badge */}
          {discount && discount > 0 && (
            <div className="absolute top-2 right-2 z-10 flex flex-col items-center justify-center rounded-full text-white font-bold w-11 h-11 leading-tight shadow-lg"
              style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}>
              <span className="text-[11px] font-extrabold">{discount}%</span>
              <span className="text-[8px] font-semibold">ছাড়</span>
            </div>
          )}

          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="object-cover h-[256px] w-auto"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)" }}>

          {/* Price */}
          <div className="mb-1">
            {originalPrice && originalPrice !== currentPrice && (
              <span className="block text-xs line-through text-gray-400">
                ৳ {originalPrice.toLocaleString()}
              </span>
            )}
            {currentPrice && (
              <span className="text-base font-extrabold"
                style={{ background: "linear-gradient(90deg, #15803d, #16a34a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ৳ {currentPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-xs font-semibold mb-3 flex-1 line-clamp-2 text-gray-700 leading-snug">
            {altText}
          </h3>

          {/* Order Button */}
          <div
            className="w-full rounded-lg py-2 text-white text-xs font-bold text-center transition-all duration-200 group-hover:shadow-lg group-hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #15803d 100%)" }}
          >
            🛒 অর্ডার করুন
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-[3px] w-full"
          style={{ background: "linear-gradient(90deg, #dc2626 0%, #15803d 100%)" }} />
      </div>
    </Link>
  );
}