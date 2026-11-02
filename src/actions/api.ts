"use server";

import { apiFetch } from "@/lib/serverApi";

const safePath = (path: string) => path.startsWith("/") && !path.includes("..") && !path.includes("//");

export type ActionResult = {
    success: boolean;
    message: string;
    data?: Record<string, unknown> | null;
};

// Dashboard mutations. The API checks the caller's own token and role on every request.
export const apiAction = async (method: "POST" | "PUT" | "PATCH" | "DELETE", path: string, body?: unknown): Promise<ActionResult> => {
    if (!safePath(path)) return { success: false, message: "Invalid request" };
    const res = await apiFetch<Record<string, unknown>>(path, {
        method,
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { success: res.success, message: res.message, data: res.data ?? null };
};

export const apiUpload = async (method: "POST" | "PUT", path: string, form: FormData): Promise<ActionResult> => {
    if (!safePath(path)) return { success: false, message: "Invalid request" };
    const res = await apiFetch<Record<string, unknown>>(path, { method, body: form });
    return { success: res.success, message: res.message, data: res.data ?? null };
};
