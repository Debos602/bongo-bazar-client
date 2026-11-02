import { PageHeader } from "@/components/dashboard/ui";
import WishlistItems from "@/components/wishlist/WishlistItems";

export default function Wishlist() {
  return (
    <>
      <PageHeader title="Wishlist" />
      <WishlistItems />
    </>
  );
}
