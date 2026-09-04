"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/modules/Auth/AuthShell";
import { AuthField } from "@/components/modules/Auth/AuthField";

/* ─── Theme token (matches navbar / hot-deals / details page) ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";

export default function RegisterForm() {
  const form = useForm<FieldValues>({
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await register(values);
      if (res?.success) {
        toast.success(res?.message || "User Registered Successfully");
        router.push("/login");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      pill="New account"
      titlePrefix="Join"
      subtitle="Create your free account and start shopping today"
      footer={
        <p className="text-center mt-6 text-[13.5px] text-slate-500 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-extrabold text-emerald-700 hover:text-emerald-900
                       border-b border-transparent hover:border-emerald-600
                       pb-px transition-all"
          >
            Sign in here
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <AuthField
              control={form.control}
              name="name"
              label="Full name"
              placeholder="Your name"
            />
            <AuthField
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+880 …"
            />
          </div>

          <AuthField
            control={form.control}
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
          />

          <AuthField
            control={form.control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-3 flex items-center justify-center
                           text-slate-400 hover:text-emerald-700 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {/* Password strength */}
          <PasswordStrength password={form.watch("password") || ""} />

          {/* Terms */}
          <p className="text-[12.5px] text-slate-500 text-center leading-relaxed pt-1">
            By registering you agree to our{" "}
            <Link
              href="/terms"
              className="text-emerald-700 font-bold hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-emerald-700 font-bold hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-1 rounded-xl text-[14px] font-extrabold tracking-wide
                       text-white disabled:opacity-60 disabled:cursor-not-allowed
                       hover:-translate-y-px active:scale-[0.99]
                       transition-all duration-200
                       shadow-lg shadow-emerald-900/20
                       hover:shadow-xl hover:shadow-emerald-900/30
                       flex items-center justify-center gap-2"
            style={{
              background: NAV_GRAD,}}
          >
            <UserPlus size={16} />
            {isLoading ? "Creating account…" : "Create My Account"}
          </button>
        </form>
      </Form>
    </AuthShell>
  );
}

/* ── Password strength indicator (emerald theme) ── */
function PasswordStrength({ password }: { password: string }) {
  const len = password.length;

  const getBarColor = (index: number) => {
    if (len >= 12) return "bg-emerald-600";
    if (len >= 8 && index <= 2) return "bg-emerald-500";
    if (len >= 6 && index <= 1) return "bg-amber-500";
    if (len >= 4 && index === 0) return "bg-rose-500";
    return "bg-slate-200";
  };

  const label =
    len === 0
      ? ""
      : len < 6
      ? "Weak"
      : len < 8
      ? "Fair"
      : len < 12
      ? "Good"
      : "Strong";

  if (!password) return null;

  return (
    <div className="-mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${getBarColor(
              i
            )}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <p
          className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-slate-500"
          style={{}}
        >
          {label}
        </p>
        <p className="text-[11px] text-slate-400">Use 8+ characters</p>
      </div>
    </div>
  );
}
