// components/modules/Products/CategoryProduct.tsx

import ProductCard from "@/components/modules/Products/ProductCard";
import SectionHeader from "@/components/modules/Home/SectionHeader";
import { Post, Category } from "@/types";

interface Props {
  slug: string;
  categoryData?: Category;
  showAll?: boolean; // When true, shows all products (for category page)
}

export default async function CategoryProductPage({
  slug,
  categoryData,
  showAll = false,
}: Props) {
  let data = categoryData;

  // If categoryData not provided, fetch it by slug
  if (!data) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/category/slug/${slug}`,
        {
          next: { tags: ["CATEGORY_PRODUCTS"] },
          cache: "force-cache", // Ensure we get fresh data for category pages
        }
      );
      if (res.ok) {
        const response = await res.json();
        data = response?.data;
      }
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
    }
  }

  // Guard against null or missing data
  if (!data || !data.products || data.products.length === 0) {
    return null;
  }

  const products: Post[] =
    data.products.map(
      (item: { product: Post }) => item.product
    ) ?? [];

  // Show all products on category page, or just 5 on home page
  const displayProducts = showAll ? products : products.slice(0, 5);
  const productCount = products.length;

  return (
    <section className="mb-10">
      {/* Section Header (matches Shop by Category / Hot / Popular style) */}
      <SectionHeader
        pill={showAll ? "Category" : "Explore"}
        gradientWord={data?.name}
        title="Shop by"
        subtitle={
          productCount > 0
            ? `${productCount}টি পণ্য পাওয়া যাচ্ছে`
            : "এই ক্যাটাগরির পণ্যগুলি দেখুন"
        }
        ctaLabel={showAll ? undefined : "সবগুলো দেখুন"}
        ctaHref={showAll ? undefined : `/category/${slug}`}
        accent="emerald"
        className={showAll ? "" : ""}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
        {displayProducts.map((product: Post) => (
          <ProductCard key={product.id} post={product} />
        ))}
      </div>
    </section>
  );
}
