"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useState } from "react";
import {
  ShoppingCart, Zap, Heart, Share2,
  Truck, RotateCcw, ShieldCheck, Store,
  ChevronRight, Minus, Plus, Check,
  MapPin, Clock, Tag, BadgePercent,
  MessageSquare, ThumbsUp, Eye,
  Package, AlertCircle, Info, Flame,
} from "lucide-react";
import { createCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

/* ─── Stars ─── */
function Stars({ rating = 0, size = 14 }: { rating?: number; size?: number; }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={n <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke={n <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
          strokeWidth={1.8}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

/* ─── Section heading pill ─── */
function SectionHeading({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex items-center gap-2 pb-3 mb-4 border-b border-dashed border-gray-100">
      <span className="h-4 w-1 rounded-full bg-gradient-to-b from-green-600 to-red-500" />
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.14em]"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {children}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
═══════════════════════════════════════════════════════════════ */
export default function ProductDetailsCard({ product }: { product: any; }) {

  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  // component এর ভেতরে:
  const { data: session } = useSession();
  // console.log("session", session);
  const router = useRouter();

  const [cartAdded, setCartAdded] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  /* ── empty state ── */
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-400">
        <AlertCircle size={44} strokeWidth={1.5} />
        <p className="text-sm font-medium">Product not found.</p>
      </div>
    );
  }

  /* ── derived values ── */
  const images: string[] = product.images?.length
    ? product.images
    : product.image ? [product.image] : [];

  const discount =
    product.discount ??
    (product.oldPrice && product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null);

  const stockState =
    !product.stock ? "out" : product.stock < 10 ? "low" : "in";

  const handleAddToCart = async (productId: number) => {
    // ✅ login না থাকলে login এ পাঠাও
    if (!session) {
      router.push(`/login?callbackUrl=/products`);
      return;
    }

    setCartLoading(true);
    setCartError(null);

    try {
      const res = await createCart({ productId, quantity: 1 });

      if (res?.id || res?.success) {
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 2200); // ✅ 2.2s পর reset
      } else {
        setCartError("কার্টে যোগ করা যায়নি");
      }
    } catch (err) {
      setCartError("Something went wrong");
    } finally {
      setCartLoading(false);
    }
  };

  /* ── static data arrays ── */
  const deliveryRows = [
    {
      icon: Truck, iconBg: "bg-green-50", iconColor: "text-green-600",
      title: <span className="flex items-center gap-2">Free Delivery<span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">FREE</span></span>,
      sub: "Delivered tomorrow if ordered within 3 hours",
    },
    {
      icon: MapPin, iconBg: "bg-orange-50", iconColor: "text-orange-500",
      title: "Delivery to",
      sub: "Dhaka, Chittagong & all districts · 1–3 business days",
    },
    {
      icon: RotateCcw, iconBg: "bg-blue-50", iconColor: "text-blue-500",
      title: "7-Day Easy Returns",
      sub: "Full refund within 7 days of delivery",
    },
    {
      icon: ShieldCheck, iconBg: "bg-red-50", iconColor: "text-red-500",
      title: "100% Authentic",
      sub: "Verified by BongoBazar Quality Team",
    },
  ];

  const protectionItems = [
    { icon: ShieldCheck, iconBg: "bg-green-50", iconColor: "text-green-600", title: "Money Back Guarantee", sub: "If item not received or not as described" },
    { icon: RotateCcw, iconBg: "bg-orange-50", iconColor: "text-orange-500", title: "Easy Returns", sub: "7-day hassle-free return policy" },
    { icon: Truck, iconBg: "bg-green-50", iconColor: "text-green-600", title: "Safe & Fast Delivery", sub: "1–3 business days nationwide" },
  ];

  const deliveryCities = [
    { city: "Dhaka", days: "1–2 days", fast: true },
    { city: "Chittagong", days: "2–3 days", fast: true },
    { city: "Sylhet", days: "2–4 days", fast: false },
    { city: "Others", days: "3–5 days", fast: false },
  ];

  const tabs = [
    { id: "desc" as const, label: "Description", icon: Info },
    { id: "specs" as const, label: "Specifications", icon: Package },
    { id: "reviews" as const, label: `Reviews (${product.reviewCount ?? 0})`, icon: MessageSquare },
  ];

  const reviews = product.reviews ?? [
    { name: "Rahim U.", rating: 5, date: "2 days ago", body: "Excellent product! Exactly as described. Delivery was fast and packaging was perfect." },
    { name: "Karim A.", rating: 4, date: "1 week ago", body: "Good quality. A bit smaller than expected but overall very satisfied with the purchase." },
    { name: "Nasrin B.", rating: 5, date: "2 weeks ago", body: "Best price online. Works perfectly. Will definitely buy again from BongoBazar!" },
  ];



  /* ══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Hind+Siliguri:wght@400;500;600;700&family=Syne:wght@600;700;800;900&display=swap');`}</style>

      {/* ── Breadcrumb ── */}
      <nav className="max-w-7xl mx-auto px-5 pt-5 pb-2 flex items-center gap-1 flex-wrap">
        <a href="/"
          className="text-[13px] font-medium text-green-700 hover:text-green-900
                      hover:underline underline-offset-2 transition-colors">
          Home
        </a>
        <ChevronRight size={13} className="text-green-400 flex-shrink-0" />
        <a href="/products"
          className="text-[13px] font-medium text-green-700 hover:text-green-900
                      hover:underline underline-offset-2 transition-colors">
          Products
        </a>
        <ChevronRight size={13} className="text-green-400 flex-shrink-0" />
        {product.category && (
          <>
            <a href={`/category/${product.categorySlug ?? product.category}`}
              className="text-[13px] font-medium text-green-700 hover:text-green-900
                          hover:underline underline-offset-2 transition-colors capitalize">
              {product.category}
            </a>
            <ChevronRight size={13} className="text-green-400 flex-shrink-0" />
          </>
        )}
        <span
          className="text-[13px] font-semibold text-gray-800 truncate max-w-[280px]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {product.name}
        </span>
      </nav>

      {/* ══════════════════════════════════════════════════════
          TOP GRID  —  Gallery | Info
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 py-4
                      grid grid-cols-1 lg:grid-cols-[420px_1fr]
                      gap-5 items-start">

        {/* ════ LEFT — Gallery ════ */}
        <div className="lg:sticky lg:top-[78px]
                        bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">

          {/* Main image */}
          <div className="relative aspect-square rounded-xl overflow-hidden
                          bg-gray-50 border border-gray-100">
            {images[activeImg] ? (
              <Image
                src={images[activeImg]} alt={product.name}
                fill priority sizes="420px"
                className="object-contain p-3"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-200">
                <Package size={72} strokeWidth={1} />
              </div>
            )}

            {/* Discount badge */}
            {discount && (
              <div className="absolute top-3 left-3 bg-red-600 text-white
                              text-[11px] font-bold px-2.5 py-1 rounded-md
                              shadow-md shadow-red-200/60">
                -{discount}%
              </div>
            )}

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={() => setWished(v => !v)}
                className={`w-9 h-9 rounded-full flex items-center justify-center
                            backdrop-blur-sm border shadow-sm
                            transition-all duration-200 hover:scale-110 active:scale-95
                            ${wished
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white/90 border-gray-200 text-gray-400 hover:text-red-500"
                  }`}
              >
                <Heart size={15} fill={wished ? "currentColor" : "none"} />
              </button>
              <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
                                 border border-gray-200 text-gray-400 shadow-sm
                                 flex items-center justify-center
                                 hover:text-green-700 transition-all hover:scale-110 active:scale-95">
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`relative flex-shrink-0 w-[60px] h-[60px] rounded-lg overflow-hidden
                              border-2 bg-gray-50 transition-all duration-150
                              ${i === activeImg
                      ? "border-green-600 ring-2 ring-green-100"
                      : "border-transparent hover:border-green-300"}`}>
                  <Image src={src} alt={`thumb-${i}`} fill sizes="60px" className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {/* Sold bar */}
          {product.soldCount && (
            <div className="mt-3 flex items-center gap-2.5
                            bg-gradient-to-r from-green-50 to-red-50
                            border border-green-100 rounded-xl px-3 py-2.5">
              <Flame size={13} className="text-red-500 flex-shrink-0" />
              <div className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-600 to-red-500 transition-all"
                  style={{ width: `${Math.min((product.soldCount / (product.stock + product.soldCount)) * 100, 92)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-red-600 whitespace-nowrap">
                {product.soldCount}+ Sold
              </span>
            </div>
          )}
        </div>

        {/* ════ RIGHT — Info ════ */}
        <div className="flex flex-col gap-3">

          {/* Store badge */}
          <div className="bg-white border border-gray-100 rounded-xl px-4 py-3
                          flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                              bg-gradient-to-br from-green-600 to-red-600
                              text-white text-sm font-bold shadow-sm">
                {(product.vendorName ?? product.store ?? "S")[0].toUpperCase()}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-gray-800 tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  {product.vendorName ?? product.store ?? "Official Store"}
                </p>
                <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-amber-500 font-semibold">4.9</span>
                  · Verified Seller
                </p>
              </div>
            </div>
            <a href="#"
              className="flex items-center gap-1.5 text-xs font-semibold
                          px-3 py-2 rounded-lg
                          text-green-700 border border-green-200 bg-green-50
                          hover:bg-green-600 hover:text-white hover:border-green-600
                          transition-all duration-200">
              <Store size={12} /> Visit Store
            </a>
          </div>

          {/* ── Main info card ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            {/* Title */}
            <h1
              className="text-[22px] font-bold text-gray-900 leading-snug mb-3 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap
                            pb-3 mb-3 border-b border-dashed border-gray-100">
              <span className="text-sm font-bold text-amber-500">
                {(product.rating ?? 0).toFixed(1)}
              </span>
              <Stars rating={product.rating ?? 0} size={13} />
              <a href="#reviews"
                className="flex items-center gap-1 text-xs text-green-700 hover:underline">
                <MessageSquare size={11} />
                {product.reviewCount ?? 0} Reviews
              </a>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Eye size={11} /> {product.viewCount ?? 842} views
              </span>
              <span className="text-xs text-gray-400 bg-gray-50
                               border border-gray-100 px-2.5 py-1 rounded-full">
                {product.soldCount ?? 0}+ sold
              </span>
            </div>

            {/* Price block */}
            <div className="bg-gradient-to-r from-green-50 via-white to-red-50
                            border border-green-100 rounded-xl p-4 mb-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-[34px] font-extrabold text-red-600 leading-none tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  ৳ {Number(product.price ?? 0).toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-[15px] font-medium text-gray-400 line-through">
                    ৳ {Number(product.oldPrice).toLocaleString()}
                  </span>
                )}
                {discount && (
                  <span className="text-[11px] font-bold tracking-wide bg-red-600 text-white
                                   px-2.5 py-1 rounded-full">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <p className="flex items-center gap-1 text-xs font-semibold text-green-700 mt-2">
                  <Check size={12} />
                  You save ৳ {(product.oldPrice - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Promo banner */}
            <div className="flex items-center gap-2.5
                            bg-gradient-to-r from-green-50 to-red-50
                            border border-green-100 rounded-xl px-4 py-3 mb-4">
              <BadgePercent size={16} className="text-green-700 flex-shrink-0" />
              <span className="text-xs text-gray-600">
                Use code{" "}
                <strong className="text-red-600 font-bold">BONGO10</strong>{" "}
                — extra 10% off on your first order!
              </span>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-2">
                  <Tag size={11} className="text-green-600" /> Variant / Color
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v: string, i: number) => (
                    <span key={v}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium
                                  border cursor-pointer transition-all
                                  ${i === 0
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"
                        }`}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Stock */}
            <div className="flex items-center gap-4 flex-wrap mb-5">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Qty:</span>

              {/* Stepper */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50
                             text-gray-600 hover:bg-green-50 hover:text-green-700
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <Minus size={14} />
                </button>
                <span className="w-11 text-center text-sm font-bold text-gray-800
                                 border-x border-gray-200 py-2 select-none">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock ?? 99, q + 1))}
                  disabled={qty >= (product.stock ?? 99)}
                  className="w-9 h-9 flex items-center justify-center bg-gray-50
                             text-gray-600 hover:bg-green-50 hover:text-green-700
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              {/* Stock pill */}
              <span className={`flex items-center gap-1.5 text-xs font-semibold
                                px-3 py-1.5 rounded-lg border
                                ${stockState === "in"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : stockState === "low"
                    ? "bg-amber-50 text-amber-700 border-amber-100"
                    : "bg-red-50 text-red-600 border-red-100"
                }`}>
                {stockState === "in" && <><Check size={12} /> In Stock ({product.stock})</>}
                {stockState === "low" && <><Clock size={12} /> Only {product.stock} left!</>}
                {stockState === "out" && <><AlertCircle size={12} /> Out of Stock</>}
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.stock}
                className={`flex-1 h-12 rounded-xl font-bold text-[13px] tracking-wide
                            flex items-center justify-center gap-2
                            border-2 transition-all duration-200
                            active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                            ${cartAdded
                    ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-200/60"
                    : "border-green-600 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white hover:shadow-lg hover:shadow-green-200/50 hover:-translate-y-0.5"
                  }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {cartAdded
                  ? <><Check size={16} /> Added!</>
                  : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>

              <button
                disabled={!product.stock}
                className="flex-1 h-12 rounded-xl font-bold text-[13px] tracking-wide text-white
                           flex items-center justify-center gap-2
                           bg-gradient-to-r from-green-600 via-green-700 to-red-600
                           shadow-md shadow-green-200/50
                           hover:shadow-xl hover:shadow-green-300/50
                           hover:-translate-y-0.5 active:scale-95
                           transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Zap size={16} /> Buy Now
              </button>
            </div>

            {/* Delivery rows */}
            <div className="flex flex-col gap-3">
              {deliveryRows.map(({ icon: Icon, iconBg, iconColor, title, sub }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center
                                    flex-shrink-0 ${iconBg} ${iconColor}`}>
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-[12.5px] font-semibold
                                  text-gray-800 tracking-tight">{title}</p>
                    <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Meta row */}
            <div className="flex gap-5 flex-wrap pt-3 mt-3
                            border-t border-dashed border-gray-100">
              {[
                { k: "SKU", v: product.sku ?? "—" },
                { k: "Category", v: product.category ?? "—" },
                { k: "Vendor", v: product.vendorId ?? "—" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em]"
                    style={{ fontFamily: "'Syne', sans-serif" }}>{k}</p>
                  <p className="text-[13px] font-semibold text-gray-700 mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TABS  +  SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 pb-16
                      grid grid-cols-1 lg:grid-cols-[1fr_280px]
                      gap-5 items-start" id="reviews">

        {/* ── Tabs card ── */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">

          {/* Tab header */}
          <div className="flex border-b border-gray-100">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5
                            py-4 text-[12px] font-semibold tracking-wide
                            relative transition-colors
                            ${activeTab === id
                    ? "text-green-700"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Icon size={13} />
                {label}
                {activeTab === id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px]
                                   rounded-t-full
                                   bg-gradient-to-r from-green-600 to-red-500" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* Description */}
            {activeTab === "desc" && (
              <div className="text-[14px] text-gray-600 leading-[1.8] space-y-3
                              tracking-[0.01em]">
                <p>{product.description || "No description available for this product."}</p>
                {product.features?.map((f: string, i: number) => (
                  <p key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-green-600 flex-shrink-0 mt-1" />
                    {f}
                  </p>
                ))}
              </div>
            )}

            {/* Specifications */}
            {activeTab === "specs" && (
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {(product.specs ?? [
                    ["Brand", product.brand ?? "—"],
                    ["Model", product.model ?? "—"],
                    ["SKU", product.sku ?? "—"],
                    ["Category", product.category ?? "—"],
                    ["Stock", product.stock ?? 0],
                    ["Vendor ID", product.vendorId ?? "—"],
                  ]).map(([k, v]: [string, any], i: number) => (
                    <tr key={k} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2.5 px-4 font-semibold text-gray-600 w-2/5
                                     border-b border-gray-100">{k}</td>
                      <td className="py-2.5 px-4 text-gray-800 border-b border-gray-100">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>
                {/* Summary */}
                <div className="flex items-center gap-6
                                bg-gradient-to-r from-green-50 to-red-50
                                border border-green-100 rounded-xl p-4 mb-6">
                  <div className="text-center flex-shrink-0">
                    <p className="text-5xl font-extrabold text-amber-500 leading-none">
                      {(product.rating ?? 0).toFixed(1)}
                    </p>
                    <Stars rating={product.rating ?? 0} size={12} />
                    <p className="text-[11px] text-gray-400 mt-1">out of 5</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <div key={n} className="flex items-center gap-2 text-xs">
                        <span className="w-5 text-right text-gray-400">{n}★</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full
                                       bg-gradient-to-r from-green-500 to-amber-400"
                            style={{ width: n === Math.round(product.rating ?? 0) ? "70%" : `${Math.max(5, (n / 5) * 38)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div className="divide-y divide-gray-100">
                  {reviews.map((r: any, i: number) => (
                    <div key={i} className="py-4">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-9 h-9 rounded-full flex-shrink-0
                                        bg-gradient-to-br from-green-500 to-red-500
                                        flex items-center justify-center
                                        text-white text-sm font-bold">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-800 tracking-tight"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            {r.name}
                          </p>
                          <Stars rating={r.rating} size={11} />
                        </div>
                        <span className="ml-auto text-[11px] text-gray-400 font-medium">{r.date}</span>
                      </div>
                      <p className="text-[13.5px] text-gray-600 leading-[1.75] tracking-[0.01em]">{r.body}</p>
                      <button className="mt-2 flex items-center gap-1.5 text-xs text-gray-400
                                         hover:text-green-700 transition-colors">
                        <ThumbsUp size={11} /> Helpful
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-4">

          {/* Buyer protection */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <SectionHeading>Buyer Protection</SectionHeading>
            <div className="flex flex-col gap-3.5">
              {protectionItems.map(({ icon: Icon, iconBg, iconColor, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center
                                    flex-shrink-0 ${iconBg} ${iconColor}`}>
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery estimator */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <SectionHeading>Delivery Estimate</SectionHeading>
            <div className="flex flex-col gap-3">
              {deliveryCities.map(({ city, days, fast }) => (
                <div key={city} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <MapPin size={11} className="text-gray-300" />
                    {city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {fast && (
                      <span className="text-[10px] font-bold text-green-700
                                       bg-green-50 border border-green-100
                                       px-1.5 py-0.5 rounded-full">
                        FAST
                      </span>
                    )}
                    <span className="font-semibold text-gray-800">{days}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Share card */}
          <div className="bg-gradient-to-br from-green-600 via-green-700 to-red-600
                          rounded-2xl p-5 text-white text-center
                          shadow-lg shadow-green-300/30">
            <p className="text-[11px] font-semibold text-white/70 mb-1 uppercase tracking-widest">
              Share this product
            </p>
            <p className="text-[15px] font-bold mb-4 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Help your friends find great deals!
            </p>
            <div className="flex justify-center gap-2">
              {[
                { label: "Facebook", cls: "bg-blue-500/80 hover:bg-blue-500" },
                { label: "WhatsApp", cls: "bg-emerald-500/80 hover:bg-emerald-500" },
                { label: "Copy Link", cls: "bg-white/20 hover:bg-white/30" },
              ].map(({ label, cls }) => (
                <button key={label}
                  className={`${cls} text-white text-[11px] font-semibold
                               px-3 py-1.5 rounded-lg transition-colors`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}