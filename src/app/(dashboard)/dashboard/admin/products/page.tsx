import { Ban, Check, Eye, EyeOff, Package, Pencil, Plus, Star } from "lucide-react";
import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog } from "@/components/dashboard/ApiForm";
import ConfirmDelete from "@/components/dashboard/ConfirmDelete";
import { productFields, productInitial, shopField } from "@/components/dashboard/productFields";
import { Stars, Thumb } from "@/components/dashboard/shared";
import { Badge, Empty, LoadError, PageHeader, Pagination, Panel, Table, money } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category, ManagedProduct, Vendor } from "@/types/dashboard";

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; }>; }) {
  const { page, q } = await searchParams;
  const [res, categories, shops] = await Promise.all([
    apiGet<ManagedProduct[]>(`/product/admin/all?limit=20&page=${page ?? 1}${q ? `&searchTerm=${encodeURIComponent(q)}` : ""}`),
    apiGet<Category[]>("/category/basic"),
    apiGet<{ data: Vendor[]; }>("/vendor/admin/all?status=APPROVED&limit=100"),
  ]);
  if (!res.data) return <LoadError message={res.message} />;
  const shopList = shops.data?.data ?? [];
  const fields = (imageRequired: boolean) => productFields(categories.data ?? [], imageRequired);

  return (
    <>
      <PageHeader title="Products" description="Every product from every shop. Block what breaks the rules and feature the best."
        action={shopList.length ? (
          <FormDialog
            wide trigger="Add product" title="Add product" description="Add a product to any approved shop." variant="primary" icon={<Plus size={15} aria-hidden />}
            method="POST" path="/product" multipart submitLabel="Save product" resetOnSuccess
            fields={[shopField(shopList), ...fields(true)]} initial={{ isPublished: true }}
          />
        ) : undefined}
      />
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
                <td className="whitespace-nowrap tabular-nums">{money(p.price)}</td>
                <td className="tabular-nums">{p.stock}</td>
                <td><Stars value={p.rating} /></td>
                <td><Badge status={p.isBlocked ? "BLOCKED" : p.isPublished ? "PUBLISHED" : "DRAFT"} /></td>
                <td>
                  <span className="flex flex-wrap justify-end gap-1.5">
                    <FormDialog
                      wide trigger="Edit" title={`Edit ${p.name}`} description={p.vendor ? `Sold by ${p.vendor.shopName}` : undefined} icon={<Pencil size={13} aria-hidden />}
                      method="PUT" path={`/product/${p.id}`} multipart submitLabel="Save changes"
                      fields={fields(false)} initial={productInitial(p)}
                    />
                    <ApiButton method="PUT" path={`/product/${p.id}`} body={{ isPublished: !p.isPublished }}>{p.isPublished ? <EyeOff size={13} aria-hidden /> : <Eye size={13} aria-hidden />} {p.isPublished ? "Unpublish" : "Publish"}</ApiButton>
                    <ApiButton method="PATCH" path={`/product/${p.id}/moderate`} body={{ isFeatured: !p.isFeatured }}><Star size={13} aria-hidden /> {p.isFeatured ? "Unfeature" : "Feature"}</ApiButton>
                    <ApiButton method="PATCH" path={`/product/${p.id}/moderate`} body={{ isBlocked: !p.isBlocked }} variant={p.isBlocked ? "ghost" : "danger"}>{p.isBlocked ? <Check size={13} aria-hidden /> : <Ban size={13} aria-hidden />} {p.isBlocked ? "Unblock" : "Block"}</ApiButton>
                    <ConfirmDelete path={`/product/${p.id}`} title={`Delete ${p.name}?`} message="If it has past orders, it is hidden from the store instead, so order history stays correct." />
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No products found" icon={Package} />}
        <Pagination basePath="/dashboard/admin/products" meta={res.meta} query={{ q }} />
      </Panel>
    </>
  );
}
