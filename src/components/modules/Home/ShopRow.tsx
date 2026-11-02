import Image from "next/image";
import Link from "next/link";
import Awning from "./Awning";

export type HomeShop = { id: number; shopName: string; slug: string; description?: string | null; logo?: string | null; _count: { products: number; }; };

const TONES = ["green", "marigold", "red", "teal"] as const;

export default function ShopRow({ shops }: { shops: HomeShop[]; }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
      {shops.map((shop, i) => (
        <li key={shop.id}>
          <Link href={`/shops/${shop.slug}`} className="group block">
            <Awning small tone={TONES[i % TONES.length]} />
            <div className="-mt-1.5 rounded-b-lg border border-t-0 border-slate-200 bg-white px-3 pb-3 pt-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-50 font-bold text-emerald-800">
                  {shop.logo
                    ? <Image src={shop.logo} alt="" fill sizes="40px" className="object-cover" />
                    : shop.shopName[0]?.toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-900 group-hover:underline">{shop.shopName}</span>
                  <span className="block text-xs text-slate-500">{shop._count.products} {shop._count.products === 1 ? "product" : "products"}</span>
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
