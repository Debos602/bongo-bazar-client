import BlogCard from "@/components/modules/Products/ProductCard";
import { Post } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Products | Bongo Bazar",
    description: "Browse all products available in the store. Find deals, prices and stock information."
};

const AllProductsPage = async ({ searchParams }: { searchParams?: { page?: string; limit?: string; }; }) => {
    const page = parseInt(searchParams?.page || "1");
    const limit = parseInt(searchParams?.limit || "10");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&limit=${limit}`, {
        cache: "force-cache"
    });
    const { data: products, meta } = await res.json();

    return (
        <div className="py-30 px-4 max-w-7xl mx-auto my-5">
            <h2 className="text-center text-4xl">All Products</h2>
            <div className="grid grid-cols-3 gap-5  max-w-6xl  mx-auto my-5">
                {
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((product: Post) => (
                            <BlogCard key={product.id} post={product} />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">No products found.</p>
                    )
                }
            </div>

            {meta && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    <a
                        href={`/products?page=${Math.max(1, (meta.page || page) - 1)}&limit=${meta.limit || limit}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Prev
                    </a>
                    <div className="text-sm text-gray-600">Page {meta.page || page} of {Math.ceil((meta.total || 0) / (meta.limit || limit))}</div>
                    <a
                        href={`/products?page=${(meta.page || page) + 1}&limit=${meta.limit || limit}`}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Next
                    </a>
                </div>
            )}
        </div>
    );
};

export default AllProductsPage;
