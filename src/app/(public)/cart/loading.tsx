import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#fdf8f0] py-10 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Page Title */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#dc143c] to-[#006a4e]" />
                    <Skeleton className="h-7 w-48" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ── Left: Customer Info ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex h-1.5">
                            <div className="flex-1 bg-[#dc143c]/30" />
                            <div className="flex-1 bg-[#006a4e]/30" />
                        </div>
                        <div className="p-6 space-y-5">
                            <Skeleton className="h-6 w-44" />
                            <div className="space-y-2">
                                <Skeleton className="h-3.5 w-full" />
                                <Skeleton className="h-3.5 w-3/4" />
                            </div>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-3 w-32" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>
                            ))}
                            <Skeleton className="h-12 w-full rounded-xl" />
                        </div>
                    </div>

                    {/* ── Right: Order Info ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex h-1.5">
                            <div className="flex-1 bg-[#dc143c]/30" />
                            <div className="flex-1 bg-[#006a4e]/30" />
                        </div>
                        <div className="p-6">
                            <Skeleton className="h-6 w-44 mb-5" />

                            {/* Table */}
                            <div className="rounded-xl border border-gray-100 overflow-hidden mb-4">
                                {/* Header */}
                                <div className="bg-[#fdf8f0] border-b border-gray-100 px-3 py-2.5 flex gap-3">
                                    <Skeleton className="h-3 w-6" />
                                    <Skeleton className="h-3 flex-1" />
                                    <Skeleton className="h-3 w-12" />
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-16" />
                                </div>

                                {/* Rows */}
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="px-3 py-3 flex items-center gap-3 border-b border-gray-50"
                                    >
                                        <Skeleton className="w-6 h-6 rounded-full flex-shrink-0" />
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                                            <div className="space-y-1.5 flex-1">
                                                <Skeleton className="h-3 w-full" />
                                                <Skeleton className="h-3 w-2/3" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-4 w-10 flex-shrink-0" />
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <Skeleton className="w-6 h-6 rounded-full" />
                                            <Skeleton className="w-7 h-4" />
                                            <Skeleton className="w-6 h-6 rounded-full" />
                                        </div>
                                        <Skeleton className="h-4 w-10 flex-shrink-0" />
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="bg-[#fdf8f0] rounded-xl p-4 space-y-3 mb-5">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                ))}
                                <div className="h-px bg-gray-200" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-5 w-28" />
                                    <Skeleton className="h-5 w-20" />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <Skeleton className="flex-1 h-10 rounded-xl" />
                                <Skeleton className="flex-1 h-10 rounded-xl" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}