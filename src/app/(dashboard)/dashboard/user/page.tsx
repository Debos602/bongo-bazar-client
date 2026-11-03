import Link from "next/link";
import { Heart, MapPin, MessageSquare, ShoppingBag, Truck, Wallet } from "lucide-react";
import { FormDialog } from "@/components/dashboard/ApiForm";
import { Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Panel, Stat, Table, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { UserDashboard } from "@/types/dashboard";

export default async function UserOverview() {
  const res = await apiGet<UserDashboard>("/dashboard/user");
  if (!res.data) return <LoadError message={res.message} />;
  const d = res.data;
  const inProgress = (d.ordersByStatus.PENDING ?? 0) + (d.ordersByStatus.PROCESSING ?? 0) + (d.ordersByStatus.SHIPPED ?? 0);
  const application = d.vendorApplication;

  return (
    <>
      <PageHeader title="My account" />
      {application && application.status !== "APPROVED" && (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">
          Your application for {application.shopName} is {application.status.toLowerCase()}. <Link href="/dashboard/user/sell" className="font-medium underline">See details</Link>
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat icon={Truck} label="Orders in progress" value={inProgress} tone={inProgress ? "accent" : undefined} hint={`Total orders: ${d.totals.orders}`} />
        <Stat icon={Wallet} label="Total spent" value={money(d.totals.spent)} />
        <Stat icon={Heart} label="Wishlist" value={d.totals.wishlist} />
        <Stat icon={MapPin} label="Saved addresses" value={d.totals.addresses} />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel icon={ShoppingBag} title="Recent orders" className="lg:col-span-2" action={<Link href="/dashboard/user/orders" className="text-xs font-medium text-emerald-800 hover:underline">View all</Link>}>
          {d.recentOrders.length ? (
            <Table head={["Order", "Items", "Total", "Status", "Date"]}>
              {d.recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium text-slate-800">#{o.id}</td>
                  <td className="tabular-nums">{o._count.items}</td>
                  <td className="tabular-nums">{money(o.total)}</td>
                  <td><Badge status={o.status} /></td>
                  <td className="whitespace-nowrap text-slate-500">{shortDate(o.createdAt)}</td>
                </tr>
              ))}
            </Table>
          ) : <Empty title="You haven't ordered anything yet" icon={ShoppingBag}><Link href="/products" className="font-medium text-emerald-800 hover:underline">Browse products</Link></Empty>}
        </Panel>
        <Panel icon={MessageSquare} title="Waiting for your review">
          {d.toReview.length ? (
            <ul className="divide-y divide-slate-100">
              {d.toReview.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <Thumb src={p.image} alt="" />
                  <span className="min-w-0 flex-1 truncate text-slate-800">{p.name}</span>
                  <FormDialog trigger="Review" title={`Review ${p.name}`} method="POST" path="/review" fixed={{ productId: p.id }} submitLabel="Post review"
                    initial={{ rating: "5" }}
                    fields={[
                      { name: "rating", label: "Rating", type: "select", required: true, numeric: true, options: ["5", "4", "3", "2", "1"].map((v) => ({ value: v, label: `${v} stars` })) },
                      { name: "comment", label: "Your review", type: "textarea" },
                    ]} />
                </li>
              ))}
            </ul>
          ) : <Empty title="Nothing to review" icon={MessageSquare} />}
        </Panel>
      </div>
    </>
  );
}
