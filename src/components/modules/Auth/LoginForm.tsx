"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
    const form = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const onSubmit = async (values: FieldValues) => {
        setIsLoading(true);
        try {
            const res = await signIn("credentials", {
                ...values,
                redirect: false,
            });

            if (res?.error) {
                console.error("Login failed:", res.error);
                return;
            }

            if (res?.ok) {
                const session = await getSession();
                const role = session?.user?.role;
                const callbackUrl = searchParams.get("callbackUrl");

                if (callbackUrl) {
                    router.push(callbackUrl);
                } else if (role === "ADMIN") {
                    router.push("/dashboard");
                } else {
                    router.push("/");
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center px-4 py-8 overflow-hidden relative">

            {/* Background arcs — mirrors register page */}
            <div className="fixed w-[460px] h-[460px] -top-[200px] -right-[180px] rounded-full bg-[#006a4e] opacity-10 pointer-events-none z-0" />
            <div className="fixed w-[400px] h-[400px] -bottom-[160px] -left-[140px] rounded-full bg-[#dc143c] opacity-10 pointer-events-none z-0" />

            {/* Card */}
            <div className="relative z-10 bg-white rounded-[22px] w-full max-w-[440px] shadow-[0_0_0_1px_#e8ddd0,0_24px_56px_-8px_rgba(26,18,8,0.12)] overflow-hidden animate-[cardIn_0.55s_cubic-bezier(0.22,1,0.36,1)_both]">

                {/* Flag bar: green | red — same order as register */}
                <div className="flex h-[7px]">
                    <div className="flex-1 bg-[#006a4e]" />
                    <div className="flex-1 bg-[#dc143c]" />
                </div>

                <div className="px-10 pt-9 pb-8 max-sm:px-5">

                    {/* Header */}
                    <div className="text-center mb-7">
                        {/* Logo circle */}
                        <div className="inline-flex items-center justify-center w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#006a4e] to-[#dc143c] mb-3 shadow-[0_4px_20px_rgba(0,106,78,0.2)] relative">
                            <div className="absolute inset-[3px] bg-white rounded-full" />
                            <span className="relative z-10 text-[17px] font-bold bg-gradient-to-br from-[#006a4e] to-[#dc143c] bg-clip-text text-transparent leading-none">
                                বব
                            </span>
                        </div>

                        <h1 className="text-[28px] font-extrabold text-[#1a1208] tracking-tight leading-tight mb-1">
                            Welcome to{" "}
                            <span className="text-[#006a4e]">Bongo</span>{" "}
                            <span className="text-[#dc143c]">Bazar</span>
                        </h1>
                        <p className="text-[13px] text-[#7a6a5a]">
                            Sign in to your account and continue shopping
                        </p>

                        {/* Step badge */}
                        <div className="inline-flex items-center gap-1.5 bg-[#edf7f4] border border-[#006a4e]/15 rounded-full px-3 py-1 mt-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006a4e] animate-pulse" />
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#006a4e]">
                                Returning user
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#e8ddd0] to-transparent mb-6" />

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[11px] font-extrabold uppercase tracking-widest text-[#7a6a5a]">
                                            Email address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                className="bg-[#fdf8f0] border-[#e8ddd0] rounded-[10px] text-[#1a1208] placeholder:text-[#c4b8a8] focus:border-[#006a4e] focus:ring-[#006a4e]/10 focus:bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#dc143c] text-xs font-semibold" />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-[11px] font-extrabold uppercase tracking-widest text-[#7a6a5a]">
                                                Password
                                            </FormLabel>
                                            <Link
                                                href="/forgot-password"
                                                className="text-[11px] font-bold text-[#006a4e] hover:text-[#004d38] hover:underline transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Min. 8 characters"
                                                className="bg-[#fdf8f0] border-[#e8ddd0] rounded-[10px] text-[#1a1208] placeholder:text-[#c4b8a8] focus:border-[#006a4e] focus:ring-[#006a4e]/10 focus:bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[#dc143c] text-xs font-semibold" />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 rounded-[11px] text-[15px] font-extrabold tracking-wide text-white border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-[#006a4e] via-[#005a40] to-[#dc143c] hover:opacity-90 hover:-translate-y-px active:scale-[0.99] transition-all duration-200 shadow-[0_4px_18px_rgba(0,106,78,0.25),0_2px_8px_rgba(220,20,60,0.15)]"
                            >
                                {isLoading ? "Signing in…" : "Sign In →"}
                            </button>
                        </form>
                    </Form>

                    {/* OR divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e8ddd0]" />
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#c4b8a8]">or</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e8ddd0]" />
                    </div>

                    {/* Social buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-[#e8ddd0] bg-[#fdf8f0] text-[#1a1208] text-[13px] font-bold hover:border-[#dc143c]/40 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                            <Image
                                src="https://img.icons8.com/ios-glyphs/24/000000/github.png"
                                alt="GitHub"
                                width={16}
                                height={16}
                            />
                            GitHub
                        </button>

                        <button
                            type="button"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-[#e8ddd0] bg-[#fdf8f0] text-[#1a1208] text-[13px] font-bold hover:border-[#006a4e]/40 hover:bg-white hover:shadow-sm transition-all duration-200"
                        >
                            <Image
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google"
                                width={16}
                                height={16}
                            />
                            Google
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="text-center mt-5 text-[13px] text-[#7a6a5a] font-medium">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#dc143c] font-extrabold hover:text-[#a50e2c] border-b border-transparent hover:border-[#dc143c] pb-px transition-all"
                        >
                            Create one free
                        </Link>
                    </p>
                </div>

                {/* Brand strip */}
                <div className="bg-[#f7efe2] border-t border-[#e8ddd0] px-10 py-3 flex items-center justify-center gap-2 max-sm:px-5">
                    <span className="w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#006a4e] to-[#dc143c] flex-shrink-0" />
                    <span className="text-[12px] text-[#7a6a5a]">
                        <strong className="text-[#006a4e]">Bongo</strong> Bazar — Bangladesh&apos;s trusted marketplace
                    </span>
                    <span className="w-[5px] h-[5px] rounded-full bg-gradient-to-br from-[#006a4e] to-[#dc143c] flex-shrink-0" />
                </div>
            </div>
        </div>
    );
}