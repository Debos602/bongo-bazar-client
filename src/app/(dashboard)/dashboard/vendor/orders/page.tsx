import { CheckCircle2, PackageOpen, ShoppingBag, Truck, X } from "lucide-react";
import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog } from "@/components/dashboard/ApiForm";
import { Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, ORDER_TABS, PageHeader, Pagination, Panel, Tabs, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { VendorSideOrder } from "@/types/dashboard";

const PATH = "/dashboard/vendor/orders";

export default async function VendorOrders({ searchParams }: { searchParams: Promise<{ status?: string; page?: string; }>; }) {
  const { status, page } = await searchParams;
  const res = await apiGet<VendorSideOrder[]>(`/order/vendor?limit=15&page=${page ?? 1}${status ? `&status=${status}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Orders" description="You see only the items from your shop." />
      <Tabs basePath={PATH} current={status} options={ORDER_TABS} />
      {res.data.length ? (
        <div className="space-y-3">
          {res.data.map((o) => {
            const payment = o.order.payment;
            const awaitingCard = payment?.method === "STRIPE" && payment.status !== "PAID";
            const url = `/order/vendor/${o.id}/status`;
            return (
              <Panel key={o.id}>
                <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">Order #{o.orderId} <Badge status={o.status} /></p>
                    <p className="mt-1 text-slate-600">{o.order.address.fullName} · {o.order.address.phone}</p>
                    <p className="text-slate-600">{o.order.address.address}, {o.order.address.area}, {o.order.address.city}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {shortDate(o.createdAt)} · {payment?.method.replaceAll("_", " ")} · {payment?.status}
                      {o.trackingNumber && <> · Tracking {o.trackingNumber}</>}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    {awaitingCard && o.status !== "CANCELLED" && <span className="text-xs font-medium text-amber-700">Waiting for card payment</span>}
                    {o.status === "PENDING" && !awaitingCard && <ApiButton method="PATCH" path={url} body={{ status: "PROCESSING" }} variant="primary"><PackageOpen size={13} aria-hidden /> Start processing</ApiButton>}
                    {o.status === "PROCESSING" && (
                      <FormDialog icon={<Truck size={13} aria-hidden />} trigger="Mark shipped" title={`Ship order #${o.orderId}`} variant="primary" method="PATCH" path={url} fixed={{ status: "SHIPPED" }} submitLabel="Mark shipped"
                        fields={[{ name: "trackingNumber", label: "Tracking number" }]} />
                    )}
                    {o.status === "SHIPPED" && <ApiButton method="PATCH" path={url} body={{ status: "DELIVERED" }} variant="primary"><CheckCircle2 size={13} aria-hidden /> Mark delivered</ApiButton>}
                    {(o.status === "PENDING" || o.status === "PROCESSING") && <ApiButton method="PATCH" path={url} body={{ status: "CANCELLED" }} variant="danger" confirm="Cancel order?"><X size={13} aria-hidden /> Cancel</ApiButton>}
                  </div>
                </div>
                <ul className="divide-y divide-slate-100 border-t border-slate-100 text-sm">
                  {o.items.map((i) => (
                    <li key={i.id} className="flex items-center gap-3 px-5 py-2.5">
                      <Thumb src={i.product.image} alt="" />
                      <span className="min-w-0 flex-1 truncate text-slate-800">{i.product.name}</span>
                      <span className="tabular-nums text-slate-500">{i.quantity} × {money(i.price)}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-slate-100 px-5 py-2.5 text-right text-xs tabular-nums text-slate-500">
                  Subtotal {money(o.subtotal)}{o.vendorDiscount > 0 && <> · Your coupon −{money(o.vendorDiscount)}</>} · Commission ({o.commissionRate}%) −{money(o.commissionAmount)} · <span className="font-semibold text-slate-800">You get {money(o.vendorEarning)}</span>
                </p>
              </Panel>
            );
          })}
        </div>
      ) : <Panel><Empty title="No orders here" icon={ShoppingBag} /></Panel>}
      <Pagination basePath={PATH} meta={res.meta} query={{ status }} />
    </>
  );
}
