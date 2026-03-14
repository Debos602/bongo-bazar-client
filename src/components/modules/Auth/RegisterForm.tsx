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
import { toast } from "sonner";
import { register } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const form = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: FieldValues) => {
        setIsLoading(true);
        try {
            const res = await register(values);
            if (res?.id) {
                toast.success("User Registered Successfully");
                router.push("/login");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to register user");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@700;800&family=Nunito:wght@300;400;500;600;700;800&display=swap');

                /* ── CSS Variables ── */
                :root {
                    --bb-red:         #dc143c;
                    --bb-red-dark:    #a50e2c;
                    --bb-green:       #006a4e;
                    --bb-green-dark:  #004d38;
                    --bb-cream:       #fdf8f0;
                    --bb-warm:        #f7efe2;
                    --bb-text:        #1a1208;
                    --bb-muted:       #7a6a5a;
                    --bb-border:      #e8ddd0;
                    --bb-white:       #ffffff;
                }

                /* ── Page Shell ── */
                .bb-reg-root {
                    font-family: 'Nunito', sans-serif;
                    min-height: 100vh;
                    background-color: var(--bb-cream);
                    background-image:
                        radial-gradient(ellipse 800px 500px at 98% 5%, rgba(220,20,60,0.07) 0%, transparent 70%),
                        radial-gradient(ellipse 700px 700px at 2% 95%, rgba(0,106,78,0.08) 0%, transparent 70%),
                        url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zM5 15h2v2H5zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zM10 20h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2zm10 0h2v2h-2z' fill='%23c4a882' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E");
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 32px 16px;
                    position: relative;
                    overflow: hidden;
                }

                /* Decorative arcs — mirrored from login (green top-right, red bottom-left) */
                .bb-arc {
                    position: fixed;
                    pointer-events: none;
                    border-radius: 50%;
                    opacity: 0.12;
                    z-index: 0;
                }
                .bb-arc-tr {
                    width: 460px; height: 460px;
                    top: -200px; right: -180px;
                    background: var(--bb-green);
                }
                .bb-arc-bl {
                    width: 400px; height: 400px;
                    bottom: -160px; left: -140px;
                    background: var(--bb-red);
                }

                /* ── Card ── */
                .bb-reg-card {
                    position: relative;
                    z-index: 1;
                    background: var(--bb-white);
                    border-radius: 22px;
                    width: 100%;
                    max-width: 480px;
                    box-shadow:
                        0 0 0 1px var(--bb-border),
                        0 4px 6px -2px rgba(26,18,8,0.04),
                        0 24px 56px -8px rgba(26,18,8,0.12);
                    overflow: hidden;
                    animation: bbRegCardIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                @keyframes bbRegCardIn {
                    from { opacity: 0; transform: translateY(28px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* Flag bar — green | red (inverted from login for visual variety) */
                .bb-flag-bar {
                    display: flex;
                    height: 7px;
                }
                .bb-flag-bar-green { flex: 1; background: var(--bb-green); }
                .bb-flag-bar-red   { flex: 1; background: var(--bb-red); }

                /* ── Card body ── */
                .bb-reg-body {
                    padding: 38px 44px 32px;
                }

                /* ── Header ── */
                .bb-reg-header {
                    text-align: center;
                    margin-bottom: 28px;
                    animation: bbRegFadeUp 0.45s 0.08s cubic-bezier(0.22,1,0.36,1) both;
                }

                .bb-reg-logo {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 62px;
                    height: 62px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--bb-green) 0%, var(--bb-red) 100%);
                    margin-bottom: 14px;
                    box-shadow: 0 4px 20px rgba(0,106,78,0.2), 0 4px 20px rgba(220,20,60,0.15);
                    position: relative;
                }
                .bb-reg-logo::after {
                    content: '';
                    position: absolute;
                    inset: 3px;
                    background: var(--bb-white);
                    border-radius: 50%;
                }
                .bb-reg-logo-text {
                    position: relative;
                    z-index: 1;
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    background: linear-gradient(135deg, var(--bb-green), var(--bb-red));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                    letter-spacing: 0.02em;
                }

                .bb-reg-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 29px;
                    font-weight: 800;
                    color: var(--bb-text);
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                    margin: 0 0 6px;
                }
                .bb-reg-title .t-green { color: var(--bb-green); }
                .bb-reg-title .t-red   { color: var(--bb-red); }

                .bb-reg-subtitle {
                    font-size: 13px;
                    color: var(--bb-muted);
                    font-weight: 400;
                    margin: 0;
                    line-height: 1.5;
                }

                /* ── Step badge ── */
                .bb-step-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: var(--bb-green-soft, #edf7f4);
                    border: 1px solid rgba(0,106,78,0.15);
                    border-radius: 100px;
                    padding: 4px 12px;
                    margin-top: 10px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--bb-green);
                }
                .bb-step-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: var(--bb-green);
                    animation: bbPulse 2s infinite;
                }
                @keyframes bbPulse {
                    0%,100% { opacity: 1; transform: scale(1); }
                    50%     { opacity: 0.4; transform: scale(0.8); }
                }

                /* ── Divider ── */
                .bb-rule {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, var(--bb-border) 30%, var(--bb-border) 70%, transparent 100%);
                    margin: 0 0 24px;
                }

                /* ── Two-column grid for name + phone ── */
                .bb-field-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                }

                /* ── Field wrapper ── */
                .bb-field {
                    margin-bottom: 17px;
                    animation: bbRegFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-field-row .bb-field { margin-bottom: 0; }

                .bb-field:nth-child(1) { animation-delay: 0.16s; }
                .bb-field:nth-child(2) { animation-delay: 0.22s; }
                .bb-field:nth-child(3) { animation-delay: 0.28s; }
                .bb-field:nth-child(4) { animation-delay: 0.34s; }
                .bb-field-row          { animation: bbRegFadeUp 0.45s 0.16s cubic-bezier(0.22,1,0.36,1) both; }

                @keyframes bbRegFadeUp {
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

                /* ── Password strength hint ── */
                .bb-pw-hint {
                    display: flex;
                    gap: 4px;
                    margin-top: 8px;
                }
                .bb-pw-bar {
                    height: 3px;
                    flex: 1;
                    border-radius: 99px;
                    background: var(--bb-border);
                    transition: background 0.3s;
                }
                .bb-pw-bar.active-red   { background: var(--bb-red); }
                .bb-pw-bar.active-amber { background: #d97706; }
                .bb-pw-bar.active-green { background: var(--bb-green); }
                .bb-pw-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--bb-muted);
                    margin-top: 4px;
                    letter-spacing: 0.04em;
                }

                /* ── Terms note ── */
                .bb-terms {
                    font-size: 12px;
                    color: var(--bb-muted);
                    text-align: center;
                    margin: 2px 0 16px;
                    line-height: 1.6;
                    animation: bbRegFadeUp 0.45s 0.38s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-terms a {
                    color: var(--bb-green);
                    font-weight: 700;
                    text-decoration: none;
                    border-bottom: 1px solid transparent;
                    transition: border-color 0.15s;
                }
                .bb-terms a:hover { border-bottom-color: var(--bb-green); }

                /* ── Submit button ── */
                .bb-reg-submit {
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
                    /* green → red gradient (inverted from login) */
                    background: linear-gradient(108deg, var(--bb-green) 0%, #005a40 40%, var(--bb-red) 100%) !important;
                    background-size: 220% 100% !important;
                    background-position: 0% center !important;
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.15),
                        0 4px 18px rgba(0,106,78,0.25),
                        0 2px 8px rgba(220,20,60,0.15) !important;
                    transition: background-position 0.45s ease, transform 0.18s, box-shadow 0.2s !important;
                    animation: bbRegFadeUp 0.45s 0.44s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-reg-submit:hover:not(:disabled) {
                    background-position: 100% center !important;
                    transform: translateY(-1px) !important;
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        0 8px 28px rgba(0,106,78,0.28),
                        0 4px 14px rgba(220,20,60,0.2) !important;
                }
                .bb-reg-submit:active:not(:disabled) {
                    transform: translateY(0) scale(0.99) !important;
                }
                .bb-reg-submit:disabled {
                    opacity: 0.7 !important;
                    cursor: not-allowed !important;
                }
                .bb-reg-submit::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 55%);
                    pointer-events: none;
                }

                /* ── Footer ── */
                .bb-reg-footer {
                    text-align: center;
                    margin-top: 22px;
                    font-size: 13px;
                    color: var(--bb-muted);
                    font-weight: 500;
                    animation: bbRegFadeUp 0.45s 0.50s cubic-bezier(0.22,1,0.36,1) both;
                }
                .bb-reg-footer a {
                    color: var(--bb-red);
                    font-weight: 800;
                    text-decoration: none;
                    border-bottom: 1.5px solid transparent;
                    padding-bottom: 1px;
                    transition: border-color 0.18s, color 0.18s;
                }
                .bb-reg-footer a:hover {
                    color: var(--bb-red-dark);
                    border-bottom-color: var(--bb-red);
                }

                /* ── Brand strip ── */
                .bb-reg-strip {
                    background: var(--bb-warm);
                    border-top: 1px solid var(--bb-border);
                    padding: 11px 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .bb-reg-strip-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--bb-green), var(--bb-red));
                    flex-shrink: 0;
                }
                .bb-reg-strip-text {
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--bb-muted);
                    letter-spacing: 0.02em;
                }
                .bb-reg-strip-text strong { color: var(--bb-green); }

                @media (max-width: 540px) {
                    .bb-reg-body { padding: 30px 22px 26px; }
                    .bb-field-row { grid-template-columns: 1fr; gap: 0; }
                    .bb-field-row .bb-field { margin-bottom: 17px; }
                    .bb-reg-strip { padding: 11px 22px; }
                }
            `}</style>

            {/* Background arcs */}
            <div className="bb-arc bb-arc-tr" aria-hidden />
            <div className="bb-arc bb-arc-bl" aria-hidden />

            <div className="bb-reg-root">
                <div className="bb-reg-card">

                    {/* Bangladesh flag strip — green | red */}
                    <div className="bb-flag-bar" aria-hidden>
                        <div className="bb-flag-bar-green" />
                        <div className="bb-flag-bar-red" />
                    </div>

                    <div className="bb-reg-body">

                        {/* Header */}
                        <div className="bb-reg-header">
                            <div className="bb-reg-logo">
                                <span className="bb-reg-logo-text">বব</span>
                            </div>
                            <h1 className="bb-reg-title">
                                Join{" "}
                                <span className="t-green">Bongo</span>{" "}
                                <span className="t-red">Bazar</span>
                            </h1>
                            <p className="bb-reg-subtitle">
                                Create your free account and start shopping today
                            </p>
                            <div className="bb-step-badge">
                                <span className="bb-step-dot" />
                                New account
                            </div>
                        </div>

                        <div className="bb-rule" />

                        {/* Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>

                                {/* Name + Phone — side by side */}
                                <div className="bb-field-row">
                                    <div className="bb-field">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="bb-field">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+880 ..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bb-field" style={{ marginTop: "17px" }}>
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

                                {/* Password */}
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
                                                        placeholder="Min. 8 characters"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {/* Password strength bars */}
                                                <div className="bb-pw-hint">
                                                    {[0, 1, 2, 3].map((i) => {
                                                        const len = (field.value || "").length;
                                                        let cls = "";
                                                        if (len >= 4 && i === 0) cls = "active-red";
                                                        if (len >= 6 && i <= 1) cls = "active-amber";
                                                        if (len >= 8 && i <= 2) cls = "active-green";
                                                        if (len >= 12 && i <= 3) cls = "active-green";
                                                        return <div key={i} className={`bb-pw-bar ${cls}`} />;
                                                    })}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Terms */}
                                <p className="bb-terms">
                                    By registering you agree to our{" "}
                                    <Link href="/terms">Terms of Service</Link>{" "}
                                    and{" "}
                                    <Link href="/privacy">Privacy Policy</Link>.
                                </p>

                                <Button
                                    type="submit"
                                    className="bb-reg-submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creating account…" : "Create My Account →"}
                                </Button>
                            </form>
                        </Form>

                        {/* Footer */}
                        <p className="bb-reg-footer">
                            Already have an account?{" "}
                            <Link href="/login">Sign in here</Link>
                        </p>
                    </div>

                    {/* Brand strip */}
                    <div className="bb-reg-strip">
                        <span className="bb-reg-strip-dot" />
                        <span className="bb-reg-strip-text">
                            <strong>Bongo</strong> Bazar — Bangladesh&apos;s trusted marketplace
                        </span>
                        <span className="bb-reg-strip-dot" />
                    </div>

                </div>
            </div>
        </>
    );
}