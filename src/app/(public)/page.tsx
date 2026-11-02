import Link from "next/link";
import { Suspense } from "react";
import { getCategoryBasic } from "@/actions/category";
import Awning from "@/components/modules/Home/Awning";
import CategoryBentoGrid from "@/components/modules/Home/CategoryBentoGrid";
import Hero from "@/components/modules/Home/Hero";
import SectionHeader from "@/components/modules/Home/SectionHeader";
import ShopRow, { type HomeShop } from "@/components/modules/Home/ShopRow";
import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import ProductCard from "@/components/modules/Products/ProductCard";
import { Category, Product } from "@/types";

const API = process.env.NEXT_PUBLIC_BASE_API;

const SELLER_STEPS = [
  { title: "Apply", text: "Tell us about your shop. An admin reviews every application." },
  { title: "List your products", text: "Add photos, prices and stock from your shop dashboard." },
  { title: "Get paid", text: "Earn on every delivered order and withdraw to bKash, Nagad or your bank." },
];

const discountOf = (p: Product): number => {
  if (typeof p.oldPrice === "number" && typeof p.price === "number" && p.oldPrice > p.price) {
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }
  return typeof p.discount === "number" ? p.discount : 0;
};

const getJson = async <T,>(path: string, pick: (json: { data?: unknown; }) => unknown): Promise<T | null> => {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60, tags: ["PRODUCTS"] } });
    if (!res.ok) return null;
    return (pick(await res.json()) as T) ?? null;
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
};

const productGrid = "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

export default async function HomePage() {
  const [latest, topRated, shops, categoryData] = await Promise.all([
    getJson<Product[]>("/product?limit=60", (j) => j.data),
    getJson<Product[]>("/product?limit=5&sortBy=rating", (j) => j.data),
    getJson<HomeShop[]>("/vendor?limit=8", (j) => (j.data as { data?: HomeShop[]; })?.data),
    getCategoryBasic().catch(() => []),
  ]);

  const products = latest ?? [];
  const categories: Category[] = Array.isArray(categoryData) ? categoryData : [];
  const deals = products
    .filter((p) => discountOf(p) > 0)
    .sort((a, b) => discountOf(b) - discountOf(a))
    .slice(0, 5);
  const rated = (topRated ?? []).filter((p) => (p.rating ?? 0) > 0);

  return (
    <div className="min-h-screen bg-[#eef3f0]">
      <Hero categories={categories} />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:space-y-16 sm:py-14">
        {categories.length > 0 && (
          <section>
            <SectionHeader title="Shop by category" ctaLabel="All products" ctaHref="/products" className="!px-0" />
            <CategoryBentoGrid categories={categories} />
          </section>
        )}

        {!!shops?.length && (
          <section>
            <SectionHeader title="Shops at the bazar" subtitle="Each shop packs and ships its own orders." ctaLabel="All shops" ctaHref="/shops" className="!px-0" />
            <ShopRow shops={shops} />
          </section>
        )}

        {deals.length > 0 && (
          <section className="-mx-4 bg-[#fbbf24] px-4 py-8 sm:mx-0 sm:rounded-lg sm:px-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 text-[#022c22]">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Hot deals</h2>
                <p className="mt-1 text-sm">Up to {discountOf(deals[0])}% off right now.</p>
              </div>
              <Link href="/hot-deals" className="rounded-xl bg-[#022c22] px-4 py-2 text-sm font-semibold text-white hover:bg-[#064e3b]">View all deals</Link>
            </div>
            <div className={productGrid}>
              {deals.map((p) => <ProductCard key={p.id} post={p} />)}
            </div>
          </section>
        )}

        {(rated.length > 0 || products.length > 0) && (
          <section>
            <SectionHeader
              title={rated.length ? "Top rated" : "New arrivals"}
              subtitle={rated.length ? "Rated by people who bought them." : undefined}
              ctaLabel="All products"
              ctaHref="/products"
              className="!px-0"
            />
            <div className={productGrid}>
              {(rated.length ? rated : products.slice(0, 5)).map((p) => <ProductCard key={p.id} post={p} />)}
            </div>
          </section>
        )}

        {categories.slice(0, 4).map((category) => (
          <Suspense key={category.id} fallback={<div className="h-32 animate-pulse rounded-lg bg-white/60" />}>
            <CategoryProductPage slug={category.slug} categoryData={category} />
          </Suspense>
        ))}

        <section className="overflow-hidden rounded-lg bg-[#064e3b] text-white">
          <Awning />
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Open your stall</h2>
              <p className="mt-2 max-w-[38ch] text-emerald-50">Sell to customers across Bangladesh without building your own store.</p>
              <Link href="/dashboard/user/sell" className="mt-4 inline-block rounded-xl bg-[#fbbf24] px-5 py-3 text-sm font-bold text-[#022c22] hover:bg-[#fcd34d]">
                Start selling
              </Link>
            </div>
            <ol className="grid gap-5 sm:grid-cols-3">
              {SELLER_STEPS.map((step, i) => (
                <li key={step.title}>
                  <span className="text-3xl font-bold tabular-nums text-[#fbbf24]">{i + 1}</span>
                  <h3 className="mt-1 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-emerald-50/85">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
