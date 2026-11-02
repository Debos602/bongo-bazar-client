"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";
import { cn } from "@/lib/utils";
import type { WishItem } from "@/actions/wishlist";

type Snapshot = Omit<WishItem, "available">;

export default function WishlistHeart({ product, className, size = 16 }: { product: Snapshot; className?: string; size?: number; }) {
  const { has, toggle } = useWishlist();
  const wished = has(product.productId);

  return (
    <button
      type="button"
      aria-pressed={wished}
      aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      onClick={(e) => {
        // Hearts sit inside product links; a click here must not open the product.
        e.preventDefault();
        e.stopPropagation();
        toggle({ ...product, available: true });
      }}
      className={cn(
        "flex items-center justify-center rounded-full border shadow-sm transition-colors",
        wished ? "border-red-200 bg-red-50 text-red-600" : "border-neutral-200 bg-white/95 text-neutral-500 hover:text-red-600",
        className,
      )}
    >
      <Heart key={String(wished)} size={size} fill={wished ? "currentColor" : "none"} className={wished ? "heart-pop" : undefined} aria-hidden />
    </button>
  );
}
