"use client";

import { Bell, Search, Settings, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";

// ── Bongo Bazar colour palette (matches Sidebar) ──────────────────────────────
const colors = {
  headerBg: "#12122a",          // slightly darker than sidebar for depth
  headerBorder: "#2d2d4e",
  foreground: "#e8d5b7",        // warm cream
  mutedFg: "#a89880",
  primary: "#c0392b",           // crimson red
  primaryHover: "#e74c3c",
  inputBg: "#1a1a2e",
  inputBorder: "#2d2d4e",
  inputFocus: "#c0392b",
  iconBtnHover: "rgba(192, 57, 43, 0.15)",
  badgeBg: "#c0392b",
};

// ── Icon button with hover ring ───────────────────────────────────────────────
function IconBtn({
  children,
  badge,
  onClick,
}: {
  children: React.ReactNode;
  badge?: number;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center h-9 w-9 rounded-lg transition-all duration-150"
      style={{
        background: hovered ? colors.iconBtnHover : "transparent",
        color: hovered ? colors.primaryHover : colors.mutedFg,
        border: `1px solid ${hovered ? colors.primary : "transparent"}`,
      }}
    >
      {children}
      {badge != null && badge > 0 && (
        <span
          className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: colors.badgeBg }}
        >
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="h-6 w-px mx-1"
      style={{ background: colors.headerBorder }}
    />
  );
}

export default function DashboardHeader({
  title = "Dashboard",
}: {
  title?: string;
}) {
  const session = useSession();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const userName =
    session.data?.user?.name || session.data?.user?.email || "Guest";
  const userRole = (session.data?.user as any)?.role || "Customer";
  const userImg = session.data?.user?.image || "";
  const initials = userName.charAt(0).toUpperCase();

  return (
    <header
      className="flex items-center justify-between gap-4 px-6 py-3"
      style={{
        background: colors.headerBg,
        color: colors.foreground,
        borderBottom: `1px solid ${colors.headerBorder}`,
        minHeight: "64px",
        position: "fixed",
        left: 256,
        right: 0,
        top: 0,
        zIndex: 40,
      }}
    >
      {/* ── Left: title + search ── */}
      <div className="flex items-center gap-5 flex-1 min-w-0">
        {/* Page title with red left bar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="h-5 w-[3px] rounded-full"
            style={{ background: colors.primary }}
          />
          <h1
            className="text-base font-semibold tracking-wide"
            style={{ color: colors.foreground }}
          >
            {title}
          </h1>
        </div>

        {/* Search bar */}
        <div
          className="hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-200 w-72"
          style={{
            background: colors.inputBg,
            border: `1px solid ${searchFocused ? colors.inputFocus : colors.inputBorder}`,
            boxShadow: searchFocused
              ? `0 0 0 2px rgba(192,57,43,0.15)`
              : "none",
          }}
        >
          <Search
            className="h-3.5 w-3.5 flex-shrink-0"
            style={{ color: searchFocused ? colors.primary : colors.mutedFg }}
          />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search products, orders…"
            className="bg-transparent text-sm outline-none w-full placeholder:text-sm"
            style={{
              color: colors.foreground,
              caretColor: colors.primary,
            }}
          />
          {searchVal && (
            <button
              onClick={() => setSearchVal("")}
              className="text-xs"
              style={{ color: colors.mutedFg }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Right: actions + user ── */}
      <div className="flex items-center gap-1.5">
        {/* Mobile search toggle */}
        <div className="md:hidden">
          <IconBtn>
            <Search className="h-4 w-4" />
          </IconBtn>
        </div>

        {/* Bell with badge */}
        <IconBtn badge={3}>
          <Bell className="h-4 w-4" />
        </IconBtn>

        {/* Settings */}
        <Link href="/settings" className="hidden sm:block">
          <IconBtn>
            <Settings className="h-4 w-4" />
          </IconBtn>
        </Link>

        <Divider />

        {/* User chip */}
        <button
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-all duration-150"
          style={{ color: colors.foreground }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              colors.iconBtnHover;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImg} alt={userName} />
              <AvatarFallback
                className="text-xs font-bold text-white"
                style={{ background: colors.primary }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Online dot */}
            <span
              className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2"
              style={{
                background: "#27ae60",
                borderColor: colors.headerBg,
              }}
            />
          </div>

          {/* Name + role */}
          <div className="hidden sm:flex flex-col text-left">
            <span
              className="text-sm font-medium leading-tight truncate max-w-[120px]"
              style={{ color: colors.foreground }}
            >
              {userName}
            </span>
            <span
              className="text-[10px] uppercase tracking-widest leading-tight"
              style={{ color: colors.mutedFg }}
            >
              {userRole}
            </span>
          </div>

          <ChevronDown
            className="h-3 w-3 hidden sm:block"
            style={{ color: colors.mutedFg }}
          />
        </button>
      </div>
    </header>
  );
}