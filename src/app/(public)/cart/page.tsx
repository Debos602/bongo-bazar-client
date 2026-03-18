"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCart, removeFromCart, updateCartQuantity } from "@/actions/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrderWithAddress } from "@/actions/order";
const SHIPPING_COSTS = { dhaka: 60, outside: 110 };

type CartItem = {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
};

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [area, setArea] = useState("outside");
    const [form, setForm] = useState({ name: "", mobile: "", email: "", address: "" });
    // ✅ type ঠিক করো
    const [orderLoading, setOrderLoading] = useState<boolean>(false);
    const router = useRouter();
    // ✅ API থেকে cart load করো
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            const data = await getCart();
            setCartItems(data);
            setLoading(false);
        };
        fetchCart();
    }, []);

    const handleOrder = async () => {
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
                clearCart();
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

    // ✅ Quantity update
    const updateQty = async (id: number, delta: number) => {
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.quantity + delta);

        setCartItems((prev) =>
            prev.map((i) => i.id === id ? { ...i, quantity: newQty } : i)
        );

        await updateCartQuantity(id, newQty);
        router.refresh();
    };

    // ✅ Item remove
    const removeItem = async (id: number) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
        const res = await removeFromCart(id);
        router.refresh();
        if (!res?.success) {
            toast.error("মুছতে পারেনি, আবার চেষ্টা করুন");
        } else {
            toast.success("কার্ট থেকে সরানো হয়েছে");
        }
    };

    const clearCart = () => setCartItems([]);

    const netTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingCost = SHIPPING_COSTS[area as keyof typeof SHIPPING_COSTS] ?? 110;
    const grandTotal = netTotal + shippingCost;

    return (
        <div className="min-h-screen bg-[#fdf8f0] py-10 px-4">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8 flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#dc143c] to-[#006a4e]" />
                    <h1 className="text-2xl font-extrabold text-gray-800">
                        আপনার <span className="text-[#dc143c]">কার্ট</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ── Left: Customer Info ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                                অর্ডারটি কনফার্ম করতে নাম, ঠিকানা, মোবাইল নাম্বার লিখে{" "}
                                <span className="text-[#dc143c] font-bold">অর্ডার কনফার্ম করুন</span>{" "}
                                বাটনে ক্লিক করুন
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার নাম <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input placeholder="আপনার নাম লিখুন" value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] rounded-xl" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার মোবাইল <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input placeholder="+88 ছাড়া ১১ সংখ্যার মোবাইল" value={form.mobile}
                                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] rounded-xl" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার ই-মেইল <span className="text-gray-300">(Optional)</span>
                                    </Label>
                                    <Input type="email" placeholder="আপনার ই-মেইল লিখুন" value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] rounded-xl" />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        এরিয়া সিলেক্ট করুন <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Select value={area} onValueChange={setArea}>
                                        <SelectTrigger className="bg-[#fdf8f0] border-gray-200 rounded-xl">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dhaka">ঢাকার ভেতরে ডেলিভারি</SelectItem>
                                            <SelectItem value="outside">ঢাকার বাইরে ডেলিভারি</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">
                                        আপনার ঠিকানা <span className="text-[#dc143c]">*</span>
                                    </Label>
                                    <Input placeholder="আপনার ঠিকানা লিখুন" value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] rounded-xl" />
                                </div>

                                <Button
                                    onClick={handleOrder}
                                    disabled={orderLoading || cartItems.length === 0}
                                    className="w-full py-3 mt-2 rounded-xl font-extrabold text-white text-base bg-gradient-to-r from-[#006a4e] to-[#004d38] hover:opacity-90 transition-all shadow-md disabled:opacity-60"
                                >
                                    {orderLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 size={16} className="animate-spin" />
                                            অর্ডার হচ্ছে...
                                        </span>
                                    ) : (
                                        "অর্ডার কনফার্ম করুন"
                                    )}
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

                            <div className="rounded-xl border border-gray-100 overflow-hidden mb-4">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#fdf8f0] border-b border-gray-100">
                                            <th className="py-2.5 px-3 w-8"></th>
                                            <th className="py-2.5 px-3 text-left text-xs font-bold uppercase text-gray-400">Product</th>
                                            <th className="py-2.5 px-3 text-right text-xs font-bold uppercase text-gray-400">Price</th>
                                            <th className="py-2.5 px-3 text-center text-xs font-bold uppercase text-gray-400">Qty</th>
                                            <th className="py-2.5 px-3 text-right text-xs font-bold uppercase text-gray-400">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ✅ Loading state */}
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-gray-400">
                                                    <Loader2 className="animate-spin mx-auto" size={24} />
                                                </td>
                                            </tr>
                                        ) : cartItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-gray-400 text-sm">
                                                    কার্ট খালি আছে
                                                </td>
                                            </tr>
                                        ) : (
                                            // ✅ Real API data render
                                            cartItems.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-50 hover:bg-[#fdf8f0] transition-colors">
                                                    <td className="py-3 px-3">
                                                        <button onClick={() => removeItem(item.id)}
                                                            className="w-6 h-6 rounded-full bg-[#dc143c]/10 hover:bg-[#dc143c] hover:text-white text-[#dc143c] flex items-center justify-center transition-all">
                                                            <Trash2 size={11} />
                                                        </button>
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
                                                                <Image
                                                                    src={item.product.image}
                                                                    alt={item.product.name}
                                                                    width={40} height={40}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            </div>
                                                            <span className="text-xs font-semibold text-[#006a4e] leading-snug line-clamp-2">
                                                                {item.product.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-bold text-gray-700">
                                                        ৳{item.product.price.toLocaleString()}
                                                    </td>
                                                    <td className="py-3 px-3">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button onClick={() => updateQty(item.id, -1)}
                                                                className="w-6 h-6 rounded-full border border-gray-200 hover:border-[#dc143c] hover:text-[#dc143c] flex items-center justify-center transition-all">
                                                                <Minus size={10} />
                                                            </button>
                                                            <span className="w-7 text-center font-bold text-sm">{item.quantity}</span>
                                                            <button onClick={() => updateQty(item.id, 1)}
                                                                className="w-6 h-6 rounded-full border border-gray-200 hover:border-[#006a4e] hover:text-[#006a4e] flex items-center justify-center transition-all">
                                                                <Plus size={10} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-3 text-right font-bold text-gray-800">
                                                        ৳{(item.product.price * item.quantity).toLocaleString()}
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
                                    <span className="font-bold text-gray-700">৳{netTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span className="font-semibold">Shipping Cost</span>
                                    <span className="font-bold text-gray-700">৳{shippingCost}</span>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between">
                                    <span className="font-extrabold text-gray-800">Grand Total</span>
                                    <span className="font-extrabold text-[#dc143c] text-lg">৳{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Link href="/products" className="flex-1">
                                    <Button variant="outline" className="w-full rounded-xl border-[#006a4e] text-[#006a4e] hover:bg-[#006a4e] hover:text-white font-bold gap-2">
                                        <ArrowLeft size={14} /> Back To Shopping
                                    </Button>
                                </Link>
                                <Button onClick={clearCart} variant="outline"
                                    className="flex-1 rounded-xl border-[#dc143c] text-[#dc143c] hover:bg-[#dc143c] hover:text-white font-bold gap-2">
                                    <X size={14} /> Cart Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}