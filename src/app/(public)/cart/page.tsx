"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X, Loader2,
  ShoppingCart, Truck, MapPin, Sparkles, ShieldCheck, Tag,
  Check, CreditCard, ChevronRight, User, Receipt, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getCart, removeFromCart, updateCartQuantity, createCart } from "@/actions/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/providers/CartProvider";
import { createOrderWithAddress } from "@/actions/order";

/* ─── Theme tokens (match navbar / hot-deals / home) ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";
const BORDER_GRAD =
  "linear-gradient(90deg,#34d399,#10b981 50%,#047857)";

const SHIPPING_COSTS = { dhaka: 60, outside: 110 };

type CartItem = {
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

const STEPS = [
  { id: 1, label: "Cart", icon: ShoppingCart, current: true },
  { id: 2, label: "Information", icon: User, current: false },
  { id: 3, label: "Payment", icon: CreditCard, current: false },
  { id: 4, label: "Confirmation", icon: Check, current: false },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState("outside");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", address: "" });
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { items: guestItems, updateQuantity: updateGuestQty, removeItem: removeGuestItem, clearCart: clearGuestCart } = useCart();

  const hasMigratedRef = useRef(false);

  useEffect(() => {
    const migrateGuestCart = async () => {
      if (!session || hasMigratedRef.current) return;
      hasMigratedRef.current = true;

      const items = guestItems;
      if (items.length === 0) return;

      for (const item of items) {
        await createCart({ productId: item.productId, quantity: item.quantity });
      }
      clearGuestCart();

      const data = await getCart();
      const mapped = (data ?? []).map((item: any) => ({
        ...item,
        id: item.id ?? item.productId,
        productId: item.productId ?? item.id,
      }));
      setCartItems(mapped);
      setLoading(false);
    };

    migrateGuestCart();
  }, [session, guestItems, clearGuestCart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!session) {
        setCartItems(guestItems.map((i) => ({ ...i, id: i.productId })));
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getCart();
      const mapped = (data ?? []).map((item: any) => ({
        ...item,
        id: item.id ?? item.productId,
        productId: item.productId ?? item.id,
      }));
      setCartItems(mapped);
      setLoading(false);
    };
    fetchCart();
  }, [session, guestItems]);

  const handleOrder = async () => {
    if (!session) {
      router.push("/login?callbackUrl=/cart");
      return;
    }
    if (!form.name.trim()) { toast.error("নাম দিন"); return; }
    if (!form.mobile.trim()) { toast.error("মোবাইল নম্বর দিন"); return; }
    if (!form.address.trim()) { toast.error("ঠিকানা দিন"); return; }
    if (cartItems.length === 0) { toast.error("কার্ট খালি"); return; }

    setOrderLoading(true);
    try {
      const res = await createOrderWithAddress({
        fullName: form.name,
        phone: form.mobile,
        city: area === "dhaka" ? "Dhaka" : "Outside Dhaka",
        area: area,
        address: form.address,
      });

      if (res?.data?.id) {
        toast.success("অর্ডার সফলভাবে হয়েছে! 🎉");
        if (!session) {
          clearGuestCart();
        } else {
          for (const item of cartItems) {
            await removeFromCart(item.id);
          }
        }
        setCartItems([]);
        router.push("/orders");
      } else {
        toast.error(res?.message ?? "অর্ডার হয়নি");
      }
    } catch {
      toast.error("কিছু একটা ভুল হয়েছে");
    } finally {
      setOrderLoading(false);
    }
  };

  const updateQty = async (productId: number, delta: number) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);

    setCartItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: newQty } : i))
    );
    if (!session) {
      updateGuestQty(productId, newQty);
    } else {
      await updateCartQuantity(item.id, newQty);
      router.refresh();
    }
  };

  const removeItem = async (productId: number) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
    if (!session) {
      removeGuestItem(productId);
    } else {
      const cartItem = cartItems.find((i) => i.productId === productId);
      if (cartItem) {
        const res = await removeFromCart(cartItem.id);
        router.refresh();
        if (!res?.success) toast.error("মুছতে পারেনি, আবার চেষ্টা করুন");
        else toast.success("কার্ট থেকে সরানো হয়েছে");
      }
    }
  };

  const clearCart = () => {
    if (!session) {
      clearGuestCart();
    }
    setCartItems([]);
  };

  const { netTotal, shippingCost, grandTotal, totalItems, totalSavings } = useMemo(() => {
    const items = cartItems.reduce((s, i) => s + i.quantity, 0);
    const net = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const ship = SHIPPING_COSTS[area as keyof typeof SHIPPING_COSTS] ?? 110;
    return {
      totalItems: items,
      netTotal: net,
      shippingCost: ship,
      grandTotal: net + ship,
      totalSavings: 0,
    };
  }, [cartItems, area]);

  return (
    <div className="min-h-screen bg-[#EDEEEF]">
      {/* ── Compact header (no big banner) ── */}
      <header
        className="relative text-white"
        style={{ background: NAV_GRAD }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <nav className="text-[12.5px] text-white/70 mb-4 flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors font-medium">
              হোম
            </Link>
            <ChevronRight size={12} className="text-white/40" />
            <span className="text-white font-semibold">কার্ট</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] font-semibold mb-2">
                <Sparkles className="w-3 h-3 text-emerald-200" />
                Step 1 of 4
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                আপনার{" "}
                <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                  শপিং কার্ট
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Receipt size={14} />
              <span className="tabular-nums">
                <span className="text-white font-bold">{totalItems}</span> আইটেম
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="tabular-nums">
                <span className="text-white font-bold">৳{netTotal.toLocaleString()}</span> সাবটোটাল
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Stepper ── */}
      <div className="max-w-7xl mx-auto px-4 -mt-5 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)] px-4 sm:px-6 py-3.5">
          <ol className="flex items-center justify-between gap-2 sm:gap-0">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = step.current;
              const isDone = step.id === 1;
              return (
                <li
                  key={step.id}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex-shrink-0
                                  ${isCurrent
                                    ? "text-white shadow-md shadow-emerald-900/30"
                                    : isDone
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                      : "bg-slate-50 text-slate-400 border border-slate-200"
                                  }`}
                      style={isCurrent ? { background: NAV_GRAD } : undefined}
                    >
                      {isDone ? <Check size={14} /> : <Icon size={14} />}
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] ${
                          isCurrent ? "text-emerald-700" : isDone ? "text-emerald-700" : "text-slate-400"
                        }`}
                      >
                        Step {step.id}
                      </div>
                      <div
                        className={`text-[12px] sm:text-sm font-semibold truncate ${
                          isCurrent ? "text-slate-900" : isDone ? "text-slate-700" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="hidden sm:block flex-1 mx-4 h-px bg-gradient-to-r from-emerald-200 via-slate-200 to-slate-200" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ── Main 3-column grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 lg:gap-6">
          {/* ── Center: Items + Customer form ── */}
          <div className="flex flex-col gap-5 lg:gap-6 min-w-0">
            {/* Items card */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <header className="flex items-center justify-between gap-2 px-5 sm:px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                    পণ্যের তালিকা
                  </h2>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full tabular-nums">
                    {cartItems.length} আইটেম
                  </span>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11.5px] font-bold text-slate-500 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                  >
                    <X size={12} /> সব মুছুন
                  </button>
                )}
              </header>

              {/* Loading */}
              {loading && (
                <div className="px-5 sm:px-6 py-12 text-center text-slate-400">
                  <Loader2 className="animate-spin mx-auto" size={24} />
                  <p className="text-sm mt-2">কার্ট লোড হচ্ছে…</p>
                </div>
              )}

              {/* Empty state */}
              {!loading && cartItems.length === 0 && (
                <div className="px-5 sm:px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-3">
                    <Package size={28} className="text-emerald-600" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mb-1">আপনার কার্ট খালি</p>
                  <p className="text-[12.5px] text-slate-500 mb-4">আমাদের পণ্য থেকে পছন্দের জিনিস যোগ করুন</p>
                  <Link href="/products">
                    <Button
                      className="h-10 rounded-xl px-5 font-bold gap-2 text-white shadow-md shadow-emerald-900/20"
                      style={{ background: NAV_GRAD }}
                    >
                      <ShoppingBag size={14} /> পণ্য দেখুন
                    </Button>
                  </Link>
                </div>
              )}

              {/* Item rows */}
              {!loading && cartItems.length > 0 && (
                <ul className="divide-y divide-slate-100">
                  {cartItems.map((item, i) => (
                    <li
                      key={item.productId}
                      className="px-5 sm:px-6 py-4 flex gap-4 items-start group hover:bg-emerald-50/30 transition-colors"
                    >
                      {/* index pill */}
                      <div className="hidden sm:flex w-6 h-6 rounded-md bg-slate-100 text-slate-500 text-[11px] font-bold items-center justify-center mt-1.5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {/* thumb */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      {/* details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2 mb-1.5">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Tag size={11} className="text-emerald-600" />
                            <span className="tabular-nums font-semibold text-slate-700" data-numeric="true">
                              ৳{item.product.price.toLocaleString()}
                            </span>
                            <span className="text-slate-400">/ pcs</span>
                          </span>
                          <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-slate-400">SKU: {item.product.id}</span>
                        </div>

                        {/* Stepper + remove */}
                        <div className="flex items-center justify-between gap-3 mt-3">
                          <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                              <button
                                onClick={() => updateQty(item.productId, -1)}
                                aria-label="Decrease"
                                className="w-8 h-8 flex items-center justify-center text-slate-500
                                           hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span
                                className="w-9 text-center text-[13px] font-bold text-slate-800
                                           border-x border-slate-200 py-1.5 tabular-nums"
                                data-numeric="true"
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.productId, 1)}
                                aria-label="Increase"
                                className="w-8 h-8 flex items-center justify-center text-slate-500
                                           hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId)}
                            aria-label="Remove from cart"
                            className="inline-flex items-center gap-1 text-[12px] font-semibold
                                       text-slate-500 hover:text-rose-600 transition-colors
                                       opacity-70 group-hover:opacity-100"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* line total */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10.5px] uppercase tracking-[0.14em] text-slate-400 font-bold mb-1">
                          Subtotal
                        </div>
                        <div
                          className="text-[15px] sm:text-base font-extrabold tabular-nums text-slate-900"
                          data-numeric="true"
                        >
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Customer form */}
            {session && (
              <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
                <div className="relative h-1" style={{ background: BORDER_GRAD }} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                      কাস্টমার ইনফরমেশন
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5 block">
                        আপনার নাম <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        placeholder="আপনার নাম লিখুন"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:bg-white
                                   focus:ring-4 focus:ring-emerald-500/15 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5 block">
                        আপনার মোবাইল <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        placeholder="+88 ছাড়া ১১ সংখ্যার মোবাইল"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:bg-white
                                   focus:ring-4 focus:ring-emerald-500/15 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5 block">
                        আপনার ই-মেইল <span className="text-slate-300 font-normal">(Optional)</span>
                      </Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:bg-white
                                   focus:ring-4 focus:ring-emerald-500/15 rounded-xl h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5 block">
                        ডেলিভারি এরিয়া <span className="text-rose-500">*</span>
                      </Label>
                      <Select value={area} onValueChange={setArea}>
                        <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 rounded-xl h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dhaka">ঢাকার ভেতরে — ৳60</SelectItem>
                          <SelectItem value="outside">ঢাকার বাইরে — ৳110</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1.5 block">
                        আপনার ঠিকানা <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        placeholder="বাড়ি/ফ্ল্যাট, রোড, এলাকা, শহর"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="bg-slate-50 border-slate-200 focus:border-emerald-500 focus:bg-white
                                   focus:ring-4 focus:ring-emerald-500/15 rounded-xl h-11"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* ── Right: Sticky order summary ── */}
          <aside className="lg:sticky lg:top-[88px] self-start">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <div className="relative h-1" style={{ background: BORDER_GRAD }} />

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                  <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                    অর্ডার সামারি
                  </h2>
                </div>

                {/* Mini item list */}
                {cartItems.length > 0 && (
                  <ul className="space-y-2.5 mb-4 max-h-44 overflow-y-auto pr-1">
                    {cartItems.slice(0, 4).map((item) => (
                      <li key={item.productId} className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                          <span
                            className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full
                                       bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums"
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <span className="flex-1 text-[12.5px] text-slate-700 font-medium line-clamp-1">
                          {item.product.name}
                        </span>
                        <span
                          className="text-[12px] font-bold text-slate-800 tabular-nums flex-shrink-0"
                          data-numeric="true"
                        >
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                    {cartItems.length > 4 && (
                      <li className="text-[11.5px] font-semibold text-slate-500 text-center pt-1">
                        + {cartItems.length - 4} আরো আইটেম
                      </li>
                    )}
                  </ul>
                )}

                {/* Promo banner */}
                <div className="flex items-center gap-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-2.5 mb-5">
                  <Tag size={14} className="text-emerald-700 flex-shrink-0" />
                  <span className="text-[12px] text-slate-600 leading-snug">
                    কোড <strong className="text-emerald-700 font-bold tracking-wide">BONGO10</strong> ব্যবহার করুন, ১০% ছাড়!
                  </span>
                </div>

                {/* Totals */}
                <dl className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between text-slate-600">
                    <dt className="font-semibold">Net Total</dt>
                    <dd className="font-bold text-slate-800 tabular-nums" data-numeric="true">
                      ৳{netTotal.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <dt className="font-semibold">Shipping</dt>
                    <dd className="font-bold text-slate-800 tabular-nums" data-numeric="true">
                      ৳{shippingCost}
                    </dd>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <dt className="font-semibold">You Save</dt>
                      <dd className="font-bold tabular-nums" data-numeric="true">
                        −৳{totalSavings.toLocaleString()}
                      </dd>
                    </div>
                  )}
                  <div className="h-px bg-slate-200" />
                  <div className="flex justify-between items-baseline">
                    <dt className="text-[14px] font-extrabold text-slate-900">Grand Total</dt>
                    <dd
                      className="text-[22px] font-extrabold tabular-nums leading-none"
                      style={{
                        backgroundImage: "linear-gradient(135deg,#047857,#10b981)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                      data-numeric="true"
                    >
                      ৳{grandTotal.toLocaleString()}
                    </dd>
                  </div>
                </dl>

                {/* Confirm button */}
                <Button
                  onClick={handleOrder}
                  disabled={orderLoading || cartItems.length === 0}
                  className="w-full h-12 mt-5 rounded-xl font-extrabold text-white text-[14px] tracking-wide
                             hover:-translate-y-px active:scale-[0.99]
                             transition-all duration-200
                             shadow-lg shadow-emerald-900/20
                             hover:shadow-xl hover:shadow-emerald-900/30
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                  style={{ background: NAV_GRAD }}
                >
                  {orderLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      অর্ডার হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      অর্ডার কনফার্ম করুন
                    </>
                  )}
                </Button>

                <Link href="/products" className="block mt-2.5">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-slate-200 text-slate-600
                               hover:bg-slate-100 hover:border-slate-300
                               font-bold gap-2 h-10"
                  >
                    <ArrowLeft size={14} /> আরো শপিং করুন
                  </Button>
                </Link>

                {/* Trust strip */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-dashed border-slate-200">
                  {[
                    { icon: ShieldCheck, label: "নিরাপদ" },
                    { icon: Truck, label: "দ্রুত ডেলিভারি" },
                    { icon: MapPin, label: "সারাদেশে" },
                  ].map((f) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.label}
                        className="flex flex-col items-center gap-1 text-center text-[10.5px] font-semibold text-slate-500"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <Icon size={13} />
                        </span>
                        {f.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
