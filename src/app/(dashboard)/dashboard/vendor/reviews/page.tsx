import { ReviewList } from "@/components/dashboard/shared";
import { LoadError, PageHeader } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Review } from "@/types/dashboard";

export default async function VendorReviews() {
  const res = await apiGet<Review[]>("/review/vendor");
  if (!res.data) return <LoadError message={res.message} />;
  return (<><PageHeader title="Reviews" description="What customers say about your products." /><ReviewList reviews={res.data} /></>);
}
