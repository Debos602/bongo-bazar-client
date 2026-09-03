import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

export const getCategory = async () => {
    try {
        const res = await fetch("/api/categories");
        // console.log("getCategory response:", res);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("getCategory error:", error);
        return [];
    }
};
export const getCategoryBasic = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
            cache: "no-store",
        });
        // console.log("URL:", `${process.env.NEXT_PUBLIC_BASE_API}/category/basic`);
        // console.log("Status:", res.status, res.statusText);
        if (!res.ok) {
            const text = await res.text();
            console.log("Error body:", text);
            throw new Error("Failed to fetch categories");
        }
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("getCategory error:", error);
        return [];
    }
};
// ✅ নতুন function — slug দিয়ে category fetch
export const getCategoryBySlug = async (slug: string) => {
    try {
        const res = await axiosInstance.get(`/category/slug/${slug}`);
        return res.data.data;
    } catch (error) {
        const err = error as AxiosError<{ message?: string; }>;
        return { success: false, message: err.response?.data?.message ?? "error" };
    }
};