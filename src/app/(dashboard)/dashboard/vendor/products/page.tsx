import Link from "next/link";
import ApiButton from "@/components/dashboard/ApiButton";
import { Stars, Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, money } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { ManagedProduct } from "@/types/dashboard";

export default async function VendorProducts({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; }>; }) {
  const { page, q } = await searchParams;
  const res = await apiGet<ManagedProduct[]>(`/product/mine?limit=20&page=${page ?? 1}${q ? `&searchTerm=${encodeURIComponent(q)}` : ""}`);
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Products" action={<Link href="/dashboard/vendor/products/new" className="rounded-md bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900">Add product</Link>} />
      <form className="mb-4">
        <input type="search" name="q" defaultValue={q} aria-label="Search your products" placeholder="Search your products" className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
      </form>
      <Panel>
        {res.data.length ? (
          <Table head={["Product", "Price", "Stock", "Rating", "Status", ""]}>
            {res.data.map((p) => (
              <tr key={p.id}>
                <td><span className="flex items-center gap-3"><Thumb src={p.image} alt="" /><span className="max-w-64 truncate font-medium text-slate-800">{p.name}</span></span></td>
                <td className="tabular-nums">{money(p.price)}</td>
                <td className={p.stock <= 5 ? "font-medium tabular-nums text-amber-700" : "tabular-nums"}>{p.stock}</td>
                <td><Stars value={p.rating} /></td>
                <td><Badge status={p.isBlocked ? "BLOCKED" : p.isPublished ? "PUBLISHED" : "DRAFT"} /></td>
                <td>
                  <span className="flex justify-end gap-1.5">
                    <Link href={`/dashboard/vendor/products/${p.id}`} className="rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">Edit</Link>
                    <ApiButton method="DELETE" path={`/product/${p.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="You have no products yet"><Link href="/dashboard/vendor/products/new" className="font-medium text-emerald-800 hover:underline">Add your first product</Link></Empty>}
        <Pagination basePath="/dashboard/vendor/products" meta={res.meta} query={{ q }} />
      </Panel>
    </>
  );
}
