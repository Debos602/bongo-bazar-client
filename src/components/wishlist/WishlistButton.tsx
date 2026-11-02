"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishlistProvider";

export default function WishlistButton() {
  const { count } = useWishlist();
  return (
    <Link
      href="/wishlist"
      aria-label={count ? `Wishlist, ${count} ${count === 1 ? "item" : "items"}` : "Wishlist"}
      className="relative flex flex-shrink-0 items-center gap-1.5 rounded-xl border border-emerald-200 bg-white p-2.5 text-emerald-700 transition-colors hover:bg-emerald-50"
    >
      <Heart className="h-5 w-5" fill={count ? "currentColor" : "none"} aria-hidden />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-700 px-1 text-[10px] font-bold tabular-nums text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
      <span className="hidden pr-0.5 text-sm font-semibold xl:inline">Wishlist</span>
    </Link>
  );
}
