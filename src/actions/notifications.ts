"use server";

import { apiFetch } from "@/lib/serverApi";

export type AppNotification = {
    id: number;
    title: string;
    body?: string | null;
    link?: string | null;
    readAt?: string | null;
    createdAt: string;
};

export const getNotifications = async () => {
    const res = await apiFetch<{ items: AppNotification[]; unread: number; }>("/notification?limit=20");
    return res.data ?? null;
};

export const getUnreadCount = async () => {
    const res = await apiFetch<{ unread: number; }>("/notification/unread-count");
    return res.data?.unread ?? null;
};

export const markNotificationRead = async (id: number) => {
    await apiFetch(`/notification/${Number(id)}/read`, { method: "PATCH" });
};

export const markAllNotificationsRead = async () => {
    const res = await apiFetch("/notification/read-all", { method: "PATCH" });
    return res.success;
};
