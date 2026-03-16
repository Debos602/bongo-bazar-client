"use server";

import { authOptions } from "@/helpers/authOptions";
import axiosInstance from "@/lib/axiosInstance";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

// ✅ CREATE CART
export const createCart = async (data: { productId: number; quantity: number; }) => {
    try {
        const res = await axiosInstance.post("/cart", data);

        // invalidate cart count cache
        revalidateTag("cart-count");

        return res.data;
    } catch (error: any) {
        const message = error.response?.data?.message ?? "Something went wrong";
        console.error("Cart error:", error.response?.data);
        return { success: false, message };
    }
};


// ✅ GET CART COUNT (FETCH ONLY)
// src/actions/cart.ts

export const getCartCount = async () => {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as any)?.accessToken;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["cart-count"] }, // ✅ এখন revalidateTag কাজ করবে
        });

        if (!res.ok) return 0;
        const data = await res.json();
        return data?.data ?? 0;
    } catch {
        return 0;
    }
};

// ✅ GET CART LIST
export const getCart = async () => {
    try {
        const res = await axiosInstance.get("/cart");

        return res.data?.data ?? [];
    } catch (error: any) {
        return [];
    }
};


// ✅ REMOVE FROM CART
export const removeFromCart = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/cart/${id}`);

        revalidateTag("cart-count");

        return res.data;
    } catch (error: any) {
        return { success: false };
    }
};


// ✅ UPDATE CART QUANTITY
export const updateCartQuantity = async (id: number, quantity: number) => {
    try {
        const res = await axiosInstance.put(`/cart/${id}`, { quantity });

        revalidateTag("cart-count");

        return res.data;
    } catch (error: any) {
        return { success: false };
    }
};