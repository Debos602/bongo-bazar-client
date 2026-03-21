"use server";

import { getUserSession } from "@/helpers/getUserSession";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
    const session = await getUserSession();

    const productInfo = Object.fromEntries(data.entries());
    const modifiedData = {
        ...productInfo,
        vendorId: session?.user?.id,
    };

    try {
        const res = await axiosInstance.post("/product", modifiedData);
        const result = res.data;

        if (result?.id) {
            revalidateTag("PRODUCTS");
            revalidatePath("/products");
            redirect("/");
        }

        return result;
    } catch (error) {
        const err = error as AxiosError;
        console.error("Failed to create product", err.response?.data);
        return err.response?.data;
    }
};