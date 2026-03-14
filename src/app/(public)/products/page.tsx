import BlogCard from "@/components/modules/Products/ProductCard";
import { Post } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "All Products | Bongo Bazar",
    description: "Browse all products available in the store. Find deals, prices and stock information."
};

const AllProductsPage = async ({ searchParams }: { searchParams?: { page?: string; limit?: string; searchTerm?: string; }; }) => {
    const page = parseInt(searchParams?.page || "1");
    const limit = parseInt(searchParams?.limit || "10");
    const searchTerm = searchParams?.searchTerm?.toString() || "";

    let url = `${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&limit=${limit}`;
    if (searchTerm) url += `&searchTerm=${encodeURIComponent(searchTerm)}`;

    const res = await fetch(url, {
        cache: "no-store",
    });
    const { data: products, meta } = await res.json();

    return (
        <div className="min-h-screen bg-[#fdf8f0] py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e8ddd0] relative">
                    {/* Gradient underline accent */}
                    <span
                        className="absolute bottom-[-1px] left-0 h-[2px] w-20 rounded-full"
                        style={{ background: "linear-gradient(110deg, #c41230 0%, #9e0f2c 42%, #00825a 100%)" }}
                    />
                    <h2 className="text-xl font-bold text-[#1a1208] flex items-center gap-3" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
                        <span>
                            <Link href='/'>Home/</Link>All Products
                        </span>
                        <span
                            className="text-xs font-bold text-white px-3 py-0.5 rounded-full"
                            style={{ background: "linear-gradient(110deg, #c41230, #00825a)" }}
                        >
                            Page {meta?.page || page}
                        </span>
                    </h2>
                    {meta && (
                        <p className="text-sm text-[#7a6a5a] font-medium">
                            <strong className="text-[#00825a] font-bold">{meta.total}</strong> items total
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {
                        Array.isArray(products) && products.length > 0 ? (
                            products.map((product: Post) => (
                                <BlogCard key={product.id} post={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-[#7a6a5a] py-16 text-sm">
                                No products found.
                            </p>
                        )
                    }
                </div>

                {/* Pagination */}
                {meta && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                        <a
                            href={`/products?page=${Math.max(1, (meta.page || page) - 1)}&limit=${meta.limit || limit}`}
                            className="px-5 py-2 rounded-lg text-sm font-semibold border-[1.5px] border-[#e8ddd0] bg-white text-[#7a6a5a] hover:border-[#00825a] hover:text-[#00825a] transition-all"
                        >
                            ← Prev
                        </a>
                        <span className="text-sm text-[#7a6a5a] font-medium px-2">
                            Page {meta.page || page} of {Math.ceil((meta.total || 0) / (meta.limit || limit))}
                        </span>
                        <a
                            href={`/products?page=${(meta.page || page) + 1}&limit=${meta.limit || limit}`}
                            className="px-5 py-2 rounded-lg text-sm font-semibold border-[1.5px] border-[#e8ddd0] bg-white text-[#7a6a5a] hover:border-[#00825a] hover:text-[#00825a] transition-all"
                        >
                            Next →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;