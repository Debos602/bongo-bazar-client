// components/modules/Products/CategoryProduct.tsx

import ProductCard from "@/components/modules/Products/ProductCard";
import Link from "next/link";
import { Post } from "@/types";

interface Props {
    slug: string;
}

async function getCategoryProducts(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/category/slug/${slug}`,
            {
                cache: "force-cache",
            }
        );

        if (!res.ok) {
            console.error(
                `getCategoryProducts: API returned ${res.status} for slug "${slug}"`
            );
            return null; // ✅ graceful — don't throw
        }

        const json = await res.json();
        return json?.data ?? null;
    } catch (err) {
        console.error("getCategoryProducts: network error →", err);
        return null;
    }
}

export default async function CategoryProductPage({ slug }: Props) {
    const data = await getCategoryProducts(slug);

    // ✅ FIX 4: guard against null data (API down, bad slug, 500, etc.)
    if (!data) return null;

    const products: Post[] =
        data?.products?.map((item: any) => item.product) ?? [];

    if (products.length === 0) return null;

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
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.slice(0, 6).map((product: Post) => (
                    <ProductCard key={product.id} post={product} />
                ))}
            </div>
        </div>
    );
}