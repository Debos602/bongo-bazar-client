import CategoryProductPage from "@/components/modules/Products/CategoryProduct";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string; }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug} — Category | Bongo Bazar`,
        description: `Products in ${slug} category.`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    return (
        <div className="container mx-auto py-6">
            <CategoryProductPage slug={slug} showAll={true} />
        </div>
    );
}
