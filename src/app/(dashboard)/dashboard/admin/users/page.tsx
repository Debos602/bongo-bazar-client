import Link from "next/link";
import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog } from "@/components/dashboard/ApiForm";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, Tabs, shortDate } from "@/components/dashboard/ui";
import { apiFetch, apiGet } from "@/lib/serverApi";
import type { AppUser, Me } from "@/types/dashboard";

const PATH = "/dashboard/admin/users";

export default async function AdminUsers({ searchParams }: { searchParams: Promise<{ status?: string; page?: string; q?: string; }>; }) {
  const { status: role, page, q } = await searchParams;
  const [res, me] = await Promise.all([
    apiGet<AppUser[]>(`/user?limit=20&page=${page ?? 1}${role ? `&role=${role}` : ""}${q ? `&searchTerm=${encodeURIComponent(q)}` : ""}`),
    apiFetch<Me>("/auth/me"),
  ]);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader
        title="Users"
        description="Block or restore accounts. A blocked account loses access immediately."
        action={
          <FormDialog trigger="New admin" title="New admin account" variant="primary" method="POST" path="/user/create-admin" submitLabel="Create admin" resetOnSuccess
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "password", label: "Password", type: "password", required: true, help: "8+ characters with upper case, lower case and a number" },
              { name: "contactNumber", label: "Phone" },
            ]} />
        }
      />
      <Tabs basePath={PATH} current={role} options={[{ value: "", label: "All" }, { value: "USER", label: "Customers" }, { value: "VENDOR", label: "Vendors" }, { value: "ADMIN", label: "Admins" }]} />
      <Panel>
        {res.data.length ? (
          <Table head={["Name", "Phone", "Role", "Seller application", "Status", "Joined", ""]}>
            {res.data.map((u) => (
              <tr key={u.id}>
                <td><span className="block font-medium text-slate-800">{u.name}</span><span className="block text-xs text-slate-500">{u.email}</span></td>
                <td>{u.phone}</td>
                <td>{u.role.replace("_", " ")}</td>
                <td>
                  {u.vendor ? (
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Link href={`/dashboard/admin/vendors?status=${u.vendor.status}`} className="text-slate-700 hover:underline">{u.vendor.shopName}</Link>
                      <Badge status={u.vendor.status} />
                      {u.vendor.status === "PENDING" && (
                        <>
                          <ApiButton method="PATCH" path={`/vendor/${u.vendor.id}/status`} body={{ status: "APPROVED" }} variant="primary">Make vendor</ApiButton>
                          <FormDialog trigger="Reject" title={`Reject ${u.vendor.shopName}`} variant="danger" method="PATCH" path={`/vendor/${u.vendor.id}/status`} fixed={{ status: "REJECTED" }} submitLabel="Reject application"
                            fields={[{ name: "reason", label: "Reason shown to the applicant", type: "textarea" }]} />
                        </>
                      )}
                    </span>
                  ) : <span className="text-slate-400">None</span>}
                </td>
                <td><Badge status={u.status} /></td>
                <td className="whitespace-nowrap text-slate-500">{shortDate(u.createdAt)}</td>
                <td className="text-right">
                  {u.id !== me.data?.id && u.role !== "SUPER_ADMIN" && (u.status === "ACTIVE"
                    ? <ApiButton method="PATCH" path={`/user/${u.id}/status`} body={{ status: "BLOCK" }} variant="danger" confirm="Block?">Block</ApiButton>
                    : <ApiButton method="PATCH" path={`/user/${u.id}/status`} body={{ status: "ACTIVE" }}>Restore</ApiButton>)}
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No users found" />}
        <Pagination basePath={PATH} meta={res.meta} query={{ status: role, q }} />
      </Panel>
    </>
  );
}
