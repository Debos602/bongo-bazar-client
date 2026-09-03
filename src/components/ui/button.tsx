"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        /* ── BongoBazar brand variants ─────────────────────────── */
        cta: [
          "text-white font-bold tracking-wide",
          "bg-[linear-gradient(135deg,#dc2626_0%,#b91c1c_100%)]",
          "shadow-[var(--shadow-cta)]",
          "hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(220,38,38,0.55)]",
        ],
        accent: [
          "text-white font-bold tracking-wide",
          "bg-[linear-gradient(135deg,#059669_0%,#047857_100%)]",
          "shadow-[0_8px_20px_-6px_rgba(5,150,105,0.45)]",
          "hover:brightness-110 hover:-translate-y-0.5",
        ],
        outlineBrand: [
          "border-2 border-brand-green-600 bg-brand-green-50 text-brand-green-700 font-semibold",
          "hover:bg-brand-green-600 hover:text-white",
        ],
        soft: "bg-brand-red-50 text-brand-red-600 hover:bg-brand-red-100",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-3",
        xs: "h-7 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-md px-3.5 has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-7 text-[15px] has-[>svg]:px-4",
        xl: "h-14 rounded-xl px-8 text-base has-[>svg]:px-5",
        touch: "min-h-11 min-w-11 h-11 px-4",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
