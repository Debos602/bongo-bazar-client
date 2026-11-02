import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog, type Field } from "@/components/dashboard/ApiForm";
import { Thumb } from "@/components/dashboard/shared";
import { Empty, LoadError, PageHeader, Panel, Table } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Category } from "@/types/dashboard";

const fields: Field[] = [
  { name: "name", label: "Name", required: true },
  { name: "slug", label: "URL name", required: true, placeholder: "home-decor" },
  { name: "Image", label: "Image link", type: "url", full: true, placeholder: "https://" },
];

export default async function AdminCategories() {
  const res = await apiGet<Category[]>("/category/basic");
  if (!res.data) return <LoadError message={res.message} />;

  return (
    <>
      <PageHeader title="Categories" description="Vendors file their products under these." action={<FormDialog trigger="New category" title="New category" variant="primary" method="POST" path="/category" fields={fields} submitLabel="Create category" />} />
      <Panel>
        {res.data.length ? (
          <Table head={["Category", "URL name", ""]}>
            {res.data.map((c) => (
              <tr key={c.id}>
                <td><span className="flex items-center gap-3"><Thumb src={c.Image} alt="" /><span className="font-medium text-slate-800">{c.name}</span></span></td>
                <td className="text-slate-500">{c.slug}</td>
                <td>
                  <span className="flex justify-end gap-1.5">
                    <FormDialog trigger="Edit" title={`Edit ${c.name}`} method="PATCH" path={`/category/${c.id}`} fields={fields} submitLabel="Save" initial={{ name: c.name, slug: c.slug, Image: c.Image ?? "" }} />
                    <ApiButton method="DELETE" path={`/category/${c.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        ) : <Empty title="No categories yet" />}
      </Panel>
    </>
  );
}
