import { redirect } from "next/navigation";
import { apiGet } from "@/lib/serverApi";
import type { Me } from "@/types/dashboard";

export default async function DashboardRedirect() {
  const me = await apiGet<Me>("/auth/me");
  const role = me.data?.role;
  if (!role) redirect("/login");
  if (role === "ADMIN" || role === "SUPER_ADMIN") redirect("/dashboard/admin");
  if (role === "VENDOR") redirect("/dashboard/vendor");
  redirect("/dashboard/user");
}
