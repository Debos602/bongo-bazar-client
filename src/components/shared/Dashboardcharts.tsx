"use client";
// src/components/admin/DashboardCharts.tsx
// Client component — Recharts requires browser APIs

import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  Legend,
} from "recharts";

// ─── Revenue area chart data (last 12 months) ────────────
const revenueData = [
  { month: "Jun", revenue: 42000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 51000 },
  { month: "Sep", revenue: 74000 },
  { month: "Oct", revenue: 68000 },
  { month: "Nov", revenue: 80000 },
  { month: "Dec", revenue: 91000 },
  { month: "Jan", revenue: 85000 },
  { month: "Feb", revenue: 96000 },
  { month: "Mar", revenue: 88000 },
  { month: "Apr", revenue: 102000 },
  { month: "May", revenue: 124000 },
];

// ─── Orders bar chart data (daily, grouped by status) ────
const ordersData = [
  { day: "Mon", Delivered: 22, Pending: 8,  Cancelled: 2 },
  { day: "Tue", Delivered: 31, Pending: 12, Cancelled: 3 },
  { day: "Wed", Delivered: 28, Pending: 9,  Cancelled: 1 },
  { day: "Thu", Delivered: 35, Pending: 14, Cancelled: 4 },
  { day: "Fri", Delivered: 40, Pending: 11, Cancelled: 2 },
  { day: "Sat", Delivered: 38, Pending: 10, Cancelled: 5 },
  { day: "Sun", Delivered: 44, Pending: 13, Cancelled: 3 },
];

// ─── Top vendors data ─────────────────────────────────────
const vendorsData = [
  { name: "TechZone BD", revenue: 124000 },
  { name: "Fashion Hub", revenue: 87000  },
  { name: "GadgetWorld", revenue: 63000  },
  { name: "Book Nest",   revenue: 42000  },
  { name: "Sports Arc",  revenue: 31000  },
];

// ─── Category donut data ──────────────────────────────────
const categoryData = [
  { name: "Electronics", value: 34, color: "#FF4B2B" },
  { name: "Fashion",     value: 21, color: "#3B82F6" },
  { name: "Home",        value: 28, color: "#10B981" },
  { name: "Books",       value: 15, color: "#8B5CF6" },
  { name: "Sports",      value: 9,  color: "#F59E0B" },
];

// ─── Shared tooltip style ─────────────────────────────────
const tooltipStyle = {
  backgroundColor: "#fff",
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
};

function formatTaka(value: number) {
  return "৳" + (value / 1000).toFixed(0) + "k";
}

// ─── Custom donut label ───────────────────────────────────
const renderCustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name = "",
}: {
  cx?: number; cy?: number; midAngle?: number;
  innerRadius?: number; outerRadius?: number;
  percent?: number; name?: string;
}) => {
  if (percent < 0.08) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={500}>
      {String(name).slice(0, 3)}
    </text>
  );
};

// ─── Component ────────────────────────────────────────────
export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Revenue area chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Revenue overview</h2>
            <p className="text-xs text-slate-400 mt-0.5">Last 12 months</p>
          </div>
          <span className="text-xs font-medium text-[#FF4B2B] bg-[#FFF0ED] px-2.5 py-1 rounded-full">
            +18.3% YoY
          </span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#FF4B2B" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#FF4B2B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatTaka}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: any) => {
                const n = typeof v === "number" ? v : (typeof v === "string" && !isNaN(Number(v)) ? Number(v) : undefined);
                return n !== undefined ? ["৳" + n.toLocaleString("en-BD"), "Revenue"] : [String(v ?? ""), "Revenue"];
              }}
              labelStyle={{ color: "#64748B", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF4B2B"
              strokeWidth={2}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#FF4B2B", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders bar chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Orders this week</h2>
            <p className="text-xs text-slate-400 mt-0.5">Grouped by status</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={ordersData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#F8FAFC" }} />
            <Legend
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            />
            <Bar dataKey="Delivered" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="Pending"   fill="#F59E0B" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="Cancelled" fill="#EF4444" radius={[3, 3, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 vendors horizontal bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Top 5 vendors</h2>
          <p className="text-xs text-slate-400 mt-0.5">By total revenue (delivered orders)</p>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={vendorsData}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={formatTaka}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: any) => {
                const n = typeof v === "number" ? v : (typeof v === "string" && !isNaN(Number(v)) ? Number(v) : undefined);
                return n !== undefined ? ["৳" + n.toLocaleString("en-BD"), "Revenue"] : [String(v ?? ""), "Revenue"];
              }}
            />
            <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category distribution donut */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Category distribution</h2>
          <p className="text-xs text-slate-400 mt-0.5">Products per category</p>
        </div>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: any) => {
                  const n = typeof v === "number" ? v : (typeof v === "string" && !isNaN(Number(v)) ? Number(v) : undefined);
                  return n !== undefined ? [n + " products", ""] : [String(v ?? ""), ""];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 flex-1">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs text-slate-600">{cat.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-800 tabular-nums">
                  {cat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}