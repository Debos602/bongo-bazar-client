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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const form = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: FieldValues) => {
        setIsLoading(true);
        try {
            signIn("credentials", {
                ...values,
                callbackUrl: "/dashboard",
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: "google" | "github") => {
        signIn(provider, { callbackUrl: "/dashboard" });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@700;800&family=Nunito:wght@300;400;500;600;700;800&display=swap');

                /* ── CSS Variables ── */
                :root {
                    --bb-red:         #dc143c;
                    --bb-red-dark:    #a50e2c;
                    --bb-red-soft:    #fef1f4;
                    --bb-green:       #006a4e;
                    --bb-green-dark:  #004d38;
                    --bb-green-soft:  #edf7f4;
                    --bb-cream:       #fdf8f0;
                    --bb-warm:        #f7efe2;
                    --bb-text:        #1a1208;
                    --bb-muted:       #7a6a5a;
                    --bb-border:      #e8ddd0;
                    --bb-white:       #ffffff;
                }

                /* ── Page Shell ── */
                .bb-root {
                    font-family: 'Nunito', sans-serif;
                    min-height: 100vh;
                    background-color: var(--bb-cream);
                    background-image:
                        radial-gradient(ellipse 800px 500px at 5% 10%, rgba(220,20,60,0.07) 0%, transparent 70%),
                        radial-gradient(ellipse 700px 700px at 95% 92%, rgba(0,106,78,0.08) 0%, transparent 70%),
                        url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zM5 15h2v2H5zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zM10 20h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2z' fill='%23c4a882' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px 16px;
                    position: relative;
                    overflow: hidden;
                }

                /* Decorative arcs */
                .bb-arc {
                    position: fixed;
                    pointer-events: none;
                    border-radius: 50%;
                    opacity: 0.12;
                    z-index: 0;
                }
                .bb-arc-tl {
                    width: 460px; height: 460px;
                    top: -200px; left: -180px;
                    background: var(--bb-red);
                }
                .bb-arc-br {
                    width: 400px; height: 400px;
                    bottom: -160px; right: -140px;
                    background: var(--bb-green);
                }

                /* ── Card ── */
                .bb-card {
                    position: relative;
                    z-index: 1;
                    background: var(--bb-white);
                    border-radius: 22px;
                    width: 100%;
                    max-width: 460px;
                    box-shadow:
                        0 0 0 1px var(--bb-border),
                        0 4px 6px -2px rgba(26,18,8,0.04),
                        0 24px 56px -8px rgba(26,18,8,0.12);
                    overflow: hidden;
                    animation: bbCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                @keyframes bbCardIn {
                    from { opacity: 0; transform: translateY(28px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* Bangladesh flag two-color top bar */
                .bb-flag-bar {
                    display: flex;
                    height: 7px;
                }
                .bb-flag-bar-red   { flex: 1; background: var(--bb-red); }
                .bb-flag-bar-green { flex: 1; background: var(--bb-green); }

                /* ── Card body ── */
                .bb-body {
                    padding: 38px 44px 32px;
                }

                /* ── Header ── */
                .bb-header {
                    text-align: center;
                    margin-bottom: 28px;
                    animation: bbFadeUp 0.45s 0.1s cubic-bezier(0.22,1,0.36,1) both;
                }

                .bb-logo {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 62px;
                    height: 62px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--bb-red) 0%, var(--bb-green) 100%);
                    margin-bottom: 14px;
                    box-shadow: 0 4px 20px rgba(220,20,60,0.2), 0 4px 20px rgba(0,106,78,0.15);
                    position: relative;
                }
                .bb-logo::after {
                    content: '';
                    position: absolute;
                    inset: 3px;
                    background: var(--bb-white);
                    border-radius: 50%;
                }
                .bb-logo-text {
                    position: relative;
                    z-index: 1;
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    background: linear-gradient(135deg, var(--bb-red), var(--bb-green));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                    letter-spacing: 0.02em;
                }

                .bb-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 30px;
                    font-weight: 800;
                    color: var(--bb-text);
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                    margin: 0 0 6px;
                }
                .bb-title .t-red   { color: var(--bb-red); }
                .bb-title .t-green { color: var(--bb-green); }

                .bb-subtitle {
                    font-size: 13px;
                    color: var(--bb-muted);
                    font-weight: 400;
                    margin: 0;
                    line-height: 1.5;
                }

                /* ── Section divider ── */
                .bb-rule {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, var(--bb-border) 30%, var(--bb-border) 70%, transparent 100%);
                    margin: 0 0 26px;
                }

                /* ── Field wrapper ── */
                .bb-field {
                    margin-bottom: 18px;
                    animation: bbFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-field:nth-child(1) { animation-delay: 0.18s; }
                .bb-field:nth-child(2) { animation-delay: 0.26s; }

                @keyframes bbFadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Label override */
                .bb-field label,
                .bb-field [data-slot="label"] {
                    font-family: 'Nunito', sans-serif !important;
                    font-size: 11.5px !important;
                    font-weight: 800 !important;
                    letter-spacing: 0.08em !important;
                    text-transform: uppercase !important;
                    color: var(--bb-muted) !important;
                    margin-bottom: 7px !important;
                    display: block !important;
                }

                /* Input override */
                .bb-field input {
                    font-family: 'Nunito', sans-serif !important;
                    font-size: 14px !important;
                    font-weight: 500 !important;
                    color: var(--bb-text) !important;
                    background: var(--bb-cream) !important;
                    border: 1.5px solid var(--bb-border) !important;
                    border-radius: 10px !important;
                    padding: 11px 14px !important;
                    width: 100% !important;
                    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s !important;
                    outline: none !important;
                    box-shadow: none !important;
                }
                .bb-field input::placeholder {
                    color: #c4b8a8 !important;
                    font-weight: 400 !important;
                }
                .bb-field input:focus {
                    background: var(--bb-white) !important;
                    border-color: var(--bb-green) !important;
                    box-shadow: 0 0 0 3px rgba(0,106,78,0.09) !important;
                }
                .bb-field p {
                    font-size: 12px !important;
                    color: var(--bb-red) !important;
                    margin-top: 5px !important;
                    font-weight: 600 !important;
                }

                /* ── Forgot link ── */
                .bb-forgot {
                    display: flex;
                    justify-content: flex-end;
                    margin: -10px 0 18px;
                }
                .bb-forgot a {
                    font-size: 12px;
                    color: var(--bb-green);
                    font-weight: 700;
                    text-decoration: none;
                    transition: color 0.15s;
                }
                .bb-forgot a:hover { color: var(--bb-green-dark); }

                /* ── Primary button ── */
                .bb-submit {
                    width: 100% !important;
                    padding: 13px !important;
                    border-radius: 11px !important;
                    font-family: 'Nunito', sans-serif !important;
                    font-size: 15px !important;
                    font-weight: 800 !important;
                    letter-spacing: 0.03em !important;
                    color: #fff !important;
                    border: none !important;
                    cursor: pointer !important;
                    position: relative !important;
                    overflow: hidden !important;
                    background: linear-gradient(108deg, var(--bb-red) 0%, #b8103a 40%, var(--bb-green) 100%) !important;
                    background-size: 220% 100% !important;
                    background-position: 0% center !important;
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.15),
                        0 4px 18px rgba(220,20,60,0.25),
                        0 2px 8px rgba(0,106,78,0.15) !important;
                    transition: background-position 0.45s ease, transform 0.18s, box-shadow 0.2s !important;
                    animation: bbFadeUp 0.45s 0.34s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-submit:hover:not(:disabled) {
                    background-position: 100% center !important;
                    transform: translateY(-1px) !important;
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        0 8px 28px rgba(220,20,60,0.28),
                        0 4px 14px rgba(0,106,78,0.2) !important;
                }
                .bb-submit:active:not(:disabled) {
                    transform: translateY(0) scale(0.99) !important;
                }
                .bb-submit:disabled {
                    opacity: 0.7 !important;
                    cursor: not-allowed !important;
                }
                /* Shimmer layer */
                .bb-submit::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 55%);
                    pointer-events: none;
                }

                /* ── OR divider ── */
                .bb-or {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 22px 0 20px;
                    animation: bbFadeUp 0.45s 0.40s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-or-line {
                    flex: 1;
                    height: 1px;
                    background: var(--bb-border);
                }
                .bb-or-text {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #b8a898;
                }

                /* ── Social grid ── */
                .bb-social-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    animation: bbFadeUp 0.45s 0.46s cubic-bezier(0.22,1,0.36,1) both;
                }

                .bb-social-btn {
                    padding: 10px 12px !important;
                    border-radius: 10px !important;
                    background: var(--bb-warm) !important;
                    border: 1.5px solid var(--bb-border) !important;
                    color: var(--bb-text) !important;
                    font-family: 'Nunito', sans-serif !important;
                    font-size: 13px !important;
                    font-weight: 700 !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 8px !important;
                    transition: background 0.18s, border-color 0.18s, transform 0.15s, box-shadow 0.18s !important;
                }
                .bb-social-btn:hover {
                    background: var(--bb-white) !important;
                    transform: translateY(-1px) !important;
                }
                .bb-social-github:hover {
                    border-color: rgba(220,20,60,0.4) !important;
                    box-shadow: 0 3px 10px rgba(220,20,60,0.09) !important;
                }
                .bb-social-google:hover {
                    border-color: rgba(0,106,78,0.4) !important;
                    box-shadow: 0 3px 10px rgba(0,106,78,0.09) !important;
                }

                /* ── Footer ── */
                .bb-footer {
                    text-align: center;
                    margin-top: 22px;
                    font-size: 13px;
                    color: var(--bb-muted);
                    font-weight: 500;
                    animation: bbFadeUp 0.45s 0.52s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-footer a {
                    color: var(--bb-green);
                    font-weight: 800;
                    text-decoration: none;
                    border-bottom: 1.5px solid transparent;
                    padding-bottom: 1px;
                    transition: border-color 0.18s, color 0.18s;
                }
                .bb-footer a:hover {
                    color: var(--bb-green-dark);
                    border-bottom-color: var(--bb-green);
                }

                /* ── Brand strip ── */
                .bb-strip {
                    background: var(--bb-warm);
                    border-top: 1px solid var(--bb-border);
                    padding: 11px 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .bb-strip-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--bb-red), var(--bb-green));
                    flex-shrink: 0;
                }
                .bb-strip-text {
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--bb-muted);
                    letter-spacing: 0.02em;
                }
                .bb-strip-text strong { color: var(--bb-red); }

                @media (max-width: 520px) {
                    .bb-body { padding: 30px 22px 26px; }
                    .bb-social-grid { grid-template-columns: 1fr; }
                    .bb-strip { padding: 11px 22px; }
                }
            `}</style>

            {/* Background arcs */}
            <div className="bb-arc bb-arc-tl" aria-hidden />
            <div className="bb-arc bb-arc-br" aria-hidden />

            <div className="bb-root">
                <div className="bb-card">

                    {/* Bangladesh flag strip */}
                    <div className="bb-flag-bar" aria-hidden>
                        <div className="bb-flag-bar-red" />
                        <div className="bb-flag-bar-green" />
                    </div>

                    <div className="bb-body">

                        {/* Header */}
                        <div className="bb-header">
                            <div className="bb-logo">
                                <span className="bb-logo-text">বব</span>
                            </div>
                            <h1 className="bb-title">
                                <span className="t-red">Bongo</span>{" "}
                                <span className="t-green">Bazar</span>
                            </h1>
                            <p className="bb-subtitle">Sign in to your account to continue</p>
                        </div>

                        <div className="bb-rule" />

                        {/* Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>

                                <div className="bb-field">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="bb-field">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••••"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Forgot password */}
                                <div className="bb-forgot">
                                    <Link href="/forgot-password">Forgot password?</Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="bb-submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing in…" : "Sign In →"}
                                </Button>
                            </form>
                        </Form>

                        {/* OR */}
                        <div className="bb-or">
                            <div className="bb-or-line" />
                            <span className="bb-or-text">or</span>
                            <div className="bb-or-line" />
                        </div>

                        {/* Social */}
                        <div className="bb-social-grid">
                            <Button
                                variant="outline"
                                className="bb-social-btn bb-social-github"
                                onClick={() => handleSocialLogin("github")}
                            >
                                <Image
                                    src="https://img.icons8.com/ios-glyphs/24/000000/github.png"
                                    alt="GitHub"
                                    width={16}
                                    height={16}
                                />
                                GitHub
                            </Button>

                            <Button
                                variant="outline"
                                className="bb-social-btn bb-social-google"
                                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            >
                                <Image
                                    src="https://img.icons8.com/color/24/google-logo.png"
                                    alt="Google"
                                    width={16}
                                    height={16}
                                />
                                Google
                            </Button>
                        </div>

                        {/* Register link */}
                        <p className="bb-footer">
                            Don&apos;t have an account?{" "}
                            <Link href="/register">Create one free</Link>
                        </p>
                    </div>

                    {/* Brand strip */}
                    <div className="bb-strip">
                        <span className="bb-strip-dot" />
                        <span className="bb-strip-text">
                            <strong>Bongo</strong> Bazar — Bangladesh&apos;s trusted marketplace
                        </span>
                        <span className="bb-strip-dot" />
                    </div>

                </div>
            </div>
        </>
    );
}