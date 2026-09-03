"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusCircle,
  LogOut,
  ShoppingCart,
  Store,
  Tag,
  User,
  LayoutDashboard,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

// ── Bongo Bazar colour palette ────────────────────────────────────────────────
// Sourced from the dashboard's globals.css CSS-variable definitions:
//   --sidebar            : #1a1a2e  (deep navy background)
//   --sidebar-foreground : #e8d5b7  (warm cream text)
//   --sidebar-border     : #2d2d4e  (muted navy divider)
//   --sidebar-primary    : #c0392b  (crimson red – brand accent)
//   --sidebar-accent     : #c0392b1a (crimson tint for active/hover bg)
//   --sidebar-accent-fg  : #e74c3c  (vivid red for active/hover text)
// ─────────────────────────────────────────────────────────────────────────────
const colors = {
  sidebar: "#1a1a2e",
  foreground: "#e8d5b7",
  border: "#2d2d4e",
  primary: "#c0392b",
  accentBg: "rgba(192, 57, 43, 0.15)",
  accentFg: "#e74c3c",
  mutedFg: "#a89880",
  logoBadge: "#c0392b",
};

const menu = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/dashboard/products", icon: Store },
  { label: "Create Product", href: "/dashboard/create-product", icon: PlusCircle },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Categories", href: "/dashboard/categories", icon: Tag },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const session = useSession();
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col"
      style={{
        background: colors.sidebar,
        color: colors.foreground,
        borderRight: `1px solid ${colors.border}`,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        zIndex: 30,
      }}
    >
      {/* ── Logo ── */}
      <div
        className="p-5 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        {/* Red circle badge — echoes Bangladesh flag motif */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-white text-sm font-bold flex-shrink-0"
          style={{ background: colors.logoBadge }}
        >
          BB
        </div>
        <Link href="/" className="leading-tight">
          <div
            className="text-base font-bold tracking-wide"
            style={{ color: colors.primary }}
          >
            Bongo Bazar
          </div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: colors.mutedFg }}>
            Dashboard
          </div>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {menu.map((item) => {
          const Icon = item.icon as React.ElementType;
          // exact match for "/" to avoid highlighting Dashboard when on /dashboard
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150"
              style={{
                background: active ? colors.accentBg : "transparent",
                color: active ? colors.accentFg : colors.foreground,
                borderLeft: active
                  ? `3px solid ${colors.primary}`
                  : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = colors.accentBg;
                  (e.currentTarget as HTMLElement).style.color = colors.accentFg;
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = colors.foreground;
                }
              }}
            >
              <Icon
                className="h-4 w-4 flex-shrink-0"
                style={{ color: active ? colors.primary : colors.mutedFg }}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer / Auth ── */}
      <div
        className="p-4"
        style={{ borderTop: `1px solid ${colors.border}` }}
      >
        {session.status === "authenticated" ? (
          <div>
            {/* User info */}
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white flex-shrink-0"
                style={{ background: colors.primary }}
              >
                {(session.data?.user?.name || session.data?.user?.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <span
                className="text-xs truncate max-w-[136px]"
                style={{ color: colors.mutedFg }}
              >
                {session.data?.user?.name || session.data?.user?.email}
              </span>
            </div>

            {/* Logout */}
            <button
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150"
              style={{ color: colors.mutedFg }}
              onClick={() => signOut()}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = colors.accentBg;
                (e.currentTarget as HTMLElement).style.color = colors.accentFg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = colors.mutedFg;
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        ) : (
          <Link href="/auth/login">
            <button
              className="w-full rounded-md py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: colors.primary }}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}