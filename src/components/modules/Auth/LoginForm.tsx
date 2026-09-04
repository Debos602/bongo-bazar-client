"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import AuthShell from "@/components/modules/Auth/AuthShell";
import { AuthField } from "@/components/modules/Auth/AuthField";

/* ─── Theme token (matches navbar / hot-deals / details page) ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";

export default function LoginForm() {
  const form = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const { setValue } = form;
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();

  const applyCredentials = (email: string, password: string) => {
    setValue("email", email, { shouldValidate: false, shouldDirty: true, shouldTouch: true });
    setValue("password", password, { shouldValidate: false, shouldDirty: true, shouldTouch: true });
  };

  const onSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const rawCallbackUrl = searchParams.get("callbackUrl");
      const callbackUrl = rawCallbackUrl ?? "/";

      await signIn("credentials", {
        ...values,
        redirect: true,
        callbackUrl,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      pill="Returning user"
      titlePrefix="Welcome to"
      subtitle="Sign in to your account and continue shopping"
      footer={
        <p className="text-center mt-6 text-[13.5px] text-slate-500 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-extrabold text-emerald-700 hover:text-emerald-900
                       border-b border-transparent hover:border-emerald-600
                       pb-px transition-all"
          >
            Create one free
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-between -mt-1">
            <label className="flex items-center gap-2 text-[12.5px] text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-slate-300 text-emerald-600
                           focus:ring-emerald-500/30"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-[12px] font-bold text-emerald-700
                         hover:text-emerald-900 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Quick-fill demo credentials */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { label: "User", email: "user@example.com", password: "UserPass123" },
              { label: "Vendor", email: "vendor@example.com", password: "VendorPass123" },
              { label: "Admin", email: "admin@example.com", password: "AdminPass123" },
            ].map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => applyCredentials(c.email, c.password)}
                className="py-2 rounded-lg text-[12px] font-bold text-slate-700
                           bg-slate-50 border border-slate-200
                           hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700
                           transition-colors"
                style={{}}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Submit */}
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
            <LogIn size={16} />
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </Form>

      {/* OR divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200" />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400"
          style={{}}
        >
          or continue with
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-2 h-11 rounded-xl
                     border border-slate-200 bg-white text-slate-700
                     text-[13px] font-bold
                     hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-800
                     transition-all duration-200"
          style={{}}
        >
          <Image src="https://img.icons8.com/ios-glyphs/24/000000/github.png" alt="GitHub" width={16} height={16} />
          GitHub
        </button>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center gap-2 h-11 rounded-xl
                     border border-slate-200 bg-white text-slate-700
                     text-[13px] font-bold
                     hover:border-emerald-300 hover:bg-emerald-50/60 hover:text-emerald-800
                     transition-all duration-200"
          style={{}}
        >
          <Image src="https://img.icons8.com/color/24/google-logo.png" alt="Google" width={16} height={16} />
          Google
        </button>
      </div>
    </AuthShell>
  );
}
