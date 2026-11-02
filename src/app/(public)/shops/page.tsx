import Link from "next/link";
import { Thumb } from "@/components/dashboard/shared";

type Shop = { id: number; shopName: string; slug: string; description?: string | null; logo?: string | null; _count: { products: number; }; };

export const metadata = { title: "Shops | Bongo Bazar" };

export default async function Shops() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/vendor?limit=60`, { next: { revalidate: 60 } }).catch(() => null);
  const shops: Shop[] = (await res?.json().catch(() => null))?.data?.data ?? [];
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Shops</h1>
      {shops.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((s) => (
            <li key={s.id}>
              <Link href={`/shops/${s.slug}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
                <Thumb src={s.logo} alt="" />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-slate-900">{s.shopName}</span>
                  <span className="block text-xs text-slate-500">{s._count.products} products</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : <p className="mt-6 text-sm text-slate-500">No shops yet.</p>}
    </div>
  );
}
