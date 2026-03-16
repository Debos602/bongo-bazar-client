"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
            email: "data@gmail.com",      // ✅ correct place
            password: "Password123!"       // ✅ correct place
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSocialLogin = (provider: "google" | "github") => {
        signIn(provider, { callbackUrl: "/dashboard" });
    };

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
        <div className="min-h-screen bg-[#fdf8f0] flex items-center justify-center px-4 py-8">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Bangladesh flag bar */}
                <div className="flex h-2">
                    <div className="flex-1 bg-[#dc143c]" />
                    <div className="flex-1 bg-[#006a4e]" />
                </div>

                <div className="px-10 py-9">

                    {/* Header */}
                    <div className="text-center mb-7">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#dc143c] to-[#006a4e] mb-3 shadow-lg relative">
                            <div className="absolute inset-1 bg-white rounded-full" />
                            <span className="relative z-10 text-sm font-bold bg-gradient-to-br from-[#dc143c] to-[#006a4e] bg-clip-text text-transparent">
                                বব
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            <span className="text-[#dc143c]">Bongo</span>{" "}
                            <span className="text-[#006a4e]">Bazar</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <hr className="border-gray-100 mb-6" />

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                            Email address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="you@example.com"
                                                className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-[#dc143c]" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="••••••••••"
                                                className="bg-[#fdf8f0] border-gray-200 focus:border-[#006a4e] focus:ring-[#006a4e]/10"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-[#dc143c]" />
                                    </FormItem>
                                )}
                            />

                            {/* Forgot password */}
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[#006a4e] font-bold hover:text-[#004d38] transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-[#dc143c] via-[#b8103a] to-[#006a4e] hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Signing in…" : "Sign In →"}
                            </Button>
                        </form>
                    </Form>

                    {/* OR divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-300">or</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Social buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocialLogin("github")}
                            className="flex items-center justify-center gap-2 border-gray-200 hover:border-[#dc143c]/40 hover:shadow-sm transition-all"
                        >
                            <Image
                                src="https://img.icons8.com/ios-glyphs/24/000000/github.png"
                                alt="GitHub"
                                width={16}
                                height={16}
                            />
                            <span className="text-sm font-bold">GitHub</span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            className="flex items-center justify-center gap-2 border-gray-200 hover:border-[#006a4e]/40 hover:shadow-sm transition-all"
                        >
                            <Image
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google"
                                width={16}
                                height={16}
                            />
                            <span className="text-sm font-bold">Google</span>
                        </Button>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#006a4e] font-extrabold hover:text-[#004d38] border-b border-transparent hover:border-[#006a4e] transition-all"
                        >
                            Create one free
                        </Link>
                    </p>
                </div>

                {/* Brand strip */}
                <div className="bg-[#f7efe2] border-t border-gray-100 px-10 py-3 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#dc143c] to-[#006a4e]" />
                    <span className="text-xs text-gray-400 font-medium">
                        <strong className="text-[#dc143c]">Bongo</strong> Bazar — Bangladesh&apos;s trusted marketplace
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#dc143c] to-[#006a4e]" />
                </div>

            </div>
        </div>
    );
}