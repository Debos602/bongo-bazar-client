import { redirect } from "next/navigation";
import { apiGet } from "@/lib/serverApi";
import type { Me } from "@/types/dashboard";

export default async function AdminLayout({ children }: { children: React.ReactNode; }) {
  const me = await apiGet<Me>("/auth/me");
  if (me.data?.role !== "ADMIN" && me.data?.role !== "SUPER_ADMIN") redirect("/dashboard");
  return <>{children}</>;
}
