import { ApiForm } from "@/components/dashboard/ApiForm";
import { LoadError, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Vendor } from "@/types/dashboard";

export default async function ShopSettings() {
  const res = await apiGet<Vendor>("/vendor/profile/me");
  if (!res.data) return <LoadError message={res.message} />;
  const v = res.data;
  return (
    <>
      <PageHeader title="Shop settings" description="This is what customers see on your shop page." />
      <Panel className="max-w-3xl p-5">
        <ApiForm method="PATCH" path="/vendor/profile/me" submitLabel="Save changes"
          initial={{ shopName: v.shopName, description: v.description ?? "", logo: v.logo ?? "", banner: v.banner ?? "", phone: v.phone ?? "", address: v.address ?? "" }}
          fields={[
            { name: "shopName", label: "Shop name", required: true, full: true },
            { name: "description", label: "About your shop", type: "textarea" },
            { name: "logo", label: "Logo link", type: "url", placeholder: "https://" },
            { name: "banner", label: "Banner link", type: "url", placeholder: "https://" },
            { name: "phone", label: "Phone" },
            { name: "address", label: "Address" },
          ]} />
      </Panel>
    </>
  );
}
