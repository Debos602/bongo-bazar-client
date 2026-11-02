"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import WishlistHeart from "@/components/wishlist/WishlistHeart";
import { Product } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCart } from "@/actions/cart";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/providers/CartProvider";

export default function ProductCard({ post }: { post: Product }) {
  const imageSrc = post.image || post.thumbnail || "/logo.png";
  const altText = (post.name || post.title || "Product") as string;

  // Only a badge the seller actually set.
  const badgeTag = post.badgeType ?? null;

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

  const router = useRouter();
  const { data: session } = useSession();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      if (!session) {
        addItem({
          id: Number(post.id),
          name: post.name || post.title || "Product",
          price: Number(post.price ?? 0),
          image: post.image || post.thumbnail || "/logo.png",
        });
        toast.success("Added to cart");
        setAdding(false);
        return;
      }
      const res = await createCart({ productId: Number(post.id), quantity: 1 });
      if (res?.id || res?.success) {
        toast.success("Cart added successfully");
        window.dispatchEvent(new Event("cart-updated"));
        router.refresh();
      } else {
        toast.error("Could not add to cart");
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
              style={{ background: "var(--grad-cta)" }}
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

          <WishlistHeart
            product={{ productId: Number(post.id), name: altText, price: Number(post.price ?? 0), oldPrice: originalPrice, image: imageSrc, stock: post.stock, shopName: post.vendor?.shopName }}
            className="absolute bottom-3 right-3 z-10 size-10"
          />

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
            {post.vendor?.shopName && <p className="-mt-1 mb-2 truncate text-xs text-neutral-500">{post.vendor.shopName}</p>}
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
