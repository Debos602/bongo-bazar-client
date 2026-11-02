"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyPoint } from "@/types/dashboard";

const label = (month: string) => new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

export default function SalesChart({ data }: { data: MonthlyPoint[]; }) {
  if (!data.some((d) => d.revenue > 0)) {
    return <p className="px-5 py-16 text-center text-sm text-slate-500">Sales will appear here after the first order.</p>;
  }
  return (
    <div className="h-64 px-2 py-4" role="img" aria-label="Sales per month for the last 12 months">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 8, right: 8 }}>
          <CartesianGrid vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tickFormatter={label} tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" />
          <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#64748b" width={56} tickFormatter={(v: number) => v.toLocaleString()} />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            labelFormatter={(m) => label(String(m))}
            formatter={(v) => [`৳ ${Number(v).toLocaleString()}`, "Sales"]}
          />
          <Bar dataKey="revenue" fill="#047857" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
