"use client";

import { Bell, Search, User, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function DashboardHeader({ title = "Dashboard" }: { title?: string }) {
  const session = useSession();

  return (
    <header
      className="flex items-center justify-between gap-4 px-6 py-4"
      style={{ background: "var(--card)", color: "var(--card-foreground)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="hidden md:block">
          <Input placeholder="Search products, orders..." className="w-80" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" className="p-2">
          <Search className="w-4 h-4" />
        </Button>

        <Button variant="ghost" className="p-2">
          <Bell className="w-4 h-4" />
        </Button>

        <Link href="/settings">
          <Button variant="ghost" className="p-2 hidden sm:inline-flex">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} alt={session.data?.user?.name || "User"} />
            <AvatarFallback>{(session.data?.user?.name || "U").slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-sm">
            <span className="font-medium">{session.data?.user?.name || session.data?.user?.email || "Guest"}</span>
            <span className="text-xs text-muted-foreground">{session.data?.user?.role || "Customer"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
