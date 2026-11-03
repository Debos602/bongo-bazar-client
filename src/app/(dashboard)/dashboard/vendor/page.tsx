import Link from "next/link";
import { Store } from "lucide-react";
import SalesChart from "@/components/dashboard/SalesChart";
import { Stars, Thumb, TopProducts } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Panel, Stat, Table, growthHint, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { VendorDashboard } from "@/types/dashboard";

export default async function VendorOverview() {
  const res = await apiGet<VendorDashboard>("/dashboard/vendor");
  if (!res.data) return <LoadError message={res.message} />;
  const d = res.data;
  const toShip = (d.ordersByStatus.PENDING ?? 0) + (d.ordersByStatus.PROCESSING ?? 0);

  return (
    <>
      <PageHeader title={d.shop.shopName} description="How your shop is doing." icon={<Store size={22} strokeWidth={1.8} />} action={<Link href={`/shops/${d.shop.slug}`} className="text-sm font-medium text-emerald-800 hover:underline">View shop page</Link>} />
      {d.shop.status !== "APPROVED" && (
        <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-800">
          Your shop is {d.shop.status.toLowerCase()}. It is hidden from customers and you cannot make changes. Contact the marketplace team.
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Available to withdraw" value={money(d.balance.available)} tone="accent" hint={`${money(d.balance.pendingPayouts)} requested`} />
        <Stat label="Sales this month" value={money(d.periods.thisMonth.sales)} hint={`Today ${money(d.periods.today.sales)}. ${growthHint(d.periods.thisMonth.growthPct)}`} />
        <Stat label="Orders to fulfil" value={toShip} tone={toShip ? "warn" : undefined} hint={`Total orders: ${d.totals.orders}`} />
        <Stat label="Rating" value={d.totals.reviews ? <Stars value={d.totals.averageRating} /> : "None yet"} hint={`${d.totals.reviews} reviews · ${d.totals.publishedProducts}/${d.totals.products} products live`} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel title="Sales, last 12 months" className="lg:col-span-2"><SalesChart data={d.monthlySales} /></Panel>
        <TopProducts products={d.topProducts} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel title="Recent orders" className="lg:col-span-2" action={<Link href="/dashboard/vendor/orders" className="text-xs font-medium text-emerald-800 hover:underline">View all</Link>}>
          {d.recentOrders.length ? (
            <Table head={["Order", "Customer", "Total", "You get", "Status", "Date"]}>
              {d.recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium text-slate-800">#{o.orderId}</td>
                  <td>{o.order.user.name}</td>
                  <td className="tabular-nums">{money(o.total)}</td>
                  <td className="tabular-nums">{money(o.vendorEarning)}</td>
                  <td><Badge status={o.status} /></td>
                  <td className="whitespace-nowrap text-slate-500">{shortDate(o.createdAt)}</td>
                </tr>
              ))}
            </Table>
          ) : <Empty title="No orders yet" />}
        </Panel>
        <Panel title="Low stock">
          {d.lowStock.length ? (
            <ul className="divide-y divide-slate-100">
              {d.lowStock.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <Thumb src={p.image} alt="" />
                  <Link href={`/dashboard/vendor/products/${p.id}`} className="min-w-0 flex-1 truncate text-slate-800 hover:underline">{p.name}</Link>
                  <span className={p.stock === 0 ? "font-semibold text-red-700" : "tabular-nums text-amber-700"}>{p.stock === 0 ? "Out" : `${p.stock} left`}</span>
                </li>
              ))}
            </ul>
          ) : <Empty title="Stock looks healthy" />}
        </Panel>
      </div>
    </>
  );
}
