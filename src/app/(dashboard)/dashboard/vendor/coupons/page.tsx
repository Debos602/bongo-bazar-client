import { CouponManager } from "@/components/dashboard/shared";
import { LoadError, PageHeader } from "@/components/dashboard/ui";
import { apiGet } from "@/lib/serverApi";
import type { Coupon } from "@/types/dashboard";

export default async function VendorCoupons() {
  const res = await apiGet<Coupon[]>("/coupon");
  if (!res.data) return <LoadError message={res.message} />;
  return (
    <>
      <PageHeader title="Coupons" />
      <CouponManager coupons={res.data} scopeNote="Your coupons apply only to your products, and the discount comes out of your earnings." />
    </>
  );
}
