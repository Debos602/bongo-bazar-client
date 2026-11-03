import { ApiForm } from "@/components/dashboard/ApiForm";
import { productFields, shopField } from "@/components/dashboard/productFields";
import { Empty, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category, Vendor } from "@/types/dashboard";

export default async function AdminNewProduct() {
  const [categories, shops] = await Promise.all([
    apiGet<Category[]>("/category/basic"),
    apiGet<{ data: Vendor[]; }>("/vendor/admin/all?status=APPROVED&limit=100"),
  ]);
  const shopList = shops.data?.data ?? [];

  return (
    <>
      <PageHeader title="Add product" description="Add a product to any approved shop." />
      <Panel className="max-w-3xl p-5">
        {shopList.length ? (
          <ApiForm
            method="POST" path="/product" multipart submitLabel="Add product" redirectTo="/dashboard/admin/products"
            fields={[shopField(shopList), ...productFields(categories.data ?? [], true)]}
            initial={{ isPublished: true }}
          />
        ) : <Empty title="There are no approved shops yet">Approve a vendor first, then add products to their shop.</Empty>}
      </Panel>
    </>
  );
}
