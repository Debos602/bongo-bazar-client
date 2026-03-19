"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Package, CreditCard, CheckCircle2, Clock, Truck,
    XCircle, ChevronDown, ChevronUp, ShoppingBag,
    MapPin, Phone, User, ArrowLeft, Loader2, BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { getUserOrder } from "@/actions/order";

// ── Types ──────────────────────────────────────────────────────
type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
        image: string;
        price: number;
    };
};

type Order = {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    payment?: { status: string; method: string; } | null;
    address: {
        fullName: string;
        phone: string;
        city: string;
        area: string;
        address: string;
    };
    items: OrderItem[];
};

// ── Status config ──────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any; }> = {
    PENDING: { label: "পেন্ডিং", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
    PROCESSING: { label: "প্রসেসিং", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Package },
    SHIPPED: { label: "শিপড", color: "bg-purple-50 text-purple-700 border-purple-200", icon: Truck },
    DELIVERED: { label: "ডেলিভারড", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
    CANCELLED: { label: "বাতিল", color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

// ── Payment methods ────────────────────────────────────────────
const PAYMENT_METHODS = [
    { id: "CASH_ON_DELIVERY", label: "ক্যাশ অন ডেলিভারি", icon: "💵" },
    { id: "BKASH", label: "বিকাশ", icon: "📱" },
    { id: "NAGAD", label: "নগদ", icon: "💳" },
    { id: "STRIPE", label: "কার্ড পেমেন্ট", icon: "🏦" },
];

// ══════════════════════════════════════════════════════════════
export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [payingId, setPayingId] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<Record<number, string>>({});

    useEffect(() => {
        getUserOrder().then((data) => {
            setOrders(data);
            setLoading(false);
        });
    }, []);

    const toggleExpand = (id: number) =>
        setExpandedId((prev) => (prev === id ? null : id));

    const handlePayment = async (orderId: number) => {
        const method = selectedMethod[orderId];
        if (!method) {
            toast.error("পেমেন্ট পদ্ধতি সিলেক্ট করুন");
            return;
        }

        setPayingId(orderId);
        try {
            await axiosInstance.post(`/payment/${orderId}`, { method });
            toast.success("পেমেন্ট সফল হয়েছে! 🎉");
            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId
                        ? { ...o, payment: { status: "PAID", method } }
                        : o
                )
            );
        } catch {
            toast.error("পেমেন্ট হয়নি, আবার চেষ্টা করুন");
        } finally {
            setPayingId(null);
        }
    };

    // ── Empty ──
    if (!loading && orders.length === 0) {
        return (
            <div className="min-h-screen bg-[#fdf8f0] flex flex-col items-center justify-center gap-5 px-4">
                <div className="w-24 h-24 rounded-full bg-[#006a4e]/10 flex items-center justify-center">
                    <ShoppingBag size={40} className="text-[#006a4e]" strokeWidth={1.5} />
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-extrabold text-gray-800 mb-1">কোনো অর্ডার নেই</h2>
                    <p className="text-sm text-gray-500">এখনো কোনো অর্ডার করা হয়নি</p>
                </div>
                <Link href="/products">
                    <Button className="bg-[#006a4e] hover:bg-[#004d38] text-white rounded-xl gap-2 font-bold">
                        <ArrowLeft size={14} /> কেনাকাটা শুরু করুন
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fdf8f0] py-10 px-4">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');`}</style>
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#dc143c] to-[#006a4e]" />
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-800">
                            আমার <span className="text-[#dc143c]">অর্ডার</span>
                        </h1>
                        {!loading && (
                            <p className="text-xs text-gray-400 mt-0.5">
                                মোট {orders.length}টি অর্ডার
                            </p>
                        )}
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 size={32} className="animate-spin text-[#006a4e]" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => {
                            const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
                            const StatusIcon = status.icon;
                            const isExpanded = expandedId === order.id;
                            const isPaid = order.payment?.status === "PAID";
                            const isPaying = payingId === order.id;
                            const method = selectedMethod[order.id] ?? "";

                            return (
                                <div key={order.id}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                                    {/* Color bar */}
                                    <div className="flex h-1">
                                        <div className="flex-1 bg-[#dc143c]" />
                                        <div className="flex-1 bg-[#006a4e]" />
                                    </div>

                                    {/* Order header */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-3 flex-wrap">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-gray-400">
                                                        অর্ডার #{order.id}
                                                    </span>
                                                    <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${status.color}`}>
                                                        <StatusIcon size={10} />
                                                        {status.label}
                                                    </span>
                                                    {isPaid && (
                                                        <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-green-50 text-green-700 border-green-200">
                                                            <BadgeCheck size={10} /> পেইড
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[12px] text-gray-400">
                                                    {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                                                        year: "numeric", month: "long", day: "numeric",
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-extrabold text-[#dc143c]">
                                                    ৳{order.total.toLocaleString()}
                                                </p>
                                                <p className="text-[11px] text-gray-400">
                                                    {order.items.length}টি পণ্য
                                                </p>
                                            </div>
                                        </div>

                                        {/* Product thumbnails */}
                                        <div className="flex gap-2 mt-3 flex-wrap">
                                            {order.items.slice(0, 4).map((item) => (
                                                <div key={item.id}
                                                    className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        width={40} height={40}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                            ))}
                                            {order.items.length > 4 && (
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                                    +{order.items.length - 4}
                                                </div>
                                            )}
                                        </div>

                                        {/* Expand button */}
                                        <button
                                            onClick={() => toggleExpand(order.id)}
                                            className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#006a4e] hover:underline"
                                        >
                                            {isExpanded ? (
                                                <><ChevronUp size={13} /> কম দেখুন</>
                                            ) : (
                                                <><ChevronDown size={13} /> বিস্তারিত দেখুন</>
                                            )}
                                        </button>
                                    </div>

                                    {/* Expanded detail */}
                                    {isExpanded && (
                                        <div className="border-t border-gray-100 px-5 pb-5">

                                            {/* Items */}
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4 mb-3">
                                                পণ্যসমূহ
                                            </p>
                                            <div className="flex flex-col gap-2 mb-4">
                                                {order.items.map((item) => (
                                                    <div key={item.id}
                                                        className="flex items-center gap-3 bg-[#fdf8f0] rounded-xl p-3">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                                                            <Image
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                width={48} height={48}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-800 truncate">
                                                                {item.product.name}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                {item.quantity}টি × ৳{item.price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <p className="text-sm font-extrabold text-[#006a4e] flex-shrink-0">
                                                            ৳{(item.price * item.quantity).toLocaleString()}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Address */}
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                                                ডেলিভারি ঠিকানা
                                            </p>
                                            <div className="bg-[#fdf8f0] rounded-xl p-3 flex flex-col gap-1.5 mb-4 text-sm">
                                                <span className="flex items-center gap-2 text-gray-700 font-semibold">
                                                    <User size={13} className="text-[#006a4e]" />
                                                    {order.address.fullName}
                                                </span>
                                                <span className="flex items-center gap-2 text-gray-500">
                                                    <Phone size={13} className="text-[#006a4e]" />
                                                    {order.address.phone}
                                                </span>
                                                <span className="flex items-center gap-2 text-gray-500">
                                                    <MapPin size={13} className="text-[#006a4e]" />
                                                    {order.address.address}, {order.address.area}, {order.address.city}
                                                </span>
                                            </div>

                                            {/* Payment section */}
                                            {!isPaid ? (
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                                                        পেমেন্ট পদ্ধতি
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                                        {PAYMENT_METHODS.map((m) => (
                                                            <button
                                                                key={m.id}
                                                                onClick={() => setSelectedMethod((prev) => ({
                                                                    ...prev, [order.id]: m.id,
                                                                }))}
                                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all
                                                                    ${method === m.id
                                                                        ? "border-[#006a4e] bg-[#006a4e]/5 text-[#006a4e]"
                                                                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                                                                    }`}
                                                            >
                                                                <span className="text-base">{m.icon}</span>
                                                                <span className="text-xs">{m.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <Button
                                                        onClick={() => handlePayment(order.id)}
                                                        disabled={isPaying || !method}
                                                        className="w-full h-11 rounded-xl font-extrabold text-white bg-gradient-to-r from-[#dc143c] to-[#b01030] hover:opacity-90 transition-all shadow-md disabled:opacity-50 gap-2"
                                                    >
                                                        {isPaying ? (
                                                            <><Loader2 size={15} className="animate-spin" /> পেমেন্ট হচ্ছে...</>
                                                        ) : (
                                                            <><CreditCard size={15} /> পেমেন্ট করুন — ৳{order.total.toLocaleString()}</>
                                                        )}
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                                                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-bold text-green-700">পেমেন্ট সম্পন্ন</p>
                                                        <p className="text-xs text-green-600">{order.payment?.method}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}