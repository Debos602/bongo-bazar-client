import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500;700&family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

                /* ─── Tokens ─── */
                :root {
                    --f-red:      #e8112d;
                    --f-red2:     #ff4560;
                    --f-green:    #00a86b;
                    --f-green2:   #00d48a;
                    --f-bg:       #080e09;
                    --f-surface:  #0e1a10;
                    --f-border:   rgba(255,255,255,0.07);
                    --f-muted:    rgba(255,255,255,0.38);
                    --f-text:     rgba(255,255,255,0.88);
                    --grad: linear-gradient(110deg, var(--f-red) 0%, #c0103a 38%, #007a52 62%, var(--f-green) 100%);
                    --grad-text: linear-gradient(105deg, var(--f-red2) 0%, #ff8fa0 40%, var(--f-green2) 100%);
                }

                /* ─── Outer shell ─── */
                .f-shell {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: var(--f-bg);
                    font-family: 'DM Sans', sans-serif;
                }

                /* ─── Gradient glow blobs ─── */
                .f-blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(80px);
                    z-index: 0;
                }
                .f-blob-red {
                    width: 520px; height: 340px;
                    background: radial-gradient(ellipse, rgba(232,17,45,0.22) 0%, transparent 70%);
                    top: -60px; left: -80px;
                }
                .f-blob-green {
                    width: 480px; height: 320px;
                    background: radial-gradient(ellipse, rgba(0,168,107,0.20) 0%, transparent 70%);
                    bottom: -40px; right: -60px;
                }
                .f-blob-mid {
                    width: 300px; height: 200px;
                    background: radial-gradient(ellipse, rgba(180,30,80,0.10) 0%, transparent 70%);
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                }

                /* ─── Gradient top border ─── */
                .f-top-border {
                    height: 3px;
                    width: 100%;
                    background: var(--grad);
                    position: relative;
                    z-index: 2;
                }
                /* Glow under the border */
                .f-top-border::after {
                    content: '';
                    position: absolute;
                    bottom: -8px; left: 0; right: 0;
                    height: 18px;
                    background: var(--grad);
                    filter: blur(10px);
                    opacity: 0.35;
                }

                /* ─── Inner wrapper ─── */
                .f-inner {
                    position: relative;
                    z-index: 1;
                    max-width: 1180px;
                    margin: 0 auto;
                    padding: 52px 40px 36px;
                }

                /* ─── Main grid ─── */
                .f-grid {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: start;
                    gap: 48px;
                }

                /* ─── Brand block ─── */
                .f-brand {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }

                .f-brand-lockup {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    text-decoration: none;
                }

                /* Logo hex */
                .f-logo {
                    position: relative;
                    width: 52px; height: 52px;
                    flex-shrink: 0;
                }
                .f-logo-bg {
                    position: absolute;
                    inset: 0;
                    border-radius: 14px;
                    background: var(--grad);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.08),
                        0 6px 24px rgba(232,17,45,0.3),
                        0 6px 24px rgba(0,168,107,0.2);
                }
                .f-logo-inner {
                    position: absolute;
                    inset: 2.5px;
                    border-radius: 12px;
                    background: var(--f-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .f-logo-bangla {
                    font-family: 'Hind Siliguri', sans-serif;
                    font-size: 16px;
                    font-weight: 700;
                    background: var(--grad-text);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .f-brand-name {
                    font-family: 'Fraunces', serif;
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: -0.03em;
                    line-height: 1;
                    margin: 0 0 3px;
                }
                .f-brand-name .r { color: var(--f-red2); }
                .f-brand-name .g { color: var(--f-green2); }

                .f-brand-tag {
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: var(--f-muted);
                    margin: 0;
                }

                /* Tagline */
                .f-tagline {
                    font-size: 13px;
                    color: var(--f-muted);
                    line-height: 1.65;
                    max-width: 240px;
                    font-weight: 300;
                }
                .f-tagline strong {
                    color: var(--f-text);
                    font-weight: 500;
                }

                /* Gradient divider pill */
                .f-pill-divider {
                    width: 48px;
                    height: 3px;
                    border-radius: 99px;
                    background: var(--grad);
                    margin-top: 4px;
                }

                /* ─── Center nav ─── */
                .f-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding-top: 4px;
                }

                .f-nav-label {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: var(--f-muted);
                    margin-bottom: 10px;
                }

                .f-nav a {
                    position: relative;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--f-muted);
                    text-decoration: none;
                    padding: 7px 22px;
                    border-radius: 8px;
                    border: 1px solid transparent;
                    transition: color 0.2s, border-color 0.2s, background 0.2s;
                    white-space: nowrap;
                    text-align: center;
                    width: 140px;
                    overflow: hidden;
                }
                /* Gradient underline slide-in */
                .f-nav a::after {
                    content: '';
                    position: absolute;
                    bottom: 6px; left: 22px; right: 22px;
                    height: 1.5px;
                    background: var(--grad);
                    border-radius: 99px;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
                }
                .f-nav a:hover {
                    color: var(--f-text);
                    background: rgba(255,255,255,0.04);
                    border-color: var(--f-border);
                }
                .f-nav a:hover::after { transform: scaleX(1); }

                /* ─── Right: social + copy ─── */
                .f-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 20px;
                    padding-top: 4px;
                }

                /* Social row */
                .f-social {
                    display: flex;
                    gap: 10px;
                }
                .f-social a {
                    width: 38px; height: 38px;
                    border-radius: 10px;
                    background: var(--f-surface);
                    border: 1px solid var(--f-border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--f-muted);
                    text-decoration: none;
                    font-size: 15px;
                    transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
                }
                .f-social a:hover {
                    color: var(--f-text);
                    background: rgba(255,255,255,0.06);
                    transform: translateY(-2px);
                }
                .f-social a.s-red:hover {
                    border-color: rgba(232,17,45,0.45);
                    box-shadow: 0 4px 14px rgba(232,17,45,0.18);
                    color: var(--f-red2);
                }
                .f-social a.s-green:hover {
                    border-color: rgba(0,168,107,0.45);
                    box-shadow: 0 4px 14px rgba(0,168,107,0.18);
                    color: var(--f-green2);
                }

                /* Newsletter input */
                .f-newsletter {
                    display: flex;
                    gap: 0;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 1px solid var(--f-border);
                    background: var(--f-surface);
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .f-newsletter:focus-within {
                    border-color: rgba(0,168,107,0.4);
                    box-shadow: 0 0 0 3px rgba(0,168,107,0.08);
                }
                .f-newsletter input {
                    background: transparent !important;
                    border: none !important;
                    outline: none !important;
                    box-shadow: none !important;
                    padding: 9px 14px !important;
                    font-family: 'DM Sans', sans-serif !important;
                    font-size: 13px !important;
                    color: var(--f-text) !important;
                    width: 180px;
                }
                .f-newsletter input::placeholder { color: var(--f-muted) !important; }
                .f-newsletter button {
                    padding: 9px 14px;
                    background: var(--grad);
                    background-size: 200% 100%;
                    background-position: 0% center;
                    border: none;
                    cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    transition: background-position 0.4s, filter 0.2s;
                    white-space: nowrap;
                }
                .f-newsletter button:hover {
                    background-position: 100% center;
                    filter: brightness(1.08);
                }

                /* ─── Bottom bar ─── */
                .f-bottom {
                    position: relative;
                    margin-top: 40px;
                    padding-top: 24px;
                }
                /* Gradient rule above bottom */
                .f-bottom::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg,
                        transparent 0%,
                        rgba(232,17,45,0.4) 20%,
                        rgba(200,20,70,0.5) 50%,
                        rgba(0,168,107,0.4) 80%,
                        transparent 100%);
                }

                .f-bottom-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 12px;
                }

                .f-copy {
                    font-size: 12px;
                    font-weight: 400;
                    color: var(--f-muted);
                    letter-spacing: 0.01em;
                }
                .f-copy strong {
                    background: var(--grad-text);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 700;
                }

                /* Gradient "Made in Bangladesh" badge */
                .f-mib {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 5px 14px;
                    border-radius: 99px;
                    border: 1px solid var(--f-border);
                    background: rgba(255,255,255,0.03);
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--f-muted);
                    font-family: 'Hind Siliguri', sans-serif;
                }
                .f-mib-flag {
                    display: flex;
                    gap: 2px;
                    align-items: center;
                }
                .f-mib-flag span {
                    display: block;
                    width: 8px; height: 8px;
                    border-radius: 50%;
                }
                .f-mib-flag .dot-r { background: var(--f-red); }
                .f-mib-flag .dot-g { background: var(--f-green); }

                .f-policy-links {
                    display: flex;
                    gap: 16px;
                }
                .f-policy-links a {
                    font-size: 11.5px;
                    font-weight: 500;
                    color: var(--f-muted);
                    text-decoration: none;
                    letter-spacing: 0.02em;
                    transition: color 0.18s;
                }
                .f-policy-links a:hover { color: var(--f-text); }

                /* ─── Responsive ─── */
                @media (max-width: 900px) {
                    .f-grid {
                        grid-template-columns: 1fr;
                        gap: 36px;
                    }
                    .f-nav {
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                    }
                    .f-nav a { width: auto; }
                    .f-right { align-items: center; }
                    .f-brand { align-items: center; text-align: center; }
                    .f-tagline { text-align: center; }
                    .f-bottom-inner { justify-content: center; text-align: center; }
                    .f-inner { padding: 40px 24px 28px; }
                }
            `}</style>

      <footer className="f-shell">
        {/* Glow blobs */}
        <div className="f-blob f-blob-red" aria-hidden />
        <div className="f-blob f-blob-green" aria-hidden />
        <div className="f-blob f-blob-mid" aria-hidden />

        {/* Gradient top border with glow */}
        <div className="f-top-border" aria-hidden />

        <div className="f-inner">
          <div className="f-grid">

            {/* ── Left: Brand ── */}
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
                  <p className="f-brand-tag">Smart Blog System</p>
                </div>
              </Link>

              <div className="f-pill-divider" aria-hidden />

              <p className="f-tagline">
                Bangladesh&apos;s <strong>Bongo Bazar</strong> marketplace — connecting buyers and sellers across the country.
              </p>
            </div>

            {/* ── Center: Nav ── */}
            <nav className="f-nav" aria-label="Footer navigation">
              <span className="f-nav-label">Navigate</span>
              <Link href="/">Home</Link>
              <Link href="/events">Events</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>

            {/* ── Right: Newsletter + Social ── */}
            <div className="f-right">
              {/* Newsletter */}
              <div className="f-newsletter">
                <input type="email" placeholder="Your email…" aria-label="Subscribe to newsletter" />
                <button type="button">Subscribe</button>
              </div>

              {/* Social icons (SVG inline) */}
              <div className="f-social">
                <a href="#" className="s-red" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="s-green" aria-label="Twitter/X">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="s-red" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a href="#" className="s-green" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="f-bottom">
            <div className="f-bottom-inner">
              <p className="f-copy">
                © {currentYear}{" "}
                <strong>Bongo Bazar Team</strong>.
                {" "}All rights reserved.
              </p>

              <div className="f-mib">
                <div className="f-mib-flag">
                  <span className="dot-r" />
                  <span className="dot-g" />
                </div>
                Made in Bangladesh
              </div>

              <div className="f-policy-links">
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/cookies">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}