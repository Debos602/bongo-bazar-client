"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";

export const register = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/auth/register", data);
        console.log("✅ REGISTER RESPONSE:", res.data); // Terminal-এ দেখবে
        return res.data;
    } catch (error: any) {
        console.error("❌ REGISTER ERROR:", error.response?.data);
        console.error("❌ STATUS:", error.response?.status);
        console.error("❌ URL HIT:", error.config?.url);
        return error.response?.data;
    }
};
export const login = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        console.log(res.data);
        return res.data;
    } catch (error: any) {
        console.error("Failed to login user", error.response?.data);
        return error.response?.data;
    }
};

export const logout = async () => {
    try {
        const res = await axiosInstance.post("/auth/logout");
        return res.data;
    } catch (error: any) {
        console.error("Failed to logout", error.response?.data);
        return error.response?.data;
    }
};