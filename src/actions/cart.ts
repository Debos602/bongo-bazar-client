"use server";

import axiosInstance from "@/lib/axiosInstance";
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
export const getCartCount = async () => {
    try {
        const res = await axiosInstance.get('/cart/count');
        revalidateTag("cart-count");
        console.log("res-from-api", res);
        return res?.data?.data ?? 0;
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