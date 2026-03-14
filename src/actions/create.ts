"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {

    const session = await getUserSession();

    const productInfo = Object.fromEntries(data.entries());
    const modifiedData = {
        ...productInfo,
        vendorId: session?.user?.id
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
    });

    const result = await res.json();

    if (result?.id) {
        revalidateTag("PRODUCTS");
        revalidatePath("/products");
        redirect("/");
    }
    return result;
};