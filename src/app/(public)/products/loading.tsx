
import { SkeletonCard } from "../category/[slug]/loading";

const ProductsLoadingPage = () => {
    return (
        <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
    );
};

export default ProductsLoadingPage;
