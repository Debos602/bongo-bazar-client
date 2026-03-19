"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Phone, User, Pencil, Package,
    CheckCircle2, Truck, CreditCard, Loader2,
    Tag, ChevronRight, ShieldCheck, BadgePercent, Home,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { Order } from "@/types";

const PAYMENT_METHODS = [
    { id: "CASH_ON_DELIVERY", label: "ক্যাশ অন ডেলিভারি", icon: "💵" },
    { id: "BKASH", label: "বিকাশ", icon: "📱" },
    { id: "NAGAD", label: "নগদ", icon: "💳" },
    { id: "STRIPE", label: "কার্ড পেমেন্ট", icon: "🏦" },
];

const DELIVERY_FEE = 968;
const DELIVERY_DISCOUNT = 110;

export default function CheckoutClient({ order }: { order: Order; }) {
    const [currentOrder, setCurrentOrder] = useState<Order>(order);
    const [payingId, setPayingId] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const isPaid = currentOrder.payment?.status === "PAID";
    const isPaying = payingId === currentOrder.id;

    const itemsTotal = currentOrder.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const promoDiscount = promoApplied ? Math.floor(itemsTotal * 0.05) : 0;
    const total = itemsTotal + DELIVERY_FEE - DELIVERY_DISCOUNT - promoDiscount;

    const handlePayment = async () => {
        if (!selectedMethod) { toast.error("পেমেন্ট পদ্ধতি সিলেক্ট করুন"); return; }
        setPayingId(currentOrder.id);
        try {
            await axiosInstance.post(`/payment/${currentOrder.id}`, { method: selectedMethod });
            toast.success("পেমেন্ট সফল হয়েছে! 🎉");
            setCurrentOrder((prev) => ({
                ...prev,
                payment: { status: "PAID", method: selectedMethod },
            }));
        } catch {
            toast.error("পেমেন্ট হয়নি, আবার চেষ্টা করুন");
        } finally {
            setPayingId(null);
        }
    };

    return (
        <div className="min-h-screen py-6 px-4">
            <div className="h-1 bg-gradient-to-r from-red-600 via-orange-400 to-emerald-600 mb-6" />

            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <Link href="/orders">
                        <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase hover:text-neutral-600 transition-colors">
                            Order
                        </span>
                    </Link>
                    <ChevronRight size={12} className="text-neutral-300" />
                    <span className="text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-red-500 to-emerald-600 bg-clip-text text-transparent font-bold">
                        Checkout
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">
                    <div className="flex-1 flex flex-col gap-4 min-w-0">

                        {/* Shipping & Billing */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wide">Shipping &amp; Billing</h2>
                                    <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                                        <Pencil size={11} /> EDIT
                                    </button>
                                </div>
                                <div className="border border-neutral-100 rounded-xl p-4 flex flex-col gap-2.5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <User size={13} className="text-neutral-500" />
                                            <span className="text-sm font-bold text-neutral-800">{currentOrder.address.fullName}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-neutral-500">
                                            <Phone size={11} />
                                            <span className="text-xs">{currentOrder.address.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/40 text-emerald-600 flex-shrink-0">
                                            <Home size={9} /> HOME
                                        </span>
                                        <span className="text-xs text-neutral-500 leading-relaxed">
                                            {currentOrder.address.address}, {currentOrder.address.area}, {currentOrder.address.city}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Package size={14} className="text-neutral-500" />
                                        <span className="text-sm font-extrabold text-neutral-800">Package 1 of 1</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                                        Fulfilled by <span className="font-bold text-orange-500">Daraz</span>
                                    </div>
                                </div>
                                <p className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Delivery or Pickup</p>
                                <div className="border-2 border-emerald-500 rounded-xl p-3.5 mb-5 flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-extrabold text-neutral-800">৳ {(DELIVERY_FEE - DELIVERY_DISCOUNT).toLocaleString()}</span>
                                            <span className="text-xs line-through text-neutral-400">৳ {DELIVERY_FEE}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Truck size={11} className="text-emerald-600" />
                                            <span className="text-xs font-semibold text-neutral-600">Standard Delivery</span>
                                        </div>
                                        <p className="text-[11px] text-neutral-400 mt-1">Get by 22–31 Mar</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {currentOrder.items.map((item) => (
                                        <div key={item.id} className="flex items-start gap-3 py-3 border-t border-neutral-100 first:border-t-0">
                                            <div className="w-16 h-16 rounded-xl border border-neutral-200 overflow-hidden flex-shrink-0">
                                                <Image src={item.product.image} alt={item.product.name} width={64} height={64} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-neutral-800 leading-snug line-clamp-2 mb-1">{item.product.name}</p>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base font-extrabold text-red-500">৳ {item.price.toLocaleString()}</span>
                                                    <span className="text-xs line-through text-neutral-400">৳ {item.product.price.toLocaleString()}</span>
                                                    {item.product.price > item.price && (
                                                        <span className="text-[10px] font-bold text-red-500">-{Math.round((1 - item.price / item.product.price) * 100)}%</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-xs text-neutral-400 flex-shrink-0">Qty: <span className="font-bold text-neutral-700">{item.quantity}</span></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-5 py-4">
                                <h2 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <CreditCard size={14} className="text-neutral-500" /> পেমেন্ট পদ্ধতি
                                </h2>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {PAYMENT_METHODS.map((m) => (
                                        <button key={m.id} onClick={() => setSelectedMethod(m.id)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${selectedMethod === m.id ? "border-emerald-500 text-emerald-700" : "border-neutral-200 text-neutral-500 hover:border-neutral-300"}`}
                                        >
                                            <span className="text-lg">{m.icon}</span>
                                            <span className="text-xs leading-tight">{m.label}</span>
                                            {selectedMethod === m.id && <CheckCircle2 size={14} className="text-emerald-500 ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-[310px] flex-shrink-0 flex flex-col gap-4 sticky top-6">

                        {/* Promotion */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-4 py-4">
                                <h3 className="text-sm font-extrabold text-neutral-800 mb-3 flex items-center gap-2">
                                    <BadgePercent size={14} className="text-red-500" /> Promotion
                                </h3>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2">
                                        <Tag size={12} className="text-neutral-400 flex-shrink-0" />
                                        <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter Store/Daraz Code"
                                            className="flex-1 text-xs outline-none text-neutral-700 placeholder:text-neutral-400 bg-transparent" />
                                    </div>
                                    <button onClick={() => { if (!promoCode.trim()) { toast.error("কোড দিন"); return; } setPromoApplied(true); toast.success("প্রমো কোড প্রয়োগ হয়েছে!"); }}
                                        className="px-4 py-2 rounded-lg text-xs font-extrabold text-white bg-gradient-to-r from-red-500 to-emerald-600 hover:opacity-90 transition-opacity">
                                        APPLY
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Invoice & Contact */}
                        <div className="border border-neutral-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-neutral-700">Invoice and Contact Info</h3>
                            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
                                <Pencil size={11} /> Edit
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
                            <div className="h-[2px] bg-gradient-to-r from-red-500 to-emerald-600" />
                            <div className="px-4 py-4">
                                <h3 className="text-sm font-extrabold text-neutral-800 uppercase tracking-wide mb-4">Order Summary</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-neutral-500">Items Total ({currentOrder.items.length} Items)</span>
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
                                    <div className="h-px bg-gradient-to-r from-red-200 via-neutral-100 to-emerald-200" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-neutral-700">Total:</span>
                                        <span className="text-xl font-extrabold text-red-500">৳ {total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[10px] text-right text-neutral-400 -mt-1">VAT included, where applicable</p>
                                </div>
                                {!isPaid ? (
                                    <button onClick={handlePayment} disabled={isPaying || !selectedMethod}
                                        className="mt-4 w-full h-12 rounded-xl bg-gradient-to-r from-red-500 to-emerald-600 text-white text-sm font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40 hover:opacity-90 transition-opacity shadow-md shadow-red-100">
                                        {isPaying ? <><Loader2 size={15} className="animate-spin" /> প্রসেস হচ্ছে...</> : <><ShieldCheck size={15} /> Proceed to Pay</>}
                                    </button>
                                ) : (
                                    <div className="mt-4 flex items-center gap-3 border border-emerald-500/30 rounded-xl px-4 py-3">
                                        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-emerald-600">পেমেন্ট সম্পন্ন</p>
                                            <p className="text-xs text-neutral-400">{currentOrder.payment?.method}</p>
                                        </div>
                                    </div>
                                )}
                                <p className="text-[10px] text-center text-neutral-400 mt-3 flex items-center justify-center gap-1">
                                    <ShieldCheck size={9} className="text-emerald-500" /> Secure &amp; Encrypted Payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}