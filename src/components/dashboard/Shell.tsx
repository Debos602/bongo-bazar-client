"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BadgePercent, ChevronDown, ChevronRight, ExternalLink, FileText, Heart, LayoutDashboard, LogOut, MapPin, Menu, MessageSquare, Package, ShoppingBag,
  Store, Tag, UserRound, Users, Wallet, X,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import NotificationBell from "./NotificationBell";

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

  // The longest matching menu path names the current page.
  const current = groups
    .flatMap((g) => g.items.map((item) => ({ group: g.title, label: item.label, href: item.href })))
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0] ?? { group: "Dashboard", label: "Overview", href: "" };
  const initials = (name || email).split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase()).join("");

  const sidebar = (
    <div className="flex h-full flex-col bg-[#022c22] text-emerald-50">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">Bongo Bazar</Link>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10 lg:hidden"><X size={18} /></button>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300/70">{group.title}</p>
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
                        "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors",
                        active ? "bg-emerald-700/60 font-semibold text-white" : "font-medium text-emerald-100/85 hover:bg-white/10",
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
    </div>
  );

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-700 antialiased">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64">{sidebar}</aside>
        </div>
      )}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:gap-3 sm:px-6">
          <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="flex size-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden">
            <Menu size={20} aria-hidden />
          </button>

          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1.5 text-[13px]">
            <span className="hidden flex-shrink-0 text-slate-500 sm:inline">{current.group}</span>
            <ChevronRight size={14} aria-hidden className="hidden flex-shrink-0 text-slate-300 sm:block" />
            <span aria-current="page" className="truncate font-semibold text-slate-900">{current.label}</span>
          </nav>

          <Link href="/" className="hidden items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 sm:flex">
            <ExternalLink size={15} aria-hidden /> View store
          </Link>

          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Account menu" className="flex items-center gap-2 rounded-lg p-1 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-600 sm:pr-2">
              <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">{initials}</span>
              <span className="hidden max-w-32 truncate text-sm font-medium text-slate-800 md:block">{name}</span>
              <ChevronDown size={14} aria-hidden className="hidden text-slate-500 md:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56">
              <div className="px-2 py-1.5">
                <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
                <p className="truncate text-xs text-slate-500">{email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/dashboard/user/profile"><UserRound size={15} aria-hidden /> Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild className="sm:hidden"><Link href="/"><ExternalLink size={15} aria-hidden /> View store</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}><LogOut size={15} aria-hidden /> Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 leading-relaxed sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
