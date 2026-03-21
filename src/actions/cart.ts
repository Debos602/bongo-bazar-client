"use server";

import { authOptions } from "@/helpers/authOptions";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

// ✅ CREATE CART
export const createCart = async (data: { productId: number; quantity: number; }) => {
    try {
        const res = await axiosInstance.post("/cart", data);
        revalidateTag("cart-count");
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ message?: string; }>;
        const message = err.response?.data?.message ?? "Something went wrong";
        console.error("Cart error:", err.response?.data);
        return { success: false, message };
    }
};

// ✅ GET CART COUNT (FETCH ONLY)
interface SessionUser {
    accessToken?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export const getCartCount = async () => {
    try {
        const session = await getServerSession(authOptions);
        const token = (session?.user as SessionUser)?.accessToken;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/cart/count`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { tags: ["cart-count"] },
        });

        if (!res.ok) return 0;
        const data = await res.json();
        console.log("Data", data);
        return data?.data?.totalQuantity ?? 0;
    } catch {
        return 0;
    }
};

// ✅ GET CART LIST
export const getCart = async () => {
    try {
        const res = await axiosInstance.get("/cart");
        return res.data?.data ?? [];
    } catch {
        return [];
    }
};

// ✅ REMOVE FROM CART
export const removeFromCart = async (id: number) => {
    try {
        const res = await axiosInstance.delete(`/cart/${id}`);
        revalidateTag("cart-count");
        return res.data;
    } catch {
        return { success: false };
    }
};

// ✅ UPDATE CART QUANTITY
export const updateCartQuantity = async (id: number, quantity: number) => {
    try {
        const res = await axiosInstance.put(`/cart/${id}`, { quantity });
        revalidateTag("cart-count");
        return res.data;
    } catch {
        return { success: false };
    }
};