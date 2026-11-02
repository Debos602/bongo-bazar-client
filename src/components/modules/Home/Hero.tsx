"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Tag } from "lucide-react";
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
  const key = Object.keys(categoryIcons).find((k) => slug.toLowerCase().includes(k));
  return key ? categoryIcons[key] : "📦";
};

const AUTOPLAY_MS = 5000;

export default function Hero({ categories = [] }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* fade out, switch, fade back in */
  const goTo = useCallback((idx: number) => {
    if (timer.current) clearTimeout(timer.current);
    setAnimating(true);
    timer.current = setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  /* auto-slide; waits while the visitor is hovering or using the controls */
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo((current + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, current, goTo]);

  const slide = slides[current];

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex gap-3 sm:gap-4">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div
            className="px-4 py-3 text-white text-sm font-bold flex items-center gap-2"
            style={{ background: "var(--grad-hero)" }}
          >
            <ShoppingBag className="w-4 h-4" />
            All Categories
          </div>

          {/* Absolute so a long list scrolls instead of stretching the hero. */}
          <div className="relative min-h-0 flex-1">
          <div className="absolute inset-0 overflow-y-auto">
            {categories.length === 0 && (
              <p className="px-4 py-6 text-sm text-gray-500">Categories will appear here once they are added.</p>
            )}
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group relative flex items-center gap-3 border-b border-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors last:border-0 hover:bg-brand-green-50 focus-visible:bg-brand-green-50"
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] origin-center scale-y-0 bg-brand-green-600 transition-transform group-hover:scale-y-100" />
                <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-brand-green-50 text-base transition-transform group-hover:scale-110">
                  {cat.Image ? <Image src={cat.Image} alt="" fill sizes="32px" className="object-cover" /> : getCategoryIcon(cat.slug)}
                </span>

                <span className="min-w-0 flex-1 truncate font-medium group-hover:text-brand-green-700">
                  {cat.name}
                </span>
                <ChevronRight aria-hidden className="h-3.5 w-3.5 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-green-600" />
              </Link>
            ))}
          </div>
          </div>

          <Link href="/products" className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5 text-sm font-semibold text-brand-green-700 transition-colors hover:bg-brand-green-50">
            All products
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </aside>

        {/* Hero Slider */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Current offers"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}   
          className="group/hero flex-1 min-w-0 rounded-2xl overflow-hidden relative min-h-[280px] sm:min-h-[320px] md:min-h-[380px] shadow-lg"
        >
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

          {/* Depth: soft light behind the product, darker edge behind the text */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-white/5" />

          {/* Content */}
          <div
            className={cn(
              "relative z-10 h-full flex items-center px-6 sm:px-8 md:px-12 py-10 sm:py-12 md:py-14 transition-all duration-300",
              animating
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            )}
          >
            {/* Left */}
            <div className="flex-1 text-white space-y-3 max-w-xs md:max-w-sm relative z-10">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ring-1 ring-white/20"
                style={{
                  background: `linear-gradient(135deg,${slide.accentFrom},${slide.accentTo})`,
                }}
              >
                <Tag className="w-3 h-3" />
                {slide.tag}
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]">
                  {slide.heading}
                </h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.25)]">
                  {slide.subheading}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-20 h-20 flex-shrink-0 flex flex-col items-center justify-center rounded-full border-4 border-amber-300/80 bg-black/15 backdrop-blur-sm">
                  <span className="text-2xl font-black tabular-nums">
                    {slide.discount}%
                  </span>
                  <span className="text-[10px] font-bold tracking-wider">OFF</span>
                </div>

                <div>
                  <p className="text-sm font-bold text-amber-300">
                    {slide.label}
                  </p>
                  <p className="text-xs text-white/70">
                    {slide.product}
                  </p>
                </div>
              </div>

              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:-translate-y-0.5 active:translate-y-0 transition shadow-[var(--shadow-cta)] min-h-11 ring-1 ring-white/25"
                style={{
                  background: "var(--grad-cta)",
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
                className="max-h-[320px] object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    "relative block h-2.5 overflow-hidden rounded-full transition-all",
                    i === current ? "w-8 bg-white/35" : "w-2.5 bg-white/40 hover:bg-white/70"
                  )}
                >
                  {i === current && (
                    <span
                      key={`${current}-${paused}`}
                      className="hero-progress absolute inset-0 origin-left rounded-full bg-white"
                      style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() =>
              goTo((current - 1 + slides.length) % slides.length)
            }
            aria-label="Previous slide"
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition z-20 lg:opacity-0 lg:group-hover/hero:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              goTo((current + 1) % slides.length)
            }
            aria-label="Next slide"
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition z-20 lg:opacity-0 lg:group-hover/hero:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
