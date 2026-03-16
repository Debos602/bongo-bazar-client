"use server";

import axiosInstance from "@/lib/axiosInstance";
import { getAuthToken } from "@/helpers/getAuthToken";
import axios from "axios";

export const createCart = async (data: { productId: number; quantity: number; }) => {
    try {
        const token = await getAuthToken(); // ✅ server only

        if (!token) return { success: false, message: "Not authenticated" };

        const res = await axiosInstance.post("/cart", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error: any) {
        console.error("Failed to create cart", error.response?.data);
        return error.response?.data;
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