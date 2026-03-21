// components/modules/Products/ProductCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

// Fallback images by category/keyword — add more as needed
const fallbackImages: Record<string, string> = {
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  boot: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80",
  sandal: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80",
  socks: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400&q=80",
  shirt: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  pant: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80",
  dress: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
  toy: "https://images.unsplash.com/photo-1558060370-d644485927b0?w=400&q=80",
  bag: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
  baby: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80",
  default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
};

function getFallbackImage(name: string): string {
  const lower = (name || "").toLowerCase();
  for (const key of Object.keys(fallbackImages)) {
    if (lower.includes(key)) return fallbackImages[key];
  }
  return fallbackImages.default;
}

export default function ProductCard({ post }: { post: Post; }) {
  const imageSrc = (post.image || post.thumbnail) || getFallbackImage(post.name || post.title || "");
  const altText = (post.name || post.title || "প্রোডাক্ট") as string;

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
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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