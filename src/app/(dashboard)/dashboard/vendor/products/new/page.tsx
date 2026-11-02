import { ApiForm } from "@/components/dashboard/ApiForm";
import { productFields } from "@/components/dashboard/productFields";
import { PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category } from "@/types/dashboard";

export default async function NewProduct() {
  const categories = await apiGet<Category[]>("/category/basic");
  return (
    <>
      <PageHeader title="Add product" />
      <Panel className="max-w-3xl p-5">
        <ApiForm method="POST" path="/product" multipart fields={productFields(categories.data ?? [], true)} initial={{ isPublished: true }} submitLabel="Add product" redirectTo="/dashboard/vendor/products" />
      </Panel>
    </>
  );
}
