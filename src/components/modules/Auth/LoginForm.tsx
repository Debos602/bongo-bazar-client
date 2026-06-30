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
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const form = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { setValue } = form;
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();

    const applyCredentials = (email: string, password: string) => {
        setValue("email", email, {
            shouldValidate: false,
            shouldDirty: true,
            shouldTouch: true,
        });
        setValue("password", password, {
            shouldValidate: false,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onSubmit = async (values: FieldValues) => {
        setIsLoading(true);
        try {
            const rawCallbackUrl = searchParams.get("callbackUrl");
            const callbackUrl = rawCallbackUrl ?? "/";

            // Use a server-side redirect so the auth cookie is set correctly in production
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
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Min. 8 characters"
                                                    className="bg-[#fdf8f0] border-[#e8ddd0] rounded-[10px] text-[#1a1208] placeholder:text-[#c4b8a8] focus:border-[#006a4e] focus:ring-[#006a4e]/10 focus:bg-white pr-11"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    className="absolute inset-y-0 right-3 flex items-center justify-center text-[#7a6a5a] hover:text-[#1a1208] transition-colors"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7Zm0 12.9c-4.1 0-7.3-2.4-9-5.9 1.7-3.5 4.9-5.9 9-5.9 4.1 0 7.3 2.4 9 5.9-1.7 3.5-4.9 5.9-9 5.9Zm0-9.4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path d="M12 5c-7 0-11 7-11 7s4 7 11 7c1.5 0 2.9-.2 4.3-.6l2.4 2.4 1.4-1.4-2.5-2.5C20.3 14.1 22 12.1 22 12c-1.7-3.5-4.9-5.9-9-5.9-1.1 0-2.2.2-3.2.6l1.6 1.6c.7-.2 1.4-.3 2.1-.3Zm-9.9-1.4L1.3 3.7 3 2 21 20l-1.7 1.7-2-2C16 21 14.1 21 12 21c-7 0-11-7-11-7 1.2-2.4 3.1-4.4 5.4-5.7l-1.3-1.3Zm7.3 7.3 4.2 4.2a3.48 3.48 0 0 1-4.2-4.2Zm-2.6-2.6 2.6 2.6-2.6-2.6Z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[#dc143c] text-xs font-semibold" />
                                    </FormItem>
                                )}
                            />

                            {/* Preset credentials */}
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => applyCredentials("admin@example.com", "AdminPass123")}
                                    className="py-2 rounded-[10px] text-[13px] font-bold text-[#1a1208] bg-[#f7f1eb] border border-[#e8ddd0] hover:bg-[#f3e8db] transition-colors"
                                >
                                    Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyCredentials("vendor@example.com", "VendorPass123")}
                                    className="py-2 rounded-[10px] text-[13px] font-bold text-[#1a1208] bg-[#f7f1eb] border border-[#e8ddd0] hover:bg-[#f3e8db] transition-colors"
                                >
                                    Vendor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => applyCredentials("user@example.com", "UserPass123")}
                                    className="py-2 rounded-[10px] text-[13px] font-bold text-[#1a1208] bg-[#f7f1eb] border border-[#e8ddd0] hover:bg-[#f3e8db] transition-colors"
                                >
                                    User
                                </button>
                            </div>

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