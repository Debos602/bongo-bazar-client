import ProductCard from "@/components/modules/Products/ProductCard";
import Hero from "@/components/modules/Home/Hero";
import { Post, Category } from "@/types";
import Link from "next/link";
import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import { Suspense } from "react";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
    next: {
      tags: ["PRODUCTS"],
    },
  });
  const { data: products } = await res.json();

  // Fetch categories with products included
  let categories: Category[] = [];
  try {
    const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      next: {
        tags: ["CATEGORIES"],
      },
    });
    if (catRes.ok) {
      const catData = await catRes.json();
      categories = catData?.data || [];
      console.log("Categories loaded:", categories.length);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero categories={categories} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ===== হট ডিল Section ===== */}
        <div className="mb-10">
          {/* Section Header */}
          <div
            className="flex justify-between items-center mb-5 px-4 py-3 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #1a7a3c 0%, #22a84f 100%)",
              borderLeft: "5px solid #e53e3e",
            }}
          >
            <h2
              className="text-xl font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              <span
                className="inline-block px-2 py-0.5 rounded text-white text-sm font-bold"
                style={{ backgroundColor: "#e53e3e" }}
              >
                🔥
              </span>
              হট ডিল
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold hover:underline transition-all"
              style={{ color: "#fbbf24", fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              সবগুলো দেখুন &rarr;
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products?.slice(0, 5).map((product: Post) => (
              <ProductCard key={product?.id} post={product} />
            ))}
          </div>
        </div>

        {/* ===== সবচেয়ে জনপ্রিয় Section ===== */}
        <div className="mb-10">
          <div
            className="flex justify-between items-center mb-5 px-4 py-3 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #c53030 0%, #e53e3e 100%)",
              borderLeft: "5px solid #1a7a3c",
            }}
          >
            <h2
              className="text-xl font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              <span
                className="inline-block px-2 py-0.5 rounded text-white text-sm font-bold"
                style={{ backgroundColor: "#1a7a3c" }}
              >
                ⭐
              </span>
              সবচেয়ে জনপ্রিয় পণ্যগুলি
            </h2>
            <Link
              href="/products"
              className="text-sm font-semibold hover:underline transition-all"
              style={{ color: "#fbbf24", fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              সবগুলো দেখুন &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products?.slice(0, 5).map((product: Post) => (
              <ProductCard key={product?.id} post={product} />
            ))}
          </div>
        </div>
        {/* ===== Categories with Products ===== */}
        {categories.map((category: Category) => (
          <Suspense key={category.id} fallback={<div className="h-32 animate-pulse">Loading...</div>}>
            <CategoryProductPage slug={category.slug} categoryData={category} />
          </Suspense>
        ))}

      </div>
    </div>
  );
}