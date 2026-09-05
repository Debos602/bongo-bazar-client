import { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  Sparkles,
  Truck,
  ShieldCheck,
  Tag,
  ArrowRight,
} from 'lucide-react';
import ProductCard from '@/components/modules/Products/ProductCard';
import CountdownTimer from '@/components/modules/HotDeals/CountdownTimer';
import { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Hot Deals | Bongo Bazar',
  description:
    'Limited time offer — grab the best products at maximum discount now.',
};

const FEATURES = [
  { icon: Tag, title: 'Up to 70% off', desc: 'New offers daily' },
  { icon: Truck, title: 'Free Delivery', desc: 'On ৳999+ orders' },
  { icon: ShieldCheck, title: 'Secure Payment', desc: '100% Guaranteed' },
];

const getDiscountValue = (p: Product): number => {
  if (typeof p.discount === 'number' && p.discount > 0) return p.discount;
  if (
    typeof p.oldPrice === 'number' &&
    typeof p.price === 'number' &&
    p.oldPrice > p.price
  ) {
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }
  return 0;
};

export default async function HotDealsPage() {
  let products: Product[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      next: { tags: ['PRODUCTS'], revalidate: 60 },
    });
    if (res.ok) {
      const { data } = await res.json();
      products = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Failed to fetch products for hot deals:', error);
  }

  // Keep only products that actually have a discount, then sort highest first
  const hotDeals = products
    .map((p) => ({ p, d: getDiscountValue(p) }))
    .filter((x) => x.d > 0)
    .sort((a, b) => b.d - a.d)
    .map((x) => x.p);

  // Falls back to the newest products if nothing has a discount
  const displayProducts =
    hotDeals.length > 0 ? hotDeals : products.slice(0, 12);

  const topDiscount = hotDeals[0] ? getDiscountValue(hotDeals[0]) : 0;
  const totalSavings = hotDeals.reduce((sum, p) => {
    if (
      typeof p.oldPrice === 'number' &&
      typeof p.price === 'number' &&
      p.oldPrice > p.price
    ) {
      return sum + (p.oldPrice - p.price);
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-[#EDEEEF]">
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            'linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Left: title + features */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                Limited Time Offer
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-900/30">
                  <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Hot{' '}
                  <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                    Deals
                  </span>
                </h1>
              </div>

              <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mb-6">
                Maximum discount on selected products. Limited stock — order before it ends.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-black tabular-nums text-emerald-200" data-numeric="true">
                    {topDiscount > 0 ? `${topDiscount}%` : '—'}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                    Maximum Discount
                  </div>
                </div>
                <span className="w-px h-10 bg-white/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-black tabular-nums" data-numeric="true">
                    {hotDeals.length}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                    Deals Running
                  </div>
                </div>
                <span className="w-px h-10 bg-white/20" />
                <div>
                  <div className="text-2xl sm:text-3xl font-black tabular-nums text-emerald-200" data-numeric="true">
                    ৳{totalSavings.toLocaleString()}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">
                    Possible Savings
                  </div>
                </div>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15"
                    >
                      <Icon className="w-4 h-4 text-emerald-200" />
                      <div>
                        <div className="text-xs font-bold leading-tight">
                          {f.title}
                        </div>
                        <div className="text-[10px] text-white/70 leading-tight">
                          {f.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: countdown */}
            <div className="md:flex-shrink-0 md:w-auto">
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 p-5 sm:p-6 shadow-2xl">
                <div className="text-[11px] uppercase tracking-widest text-emerald-200/90 font-semibold mb-3 text-center">
                  Offer ends in
                </div>
                <CountdownTimer />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg
          className="block w-full text-[#EDEEEF]"
          viewBox="0 0 1440 60"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 30 C 360 60, 1080 0, 1440 30 L 1440 60 L 0 60 Z" />
        </svg>
      </section>

      {/* ── Breadcrumb + Toolbar ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <nav className="text-sm text-slate-500">
            <Link href="/" className="hover:text-emerald-700">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Hot Deals</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            {hotDeals.length} deals running
          </div>
        </div>
      </div>

      {/* ── Products grid ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} post={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center border border-slate-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
              <Flame className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No hot deals right now
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              New offers coming very soon — stay tuned!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* CTA banner */}
        {displayProducts.length > 0 && (
          <div className="mt-10 sm:mt-12 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg,#022c22 0%,#064e3b 60%,#047857 100%)',
            }}
          >
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                Want to see more products?
              </h3>
              <p className="text-white/75 text-sm sm:text-[15px]">
                Browse the full catalog — best products at best prices.
              </p>
            </div>
            <Link
              href="/products"
              className="relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition shadow-lg"
            >
              All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
