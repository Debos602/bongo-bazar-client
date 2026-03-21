import ProductDetailsCard from "@/components/modules/Products/ProductDetailsCard";
import { getBlogById } from "@/services/PostServices";
import { Post } from "@/types";

interface PageProps {
    params: Promise<{ productId: string; }>; // ✅ Next.js 15-এ Promise
}

export const generateStaticParams = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product?page=1&limit=100`
        );

        if (!res.ok) return []; // ✅ API fail করলে empty return

        const { data: products } = await res.json();

        if (!products || !Array.isArray(products)) return []; // ✅ null check

        return products.slice(0, 2).map((p: Post) => ({
            productId: String(p.id),
        }));
    } catch (error) {
        console.error("generateStaticParams failed:", error);
        return []; // ✅ crash না করে empty return
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
    const { productId } = await params; // ✅ await করতে হবে

    const product = await getBlogById(productId);

    return (
        <div className="max-w-8xl mx-auto">
            <ProductDetailsCard product={product} />
        </div>
    );
}
