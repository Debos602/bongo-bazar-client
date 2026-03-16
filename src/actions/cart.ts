

// src/actions/cart.ts
"use server";

import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

export const createCart = async (data: { productId: number; quantity: number; }) => {
    try {
        const res = await axiosInstance.post("/cart", data);
        // ✅ token interceptor দিয়েই যাচ্ছে, আলাদা getAuthToken() লাগবে না
        console.log("result from create cart action", res);
        return res.data;
    } catch (error: any) {
        const message = error.response?.data?.message ?? "Something went wrong";
        console.error("Cart error:", error.response?.data);
        return { success: false, message }; // ✅ কখনো undefined না
    }
};

export const getCartCount = async (): Promise<number> => {
    try {
        const response = await axiosInstance.get("/cart/count");
        return response.data?.count ?? response.data ?? 0;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Cart count error:", {
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url,
            });
        }
        return 0; // return 0 instead of throwing — badge shows nothing
    }
};