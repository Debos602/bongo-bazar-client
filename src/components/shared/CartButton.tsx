"use server";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCartCount } from "@/actions/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

export default async function CartButton() {
    const session = await getServerSession(authOptions);
    const cartCount = session ? await getCartCount() : 0;

    // console.log("cart-count-from-button", cartCount);

    return (
        <Link
            href="/cart"
            className="relative flex items-center gap-1.5 text-white transition-all p-2.5 rounded-xl ml-1"
            style={{ background: "linear-gradient(135deg,#16a34a,#15803d)" }}
        >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
                <Badge
                    className="absolute -top-1.5 -right-1.5 h-[20px] w-[20px] flex items-center justify-center p-0 text-[10px] font-bold border-2 border-white"
                    style={{ background: "#dc2626" }}>
                    {cartCount}
                </Badge>
            )}
            <span className="hidden sm:inline text-sm font-semibold pr-0.5">কার্ট</span>
        </Link>
    );
}