import { ReviewList } from "@/components/dashboard/shared";
import { LoadError, PageHeader } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Review } from "@/types/dashboard";

export default async function MyReviews() {
  const res = await apiGet<Review[]>("/review/mine");
  if (!res.data) return <LoadError message={res.message} />;
  return (<><PageHeader title="My reviews" description="Products waiting for your review are on your account overview." /><ReviewList reviews={res.data} canDelete /></>);
}
