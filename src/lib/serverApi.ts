import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

export type ApiResult<T> = {
    success: boolean;
    message: string;
    data?: T;
    meta?: { page: number; limit: number; total: number; };
    status: number;
};

const baseUrl = () => process.env.NEXT_PUBLIC_BASE_API as string;

// Server-only: calls the API with the signed-in user's token. Never cached, so a
// dashboard always shows current data.
export const apiFetch = async <T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> => {
    const session = await getServerSession(authOptions);
    const token = session?.user?.accessToken;
    try {
        const res = await fetch(`${baseUrl()}${path}`, {
            ...init,
            cache: "no-store",
            headers: {
                ...(init.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...init.headers,
            },
        });
        const json = await res.json().catch(() => ({}));
        // Validation errors list the fields at fault; show the first instead of a generic line.
        const issue = Array.isArray(json.error) ? json.error[0] : null;
        if (issue?.message) json.message = issue.path ? `${String(issue.path).replace(/^body\./, "")}: ${issue.message}` : issue.message;
        return {
            success: res.ok && json.success !== false,
            message: json.message ?? (res.ok ? "Done" : "Something went wrong"),
            data: json.data,
            meta: json.meta,
            status: res.status,
        };
    } catch {
        return { success: false, message: "Cannot reach the server", status: 503 };
    }
};

export const apiGet = <T>(path: string) => apiFetch<T>(path);
