"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, User, Pencil,
  CheckCircle2, Truck, CreditCard, Loader2,
  Tag, ChevronRight, ShieldCheck, BadgePercent, Home,
  ShoppingCart, Sparkles, Check, Receipt, Lock,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/types";

/* ─── Theme tokens (match navbar / hot-deals / home / cart) ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";
const BORDER_GRAD =
  "linear-gradient(90deg,#34d399,#10b981 50%,#047857)";

const PAYMENT_METHODS = [
  { id: "CASH_ON_DELIVERY", label: "Cash on Delivery", desc: "Pay on Delivery", icon: "💵" },
  { id: "BKASH", label: "bKash", desc: "Mobile Wallet", icon: "📱" },
  { id: "NAGAD", label: "Nagad", desc: "Mobile Wallet", icon: "💳" },
  { id: "STRIPE", label: "Card Payment", desc: "Visa / Mastercard", icon: "🏦" },
];

const DELIVERY_FEE = 968;
const DELIVERY_DISCOUNT = 110;

const STEPS = [
  { id: 1, label: "Cart", icon: ShoppingCart },
  { id: 2, label: "Information", icon: User },
  { id: 3, label: "Payment", icon: CreditCard, current: true },
  { id: 4, label: "Confirmation", icon: Check },
];

export default function CheckoutClient({ order }: { order: Order; }) {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const isPaid = currentOrder.payment?.status === "PAID";
  const isPaying = payingId === currentOrder.id;

  const { itemsTotal, promoDiscount, total, totalItems } = useMemo(() => {
    const items = currentOrder.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const promo = promoApplied ? Math.floor(items * 0.05) : 0;
    return {
      itemsTotal: items,
      promoDiscount: promo,
      total: items + DELIVERY_FEE - DELIVERY_DISCOUNT - promo,
      totalItems: currentOrder.items.reduce((s, i) => s + i.quantity, 0),
    };
  }, [currentOrder, promoApplied]);

  const handlePayment = async () => {
    if (!selectedMethod) { toast.error("Select Payment Method"); return; }
    setPayingId(currentOrder.id);
    try {
      await axiosInstance.post(`/payment/${currentOrder.id}`, { method: selectedMethod });
      toast.success("Payment Successful! 🎉");
      setCurrentOrder((prev) => ({
        ...prev,
        payment: { status: "PAID", method: selectedMethod },
      }));
    } catch {
      toast.error("Payment failed, please try again");
    } finally {
      setPayingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEEEF]">
      {/* ── Compact header ── */}
      <header className="relative text-white" style={{ background: NAV_GRAD }}>
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
            <Link href="/orders" className="hover:text-white transition-colors font-medium">
              Orders
            </Link>
            <ChevronRight size={12} className="text-white/40" />
            <span className="text-white font-semibold">Checkout</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] font-semibold mb-2">
                <Sparkles className="w-3 h-3 text-emerald-200" />
                Step 3 of 4
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Secure{" "}
                <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                  Checkout
                </span>
              </h1>
              <p className="text-white/70 text-sm mt-1">Verify order and complete payment</p>
            </div>

            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Lock size={14} />
              <span className="text-white/80 font-semibold">SSL Secured</span>
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
              const isDone = step.id < 3;
              return (
                <li key={step.id} className="flex items-center flex-1 last:flex-none">
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
                          isCurrent || isDone ? "text-emerald-700" : "text-slate-400"
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

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 lg:gap-6">
          {/* ── Left: Sections ── */}
          <div className="flex flex-col gap-5 lg:gap-6 min-w-0">
            {/* Shipping & Billing */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <div className="relative h-1" style={{ background: BORDER_GRAD }} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                      Shipping &amp; Billing
                    </h2>
                  </div>
                  <button className="inline-flex items-center gap-1 text-[11.5px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
                    <Pencil size={11} /> Edit
                  </button>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex-shrink-0">
                        <User size={13} />
                      </span>
                      <span className="text-[14px] font-bold text-slate-900 truncate">
                        {currentOrder.address.fullName}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Phone size={12} className="text-emerald-600" />
                      <span className="text-[12.5px] font-semibold tabular-nums" data-numeric="true">
                        {currentOrder.address.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-700 flex-shrink-0 uppercase tracking-wide">
                      <Home size={9} /> Home
                    </span>
                    <span className="text-[12.5px] text-slate-600 leading-relaxed">
                      {currentOrder.address.address}, {currentOrder.address.area}, {currentOrder.address.city}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Package + Items */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <div className="relative h-1" style={{ background: BORDER_GRAD }} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                    <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                      Package {currentOrder.items.length > 0 ? 1 : 0} of 1
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full tabular-nums">
                      {totalItems} Items
                    </span>
                  </div>
                  <span className="text-[11.5px] font-semibold text-slate-500 flex items-center gap-1.5">
                    Fulfilled by <span className="font-bold text-emerald-700">BongoBazar</span>
                  </span>
                </div>

                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-2.5">
                  Delivery or Pickup
                </p>
                <div className="border-2 border-emerald-200 bg-emerald-50/40 rounded-xl p-3.5 mb-5 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[15px] font-extrabold tabular-nums"
                        style={{
                          backgroundImage: "linear-gradient(135deg,#047857,#10b981)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                        data-numeric="true"
                      >
                        ৳ {(DELIVERY_FEE - DELIVERY_DISCOUNT).toLocaleString()}
                      </span>
                      <span className="text-[12px] line-through text-slate-400 tabular-nums" data-numeric="true">
                        ৳ {DELIVERY_FEE}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                        -৳{DELIVERY_DISCOUNT}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Truck size={11} className="text-emerald-600" />
                      <span className="text-[12px] font-semibold text-slate-700">Standard Delivery</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Get by 22–31 Mar</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {currentOrder.items.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3.5 py-3 border-t border-slate-100 first:border-t-0"
                    >
                      <div className="hidden sm:flex w-6 h-6 rounded-md bg-slate-100 text-slate-500 text-[10.5px] font-bold items-center justify-center mt-2.5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 bg-slate-50">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] sm:text-sm font-semibold text-slate-900 leading-snug line-clamp-2 mb-1.5">
                          {item.product.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span
                            className="text-[15px] font-extrabold tabular-nums"
                            style={{
                              backgroundImage: "linear-gradient(135deg,#047857,#10b981)",
                              WebkitBackgroundClip: "text",
                              backgroundClip: "text",
                              color: "transparent",
                            }}
                            data-numeric="true"
                          >
                            ৳ {item.price.toLocaleString()}
                          </span>
                          {item.product.price > item.price && (
                            <>
                              <span className="text-[11.5px] line-through text-slate-400 tabular-nums" data-numeric="true">
                                ৳ {item.product.price.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
                                -{Math.round((1 - item.price / item.product.price) * 100)}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-[11.5px] text-slate-500 flex-shrink-0 mt-1">
                        Qty: <span className="font-bold text-slate-700 tabular-nums" data-numeric="true">{item.quantity}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <div className="relative h-1" style={{ background: BORDER_GRAD }} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
<h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                      Payment Method
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PAYMENT_METHODS.map((m) => {
                    const isActive = selectedMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all
                                    ${isActive
                                      ? "border-emerald-500 bg-emerald-50/60 shadow-sm"
                                      : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
                                    }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                      ${isActive ? "border-emerald-500" : "border-slate-300"}`}
                        >
                          {isActive && (
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
                            />
                          )}
                        </span>
                        <span className="text-xl flex-shrink-0">{m.icon}</span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13px] font-bold text-slate-900 leading-tight">
                            {m.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 leading-tight">
                            {m.desc}
                          </span>
                        </span>
                        {isActive && (
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Sticky summary ── */}
          <aside className="lg:sticky lg:top-[88px] self-start">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_20px_-6px_rgba(15,23,42,0.06)]">
              <div className="relative h-1" style={{ background: BORDER_GRAD }} />

              <div className="p-5 sm:p-6">
                {/* Promotion */}
                <div className="mb-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em] flex items-center gap-1.5">
                      <BadgePercent size={12} className="text-emerald-600" /> Promotion
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/15 transition-all">
                      <Tag size={12} className="text-slate-400 flex-shrink-0" />
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 text-[12.5px] outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (!promoCode.trim()) { toast.error("Enter code"); return; }
                        setPromoApplied(true);
                        toast.success("Promo code applied!");
                      }}
                      className="px-4 h-9 rounded-lg text-[12px] font-extrabold text-white tracking-wide
                                 hover:-translate-y-px active:scale-[0.98]
                                 transition-all shadow-sm shadow-emerald-900/20"
                      style={{ background: NAV_GRAD }}
                    >
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="h-4 w-1 rounded-full" style={{ background: BORDER_GRAD }} />
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.18em]">
                      Order Summary
                    </h3>
                  </div>

                  <dl className="space-y-2.5 text-[13px]">
                    <div className="flex justify-between items-center text-slate-600">
                      <dt className="font-semibold">
                        Items Total <span className="text-slate-400 font-normal">({currentOrder.items.length} Items)</span>
                      </dt>
                      <dd className="font-bold text-slate-800 tabular-nums" data-numeric="true">
                        ৳ {itemsTotal.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <dt className="font-semibold">Delivery Fee</dt>
                      <dd className="font-bold text-slate-800 tabular-nums" data-numeric="true">
                        ৳ {DELIVERY_FEE.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center text-emerald-700">
                      <dt className="font-semibold">Delivery Discount</dt>
                      <dd className="font-bold tabular-nums" data-numeric="true">
                        −৳ {DELIVERY_DISCOUNT}
                      </dd>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between items-center text-emerald-700">
                        <dt className="font-semibold">Promo Discount</dt>
                        <dd className="font-bold tabular-nums" data-numeric="true">
                          −৳ {promoDiscount.toLocaleString()}
                        </dd>
                      </div>
                    )}
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between items-baseline">
                      <dt className="text-[14px] font-extrabold text-slate-900">Total</dt>
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
                        ৳ {total.toLocaleString()}
                      </dd>
                    </div>
                    <p className="text-[10px] text-right text-slate-400 -mt-0.5">VAT included, where applicable</p>
                  </dl>
                </div>

                {/* Pay button */}
                {!isPaid ? (
                  <button
                    onClick={handlePayment}
                    disabled={isPaying || !selectedMethod}
                    className="mt-5 w-full h-12 rounded-xl text-white text-[14px] font-extrabold tracking-wide
                               flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed
                               hover:-translate-y-px active:scale-[0.99]
                               transition-all duration-200
                               shadow-lg shadow-emerald-900/20
                               hover:shadow-xl hover:shadow-emerald-900/30"
                    style={{ background: NAV_GRAD }}
                  >
                    {isPaying ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        Proceed to Pay
                      </>
                    )}
                  </button>
                ) : (
                  <div className="mt-5 flex items-center gap-3 border border-emerald-200 bg-emerald-50/60 rounded-xl px-4 py-3">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
                    >
                      <Check size={16} className="text-white" />
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-emerald-700">Payment Complete</p>
                      <p className="text-[11.5px] text-slate-500">{currentOrder.payment?.method}</p>
                    </div>
                  </div>
                )}

                <p className="text-[10.5px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                  <Lock size={10} className="text-emerald-600" />
                  Secure &amp; Encrypted Payment
                </p>

                {/* Trust strip */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-dashed border-slate-200">
                  {[
                    { icon: ShieldCheck, label: "Secure" },
                    { icon: Truck, label: "Fast Delivery" },
                    { icon: Receipt, label: "Invoice" },
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
