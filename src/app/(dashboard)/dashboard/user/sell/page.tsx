import Link from "next/link";
import { ApiForm, type Field } from "@/components/dashboard/ApiForm";
import { Badge, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Me, Vendor } from "@/types/dashboard";

const fields: Field[] = [
  { name: "shopName", label: "Shop name", required: true, full: true },
  { name: "description", label: "What will you sell?", type: "textarea" },
  { name: "phone", label: "Business phone" },
  { name: "address", label: "Business address" },
];

export default async function Sell() {
  const [me, application] = await Promise.all([apiGet<Me>("/auth/me"), apiGet<Vendor>("/vendor/profile/me")]);
  const v = application.data;

  if (me.data?.role === "VENDOR") {
    return (<><PageHeader title="Your shop is open" /><Link href="/dashboard/vendor" className="font-medium text-emerald-800 hover:underline">Go to your shop dashboard</Link></>);
  }
  if (me.data?.role === "ADMIN" || me.data?.role === "SUPER_ADMIN") {
    return <PageHeader title="Admin accounts can't open a shop" />;
  }
  if (v && v.status !== "REJECTED") {
    return (
      <>
        <PageHeader title="Your application" />
        <Panel className="max-w-xl p-5 text-sm">
          <p className="font-medium text-slate-800">{v.shopName} <Badge status={v.status} /></p>
          <p className="mt-2 text-slate-600">
            {v.status === "PENDING" ? "We are reviewing your application. Your shop dashboard appears here once it is approved." : v.rejectionReason ?? "Contact the marketplace team for details."}
          </p>
        </Panel>
      </>
    );
  }
  return (
    <>
      <PageHeader title="Sell on Bongo Bazar" description="Tell us about your shop. Once an admin approves it, you can add products." />
      {v?.status === "REJECTED" && (
        <p role="alert" className="mb-4 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-800">
          Your last application was not approved{v.rejectionReason ? `: ${v.rejectionReason}` : "."} You can apply again.
        </p>
      )}
      <Panel className="max-w-2xl p-5">
        <ApiForm method="POST" path="/vendor" fields={fields} submitLabel="Submit application" initial={v ? { shopName: v.shopName, description: v.description ?? "", phone: v.phone ?? "", address: v.address ?? "" } : undefined} />
      </Panel>
    </>
  );
}
