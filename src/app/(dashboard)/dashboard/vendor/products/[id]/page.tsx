import { ApiForm } from "@/components/dashboard/ApiForm";
import { productFields } from "@/components/dashboard/productFields";
import { LoadError, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category, ManagedProduct } from "@/types/dashboard";

export default async function EditProduct({ params }: { params: Promise<{ id: string; }>; }) {
  const { id } = await params;
  const [res, categories] = await Promise.all([apiGet<ManagedProduct>(`/product/manage/${Number(id)}`), apiGet<Category[]>("/category/basic")]);
  if (!res.data) return <LoadError message={res.message} />;
  const p = res.data;

  return (
    <>
      <PageHeader title={`Edit ${p.name}`} />
      {p.isBlocked && <p role="alert" className="mb-4 max-w-3xl rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-800">An admin has blocked this product, so customers cannot see it.</p>}
      <Panel className="max-w-3xl p-5">
        <ApiForm
          method="PUT" path={`/product/${p.id}`} multipart submitLabel="Save changes" redirectTo="/dashboard/vendor/products"
          fields={productFields(categories.data ?? [], false)}
          initial={{
            name: p.name, description: p.description ?? "", price: String(p.price), oldPrice: p.oldPrice?.toString() ?? "", discount: p.discount?.toString() ?? "",
            stock: String(p.stock), sku: p.sku ?? "", badgeType: p.badgeType ?? "", tags: p.tags.join(", "), imageUrl: p.image, isPublished: p.isPublished,
            categories: p.categories.map((c) => String(c.category.id)),
          }}
        />
      </Panel>
    </>
  );
}
