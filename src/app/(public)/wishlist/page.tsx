import WishlistItems from "@/components/wishlist/WishlistItems";

export const metadata = { title: "Wishlist | Bongo Bazar" };

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <h1 className="mb-5 text-2xl font-bold tracking-tight text-slate-900">Wishlist</h1>
      <WishlistItems />
    </div>
  );
}
