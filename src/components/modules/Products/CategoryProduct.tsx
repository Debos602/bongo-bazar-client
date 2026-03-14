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

    // Extract products from the nested structure
    const products: Post[] = data.products.map((item: any) => item.product) ?? [];

    // Show all products on category page, or just 6 on home page
    const displayProducts = showAll ? products : products.slice(0, 6);

    return (
        <div className="mb-10">
            {/* Section Header */}
            <div
                className="flex justify-between items-center mb-5 px-4 py-3 rounded-xl"
                style={{
                    background: "linear-gradient(135deg, #1a3a7a 0%, #2251a8 100%)",
                    borderLeft: "5px solid #e53e3e",
                }}
            >
                <h2
                    className="text-xl font-bold text-white flex items-center gap-2"
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                    📦 {data?.name}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayProducts.map((product: Post) => (
                    <ProductCard key={product.id} post={product} />
                ))}
            </div>
        </div>
    );
}