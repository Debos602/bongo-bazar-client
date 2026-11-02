import { redirect } from "next/navigation";
import { apiGet } from "@/lib/serverApi";
import type { Me } from "@/types/dashboard";

export default async function VendorLayout({ children }: { children: React.ReactNode; }) {
  const me = await apiGet<Me>("/auth/me");
  if (me.data?.role !== "VENDOR") redirect("/dashboard");
  return <>{children}</>;
}
