"use client";

import { ReactNode } from "react";

/* ─── Theme tokens ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";

interface AuthShellProps {
  /** Eyebrow pill (e.g. "Returning user", "New account"). */
  pill: string;
  /** Title prefix (e.g. "Welcome to", "Join"). */
  titlePrefix: string;
  /** Subtitle under the title. */
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Shared layout, color theme, and typography for the auth pages.
 * Pure emerald palette to match the rest of the site.
 * Font stack uses the app's global Inter / Hind Siliguri CSS variables.
 */
export default function AuthShell({
  pill,
  titlePrefix,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-10 overflow-hidden relative bg-[#EDEEEF]">
      {/* Background — emerald blobs + dotted pattern */}
      <div
        className="pointer-events-none fixed -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-teal-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #047857 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-3xl w-full max-w-[460px] border border-slate-100 shadow-[0_24px_60px_-12px_rgba(4,78,59,0.18),0_2px_6px_rgba(15,23,42,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Top accent strip — emerald gradient + dot pattern */}
        <div className="relative h-1.5" style={{ background: NAV_GRAD }}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "8px 8px",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="px-7 sm:px-9 pt-8 pb-7">
          {/* Header */}
          <div className="text-center mb-7">
            {/* Logo mark */}
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg shadow-emerald-900/20 relative"
              style={{ background: NAV_GRAD }}
            >
              <span
                className="text-[16px] font-extrabold leading-none"
                style={{ color: "#a7f3d0" }}
              >
                BB
              </span>
            </div>

            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-emerald-50 border border-emerald-100 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                {pill}
              </span>
            </div>

            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-slate-900 leading-[1.15] mb-1.5 tracking-tight">
              {titlePrefix}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#047857,#10b981 60%,#34d399)" }}
              >
                Bongo
              </span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#0f766e,#047857)" }}
              >
                Bazar
              </span>
            </h1>
            <p className="text-[13.5px] text-slate-500 leading-relaxed">{subtitle}</p>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg,transparent 0%,#e2e8f0 50%,transparent 100%)",
            }}
          />

          {children}

          {footer}
        </div>

        {/* Brand strip */}
        <div className="bg-slate-50 border-t border-slate-100 px-7 sm:px-9 py-3 flex items-center justify-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
          />
          <span className="text-[12px] text-slate-500 font-medium">
            <strong className="text-emerald-700 font-bold">Bongo</strong> Bazar —
            Bangladesh&apos;s trusted marketplace
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#10b981,#047857)" }}
          />
        </div>
      </div>
    </div>
  );
}
