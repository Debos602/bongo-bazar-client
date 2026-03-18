"use server";

import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

// src/actions/order.ts
export const createOrderWithAddress = async (data: {
    fullName: string;
    phone: string;
    city: string;
    area: string;
    address: string;
    postalCode?: string;
    couponCode?: string;
}) => {
    try {
        const res = await axiosInstance.post("/order/with-address", data);
        revalidateTag("cart-count");
        return res.data;
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message ?? "Order failed" };
    }
};