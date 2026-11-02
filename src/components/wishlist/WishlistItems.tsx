"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, Loader2, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { createCart } from "@/actions/cart";
import type { WishItem } from "@/actions/wishlist";
import { useCart } from "@/providers/CartProvider";
import { useWishlist } from "@/providers/WishlistProvider";

export default function WishlistItems() {
  const { items, loading, remove, clear } = useWishlist();
  const { status } = useSession();
  const [armed, setArmed] = useState(false);

  if (loading) {
    return (
      <p role="status" className="flex items-center gap-2 py-16 text-sm text-slate-500">
        <Loader2 size={16} className="animate-spin" aria-hidden /> Loading your wishlist
      </p>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
        <Heart size={32} className="mx-auto text-slate-300" aria-hidden />
        <p className="mt-3 font-semibold text-slate-800">Nothing saved yet</p>
        <p className="mt-1 text-sm text-slate-500">Tap the heart on any product to keep it here.</p>
        <Link href="/products" className="mt-4 inline-block rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <span>{items.length} saved {items.length === 1 ? "item" : "items"}</span>
        <button
          type="button"
          onClick={() => {
            if (!armed) { setArmed(true); setTimeout(() => setArmed(false), 4000); return; }
            setArmed(false);
            clear();
          }}
          className="font-medium text-red-700 hover:underline"
        >
          {armed ? "Click again to clear all" : "Clear all"}
        </button>
      </div>
      {status === "unauthenticated" && (
        <p className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-900">
          This list is saved on this device only. <Link href="/login" className="font-semibold underline">Log in</Link> to keep it on your account.
        </p>
      )}
      <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {items.map((item) => <Row key={item.productId} item={item} onRemove={() => remove(item.productId)} />)}
      </ul>
    </>
  );
}

function Row({ item, onRemove }: { item: WishItem; onRemove: () => void; }) {
  const { status } = useSession();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const soldOut = item.stock === 0;

  const addToCart = async () => {
    if (status !== "authenticated") {
      addItem({ id: item.productId, name: item.name, price: item.price, image: item.image });
      toast.success("Added to cart");
      return;
    }
    setAdding(true);
    const res = await createCart({ productId: item.productId, quantity: 1 });
    setAdding(false);
    if (!res?.success) {
      toast.error(res?.message ?? "Could not add to cart");
      return;
    }
    window.dispatchEvent(new Event("cart-updated"));
    toast.success("Added to cart");
  };

  return (
    <li className="flex flex-wrap items-center gap-3 p-3 sm:gap-4 sm:p-4">
      <Link href={`/products/${item.productId}`} className="relative block size-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:size-20">
        <Image src={item.image || "/logo.png"} alt="" fill sizes="80px" className="object-cover" />
      </Link>
      <div className="min-w-0 flex-1 basis-40">
        <Link href={`/products/${item.productId}`} className="line-clamp-2 font-medium text-slate-900 hover:underline">{item.name}</Link>
        {item.shopName && <p className="truncate text-xs text-slate-500">Sold by {item.shopName}</p>}
        <p className="mt-1 font-bold tabular-nums text-emerald-800">
          ৳ {item.price.toLocaleString()}
          {!!item.oldPrice && item.oldPrice > item.price && <span className="ml-2 text-xs font-normal text-slate-400 line-through">৳ {item.oldPrice.toLocaleString()}</span>}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!item.available ? (
          <span className="text-xs font-medium text-slate-500">No longer available</span>
        ) : soldOut ? (
          <span className="text-xs font-medium text-slate-500">Out of stock</span>
        ) : (
          <button type="button" onClick={addToCart} disabled={adding} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60">
            {adding ? <Loader2 size={14} className="animate-spin" aria-hidden /> : <ShoppingCart size={14} aria-hidden />}
            Add to cart
          </button>
        )}
        <button type="button" onClick={onRemove} aria-label={`Remove ${item.name} from wishlist`} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-red-700">
          <X size={16} aria-hidden />
        </button>
      </div>
    </li>
  );
}
