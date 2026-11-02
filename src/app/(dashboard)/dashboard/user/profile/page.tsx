import { ApiForm } from "@/components/dashboard/ApiForm";
import { LoadError, PageHeader, Panel } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Me } from "@/types/dashboard";

export default async function Profile() {
  const res = await apiGet<Me>("/auth/me");
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Profile" description={res.data.email} />
      <div className="grid max-w-4xl gap-5 lg:grid-cols-2">
        <Panel title="Your details" className="[&>form]:p-5">
          <ApiForm method="PATCH" path="/user/update-my-profile" submitLabel="Save changes" initial={{ name: res.data.name, phone: res.data.phone }}
            fields={[{ name: "name", label: "Name", required: true, full: true }, { name: "phone", label: "Phone", required: true, full: true }]} />
        </Panel>
        <Panel title="Change password" className="[&>form]:p-5">
          <ApiForm method="POST" path="/auth/change-password" submitLabel="Change password" resetOnSuccess
            fields={[
              { name: "oldPassword", label: "Current password", type: "password", required: true, full: true },
              { name: "newPassword", label: "New password", type: "password", required: true, full: true },
            ]} />
        </Panel>
      </div>
    </>
  );
}
