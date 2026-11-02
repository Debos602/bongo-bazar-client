import { redirect } from "next/navigation";
import Shell from "@/components/dashboard/Shell";
import { apiGet } from "@/lib/serverApi";
import type { Me } from "@/types/dashboard";

// Role comes from the API rather than the login session, so a vendor approved after
// signing in gets the vendor dashboard without logging in again.
export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const me = await apiGet<Me>("/auth/me");
  if (!me.data) redirect("/login");

  return <Shell role={me.data.role} name={me.data.name} email={me.data.email}>{children}</Shell>;
}
