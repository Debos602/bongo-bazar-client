import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* ── Breadcrumb ── */}
            <div className="max-w-7xl mx-auto px-5 pt-5 pb-2 flex items-center gap-2">
                <Skeleton className="h-3 w-10 rounded-full" />
                <Skeleton className="h-3 w-2 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
                <Skeleton className="h-3 w-2 rounded-full" />
                <Skeleton className="h-3 w-44 rounded-full" />
            </div>

            {/* ══ TOP GRID — Gallery | Info ══ */}
            <div className="max-w-7xl mx-auto px-5 py-4 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5 items-start">

                {/* ── LEFT — Gallery ── */}
                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    {/* Main image */}
                    <Skeleton className="aspect-square w-full rounded-xl" />

                    {/* Thumbnails */}
                    <div className="flex gap-2 mt-3">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="w-[60px] h-[60px] rounded-lg flex-shrink-0" />
                        ))}
                    </div>

                    {/* Sold bar */}
                    <div className="mt-3 flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                        <Skeleton className="h-3 w-3 rounded-full flex-shrink-0" />
                        <Skeleton className="flex-1 h-1.5 rounded-full" />
                        <Skeleton className="h-3 w-14 rounded-full" />
                    </div>
                </div>

                {/* ── RIGHT — Info ── */}
                <div className="flex flex-col gap-3">

                    {/* Store badge */}
                    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
                            <div className="flex flex-col gap-1.5">
                                <Skeleton className="h-3.5 w-32 rounded-full" />
                                <Skeleton className="h-3 w-20 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="h-8 w-24 rounded-lg" />
                    </div>

                    {/* Main info card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-6 w-3/4 rounded-full" />
                            <Skeleton className="h-6 w-1/2 rounded-full" />
                        </div>

                        {/* Rating row */}
                        <div className="flex items-center gap-3 pb-3 border-b border-dashed border-gray-100">
                            <Skeleton className="h-3 w-8 rounded-full" />
                            <Skeleton className="h-3 w-20 rounded-full" />
                            <Skeleton className="h-3 w-16 rounded-full" />
                            <Skeleton className="h-3 w-14 rounded-full" />
                        </div>

                        {/* Price block */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
                            <div className="flex items-baseline gap-3">
                                <Skeleton className="h-9 w-36 rounded-full" />
                                <Skeleton className="h-4 w-20 rounded-full" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-3 w-28 rounded-full" />
                        </div>

                        {/* Promo banner */}
                        <Skeleton className="h-10 w-full rounded-xl" />

                        {/* Qty + Stock */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-3 w-8 rounded-full" />
                            <Skeleton className="h-9 w-28 rounded-xl" />
                            <Skeleton className="h-8 w-28 rounded-lg" />
                        </div>

                        {/* CTA buttons */}
                        <div className="flex gap-3">
                            <Skeleton className="flex-1 h-12 rounded-xl" />
                            <Skeleton className="flex-1 h-12 rounded-xl" />
                        </div>

                        {/* Delivery rows */}
                        <div className="flex flex-col gap-3">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <Skeleton className="h-3 w-32 rounded-full" />
                                        <Skeleton className="h-3 w-48 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Meta row */}
                        <div className="flex gap-5 pt-3 border-t border-dashed border-gray-100">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <Skeleton className="h-2.5 w-12 rounded-full" />
                                    <Skeleton className="h-3.5 w-16 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ TABS + SIDEBAR ══ */}
            <div className="max-w-7xl mx-auto px-5 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5 items-start">

                {/* ── Tabs card ── */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    {/* Tab header */}
                    <div className="flex border-b border-gray-100">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex-1 flex justify-center py-4">
                                <Skeleton className="h-3.5 w-24 rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="p-6 flex flex-col gap-3">
                        <Skeleton className="h-3.5 w-full rounded-full" />
                        <Skeleton className="h-3.5 w-5/6 rounded-full" />
                        <Skeleton className="h-3.5 w-4/6 rounded-full" />
                        <Skeleton className="h-3.5 w-full rounded-full" />
                        <Skeleton className="h-3.5 w-3/4 rounded-full" />
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <div className="flex flex-col gap-4">

                    {/* Buyer protection */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <Skeleton className="h-3 w-28 rounded-full" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <Skeleton className="h-3 w-28 rounded-full" />
                                    <Skeleton className="h-3 w-36 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Delivery estimator */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <Skeleton className="h-3 w-28 rounded-full" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <Skeleton className="h-3 w-16 rounded-full" />
                                <Skeleton className="h-3 w-14 rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Share card */}
                    <Skeleton className="h-36 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}