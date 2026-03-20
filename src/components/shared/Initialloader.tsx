"use client";

export default function InitialLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-5">

                {/* Spinning rings */}
                <div className="relative flex items-center justify-center w-24 h-24">
                    {/* Outer ring */}
                    <span className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-red-500 border-r-orange-400 animate-spin" />
                    {/* Middle ring — reverse spin */}
                    <span
                        className="absolute inset-3 rounded-full border-2 border-transparent border-b-emerald-500 border-l-emerald-400"
                        style={{ animation: "spin 0.9s linear infinite reverse" }}
                    />
                    {/* Core pulse */}
                    <span className="absolute inset-6 rounded-full bg-gradient-to-br from-red-500 via-orange-400 to-emerald-600 animate-ping opacity-80" />
                    <span className="absolute inset-6 rounded-full bg-gradient-to-br from-red-500 via-orange-400 to-emerald-600 flex items-center justify-center">
                        <span className="text-white text-sm animate-bounce">🛍</span>
                    </span>
                </div>

                {/* Brand name */}
                <div className="flex flex-col items-center gap-1">
                    <h1
                        className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-emerald-600 bg-clip-text text-transparent tracking-tight"
                        style={{ animation: "fadeUp 0.6s ease forwards" }}
                    >
                        বঙ্গ বাজার
                    </h1>
                    <span
                        className="text-[10px] tracking-[4px] uppercase text-neutral-400"
                        style={{ animation: "fadeUp 0.8s ease forwards" }}
                    >
                        Bongo Bazar
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-44 h-[3px] rounded-full bg-neutral-200 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-emerald-600"
                        style={{ animation: "progressFill 2.4s ease-in-out infinite alternate" }}
                    />
                </div>

                {/* Bouncing dots */}
                <div className="flex gap-1.5 items-center">
                    {[
                        "bg-red-500",
                        "bg-orange-400",
                        "bg-emerald-500",
                    ].map((color, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full ${color} animate-bounce`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>

                <p
                    className="text-xs text-neutral-400 animate-pulse tracking-wide"
                >
                    লোড হচ্ছে...
                </p>
            </div>

            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes progressFill {
                    from { width: 0%; }
                    to   { width: 85%; }
                }
            `}</style>
        </div>
    );
}