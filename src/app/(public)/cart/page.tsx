"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {

    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SHIPPING_COSTS = {
    dhaka: 60,
    outside: 110,
};

const initialItems = [
    {
        id: 1,
        name: "Multicolor Baby Socks Set-6 Pair",
        price: 400,
        quantity: 1,
        image: "https://placehold.co/60x60/f0f0f0/666?text=Socks",
    },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialItems);
    const [area, setArea] = useState("outside");
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
    });

    const updateQty = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const netTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shippingCost =
        SHIPPING_COSTS[area as keyof typeof SHIPPING_COSTS] ?? 110;
    const grandTotal = netTotal + shippingCost;

    return (
        <div className="min-h-screen bg-[#fdf8f0] py-10 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Page Title */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#dc143c] to-[#006a4e]" />
                    <h1 className="text-2xl font-extrabold text-gray-800">
                        আপনার <span className="text-[#dc143c]">কার্ট</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ── Left: Customer Info ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="flex h-1.5">
                            <div className="flex-1 bg-[#dc143c]" />
                            <div className="flex-1 bg-[#006a4e]" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-lg font-extrabold text-gray-800 mb-1 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-[#dc143c]" />
                                কাস্টমার ইনফরমেশন
                            </h2>
                            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                                অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে{" "}
                                <span className="text-[#dc143c] font-bold">
                                    অর্ডার কনফার্ম করুন
                                </span>{" "}
                                বাটনে ক্লিক করুন
                            </p>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার নাম <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input
                                        placeholder="আপনার নাম লিখুন"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10 rounded-xl"
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার মোবাইল <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input
                                        placeholder="+88 ছাড়া ১১ সংখ্যার মোবাইল নাম্বার লিখুন"
                                        value={form.mobile}
                                        onChange={(e) =>
                                            setForm({ ...form, mobile: e.target.value })
                                        }
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10 rounded-xl"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার ই-মেইল{" "}
                                        <span className="text-gray-300">(Optional)</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="আপনার ই-মেইল লিখুন"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({ ...form, email: e.target.value })
                                        }
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10 rounded-xl"
                                    />
                                </div>

                                {/* Area */}
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার এরিয়া সিলেক্ট করুন{" "}
                                        <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Select value={area} onValueChange={setArea}>
                                        <SelectTrigger className="bg-[#fdf8f0] border-gray-200 rounded-xl focus:ring-[#006a4e]/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dhaka">ঢাকার ভেতরে ডেলিভারি</SelectItem>
                                            <SelectItem value="outside">ঢাকার বাইরে ডেলিভারি</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Address */}
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার ঠিকানা <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input
                                        placeholder="আপনার ঠিকানা লিখুন"
                                        value={form.address}
                                        onChange={(e) =>
                                            setForm({ ...form, address: e.target.value })
                                        }
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10 rounded-xl"
                                    />
                                </div>

                                {/* Submit */}
                                <Button className="w-full py-3 mt-2 rounded-xl font-extrabold text-white text-base bg-gradient-to-r from-[#006a4e] to-[#004d38] hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-md">
                                    অর্ডার কনফার্ম করুন
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Order Info ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex h-1.5">
                            <div className="flex-1 bg-[#dc143c]" />
                            <div className="flex-1 bg-[#006a4e]" />
                        </div>
                        <div className="p-6">
                            <h2 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-[#006a4e]" />
                                অর্ডার ইনফরমেশন
                            </h2>

                            {/* Table */}
                            <div className="rounded-xl border border-gray-100 overflow-hidden mb-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#fdf8f0] border-b border-gray-100">
                                            <th className="py-2.5 px-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400 w-8"></th>
                                            <th className="py-2.5 px-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Product Name & Image
                                            </th>
                                            <th className="py-2.5 px-3 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Price
                                            </th>
                                            <th className="py-2.5 px-3 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Qty
                                            </th>
                                            <th className="py-2.5 px-3 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="py-10 text-center text-gray-400 text-sm"
                                                >
                                                    কার্ট খালি আছে
                                                </td>
                                            </tr>
                                        ) : (
                                            cartItems.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-50 hover:bg-[#fdf8f0] transition-colors"
                                                >
                                                    <td className="py-3 px-3">
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="w-6 h-6 rounded-full bg-[#dc143c]/10 hover:bg-[#dc143c] hover:text-white text-[#dc143c] flex items-center justify-center transition-all"
                                                        >
                                                            <Trash2 size={11} />
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            </div>
                                                            <span className="text-xs font-semibold text-[#006a4e] leading-snug line-clamp-2">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-bold text-gray-700">
                                                        {item.price}
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button
                                                                onClick={() => updateQty(item.id, -1)}
                                                                className="w-6 h-6 rounded-full border border-gray-200 hover:border-[#dc143c] hover:text-[#dc143c] flex items-center justify-center transition-all"
                                                            >
                                                                <Minus size={10} />
                                                            </button>
                                                            <span className="w-7 text-center font-bold text-sm">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQty(item.id, 1)}
                                                                className="w-6 h-6 rounded-full border border-gray-200 hover:border-[#006a4e] hover:text-[#006a4e] flex items-center justify-center transition-all"
                                                            >
                                                                <Plus size={10} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-bold text-gray-800">
                                                        {item.price * item.quantity}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Totals */}
                            <div className="bg-[#fdf8f0] rounded-xl p-4 space-y-2.5 mb-5">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-semibold">Net Total</span>
                                    <span className="font-bold text-gray-700">{netTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-semibold">Shipping Cost</span>
                                    <span className="font-bold text-gray-700">{shippingCost}</span>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between">
                                    <span className="font-extrabold text-gray-800">Grand Total</span>
                                    <span className="font-extrabold text-[#dc143c] text-lg">
                                        ৳{grandTotal}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Link href="/products" className="flex-1">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl border-[#006a4e] text-[#006a4e] hover:bg-[#006a4e] hover:text-white font-bold transition-all gap-2"
                                    >
                                        <ArrowLeft size={14} />
                                        Back To Shopping
                                    </Button>
                                </Link>
                                <Button
                                    onClick={clearCart}
                                    variant="outline"
                                    className="flex-1 rounded-xl border-[#dc143c] text-[#dc143c] hover:bg-[#dc143c] hover:text-white font-bold transition-all gap-2"
                                >
                                    <X size={14} />
                                    Cart Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}