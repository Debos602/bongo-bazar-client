"use server";

import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { revalidateTag } from "next/cache";

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
    } catch (error) {
        const err = error as AxiosError<{ message?: string; }>;
        return { success: false, message: err.response?.data?.message ?? "Order failed" };
    }
};

export const getUserOrder = async () => {
    try {
        const res = await axiosInstance.get("/order");
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message?: string; }>;
        return { success: false, message: err.response?.data?.message ?? "error" };
    }
};