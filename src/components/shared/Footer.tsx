import Link from "next/link";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Home,
    CalendarDays,
    Info,
    MessageCircle,
    ShoppingBag,
    Tag,
    Flame,
    Truck,
    ShieldCheck,
    RefreshCcw,
    HeadphonesIcon,
    Star,
    CreditCard,
    Banknote,
    Smartphone,
    Wallet,
    Heart,
    Globe,
    ChevronRight,
    Facebook,
    Instagram,
    Youtube,
    Send,
    CheckCircle2,
} from "lucide-react";

const uspItems = [
    {
        icon: Truck,
        title: "ফ্রি ডেলিভারি",
        sub: "৳৯৯৯+ অর্ডারে",
        iconClass: "bg-[#00a86b]/12 text-[#00d48a]",
    },
    {
        icon: ShieldCheck,
        title: "নিরাপদ পেমেন্ট",
        sub: "১০০% নিরাপদ ও সুরক্ষিত",
        iconClass: "bg-[#3b82f6]/12 text-[#3b82f6]",
    },
    {
        icon: RefreshCcw,
        title: "সহজ রিটার্ন",
        sub: "৭ দিনের মধ্যে",
        iconClass: "bg-[#f59e0b]/12 text-[#f59e0b]",
    },
    {
        icon: HeadphonesIcon,
        title: "২৪/৭ সাপোর্ট",
        sub: "সর্বদা আপনার পাশে",
        iconClass: "bg-[#e8112d]/12 text-[#ff4560]",
    },
];

const quickLinks = [
    { href: "/", label: "হোম", icon: Home, iconClass: "bg-[#00a86b]/10 text-[#00d48a]" },
    { href: "/hot-deals", label: "হট ডিল 🔥", icon: Flame, iconClass: "bg-[#e8112d]/10 text-[#ff4560]" },
    { href: "/products", label: "সব প্রোডাক্ট", icon: Tag, iconClass: "bg-[#f59e0b]/10 text-[#f59e0b]" },
    { href: "/events", label: "ইভেন্টস", icon: CalendarDays, iconClass: "bg-[#3b82f6]/10 text-[#3b82f6]" },
    { href: "/about", label: "আমাদের সম্পর্কে", icon: Info, iconClass: "bg-violet-500/10 text-violet-400" },
    { href: "/contact", label: "যোগাযোগ", icon: MessageCircle, iconClass: "bg-[#00a86b]/10 text-[#00d48a]" },
];

const customerLinks = [
    { href: "/account", label: "আমার একাউন্ট", icon: Star, iconClass: "bg-[#f59e0b]/10 text-[#f59e0b]" },
    { href: "/orders", label: "অর্ডার ট্র্যাক", icon: Truck, iconClass: "bg-[#00a86b]/10 text-[#00d48a]" },
    { href: "/wishlist", label: "উইশলিস্ট", icon: Heart, iconClass: "bg-[#e8112d]/10 text-[#ff4560]" },
    { href: "/returns", label: "রিটার্ন পলিসি", icon: RefreshCcw, iconClass: "bg-[#3b82f6]/10 text-[#3b82f6]" },
    { href: "/faq", label: "FAQ", icon: MessageCircle, iconClass: "bg-violet-500/10 text-violet-400" },
    { href: "/seller", label: "বিক্রেতা হন", icon: Globe, iconClass: "bg-[#00a86b]/10 text-[#00d48a]" },
];

const policyLinks = [
    { href: "/terms", label: "Terms", icon: ShieldCheck },
    { href: "/privacy", label: "Privacy", icon: ShieldCheck },
    { href: "/cookies", label: "Cookies", icon: Globe },
];

const paymentMethods = [
    { icon: Smartphone, color: "#25d366", label: "bKash" },
    { icon: Smartphone, color: "#f97316", label: "Nagad" },
    { icon: Wallet, color: "#8b5cf6", label: "Rocket" },
    { icon: CreditCard, color: "#3b82f6", label: "Card" },
    { icon: Banknote, color: "#10b981", label: "COD" },
];

function XIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative w-full overflow-hidden bg-[#060d08] text-white"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* blobs */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-100px] top-[-80px] z-0 h-[380px] w-[580px] rounded-full bg-[radial-gradient(ellipse,rgba(232,17,45,0.18)_0%,transparent_70%)] blur-[90px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-60px] right-[-80px] z-0 h-[340px] w-[520px] rounded-full bg-[radial-gradient(ellipse,rgba(0,168,107,0.16)_0%,transparent_70%)] blur-[90px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[220px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(180,30,80,0.08)_0%,transparent_70%)] blur-[90px]"
            />

            {/* top gradient border */}
            <div className="relative z-[2] h-[3px] w-full bg-[linear-gradient(110deg,#e8112d_0%,#c0103a_38%,#007a52_62%,#00a86b_100%)]">
                <div className="absolute inset-x-0 -bottom-[10px] h-[22px] bg-[linear-gradient(110deg,#e8112d_0%,#c0103a_38%,#007a52_62%,#00a86b_100%)] opacity-30 blur-[12px]" />
            </div>

            <div className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-7 pt-9 sm:px-10 sm:pb-9 sm:pt-14">
                {/* USP */}
                <div className="mb-12 grid grid-cols-2 gap-2 border-b border-white/[0.07] pb-10 lg:grid-cols-4 lg:gap-3">
                    {uspItems.map(({ icon: Icon, title, sub, iconClass }) => (
                        <div
                            key={title}
                            className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#111c13] px-3 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#00a86b]/30 sm:px-4 sm:py-3.5"
                        >
                            <div className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] ${iconClass}`}>
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <div>
                                <div className="text-[12px] font-semibold leading-[1.2] text-white/[0.88] sm:text-[13px]">
                                    {title}
                                </div>
                                <div className="mt-0.5 text-[11px] text-white/[0.36]">{sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-10">
                    {/* Brand */}
                    <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
                        <Link href="/" className="flex items-center gap-3.5 no-underline">
                            <div className="relative h-[54px] w-[54px] shrink-0">
                                <div className="absolute inset-0 rounded-[15px] bg-[linear-gradient(110deg,#e8112d_0%,#c0103a_38%,#007a52_62%,#00a86b_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_28px_rgba(232,17,45,0.28),0_6px_28px_rgba(0,168,107,0.18)]" />
                                <div className="absolute inset-[2.5px] flex items-center justify-center rounded-[13px] bg-[#060d08]">
                                    <span
                                        className="bg-[linear-gradient(105deg,#ff4560_0%,#ff8fa0_40%,#00d48a_100%)] bg-clip-text text-[17px] font-bold text-transparent"
                                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                                    >
                                        বব
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p
                                    className="mb-[3px] text-[25px] font-black leading-none tracking-[-0.03em]"
                                    style={{ fontFamily: "'Fraunces', serif" }}
                                >
                                    <span className="text-[#ff4560]">Bongo</span>{" "}
                                    <span className="text-[#00d48a]">Bazar</span>
                                </p>
                                <p className="m-0 text-[11px] font-medium uppercase tracking-[0.12em] text-white/[0.36]">
                                    Bangladesh&apos;s Smart Marketplace
                                </p>
                            </div>
                        </Link>

                        <div
                            aria-hidden="true"
                            className="h-[3px] w-[52px] rounded-full bg-[linear-gradient(110deg,#e8112d_0%,#c0103a_38%,#007a52_62%,#00a86b_100%)]"
                        />

                        <p className="max-w-[248px] text-[13px] font-light leading-[1.7] text-white/[0.36] sm:max-w-[260px]">
                            <strong className="font-medium text-white/[0.88]">
                                বাংলাদেশের বিশ্বস্ত অনলাইন মার্কেটপ্লেস
                            </strong>{" "}
                            — সারাদেশে ক্রেতা ও বিক্রেতাদের একটি প্ল্যাটফর্মে সংযুক্ত করছে।
                        </p>

                        <div className="mt-0.5 flex flex-col items-center gap-[9px] sm:items-start">
                            <a
                                href="tel:01641754794"
                                className="flex items-center gap-[9px] text-[13px] font-normal text-white/[0.55] transition hover:text-white/[0.88]"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00a86b]/12 text-[#00d48a]">
                                    <Phone size={13} strokeWidth={2.5} />
                                </span>
                                ০১৬৪১-৭৫৪৭৯৪
                            </a>

                            <a
                                href="mailto:info@bongobazar.com"
                                className="flex items-center gap-[9px] text-[13px] font-normal text-white/[0.55] transition hover:text-white/[0.88]"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8112d]/12 text-[#ff4560]">
                                    <Mail size={13} strokeWidth={2.5} />
                                </span>
                                info@bongobazar.com
                            </a>

                            <span className="flex items-center gap-[9px] text-[13px] font-normal text-white/[0.55]">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f59e0b]/12 text-[#f59e0b]">
                                    <MapPin size={13} strokeWidth={2.5} />
                                </span>
                                ঢাকা, বাংলাদেশ
                            </span>

                            <span className="flex items-center gap-[9px] text-[13px] font-normal text-white/[0.55]">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00a86b]/12 text-[#00d48a]">
                                    <Clock size={13} strokeWidth={2.5} />
                                </span>
                                শনি–বৃহস্পতি, সকাল ৯টা – রাত ৯টা
                            </span>
                        </div>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Quick links">
                        <div className="mb-4 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/[0.36]">
                            <ShoppingBag size={12} className="text-[#00d48a]" />
                            কুইক লিংক
                            <span className="h-px flex-1 bg-white/[0.07]" />
                        </div>

                        <div className="flex flex-col gap-px">
                            {quickLinks.map(({ href, label, icon: Icon, iconClass }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-transparent px-2.5 py-[7px] text-[13.5px] font-normal text-white/[0.55] transition-all duration-200 hover:border-white/[0.07] hover:bg-white/[0.03] hover:pl-3.5 hover:text-white/[0.88]"
                                >
                                    <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] transition-transform duration-200 group-hover:scale-110 ${iconClass}`}>
                                        <Icon size={13} strokeWidth={2} />
                                    </span>
                                    {label}
                                    <ChevronRight
                                        size={12}
                                        className="ml-auto translate-x-0 opacity-0 text-white/[0.36] transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Customer care */}
                    <nav aria-label="Customer service">
                        <div className="mb-4 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/[0.36]">
                            <HeadphonesIcon size={12} className="text-[#ff4560]" />
                            কাস্টমার কেয়ার
                            <span className="h-px flex-1 bg-white/[0.07]" />
                        </div>

                        <div className="flex flex-col gap-px">
                            {customerLinks.map(({ href, label, icon: Icon, iconClass }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group relative flex items-center gap-2 overflow-hidden rounded-lg border border-transparent px-2.5 py-[7px] text-[13.5px] font-normal text-white/[0.55] transition-all duration-200 hover:border-white/[0.07] hover:bg-white/[0.03] hover:pl-3.5 hover:text-white/[0.88]"
                                >
                                    <span className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] transition-transform duration-200 group-hover:scale-110 ${iconClass}`}>
                                        <Icon size={13} strokeWidth={2} />
                                    </span>
                                    {label}
                                    <ChevronRight
                                        size={12}
                                        className="ml-auto translate-x-0 opacity-0 text-white/[0.36] transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <div className="mb-0 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/[0.36]">
                            <Send size={12} className="text-[#00d48a]" />
                            নিউজলেটার
                            <span className="h-px flex-1 bg-white/[0.07]" />
                        </div>

                        <p className="text-[13px] font-light leading-[1.6] text-white/[0.36]">
                            <strong className="font-medium text-white/[0.88]">অফার ও নতুন প্রোডাক্ট</strong>{" "}
                            সবার আগে পেতে সাবস্ক্রাইব করুন।
                        </p>

                        <div className="flex flex-col gap-2">
                            <div className="flex overflow-hidden rounded-[10px] border border-white/[0.07] bg-[#0c160e] transition duration-200 focus-within:border-[#00a86b]/45 focus-within:shadow-[0_0_0_3px_rgba(0,168,107,0.08)]">
                                <div className="flex w-10 shrink-0 items-center justify-center text-white/[0.36]">
                                    <Mail size={14} strokeWidth={2} />
                                </div>

                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল লিখুন..."
                                    aria-label="নিউজলেটার সাবস্ক্রাইব"
                                    className="min-w-0 flex-1 bg-transparent py-2.5 pr-2 text-[13px] text-white/[0.88] outline-none placeholder:text-white/[0.36]"
                                />

                                <button
                                    type="button"
                                    className="flex items-center gap-1 whitespace-nowrap bg-[linear-gradient(110deg,#e8112d_0%,#c0103a_38%,#007a52_62%,#00a86b_100%)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition hover:brightness-110"
                                >
                                    <Send size={12} />
                                    যান
                                </button>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-white/[0.36]">
                                <CheckCircle2 size={12} className="shrink-0 text-[#00d48a]" />
                                স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন।
                            </div>
                        </div>

                        {/* social */}
                        <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/[0.36]">
                            আমাদের অনুসরণ করুন
                        </p>

                        <div className="flex flex-wrap gap-2 sm:justify-start">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex items-center gap-[7px] whitespace-nowrap rounded-[9px] border border-white/[0.07] bg-[#111c13] px-3 py-[7px] pl-2 text-[12px] font-semibold text-white/[0.55] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1877f2]/50 hover:text-white hover:shadow-[0_4px_16px_rgba(24,119,242,0.2)]"
                            >
                                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#1877f2]/15 text-[#4a9eff]">
                                    <Facebook size={13} />
                                </span>
                                Facebook
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex items-center gap-[7px] whitespace-nowrap rounded-[9px] border border-white/[0.07] bg-[#111c13] px-3 py-[7px] pl-2 text-[12px] font-semibold text-white/[0.55] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e1306c]/50 hover:text-white hover:shadow-[0_4px_16px_rgba(225,48,108,0.2)]"
                            >
                                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#e1306c]/15 text-pink-400">
                                    <Instagram size={13} />
                                </span>
                                Instagram
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="flex items-center gap-[7px] whitespace-nowrap rounded-[9px] border border-white/[0.07] bg-[#111c13] px-3 py-[7px] pl-2 text-[12px] font-semibold text-white/[0.55] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-500/50 hover:text-white hover:shadow-[0_4px_16px_rgba(255,0,0,0.2)]"
                            >
                                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-red-500/15 text-[#ff4040]">
                                    <Youtube size={13} />
                                </span>
                                YouTube
                            </a>

                            <a
                                href="#"
                                aria-label="X / Twitter"
                                className="flex items-center gap-[7px] whitespace-nowrap rounded-[9px] border border-white/[0.07] bg-[#111c13] px-3 py-[7px] pl-2 text-[12px] font-semibold text-white/[0.55] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
                            >
                                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-white/10 text-slate-200">
                                    <XIcon />
                                </span>
                                Twitter
                            </a>

                            <a
                                href="https://wa.me/8801641754794"
                                aria-label="WhatsApp"
                                className="flex items-center gap-[7px] whitespace-nowrap rounded-[9px] border border-white/[0.07] bg-[#111c13] px-3 py-[7px] pl-2 text-[12px] font-semibold text-white/[0.55] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#25d366]/50 hover:text-white hover:shadow-[0_4px_16px_rgba(37,211,102,0.2)]"
                            >
                                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#25d366]/15 text-[#25d366]">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </span>
                                WhatsApp
                            </a>
                        </div>

                        {/* payments */}
                        <div className="mt-1 flex flex-col gap-2.5">
                            <p className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/[0.36]">
                                পেমেন্ট পদ্ধতি
                            </p>

                            <div className="flex flex-wrap gap-[7px] sm:justify-start">
                                {paymentMethods.map(({ icon: Icon, color, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-[5px] rounded-[7px] border border-white/[0.07] bg-[#111c13] px-2.5 py-[5px] text-[11px] font-semibold text-white/[0.55] transition hover:border-[#00a86b]/30"
                                    >
                                        <Icon size={13} strokeWidth={2} style={{ color }} />
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom */}
                <div className="relative mt-11 pt-6">
                    <div className="absolute left-0 top-0 h-px w-full bg-[linear-gradient(90deg,transparent_0%,rgba(232,17,45,0.35)_20%,rgba(200,20,70,0.45)_50%,rgba(0,168,107,0.35)_80%,transparent_100%)]" />

                    <div className="flex flex-wrap items-center justify-center gap-3 text-center lg:justify-between lg:text-left">
                        <p className="flex items-center gap-[5px] text-[12px] font-normal tracking-[0.01em] text-white/[0.36]">
                            © {currentYear}{" "}
                            <strong className="bg-[linear-gradient(105deg,#ff4560_0%,#ff8fa0_40%,#00d48a_100%)] bg-clip-text font-bold text-transparent">
                                Bongo Bazar
                            </strong>
                            . Made with{" "}
                            <Heart
                                size={11}
                                className="inline animate-pulse align-middle text-[#ff4560]"
                                style={{ fill: "#ff4560" }}
                            />{" "}
                            in Bangladesh
                        </p>

                        <div
                            className="inline-flex items-center gap-[7px] rounded-full border border-white/[0.07] bg-white/[0.03] px-3.5 py-[5px] text-[11px] font-semibold uppercase tracking-[0.06em] text-white/[0.36]"
                            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                        >
                            <div className="flex items-center gap-[2px]">
                                <span className="block h-[9px] w-[9px] rounded-full bg-[#e8112d]" />
                                <span className="block h-[9px] w-[9px] rounded-full bg-[#00a86b]" />
                            </div>
                            Made in Bangladesh
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3.5">
                            {policyLinks.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center gap-1 text-[11.5px] font-medium tracking-[0.02em] text-white/[0.36] transition hover:text-white/[0.88]"
                                >
                                    <Icon size={11} />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}