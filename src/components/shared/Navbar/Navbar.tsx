"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone, Mail, Home, ShoppingCart, Search,
  ChevronDown, Menu, X, LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import logo from "../../../../public/logo.png";
const categories = [
  { label: "Baby Shoes", icon: "👟", href: "/category/baby-shoes" },
  { label: "Home Appliance", icon: "🏠", href: "/category/home-appliance" },
  { label: "Baby Cloth", icon: "👗", href: "/category/baby-cloth" },
  { label: "Toys & Games", icon: "🧸", href: "/category/toys" },
  { label: "Electronics", icon: "📱", href: "/category/electronics" },
  { label: "Beauty & Health", icon: "💄", href: "/category/beauty" },
  { label: "Baby Care", icon: "🍼", href: "/category/baby-care" },
];

const quickLinks = [
  { label: "🔥 হট ডিল", href: "/hot-deals" },
  { label: "👟 Baby Shoes", href: "/category/baby-shoes" },
  { label: "🏠 Home Appliance", href: "/category/home-appliance" },
  { label: "👗 Baby Cloth", href: "/category/baby-cloth" },
  { label: "🧸 Toys", href: "/category/toys" },
  { label: "📱 Electronics", href: "/category/electronics" },
  { label: "💄 Beauty", href: "/category/beauty" },
];



export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node))
        setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          TOP BAR  — dark green → dark red gradient
      ════════════════════════════════════════ */}
      <div
        className="text-gray-200 text-xs py-2"
        style={{ background: "linear-gradient(90deg, #0d4a1f 0%, #1a2e0d 45%, #4a0d0d 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">

          {/* Left — contact */}
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-green-300" />
              হটলাইনঃ{" "}
              <a href="tel:01641754794"
                className="text-green-300 font-semibold hover:text-green-200 transition-colors">
                ০১৬৪১-৭৫৪৭৯৪
              </a>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-red-300" />
              ই-মেইলঃ{" "}
              <a href="mailto:info@bongobazar.com"
                className="text-red-300 font-semibold hover:text-red-200 transition-colors">
                info@bongobazar.com
              </a>
            </span>
          </div>

          {/* Right — auth */}
          <div className="flex items-center gap-2">
            <Link href="/"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors mr-1">
              <Home className="w-3 h-3" />
              <span>হোম</span>
            </Link>
            <Button asChild size="sm"
              className="h-6 px-3 text-xs rounded font-semibold"
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none" }}>
              <Link href="/login">সাইন ইন</Link>
            </Button>
            <Button asChild size="sm"
              className="h-6 px-3 text-xs rounded font-semibold"
              style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)", color: "#fff", border: "none" }}>
              <Link href="/register">সাইন আপ</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MAIN NAVBAR — white with subtle top border
      ════════════════════════════════════════ */}
      <nav
        className={cn(
          "bg-white sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
            : "shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        )}
        style={{
          borderTop: "3px solid transparent",
          borderImage: "linear-gradient(90deg,#16a34a,#15803d 40%,#b91c1c 60%,#dc2626) 1"
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="BongoBazar"
                width={Math.round((logo.width / logo.height) * 54)}
                height={54}
                className=" w-auto"
              />
            </Link>

            {/* Search — desktop */}
            <div className="hidden md:flex flex-1 max-w-[600px]">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="প্রোডাক্ট সার্চ করুন..."
                className="rounded-r-none border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ borderColor: "#16a34a", borderRight: "none" }}
              />
              <button
                className="px-5 text-white font-semibold rounded-r-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#16a34a,#15803d)", border: "2px solid #15803d", borderLeft: "none" }}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Cart + Hamburger */}
            <div className="ml-auto flex items-center gap-3">

              {/* Cart */}
              <Link href="/cart"
                className="relative flex items-center gap-1.5 text-gray-700 hover:text-green-700 transition-colors p-2 rounded-xl hover:bg-green-50">
                <ShoppingCart className="w-7 h-7 text-green-600" />
                <Badge className="absolute -top-1 -right-1 h-[18px] w-[18px] flex items-center justify-center p-0 text-[10px] font-bold border-2 border-white"
                  style={{ background: "#dc2626" }}>
                  2
                </Badge>
                <span className="hidden sm:inline text-sm font-semibold text-gray-700">
                  কার্ট
                </span>
              </Link>

              {/* Mobile Sheet */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                    {mobileOpen
                      ? <X className="w-5 h-5 text-gray-700" />
                      : <Menu className="w-5 h-5 text-gray-700" />}
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
                  {/* Sheet header */}
                  <div className="p-4" style={{ background: "linear-gradient(135deg,#0d4a1f,#1a2e0d 50%,#4a0d0d)" }}>
                    <Image
                      src={logo}
                      alt="BongoBazar"
                      width={Math.round((logo.width / logo.height) * 40)}
                      height={40}
                      className="h-10"
                    />
                  </div>

                  {/* Mobile search */}
                  <div className="flex p-3 border-b">
                    <Input placeholder="সার্চ করুন..."
                      className="rounded-r-none text-sm border-2 focus-visible:ring-0"
                      style={{ borderColor: "#16a34a", borderRight: "none" }} />
                    <button className="rounded-r-md px-3 text-white"
                      style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                      <Search className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mobile categories */}
                  <p className="text-xs font-bold text-gray-400 uppercase px-4 pt-4 pb-1 tracking-wider">
                    ক্যাটেগরীজ
                  </p>
                  {categories.map((cat) => (
                    <Link key={cat.href} href={cat.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 border-b border-gray-50 transition-all hover:pl-6 hover:bg-green-50 hover:text-green-700">
                      <span className="text-lg">{cat.icon}</span>
                      {cat.label}
                    </Link>
                  ))}

                  {/* Mobile auth */}
                  <div className="p-4 flex flex-col gap-2 border-t mt-2">
                    <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
                      সাইন ইন
                    </button>
                    <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#dc2626,#b91c1c)" }}>
                      সাইন আপ
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile search row */}
          <div className="md:hidden flex pb-3 gap-0">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রোডাক্ট সার্চ করুন..."
              className="rounded-r-none border-2 focus-visible:ring-0 text-sm"
              style={{ borderColor: "#16a34a", borderRight: "none" }}
            />
            <button className="px-4 rounded-r-md text-white"
              style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}>
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CATEGORY NAV — green → red gradient
        ════════════════════════════════════════ */}
        <div
          className="hidden md:block"
          style={{ background: "linear-gradient(90deg,#166534 0%,#15803d 35%,#991b1b 70%,#b91c1c 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center" ref={catRef}>

            {/* Category dropdown button */}
            <div className="relative">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex items-center gap-2 px-5 py-3 text-white font-semibold text-sm whitespace-nowrap transition-colors hover:bg-white/10"
                style={{ background: catOpen ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.15)" }}
              >
                <LayoutGrid className="w-4 h-4" />
                ক্যাটেগরীজ
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", catOpen && "rotate-180")} />
              </button>

              {/* Dropdown */}
              {catOpen && (
                <div className="absolute top-full left-0 bg-white w-56 z-50 rounded-b-xl overflow-hidden shadow-2xl"
                  style={{ borderTop: "3px solid #16a34a" }}>
                  {categories.map((cat, i) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setCatOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 border-b border-gray-100 last:border-0 transition-all hover:pl-6 hover:text-green-700"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <span className="text-base w-6 text-center">{cat.icon}</span>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick nav links */}
            <div className="flex items-center overflow-x-auto">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-white/85 hover:text-white text-sm font-medium px-4 py-3 whitespace-nowrap border-r border-white/10 last:border-0 transition-all hover:bg-white/15",
                    pathname === link.href && "bg-white/20 text-white font-semibold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}