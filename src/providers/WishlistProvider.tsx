"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addToWishlist, clearWishlist, getWishlist, removeFromWishlist, type WishItem } from "@/actions/wishlist";

const STORAGE_KEY = "bb-guest-wishlist";

const readGuest = (): WishItem[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
const writeGuest = (items: WishItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* private mode: the list still works until the page closes */
  }
};

type Ctx = {
  items: WishItem[];
  count: number;
  loading: boolean;
  has: (productId: number) => boolean;
  toggle: (item: WishItem) => Promise<void>;
  remove: (productId: number) => Promise<void>;
  clear: () => Promise<void>;
};

const WishlistContext = createContext<Ctx | null>(null);

// Guests keep a list in this browser; it moves to their account when they log in.
export function WishlistProvider({ children }: { children: React.ReactNode; }) {
  const { status } = useSession();
  const [items, setItems] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const signedIn = status === "authenticated";

  useEffect(() => {
    if (status === "loading") return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      if (!signedIn) {
        if (!cancelled) setItems(readGuest());
      } else {
        const guest = readGuest();
        const results = await Promise.all(guest.map((g) => addToWishlist(g.productId)));
        if (results.every((r) => r.success)) writeGuest([]);
        const list = await getWishlist();
        if (!cancelled) setItems(list ?? []);
      }
      if (!cancelled) setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [status, signedIn]);

  const apply = useCallback((next: WishItem[]) => {
    setItems(next);
    if (!signedIn) writeGuest(next);
  }, [signedIn]);

  const remove = useCallback(async (productId: number) => {
    const before = itemsRef.current;
    apply(before.filter((i) => i.productId !== productId));
    if (!signedIn) return;
    const res = await removeFromWishlist(productId);
    if (!res.success) {
      setItems(before);
      toast.error(res.message);
    }
  }, [apply, signedIn]);

  const toggle = useCallback(async (item: WishItem) => {
    if (itemsRef.current.some((i) => i.productId === item.productId)) {
      await remove(item.productId);
      toast.success("Removed from wishlist");
      return;
    }
    const before = itemsRef.current;
    apply([item, ...before]);
    if (signedIn) {
      const res = await addToWishlist(item.productId);
      if (!res.success) {
        setItems(before);
        toast.error(res.message);
        return;
      }
    }
    toast.success("Added to wishlist");
  }, [apply, remove, signedIn]);

  const clear = useCallback(async () => {
    const before = itemsRef.current;
    apply([]);
    if (!signedIn) return;
    const res = await clearWishlist();
    if (!res.success) {
      setItems(before);
      toast.error(res.message);
    }
  }, [apply, signedIn]);

  const value = useMemo<Ctx>(() => ({
    items,
    count: items.length,
    loading,
    has: (id) => items.some((i) => i.productId === id),
    toggle,
    remove,
    clear,
  }), [items, loading, toggle, remove, clear]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
