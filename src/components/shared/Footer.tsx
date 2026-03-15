import Link from "next/link";
import {
    Phone, Mail, MapPin, Clock,
    Home, CalendarDays, Info, MessageCircle,
    ShoppingBag, Tag, Flame, Truck,
    ShieldCheck, RefreshCcw, HeadphonesIcon, Star,
    CreditCard, Banknote, Smartphone, Wallet,
    ArrowRight, Heart, Globe, ChevronRight,
    Facebook, Instagram, Youtube, Twitter,
    Send, CheckCircle2,
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ─── Tokens ─── */
        :root {
          --f-red:      #e8112d;
          --f-red2:     #ff4560;
          --f-green:    #00a86b;
          --f-green2:   #00d48a;
          --f-amber:    #f59e0b;
          --f-blue:     #3b82f6;
          --f-bg:       #060d08;
          --f-surface:  #0c160e;
          --f-surface2: #111c13;
          --f-border:   rgba(255,255,255,0.07);
          --f-border2:  rgba(255,255,255,0.04);
          --f-muted:    rgba(255,255,255,0.36);
          --f-muted2:   rgba(255,255,255,0.55);
          --f-text:     rgba(255,255,255,0.88);
          --grad:       linear-gradient(110deg, var(--f-red) 0%, #c0103a 38%, #007a52 62%, var(--f-green) 100%);
          --grad-text:  linear-gradient(105deg, var(--f-red2) 0%, #ff8fa0 40%, var(--f-green2) 100%);
          --grad-green: linear-gradient(135deg, #00a86b, #00d48a);
          --grad-red:   linear-gradient(135deg, #e8112d, #ff4560);
        }

        /* ─── Shell ─── */
        .f-shell {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: var(--f-bg);
          font-family: 'DM Sans', sans-serif;
        }

        /* ─── Blobs ─── */
        .f-blob { position:absolute; border-radius:50%; pointer-events:none; filter:blur(90px); z-index:0; }
        .f-blob-red   { width:580px; height:380px; background:radial-gradient(ellipse,rgba(232,17,45,0.18) 0%,transparent 70%); top:-80px; left:-100px; }
        .f-blob-green { width:520px; height:340px; background:radial-gradient(ellipse,rgba(0,168,107,0.16) 0%,transparent 70%); bottom:-60px; right:-80px; }
        .f-blob-mid   { width:320px; height:220px; background:radial-gradient(ellipse,rgba(180,30,80,0.08) 0%,transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); }

        /* ─── Top border + glow ─── */
        .f-top-border { height:3px; width:100%; background:var(--grad); position:relative; z-index:2; }
        .f-top-border::after {
          content:''; position:absolute; bottom:-10px; left:0; right:0;
          height:22px; background:var(--grad); filter:blur(12px); opacity:0.3;
        }

        /* ─── Inner ─── */
        .f-inner { position:relative; z-index:1; max-width:1200px; margin:0 auto; padding:56px 40px 36px; }

        /* ─── USP Strip ─── */
        .f-usp {
          display:grid;
          grid-template-columns: repeat(4,1fr);
          gap:12px;
          margin-bottom:48px;
          padding-bottom:40px;
          border-bottom:1px solid var(--f-border);
        }
        .f-usp-item {
          display:flex; align-items:center; gap:12px;
          padding:14px 16px;
          background:var(--f-surface2);
          border:1px solid var(--f-border);
          border-radius:12px;
          transition:border-color 0.2s, transform 0.2s;
        }
        .f-usp-item:hover { border-color:rgba(0,168,107,0.3); transform:translateY(-2px); }
        .f-usp-icon {
          width:38px; height:38px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0;
        }
        .f-usp-icon.green { background:rgba(0,168,107,0.12); color:var(--f-green2); }
        .f-usp-icon.red   { background:rgba(232,17,45,0.12);  color:var(--f-red2); }
        .f-usp-icon.amber { background:rgba(245,158,11,0.12); color:var(--f-amber); }
        .f-usp-icon.blue  { background:rgba(59,130,246,0.12); color:var(--f-blue); }
        .f-usp-title { font-size:13px; font-weight:600; color:var(--f-text); line-height:1.2; }
        .f-usp-sub   { font-size:11px; color:var(--f-muted); margin-top:2px; }

        /* ─── Main Grid ─── */
        .f-grid {
          display:grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
          gap:40px;
          align-items:start;
        }

        /* ─── Brand Column ─── */
        .f-brand { display:flex; flex-direction:column; gap:16px; }
        .f-brand-lockup { display:flex; align-items:center; gap:14px; text-decoration:none; }
        .f-logo { position:relative; width:54px; height:54px; flex-shrink:0; }
        .f-logo-bg {
          position:absolute; inset:0; border-radius:15px; background:var(--grad);
          box-shadow:0 0 0 1px rgba(255,255,255,0.08), 0 6px 28px rgba(232,17,45,0.28), 0 6px 28px rgba(0,168,107,0.18);
        }
        .f-logo-inner {
          position:absolute; inset:2.5px; border-radius:13px; background:var(--f-bg);
          display:flex; align-items:center; justify-content:center;
        }
        .f-logo-bangla {
          font-family:'Hind Siliguri',sans-serif; font-size:17px; font-weight:700;
          background:var(--grad-text); -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
        }
        .f-brand-name { font-family:'Fraunces',serif; font-size:25px; font-weight:900; letter-spacing:-0.03em; line-height:1; margin:0 0 3px; }
        .f-brand-name .r { color:var(--f-red2); }
        .f-brand-name .g { color:var(--f-green2); }
        .f-brand-tag { font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:var(--f-muted); margin:0; }
        .f-pill-divider { width:52px; height:3px; border-radius:99px; background:var(--grad); margin-top:2px; }
        .f-tagline { font-size:13px; color:var(--f-muted); line-height:1.7; max-width:248px; font-weight:300; }
        .f-tagline strong { color:var(--f-text); font-weight:500; }

        /* Contact info */
        .f-contact-list { display:flex; flex-direction:column; gap:9px; margin-top:2px; }
        .f-contact-item {
          display:flex; align-items:center; gap:9px;
          font-size:13px; font-weight:400; color:var(--f-muted2);
          text-decoration:none;
          transition:color 0.18s;
        }
        .f-contact-item:hover { color:var(--f-text); }
        .f-contact-item .ci-icon {
          width:28px; height:28px; border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; font-size:13px;
        }
        .f-contact-item .ci-icon.green { background:rgba(0,168,107,0.12); color:var(--f-green2); }
        .f-contact-item .ci-icon.red   { background:rgba(232,17,45,0.12);  color:var(--f-red2); }
        .f-contact-item .ci-icon.amber { background:rgba(245,158,11,0.12); color:var(--f-amber); }

        /* ─── Nav Column ─── */
        .f-col-title {
          font-size:10.5px; font-weight:700; letter-spacing:0.14em;
          text-transform:uppercase; color:var(--f-muted); margin-bottom:16px;
          display:flex; align-items:center; gap:6px;
        }
        .f-col-title::after { content:''; flex:1; height:1px; background:var(--f-border); }

        .f-link-list { display:flex; flex-direction:column; gap:1px; }
        .f-link-item {
          display:flex; align-items:center; gap:8px;
          padding:7px 10px; border-radius:8px;
          font-size:13.5px; font-weight:400;
          color:var(--f-muted2); text-decoration:none;
          border:1px solid transparent;
          transition:color 0.18s, background 0.18s, border-color 0.18s, padding-left 0.2s;
          position:relative; overflow:hidden;
        }
        .f-link-item:hover {
          color:var(--f-text);
          background:rgba(255,255,255,0.03);
          border-color:var(--f-border);
          padding-left:14px;
        }
        .f-link-icon { width:26px; height:26px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:transform 0.18s; }
        .f-link-item:hover .f-link-icon { transform:scale(1.1); }
        .f-link-icon.green  { background:rgba(0,168,107,0.10); color:var(--f-green2); }
        .f-link-icon.red    { background:rgba(232,17,45,0.10);  color:var(--f-red2); }
        .f-link-icon.amber  { background:rgba(245,158,11,0.10); color:var(--f-amber); }
        .f-link-icon.blue   { background:rgba(59,130,246,0.10); color:var(--f-blue); }
        .f-link-icon.purple { background:rgba(139,92,246,0.10); color:#a78bfa; }
        .f-link-item .f-arrow { margin-left:auto; color:var(--f-muted); opacity:0; transition:opacity 0.18s, transform 0.18s; }
        .f-link-item:hover .f-arrow { opacity:1; transform:translateX(2px); }

        /* ─── Newsletter Column ─── */
        .f-newsletter-wrap { display:flex; flex-direction:column; gap:16px; }
        .f-newsletter-desc { font-size:13px; color:var(--f-muted); line-height:1.6; font-weight:300; }
        .f-newsletter-desc strong { color:var(--f-text); font-weight:500; }
        .f-newsletter {
          display:flex; flex-direction:column; gap:8px;
        }
        .f-nl-input-row {
          display:flex; gap:0;
          border-radius:10px; overflow:hidden;
          border:1px solid var(--f-border);
          background:var(--f-surface);
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .f-nl-input-row:focus-within {
          border-color:rgba(0,168,107,0.45);
          box-shadow:0 0 0 3px rgba(0,168,107,0.08);
        }
        .f-nl-icon-wrap {
          width:40px; display:flex; align-items:center; justify-content:center;
          color:var(--f-muted); flex-shrink:0;
        }
        .f-nl-input-row input {
          background:transparent !important; border:none !important; outline:none !important;
          box-shadow:none !important; padding:10px 8px 10px 0 !important;
          font-family:'DM Sans',sans-serif !important; font-size:13px !important;
          color:var(--f-text) !important; flex:1; min-width:0;
        }
        .f-nl-input-row input::placeholder { color:var(--f-muted) !important; }
        .f-nl-btn {
          padding:10px 16px; background:var(--grad); border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700;
          color:#fff; letter-spacing:0.07em; text-transform:uppercase;
          transition:filter 0.2s, opacity 0.2s; white-space:nowrap;
          display:flex; align-items:center; gap:5px;
        }
        .f-nl-btn:hover { filter:brightness(1.1); }

        /* Social row */
        .f-social-label { font-size:10.5px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--f-muted); margin-top:4px; }
        .f-social { display:flex; gap:8px; flex-wrap:wrap; }
        .f-social a {
          display:flex; align-items:center; gap:7px;
          padding:7px 12px 7px 8px;
          border-radius:9px;
          background:var(--f-surface2);
          border:1px solid var(--f-border);
          font-size:12px; font-weight:600;
          color:var(--f-muted2);
          text-decoration:none;
          transition:all 0.2s; white-space:nowrap;
        }
        .f-social a:hover { color:#fff; transform:translateY(-2px); }
        .f-social a .s-icon { width:22px; height:22px; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .f-social a.fb:hover  { border-color:rgba(24,119,242,0.5); box-shadow:0 4px 16px rgba(24,119,242,0.2); }
        .f-social a.fb .s-icon { background:rgba(24,119,242,0.15); color:#4a9eff; }
        .f-social a.ig:hover  { border-color:rgba(225,48,108,0.5); box-shadow:0 4px 16px rgba(225,48,108,0.2); }
        .f-social a.ig .s-icon { background:rgba(225,48,108,0.15); color:#f472b6; }
        .f-social a.yt:hover  { border-color:rgba(255,0,0,0.5); box-shadow:0 4px 16px rgba(255,0,0,0.2); }
        .f-social a.yt .s-icon { background:rgba(255,0,0,0.15); color:#ff4040; }
        .f-social a.tw:hover  { border-color:rgba(255,255,255,0.2); box-shadow:0 4px 16px rgba(255,255,255,0.08); }
        .f-social a.tw .s-icon { background:rgba(255,255,255,0.08); color:#e2e8f0; }
        .f-social a.wa:hover  { border-color:rgba(37,211,102,0.5); box-shadow:0 4px 16px rgba(37,211,102,0.2); }
        .f-social a.wa .s-icon { background:rgba(37,211,102,0.15); color:#25d366; }

        /* Payment methods */
        .f-payments { display:flex; flex-direction:column; gap:10px; margin-top:4px; }
        .f-pay-label { font-size:10.5px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--f-muted); }
        .f-pay-row { display:flex; gap:7px; flex-wrap:wrap; }
        .f-pay-badge {
          display:flex; align-items:center; gap:5px;
          padding:5px 10px; border-radius:7px;
          background:var(--f-surface2); border:1px solid var(--f-border);
          font-size:11px; font-weight:600; color:var(--f-muted2);
          transition:border-color 0.2s;
        }
        .f-pay-badge:hover { border-color:rgba(0,168,107,0.3); }
        .f-pay-badge svg { flex-shrink:0; }

        /* ─── Bottom bar ─── */
        .f-bottom { position:relative; margin-top:44px; padding-top:24px; }
        .f-bottom::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent 0%,rgba(232,17,45,0.35) 20%,rgba(200,20,70,0.45) 50%,rgba(0,168,107,0.35) 80%,transparent 100%);
        }
        .f-bottom-inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }
        .f-copy { font-size:12px; font-weight:400; color:var(--f-muted); letter-spacing:0.01em; display:flex; align-items:center; gap:5px; }
        .f-copy strong { background:var(--grad-text); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:700; }
        .f-copy .heart { color:var(--f-red2); animation:heartbeat 1.8s ease infinite; }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }

        .f-mib {
          display:inline-flex; align-items:center; gap:7px;
          padding:5px 14px; border-radius:99px;
          border:1px solid var(--f-border); background:rgba(255,255,255,0.03);
          font-size:11px; font-weight:600; letter-spacing:0.06em;
          text-transform:uppercase; color:var(--f-muted);
          font-family:'Hind Siliguri',sans-serif;
        }
        .f-mib-flag { display:flex; gap:2px; align-items:center; }
        .f-mib-flag span { display:block; width:9px; height:9px; border-radius:50%; }
        .f-mib-flag .dot-r { background:var(--f-red); }
        .f-mib-flag .dot-g { background:var(--f-green); }

        .f-policy-links { display:flex; gap:14px; }
        .f-policy-links a {
          font-size:11.5px; font-weight:500; color:var(--f-muted);
          text-decoration:none; letter-spacing:0.02em;
          transition:color 0.18s; display:flex; align-items:center; gap:4px;
        }
        .f-policy-links a:hover { color:var(--f-text); }

        /* ─── Responsive ─── */
        @media (max-width:1024px) {
          .f-grid { grid-template-columns:1fr 1fr; gap:32px; }
          .f-usp  { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:640px) {
          .f-grid { grid-template-columns:1fr; gap:28px; }
          .f-usp  { grid-template-columns:1fr 1fr; gap:8px; }
          .f-inner { padding:36px 20px 28px; }
          .f-brand { align-items:center; text-align:center; }
          .f-tagline { text-align:center; }
          .f-bottom-inner { justify-content:center; text-align:center; }
          .f-usp-item { padding:10px 12px; }
          .f-usp-title { font-size:12px; }
          .f-social { justify-content:center; }
          .f-pay-row { justify-content:center; }
          .f-contact-list { align-items:center; }
        }
      `}</style>

            <footer className="f-shell">
                <div className="f-blob f-blob-red" aria-hidden />
                <div className="f-blob f-blob-green" aria-hidden />
                <div className="f-blob f-blob-mid" aria-hidden />
                <div className="f-top-border" aria-hidden />

                <div className="f-inner">

                    {/* ══════════════ USP STRIP ══════════════ */}
                    <div className="f-usp">
                        {[
                            { icon: Truck, color: "green", title: "ফ্রি ডেলিভারি", sub: "৳৯৯৯+ অর্ডারে" },
                            { icon: ShieldCheck, color: "blue", title: "নিরাপদ পেমেন্ট", sub: "১০০% নিরাপদ ও সুরক্ষিত" },
                            { icon: RefreshCcw, color: "amber", title: "সহজ রিটার্ন", sub: "৭ দিনের মধ্যে" },
                            { icon: HeadphonesIcon, color: "red", title: "২৪/৭ সাপোর্ট", sub: "সর্বদা আপনার পাশে" },
                        ].map(({ icon: Icon, color, title, sub }) => (
                            <div className="f-usp-item" key={title}>
                                <div className={`f-usp-icon ${color}`}>
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <div className="f-usp-title">{title}</div>
                                    <div className="f-usp-sub">{sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ══════════════ MAIN GRID ══════════════ */}
                    <div className="f-grid">

                        {/* ── Col 1 : Brand + Contact ── */}
                        <div className="f-brand">
                            <Link href="/" className="f-brand-lockup">
                                <div className="f-logo">
                                    <div className="f-logo-bg" />
                                    <div className="f-logo-inner">
                                        <span className="f-logo-bangla">বব</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="f-brand-name">
                                        <span className="r">Bongo</span>{" "}
                                        <span className="g">Bazar</span>
                                    </p>
                                    <p className="f-brand-tag">Bangladesh's Smart Marketplace</p>
                                </div>
                            </Link>

                            <div className="f-pill-divider" aria-hidden />

                            <p className="f-tagline">
                                <strong>বাংলাদেশের বিশ্বস্ত অনলাইন মার্কেটপ্লেস</strong> — সারাদেশে ক্রেতা ও বিক্রেতাদের একটি প্ল্যাটফর্মে সংযুক্ত করছে।
                            </p>

                            <div className="f-contact-list">
                                <a href="tel:01641754794" className="f-contact-item">
                                    <span className="ci-icon green"><Phone size={13} strokeWidth={2.5} /></span>
                                    ০১৬৪১-৭৫৪৭৯৪
                                </a>
                                <a href="mailto:info@bongobazar.com" className="f-contact-item">
                                    <span className="ci-icon red"><Mail size={13} strokeWidth={2.5} /></span>
                                    info@bongobazar.com
                                </a>
                                <span className="f-contact-item">
                                    <span className="ci-icon amber"><MapPin size={13} strokeWidth={2.5} /></span>
                                    ঢাকা, বাংলাদেশ
                                </span>
                                <span className="f-contact-item">
                                    <span className="ci-icon green"><Clock size={13} strokeWidth={2.5} /></span>
                                    শনি–বৃহস্পতি, সকাল ৯টা – রাত ৯টা
                                </span>
                            </div>
                        </div>

                        {/* ── Col 2 : Quick Links ── */}
                        <nav aria-label="Quick links">
                            <div className="f-col-title">
                                <ShoppingBag size={12} style={{ color: "var(--f-green2)" }} />
                                কুইক লিংক
                            </div>
                            <div className="f-link-list">
                                {[
                                    { href: "/", label: "হোম", icon: Home, color: "green" },
                                    { href: "/hot-deals", label: "হট ডিল 🔥", icon: Flame, color: "red" },
                                    { href: "/products", label: "সব প্রোডাক্ট", icon: Tag, color: "amber" },
                                    { href: "/events", label: "ইভেন্টস", icon: CalendarDays, color: "blue" },
                                    { href: "/about", label: "আমাদের সম্পর্কে", icon: Info, color: "purple" },
                                    { href: "/contact", label: "যোগাযোগ", icon: MessageCircle, color: "green" },
                                ].map(({ href, label, icon: Icon, color }) => (
                                    <Link key={href} href={href} className="f-link-item">
                                        <span className={`f-link-icon ${color}`}><Icon size={13} strokeWidth={2} /></span>
                                        {label}
                                        <ChevronRight size={12} className="f-arrow" />
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* ── Col 3 : Customer Service ── */}
                        <nav aria-label="Customer service">
                            <div className="f-col-title">
                                <HeadphonesIcon size={12} style={{ color: "var(--f-red2)" }} />
                                কাস্টমার কেয়ার
                            </div>
                            <div className="f-link-list">
                                {[
                                    { href: "/account", label: "আমার একাউন্ট", icon: Star, color: "amber" },
                                    { href: "/orders", label: "অর্ডার ট্র্যাক", icon: Truck, color: "green" },
                                    { href: "/wishlist", label: "উইশলিস্ট", icon: Heart, color: "red" },
                                    { href: "/returns", label: "রিটার্ন পলিসি", icon: RefreshCcw, color: "blue" },
                                    { href: "/faq", label: "FAQ", icon: MessageCircle, color: "purple" },
                                    { href: "/seller", label: "বিক্রেতা হন", icon: Globe, color: "green" },
                                ].map(({ href, label, icon: Icon, color }) => (
                                    <Link key={href} href={href} className="f-link-item">
                                        <span className={`f-link-icon ${color}`}><Icon size={13} strokeWidth={2} /></span>
                                        {label}
                                        <ChevronRight size={12} className="f-arrow" />
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* ── Col 4 : Newsletter + Social + Payment ── */}
                        <div className="f-newsletter-wrap">
                            <div className="f-col-title">
                                <Send size={12} style={{ color: "var(--f-green2)" }} />
                                নিউজলেটার
                            </div>
                            <p className="f-newsletter-desc">
                                <strong>অফার ও নতুন প্রোডাক্ট</strong> সবার আগে পেতে সাবস্ক্রাইব করুন।
                            </p>
                            <div className="f-newsletter">
                                <div className="f-nl-input-row">
                                    <div className="f-nl-icon-wrap">
                                        <Mail size={14} strokeWidth={2} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="আপনার ইমেইল লিখুন..."
                                        aria-label="নিউজলেটার সাবস্ক্রাইব"
                                    />
                                    <button type="button" className="f-nl-btn">
                                        <Send size={12} />
                                        যান
                                    </button>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--f-muted)" }}>
                                    <CheckCircle2 size={12} style={{ color: "var(--f-green2)", flexShrink: 0 }} />
                                    স্প্যাম নেই। যেকোনো সময় আনসাবস্ক্রাইব করুন।
                                </div>
                            </div>

                            {/* Social */}
                            <p className="f-social-label">আমাদের অনুসরণ করুন</p>
                            <div className="f-social">
                                <a href="#" className="fb" aria-label="Facebook">
                                    <span className="s-icon"><Facebook size={13} /></span>
                                    Facebook
                                </a>
                                <a href="#" className="ig" aria-label="Instagram">
                                    <span className="s-icon"><Instagram size={13} /></span>
                                    Instagram
                                </a>
                                <a href="#" className="yt" aria-label="YouTube">
                                    <span className="s-icon"><Youtube size={13} /></span>
                                    YouTube
                                </a>
                                <a href="#" className="tw" aria-label="X / Twitter">
                                    <span className="s-icon">
                                        {/* X logo */}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </span>
                                    Twitter
                                </a>
                                <a href="https://wa.me/8801641754794" className="wa" aria-label="WhatsApp">
                                    <span className="s-icon">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </span>
                                    WhatsApp
                                </a>
                            </div>

                            {/* Payment Methods */}
                            <div className="f-payments">
                                <p className="f-pay-label">পেমেন্ট পদ্ধতি</p>
                                <div className="f-pay-row">
                                    {[
                                        { icon: Smartphone, color: "#25d366", label: "bKash" },
                                        { icon: Smartphone, color: "#f97316", label: "Nagad" },
                                        { icon: Wallet, color: "#8b5cf6", label: "Rocket" },
                                        { icon: CreditCard, color: "#3b82f6", label: "Card" },
                                        { icon: Banknote, color: "#10b981", label: "COD" },
                                    ].map(({ icon: Icon, color, label }) => (
                                        <div className="f-pay-badge" key={label}>
                                            <Icon size={13} style={{ color }} strokeWidth={2} />
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ══════════════ BOTTOM BAR ══════════════ */}
                    <div className="f-bottom">
                        <div className="f-bottom-inner">

                            <p className="f-copy">
                                © {currentYear}{" "}
                                <strong>Bongo Bazar</strong>.{" "}
                                Made with{" "}
                                <Heart size={11} className="heart" style={{ display: "inline", verticalAlign: "middle", fill: "var(--f-red2)", color: "var(--f-red2)" }} />{" "}
                                in Bangladesh
                            </p>

                            <div className="f-mib">
                                <div className="f-mib-flag">
                                    <span className="dot-r" />
                                    <span className="dot-g" />
                                </div>
                                Made in Bangladesh
                            </div>

                            <div className="f-policy-links">
                                {[
                                    { href: "/terms", label: "Terms", icon: ShieldCheck },
                                    { href: "/privacy", label: "Privacy", icon: ShieldCheck },
                                    { href: "/cookies", label: "Cookies", icon: Globe },
                                ].map(({ href, label, icon: Icon }) => (
                                    <Link key={href} href={href}>
                                        <Icon size={11} />
                                        {label}
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}