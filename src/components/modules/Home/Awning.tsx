import { cn } from "@/lib/utils";

// The striped, scalloped shade over a market stall. It marks each shop on the page.
export default function Awning({ tone = "marigold", small, className }: { tone?: "marigold" | "green" | "red" | "teal"; small?: boolean; className?: string; }) {
  return <div aria-hidden className={cn("awning", `awning-${tone}`, small && "awning-sm", className)} />;
}
