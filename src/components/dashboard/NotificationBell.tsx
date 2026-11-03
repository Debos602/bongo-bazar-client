"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getNotifications, getUnreadCount, markAllNotificationsRead, markNotificationRead, type AppNotification,
} from "@/actions/notifications";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const POLL_MS = 60_000;

const timeAgo = (iso: string) => {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Dhaka" });
};

export default function NotificationBell() {
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<AppNotification[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Only the count is checked in the background, and only while the tab is visible.
  useEffect(() => {
    const refresh = async () => {
      if (document.hidden) return;
      const count = await getUnreadCount();
      if (count !== null) setUnread(count);
    };
    refresh();
    const timer = setInterval(refresh, POLL_MS);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getNotifications();
    setLoading(false);
    if (data) {
      setItems(data.items);
      setUnread(data.unread);
    }
  }, []);

  const open = (n: AppNotification) => {
    if (!n.readAt) {
      setItems((list) => list?.map((x) => (x.id === n.id ? { ...x, readAt: new Date().toISOString() } : x)) ?? null);
      setUnread((c) => Math.max(0, c - 1));
      markNotificationRead(n.id);
    }
    if (n.link?.startsWith("/")) router.push(n.link);
  };

  const markAll = async () => {
    const before = { items, unread };
    setItems((list) => list?.map((x) => ({ ...x, readAt: x.readAt ?? new Date().toISOString() })) ?? null);
    setUnread(0);
    if (!(await markAllNotificationsRead())) {
      setItems(before.items);
      setUnread(before.unread);
      toast.error("Could not mark notifications as read");
    }
  };

  return (
    <DropdownMenu onOpenChange={(isOpen) => { if (isOpen) load(); }}>
      <DropdownMenuTrigger
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        className="relative flex size-9 items-center justify-center rounded-lg text-slate-600 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-600"
      >
        <Bell size={19} aria-hidden />
        {unread > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold tabular-nums leading-none text-white">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-[min(22rem,calc(100vw-2rem))] p-0">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="text-sm font-semibold text-slate-900">Notifications</span>
          {unread > 0 && (
            <button type="button" onClick={markAll} className="text-xs font-medium text-emerald-800 hover:underline">
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {items === null ? (
            <p role="status" className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-slate-500">
              {loading ? <><Loader2 size={15} className="animate-spin" aria-hidden /> Loading</> : "Could not load notifications"}
            </p>
          ) : items.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">You&apos;ll see orders, payouts and updates here.</p>
          ) : (
            items.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onSelect={() => open(n)}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-none border-b border-slate-50 px-4 py-3 last:border-0",
                  !n.readAt && "bg-emerald-50/70",
                )}
              >
                <span aria-hidden className={cn("mt-1.5 size-2 flex-shrink-0 rounded-full", n.readAt ? "bg-transparent" : "bg-emerald-600")} />
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-sm text-slate-900", !n.readAt && "font-semibold")}>
                    {n.title}
                    {!n.readAt && <span className="sr-only"> (unread)</span>}
                  </span>
                  {n.body && <span className="mt-0.5 line-clamp-2 block text-xs text-slate-600">{n.body}</span>}
                  <span className="mt-1 block text-[11px] text-slate-500">{timeAgo(n.createdAt)}</span>
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
