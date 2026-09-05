"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCartCount } from "@/actions/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";
import { useSession } from "next-auth/react";
import { useCart } from "@/providers/CartProvider";

export default function CartButton() {
  const { data: session } = useSession();
  const { totalItems: guestCount } = useCart();
  const [serverCount, setServerCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (session) {
      getCartCount().then(setServerCount);
    }
  }, [session, pathname]);

  const count = mounted ? (session ? serverCount : guestCount) : 0;

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1.5 text-white transition-all p-2.5 rounded-xl ml-1"
      style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <Badge
          className="absolute -top-1.5 -right-1.5 h-[20px] w-[20px] flex items-center justify-center p-0 text-[10px] font-bold border-2 border-white"
          style={{ background: "linear-gradient(135deg,#059669,#047857)" }}>
          {count}
        </Badge>
      )}
      <span className="hidden sm:inline text-sm font-semibold pr-0.5">কার্ট</span>
    </Link>
  );
}