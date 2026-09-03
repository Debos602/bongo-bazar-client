import ProductCard from "@/components/modules/Products/ProductCard";
import Hero from "@/components/modules/Home/Hero";
import CategoryBentoGrid from "@/components/modules/Home/CategoryBentoGrid";
import SectionHeader from "@/components/modules/Home/SectionHeader";
import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import CountdownTimer from "@/components/modules/HotDeals/CountdownTimer";
import { Category, Product } from "@/types";
import { Suspense } from "react";
import { getCategoryBasic } from "@/actions/category";
import { Truck, ShieldCheck, Clock, MapPin, Flame, Sparkles, ArrowRight } from "lucide-react";

const USP_ITEMS = [
  { icon: Truck, title: "Free Delivery", desc: "On ৳999+" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
  { icon: Clock, title: "24/7 Support", desc: "Always here" },
  { icon: MapPin, title: "All Over Bangladesh", desc: "Nationwide" },
];

const getDiscountValue = (p: Product): number => {
  if (typeof p.discount === "number" && p.discount > 0) return p.discount;
  if (
    typeof p.oldPrice === "number" &&
    typeof p.price === "number" &&
    p.oldPrice > p.price
  ) {
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }
  return 0;
};

export default async function HomePage() {
  // ✅ Products fetch (আগের মতোই)
  let products: Product[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      next: { tags: ["PRODUCTS"] },
    });
    if (res.ok) {
      const { data } = await res.json();
      products = data || [];
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // ✅ getCategory service দিয়ে categories fetch
  let categories: Category[] = [];
  try {
    const data = await getCategoryBasic();
    categories = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  // Hot deals = products with a real discount, sorted highest first
  const hotDeals = products
    .map((p) => ({ p, d: getDiscountValue(p) }))
    .filter((x) => x.d > 0)
    .sort((a, b) => b.d - a.d)
    .map((x) => x.p)
    .slice(0, 5);

  // Most popular = first 5 (placeholder; same data source as today)
  const popularProducts = products.slice(0, 5);
  const topDiscount = hotDeals[0] ? getDiscountValue(hotDeals[0]) : 0;

  return (
    <div className="min-h-screen bg-[#EDEEEF]">
      <Hero categories={categories} />

      {/* ── USP trust bar ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 -mt-2 sm:mt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {USP_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl bg-white border border-slate-100 px-3 sm:px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(4,120,87,0.25)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <span
                  className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)",
                  }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] sm:text-sm font-bold text-slate-800 leading-tight truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 leading-tight truncate">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* Category Bento Grid Section */}
        <section>
          <SectionHeader
            pill="Curated for you"
            gradientWord="Category"
            title="Shop by"
            subtitle="Explore our wide range of products across every collection"
            ctaLabel="View all"
            ctaHref="/products"
            accent="emerald"
          />
          <CategoryBentoGrid categories={categories} />
        </section>

        {/* Hot Deals promo banner (matches /hot-deals page) */}
        <section
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl text-white p-5 sm:p-7 md:p-8"
          style={{
            background:
              "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                সীমিত সময়ের অফার
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-900/30">
                  <Flame className="w-6 h-6 text-white" />
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
                  হট{" "}
                  <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                    ডিলস
                  </span>
                </h2>
              </div>
              <p className="text-white/80 text-sm sm:text-[15px] max-w-xl mb-4">
                বাছাই করা পণ্যে সর্বোচ্চ ছাড়। স্টক সীমিত — শেষ হওয়ার আগেই
                অর্ডার করুন।
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-black tabular-nums text-emerald-200"
                    data-numeric="true"
                  >
                    {topDiscount > 0 ? `${topDiscount}%` : "—"}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                    সর্বোচ্চ ছাড়
                  </div>
                </div>
                <span className="w-px h-9 bg-white/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-black tabular-nums" data-numeric="true">
                    {hotDeals.length}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                    ডিল চলছে
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex-shrink-0">
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-2xl">
                <div className="text-[10px] uppercase tracking-widest text-emerald-200/90 font-semibold mb-2.5 text-center">
                  অফার শেষ হওয়ার বাকি
                </div>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </section>

        {/* হট ডিল Section */}
        <section>
          <SectionHeader
            pill="Limited time"
            gradientWord="Deals"
            title="Hot"
            subtitle="Limited time offers you can't miss"
            ctaLabel="View all deals"
            ctaHref="/hot-deals"
            accent="emerald"
            icon={false}
          />
          {hotDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
              {hotDeals.map((product) => (
                <ProductCard key={product?.id} post={product} />
              ))}
            </div>
          ) : (
            <p className="px-4 text-slate-500 text-sm">এখন কোনো ডিল নেই।</p>
          )}
        </section>

        {/* সবচেয়ে জনপ্রিয় Section */}
        <section>
          <SectionHeader
            pill="Most loved"
            gradientWord="Popular"
            title="সবচেয়ে জনপ্রিয়"
            subtitle="কাস্টমারদের পছন্দের পণ্যগুলি"
            ctaLabel="সবগুলো দেখুন"
            ctaHref="/products"
            accent="emerald"
            icon={false}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
            {popularProducts.map((product: Product) => (
              <ProductCard key={product?.id} post={product} />
            ))}
          </div>
        </section>

        {/* Categories with Products */}
        {categories.map((category: Category) => (
          <Suspense
            key={category.id}
            fallback={
              <div className="h-32 animate-pulse rounded-2xl bg-white/60" />
            }
          >
            <CategoryProductPage slug={category.slug} categoryData={category} />
          </Suspense>
        ))}

        {/* Bottom newsletter strip */}
        <section
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl text-white p-6 sm:p-8"
          style={{
            background:
              "linear-gradient(135deg,#022c22 0%,#064e3b 60%,#047857 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Exclusive offers
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                নতুন অফার সবার আগে পেতে চান?
              </h3>
              <p className="text-white/75 text-sm sm:text-[15px]">
                ইমেইল দিন, আমরা সেরা ডিল আপনার কাছে পৌঁছে দেব।
              </p>
            </div>
            <form className="flex w-full md:w-auto items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full p-1.5">
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="bg-transparent text-white placeholder-white/60 text-sm px-4 py-2 flex-1 md:w-72 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-white text-emerald-700 text-sm font-bold px-4 sm:px-5 py-2 rounded-full hover:bg-emerald-50 transition"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
