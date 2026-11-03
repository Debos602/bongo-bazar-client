import Link from "next/link";
import { BarChart3, CalendarDays, Check, Coins, ShoppingBag, Store, UserPlus, Wallet, Banknote } from "lucide-react";
import SalesChart from "@/components/dashboard/SalesChart";
import ApiButton from "@/components/dashboard/ApiButton";
import { TopProducts } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Panel, Stat, Table, growthHint, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { AdminDashboard } from "@/types/dashboard";

export default async function AdminOverview() {
  const res = await apiGet<AdminDashboard>("/dashboard/admin");
  if (!res.data) return <LoadError message={res.message} />;
  const d = res.data;
  const pendingCount = d.vendorsByStatus.PENDING ?? 0;

  return (
    <>
      <PageHeader title="Marketplace overview" description="Sales, vendors and what needs your attention." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Banknote} label="Sales today" value={money(d.periods.today.sales)} hint={`${d.periods.today.orders} ${d.periods.today.orders === 1 ? "order" : "orders"}`} />
        <Stat icon={CalendarDays} label="Sales this month" value={money(d.periods.thisMonth.sales)} hint={growthHint(d.periods.thisMonth.growthPct)} />
        <Stat icon={Coins} label="Commission earned" value={money(d.totals.commissionEarned)} hint={`After delivery. Coupons cost ${money(d.totals.platformDiscounts)}`} tone="accent" />
        <Stat icon={ShoppingBag} label="Orders" value={d.totals.orders} hint={`${d.ordersByStatus.PENDING ?? 0} pending`} />
        <Stat icon={Store} label="Active vendors" value={d.vendorsByStatus.APPROVED ?? 0} hint={`${d.totals.products} products, ${d.totals.customers} customers`} />
        <Stat icon={UserPlus} label="Vendor applications" value={pendingCount} tone={pendingCount ? "warn" : undefined} hint="Waiting for review" />
        <Stat icon={Wallet} label="Payouts to process" value={money(d.totals.pendingPayoutAmount)} tone={d.totals.pendingPayoutCount ? "warn" : undefined} hint={`${d.totals.pendingPayoutCount} requests`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel icon={BarChart3} title="Sales, last 12 months" className="lg:col-span-2"><SalesChart data={d.monthlySales} /></Panel>
        <TopProducts products={d.topProducts} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel icon={ShoppingBag} title="Recent orders" className="lg:col-span-2" action={<Link href="/dashboard/admin/orders" className="text-xs font-medium text-emerald-800 hover:underline">View all</Link>}>
          {d.recentOrders.length ? (
            <Table head={["Order", "Customer", "City", "Total", "Status", "Date"]}>
              {d.recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium text-slate-800">#{o.id}</td>
                  <td>{o.user.name}</td>
                  <td>{o.address.city}</td>
                  <td className="tabular-nums">{money(o.total)}</td>
                  <td><Badge status={o.status} /></td>
                  <td className="whitespace-nowrap text-slate-500">{shortDate(o.createdAt)}</td>
                </tr>
              ))}
            </Table>
          ) : <Empty title="No orders yet" icon={ShoppingBag} />}
        </Panel>
        <Panel icon={UserPlus} title="Vendor applications" action={<Link href="/dashboard/admin/vendors?status=PENDING" className="text-xs font-medium text-emerald-800 hover:underline">View all</Link>}>
          {d.pendingVendors.length ? (
            <ul className="divide-y divide-slate-100">
              {d.pendingVendors.map((v) => (
                <li key={v.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-800">{v.shopName}</p>
                    <p className="truncate text-xs text-slate-500">{v.user.name}</p>
                  </div>
                  <ApiButton method="PATCH" path={`/vendor/${v.id}/status`} body={{ status: "APPROVED" }} variant="primary"><Check size={13} aria-hidden /> Approve</ApiButton>
                </li>
              ))}
            </ul>
          ) : <Empty title="Nothing to review" icon={UserPlus} />}
        </Panel>
      </div>
    </>
  );
}
