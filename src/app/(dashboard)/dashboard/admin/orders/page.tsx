import ApiButton from "@/components/dashboard/ApiButton";
import { Badge, Empty, LoadError, ORDER_TABS, PageHeader, Pagination, Panel, Tabs, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { CustomerOrder } from "@/types/dashboard";

const PATH = "/dashboard/admin/orders";
const NEXT: Record<string, string | undefined> = { PENDING: "PROCESSING", PROCESSING: "SHIPPED", SHIPPED: "DELIVERED" };

export default async function AdminOrders({ searchParams }: { searchParams: Promise<{ status?: string; page?: string; }>; }) {
  const { status, page } = await searchParams;
  const res = await apiGet<CustomerOrder[]>(`/order/admin/all?limit=15&page=${page ?? 1}${status ? `&status=${status}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Orders" description="Each order is split by vendor. Vendors normally move their own part; use these controls to step in." />
      <Tabs basePath={PATH} current={status} options={ORDER_TABS} />
      {res.data.length ? (
        <div className="space-y-3">
          {res.data.map((o) => (
            <Panel key={o.id}>
              <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
                <div className="text-sm">
                  <p className="font-semibold text-slate-900">Order #{o.id} <Badge status={o.status} /></p>
                  <p className="mt-1 text-slate-600">{o.user?.name} · {o.address.phone} · {o.address.area}, {o.address.city}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{shortDate(o.createdAt)} · {o.payment?.method.replaceAll("_", " ") ?? "No payment"} {o.payment && <>· {o.payment.status}</>}{o.couponCode && <> · Coupon {o.couponCode}</>}</p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-2 text-base font-bold tabular-nums text-slate-900">{money(o.total)}</span>
                  {NEXT[o.status] && <ApiButton method="PATCH" path={`/order/${o.id}/status`} body={{ status: NEXT[o.status] }}>Mark {NEXT[o.status]?.toLowerCase()}</ApiButton>}
                  {(o.status === "PENDING" || o.status === "PROCESSING") && <ApiButton method="PATCH" path={`/order/${o.id}/status`} body={{ status: "CANCELLED" }} variant="danger" confirm="Cancel order?">Cancel</ApiButton>}
                  {o.status === "CANCELLED" && <ApiButton method="DELETE" path={`/order/${o.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>}
                </div>
              </div>
              <ul className="divide-y divide-slate-100 border-t border-slate-100 text-sm">
                {o.vendorOrders.map((part) => (
                  <li key={part.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2.5">
                    <span className="font-medium text-slate-700">{part.vendor?.shopName} <Badge status={part.status} /></span>
                    <span className="text-xs tabular-nums text-slate-500">Customer pays {money(part.total)} · Commission {money(part.commissionAmount)} · Vendor gets {money(part.vendorEarning)}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      ) : <Panel><Empty title="No orders here" /></Panel>}
      <Pagination basePath={PATH} meta={res.meta} query={{ status }} />
    </>
  );
}
