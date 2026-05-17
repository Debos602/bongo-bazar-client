// src/app/(admin)/admin/page.tsx
// Full dashboard home — server component (session) + client chart component

import DashboardCharts from "@/components/shared/Dashboardcharts";
import { getUserSession } from "@/helpers/getUserSession";

import {
  TrendingUp,
  ShoppingCart,
  Store,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Clock,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────
interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

interface RecentOrder {
  id: number;
  userName: string;
  initials: string;
  total: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  city: string;
  date: string;
}

// ─── Mock data (replace with real API calls via apiFetch) ─
const STAT_CARDS: StatCardData[] = [
  {
    title: "Total revenue",
    value: "৳8,42,350",
    change: "+12.5% from last month",
    changeType: "up",
    icon: <TrendingUp size={20} />,
    iconBg: "bg-[#FFF0ED]",
    iconColor: "text-[#FF4B2B]",
  },
  {
    title: "Total orders",
    value: "1,248",
    change: "+8.2% from last month",
    changeType: "up",
    icon: <ShoppingCart size={20} />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Total vendors",
    value: "86",
    change: "+3 new this month",
    changeType: "up",
    icon: <Store size={20} />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Total users",
    value: "4,712",
    change: "-2.1% from last month",
    changeType: "down",
    icon: <Users size={20} />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const RECENT_ORDERS: RecentOrder[] = [
  { id: 1048, userName: "Rafiq Islam",    initials: "RI", total: 3200, status: "DELIVERED",  city: "Dhaka",   date: "15 May 2026" },
  { id: 1047, userName: "Sadia Rahman",   initials: "SR", total: 1750, status: "SHIPPED",    city: "Ctg",     date: "15 May 2026" },
  { id: 1046, userName: "Tanvir Ahmed",   initials: "TA", total: 890,  status: "PROCESSING", city: "Sylhet",  date: "14 May 2026" },
  { id: 1045, userName: "Mitu Begum",     initials: "MB", total: 4500, status: "PENDING",    city: "Rajshahi",date: "14 May 2026" },
  { id: 1044, userName: "Karim Hossain", initials: "KH", total: 620,  status: "CANCELLED",  city: "Khulna",  date: "13 May 2026" },
  { id: 1043, userName: "Rina Akter",    initials: "RA", total: 2100, status: "DELIVERED",  city: "Barisal", date: "13 May 2026" },
];

const RECENT_VENDORS = [
  { id: 1, shopName: "TechZone BD",   ownerName: "Tanmoy Parvez", initials: "TP", status: "ACTIVE",   products: 34, joined: "12 Feb 2026" },
  { id: 2, shopName: "Fashion Hub",   ownerName: "Rina Akter",    initials: "RA", status: "INACTIVE",  products: 21, joined: "01 Apr 2026" },
  { id: 3, shopName: "GadgetWorld",   ownerName: "Nabil Khan",    initials: "NK", status: "BLOCK",    products: 58, joined: "20 Mar 2026" },
  { id: 4, shopName: "Book Nest",     ownerName: "Farida Khanam", initials: "FK", status: "ACTIVE",   products: 15, joined: "05 May 2026" },
  { id: 5, shopName: "Sports Arc",    ownerName: "Sumon Das",     initials: "SD", status: "ACTIVE",   products: 9,  joined: "10 May 2026" },
];

// ─── Status badge map ─────────────────────────────────────
const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE:     { bg: "bg-emerald-100", text: "text-emerald-800", label: "Active"     },
  INACTIVE:   { bg: "bg-slate-100",   text: "text-slate-600",   label: "Inactive"   },
  BLOCK:      { bg: "bg-red-100",     text: "text-red-700",     label: "Blocked"    },
  PENDING:    { bg: "bg-amber-100",   text: "text-amber-700",   label: "Pending"    },
  PROCESSING: { bg: "bg-blue-100",    text: "text-blue-700",    label: "Processing" },
  SHIPPED:    { bg: "bg-violet-100",  text: "text-violet-700",  label: "Shipped"    },
  DELIVERED:  { bg: "bg-emerald-100", text: "text-emerald-800", label: "Delivered"  },
  CANCELLED:  { bg: "bg-red-100",     text: "text-red-700",     label: "Cancelled"  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_MAP[status] ?? { bg: "bg-slate-100", text: "text-slate-600", label: status };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

function formatCurrency(amount: number) {
  return "৳" + amount.toLocaleString("en-BD");
}

// ─── Page (server component) ──────────────────────────────
const DashboardHomePage = async () => {
  const session = await getUserSession();
  const userName = session?.user?.name ?? "Admin";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Good morning" :
    currentHour < 17 ? "Good afternoon" :
                       "Good evening";

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#F5F6FA]">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {greeting}, {userName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Here&apos;s what&apos;s happening in your store today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2">
          <Clock size={14} className="text-slate-400" />
          <span>Last updated: just now</span>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 font-medium truncate">{card.title}</p>
              <p className="text-xl font-semibold text-slate-900 mt-0.5 leading-tight">{card.value}</p>
              <p className={`text-xs mt-1 flex items-center gap-0.5 ${card.changeType === "up" ? "text-emerald-600" : "text-red-500"}`}>
                {card.changeType === "up"
                  ? <ArrowUpRight size={12} />
                  : <ArrowDownRight size={12} />}
                {card.change}
              </p>
            </div>
          </div>
        ))} 
      </div>

      {/* ── Charts (client component) ── */}
      <DashboardCharts />

      {/* ── Recent tables row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Recent orders — takes 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingCart size={16} className="text-[#FF4B2B]" />
              <h2 className="text-sm font-semibold text-slate-800">Recent orders</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              Last 10
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 whitespace-nowrap">Order</th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500">Customer</th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500">City</th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 text-right">Total</th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500">Status</th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-slate-400 font-mono font-medium">
                      #{order.id}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {order.initials}
                        </div>
                        <span className="text-sm text-slate-700 font-medium whitespace-nowrap">
                          {order.userName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{order.city}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-800 text-right tabular-nums">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400 whitespace-nowrap">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent vendors — takes 1/3 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Store size={16} className="text-[#FF4B2B]" />
              <h2 className="text-sm font-semibold text-slate-800">Recent vendors</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              Last 5
            </span>
          </div>
          <div className="divide-y divide-slate-50">
            {RECENT_VENDORS.map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0ED] text-[#FF4B2B] text-xs font-semibold flex items-center justify-center flex-shrink-0">
                    {vendor.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate leading-tight">
                      {vendor.shopName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{vendor.ownerName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                  <StatusBadge status={vendor.status} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Package size={10} /> {vendor.products} products
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHomePage;