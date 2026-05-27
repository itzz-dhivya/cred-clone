import { useEffect, useRef, useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Features", "Rewards", "Security", "About", "Careers"];

const FEATURES = [
  { icon: "💳", title: "Credit Card Bills", desc: "Pay all your credit card bills in one place. Never miss a due date again.", tag: "Zero Fee", color: "#7C3AED", glow: "rgba(124,58,237,0.3)" },
  { icon: "🎁", title: "CRED Rewards", desc: "Earn exclusive CRED coins on every bill payment. Redeem for premium rewards.", tag: "Exclusive", color: "#D97706", glow: "rgba(217,119,6,0.3)" },
  { icon: "📊", title: "Credit Score", desc: "Track your credit score in real-time and get actionable insights to improve it.", tag: "Free", color: "#059669", glow: "rgba(5,150,105,0.3)" },
  { icon: "⚡", title: "UPI Payments", desc: "Blazing fast UPI payments with cashback on every transaction.", tag: "Instant", color: "#0891B2", glow: "rgba(8,145,178,0.3)" },
  { icon: "🪙", title: "CRED Coins", desc: "Your loyalty currency. Accumulate coins and unlock a world of premium perks.", tag: "Premium", color: "#DC2626", glow: "rgba(220,38,38,0.3)" },
  { icon: "💰", title: "Cashback Offers", desc: "Member-only cashback deals from top brands curated just for you.", tag: "Members Only", color: "#7C3AED", glow: "rgba(124,58,237,0.3)" },
];

const STATS = [
  { value: "11M+", label: "Premium Members" },
  { value: "4L Cr+", label: "Bills Paid" },
  { value: "4.8★", label: "App Store Rating" },
  { value: "2000+", label: "Brand Partners" },
];

const TESTIMONIALS = [
  { name: "Arjun Mehta", role: "Senior Product Manager", text: "CRED has completely transformed how I manage my credit cards. The rewards alone make it worth every second.", avatar: "AM", color: "#7C3AED" },
  { name: "Priya Sharma", role: "Startup Founder", text: "Being a CRED member feels exclusive. The partner deals are genuinely premium and the app is flawlessly designed.", avatar: "PS", color: "#D97706" },
  { name: "Rohit Verma", role: "Investment Banker", text: "I trust CRED with my financial data completely. Their security standards are beyond industry norms.", avatar: "RV", color: "#059669" },
  { name: "Sneha Kapoor", role: "Creative Director", text: "The credit score tracking feature alone is worth it. I went from 680 to 780 following CRED's suggestions.", avatar: "SK", color: "#0891B2" },
];

const SECURITY = [
  { icon: "🔐", title: "256-bit Encryption", desc: "Military-grade AES-256 encryption for all your financial data at rest and in transit." },
  { icon: "🛡️", title: "RBI Compliant", desc: "Fully compliant with Reserve Bank of India regulations and NPCI guidelines." },
  { icon: "🔒", title: "Zero Data Sale", desc: "Your data is never sold to third parties. Your privacy is our oath, not a policy." },
  { icon: "🧬", title: "Biometric Auth", desc: "Fingerprint and face recognition for secure, instant access — every single time." },
  { icon: "🔍", title: "Fraud Detection", desc: "AI-powered real-time fraud detection monitors every transaction 24/7." },
  { icon: "☁️", title: "Secure Cloud", desc: "ISO 27001 certified infrastructure with geo-redundant backups and zero downtime." },
];

const TRUST_POINTS = [
  { icon: "✦", label: "Only creditworthy members", desc: "CRED is invite-only — you earn your way in through a strong credit score." },
  { icon: "✦", label: "Curated brand universe", desc: "Every partner is vetted for quality. No spam, no noise — only the best." },
  { icon: "✦", label: "Rewards that matter", desc: "CRED Coins convert to real value across travel, dining, fashion, and more." },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useCountUp(targetStr, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(targetStr.replace(/[^0-9.]/g, ""));
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(parseFloat((p * num).toFixed(1)));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(num);
    };
    requestAnimationFrame(tick);
  }, [active, targetStr, duration]);
  return val;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #060606; color: #fff; font-family: 'DM Sans', 'Helvetica Neue', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #060606; }
    ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

    @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-24px) rotate(3deg)} }
    @keyframes float-med { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
    @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes shimmer-in { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes counter-in { from{opacity:0;transform:translateY(20px) scale(.9)} to{opacity:1;transform:translateY(0) scale(1)} }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes glow-pulse { 0%,100%{box-shadow:0 0 30px rgba(124,58,237,0.2)} 50%{box-shadow:0 0 60px rgba(124,58,237,0.5)} }

    .gradient-text {
      background: linear-gradient(135deg, #fff 0%, #c084fc 40%, #7C3AED 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text; animation: gradient-shift 5s ease infinite;
    }
    .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.8s ease, transform 0.8s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.9s ease, transform 0.9s ease; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.9s ease, transform 0.9s ease; }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }

    .neo-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 32px; border-radius: 50px; font-weight: 600;
      font-size: 0.95rem; cursor: pointer; border: none; letter-spacing: 0.3px;
      transition: all 0.3s cubic-bezier(0.23,1,0.32,1); position: relative; overflow: hidden;
      font-family: 'DM Sans', sans-serif;
    }
    .neo-btn::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: rgba(255,255,255,0); transition: background 0.3s;
    }
    .neo-btn:hover::before { background: rgba(255,255,255,0.08); }
    .neo-btn-primary {
      background: linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #A855F7 100%);
      color: #fff; box-shadow: 0 4px 30px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.15);
    }
    .neo-btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 50px rgba(124,58,237,0.65), inset 0 1px 0 rgba(255,255,255,0.15); }
    .neo-btn-outline {
      background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.15) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
    }
    .neo-btn-outline:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.3) !important; transform: translateY(-2px); }

    .glass-card {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      border-radius: 24px;
    }
    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 5px 18px; border-radius: 50px; margin-bottom: 1.5rem;
      background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.35);
      color: #A855F7; font-size: 0.72rem; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase;
    }
    .section-title {
      font-family: 'Playfair Display', Georgia, serif; font-weight: 800;
      line-height: 1.1; letter-spacing: -1px;
    }
    .divider { width: 48px; height: 2px; background: linear-gradient(90deg, #7C3AED, transparent); border-radius: 1px; margin: 1.5rem 0; }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .stack-mobile { flex-direction: column !important; }
      .full-mobile { width: 100% !important; }
      .center-mobile { text-align: center !important; align-items: center !important; }
    }
  `}</style>
);

// ─── REVEAL WRAPPER ─────────────────────────────────────────────────────────
function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${vis ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const goto = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "1rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,6,6,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "12px",
            background: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display', serif", fontWeight: "900", fontSize: "1.1rem", color: "#fff",
            boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
          }}>C</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: "800", fontSize: "1.5rem", letterSpacing: "-0.5px" }}>CRED</span>
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: "2.5rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => goto(l)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.55)", cursor: "pointer",
              fontSize: "0.88rem", fontWeight: "500", transition: "color .2s", fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.3px",
            }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
            >{l}</button>
          ))}
        </div>

        {/* CTA */}
        <div className="hide-mobile" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button className="neo-btn neo-btn-outline" style={{ padding: "9px 22px", fontSize: "0.88rem" }}>Log in</button>
          <button className="neo-btn neo-btn-primary" style={{ padding: "9px 22px", fontSize: "0.88rem" }}>Join CRED ↗</button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          display: "none", background: "none", border: "none", color: "#fff", fontSize: "1.4rem", cursor: "pointer",
        }} className="hamburger">
          {open ? "✕" : "☰"}
        </button>
        <style>{`@media(max-width:768px){.hamburger{display:block!important}}`}</style>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: "65px", left: 0, right: 0, zIndex: 999,
          background: "rgba(6,6,6,0.97)", backdropFilter: "blur(24px)",
          padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => goto(l)} style={{ background: "none", border: "none", color: "#fff", fontSize: "1.05rem", fontWeight: "600", cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif" }}>{l}</button>
          ))}
          <button className="neo-btn neo-btn-primary" style={{ marginTop: "0.5rem" }}>Join CRED ↗</button>
        </div>
      )}
    </>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const fn = (e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "140px 2rem 100px",
      textAlign: "center",
    }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: "900px", height: "900px", borderRadius: "50%", top: "50%", left: "50%", transform: `translate(calc(-50% + ${(mouse.x - 0.5) * 60}px), calc(-50% + ${(mouse.y - 0.5) * 60}px))`, background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 68%)", transition: "transform 0.6s ease", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", bottom: "5%", right: "5%", background: "radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)", animation: "float-slow 9s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", top: "8%", left: "8%", background: "radial-gradient(ellipse, rgba(217,119,6,0.07) 0%, transparent 70%)", animation: "float-slow 12s ease-in-out infinite reverse", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", maxWidth: "960px", animation: "shimmer-in 1s ease forwards" }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 20px", borderRadius: "50px", marginBottom: "2.5rem", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.4)", color: "#C084FC", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A855F7", animation: "pulse-dot 2s infinite" }} />
          Members-Only Club
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: "900", fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)", lineHeight: "1.03", letterSpacing: "-3px", marginBottom: "1.75rem" }}>
          <span className="gradient-text">Good things</span><br />
          <span style={{ color: "#fff" }}>happen to those</span><br />
          <span style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>who pay on time.</span>
        </h1>

        <p style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "rgba(255,255,255,0.48)", maxWidth: "580px", margin: "0 auto 3rem", lineHeight: "1.85", fontWeight: "300" }}>
          CRED is a members-only club where trustworthy people are rewarded. Pay your bills, earn exclusive rewards, and unlock a world built for the privileged few.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="neo-btn neo-btn-primary" style={{ fontSize: "1rem", padding: "15px 40px" }}>Download App ↗</button>
          <button className="neo-btn neo-btn-outline" style={{ fontSize: "1rem", padding: "15px 40px" }}>Watch Demo →</button>
        </div>

        {/* Phone mockup */}
        <div style={{ marginTop: "5rem", animation: "float-med 7s ease-in-out infinite", display: "inline-block" }}>
          <div style={{
            width: "260px", height: "520px", borderRadius: "40px", margin: "0 auto",
            background: "linear-gradient(160deg, #13101e 0%, #1a1030 50%, #0e0922 100%)",
            border: "1.5px solid rgba(124,58,237,0.45)",
            boxShadow: "0 40px 120px rgba(124,58,237,0.28), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "2rem 1.5rem 1.5rem", position: "relative", overflow: "hidden",
          }}>
            {/* Phone inner glow */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "160px", background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.55) 0%, transparent 70%)" }} />
            {/* Notch */}
            <div style={{ width: "80px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.12)", marginBottom: "1.75rem" }} />
            {/* Score ring */}
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#7C3AED" strokeWidth="6" strokeDasharray="220 44" strokeLinecap="round" transform="rotate(-90 50 50)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: "800", fontFamily: "'Playfair Display', serif" }}>782</span>
                <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.45)", letterSpacing: "1px", textTransform: "uppercase" }}>Score</span>
              </div>
            </div>
            {/* Mini cards */}
            {[["Bills Due", "₹12,400"], ["CRED Coins", "4,820"]].map(([label, val]) => (
              <div key={label} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "10px 14px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#C084FC" }}>{val}</span>
              </div>
            ))}
            {/* Pay button */}
            <div style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED, #A855F7)", borderRadius: "14px", padding: "12px", textAlign: "center", fontSize: "0.8rem", fontWeight: "700", marginTop: "auto", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
              Pay Now →
            </div>
          </div>
        </div>

        {/* Store badges */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {[["★ 4.8", "App Store", "800K+ ratings"], ["★ 4.7", "Play Store", "2M+ ratings"]].map(([rating, store, sub]) => (
            <div key={store} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "14px", cursor: "pointer" }}>
              <span style={{ fontSize: "1.3rem" }}>{store === "App Store" ? "🍎" : "🤖"}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: "700", color: "#A855F7" }}>{rating} {store}</div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TICKER ─────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ["Credit Card Bills", "CRED Coins", "UPI Payments", "Cashback", "Credit Score", "Rewards", "Zero Fee", "Premium Members"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1rem 0", background: "rgba(255,255,255,0.02)" }}>
      <div style={{ display: "flex", gap: "0", animation: "ticker 18s linear infinite", width: "max-content" }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ padding: "0 2.5rem", fontSize: "0.8rem", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>
            {t} <span style={{ color: "#7C3AED", marginLeft: "2.5rem" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "120px 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "80px", alignItems: "center" }} className="stack-mobile">
        {/* Left */}
        <div style={{ flex: 1 }}>
          <Reveal direction="left">
            <div className="section-label"><span style={{ animation: "pulse-dot 2s infinite", width: 6, height: 6, borderRadius: "50%", background: "#A855F7", display: "inline-block" }} />The CRED Promise</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", marginBottom: "1.5rem" }}>
              Not everyone<br />
              <span className="gradient-text">gets in.</span>
            </h2>
            <div className="divider" />
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.9", fontSize: "1.05rem", marginBottom: "2.5rem", fontWeight: "300" }}>
              CRED is built on the belief that financial responsibility should be rewarded. Every member is vetted — only those with a credit score above 750 are invited to join. Exclusivity isn't snobbery; it's how we keep the quality of the club premium.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {TRUST_POINTS.map((p, i) => (
              <Reveal key={p.label} delay={i * 120}>
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#A855F7", fontSize: "0.75rem", flexShrink: 0, marginTop: "2px" }}>{p.icon}</div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#fff", marginBottom: "3px", fontSize: "0.95rem" }}>{p.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.87rem", lineHeight: "1.6" }}>{p.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <button className="neo-btn neo-btn-primary" style={{ marginTop: "2.5rem", fontSize: "0.95rem" }}>Check Your Eligibility →</button>
          </Reveal>
        </div>

        {/* Right visual */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Reveal direction="right" delay={100}>
            <div style={{ position: "relative", padding: "2rem" }}>
              {/* Rotating ring */}
              <div style={{ position: "absolute", inset: "10%", border: "1px dashed rgba(124,58,237,0.2)", borderRadius: "50%", animation: "spin-slow 20s linear infinite" }} />
              {/* Central card */}
              <div className="glass-card" style={{ padding: "2.5rem", textAlign: "center", position: "relative", zIndex: 1, animation: "glow-pulse 4s ease-in-out infinite" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💎</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>750+</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "2rem" }}>Min. Credit Score</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[["11M+", "Members"], ["₹4L Cr", "Paid"], ["4.8★", "Rating"], ["2000+", "Partners"]].map(([v, l]) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "14px 10px", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontWeight: "800", fontSize: "1.2rem", fontFamily: "'Playfair Display', serif", color: "#C084FC" }}>{v}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "1px", textTransform: "uppercase", marginTop: "3px" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating badges */}
              {[["🏆", "Member Since 2021", "-1rem", "-1rem"], ["✅", "Score Improved +42", "auto", "-0.5rem", "1rem"]].map(([icon, text, top, right, bottom]) => (
                <div key={text} className="glass-card" style={{ position: "absolute", top, right, bottom, padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", whiteSpace: "nowrap", animation: "float-slow 7s ease-in-out infinite" }}>
                  <span>{icon}</span><span style={{ color: "rgba(255,255,255,0.7)", fontWeight: "500" }}>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES ───────────────────────────────────────────────────────────────
function FeatureCard({ feature, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
          border: hov ? `1px solid ${feature.color}44` : "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px", padding: "2rem 1.75rem", cursor: "default",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          transform: hov ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)",
          boxShadow: hov ? `0 24px 64px ${feature.glow}` : "none",
          position: "relative", overflow: "hidden",
        }}
      >
        {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }} />}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: `${feature.color}1a`, border: `1px solid ${feature.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
            {feature.icon}
          </div>
          <span style={{ padding: "3px 12px", borderRadius: "20px", background: `${feature.color}1a`, color: feature.color, fontSize: "0.65rem", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", border: `1px solid ${feature.color}33` }}>
            {feature.tag}
          </span>
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: "700", color: "#fff", marginBottom: "0.75rem" }}>{feature.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: "1.75", fontSize: "0.88rem" }}>{feature.desc}</p>
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" style={{ padding: "120px 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label"><span style={{ animation: "pulse-dot 2s infinite", width: 6, height: 6, borderRadius: "50%", background: "#A855F7", display: "inline-block" }} />What CRED Offers</div>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.25rem" }}>
            Everything you need,<br /><span className="gradient-text">nothing you don't.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "520px", margin: "0 auto", lineHeight: "1.8", fontWeight: "300" }}>
            A curated suite of financial tools built exclusively for people who respect their credit.
          </p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} delay={i * 80} />)}
      </div>
    </section>
  );
}

// ─── STATS ──────────────────────────────────────────────────────────────────
function Stats() {
  const [ref, visible] = useInView(0.3);
  return (
    <section id="rewards" style={{ padding: "100px 2rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {STATS.map((s, i) => {
          const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
          const suffix = s.value.replace(/[0-9.]/g, "");
          const counted = useCountUp(s.value, 1800, visible);
          return (
            <div key={s.label} className="glass-card" style={{ padding: "2rem 1.5rem", textAlign: "center", animation: visible ? `counter-in 0.7s ease ${i * 100}ms both` : "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: "800", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
                {visible ? `${Math.round(counted)}${suffix}` : s.value}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: "500" }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ───────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  useEffect(() => {
    const t = setInterval(() => {
      setPrev(active);
      setActive(a => (a + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(t);
  }, [active]);
  const tm = TESTIMONIALS[active];
  return (
    <section style={{ padding: "120px 2rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <div className="section-label" style={{ justifyContent: "center" }}><span style={{ animation: "pulse-dot 2s infinite", width: 6, height: 6, borderRadius: "50%", background: "#A855F7", display: "inline-block" }} />Member Stories</div>
        <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "3.5rem" }}>
          Hear it from<br /><span className="gradient-text">those who know.</span>
        </h2>
      </Reveal>

      {/* Card */}
      <Reveal>
        <div className="glass-card" style={{ padding: "3rem 2.5rem", position: "relative", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
          <div style={{ fontSize: "3.5rem", lineHeight: 1, marginBottom: "1.5rem", opacity: 0.3, fontFamily: "'Playfair Display', serif" }}>"</div>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.85", color: "rgba(255,255,255,0.75)", marginBottom: "2rem", fontStyle: "italic", fontWeight: "300" }}>
            {tm.text}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: tm.color + "33", border: `1px solid ${tm.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.85rem", color: tm.color }}>
              {tm.avatar}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{tm.name}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{tm.role}</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Dots */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "8px", height: "8px", borderRadius: "4px", background: i === active ? "#7C3AED" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
        ))}
      </div>
    </section>
  );
}

// ─── SECURITY ───────────────────────────────────────────────────────────────
function Security() {
  return (
    <section id="security" style={{ padding: "120px 2rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}><span style={{ animation: "pulse-dot 2s infinite", width: 6, height: 6, borderRadius: "50%", background: "#A855F7", display: "inline-block" }} />Bank-Grade Security</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.25rem" }}>
              Your data.<br /><span className="gradient-text">Locked. Always.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.8", fontWeight: "300" }}>
              We hold ourselves to a higher standard than the industry. Because your trust is not a feature — it's our foundation.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {SECURITY.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="glass-card" style={{ padding: "1.75rem", display: "flex", gap: "16px", alignItems: "flex-start", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
              >
                <div style={{ fontSize: "1.75rem", flexShrink: 0, marginTop: "2px" }}>{s.icon}</div>
                <div>
                  <h3 style={{ fontWeight: "600", fontSize: "1rem", color: "#fff", marginBottom: "6px" }}>{s.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.86rem", lineHeight: "1.7" }}>{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust badges */}
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "3.5rem", flexWrap: "wrap" }}>
            {[["🏦", "RBI Regulated"], ["🔒", "PCI DSS"], ["☁️", "ISO 27001"], ["✅", "NPCI Certified"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "50px", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "500" }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CAREERS ────────────────────────────────────────────────────────────────
function Careers() {
  return (
    <section id="careers" style={{ padding: "120px 2rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <Reveal>
        <div className="section-label" style={{ justifyContent: "center" }}><span style={{ animation: "pulse-dot 2s infinite", width: 6, height: 6, borderRadius: "50%", background: "#A855F7", display: "inline-block" }} />Join the Team</div>
        <h2 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5rem" }}>
          Build for a<br /><span className="gradient-text">billion people.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "540px", margin: "0 auto 3rem", lineHeight: "1.85", fontWeight: "300" }}>
          CRED is building the financial operating system for India's most creditworthy citizens. We're looking for people who care deeply about craft, quality, and impact.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {[["⚙️", "Engineering", "34 open roles"], ["🎨", "Design", "8 open roles"], ["📈", "Product", "12 open roles"], ["📊", "Data", "19 open roles"]].map(([icon, dept, count]) => (
            <div key={dept} className="glass-card" style={{ padding: "1.5rem 2rem", minWidth: "160px", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ fontSize: "1.75rem", marginBottom: "10px" }}>{icon}</div>
              <div style={{ fontWeight: "600", color: "#fff", marginBottom: "4px" }}>{dept}</div>
              <div style={{ fontSize: "0.75rem", color: "#A855F7" }}>{count}</div>
            </div>
          ))}
        </div>
        <button className="neo-btn neo-btn-primary" style={{ marginTop: "2.5rem", fontSize: "0.95rem" }}>View All Openings ↗</button>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "CRED Coins", "Credit Score", "UPI", "Cashback"] },
    { title: "Company", links: ["About", "Careers", "Press", "Blog", "Partners"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Grievance", "Disclaimer"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "80px 2rem 40px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "60px", marginBottom: "60px" }} className="stack-mobile">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: "linear-gradient(135deg, #7C3AED, #A855F7)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: "900", fontSize: "1.1rem" }}>C</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: "800", fontSize: "1.4rem" }}>CRED</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", lineHeight: "1.8", fontSize: "0.88rem", maxWidth: "280px", marginBottom: "1.75rem", fontWeight: "300" }}>
              A members-only club that rewards you for being financially responsible.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: "10px" }}>
              {["𝕏", "in", "f", "📷"].map((s, i) => (
                <div key={i} style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", cursor: "pointer", color: "rgba(255,255,255,0.5)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.2)"; e.currentTarget.style.color = "#A855F7"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >{s}</div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: "600", fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>© 2024 CRED (Dreamplug Technologies Pvt. Ltd.) · All rights reserved.</div>
          <div style={{ display: "flex", gap: "16px" }}>
            {["RBI Regulated", "PCI DSS", "ISO 27001"].map(b => (
              <span key={b} style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function CREDWebsite() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Features />
        <Stats />
        <Testimonials />
        <Security />
        <Careers />
      </main>
      <Footer />
    </>
  );
}