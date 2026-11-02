import { ReviewList } from "@/components/dashboard/shared";
import { LoadError, PageHeader, Pagination } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Review } from "@/types/dashboard";

export default async function AdminReviews({ searchParams }: { searchParams: Promise<{ page?: string; }>; }) {
  const { page } = await searchParams;
  const res = await apiGet<Review[]>(`/review?limit=20&page=${page ?? 1}`);
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Reviews" description="Remove reviews that break the rules. The product rating updates itself." />
      <ReviewList reviews={res.data} canDelete />
      <Pagination basePath="/dashboard/admin/reviews" meta={res.meta} />
    </>
  );
}
