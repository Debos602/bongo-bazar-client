import Link from "next/link";
import { notFound } from "next/navigation";
import { Thumb } from "@/components/dashboard/shared";

const API = process.env.NEXT_PUBLIC_BASE_API;
type Product = { id: number; name: string; price: number; image: string; rating: number; };

export default async function ShopPage({ params }: { params: Promise<{ slug: string; }>; }) {
  const { slug } = await params;
  const shopRes = await fetch(`${API}/vendor/shop/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } }).catch(() => null);
  if (!shopRes?.ok) notFound();
  const shop = (await shopRes.json()).data;
  const productRes = await fetch(`${API}/product?vendorId=${shop.id}&limit=60`, { next: { revalidate: 60 } }).catch(() => null);
  const products: Product[] = (await productRes?.json().catch(() => null))?.data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3">
        <Thumb src={shop.logo} alt="" />
        <h1 className="text-2xl font-bold text-slate-900">{shop.shopName}</h1>
      </div>
      {shop.description && <p className="mt-3 max-w-2xl text-slate-600">{shop.description}</p>}
      {products.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Link href={`/products/${p.id}`} className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="aspect-square w-full bg-slate-100 object-cover" loading="lazy" />
                <span className="block p-3">
                  <span className="line-clamp-2 text-sm font-medium text-slate-800">{p.name}</span>
                  <span className="mt-1 block font-bold tabular-nums text-emerald-800">৳ {p.price.toLocaleString()}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p className="mt-8 text-sm text-slate-500">This shop has no products yet.</p>}
    </div>
  );
}
