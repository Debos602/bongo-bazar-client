import { FormDialog } from "@/components/dashboard/ApiForm";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, Tabs, money, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Payout } from "@/types/dashboard";

const PATH = "/dashboard/admin/payouts";

export default async function AdminPayouts({ searchParams }: { searchParams: Promise<{ status?: string; page?: string; }>; }) {
  const { status, page } = await searchParams;
  const res = await apiGet<Payout[]>(`/payout?page=${page ?? 1}${status ? `&status=${status}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Payouts" description="Send the money to the vendor first, then record it here." />
      <Tabs basePath={PATH} current={status} options={[{ value: "", label: "All" }, { value: "PENDING", label: "Pending" }, { value: "PAID", label: "Paid" }, { value: "REJECTED", label: "Rejected" }]} />
      <Panel>
        {res.data.length ? (
          <Table head={["Shop", "Amount", "Send to", "Status", "Requested", ""]}>
            {res.data.map((p) => (
              <tr key={p.id}>
                <td className="font-medium text-slate-800">{p.vendor?.shopName}</td>
                <td className="font-semibold tabular-nums">{money(p.amount)}</td>
                <td><span className="block">{p.method}</span><span className="block text-xs text-slate-500">{p.accountDetails}</span></td>
                <td><Badge status={p.status} />{p.transactionRef && <span className="mt-0.5 block text-xs text-slate-500">Ref {p.transactionRef}</span>}</td>
                <td className="whitespace-nowrap text-slate-500">{shortDate(p.createdAt)}</td>
                <td>
                  {p.status === "PENDING" && (
                    <span className="flex justify-end gap-1.5">
                      <FormDialog trigger="Mark paid" title={`Record payout of ${money(p.amount)}`} variant="primary" method="PATCH" path={`/payout/${p.id}`} fixed={{ status: "PAID" }} submitLabel="Record as paid"
                        fields={[{ name: "transactionRef", label: "Transaction reference", required: true }, { name: "note", label: "Note", type: "textarea" }]} />
                      <FormDialog trigger="Reject" title="Reject payout" variant="danger" method="PATCH" path={`/payout/${p.id}`} fixed={{ status: "REJECTED" }} submitLabel="Reject"
                        fields={[{ name: "note", label: "Reason shown to the vendor", type: "textarea" }]} />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No payouts here" />}
        <Pagination basePath={PATH} meta={res.meta} query={{ status }} />
      </Panel>
    </>
  );
}
