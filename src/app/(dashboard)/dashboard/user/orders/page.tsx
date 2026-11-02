import Link from "next/link";
import ApiButton from "@/components/dashboard/ApiButton";
import { Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Panel, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { CustomerOrder } from "@/types/dashboard";

export default async function UserOrders({ searchParams }: { searchParams: Promise<{ payment?: string; }>; }) {
  const { payment } = await searchParams;
  const res = await apiGet<CustomerOrder[]>("/order");
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="My orders" description="An order with items from several shops may arrive in separate parcels." />
      {payment === "success" && <p role="status" className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm text-emerald-900">Thanks. Your card payment went through, and the order will show as paid shortly.</p>}
      {payment === "cancelled" && <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">Payment was not completed. You can try again below or switch to cash on delivery.</p>}
      {res.data.length ? (
        <div className="space-y-3">
          {res.data.map((o) => {
            const unpaidCard = o.payment?.method === "STRIPE" && o.payment.status === "PENDING" && o.status !== "CANCELLED";
            return (
              <Panel key={o.id}>
                <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">Order #{o.id} <Badge status={o.status} /></p>
                    <p className="mt-0.5 text-xs text-slate-500">{shortDate(o.createdAt)} · {o.payment?.method.replaceAll("_", " ")} · {o.payment?.status}</p>
                    <p className="mt-1 text-slate-600">Delivering to {o.address.fullName}, {o.address.area}, {o.address.city}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <span className="mr-2 text-right">
                      <span className="block text-base font-bold tabular-nums text-slate-900">{money(o.total)}</span>
                      {o.discount > 0 && <span className="block text-xs tabular-nums text-emerald-700">Saved {money(o.discount)}</span>}
                    </span>
                    {unpaidCard && (
                      <>
                        <ApiButton method="POST" path={`/payment/${o.id}`} body={{ method: "STRIPE" }} variant="primary">Pay by card</ApiButton>
                        <ApiButton method="POST" path={`/payment/${o.id}`} body={{ method: "CASH_ON_DELIVERY" }}>Switch to cash</ApiButton>
                      </>
                    )}
                    {o.vendorOrders.some((p) => p.status === "PENDING") && <ApiButton method="POST" path={`/order/${o.id}/cancel`} variant="danger" confirm="Cancel order?">Cancel</ApiButton>}
                  </div>
                </div>
                {o.vendorOrders.map((part) => (
                  <div key={part.id} className="border-t border-slate-100">
                    <p className="flex flex-wrap items-center gap-2 px-5 pt-3 text-xs font-medium text-slate-600">
                      {part.vendor && <Link href={`/shops/${part.vendor.slug}`} className="hover:underline">{part.vendor.shopName}</Link>}
                      <Badge status={part.status} />
                      {part.trackingNumber && <span className="font-normal text-slate-500">Tracking {part.trackingNumber}</span>}
                    </p>
                    <ul className="px-5 pb-3 pt-1 text-sm">
                      {o.items.filter((i) => i.vendorOrderId === part.id).map((i) => (
                        <li key={i.id} className="flex items-center gap-3 py-1.5">
                          <Thumb src={i.product.image} alt="" />
                          <Link href={`/products/${i.product.id}`} className="min-w-0 flex-1 truncate text-slate-800 hover:underline">{i.product.name}</Link>
                          <span className="tabular-nums text-slate-500">{i.quantity} × {money(i.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Panel>
            );
          })}
        </div>
      ) : <Panel><Empty title="You haven't ordered anything yet"><Link href="/products" className="font-medium text-emerald-800 hover:underline">Browse products</Link></Empty></Panel>}
    </>
  );
}
