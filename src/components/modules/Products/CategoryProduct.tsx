// components/modules/Products/CategoryProduct.tsx

import ProductCard from "@/components/modules/Products/ProductCard";
import Link from "next/link";
import { Post, Category } from "@/types";

interface Props {
    slug: string;
    categoryData?: Category;
    showAll?: boolean; // When true, shows all products (for category page)
}

export default async function CategoryProductPage({ slug, categoryData, showAll = false }: Props) {
    let data = categoryData;

    // If categoryData not provided, fetch it by slug
    if (!data) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category/slug/${slug}`, {
                next: { tags: ["CATEGORY_PRODUCTS"] },
                cache: "force-cache", // Ensure we get fresh data for category pages
            });
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


    const products: Post[] = data.products.map(
        (item: { product: Post; }) => item.product
    ) ?? [];

    // Show all products on category page, or just 6 on home page
    const displayProducts = showAll ? products : products.slice(0, 5);

    return (
        <div className="mb-10">
            {/* Section Header */}
            <div
                className="flex justify-between items-center mb-5 px-4 py-3 rounded-xl border-1 border-green-900"

            >
                <h2
                    className="text-xl font-bold text-green-900 flex items-center gap-2"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                    {
                        showAll && (
                            <Link href="/">Home /</Link>
                        )
                    }
                    {data?.name}
                </h2>

                {!showAll && (
                    <Link
                        href={`/category/${slug}`}
                        className="text-sm font-semibold hover:underline"
                        style={{
                            color: "#fbbf24",
                            fontFamily: "'Hind Siliguri', sans-serif",
                        }}
                    >
                        সবগুলো দেখুন →
                    </Link>
                )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayProducts.map((product: Post) => (
                    <ProductCard key={product.id} post={product} />
                ))}
            </div>
        </div>
    );
}