import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const money = (n: number | null | undefined) => `৳ ${Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
export const shortDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka" });

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode; }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function Panel({ title, action, children, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string; }) {
  return (
    <section className={cn("rounded-xl border border-slate-200 bg-white", className)}>
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: React.ReactNode; hint?: string; tone?: "accent" | "warn"; }) {
  return (
    <div className={cn(
      "rounded-xl border bg-white p-4",
      tone === "accent" ? "border-emerald-300 bg-emerald-50/60" : tone === "warn" ? "border-amber-300 bg-amber-50/60" : "border-slate-200",
    )}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1.5 text-xl font-bold tabular-nums text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
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

export function Badge({ status }: { status: string; }) {
  return (
    <span className={cn("inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold", STATUS_STYLES[status] ?? "bg-slate-100 text-slate-700")}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

export function Empty({ title, children }: { title: string; children?: React.ReactNode; }) {
  return (
    <div className="px-6 py-12 text-center">
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
          <tr className="border-b border-slate-100 text-xs text-slate-500">
            {head.map((h) => <th key={h} scope="col" className="px-5 py-2.5 font-medium">{h}</th>)}
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
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
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
