
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm">
            <div className="relative w-full bg-gradient-to-br from-green-50 to-red-50" style={{ paddingTop: "100%" }}>
                <Skeleton className="absolute inset-0 w-full h-full" />
            </div>

            <div className="flex flex-col flex-1 p-3" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)" }}>
                <div className="mb-1">
                    <Skeleton className="h-3 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                <Skeleton className="h-4 w-full mb-3" />

                <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #dc2626 0%, #15803d 100%)" }} />
        </div>
    );
}

export default function Loading() {
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
}
