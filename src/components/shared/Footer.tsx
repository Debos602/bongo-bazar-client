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
  Sparkles,
} from "lucide-react";

/* ─── Theme tokens (match navbar / hot-deals / cart / checkout) ─── */
const NAV_GRAD =
  "linear-gradient(135deg,#022c22 0%,#064e3b 40%,#047857 70%,#10b981 100%)";
const ACCENT_GRAD =
  "linear-gradient(90deg,#34d399,#10b981 50%,#047857)";

const uspItems = [
  {
    icon: Truck,
    title: "ফ্রি ডেলিভারি",
    sub: "৳৯৯৯+ অর্ডারে",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ পেমেন্ট",
    sub: "১০০% নিরাপদ ও সুরক্ষিত",
  },
  {
    icon: RefreshCcw,
    title: "সহজ রিটার্ন",
    sub: "৭ দিনের মধ্যে",
  },
  {
    icon: HeadphonesIcon,
    title: "২৪/৭ সাপোর্ট",
    sub: "সর্বদা আপনার পাশে",
  },
];

const quickLinks = [
  { href: "/", label: "হোম" },
  { href: "/hot-deals", label: "হট ডিল" },
  { href: "/products", label: "সব প্রোডাক্ট" },
  { href: "/events", label: "ইভেন্টস" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
];

const customerLinks = [
  { href: "/account", label: "আমার একাউন্ট" },
  { href: "/orders", label: "অর্ডার ট্র্যাক" },
  { href: "/wishlist", label: "উইশলিস্ট" },
  { href: "/returns", label: "রিটার্ন পলিসি" },
  { href: "/faq", label: "FAQ" },
  { href: "/seller", label: "বিক্রেতা হন" },
];

const policyLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
];

const paymentMethods = [
  { icon: Smartphone, color: "#e2136e", label: "bKash" },
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

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode; }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span
        className="h-4 w-1 rounded-full"
        style={{ background: ACCENT_GRAD }}
        aria-hidden="true"
      />
      <h3 className="text-[11px] font-bold text-emerald-200/80 uppercase tracking-[0.18em]">
        {children}
      </h3>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden text-slate-200 bg-[#03110b]">
      {/* Subtle emerald glow blobs (replaces red/green flag blobs) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 z-0 h-[420px] w-[620px] rounded-full
                   bg-[radial-gradient(ellipse,rgba(16,185,129,0.18)_0%,transparent_70%)] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-20 z-0 h-[420px] w-[620px] rounded-full
                   bg-[radial-gradient(ellipse,rgba(5,150,105,0.16)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Top accent strip — emerald gradient with a small dotted texture */}
      <div className="relative z-[2] h-1 w-full" style={{ background: NAV_GRAD }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "8px 8px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-7 pt-9 sm:px-10 sm:pb-9 sm:pt-12">
        {/* USP strip — minimal, 4 columns */}
        <div className="mb-10 grid grid-cols-2 gap-2 border-b border-white/[0.06] pb-8 sm:grid-cols-4 sm:gap-3 lg:gap-4">
          {uspItems.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06]
                         bg-white/[0.02] px-3 py-3 sm:px-4 sm:py-3.5
                         transition-all duration-200 hover:border-emerald-500/30 hover:bg-white/[0.04]"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/12 text-emerald-300 border border-emerald-400/15 transition-transform group-hover:scale-105">
                <Icon size={18} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] sm:text-[13px] font-bold text-white leading-tight">
                  {title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
            <Link href="/" className="flex items-center gap-3.5 no-underline">
              <div className="relative h-[52px] w-[52px] shrink-0">
                <div
                  className="absolute inset-0 rounded-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_rgba(16,185,129,0.25)]"
                  style={{ background: NAV_GRAD }}
                />
                <div className="absolute inset-[2.5px] flex items-center justify-center rounded-[14px] bg-[#03110b]">
                  <span
                    className="text-[17px] font-extrabold"
                    style={{
                      backgroundImage: "linear-gradient(90deg,#34d399,#a7f3d0)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    বব
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-[3px] text-[22px] sm:text-[24px] font-extrabold leading-none tracking-tight">
                  <span
                    style={{
                      backgroundImage: "linear-gradient(90deg,#10b981,#34d399)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Bongo
                  </span>{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(90deg,#34d399,#a7f3d0)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Bazar
                  </span>
                </p>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-300/70">
                  Bangladesh&apos;s Smart Marketplace
                </p>
              </div>
            </Link>

            <div
              aria-hidden="true"
              className="h-[3px] w-[52px] rounded-full"
              style={{ background: ACCENT_GRAD }}
            />

            <p className="max-w-[260px] text-[13px] font-normal leading-[1.7] text-slate-400">
              <strong className="font-semibold text-white">
                বাংলাদেশের বিশ্বস্ত অনলাইন মার্কেটপ্লেস
              </strong>{" "}
              — সারাদেশে ক্রেতা ও বিক্রেতাদের একটি প্ল্যাটফর্মে সংযুক্ত করছে।
            </p>

            <div className="flex flex-col items-center gap-2.5 sm:items-start">
              <a
                href="tel:01641754794"
                className="flex items-center gap-2.5 text-[13px] text-slate-300 transition hover:text-emerald-300"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-400/15">
                  <Phone size={12} strokeWidth={2.5} />
                </span>
                ০১৬৪১-৭৫৪৭৯৪
              </a>
              <a
                href="mailto:info@bongobazar.com"
                className="flex items-center gap-2.5 text-[13px] text-slate-300 transition hover:text-emerald-300"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-400/15">
                  <Mail size={12} strokeWidth={2.5} />
                </span>
                info@bongobazar.com
              </a>
              <span className="flex items-center gap-2.5 text-[13px] text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-400/15">
                  <MapPin size={12} strokeWidth={2.5} />
                </span>
                ঢাকা, বাংলাদেশ
              </span>
              <span className="flex items-center gap-2.5 text-[13px] text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300 border border-emerald-400/15">
                  <Clock size={12} strokeWidth={2.5} />
                </span>
                শনি–বৃহস্পতি, সকাল ৯টা – রাত ৯টা
              </span>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <FooterHeading>
              <span className="inline-flex items-center gap-1.5">
                <ShoppingBag size={11} className="text-emerald-300" /> কুইক লিংক
              </span>
            </FooterHeading>
            <ul className="flex flex-col gap-px">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 rounded-lg px-2.5 py-2
                               text-[13.5px] text-slate-400 transition-all duration-200
                               hover:bg-white/[0.03] hover:pl-3.5 hover:text-emerald-200"
                  >
                    <ChevronRight
                      size={12}
                      className="opacity-0 -ml-1 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0 text-emerald-400"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Customer care */}
          <nav aria-label="Customer service">
            <FooterHeading>
              <span className="inline-flex items-center gap-1.5">
                <HeadphonesIcon size={11} className="text-emerald-300" /> কাস্টমার কেয়ার
              </span>
            </FooterHeading>
            <ul className="flex flex-col gap-px">
              {customerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 rounded-lg px-2.5 py-2
                               text-[13.5px] text-slate-400 transition-all duration-200
                               hover:bg-white/[0.03] hover:pl-3.5 hover:text-emerald-200"
                  >
                    <ChevronRight
                      size={12}
                      className="opacity-0 -ml-1 transition-all duration-200 group-hover:opacity-100 group-hover:ml-0 text-emerald-400"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter + social + payments */}
          <div className="flex flex-col gap-5">
            <div>
              <FooterHeading>
                <span className="inline-flex items-center gap-1.5">
                  <Send size={11} className="text-emerald-300" /> নিউজলেটার
                </span>
              </FooterHeading>
              <p className="text-[13px] leading-[1.6] text-slate-400">
                <strong className="font-semibold text-white">অফার ও নতুন প্রোডাক্ট</strong>{" "}
                সবার আগে পেতে সাবস্ক্রাইব করুন।
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <div
                  className="flex overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]
                             transition-all duration-200
                             focus-within:border-emerald-500/50 focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
                >
                  <div className="flex w-10 shrink-0 items-center justify-center text-slate-400">
                    <Mail size={14} strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    placeholder="আপনার ইমেইল লিখুন..."
                    aria-label="নিউজলেটার সাবস্ক্রাইব"
                    className="min-w-0 flex-1 bg-transparent py-2.5 pr-2 text-[13px] text-white outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    className="flex items-center gap-1 whitespace-nowrap px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-wide text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                    style={{ background: NAV_GRAD }}
                  >
                    <Send size={12} />
                    যান
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 size={12} className="shrink-0 text-emerald-400" />
                  স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন।
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <FooterHeading>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={11} className="text-emerald-300" /> আমাদের অনুসরণ করুন
                </span>
              </FooterHeading>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Facebook", icon: <Facebook size={13} />, brand: "facebook" },
                  { label: "Instagram", icon: <Instagram size={13} />, brand: "instagram" },
                  { label: "YouTube", icon: <Youtube size={13} />, brand: "youtube" },
                  { label: "X", icon: <XIcon />, brand: "x" },
                  { label: "WhatsApp", icon: <WhatsAppIcon />, brand: "whatsapp", href: "https://wa.me/8801641754794" },
                ].map(({ label, icon, brand, href }) => (
                  <a
                    key={label}
                    href={href ?? "#"}
                    aria-label={label}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg
                                border border-white/[0.07] bg-white/[0.02] text-slate-300
                                transition-all duration-200 hover:-translate-y-0.5
                                ${brand === "facebook" ? "hover:border-blue-500/50 hover:text-blue-300" : ""}
                                ${brand === "instagram" ? "hover:border-pink-500/50 hover:text-pink-300" : ""}
                                ${brand === "youtube" ? "hover:border-red-500/50 hover:text-red-300" : ""}
                                ${brand === "x" ? "hover:border-white/30 hover:text-white" : ""}
                                ${brand === "whatsapp" ? "hover:border-emerald-500/50 hover:text-emerald-300" : ""}
                              `}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Payments */}
            <div>
              <FooterHeading>
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard size={11} className="text-emerald-300" /> পেমেন্ট পদ্ধতি
                </span>
              </FooterHeading>
              <div className="flex flex-wrap gap-1.5">
                {paymentMethods.map(({ icon: Icon, color, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:border-emerald-500/30"
                  >
                    <Icon size={12} strokeWidth={2} style={{ color }} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-10 pt-5">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="flex items-center gap-1.5 text-[12px] text-slate-400">
              © {currentYear}{" "}
              <span
                className="font-extrabold"
                style={{
                  backgroundImage: "linear-gradient(90deg,#10b981,#34d399)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Bongo Bazar
              </span>
              <span>· Made with</span>
              <Heart size={11} className="inline text-emerald-400" style={{ fill: "#10b981" }} />
              <span>in Bangladesh</span>
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-300/80">
              <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Made in Bangladesh
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {policyLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1 text-[11.5px] font-semibold text-slate-400 transition hover:text-emerald-300"
                >
                  <ShieldCheck size={11} />
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
