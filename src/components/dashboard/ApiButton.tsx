"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { apiAction } from "@/actions/api";
import { cn } from "@/lib/utils";

type Props = {
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  // Destructive actions need a second click on the same button.
  confirm?: string;
};

export const buttonStyles = {
  primary: "bg-emerald-800 text-white hover:bg-emerald-900",
  ghost: "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
  danger: "bg-white text-red-700 ring-1 ring-red-200 hover:bg-red-50",
};

export default function ApiButton({ method, path, body, children, variant = "ghost", confirm }: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  const run = () => {
    if (confirm && !armed) {
      setArmed(true);
      return;
    }
    setArmed(false);
    start(async () => {
      const res = await apiAction(method, path, body);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      const url = res.data?.checkoutUrl;
      if (typeof url === "string") {
        window.location.href = url;
        return;
      }
      toast.success(res.message);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={run}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-semibold transition-colors disabled:opacity-50",
        armed ? "bg-red-700 text-white" : buttonStyles[variant],
      )}
    >
      {pending && <Loader2 size={12} className="animate-spin" aria-hidden />}
      {armed ? confirm : children}
    </button>
  );
}
