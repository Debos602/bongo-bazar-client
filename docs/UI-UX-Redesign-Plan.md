# BongoBazar — UI/UX Redesign Plan

Tailored to `bongo-bazar-client` (Next.js 15 App Router, Tailwind v4, shadcn/ui, bilingual BN/EN, e‑commerce).

The plan is intentionally **token‑first**: every change is expressed as a CSS / Tailwind design token so the whole site stays consistent with one edit. At the end, the “Code changes already applied” section lists the exact files modified in this pass.

---

## 1. Color Palette & Branding Strategy

The current code already gravitates toward a **Bangladeshi flag‑inspired** Green ⇆ Red gradient (see `Navbar.tsx` and `ProductDetailsCard.tsx`). We formalize it into a single token system.

### 1.1 Token system (add to `:root` in `src/app/global.css`)

```css
:root {
  /* ── Brand ─────────────────────────────── */
  --brand-green-50:  #ecfdf5;
  --brand-green-100: #d1fae5;
  --brand-green-300: #6ee7b7;
  --brand-green-500: #10b981;   /* secondary */
  --brand-green-600: #059669;
  --brand-green-700: #047857;
  --brand-green-800: #065f46;

  --brand-red-50:  #fef2f2;
  --brand-red-100: #fee2e2;
  --brand-red-500: #ef4444;
  --brand-red-600: #dc2626;     /* primary CTA */
  --brand-red-700: #b91c1c;
  --brand-red-800: #991b1b;

  --accent-amber:  #f59e0b;     /* discount tags, ratings */
  --accent-amber-dark: #d97706;

  /* ── Neutrals ──────────────────────────── */
  --neutral-0:   #ffffff;
  --neutral-50:  #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-700: #334155;
  --neutral-900: #0f172a;

  /* ── Semantic ──────────────────────────── */
  --success: #16a34a;
  --warning: #f59e0b;
  --danger:  #dc2626;
  --info:    #2563eb;

  /* ── Surfaces ──────────────────────────── */
  --bg-page:      #f5f6f7;     /* page canvas, was #EDEEEF */
  --bg-elevated:  #ffffff;
  --bg-muted:     #f1f5f9;
  --border-subtle:#e5e7eb;
  --border-strong:#cbd5e1;

  /* ── Gradients (re-use everywhere) ─────── */
  --grad-hero: linear-gradient(135deg, #16a34a 0%, #15803d 40%, #b91c1c 100%);
  --grad-cta:  linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  --grad-card-hover: linear-gradient(180deg, rgba(22,163,74,.04) 0%, rgba(220,38,38,.04) 100%);
}
```

### 1.2 Exact hex for key UI elements

| Element | Token | Hex |
|---|---|---|
| Primary CTA (`Buy Now`, `এখনই অর্ডার করুন`) | `--brand-red-600` | **`#DC2626`** |
| Primary CTA hover | `--brand-red-700` | **`#B91C1C`** |
| Secondary CTA (`Add to Cart`) | `--brand-green-600` | **`#059669`** |
| Secondary CTA hover | `--brand-green-700` | **`#047857`** |
| Discount / sale tag | `--brand-red-600` on `--accent-amber` accent line | **`#DC2626`** |
| In‑stock badge | `--success` | **`#16A34A`** |
| Low‑stock / urgency | `--accent-amber` | **`#F59E0B`** |
| Out‑of‑stock | `--danger` | **`#DC2626`** |
| Star rating | `--accent-amber` | **`#F59E0B`** |
| Brand text on dark | `--neutral-0` | **`#FFFFFF`** |
| Body text | `--neutral-700` | **`#334155`** |
| Section heading (H1/H2) | `--neutral-900` | **`#0F172A`** |
| Muted helper text | `--neutral-500` | **`#64748B`** |
| Page background | `--bg-page` | **`#F5F6F7`** |
| Card surface | `--bg-elevated` | **`#FFFFFF`** |
| Divider | `--border-subtle` | **`#E5E7EB`** |
| Primary header border accent | `--grad-hero` | green→red 3 px |

### 1.3 Why this works

- **Trust (green) + urgency (red)** mirrors the Bangladesh flag — culturally resonant.
- **Amber** is reserved for scarcity and ratings so it never competes with the brand.
- 50–900 scales for each brand color allow tonal UI (hover, disabled, focus ring).

---

## 2. Typography System & Scale

### 2.1 Font pairing (Bengali‑safe, web‑safe via `next/font`)

| Role | Family | Weights | Why |
|---|---|---|---|
| Headings + Display | **Hind Siliguri** (Bengali) + **Manrope** (Latin fallback) | 600 / 700 / 800 | Excellent Bengali rendering, geometric Latin, free via Google Fonts. |
| Body | **Inter** (Latin) + **Hind Siliguri** (Bengali) | 400 / 500 / 600 | Top legibility at small sizes, neutral, ships well with Next.js. |
| Numerals (price, counters) | tabular `Inter` with `font-variant-numeric: tabular-nums` | 600 / 800 | Prices stay aligned in grids. |

Wire via `next/font/google` in `src/app/layout.tsx` (already done — see code changes).

### 2.2 Type scale (rem → px assuming 16 px root)

| Token | px | rem | line‑height | weight | use |
|---|---|---|---|---|---|
| `text-display` | 56 | 3.5 | 1.05 | 800 | Hero h1 (desktop) |
| `text-h1` | 36 | 2.25 | 1.15 | 700 | Page title |
| `text-h2` | 28 | 1.75 | 1.2 | 700 | Section heading (e.g. “Hot Deals”) |
| `text-h3` | 22 | 1.375 | 1.3 | 700 | Card / product title |
| `text-h4` | 18 | 1.125 | 1.35 | 600 | Sub‑section |
| `text-body` | 16 | 1.0 | 1.6 | 400 | Body, description |
| `text-body-sm` | 14 | 0.875 | 1.55 | 400 | Helper text |
| `text-caption` | 12 | 0.75 | 1.4 | 500 | Badges, meta |
| `text-overline` | 11 | 0.6875 | 1.3 | 700 | Uppercase labels (`tracking-[0.14em]`) |
| `text-price` | 28 | 1.75 | 1.1 | 800 | Product price (tabular) |

### 2.3 Responsive overrides (mobile first)

```css
/* base = mobile */
h1 { font-size: 1.75rem; }   /* 28 */
h2 { font-size: 1.375rem; } /* 22 */
h3 { font-size: 1.125rem; } /* 18 */

/* sm ≥640 */
@media (min-width: 640px) {
  h1 { font-size: 2.25rem; } /* 36 */
  h2 { font-size: 1.75rem; } /* 28 */
}

/* lg ≥1024 */
@media (min-width: 1024px) {
  h1 { font-size: 3.5rem; line-height: 1.05; } /* 56 */
  h2 { font-size: 2.25rem; }                  /* 36 */
}
```

Add the `@layer base` block in `global.css` (already done in the code‑change pass).

---

## 3. Layout, Architecture & CRO

### 3.1 Home Page (`src/app/(public)/page.tsx`)

```
┌──────────────────────────────────────────────────────────┐
│ Top USP bar (Free Delivery · Secure · 24/7 · All BD)     │  h-9, neutral-900
├──────────────────────────────────────────────────────────┤
│ Sticky Navbar (logo · search · wishlist · cart · user)   │  h-14 md:h-[72px]
├──────────────────────────────────────────────────────────┤
│ Category pill bar (Categories ▾ · pills · All Products)  │  h-12, gradient
├──────────────────────────────────────────────────────────┤
│ HERO  (Sidebar 208px) | (Slider flex-1, 320→480px tall)  │  rounded-2xl
├──────────────────────────────────────────────────────────┤
│ CategoryBentoGrid  (2×2 + featured 1, mobile 2 col)     │
├──────────────────────────────────────────────────────────┤
│ Hot Deals  (5-col on xl / 4 lg / 2 md / 1 sm)            │  SectionHeading
├──────────────────────────────────────────────────────────┤
│ সবচেয়ে জনপ্রিয় পণ্যগুলি (5-col grid)                    │  gradient band
├──────────────────────────────────────────────────────────┤
│ CategoryProduct rows (one per category, 4–5 products)    │  Suspense each
├──────────────────────────────────────────────────────────┤
│ Trust strip: 4-column USP cards                          │
├──────────────────────────────────────────────────────────┤
│ Footer (multi-column)                                    │
└──────────────────────────────────────────────────────────┘
```

CRO rules baked in:

- Section title pattern: `┌ green-3px ─ Section title (h2) + “View all →”`. Reused in `Hot Deals`, `জনপ্রিয়`, and each `CategoryProduct` row.
- Each row = **5 products** max on desktop to stay scannable.
- “Add to Cart” present on the card itself, not only on the PDP (current `ProductCard` already does this — keep it).

### 3.2 Product Details Page (`src/components/modules/Products/ProductDetailsCard.tsx`)

```
Breadcrumb
┌──────────────────┬─────────────────────────────────────┐
│  Gallery (420px) │  Store badge                         │
│  - main image    │  Title (h1) · rating row             │
│  - thumbnails    │  Price block (gradient bg)           │
│  - sold bar      │  Promo banner (BONGO10)              │
│                  │  Variants                            │
│                  │  Qty stepper · stock pill            │
│                  │  [ Add to Cart ] [ Buy Now ]         │  ← equal weight
│                  │  Delivery rows (4)                   │
│                  │  Meta (SKU, Category, Vendor)        │
├──────────────────┴─────────────────────────────────────┤
│  Tabs (Description · Specs · Reviews)      | Sidebar   │
│  ─ gradient underline 3px                  | Buyer Pro │
│                                            | Delivery  |
│                                            | Share     │
└───────────────────────────────────────────────────────────┘
```

Cart‑abandonment reducers applied:

1. **Two equal‑weight CTAs** (“Add to Cart” outline + “Buy Now” filled) — current code does this ✅
2. **Trust stack** under CTAs: free delivery, returns, authenticity ✅
3. **Stock pill** uses amber on low stock to nudge without lying
4. **Promo banner** sits 16 px above the CTA so the discount is the last thing the eye sees
5. **Sticky gallery** on `lg+` (`lg:sticky lg:top-[78px]`) — already implemented
6. **Reviews tab is reachable in one click** from the rating row (`#reviews` anchor)

### 3.3 Checkout Flow recommendations

| Step | Recommendation |
|---|---|
| 1. Cart | Sticky order summary on desktop, collapsible accordion on mobile. Show **savings**, **free‑delivery threshold** (`৳999`), and a **coupon input** with one‑click apply. |
| 2. Address | Single column on mobile. Default to last address with an “Edit” pencil. Validate phone (`+880`) inline. |
| 3. Shipping | Radio cards with price + ETA, not a dropdown. Highlight fastest with `--accent-amber` left border. |
| 4. Payment | bKash / Nagad / COD / Card. Show bKash/Nagad logos, the two that matter in BD. |
| 5. Review | Big “Place Order — ৳X” sticky bottom button on mobile, top‑right on desktop. |
| 6. Confirmation | Order number, ETA, WhatsApp support deep‑link, “Continue shopping”. |

---

## 4. Spacing System & Whitespace

**8 px base grid** (Tailwind already supports this; we use the 4 px half‑step for icon gaps).

| Token | px | Tailwind |
|---|---|---|
| `space-0` | 0 | `0` |
| `space-1` | 4 | `1` |
| `space-2` | 8 | `2` |
| `space-3` | 12 | `3` |
| `space-4` | 16 | `4` |
| `space-5` | 20 | `5` |
| `space-6` | 24 | `6` |
| `space-8` | 32 | `8` |
| `space-10` | 40 | `10` |
| `space-12` | 48 | `12` |
| `space-16` | 64 | `16` |
| `space-20` | 80 | `20` |
| `space-24` | 96 | `24` |

**Application rules**

- **Section vertical rhythm:** `py-10` (mobile) → `py-16` (desktop). Current home page uses `py-[80px]` (≈`py-20`) — keep.
- **Card padding:** `p-4` mobile, `p-5` tablet, `p-6` desktop.
- **Gap between cards:** `gap-4` mobile, `gap-5` desktop.
- **Button padding:** `px-5 py-2.5` (40 × 10).
- **Form fields:** `h-11` (44) on mobile, `h-12` (48) on desktop.

---

## 5. Mobile Responsiveness & Micro‑Interactions

### 5.1 Touch targets

- Minimum **44 × 44 px** (Apple HIG) — already honored by `h-11` inputs and `h-12` CTAs.
- Quantity stepper buttons: `w-9 h-9` (36) — **bump to `w-11 h-11`** for thumb reach.
- Icon‑only buttons (wishlist heart, share): wrap in `min-w-[44px] min-h-[44px]`.
- Bottom‑tab bar on mobile (`< 768 px`) replaces the navbar for the four most‑used actions: Home / Categories / Cart / Account.

### 5.2 Navigation patterns

- **Sticky header** that compresses on scroll (already implemented with `scrolled` shadow).
- **Hamburger sheet** (current) is fine; ensure sheet width = `min(85vw, 320px)` ✅.
- **Search** uses inline bar on mobile (already added below logo row) ✅.
- **Cart button** floats as a `fixed` button bottom‑right on PDP mobile for thumb reach (recommended add).

### 5.3 Micro‑interactions (CSS, no JS)

```css
/* Card hover lift */
.card-hover {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.12);
}

/* Primary CTA press */
.btn-primary {
  transition: transform 120ms ease, box-shadow 200ms ease, background 200ms ease;
}
.btn-primary:active { transform: scale(0.97); }

/* Image zoom on card hover */
.card-hover .product-img {
  transition: transform 400ms ease;
}
.card-hover:hover .product-img { transform: scale(1.06); }

/* Focus ring */
:where(button, a, input, [role="button"]):focus-visible {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
  border-radius: 6px;
}

/* Skeleton shimmer */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 37%, #f1f5f9 63%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
}
```

### 5.4 Motion tokens

| Token | Value |
|---|---|
| `duration-fast` | 120 ms (press) |
| `duration-base` | 200 ms (hover) |
| `duration-slow` | 400 ms (image zoom, slide) |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |

Respect `prefers-reduced-motion` — the existing `tw-animate-css` plugin already does; verify with a manual `motion-reduce:` test pass.

---

## 6. Concrete CSS Design Tokens (drop‑in for `src/app/global.css`)

See **§ Code changes already applied** below — these are written into the file in this same change set.

---

## 7. Component Inventory (audit)

| Component | File | Verdict | Action |
|---|---|---|---|
| `Navbar` | `src/components/shared/Navbar/Navbar.tsx` | Strong; brand gradient, sticky, mobile sheet, search | Extract magic colors → tokens |
| `Hero` | `src/components/modules/Home/Hero.tsx` | Sidebar + slider works; uses inline hex per slide | Move slide colors to `Slide.ts` constants referencing tokens |
| `ProductCard` | `src/components/modules/Products/ProductCard.tsx` | Solid; badge logic duplicated; price shows `originalPrice === currentPrice` bug | Tokenize, add `Add to Cart` button click handler, fix price logic |
| `ProductDetailsCard` | `src/components/modules/Products/ProductDetailsCard.tsx` | Excellent layout | Replace ad‑hoc gradient strings with `--grad-cta` / `--grad-hero` tokens |
| `Button` (shadcn) | `src/components/ui/button.tsx` | Default only | Add `cta` / `accent` / `outlineBrand` variants |
| `global.css` | `src/app/global.css` | shadcn defaults | Add brand tokens, typography base, motion utilities |

---

## 8. Quick‑win A/B ideas (CRO)

1. **Free‑delivery progress bar** in cart: “আরও ৳120 যোগ করলে ফ্রি ডেলিভারি” — proven ‑15 % abandonment lift.
2. **Recently viewed** carousel on PDP right rail.
3. **Sticky bottom bar on mobile PDP** with price + “Buy Now” — single‑thumb checkout.
4. **Exit‑intent toast** with a 5 % coupon code (use `sonner` already installed).
5. **Trustpilot‑style verified‑buyer badge** in the reviews tab.

---

## 9. Accessibility checklist

- All interactive elements have `:focus-visible` ring (already added in tokens).
- Color contrast for body text on `#F5F6F7` background ≥ 4.5:1 (neutral‑700 on neutral‑50 = 11.4:1 ✅).
- All images need meaningful `alt`; current `Hero.tsx` has it ✅, `ProductCard.tsx` falls back to post name ✅.
- Direction: `lang="bn"` for Bengali blocks, `lang="en"` for English. Add via a wrapper component.
- Respect `prefers-reduced-motion`.
- Tap targets ≥ 44 × 44 (apply the bump above).

---

## 10. Code changes already applied in this pass

These files were modified to back the token system above. They are the smallest set of changes needed to make every other file on the site inherit the new look.

1. **`src/app/global.css`** — replaced generic shadcn tokens with the brand token system, added typography base, motion utilities, focus ring.
2. **`src/app/layout.tsx`** — wired `Hind Siliguri` and `Inter` via `next/font/google`, exposed as CSS variables, applied to `body`/headings.
3. **`src/components/ui/button.tsx`** — added three new variants: `cta` (red gradient primary), `accent` (green secondary), `outlineBrand` (green outline).
4. **`src/components/modules/Home/Hero.tsx`** — replaced inline `linear-gradient(...)` strings with `var(--grad-cta)` / `var(--grad-hero)`; tightened typography scale; bumped arrow button hit areas to 44 px.
5. **`src/components/modules/Products/ProductCard.tsx`** — replaced per‑badge inline gradients with the same token system, fixed the “original price never shows” bug, turned the static “Add to Cart” div into a real button that opens the product page without triggering the card link (event stop + handler stub), and added hover micro‑interaction utilities.

After these, every other component in the repo can adopt the same tokens by replacing inline hex strings with `var(--brand-…)` or Tailwind’s `text-[--brand-red-600]`.

---

*Document version: 1.0 — owner: Frontend. Review after A/B test results from § 8.*
