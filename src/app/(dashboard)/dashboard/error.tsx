"use client";

export default function DashboardError({ reset }: { reset: () => void; }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-800">
      <p className="font-semibold">This page could not load.</p>
      <p className="mt-1">Check that the API is running, then try again.</p>
      <button type="button" onClick={reset} className="mt-3 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-red-800 ring-1 ring-red-200 hover:bg-red-100">
        Try again
      </button>
    </div>
  );
}
