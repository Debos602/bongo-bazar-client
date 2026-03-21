"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { slides } from "@/services/Slide/Slide";

interface HeroProps {
  categories?: Category[];
}

/* category icons */
const categoryIcons: Record<string, string> = {
  laptop: "💻",
  phone: "📱",
  tablet: "📱",
  monitor: "🖥️",
  tv: "📺",
  headphones: "🎧",
  earbuds: "🎧",
  speaker: "🔊",
  smartwatch: "⌚",
  camera: "📷",
};

const getCategoryIcon = (slug: string): string => {
  return categoryIcons[slug] || "📦";
};

export default function Hero({ categories = [] }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  /* goTo optimized */
  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setAnimating(false);
      }, 300);
    },
    [animating]
  );

  /* auto-slide (fixed) */
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="px-4 py-3 text-white text-sm font-bold flex items-center gap-2"
            style={{ background: "linear-gradient(135deg,#166534,#991b1b)" }}
          >
            <ShoppingBag className="w-4 h-4" />
            সব ক্যাটেগরি
          </div>

          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 border-b border-gray-50 last:border-0 hover:pl-6 group transition-all"
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-base bg-blue-100 group-hover:scale-110 transition">
                {getCategoryIcon(cat.slug)}
              </span>

              <span className="font-medium group-hover:text-blue-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </aside>

        {/* Hero Slider */}
        <div className="flex-1 rounded-2xl overflow-hidden relative min-h-[320px] md:min-h-[380px] shadow-lg">
          {/* Background */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              animating ? "opacity-0" : "opacity-100"
            )}
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${slide.bgFrom} 0%, ${slide.bgVia} 40%, ${slide.bgTo} 100%)`,
            }}
          />

          {/* Content */}
          <div
            className={cn(
              "relative z-10 h-full flex items-center px-8 md:px-12 py-8 transition-all duration-300",
              animating
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            )}
          >
            {/* Left */}
            <div className="flex-1 text-white space-y-3 max-w-xs md:max-w-sm">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `linear-gradient(135deg,${slide.accentFrom},${slide.accentTo})`,
                }}
              >
                <Tag className="w-3 h-3" />
                {slide.tag}
              </div>

              <div>
                <h2 className="text-5xl font-black">
                  {slide.heading}
                </h2>
                <h2 className="text-5xl font-black text-white">
                  {slide.subheading}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-20 h-20 flex flex-col items-center justify-center rounded-full border-4 border-white/30 bg-white/10">
                  <span className="text-2xl font-black">
                    {slide.discount}%
                  </span>
                  <span className="text-xs font-bold">OFF</span>
                </div>

                <div>
                  <p className="text-sm font-bold text-yellow-300">
                    {slide.label}
                  </p>
                  <p className="text-xs text-white/70">
                    {slide.product}
                  </p>
                </div>
              </div>

              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:scale-105 transition"
                style={{
                  background: `linear-gradient(135deg,${slide.accentFrom},${slide.accentTo})`,
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                {slide.cta}
              </Link>
            </div>

            {/* Right Image */}
            <div
              className={cn(
                "hidden sm:flex flex-1 justify-end transition-all duration-500",
                animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.imageSrc}
                alt={slide.imageAlt}
                className="max-h-[320px] object-contain"
              />
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === current
                    ? "w-6 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/40"
                )}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() =>
              goTo((current - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 text-white rounded-full flex items-center justify-center"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() =>
              goTo((current + 1) % slides.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 text-white rounded-full flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}