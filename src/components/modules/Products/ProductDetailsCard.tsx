"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart, Zap, Heart, Share2,
  Truck, RotateCcw, ShieldCheck, Store,
  ChevronRight, Minus, Plus, Check,
  MapPin, Clock, Tag, BadgePercent,
  MessageSquare, ThumbsUp, Eye,
  Package, AlertCircle, Info, Flame,
  Facebook, Send, Link as LinkIcon,
} from "lucide-react";
import { createCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/providers/CartProvider";
import { toast } from "sonner";

/* ─── Theme tokens (Tailwind utility classes for the emerald palette) ─── */
const NAV_GRAD = "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";
const ACCENT_GRAD = "linear-gradient(90deg,#10b981,#34d399)";
const BORDER_GRAD = "linear-gradient(90deg,#34d399,#10b981 50%,#047857)";

/* ─── Stars ─── */
function Stars({ rating = 0, size = 14 }: { rating?: number; size?: number; }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(rating);
        return (
          <svg
            key={n}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#10b981" : "none"}
            stroke={filled ? "#10b981" : "#d1d5db"}
            strokeWidth={1.6}
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </span>
  );
}

/* ─── Section heading pill ─── */
function SectionHeading({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-dashed border-slate-200">
      <span
        className="h-4 w-1 rounded-full"
        style={{ background: BORDER_GRAD }}
        aria-hidden="true"
      />
      <p
        className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
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

  const [cartAdded, setCartAdded] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const { data: session } = useSession();
  const { addItem } = useCart();
  const router = useRouter();

  /* ── empty state ── */
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
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
    setCartLoading(true);
    try {
      if (!session) {
        addItem({
          id: productId,
          name: product.name,
          price: Number(product.price ?? 0),
          image: product.images?.[0] || product.image || "/logo.png",
        });
        setCartAdded(true);
        toast.success("Added to cart");
        setTimeout(() => setCartAdded(false), 1500);
        setCartLoading(false);
        return;
      }
      const res = await createCart({ productId, quantity: 1 });
      if (res?.id || res?.success) {
        setCartAdded(true);
        toast.success("Cart added successfully");
        setTimeout(() => {
          router.refresh();
          setCartAdded(false);
        }, 500);
      } else {
        toast.error("Could not add to cart");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      if (session) setCartLoading(false);
    }
  };

  /* ── static data arrays ── */
  const deliveryRows = [
    {
      icon: Truck,
      title: (
        <span className="flex items-center gap-2">
          Free Delivery
          <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full tracking-wide">
            FREE
          </span>
        </span>
      ),
      sub: "Delivered tomorrow if ordered within 3 hours",
    },
    {
      icon: MapPin,
      title: "Delivery to",
      sub: "Dhaka, Chittagong & all districts · 1–3 business days",
    },
    {
      icon: RotateCcw,
      title: "7-Day Easy Returns",
      sub: "Full refund within 7 days of delivery",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic",
      sub: "Verified by BongoBazar Quality Team",
    },
  ];

  const protectionItems = [
    { icon: ShieldCheck, title: "Money Back Guarantee", sub: "If item not received or not as described" },
    { icon: RotateCcw, title: "Easy Returns", sub: "7-day hassle-free return policy" },
    { icon: Truck, title: "Safe & Fast Delivery", sub: "1–3 business days nationwide" },
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
    <div
      className="min-h-screen bg-[#EDEEEF] text-slate-800"
      style={{ fontFamily: "var(--font-hind-siliguri), var(--font-inter), system-ui, sans-serif" }}
    >

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-5 pt-5 sm:pt-6 pb-2 flex items-center gap-1.5 flex-wrap">
        <Link
          href="/"
          className="text-[13px] font-medium text-emerald-700 hover:text-emerald-900 hover:underline underline-offset-2 transition-colors"
        >
          Home
        </Link>
        <ChevronRight size={13} className="text-emerald-400 flex-shrink-0" />
        <Link
          href="/products"
          className="text-[13px] font-medium text-emerald-700 hover:text-emerald-900 hover:underline underline-offset-2 transition-colors"
        >
          Products
        </Link>
        <ChevronRight size={13} className="text-emerald-400 flex-shrink-0" />
        {product.category && (
          <>
            <Link
              href={`/category/${product.categorySlug ?? product.category}`}
              className="text-[13px] font-medium text-emerald-700 hover:text-emerald-900 hover:underline underline-offset-2 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight size={13} className="text-emerald-400 flex-shrink-0" />
          </>
        )}
        <span
          className="text-[13px] font-semibold text-slate-800 truncate max-w-[280px]"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          {product.name}
        </span>
      </nav>

      {/* ══════════════════════════════════════════════════════
          TOP GRID  —  Gallery | Info
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4
                      grid grid-cols-1 lg:grid-cols-[440px_1fr]
                      gap-5 lg:gap-6 items-start">

        {/* ════ LEFT — Gallery ════ */}
        <div className="lg:sticky lg:top-[88px]
                        bg-white border border-slate-100 rounded-2xl p-4 sm:p-5
                        shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">

          {/* Main image */}
          <div className="relative aspect-square rounded-xl overflow-hidden
                          bg-gradient-to-br from-slate-50 to-emerald-50/40
                          border border-slate-100">
            {images[activeImg] ? (
              <Image
                src={images[activeImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-contain p-4 transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200">
                <Package size={72} strokeWidth={1} />
              </div>
            )}

            {/* Discount badge */}
            {discount && (
              <div
                className="absolute top-3 left-3 text-white text-[11px] font-bold
                           px-2.5 py-1 rounded-md shadow-md tracking-wide"
                style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
              >
                -{discount}% OFF
              </div>
            )}

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={() => setWished((v) => !v)}
                aria-label="Add to wishlist"
                className={`w-9 h-9 rounded-full flex items-center justify-center
                            backdrop-blur-sm border shadow-sm
                            transition-all duration-200 hover:scale-110 active:scale-95
                            ${wished
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-white/90 border-slate-200 text-slate-400 hover:text-emerald-600"
                            }`}
              >
                <Heart size={15} fill={wished ? "currentColor" : "none"} />
              </button>
              <button
                aria-label="Share product"
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
                           border border-slate-200 text-slate-400 shadow-sm
                           flex items-center justify-center
                           hover:text-emerald-700 transition-all hover:scale-110 active:scale-95"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative flex-shrink-0 w-[64px] h-[64px] rounded-lg overflow-hidden
                              border-2 bg-white transition-all duration-150
                              ${i === activeImg
                                ? "border-emerald-600 ring-2 ring-emerald-100"
                                : "border-transparent hover:border-emerald-300"
                              }`}
                >
                  <Image
                    src={src}
                    alt={`thumb-${i}`}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Sold bar */}
          {product.soldCount && (
            <div
              className="mt-3 flex items-center gap-2.5
                         bg-emerald-50 border border-emerald-100
                         rounded-xl px-3.5 py-2.5"
            >
              <Flame size={14} className="text-emerald-600 flex-shrink-0" />
              <div className="flex-1 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (product.soldCount / (product.stock + product.soldCount)) * 100,
                      92
                    )}%`,
                    background: ACCENT_GRAD,
                  }}
                />
              </div>
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap tabular-nums">
                {product.soldCount}+ Sold
              </span>
            </div>
          )}
        </div>

        {/* ════ RIGHT — Info ════ */}
        <div className="flex flex-col gap-4">

          {/* Store badge */}
          <div className="bg-white border border-slate-100 rounded-2xl px-4 sm:px-5 py-3.5
                          flex items-center justify-between
                          shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                           text-white text-sm font-bold shadow-sm"
                style={{
                  background: "linear-gradient(135deg,#10b981,#047857)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                {(product.vendorName ?? product.store ?? "S")[0].toUpperCase()}
              </div>
              <div>
                <p
                  className="text-[14px] font-semibold text-slate-800 tracking-tight"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {product.vendorName ?? product.store ?? "Official Store"}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <Stars rating={4.9} size={10} />
                  <span className="text-emerald-700 font-semibold tabular-nums">4.9</span>
                  <span className="text-slate-300">·</span>
                  <span>Verified Seller</span>
                </p>
              </div>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs font-semibold
                         px-3.5 py-2 rounded-lg
                         text-emerald-700 border border-emerald-200 bg-emerald-50
                         hover:bg-emerald-600 hover:text-white hover:border-emerald-600
                         transition-all duration-200"
            >
              <Store size={12} /> Visit Store
            </a>
          </div>

          {/* ── Main info card ── */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6
                          shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">

            {/* Title */}
            <h1
              className="text-[24px] sm:text-[28px] font-bold text-slate-900
                         leading-[1.2] mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              {product.name}
            </h1>

            {/* Rating row */}
            <div className="flex items-center gap-3 flex-wrap
                            pb-3.5 mb-4 border-b border-dashed border-slate-200">
              <span className="text-sm font-bold text-emerald-700 tabular-nums">
                {(product.rating ?? 0).toFixed(1)}
              </span>
              <Stars rating={product.rating ?? 0} size={13} />
              <a
                href="#reviews"
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                <MessageSquare size={11} />
                {product.reviewCount ?? 0} Reviews
              </a>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Eye size={11} /> {product.viewCount ?? 842} views
              </span>
              <span className="text-xs text-slate-600 bg-slate-50
                               border border-slate-100 px-2.5 py-1 rounded-full font-semibold">
                {product.soldCount ?? 0}+ sold
              </span>
            </div>

            {/* Price block */}
            <div className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40
                            border border-emerald-100 rounded-xl p-4 sm:p-5 mb-4 overflow-hidden">
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-100/50 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-[36px] sm:text-[40px] font-extrabold leading-none tracking-tight tabular-nums"
                  style={{
                    backgroundImage: "linear-gradient(135deg,#047857,#10b981)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                  }}
                  data-numeric="true"
                >
                  ৳ {Number(product.price ?? 0).toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="text-[15px] font-medium text-slate-400 line-through tabular-nums">
                    ৳ {Number(product.oldPrice).toLocaleString()}
                  </span>
                )}
                {discount && (
                  <span
                    className="text-[11px] font-bold tracking-wide text-white
                               px-2.5 py-1 rounded-full"
                    style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
                  >
                    -{discount}% OFF
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <p className="relative flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mt-2.5">
                  <Check size={12} />
                  You save ৳{" "}
                  <span className="tabular-nums">
                    {(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </p>
              )}
            </div>

            {/* Promo banner */}
            <div className="flex items-center gap-2.5
                            bg-gradient-to-r from-emerald-50 to-teal-50
                            border border-emerald-100 rounded-xl px-4 py-3 mb-5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
              >
                <BadgePercent size={14} className="text-white" />
              </span>
              <span className="text-xs sm:text-[13px] text-slate-600">
                Use code{" "}
                <strong className="text-emerald-700 font-bold tracking-wide">
                  BONGO10
                </strong>{" "}
                — extra 10% off on your first order!
              </span>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mb-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2.5">
                  <Tag size={11} className="text-emerald-600" /> Variant / Color
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v: string, i: number) => (
                    <span
                      key={v}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium
                                  border cursor-pointer transition-all
                                  ${i === 0
                                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                                    : "border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                                  }`}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Stock */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.14em]">
                Qty
              </span>

              {/* Stepper */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 flex items-center justify-center bg-slate-50
                             text-slate-600 hover:bg-emerald-50 hover:text-emerald-700
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-12 text-center text-sm font-bold text-slate-800
                             border-x border-slate-200 py-2 select-none tabular-nums"
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock ?? 99, q + 1))}
                  disabled={qty >= (product.stock ?? 99)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 flex items-center justify-center bg-slate-50
                             text-slate-600 hover:bg-emerald-50 hover:text-emerald-700
                             disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Stock pill */}
              <span
                className={`flex items-center gap-1.5 text-xs font-semibold
                            px-3 py-1.5 rounded-lg border
                            ${stockState === "in"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : stockState === "low"
                                ? "bg-amber-50 text-amber-700 border-amber-100"
                                : "bg-rose-50 text-rose-600 border-rose-100"
                            }`}
              >
                {stockState === "in" && (
                  <>
                    <Check size={12} /> In Stock ({product.stock})
                  </>
                )}
                {stockState === "low" && (
                  <>
                    <Clock size={12} /> Only {product.stock} left!
                  </>
                )}
                {stockState === "out" && (
                  <>
                    <AlertCircle size={12} /> Out of Stock
                  </>
                )}
              </span>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-3 mb-6">
              <button
                onClick={() => handleAddToCart(product.id)}
                disabled={cartLoading || !product.stock}
                className={`h-12 rounded-xl font-bold text-[13px] tracking-wide
                            flex items-center justify-center gap-2
                            border-2 transition-all duration-200
                            active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
                            ${cartAdded
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200/60"
                              : "border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-200/50 hover:-translate-y-0.5"
                            }`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                {cartLoading ? (
                  "Adding to Cart..."
                ) : cartAdded ? (
                  <>
                    <Check size={16} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add to Cart
                  </>
                )}
              </button>

              <button
                disabled={!product.stock}
                className="h-12 rounded-xl font-bold text-[13px] tracking-wide text-white
                           flex items-center justify-center gap-2
                           shadow-md shadow-emerald-200/50
                           hover:shadow-xl hover:shadow-emerald-300/50
                           hover:-translate-y-0.5 active:scale-[0.98]
                           transition-all duration-200
                           disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg,#10b981 0%,#047857 100%)",
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                }}
              >
                <Zap size={16} /> Buy Now
              </button>
            </div>

            {/* Delivery rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3.5">
              {deliveryRows.map(({ icon: Icon, title, sub }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                               bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >
                    <Icon size={15} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-[13px] font-semibold
                                  text-slate-800 tracking-tight">
                      {title}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Meta row */}
            <div className="flex gap-5 sm:gap-7 flex-wrap pt-4 mt-5
                            border-t border-dashed border-slate-200">
              {[
                { k: "SKU", v: product.sku ?? "—" },
                { k: "Category", v: product.category ?? "—" },
                { k: "Vendor", v: product.vendorId ?? "—" },
              ].map(({ k, v }) => (
                <div key={k}>
                  <p
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]"
                    style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                  >
                    {k}
                  </p>
                  <p className="text-[13px] font-semibold text-slate-700 mt-0.5">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TABS  +  SIDEBAR
      ══════════════════════════════════════════════════════ */}
      <div
        id="reviews"
        className="max-w-7xl mx-auto px-4 sm:px-5 pb-16
                   grid grid-cols-1 lg:grid-cols-[1fr_300px]
                   gap-5 lg:gap-6 items-start"
      >
        {/* ── Tabs card ── */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden
                        shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">

          {/* Tab header */}
          <div
            className="flex border-b border-slate-100 bg-slate-50/60"
            role="tablist"
          >
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                role="tab"
                aria-selected={activeTab === id}
                className={`flex-1 flex items-center justify-center gap-1.5
                            py-4 text-[12px] font-semibold tracking-wide
                            relative transition-colors
                            ${activeTab === id
                              ? "text-emerald-700 bg-white"
                              : "text-slate-400 hover:text-slate-600"
                            }`}
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                <Icon size={13} />
                {label}
                {activeTab === id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                    style={{ background: BORDER_GRAD }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-7">
            {/* Description */}
            {activeTab === "desc" && (
              <div
                className="text-[14px] text-slate-600 leading-[1.8] space-y-3
                           tracking-[0.005em]"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                <p>
                  {product.description || "No description available for this product."}
                </p>
                {product.features?.map((f: string, i: number) => (
                  <p key={i} className="flex items-start gap-2">
                    <span
                      className="mt-1 inline-flex items-center justify-center w-4 h-4 rounded-full flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
                    >
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </span>
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
                    <tr
                      key={k}
                      className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                    >
                      <td
                        className="py-2.5 px-4 font-semibold text-slate-600 w-2/5
                                   border-b border-slate-100"
                        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                      >
                        {k}
                      </td>
                      <td className="py-2.5 px-4 text-slate-800 border-b border-slate-100">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div>
                {/* Summary */}
                <div
                  className="flex items-center gap-6
                             bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40
                             border border-emerald-100 rounded-xl p-5 mb-6"
                >
                  <div className="text-center flex-shrink-0">
                    <p
                      className="text-5xl font-extrabold leading-none tabular-nums"
                      style={{
                        backgroundImage: "linear-gradient(135deg,#047857,#10b981)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                      }}
                    >
                      {(product.rating ?? 0).toFixed(1)}
                    </p>
                    <Stars rating={product.rating ?? 0} size={12} />
                    <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                      out of 5
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <div key={n} className="flex items-center gap-2 text-xs">
                        <span className="w-5 text-right font-semibold text-slate-500 tabular-nums">
                          {n}★
                        </span>
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg,#10b981,#34d399)",
                              width:
                                n === Math.round(product.rating ?? 0)
                                  ? "70%"
                                  : `${Math.max(5, (n / 5) * 38)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review cards */}
                <div className="divide-y divide-slate-100">
                  {reviews.map((r: any, i: number) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className="w-9 h-9 rounded-full flex-shrink-0
                                     flex items-center justify-center
                                     text-white text-sm font-bold"
                          style={{
                            background: "linear-gradient(135deg,#10b981,#047857)",
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                          }}
                        >
                          {r.name[0]}
                        </div>
                        <div>
                          <p
                            className="text-[13px] font-semibold text-slate-800 tracking-tight"
                            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                          >
                            {r.name}
                          </p>
                          <Stars rating={r.rating} size={11} />
                        </div>
                        <span className="ml-auto text-[11px] text-slate-400 font-medium">
                          {r.date}
                        </span>
                      </div>
                      <p className="text-[13.5px] text-slate-600 leading-[1.75] tracking-[0.005em]">
                        {r.body}
                      </p>
                      <button
                        className="mt-2 flex items-center gap-1.5 text-xs text-slate-400
                                   hover:text-emerald-700 transition-colors font-semibold"
                      >
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
        <div className="flex flex-col gap-4 lg:sticky lg:top-[88px]">

          {/* Buyer protection */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5
                          shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
            <SectionHeading>Buyer Protection</SectionHeading>
            <div className="flex flex-col gap-3.5">
              {protectionItems.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                               bg-emerald-50 text-emerald-700 border border-emerald-100"
                  >
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <div>
                    <p
                      className="text-[13px] font-semibold text-slate-800 tracking-tight"
                      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                    >
                      {title}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery estimator */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5
                          shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
            <SectionHeading>Delivery Estimate</SectionHeading>
            <div className="flex flex-col gap-3">
              {deliveryCities.map(({ city, days, fast }) => (
                <div key={city} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <MapPin size={11} className="text-emerald-500" />
                    {city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {fast && (
                      <span className="text-[10px] font-bold text-emerald-700
                                       bg-emerald-50 border border-emerald-100
                                       px-1.5 py-0.5 rounded-full tracking-wide">
                        FAST
                      </span>
                    )}
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {days}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Share card */}
          <div
            className="relative overflow-hidden rounded-2xl p-5 text-white text-center
                       shadow-lg shadow-emerald-900/20"
            style={{ background: NAV_GRAD }}
          >
            <div
              className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-400/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <p
                className="text-[11px] font-bold text-white/70 mb-1.5 uppercase tracking-[0.18em]"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                Share this product
              </p>
              <p
                className="text-[15px] font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              >
                Help your friends find great deals!
              </p>
              <div className="flex justify-center gap-2">
                {[
                  { label: "Facebook", icon: Facebook, cls: "bg-white/15 hover:bg-white/25" },
                  { label: "WhatsApp", icon: Send, cls: "bg-white/15 hover:bg-white/25" },
                  { label: "Copy Link", icon: LinkIcon, cls: "bg-white/15 hover:bg-white/25" },
                ].map(({ label, icon: Icon, cls }) => (
                  <button
                    key={label}
                    className={`${cls} text-white text-[11px] font-semibold
                                px-3 py-1.5 rounded-lg transition-colors
                                inline-flex items-center gap-1.5`}
                  >
                    <Icon size={12} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
