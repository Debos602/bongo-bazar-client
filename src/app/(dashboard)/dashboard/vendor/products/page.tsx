import { Eye, EyeOff, Package, Pencil, Plus } from "lucide-react";
import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog } from "@/components/dashboard/ApiForm";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import { productFields, productInitial } from "@/components/dashboard/productFields";
import { Stars, Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, money } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category, ManagedProduct } from "@/types/dashboard";

export default async function VendorProducts({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; }>; }) {
  const { page, q } = await searchParams;
  const [res, categories] = await Promise.all([
    apiGet<ManagedProduct[]>(`/product/mine?limit=20&page=${page ?? 1}${q ? `&searchTerm=${encodeURIComponent(q)}` : ""}`),
    apiGet<Category[]>("/category/basic"),
  ]);
  if (!res.data) return <LoadError message={res.message} />;
  const addProduct = (
    <FormDialog
      wide trigger="Add product" title="Add product" variant="primary" icon={<Plus size={15} aria-hidden />}
      method="POST" path="/product" multipart submitLabel="Save product" resetOnSuccess
      fields={productFields(categories.data ?? [], true)} initial={{ isPublished: true }}
    />
  );

  return (
    <>
      <PageHeader title="Products" action={addProduct} />
      <form className="mb-4">
        <input type="search" name="q" defaultValue={q} aria-label="Search your products" placeholder="Search your products" className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
      </form>
      <Panel>
        {res.data.length ? (
          <Table head={["Product", "Price", "Stock", "Rating", "Status", ""]}>
            {res.data.map((p) => (
              <tr key={p.id}>
                <td><span className="flex items-center gap-3"><Thumb src={p.image} alt="" /><span className="max-w-64 truncate font-medium text-slate-800">{p.name}</span></span></td>
                <td className="whitespace-nowrap tabular-nums">{money(p.price)}</td>
                <td className={p.stock <= 5 ? "font-medium tabular-nums text-amber-700" : "tabular-nums"}>{p.stock}</td>
                <td><Stars value={p.rating} /></td>
                <td><Badge status={p.isBlocked ? "BLOCKED" : p.isPublished ? "PUBLISHED" : "DRAFT"} /></td>
                <td>
                  <span className="flex flex-wrap justify-end gap-1.5">
                    <FormDialog
                      wide trigger="Edit" title={`Edit ${p.name}`} icon={<Pencil size={13} aria-hidden />}
                      method="PUT" path={`/product/${p.id}`} multipart submitLabel="Save changes"
                      fields={productFields(categories.data ?? [], false)} initial={productInitial(p)}
                    />
                    {!p.isBlocked && <ApiButton method="PUT" path={`/product/${p.id}`} body={{ isPublished: !p.isPublished }}>{p.isPublished ? <EyeOff size={13} aria-hidden /> : <Eye size={13} aria-hidden />} {p.isPublished ? "Unpublish" : "Publish"}</ApiButton>}
                    <ConfirmDelete path={`/product/${p.id}`} title={`Delete ${p.name}?`} message="If it has past orders, it is hidden from the store instead, so order history stays correct." />
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="You have no products yet" icon={Package}><span className="mt-1 inline-block">{addProduct}</span></Empty>}
        <Pagination basePath="/dashboard/vendor/products" meta={res.meta} query={{ q }} />
      </Panel>
    </>
  );
}
