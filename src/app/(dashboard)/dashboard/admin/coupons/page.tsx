import { CouponManager } from "@/components/dashboard/shared";
import { LoadError, PageHeader } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Coupon } from "@/types/dashboard";

export default async function AdminCoupons() {
  const res = await apiGet<Coupon[]>("/coupon");
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Coupons" />
      <CouponManager coupons={res.data} scopeNote="Coupons you create apply to every shop, and the platform pays the discount." />
    </>
  );
}
