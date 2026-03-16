// File: src/app/(public)/products/[productId]/page.tsx
import ProductDetailsCard from "@/components/modules/Products/ProductDetailsCard";
import { getBlogById } from "@/services/PostServices";
import { Post } from "@/types";

interface PageProps {
    params: { productId: string; };
}

// Optional: Loading Component
export const loading = () => {
    return <div className="text-center py-10">Loading product...</div>;
};

// Optional: Error Component
export const error = ({ error, reset }: { error: Error; reset: () => void; }) => {
    return (
        <div className="text-center py-10 text-red-500">
            <p>Something went wrong: {error.message}</p>
            <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Retry
            </button>
        </div>
    );
};

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product?page=1&limit=100`);
    const { data: products } = await res.json();
    return products.slice(0, 2).map((p: Post) => ({
        productId: String(p.id),
    }));
};


export const generateMetadata = async ({ params }: { params: Promise<{ productId: string; }>; }) => {
    const { productId } = await params;
    const product = await getBlogById(productId);
    return {
        title: product?.name,
        description: product?.description
    };
};


export default async function ProductDetailsPage({ params }: PageProps) {
    const { productId } = await params;

    // Fetch product from API
    const product = await getBlogById(productId);

    return (
        <div className=" max-w-8xl mx-auto">
            <ProductDetailsCard product={product} />
        </div>
    );
}
