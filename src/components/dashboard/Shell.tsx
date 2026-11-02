"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BadgePercent, FileText, Heart, LayoutDashboard, LogOut, MapPin, Menu, MessageSquare, Package, ShoppingBag,
  Store, Tag, UserRound, Users, Wallet, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/vendors", label: "Vendors", icon: Store },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/admin/payouts", label: "Payouts", icon: Wallet },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/categories", label: "Categories", icon: Tag },
  { href: "/dashboard/admin/coupons", label: "Coupons", icon: BadgePercent },
  { href: "/dashboard/admin/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/admin/posts", label: "Posts", icon: FileText },
];
const VENDOR = [
  { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/vendor/products", label: "Products", icon: Package },
  { href: "/dashboard/vendor/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/vendor/coupons", label: "Coupons", icon: BadgePercent },
  { href: "/dashboard/vendor/payouts", label: "Earnings", icon: Wallet },
  { href: "/dashboard/vendor/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/dashboard/vendor/shop", label: "Shop settings", icon: Store },
];
const USER = [
  { href: "/dashboard/user", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/user/orders", label: "My orders", icon: ShoppingBag },
  { href: "/dashboard/user/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/user/reviews", label: "My reviews", icon: MessageSquare },
  { href: "/dashboard/user/addresses", label: "Addresses", icon: MapPin },
  { href: "/dashboard/user/profile", label: "Profile", icon: UserRound },
];
const SELL = { href: "/dashboard/user/sell", label: "Sell on Bongo Bazar", icon: Store };

const ROOTS = ["/dashboard/admin", "/dashboard/vendor", "/dashboard/user"];

export default function Shell({ role, name, email, children }: { role: string; name: string; email: string; children: React.ReactNode; }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const groups = isAdmin
    ? [{ title: "Admin", items: ADMIN }]
    : role === "VENDOR"
      ? [{ title: "My shop", items: VENDOR }, { title: "My account", items: USER }]
      : [{ title: "My account", items: [...USER, SELL] }];

  const sidebar = (
    <div className="flex h-full flex-col bg-[#022c22] text-emerald-50">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-base font-bold tracking-tight text-white">Bongo Bazar</Link>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10 lg:hidden"><X size={18} /></button>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wider text-emerald-300/70">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = ROOTS.includes(href) ? pathname === href : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                        active ? "bg-emerald-700/60 font-medium text-white" : "text-emerald-100/85 hover:bg-white/10",
                      )}
                    >
                      <Icon size={16} aria-hidden />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-medium text-white">{name}</p>
        <p className="truncate text-xs text-emerald-200/70">{email}</p>
        <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="mt-3 flex items-center gap-2 text-xs text-emerald-100 hover:text-white">
          <LogOut size={14} aria-hidden /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64">{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-60">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="rounded p-1 text-slate-700 hover:bg-slate-100"><Menu size={20} /></button>
          <span className="text-sm font-semibold text-slate-900">Bongo Bazar</span>
        </div>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
