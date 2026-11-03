import Link from "next/link";
import {
  BadgePercent, ChartNoAxesCombined, FileText, Heart, LayoutDashboard, MapPin, MessageSquare, Package, ShoppingBag, Store, Tag,
  UserRound, Users, Wallet, type LucideIcon, ChevronLeft, ChevronRight,
  Ban, CheckCircle2, CircleDashed, Clock, FileEdit, Inbox, PackageOpen, RotateCcw, Truck, XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const money = (n: number | null | undefined) => `৳ ${Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
export const shortDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka" });

export const growthHint = (pct: number | null) => {
  if (pct === null) return "Nothing to compare with last month";
  if (pct === 0) return "Same as this time last month";
  return `${pct > 0 ? "Up" : "Down"} ${Math.abs(pct)}% from this time last month`;
};

const PAGE_HEADER_ICONS: Record<string, LucideIcon> = {
  "Marketplace overview": ChartNoAxesCombined,
  Categories: Tag,
  Coupons: BadgePercent,
  Orders: ShoppingBag,
  "My orders": ShoppingBag,
  Payouts: Wallet,
  Earnings: Wallet,
  Posts: FileText,
  Products: Package,
  "Add product": Package,
  Reviews: MessageSquare,
  "My reviews": MessageSquare,
  Users,
  Vendors: Store,
  "Shop settings": Store,
  "My account": UserRound,
  Profile: UserRound,
  Addresses: MapPin,
  Wishlist: Heart,
  "Sell on Bongo Bazar": Store,
  "Your shop is open": Store,
  "Your application": Store,
  "Admin accounts can't open a shop": Store,
};

export function PageHeader({ title, description, action, icon }: { title: string; description?: string; action?: React.ReactNode; icon?: React.ReactNode; }) {
  const Icon = title.startsWith("Edit ") ? Package : PAGE_HEADER_ICONS[title] ?? LayoutDashboard;

  return (
    <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 sm:size-12">
          {icon ?? <Icon size={22} strokeWidth={1.8} />}
        </span>
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>}
        </div>
      </div>
      {action}
    </header>
  );
}

export function Panel({ title, icon: Icon, action, children, className }: { title?: string; icon?: LucideIcon; action?: React.ReactNode; children: React.ReactNode; className?: string; }) {
  return (
    <section className={cn("min-w-0 rounded-xl border border-slate-200 bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-slate-900">
            {Icon && <Icon size={17} className="text-emerald-700" aria-hidden />}
            {title}
          </h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone, icon: Icon }: { label: string; value: React.ReactNode; hint?: string; tone?: "accent" | "warn"; icon?: LucideIcon; }) {
  return (
    <div className={cn(
      "min-w-0 rounded-xl border bg-white p-4",
      tone === "accent" ? "border-emerald-300 bg-emerald-50/60" : tone === "warn" ? "border-amber-300 bg-amber-50/60" : "border-slate-200",
    )}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
        {Icon && (
          <span className={cn(
            "-mt-1 flex size-8 flex-shrink-0 items-center justify-center rounded-lg",
            tone === "accent" ? "bg-emerald-100 text-emerald-800" : tone === "warn" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600",
          )}>
            <Icon size={16} aria-hidden />
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xl font-bold leading-tight tracking-tight tabular-nums text-slate-950 sm:text-2xl">{value}</p>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{hint}</p>}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PROCESSING: "bg-sky-100 text-sky-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  PAID: "bg-emerald-100 text-emerald-800",
  ACTIVE: "bg-emerald-100 text-emerald-800",
  PUBLISHED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-slate-200 text-slate-700",
  REFUNDED: "bg-slate-200 text-slate-700",
  INACTIVE: "bg-slate-200 text-slate-700",
  DRAFT: "bg-slate-200 text-slate-700",
  REJECTED: "bg-red-100 text-red-800",
  SUSPENDED: "bg-red-100 text-red-800",
  FAILED: "bg-red-100 text-red-800",
  BLOCK: "bg-red-100 text-red-800",
  BLOCKED: "bg-red-100 text-red-800",
};

const STATUS_ICONS: Record<string, LucideIcon> = {
  PENDING: Clock,
  PROCESSING: PackageOpen,
  SHIPPED: Truck,
  DELIVERED: CheckCircle2,
  APPROVED: CheckCircle2,
  PAID: CheckCircle2,
  ACTIVE: CheckCircle2,
  PUBLISHED: CheckCircle2,
  CANCELLED: XCircle,
  REFUNDED: RotateCcw,
  INACTIVE: CircleDashed,
  DRAFT: FileEdit,
  REJECTED: XCircle,
  SUSPENDED: Ban,
  FAILED: XCircle,
  BLOCK: Ban,
  BLOCKED: Ban,
};

const statusLabel = (status: string) => {
  const text = status.replaceAll("_", " ").toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function Badge({ status }: { status: string; }) {
  const Icon = STATUS_ICONS[status];
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 align-middle text-xs font-medium", STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700")}>
      {Icon && <Icon size={12} aria-hidden />}
      {statusLabel(status)}
    </span>
  );
}

export function Empty({ title, children, icon: Icon = Inbox }: { title: string; children?: React.ReactNode; icon?: LucideIcon; }) {
  return (
    <div className="px-6 py-12 text-center">
      <Icon size={26} className="mx-auto mb-2 text-slate-300" aria-hidden />
      <p className="text-sm font-medium text-slate-700">{title}</p>
      {children && <div className="mt-2 text-sm text-slate-500">{children}</div>}
    </div>
  );
}

export function LoadError({ message }: { message: string; }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
      Could not load this page: {message}
    </div>
  );
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode; }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-[11px] uppercase tracking-[0.1em] text-slate-500">
            {head.map((h) => <th key={h} scope="col" className="px-5 py-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 [&_td]:px-5 [&_td]:py-3 [&_td]:align-middle">{children}</tbody>
      </table>
    </div>
  );
}

export function Tabs({ basePath, current, options }: { basePath: string; current?: string; options: { value: string; label: string; }[]; }) {
  return (
    <nav aria-label="Filter" className="mb-4 flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = (current ?? "") === o.value;
        return (
          <Link
            key={o.value}
            href={o.value ? `${basePath}?status=${o.value}` : basePath}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors",
              active ? "bg-emerald-800 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Pagination({ basePath, meta, query }: { basePath: string; meta?: { page: number; limit: number; total: number; }; query?: Record<string, string | undefined>; }) {
  if (!meta || meta.total <= meta.limit) return null;
  const pages = Math.ceil(meta.total / meta.limit);
  const href = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([k, v]) => { if (v) params.set(k, v); });
    params.set("page", String(page));
    return `${basePath}?${params}`;
  };
  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-sm text-slate-600">
      <span>Page {meta.page} of {pages} · {meta.total} total</span>
      <span className="flex gap-1">
        {meta.page > 1 && <Link aria-label="Previous page" href={href(meta.page - 1)} className="rounded-md p-1.5 ring-1 ring-slate-200 hover:bg-slate-50"><ChevronLeft size={16} /></Link>}
        {meta.page < pages && <Link aria-label="Next page" href={href(meta.page + 1)} className="rounded-md p-1.5 ring-1 ring-slate-200 hover:bg-slate-50"><ChevronRight size={16} /></Link>}
      </span>
    </div>
  );
}

export const ORDER_TABS = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];
