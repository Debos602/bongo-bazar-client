"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

export const register = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/auth/register", data);
        console.log("✅ REGISTER RESPONSE:", res.data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("❌ REGISTER ERROR:", err.response?.data);
        console.error("❌ STATUS:", err.response?.status);
        console.error("❌ URL HIT:", err.config?.url);
        return err.response?.data;
    }
};

export const login = async (data: FieldValues) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        console.log(res.data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Failed to login user", err.response?.data);
        return err.response?.data;
    }
};

export const logout = async () => {
    try {
        const res = await axiosInstance.post("/auth/logout");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Failed to logout", err.response?.data);
        return err.response?.data;
    }
};