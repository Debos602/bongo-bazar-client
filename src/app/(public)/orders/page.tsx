"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin, Phone, User, Pencil, Package,
    CheckCircle2, Truck, CreditCard, Loader2,
    Tag, ChevronRight, ShieldCheck, BadgePercent,
    Home, Building2, Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { getUserOrder } from "@/actions/order";

type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: { id: number; name: string; image: string; price: number; };
};

type Order = {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    payment?: { status: string; method: string; } | null;
    address: { fullName: string; phone: string; city: string; area: string; address: string; tag?: string; };
    items: OrderItem[];
};

const PAYMENT_METHODS = [
    { id: "CASH_ON_DELIVERY", label: "ক্যাশ অন ডেলিভারি", icon: "💵" },
    { id: "BKASH", label: "বিকাশ", icon: "📱" },
    { id: "NAGAD", label: "নগদ", icon: "💳" },
    { id: "STRIPE", label: "কার্ড পেমেন্ট", icon: "🏦" },
];

const DELIVERY_FEE = 968;
const DELIVERY_DISCOUNT = 110;

export default function CheckoutPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [payingId, setPayingId] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [promoApplied, setPromoApplied] = useState(false);

    useEffect(() => {
        getUserOrder().then((data) => { setOrders(data); });
    }, []);

    const order = orders[0];
    const isPaid = order?.payment?.status === "PAID";
    const isPaying = payingId === order?.id;

    const itemsTotal = order?.items.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
    const promoDiscount = promoApplied ? Math.floor(itemsTotal * 0.05) : 0;
    const total = itemsTotal + DELIVERY_FEE - DELIVERY_DISCOUNT - promoDiscount;

    const handlePayment = async () => {
        if (!selectedMethod) { toast.error("পেমেন্ট পদ্ধতি সিলেক্ট করুন"); return; }
        setPayingId(order.id);
        try {
            await axiosInstance.post(`/payment/${order.id}`, { method: selectedMethod });
            toast.success("পেমেন্ট সফল হয়েছে! 🎉");
            setOrders((prev) =>
                prev.map((o) => o.id === order.id ? { ...o, payment: { status: "PAID", method: selectedMethod } } : o)
            );
        } catch { toast.error("পেমেন্ট হয়নি, আবার চেষ্টা করুন"); }
        finally { setPayingId(null); }
    };



    if (!order) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Package size={40} className="text-neutral-300" strokeWidth={1.4} />
            <p className="text-neutral-500 font-semibold">কোনো অর্ডার পাওয়া যায়নি</p>
            <Link href="/products" className="text-sm text-emerald-600 font-bold hover:underline">কেনাকাটা করুন →</Link>
        </div>
    );

    return (
        <div className="min-h-screen py-6 px-4">

            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-red-600 via-orange-400 to-emerald-600 mb-6" />

            <div className="max-w-6xl mx-auto">

                {/* Page title */}
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                        <Link href="/orders">Order</Link>
                    </span>
                    <ChevronRight size={12} className="text-neutral-300" />
                    <span className="text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-red-500 to-emerald-600 bg-clip-text text-transparent font-bold">Checkout</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* ══ LEFT COLUMN ═══════════════════════════════════════ */}
                    <div className="flex-1 flex flex-col gap-4 min-w-0">

                        {/* ── Shipping & Billing ── */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">

                                {/* Address card */}
                                <div className="border border-neutral-100 rounded-xl p-4 flex flex-col gap-2.5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <User size={13} className="text-neutral-500" />
                                            <span className="text-sm font-bold text-neutral-800">{order.address.fullName}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-neutral-500">
                                            <Phone size={11} />
                                            <span className="text-xs">{order.address.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/40 text-emerald-600 flex-shrink-0">
                                            <Home size={9} /> HOME
                                        </span>
                                        <span className="text-xs text-neutral-500 leading-relaxed">
                                            {order.address.address}, {order.address.area}, {order.address.city}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Package ── */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">

                                {/* Package header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Package size={14} className="text-neutral-500" />
                                        <span className="text-sm font-extrabold text-neutral-800">Package 1 of 1</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                        Fulfilled by
                                        <span className="font-bold text-orange-500">Daraz</span>
                                    </div>
                                </div>

                                {/* Delivery option */}
                                <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">
                                    Delivery or Pickup
                                </p>
                                <div className="border-2 border-emerald-500 rounded-xl p-3.5 mb-5 flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-extrabold text-neutral-800">
                                                ৳ {(DELIVERY_FEE - DELIVERY_DISCOUNT).toLocaleString()}
                                            </span>
                                            <span className="text-xs line-through text-neutral-400">৳ {DELIVERY_FEE}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Truck size={11} className="text-emerald-600" />
                                            <span className="text-xs font-semibold text-neutral-600">Standard Delivery</span>
                                        </div>
                                        <p className="text-[11px] text-neutral-400 mt-1">Get by 22–31 Mar</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="flex flex-col gap-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-3 py-3 border-t border-neutral-100 first:border-t-0">
                                            <div className="w-16 h-16 rounded-xl border border-neutral-200 overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={64} height={64}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-neutral-800 leading-snug line-clamp-2 mb-1">
                                                    {item.product.name}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base font-extrabold text-red-500">
                                                        ৳ {item.price.toLocaleString()}
                                                    </span>
                                                    <span className="text-xs line-through text-neutral-400">
                                                        ৳ {item.product.price.toLocaleString()}
                                                    </span>
                                                    {item.product.price > item.price && (
                                                        <span className="text-[10px] font-bold text-red-500">
                                                            -{Math.round((1 - item.price / item.product.price) * 100)}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-xs text-neutral-400 mb-1">Qty: <span className="font-bold text-neutral-700">{item.quantity}</span></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Payment Method ── */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">
                                <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <CreditCard size={14} className="text-neutral-500" />
                                    পেমেন্ট পদ্ধতি
                                </h2>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {PAYMENT_METHODS.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setSelectedMethod(m.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${selectedMethod === m.id
                                                ? "border-emerald-500 text-emerald-700"
                                                : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                                                }`}
                                        >
                                            <span className="text-lg">{m.icon}</span>
                                            <span className="text-xs leading-tight">{m.label}</span>
                                            {selectedMethod === m.id && (
                                                <CheckCircle2 size={14} className="text-emerald-500 ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══ RIGHT COLUMN ══════════════════════════════════════ */}
                    <div className="w-full lg:w-[310px] flex-shrink-0 flex flex-col gap-4 sticky top-6">




                        {/* ── Order Summary ── */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-4 py-4">
                                <h3 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wide mb-4">
                                    Order Summary
                                </h3>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-neutral-500">Items Total ({order.items.length} Items)</span>
                                        <span className="text-sm font-semibold text-neutral-800">৳ {itemsTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-neutral-500">Delivery Fee</span>
                                        <span className="text-sm font-semibold text-neutral-800">৳ {DELIVERY_FEE.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-neutral-500">Delivery Discount</span>
                                        <span className="text-sm font-semibold text-emerald-600">-৳ {DELIVERY_DISCOUNT}</span>
                                    </div>
                                    {promoApplied && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-neutral-500">Promo Discount</span>
                                            <span className="text-sm font-semibold text-emerald-600">-৳ {promoDiscount}</span>
                                        </div>
                                    )}

                                    {/* Divider */}
                                    <div className="h-px bg-gradient-to-r from-red-200 via-neutral-100 to-emerald-200" />

                                    {/* Total */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-neutral-700">Total:</span>
                                        <span className="text-xl font-extrabold text-red-500">৳ {total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-right text-neutral-400 -mt-1">VAT included, where applicable</p>
                                </div>

                                {/* Pay button */}
                                {!isPaid ? (
                                    <button
                                        onClick={handlePayment}
                                        disabled={isPaying || !selectedMethod}
                                        className="mt-4 w-full h-12 rounded-xl bg-gradient-to-r from-red-500 to-emerald-600 text-white text-sm font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40 hover:opacity-90 transition-opacity shadow-md shadow-red-100"
                                    >
                                        {isPaying
                                            ? <><Loader2 size={15} className="animate-spin" /> প্রসেস হচ্ছে...</>
                                            : <><ShieldCheck size={15} /> Proceed to Pay</>
                                        }
                                    </button>
                                ) : (
                                    <div className="mt-4 flex items-center gap-3 border border-emerald-500/30 rounded-xl px-4 py-3">
                                        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-emerald-600">পেমেন্ট সম্পন্ন</p>
                                            <p className="text-xs text-neutral-400">{order.payment?.method}</p>
                                        </div>
                                    </div>
                                )}

                                <p className="text-[10px] text-center text-neutral-400 mt-3 flex items-center justify-center gap-1">
                                    <ShieldCheck size={9} className="text-emerald-500" />
                                    Secure & Encrypted Payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}