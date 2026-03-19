// app/checkout/loading.tsx

function Skeleton({ className }: { className?: string; }) {
    return (
        <div className={`animate-pulse rounded-lg bg-neutral-200 ${className ?? ""}`} />
    );
}

function SectionCard({ children }: { children: React.ReactNode; }) {
    return (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-red-400 to-emerald-500 opacity-40" />
            <div className="px-5 py-4">{children}</div>
        </div>
    );
}

export default function CheckoutLoading() {
    return (
        <div className="min-h-screen py-6 px-4">

            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-red-600 via-orange-400 to-emerald-600 mb-6 opacity-30" />

            <div className="max-w-6xl mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-3 rounded-sm" />
                    <Skeleton className="h-3 w-16" />
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-start">

                    {/* ══ LEFT ══ */}
                    <div className="flex-1 flex flex-col gap-4 min-w-0">

                        {/* Shipping & Billing */}
                        <SectionCard>
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                            <div className="border border-neutral-100 rounded-xl p-4 flex flex-col gap-3">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="flex items-start gap-2">
                                    <Skeleton className="h-5 w-14 rounded-full flex-shrink-0" />
                                    <Skeleton className="h-3 w-64" />
                                </div>
                            </div>
                        </SectionCard>

                        {/* Package */}
                        <SectionCard>
                            {/* Package header */}
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-24" />
                            </div>

                            {/* Delivery label */}
                            <Skeleton className="h-3 w-32 mb-3" />

                            {/* Delivery option box */}
                            <div className="border-2 border-neutral-200 rounded-xl p-3.5 mb-5 flex items-start gap-3">
                                <Skeleton className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-3 w-10" />
                                    </div>
                                    <Skeleton className="h-3 w-28" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>

                            {/* Items */}
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-start gap-3 py-3 border-t border-neutral-100 first:border-t-0">
                                    <Skeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
                                    <div className="flex-1 flex flex-col gap-2">
                                        <Skeleton className="h-3.5 w-full" />
                                        <Skeleton className="h-3 w-3/4" />
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-3 w-12" />
                                            <Skeleton className="h-3 w-8" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-3 w-12 flex-shrink-0" />
                                </div>
                            ))}
                        </SectionCard>

                        {/* Payment method */}
                        <SectionCard>
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="border-2 border-neutral-100 rounded-xl px-4 py-3 flex items-center gap-3">
                                        <Skeleton className="w-7 h-7 rounded-lg flex-shrink-0" />
                                        <Skeleton className="h-3 flex-1" />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </div>

                    {/* ══ RIGHT ══ */}
                    <div className="w-full lg:w-[310px] flex-shrink-0 flex flex-col gap-4">

                        {/* Promotion */}
                        <SectionCard>
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="flex-1 h-9 rounded-lg" />
                                <Skeleton className="w-16 h-9 rounded-lg" />
                            </div>
                        </SectionCard>

                        {/* Invoice & Contact */}
                        <div className="border border-neutral-200 rounded-xl px-4 py-3 flex items-center justify-between">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-8" />
                        </div>

                        {/* Order Summary */}
                        <SectionCard>
                            <Skeleton className="h-4 w-32 mb-5" />

                            <div className="flex flex-col gap-3.5">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <Skeleton className="h-3 w-36" />
                                        <Skeleton className="h-3 w-16" />
                                    </div>
                                ))}

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-red-100 via-neutral-100 to-emerald-100" />

                                {/* Total */}
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-12" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                                <Skeleton className="h-2.5 w-40 self-end" />
                            </div>

                            {/* Button skeleton */}
                            <Skeleton className="mt-4 w-full h-12 rounded-xl" />

                            {/* Secure note */}
                            <div className="flex items-center justify-center gap-1.5 mt-3">
                                <Skeleton className="h-2.5 w-3 rounded-sm" />
                                <Skeleton className="h-2.5 w-36" />
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </div>
        </div>
    );
}