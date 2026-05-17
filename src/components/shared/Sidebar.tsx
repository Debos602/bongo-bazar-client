"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, ShoppingCart, Store, Tag, User, LayoutDashboard } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Sidebar() {

  const session = useSession();
  const pathname = usePathname();

  const menu = [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/dashboard/products", icon: Store },
    { label: "Create Product", href: "/dashboard/create-product", icon: PlusCircle },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "Categories", href: "/dashboard/categories", icon: Tag },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside
      className="flex h-screen w-64 flex-col"
      style={{
        background: "var(--sidebar)",
        color: "var(--sidebar-foreground)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="text-lg font-bold" style={{ color: "var(--sidebar-primary)" }}>
            Bongo Bazar
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon as any;
          const active = pathname?.startsWith(item.href || "");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[color:var(--sidebar-accent)] hover:text-[color:var(--sidebar-accent-foreground)] ${
                active ? "bg-[color:var(--sidebar-accent)] text-[color:var(--sidebar-accent-foreground)]" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
        {session.status === "authenticated" ? (
          <div>
            <div className="mb-2 text-sm">{session.data?.user?.name || session.data?.user?.email}</div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/auth/login">
            <Button className="w-full">Login</Button>
          </Link>
        )}
      </div>
    </aside>
  );
}
