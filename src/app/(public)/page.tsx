import ProductCard from "@/components/modules/Products/ProductCard";
import Hero from "@/components/modules/Home/Hero";
import CategoryBentoGrid from "@/components/modules/Home/CategoryBentoGrid";
import { Category, Product } from "@/types";
import Link from "next/link";
import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import { Suspense } from "react";
import { getCategoryBasic } from "@/actions/category";



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
    // console.log("Raw category data basic:", data);
    categories = Array.isArray(data) ? data : [];
    // console.log("Categories loaded:", categories.length);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="min-h-screen bg-[#EDEEEF]">
      <Hero categories={categories} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Category Bento Grid Section */}
        <CategoryBentoGrid categories={categories} />

        {/* হট ডিল Section */}
        <div className="py-[80px] ">
          
          <div
            className="flex justify-between items-center mb-5 px-4 relative">
              <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-r-md"></div>
            <div className="">
              <h2 className="font-bold text-[28px]  text-[#191C1D]">Hot Deals</h2>
              <p className="text-[#586059] text-[16px]">
                Limited time offers you can't miss
              </p>
            </div>

            <Link href="/products" className="flex items-center gap-[8px] text-[16px] font-normal text-[#1A7A3C]">
              View All Deals 

              <i><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9V9" fill="#16A34A"/>
            </svg>
            </i>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, 5).map((product: Product) => (
              <ProductCard key={product?.id} post={product} />
            ))}
          </div>
        </div>

        {/* সবচেয়ে জনপ্রিয় Section */}
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
              >⭐</span>
              সবচেয়ে জনপ্রিয় পণ্যগুলি
            </h2>
            <Link href="/products" className="text-sm font-semibold hover:underline"
              style={{ color: "#fbbf24", fontFamily: "'Hind Siliguri', sans-serif" }}>
              সবগুলো দেখুন &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, 5).map((product: Product) => (
              <ProductCard key={product?.id} post={product} />
            ))}
          </div>
        </div>

        {/* Categories with Products */}
        {categories.map((category: Category) => (
          <Suspense key={category.id} fallback={<div className="h-32 animate-pulse">Loading...</div>}>
            <CategoryProductPage slug={category.slug} categoryData={category} />
          </Suspense>
        ))}

      </div>
    </div>
  );
}