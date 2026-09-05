import ProductDetailsCard from "@/components/modules/Products/ProductDetailsCard";
import { getBlogById } from "@/services/PostServices";
import { Post } from "@/types";

interface PageProps {
    params: Promise<{ productId: string; }>; // Promise in Next.js 15
}

export const generateStaticParams = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product?page=1&limit=100`
        );

        if (!res.ok) return []; // return empty on API failure

        const { data: products } = await res.json();

        if (!products || !Array.isArray(products)) return []; // null check

        return products.slice(0, 2).map((p: Post) => ({
            productId: String(p.id),
        }));
    } catch (error) {
        console.error("generateStaticParams failed:", error);
        return []; // return empty instead of crashing
    }
};

export const generateMetadata = async ({ params }: { params: Promise<{ productId: string; }>; }) => {
    const { productId } = await params;
    const product = await getBlogById(productId);
    return {
        title: product?.name,
        description: product?.description,
    };
};

export default async function ProductDetailsPage({ params }: PageProps) {
    const { productId } = await params; // needs to be awaited

    const product = await getBlogById(productId);

    return (
        <div className="max-w-8xl mx-auto">
            <ProductDetailsCard product={product} />
        </div>
    );
}
