import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import { Metadata } from "next";

interface Props {
    params: { slug: string; };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `${params.slug} — Category | Bongo Bazar`,
        description: `Products in ${params.slug} category.`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = params;
    return (
        <div className="container mx-auto py-6">

            <CategoryProductPage slug={slug} />
        </div>
    );
}
