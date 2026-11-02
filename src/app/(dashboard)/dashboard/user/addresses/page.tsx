import ApiButton from "@/components/dashboard/ApiButton";
import { FormDialog, type Field } from "@/components/dashboard/ApiForm";
import { Empty, LoadError, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Address } from "@/types/dashboard";

const fields: Field[] = [
  { name: "fullName", label: "Full name", required: true },
  { name: "phone", label: "Phone", required: true },
  { name: "city", label: "City", required: true },
  { name: "area", label: "Area", required: true },
  { name: "address", label: "Address", required: true, full: true },
  { name: "postalCode", label: "Postal code" },
];

export default async function Addresses() {
  const res = await apiGet<Address[]>("/address");
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Addresses" action={<FormDialog trigger="Add address" title="Add address" variant="primary" method="POST" path="/address" fields={fields} submitLabel="Save address" />} />
      {res.data.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {res.data.map((a) => (
            <Panel key={a.id} className="p-4 text-sm">
              <p className="font-medium text-slate-800">{a.fullName}</p>
              <p className="mt-1 text-slate-600">{a.address}, {a.area}, {a.city}{a.postalCode ? ` ${a.postalCode}` : ""}</p>
              <p className="text-slate-600">{a.phone}</p>
              <span className="mt-3 flex gap-1.5">
                <FormDialog trigger="Edit" title="Edit address" method="PUT" path={`/address/${a.id}`} fields={fields} submitLabel="Save"
                  initial={{ fullName: a.fullName, phone: a.phone, city: a.city, area: a.area, address: a.address, postalCode: a.postalCode ?? "" }} />
                <ApiButton method="DELETE" path={`/address/${a.id}`} variant="danger" confirm="Delete?">Delete</ApiButton>
              </span>
            </Panel>
          ))}
        </div>
      ) : <Panel><Empty title="No saved addresses" /></Panel>}
    </>
  );
}
