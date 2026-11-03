import { Ban, Check, Percent, Store, X } from "lucide-react";
import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog } from "@/components/dashboard/ApiForm";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, Tabs, shortDate } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Vendor } from "@/types/dashboard";

type Result = { data: Vendor[]; pagination: { page: number; limit: number; total: number; }; };
const PATH = "/dashboard/admin/vendors";

export default async function AdminVendors({ searchParams }: { searchParams: Promise<{ status?: string; page?: string; }>; }) {
  const { status, page } = await searchParams;
  const res = await apiGet<Result>(`/vendor/admin/all?limit=20&page=${page ?? 1}${status ? `&status=${status}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Vendors" description="Review seller applications. Approving one makes that user a vendor straight away." />
      <Tabs basePath={PATH} current={status} options={[
        { value: "", label: "All" }, { value: "PENDING", label: "Pending" }, { value: "APPROVED", label: "Approved" },
        { value: "SUSPENDED", label: "Suspended" }, { value: "REJECTED", label: "Rejected" },
      ]} />
      <Panel>
        {res.data.data.length ? (
          <Table head={["Shop", "Owner", "Products", "Commission", "Status", "Joined", ""]}>
            {res.data.data.map((v) => (
              <tr key={v.id}>
                <td className="max-w-72">
                  <span className="block font-medium text-slate-800">{v.shopName}</span>
                  {v.description && <span className="mt-0.5 block text-xs text-slate-600">{v.description}</span>}
                  {(v.phone || v.address) && <span className="mt-0.5 block text-xs text-slate-500">{[v.phone, v.address].filter(Boolean).join(", ")}</span>}
                  {v.rejectionReason && <span className="mt-0.5 block text-xs text-red-700">{v.rejectionReason}</span>}
                </td>
                <td><span className="block text-slate-700">{v.user?.name}</span><span className="block text-xs text-slate-500">{v.user?.email}</span></td>
                <td className="tabular-nums">{v._count?.products ?? 0}</td>
                <td className="tabular-nums">{v.commissionRate === null || v.commissionRate === undefined ? "Default" : `${v.commissionRate}%`}</td>
                <td><Badge status={v.status} /></td>
                <td className="whitespace-nowrap text-slate-500">{shortDate(v.createdAt)}</td>
                <td>
                  <span className="flex flex-wrap justify-end gap-1.5">
                    {v.status !== "APPROVED" && <ApiButton method="PATCH" path={`/vendor/${v.id}/status`} body={{ status: "APPROVED" }} variant="primary"><Check size={13} aria-hidden /> {v.status === "SUSPENDED" ? "Restore shop" : "Approve and make vendor"}</ApiButton>}
                    {v.status === "PENDING" && (
                      <FormDialog icon={<X size={13} aria-hidden />} trigger="Reject" title={`Reject ${v.shopName}`} variant="danger" method="PATCH" path={`/vendor/${v.id}/status`} fixed={{ status: "REJECTED" }} submitLabel="Reject application"
                        fields={[{ name: "reason", label: "Reason shown to the applicant", type: "textarea" }]} />
                    )}
                    {v.status === "APPROVED" && (
                      <FormDialog icon={<Ban size={13} aria-hidden />} trigger="Suspend" title={`Suspend ${v.shopName}`} variant="danger" method="PATCH" path={`/vendor/${v.id}/status`} fixed={{ status: "SUSPENDED" }} submitLabel="Suspend shop"
                        fields={[{ name: "reason", label: "Reason", type: "textarea" }]} />
                    )}
                    <FormDialog icon={<Percent size={13} aria-hidden />} trigger="Commission" title={`Commission for ${v.shopName}`} method="PATCH" path={`/vendor/${v.id}/commission`} submitLabel="Save"
                      initial={{ commissionRate: v.commissionRate?.toString() ?? "" }}
                      fields={[{ name: "commissionRate", label: "Commission %", type: "number", min: 0, max: 100, step: "0.1", help: "Leave empty to use the platform default" }]} />
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No vendors here" icon={Store} />}
        <Pagination basePath={PATH} meta={res.data.pagination} query={{ status }} />
      </Panel>
    </>
  );
}
