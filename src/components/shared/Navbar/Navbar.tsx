"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  Home,
  Search,
  ChevronDown,
  Menu,
  X,
  LayoutGrid,
  Tag,
  Heart,
  Bell,
  User,
  LogIn,
  UserPlus,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Package,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import logo from "../../../../public/logo.png";
import getCategoryIcon from "@/lib/categoryIcons";
import { useSession, signOut } from "next-auth/react";
import { getCategory } from "@/actions/category";

type Category = {
  slug: string;
  name: string;
};

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

const uspItems = [
  { icon: Truck, label: "Free Delivery on ৳999+" },
  { icon: ShieldCheck, label: "100% Secure Payment" },
  { icon: Clock, label: "24/7 Customer Support" },
  { icon: MapPin, label: "Deliver All Over Bangladesh" },
];

export default function Navbar({ cartButton }: { cartButton?: ReactNode; }) {
  const pathname = usePathname();
  const router = useRouter();
  const catRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [uspIdx, setUspIdx] = useState(0);
  // ✅ useState + useEffect দিয়ে getCategory ব্যবহার
  const [safeCategories, setSafeCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        console.log("Raw category data Navbar:", data);
        setSafeCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user as SessionUser | undefined;

  // ✅ mounted না হওয়া পর্যন্ত skeleton দেখাও
  // server ও client দুজনেই প্রথমে skeleton → কোনো mismatch নেই
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearch = (closeMobile = false) => {
    const q = searchQuery.trim();
    router.push(
      q ? `/products?searchTerm=${encodeURIComponent(q)}` : "/products"
    );
    setSearchQuery("");
    if (closeMobile) setMobileOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setUspIdx((i) => (i + 1) % uspItems.length),
      3500
    );
    return () => clearInterval(t);
  }, []);

  const UserDropdown = ({ mobile = false }: { mobile?: boolean; }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-xl transition-all",
            mobile
              ? "w-full p-3 hover:bg-gray-50 border border-gray-200"
              : "p-1.5 hover:bg-gray-100"
          )}
        >
          <Avatar className="w-8 h-8 border-2 border-[#006a4e]">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback className="bg-gradient-to-br from-[#dc143c] to-[#006a4e] text-white text-xs font-bold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          {mobile ? (
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[180px]">
                {user?.email}
              </p>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-start">
              <span className="text-xs font-bold text-gray-800 leading-tight max-w-[90px] truncate">
                {user?.name}
              </span>
              <span className="text-[10px] text-gray-400">অ্যাকাউন্ট</span>
            </div>
          )}

          <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={mobile ? "center" : "end"}
        sideOffset={8}
        className="w-56 rounded-xl shadow-xl border border-gray-100 p-1"
      >
        <DropdownMenuLabel className="px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-9 h-9 border-2 border-[#006a4e]">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback className="bg-gradient-to-br from-[#dc143c] to-[#006a4e] text-white text-xs font-bold">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-800 truncate">
                {user?.name}
              </span>
              <span className="text-xs text-gray-400 truncate">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="mt-2">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full",
                user?.role === "ADMIN"
                  ? "bg-[#dc143c]/10 text-[#dc143c]"
                  : "bg-[#006a4e]/10 text-[#006a4e]"
              )}
            >
              {user?.role === "ADMIN" ? "অ্যাডমিন" : "কাস্টমার"}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100" />

        <DropdownMenuGroup>
          {user?.role === "ADMIN" && (
            <DropdownMenuItem
              asChild
              className="rounded-lg cursor-pointer hover:bg-[#006a4e]/5 hover:text-[#006a4e]"
            >
              <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm font-medium">ড্যাশবোর্ড</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            asChild
            className="rounded-lg cursor-pointer hover:bg-[#006a4e]/5 hover:text-[#006a4e]"
          >
            <Link href="/profile" className="flex items-center gap-2.5 px-3 py-2">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">প্রোফাইল</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="rounded-lg cursor-pointer hover:bg-[#006a4e]/5 hover:text-[#006a4e]"
          >
            <Link href="/orders" className="flex items-center gap-2.5 px-3 py-2">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">আমার অর্ডার</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="rounded-lg cursor-pointer hover:bg-[#006a4e]/5 hover:text-[#006a4e]"
          >
            <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">সেটিংস</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-gray-100" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="rounded-lg cursor-pointer hover:bg-[#dc143c]/5 hover:text-[#dc143c] focus:bg-[#dc143c]/5 focus:text-[#dc143c]"
        >
          <div className="flex items-center gap-2.5 px-3 py-2 w-full">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">লগ আউট</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const AuthButtons = ({ mobile = false }: { mobile?: boolean; }) =>
    mobile ? (
      <div className="flex flex-col gap-2.5">
        <Button
          asChild
          className="w-full h-11 text-sm font-semibold text-white gap-2 bg-emerald-600 hover:bg-emerald-700 border-0"
        >
          <Link href="/login">
            <LogIn className="w-4 h-4" />
            সাইন ইন
          </Link>
        </Button>

        <Button
          asChild
          className="w-full h-11 text-sm font-semibold text-white gap-2 bg-red-600 hover:bg-red-700 border-0"
        >
          <Link href="/register">
            <UserPlus className="w-4 h-4" />
            সাইন আপ
          </Link>
        </Button>
      </div>
    ) : (
      <div className="flex items-center gap-2 ml-1">
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-9 px-3 text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 border border-gray-200 rounded-lg gap-1.5"
        >
          <Link href="/login">
            <LogIn className="w-4 h-4" />
            সাইন ইন
          </Link>
        </Button>

        <Button
          asChild
          size="sm"
          className="h-9 px-4 text-sm font-semibold text-white rounded-lg gap-1.5 hover:opacity-90 border-0"
          style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}
        >
          <Link href="/register">
            <UserPlus className="w-4 h-4" />
            সাইন আপ
          </Link>
        </Button>
      </div>
    );

  // ─── Auth section renderers (hydration-safe) ───────────────────────────────

  /** Desktop top-bar: Avatar + name OR login buttons OR skeleton */
  const renderDesktopAuth = () => {
    if (!mounted) {
      return <div className="w-24 h-9 rounded-lg bg-gray-100 animate-pulse" />;
    }
    return isLoggedIn ? <UserDropdown /> : <AuthButtons />;
  };

  /** Mobile top-bar: Avatar + name OR login buttons OR skeleton */
  const renderMobileTopBar = () => {
    if (!mounted) {
      return <div className="w-20 h-6 rounded bg-white/20 animate-pulse" />;
    }
    if (isLoggedIn) {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7 border-2 border-emerald-400">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback className="bg-gradient-to-br from-[#dc143c] to-[#006a4e] text-white text-[10px] font-bold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-emerald-300 text-xs font-semibold truncate max-w-[100px]">
            {user?.name}
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Button
          asChild
          size="sm"
          className="h-6 px-3 text-xs rounded font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-0"
        >
          <Link href="/login">
            <LogIn className="w-3 h-3 mr-1" />
            সাইন ইন
          </Link>
        </Button>

        <Button
          asChild
          size="sm"
          className="h-6 px-3 text-xs rounded font-semibold bg-red-700 hover:bg-red-800 text-white border-0"
        >
          <Link href="/register">
            <UserPlus className="w-3 h-3 mr-1" />
            সাইন আপ
          </Link>
        </Button>
      </div>
    );
  };

  /** Mobile Sheet footer: UserDropdown OR AuthButtons OR skeleton */
  const renderMobileSheetAuth = () => {
    if (!mounted) {
      return <div className="w-full h-11 rounded-xl bg-gray-200 animate-pulse" />;
    }
    return isLoggedIn ? <UserDropdown mobile /> : <AuthButtons mobile />;
  };

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Desktop top info bar ── */}
      <div className="hidden md:block bg-gradient-to-r from-emerald-950 via-stone-900 to-red-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {uspItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={i}
                  className={cn(
                    "flex items-center gap-1.5 text-[11px] font-medium transition-all duration-500",
                    i === uspIdx ? "text-emerald-300 scale-105" : "text-gray-400"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {item.label}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-5 text-xs text-gray-300">
            <a
              href="tel:01641754794"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              হটলাইনঃ
              <span className="text-emerald-300 font-semibold ml-0.5">০১৬৪১-৭৫৪৭৯৪</span>
            </a>

            <a
              href="mailto:info@bongobazar.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-red-300 transition-colors"
            >
              <Mail className="w-3 h-3 text-red-400" />
              <span className="text-red-300 font-semibold">info@bongobazar.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Mobile top info bar ── */}
      <div
        className="md:hidden text-gray-200 text-xs py-2"
        style={{
          background:
            "linear-gradient(90deg, #0d4a1f 0%, #1a2e0d 45%, #4a0d0d 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <a
            href="tel:01641754794"
            className="flex items-center gap-1.5 text-emerald-300 font-semibold"
          >
            <Phone className="w-3 h-3" />
            ০১৬৪১-৭৫৪৭৯৪
          </a>

          {/* ✅ FIX 1 — mobile top bar auth */}
          {renderMobileTopBar()}
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav
        className={cn(
          "bg-white sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "shadow-[0_6px_32px_rgba(0,0,0,0.14)]"
            : "shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        )}
        style={{
          borderTop: "3px solid transparent",
          borderImage:
            "linear-gradient(90deg,#16a34a,#15803d 40%,#b91c1c 60%,#dc2626) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <Image
                src={logo}
                alt="BongoBazar"
                width={Math.round((logo.width / logo.height) * 54)}
                height={54}
                className="w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            {/* Desktop search */}
            <div className="hidden md:flex flex-1 max-w-[620px] relative">
              <div
                className={cn(
                  "absolute inset-0 rounded-md transition-all duration-300 pointer-events-none",
                  searchFocused ? "shadow-[0_0_0_3px_rgba(22,163,74,0.18)]" : ""
                )}
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="প্রোডাক্ট সার্চ করুন..."
                className="rounded-r-none border-2 border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-sm transition-colors"
                style={{ borderColor: searchFocused ? "#16a34a" : "#d1d5db" }}
              />

              <button
                type="button"
                onClick={() => handleSearch()}
                className="px-5 h-11 text-white font-semibold rounded-r-md transition-all hover:opacity-90 active:scale-95 flex items-center gap-1.5"
                style={{
                  background: "linear-gradient(135deg,#16a34a,#15803d)",
                  border: "2px solid #15803d",
                  borderLeft: "none",
                }}
              >
                <Search className="w-4 h-4" />
                <span className="text-sm hidden lg:inline">খুঁজুন</span>
              </button>
            </div>

            {/* Right side actions */}
            <div className="ml-auto flex items-center gap-1 md:gap-2">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden md:flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50 relative group"
              >
                <Heart className="w-6 h-6" />
                <span className="text-sm font-medium hidden lg:inline">উইশলিস্ট</span>
                <Badge className="absolute -top-1 -right-1 h-[16px] w-[16px] flex items-center justify-center p-0 text-[9px] font-bold border-2 border-white bg-red-500">
                  3
                </Badge>
              </Link>

              {/* Notification bell */}
              <button
                type="button"
                className="hidden md:flex items-center p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
              </button>

              {/* ✅ FIX 2 — desktop nav auth */}
              <div className="hidden md:flex items-center ml-1">
                {renderDesktopAuth()}
              </div>

              {cartButton}

              {/* Mobile menu sheet */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden w-10 h-10 rounded-xl border border-gray-200"
                    aria-label="Menu"
                  >
                    {mobileOpen ? (
                      <X className="w-5 h-5 text-gray-700" />
                    ) : (
                      <Menu className="w-5 h-5 text-gray-700" />
                    )}
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[300px] p-0 overflow-y-auto">
                  {/* Sheet header */}
                  <div
                    className="p-4 flex items-center justify-between"
                    style={{
                      background:
                        "linear-gradient(135deg,#0d4a1f,#1a2e0d 50%,#4a0d0d)",
                    }}
                  >
                    <Image
                      src={logo}
                      alt="BongoBazar"
                      width={Math.round((logo.width / logo.height) * 40)}
                      height={40}
                      className="h-10"
                    />
                    <button
                      type="button"
                      onClick={() => setMobileOpen(false)}
                      className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sheet search */}
                  <div className="flex p-3 border-b bg-gray-50">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch(true);
                      }}
                      placeholder="সার্চ করুন..."
                      className="rounded-r-none text-sm border-2 border-r-0 focus-visible:ring-0 h-10"
                      style={{ borderColor: "#16a34a" }}
                    />
                    <button
                      type="button"
                      onClick={() => handleSearch(true)}
                      className="rounded-r-md px-4 h-10 text-white flex items-center"
                      style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick links */}
                  <div className="grid grid-cols-3 gap-2 p-3 border-b">
                    {[
                      { icon: Home, label: "হোম", href: "/" },
                      { icon: Heart, label: "উইশলিস্ট", href: "/wishlist" },
                      { icon: Bell, label: "নোটিফিকেশন", href: "/notifications" },
                    ].map(({ icon: Icon, label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-all text-center"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">{label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Categories */}
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-4 pt-4 pb-1.5 tracking-widest">
                    ক্যাটেগরীজ
                  </p>

                  {loading
                    ? Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="px-4 py-3 border-b border-gray-50">
                        <div className="h-3 w-3/5 bg-gray-200 rounded-md animate-pulse" />
                      </div>
                    ))
                    : safeCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 border-b border-gray-50 transition-all hover:pl-6 hover:bg-emerald-50 hover:text-emerald-700 group"
                      >
                        <span className="text-xl w-7 flex-shrink-0 text-center">
                          {getCategoryIcon(cat.name)}
                        </span>
                        <span className="font-medium flex-1">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}

                  {/* ✅ FIX 3 — mobile sheet footer auth */}
                  <div className="p-4 border-t mt-2 bg-gray-50">
                    {renderMobileSheetAuth()}
                  </div>

                  {/* USP items */}
                  <div className="px-4 py-3 space-y-2 bg-white border-t">
                    {uspItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile inline search */}
          <div className="md:hidden flex pb-3 gap-0">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="প্রোডাক্ট সার্চ করুন..."
              className="rounded-r-none border-2 border-r-0 focus-visible:ring-0 text-sm h-10"
              style={{ borderColor: "#16a34a" }}
            />
            <button
              type="button"
              onClick={() => handleSearch()}
              className="px-4 rounded-r-md text-white h-10 flex items-center"
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Category nav bar (desktop) ── */}
        <div
          className="hidden md:block"
          style={{
            background:
              "linear-gradient(90deg,#166534 0%,#15803d 35%,#991b1b 70%,#b91c1c 100%)",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-4 flex items-center"
            ref={catRef}
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-2 px-5 py-3 text-white font-semibold text-sm whitespace-nowrap transition-colors hover:bg-black/15 select-none"
                style={{ background: catOpen ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.18)" }}
              >
                <LayoutGrid className="w-4 h-4" />
                ক্যাটেগরীজ
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200",
                    catOpen && "rotate-180"
                  )}
                />
              </button>

              {catOpen && (
                <div
                  className="absolute top-full left-0 bg-white w-60 z-50 rounded-b-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ borderTop: "3px solid #16a34a" }}
                >
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="px-4 py-3 border-b border-gray-50">
                        <div className="h-3 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                      </div>
                    ))
                    : safeCategories.map((cat, i) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCatOpen(false)}
                        style={{ animationDelay: `${i * 25}ms` }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 border-b border-gray-100 last:border-0 transition-all hover:pl-6 hover:bg-emerald-50 hover:text-emerald-700 group"
                      >
                        <span className="text-base w-6 text-center">
                          {getCategoryIcon(cat.name)}
                        </span>
                        <span className="flex-1 font-medium">{cat.name}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              {safeCategories.slice(0, 9).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium px-3.5 py-3 whitespace-nowrap",
                    "border-r border-white/10 last:border-0",
                    "transition-all duration-150 hover:bg-white/15",
                    "text-white/85 hover:text-white",
                    pathname === `/category/${cat.slug}` &&
                    "bg-white/20 text-white font-semibold"
                  )}
                >
                  <span className="text-base leading-none">
                    {getCategoryIcon(cat.name)}
                  </span>
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/products"
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium px-3.5 py-3 whitespace-nowrap ml-auto",
                  "text-white/70 hover:text-white hover:bg-white/15 transition-all",
                  pathname === "/products" && "bg-white/20 text-white font-semibold"
                )}
              >
                <Tag className="w-3.5 h-3.5" />
                সব প্রোডাক্ট
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}