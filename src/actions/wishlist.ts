"use server";

import { apiFetch } from "@/lib/serverApi";

export type WishItem = {
    productId: number;
    name: string;
    price: number;
    oldPrice?: number | null;
    image: string;
    stock?: number;
    shopName?: string;
    available: boolean;
};

type Row = {
    product: {
        id: number; name: string; price: number; oldPrice?: number | null; image: string; stock: number;
        isPublished: boolean; isBlocked: boolean;
        vendor?: { shopName: string; status: string; };
    };
};

export const getWishlist = async (): Promise<WishItem[] | null> => {
    const res = await apiFetch<Row[]>("/wishlist");
    if (!res.data) return null;
    return res.data.map(({ product: p }) => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        oldPrice: p.oldPrice,
        image: p.image,
        stock: p.stock,
        shopName: p.vendor?.shopName,
        available: p.isPublished && !p.isBlocked && p.vendor?.status === "APPROVED",
    }));
};

export const addToWishlist = async (productId: number) => {
    const res = await apiFetch("/wishlist", { method: "POST", body: JSON.stringify({ productId }) });
    return { success: res.success, message: res.message };
};

export const removeFromWishlist = async (productId: number) => {
    const res = await apiFetch(`/wishlist/product/${Number(productId)}`, { method: "DELETE" });
    return { success: res.success, message: res.message };
};

export const clearWishlist = async () => {
    const res = await apiFetch("/wishlist", { method: "DELETE" });
    return { success: res.success, message: res.message };
};
