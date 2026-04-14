import { useEffect, useRef } from "react";

export default function LandingPage({ navigate }) {
  const canvasRef = useRef(null);

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,168,67,${p.alpha})`;
        ctx.fill();
      });
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,168,67,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="landing-root">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="landing-canvas" />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <i className="fa fa-building-columns" />
            </div>
            <div>
              <div className="landing-logo-name">Nexus Bank</div>
              <div className="landing-logo-sub">AI Loan System</div>
            </div>
          </div>
          <nav className="landing-nav">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#process" className="landing-nav-link">How It Works</a>
            <a href="#products" className="landing-nav-link">Products</a>
            <a href="#stats" className="landing-nav-link">Stats</a>
            <button className="landing-nav-btn" onClick={() => navigate("home")}>
              <i className="fa fa-gauge" /> Dashboard
            </button>
          </nav>
          <button className="landing-mobile-menu">
            <i className="fa fa-bars" />
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-text">
            <div className="landing-hero-badge">
              <span className="badge-dot" />
              AI-Powered Banking Technology
            </div>
            <h1 className="landing-h1">
              Intelligent Loan<br />
              <span className="landing-h1-gold">Decisions in Seconds</span>
            </h1>
            <p className="landing-hero-para">
              Nexus Bank's AI Loan Agent combines Google Gemini 1.5 Flash, Groq LLaMA,
              and FAISS vector retrieval to deliver instant, policy-aware loan decisions
              with complete transparency and detailed reasoning.
            </p>
            <div className="landing-hero-btns">
              <button className="landing-btn-primary" onClick={() => navigate("apply")}>
                <i className="fa fa-bolt" />
                Get Started — Apply Now
              </button>
              <button className="landing-btn-outline" onClick={() => navigate("home")}>
                <i className="fa fa-gauge" />
                View Dashboard
              </button>
            </div>
            <div className="landing-hero-trust">
              <div className="trust-item">
                <i className="fa fa-shield-halved" />
                Bank-Grade Security
              </div>
              <div className="trust-sep" />
              <div className="trust-item">
                <i className="fa fa-clock" />
                Decision in 4 Seconds
              </div>
              <div className="trust-sep" />
              <div className="trust-item">
                <i className="fa fa-brain" />
                Gemini + Groq AI
              </div>
            </div>
          </div>

          {/* Hero SVG Illustration */}
          <div className="landing-hero-visual">
            <HeroSVG />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="landing-scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── STATS RIBBON ───────────────────────────────────────── */}
      <section className="landing-stats-ribbon" id="stats">
        {[
          { icon: "fa-check-circle",   val: "12,847+",  label: "Loans Approved",      color: "#22c55e" },
          { icon: "fa-clock",          val: "4.2s",      label: "Average Decision Time",color: "#d4a843" },
          { icon: "fa-chart-line",     val: "78.3%",    label: "Approval Rate",        color: "#3b82f6" },
          { icon: "fa-rupee-sign",     val: "Rs 842 Cr", label: "Total Disbursed",     color: "#a855f7" },
          { icon: "fa-users",          val: "2.4 Crore", label: "Customers Served",    color: "#f97316" },
          { icon: "fa-building-columns",val: "850+",    label: "Branches Nationwide",  color: "#14b8a6" },
        ].map((s, i) => (
          <div className="stats-ribbon-item" key={i}>
            <i className={`fa ${s.icon}`} style={{ color: s.color }} />
            <div className="stats-ribbon-val">{s.val}</div>
            <div className="stats-ribbon-lbl">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="landing-section" id="process">
        <div className="landing-section-inner">
          <div className="landing-section-label">How It Works</div>
          <h2 className="landing-h2">The AI Agent Process</h2>
          <p className="landing-section-sub">
            One click triggers a fully automated pipeline that evaluates your complete financial profile
            using bank-grade AI and delivers a decision with detailed reasoning.
          </p>

          <div className="process-flow">
            {[
              { icon: "fa-user-pen",      step: "01", title: "Submit Application",    desc: "Fill in personal, employment, and loan details through a guided 5-step form with real-time EMI preview." },
              { icon: "fa-database",      step: "02", title: "FAISS RAG Retrieval",   desc: "The AI retrieves the most relevant bank policies from the FAISS vector knowledge base for context-aware evaluation." },
              { icon: "fa-brain",         step: "03", title: "Gemini AI Assessment",  desc: "Google Gemini 1.5 Flash conducts a comprehensive credit risk analysis with detailed paragraph-level reasoning." },
              { icon: "fa-bolt",          step: "04", title: "Groq Summary Engine",   desc: "Groq LLaMA generates a professional detailed summary of the decision for the applicant and bank records." },
              { icon: "fa-gavel",         step: "05", title: "Instant Decision",      desc: "A final approval or rejection decision is rendered with full transparency, score, and alternative offer plans." },
              { icon: "fa-paper-plane",   step: "06", title: "Email Notification",    desc: "A formal sanction letter or decline notice is automatically dispatched to the applicant email address." },
            ].map((p, i) => (
              <div className="process-card" key={i}>
                <div className="process-step-num">{p.step}</div>
                <div className="process-icon-wrap">
                  <i className={`fa ${p.icon}`} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {i < 5 && <div className="process-connector"><i className="fa fa-arrow-right" /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section className="landing-section landing-section-alt" id="features">
        <div className="landing-section-inner">
          <div className="landing-section-label">Platform Features</div>
          <h2 className="landing-h2">Everything You Need</h2>
          <p className="landing-section-sub">
            A complete end-to-end AI loan processing system built for the modern banking environment.
          </p>
          <div className="features-grid">
            {[
              { icon: "fa-brain",          title: "Gemini 1.5 Flash AI",        desc: "Comprehensive credit risk analysis with executive summary, financial analysis, credit risk assessment, and approval rationale — all in detailed paragraphs.", color: "#dc2626", bg: "#fff1f2" },
              { icon: "fa-bolt",           title: "Groq LLaMA Summary",         desc: "Ultra-fast 3-paragraph professional loan decision summary generated by Groq's mixtral model with specific numeric references and formal tone.", color: "#d97706", bg: "#fef3c7" },
              { icon: "fa-database",       title: "FAISS Vector RAG",           desc: "15 loan policy documents encoded as FAISS vector embeddings. The AI retrieves top-5 relevant policies for every query to ensure policy-aware decisions.", color: "#7c3aed", bg: "#f3e8ff" },
              { icon: "fa-envelope",       title: "Automated Email Engine",     desc: "Full sanction letters for approved applicants and detailed rejection notices with alternative offers are dispatched automatically via SMTP.", color: "#1d4ed8", bg: "#dbeafe" },
              { icon: "fa-lightbulb",      title: "3 Alternative Loan Plans",   desc: "When rejected, the AI generates 3 restructured loan plans at 50%, 60%, and 70% of the requested amount with varied tenures and FOIR analysis.", color: "#16a34a", bg: "#dcfce7" },
              { icon: "fa-file-invoice",   title: "Detailed Report Download",   desc: "A comprehensive multi-section text report is generated covering all AI analysis paragraphs, financial metrics, RAG context, and improvement advice.", color: "#0891b2", bg: "#ecfeff" },
              { icon: "fa-shield-halved",  title: "5-Step Document Verification",desc: "Mock but realistic verification of PAN, Aadhaar, income proof, bank statements, and employment letter with rule-based status tracking.", color: "#be185d", bg: "#fce7f3" },
              { icon: "fa-calculator",     title: "Live EMI Calculator",        desc: "Real-time EMI calculation with year-wise amortization table, principal-to-interest breakdown, and FOIR ratio monitoring across all loan types.", color: "#b8890d", bg: "#fef9e7" },
            ].map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon" style={{ background: f.bg }}>
                  <i className={`fa ${f.icon}`} style={{ color: f.color }} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ───────────────────────────────────── */}
      <section className="landing-section" id="products">
        <div className="landing-section-inner">
          <div className="landing-section-label">Loan Products</div>
          <h2 className="landing-h2">Choose Your Loan</h2>
          <p className="landing-section-sub">
            Six loan categories with competitive rates, flexible tenures, and AI-powered instant approval.
          </p>
          <div className="products-grid">
            {[
              { icon: "fa-user",             name: "Personal Loan",   rate: "12.5% p.a.", max: "Rs 25 Lakh",   bg: "#fef3c7", ic: "#d97706" },
              { icon: "fa-house",            name: "Home Loan",       rate: "8.5% p.a.",  max: "Rs 2 Crore",   bg: "#dbeafe", ic: "#1d4ed8" },
              { icon: "fa-car",              name: "Car Loan",        rate: "9.25% p.a.", max: "Rs 50 Lakh",   bg: "#dcfce7", ic: "#16a34a" },
              { icon: "fa-graduation-cap",   name: "Education Loan",  rate: "10.5% p.a.", max: "Rs 40 Lakh",   bg: "#f3e8ff", ic: "#7c3aed" },
              { icon: "fa-briefcase",        name: "Business Loan",   rate: "13% p.a.",   max: "Rs 1 Crore",   bg: "#fff1f2", ic: "#dc2626" },
              { icon: "fa-coins",            name: "Gold Loan",       rate: "7.5% p.a.",  max: "Rs 75 Lakh",   bg: "#fef9e7", ic: "#b8890d" },
            ].map((p, i) => (
              <div className="product-tile" key={i} onClick={() => navigate("apply")}>
                <div className="product-tile-icon" style={{ background: p.bg }}>
                  <i className={`fa ${p.icon}`} style={{ color: p.ic }} />
                </div>
                <div className="product-tile-name">{p.name}</div>
                <div className="product-tile-rate">{p.rate}</div>
                <div className="product-tile-max">Up to {p.max}</div>
                <div className="product-tile-apply">
                  Apply Now <i className="fa fa-arrow-right" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <CTASvg />
          <div className="cta-text">
            <h2 className="cta-title">Ready to Apply?</h2>
            <p className="cta-para">
              Experience India's most advanced AI loan system. Get a comprehensive credit assessment,
              detailed AI analysis, and instant decision — all in under 10 seconds.
            </p>
            <div className="cta-btns">
              <button className="landing-btn-primary" onClick={() => navigate("apply")}>
                <i className="fa fa-file-signature" />
                Start Loan Application
              </button>
              <button className="landing-btn-outline-dark" onClick={() => navigate("contact")}>
                <i className="fa fa-headset" />
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-brand">
            <div className="landing-logo">
              <div className="landing-logo-icon"><i className="fa fa-building-columns" /></div>
              <div>
                <div className="landing-logo-name">Nexus Bank</div>
                <div className="landing-logo-sub">AI Loan System</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              India's most advanced AI-powered banking platform. Combining Gemini AI, Groq LLaMA,
              and FAISS vector retrieval for instant, transparent loan decisions.
            </p>
            <div className="footer-social">
              {["fa-twitter", "fa-linkedin", "fa-facebook", "fa-instagram"].map((ic, i) => (
                <div className="footer-social-icon" key={i}><i className={`fab ${ic}`} /></div>
              ))}
            </div>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-col-title">Loan Products</div>
              {["Personal Loan", "Home Loan", "Car Loan", "Education Loan", "Business Loan", "Gold Loan"].map(l => (
                <div key={l} className="footer-link" onClick={() => navigate("cards")}>{l}</div>
              ))}
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Quick Links</div>
              {[["Dashboard", "home"], ["Apply for Loan", "apply"], ["Cards & Deposits", "cards"], ["About Bank", "about"], ["Contact Us", "contact"]].map(([l, p]) => (
                <div key={l} className="footer-link" onClick={() => navigate(p)}>{l}</div>
              ))}
            </div>
            <div className="footer-col">
              <div className="footer-col-title">AI Technology</div>
              {["Gemini 1.5 Flash", "Groq LLaMA 3.1", "FAISS Vector RAG", "Flask Python API", "React + Vite UI", "SMTP Email Engine"].map(t => (
                <div key={t} className="footer-link">{t}</div>
              ))}
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Contact</div>
              <div className="footer-contact-item">
                <i className="fa fa-phone" />
                1800-XXX-XXXX
              </div>
              <div className="footer-contact-item">
                <i className="fa fa-envelope" />
                support@nexusbank.in
              </div>
              <div className="footer-contact-item">
                <i className="fa fa-location-dot" />
                Nexus Tower, MG Road, Bengaluru
              </div>
              <div className="footer-contact-item">
                <i className="fa fa-clock" />
                Mon-Sat: 9AM - 7PM IST
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-left">
              Copyright {new Date().getFullYear()} Nexus Bank. All rights reserved. IRDAI Reg No. XXXXX
            </div>
            <div className="footer-bottom-right">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Grievance Policy</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Hero SVG ──────────────────────────────────────────────────────────────── */
function HeroSVG() {
  return (
    <svg viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 520 }}>
      <defs>
        <linearGradient id="lcard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
        <linearGradient id="lgold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4a843" />
          <stop offset="100%" stopColor="#f5dfa0" />
        </linearGradient>
        <linearGradient id="lgreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <filter id="shadow1">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.3" />
        </filter>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background decorative circles */}
      <circle cx="400" cy="80" r="110" fill="rgba(212,168,67,0.05)">
        <animate attributeName="r" values="110;130;110" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="80" r="75" fill="rgba(212,168,67,0.07)">
        <animate attributeName="r" values="75;88;75" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="320" r="80" fill="rgba(26,115,232,0.06)">
        <animate attributeName="r" values="80;96;80" dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* ── Main credit card ── */}
      <g style={{ animation: "float4 4s ease-in-out infinite", transformOrigin: "220px 185px" }}>
        <rect x="68" y="100" width="260" height="165" rx="20" fill="url(#lcard)" filter="url(#shadow1)" />
        <rect x="68" y="100" width="260" height="165" rx="20" fill="none" stroke="rgba(212,168,67,0.45)" strokeWidth="1.5" />
        {/* Card shine */}
        <path d="M68 140 Q198 100 328 120" stroke="rgba(255,255,255,0.04)" strokeWidth="24" fill="none" />
        {/* Chip */}
        <rect x="94" y="142" width="38" height="29" rx="5" fill="url(#lgold)" />
        <line x1="94" y1="156" x2="132" y2="156" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <line x1="112" y1="142" x2="112" y2="171" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        {/* NFC symbol */}
        <path d="M296 135 Q304 128 312 135" fill="none" stroke="rgba(212,168,67,0.9)" strokeWidth="2" strokeLinecap="round" />
        <path d="M291 141 Q304 125 317 141" fill="none" stroke="rgba(212,168,67,0.65)" strokeWidth="2" strokeLinecap="round" />
        <path d="M286 147 Q304 122 322 147" fill="none" stroke="rgba(212,168,67,0.35)" strokeWidth="2" strokeLinecap="round" />
        {/* Card number */}
        {[94, 130, 166, 202].map((x, i) => (
          <g key={i}>
            {[0, 6, 12].map(dx => (
              <circle key={dx} cx={x + dx} cy="204" r="3.2" fill={i < 3 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.9)"} />
            ))}
          </g>
        ))}
        <text x="244" y="210" fill="rgba(255,255,255,0.85)" fontSize="11.5" fontFamily="monospace" textAnchor="end">7842</text>
        {/* Name and branding */}
        <text x="94" y="248" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="sans-serif">NEXUS BANK PREMIUM</text>
        <text x="318" y="248" fill="url(#lgold)" fontSize="11" fontFamily="serif" textAnchor="end" fontWeight="bold">NEXUS</text>
      </g>

      {/* ── Approved badge ── */}
      <g style={{ animation: "float1 3.2s ease-in-out infinite", transformOrigin: "415px 195px" }}>
        <rect x="356" y="148" width="130" height="90" rx="16" fill="url(#lgreen)" filter="url(#shadow1)" />
        <rect x="356" y="148" width="130" height="90" rx="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="388" cy="178" r="13" fill="rgba(255,255,255,0.18)" />
        <text x="388" y="183" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">✓</text>
        <text x="421" y="173" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="sans-serif">STATUS</text>
        <text x="421" y="188" fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">APPROVED</text>
        <text x="421" y="203" fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="sans-serif">Rs 5,00,000</text>
        {/* Pulse rings */}
        <circle cx="388" cy="220" r="6" fill="rgba(255,255,255,0.9)">
          <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── Data nodes ── */}
      {[
        [52, 72, "#1d4ed8", "SALARY", "Rs 45K"],
        [52, 295, "#7c3aed", "CIBIL", "780"],
        [446, 305, "#d97706", "EMI", "Rs 8.2K"],
        [460, 90, "#16a34a", "SCORE", "82/100"],
      ].map(([cx, cy, col, lbl, val], i) => (
        <g key={i} style={{ animation: `float${(i % 3) + 1} ${2.6 + i * 0.4}s ${i * 0.4}s ease-in-out infinite`, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r="32" fill={col} opacity="0.12" />
          <circle cx={cx} cy={cy} r="23" fill={col} opacity="0.2" />
          <circle cx={cx} cy={cy} r="16" fill={col} />
          <text x={cx} y={cy - 3} fill="white" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif" opacity="0.85">{lbl}</text>
          <text x={cx} y={cy + 8} fill="white" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">{val}</text>
        </g>
      ))}

      {/* ── AI Brain node ── */}
      <g style={{ animation: "float2 3.8s ease-in-out infinite", transformOrigin: "260px 335px" }}>
        <circle cx="260" cy="335" r="36" fill="#0a1628" opacity="0.9" />
        <circle cx="260" cy="335" r="36" fill="none" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5">
          <animate attributeName="stroke-dasharray" values="0 226;226 0;226 0" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text x="260" y="330" textAnchor="middle" fontSize="22" fill="white">AI</text>
        <text x="260" y="348" textAnchor="middle" fontSize="9" fill="rgba(212,168,67,0.8)" fontFamily="sans-serif">NEXUS</text>
      </g>

      {/* ── Connector dashes ── */}
      {[
        ["M 80 100 L 52 100", "#1d4ed8"],
        ["M 80 270 L 52 280", "#7c3aed"],
        ["M 328 230 L 440 290", "#d97706"],
        ["M 328 130 L 448 108", "#16a34a"],
        ["M 180 265 L 240 305", "#d4a843"],
        ["M 310 265 L 270 305", "#d4a843"],
      ].map(([d, col], i) => (
        <path key={i} d={d} fill="none" stroke={col} strokeWidth="1.3"
          strokeDasharray="5,4" opacity="0.55">
          <animate attributeName="stroke-dashoffset" from="27" to="0" dur={`${1.5 + i * 0.25}s`} repeatCount="indefinite" />
        </path>
      ))}
    </svg>
  );
}

/* ── CTA SVG ─────────────────────────────────────────────────────────────── */
function CTASvg() {
  return (
    <svg viewBox="0 0 280 220" style={{ width: 280, flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
      {/* Orbiting rings */}
      <circle cx="140" cy="110" r="90" fill="none" stroke="rgba(212,168,67,0.15)" strokeWidth="1" strokeDasharray="6,4">
        <animateTransform attributeName="transform" type="rotate" from="0 140 110" to="360 140 110" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="110" r="65" fill="none" stroke="rgba(212,168,67,0.1)" strokeWidth="1" strokeDasharray="4,5">
        <animateTransform attributeName="transform" type="rotate" from="360 140 110" to="0 140 110" dur="15s" repeatCount="indefinite" />
      </circle>
      {/* Central bank icon */}
      <circle cx="140" cy="110" r="42" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5">
        <animate attributeName="r" values="42;48;42" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="140" y="118" textAnchor="middle" fontSize="30" fill="#d4a843">$</text>
      {/* Orbiting icons */}
      {[
        ["fa", 0, "#3b82f6", "AI"],
        ["fb", 72, "#16a34a", "Rs"],
        ["fc", 144, "#d97706", "OK"],
        ["fd", 216, "#dc2626", "24h"],
        ["fe", 288, "#7c3aed", "RAG"],
      ].map(([id, angle, col, lbl], i) => {
        const rad = (angle * Math.PI) / 180;
        const ox = 140 + 90 * Math.cos(rad);
        const oy = 110 + 90 * Math.sin(rad);
        return (
          <g key={id}>
            <circle cx={ox} cy={oy} r="16" fill={col} opacity="0.85">
              <animate attributeName="opacity" values="0.85;0.5;0.85" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <text x={ox} y={oy + 4} textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="bold">{lbl}</text>
          </g>
        );
      })}
    </svg>
  );
}
