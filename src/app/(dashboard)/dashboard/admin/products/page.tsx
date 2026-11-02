import ApiButton from "@/components/dashboard/ApiButton";
import { Stars, Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, money } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { ManagedProduct } from "@/types/dashboard";

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; }>; }) {
  const { page, q } = await searchParams;
  const res = await apiGet<ManagedProduct[]>(`/product/admin/all?limit=20&page=${page ?? 1}${q ? `&searchTerm=${encodeURIComponent(q)}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Products" description="Every product from every shop. Block what breaks the rules and feature the best." />
      <form className="mb-4">
        <input type="search" name="q" defaultValue={q} aria-label="Search products" placeholder="Search products" className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
      </form>
      <Panel>
        {res.data.length ? (
          <Table head={["Product", "Shop", "Price", "Stock", "Rating", "Status", ""]}>
            {res.data.map((p) => (
              <tr key={p.id}>
                <td><span className="flex items-center gap-3"><Thumb src={p.image} alt="" /><span className="max-w-56 truncate font-medium text-slate-800">{p.name}</span></span></td>
                <td>{p.vendor?.shopName}</td>
                <td className="tabular-nums">{money(p.price)}</td>
                <td className="tabular-nums">{p.stock}</td>
                <td><Stars value={p.rating} /></td>
                <td><Badge status={p.isBlocked ? "BLOCKED" : p.isPublished ? "PUBLISHED" : "DRAFT"} /></td>
                <td>
                  <span className="flex justify-end gap-1.5">
                    <ApiButton method="PATCH" path={`/product/${p.id}/moderate`} body={{ isFeatured: !p.isFeatured }}>{p.isFeatured ? "Unfeature" : "Feature"}</ApiButton>
                    <ApiButton method="PATCH" path={`/product/${p.id}/moderate`} body={{ isBlocked: !p.isBlocked }} variant={p.isBlocked ? "ghost" : "danger"}>{p.isBlocked ? "Unblock" : "Block"}</ApiButton>
                    <ApiButton method="DELETE" path={`/product/${p.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No products found" />}
        <Pagination basePath="/dashboard/admin/products" meta={res.meta} query={{ q }} />
      </Panel>
    </>
  );
}
