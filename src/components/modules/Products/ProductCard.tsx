"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createCart } from "@/actions/cart";
import { useState } from "react";

const TAG_STYLES: Record<string, string> = {
  "BEST SELLER": "var(--grad-secondary)",
  HOT: "var(--grad-cta)",
  NEW: "var(--grad-secondary)",
  SALE: "var(--grad-cta)",
  TRENDING: "linear-gradient(135deg, #f59e0b, #d97706)",
};

const DEFAULT_TAGS = ["NEW", "HOT", "BEST SELLER", "TRENDING"];
const DEFAULT_TAG_STYLE = "linear-gradient(135deg, #6b7280, #4b5563)";

export default function ProductCard({ post }: { post: Product }) {
  const imageSrc = post.image || post.thumbnail || "/logo.png";
  const altText = (post.name || post.title || "প্রোডাক্ট") as string;

  const idStr = String(post.id ?? "");
  const idSum = idStr
    .split("")
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const fallbackTag = DEFAULT_TAGS[idSum % DEFAULT_TAGS.length];

  const badgeTag = post.tags?.[0] || fallbackTag;
  const badgeStyle = TAG_STYLES[badgeTag.toUpperCase()] || DEFAULT_TAG_STYLE;

  const price = post.price ?? null;
  const originalPrice = (post as { oldPrice?: number; regularPrice?: number }).oldPrice
    ?? (post as { oldPrice?: number; regularPrice?: number }).regularPrice
    ?? null;
  const currentPrice = price;
  const hasDiscount =
    originalPrice && currentPrice && originalPrice > currentPrice;
  const discount = hasDiscount
    ? Math.round(((Number(originalPrice) - Number(currentPrice)) / Number(originalPrice)) * 100)
    : null;

  const { data: session } = useSession();
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      router.push(`/login?callbackUrl=/products/${post.id}`);
      return;
    }
    setAdding(true);
    try {
      const res = await createCart({ productId: Number(post.id), quantity: 1 });
      if (res?.id || res?.success) {
        toast.success("Cart added successfully");
        router.refresh();
      } else {
        toast.error("কার্টে যোগ করা যায়নি");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link href={`/products/${post.id}`} className="block group card-hover h-full">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-neutral-200 shadow-[var(--shadow-card)] group-hover:shadow-[var(--shadow-card-hover)]">

        {/* Image Area */}
        <div className="relative w-full overflow-hidden bg-neutral-50" style={{ paddingTop: "100%" }}>
          {/* Tag badge */}
          {badgeTag && (
            <div
              className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md"
              style={{ background: badgeStyle as string }}
            >
              {badgeTag}
            </div>
          )}

          {/* Discount badge */}
          {discount && discount > 0 && (
            <div
              className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md"
              style={{ background: "var(--grad-cta)" }}
            >
              -{discount}% OFF
            </div>
          )}

          {/* Wishlist hint */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            aria-label="Add to wishlist"
            className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:text-brand-red-600 text-neutral-500"
          >
            <Heart className="w-4 h-4" />
          </button>

          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover product-img"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 bg-white">
          <div className="mb-3 flex-1">
            <h3 className="text-[15px] font-semibold text-neutral-900 mb-2 line-clamp-2 leading-snug min-h-[2.6em]">
              {altText}
            </h3>
            <div className="flex items-baseline gap-2 flex-wrap">
              {currentPrice !== null && currentPrice !== undefined && (
                <span className="text-xl font-extrabold text-brand-green-700 tabular-nums" data-numeric="true">
                  ৳ {Number(currentPrice).toLocaleString()}
                </span>
              )}
              {hasDiscount && originalPrice && (
                <span className="text-sm line-through text-neutral-400 tabular-nums" data-numeric="true">
                  ৳ {Number(originalPrice).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full min-h-11 rounded-xl border-2 border-brand-green-600 bg-brand-green-50 text-brand-green-700 font-semibold text-sm py-2.5 px-4 flex items-center justify-center gap-2 hover:bg-brand-green-600 hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.45)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
