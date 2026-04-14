import { useState, useEffect } from "react";

const RECENT_APPS = [
  { id:"NB20250112001", name:"Rajesh Kumar",    amount:"₹5,00,000",  type:"Home Loan",      status:"approved", date:"12 Jan 2025", score:82 },
  { id:"NB20250111002", name:"Priya Sharma",    amount:"₹2,50,000",  type:"Personal Loan",  status:"pending",  date:"11 Jan 2025", score:67 },
  { id:"NB20250110003", name:"Arun Patel",      amount:"₹8,00,000",  type:"Car Loan",       status:"rejected", date:"10 Jan 2025", score:44 },
  { id:"NB20250109004", name:"Meena Devi",      amount:"₹1,50,000",  type:"Education Loan", status:"approved", date:"09 Jan 2025", score:75 },
  { id:"NB20250108005", name:"Suresh Nair",     amount:"₹12,00,000", type:"Home Loan",      status:"approved", date:"08 Jan 2025", score:88 },
  { id:"NB20250107006", name:"Kavitha Menon",   amount:"₹3,75,000",  type:"Personal Loan",  status:"rejected", date:"07 Jan 2025", score:51 },
];

function HeroIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="hero-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a"/>
          <stop offset="100%" stopColor="#0a1628"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4a843"/>
          <stop offset="100%" stopColor="#f5dfa0"/>
        </linearGradient>
      </defs>

      {/* Glow circles */}
      <circle cx="320" cy="70" r="90" fill="rgba(212,168,67,0.06)">
        <animate attributeName="r" values="90;110;90" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="320" cy="70" r="60" fill="rgba(212,168,67,0.06)"/>
      <circle cx="80"  cy="230" r="60" fill="rgba(26,115,232,0.07)">
        <animate attributeName="r" values="60;75;60" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      {/* Main bank card */}
      <g className="float-4" style={{transformOrigin:"180px 145px"}}>
        <rect x="56" y="75" width="210" height="134" rx="18" fill="url(#cardGrad)"/>
        <rect x="56" y="75" width="210" height="134" rx="18" fill="none" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5"/>
        {/* Shine */}
        <path d="M56 105 L266 75" stroke="rgba(255,255,255,0.05)" strokeWidth="20"/>
        {/* Chip */}
        <rect x="78" y="108" width="30" height="24" rx="4" fill="url(#goldGrad)"/>
        <line x1="78" y1="119" x2="108" y2="119" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8"/>
        <line x1="92" y1="108" x2="92" y2="132" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8"/>
        {/* Contactless */}
        <path d="M235 100 Q241 95 247 100" fill="none" stroke="rgba(212,168,67,0.9)" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M231 105 Q241 91 251 105" fill="none" stroke="rgba(212,168,67,0.65)" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Card number */}
        {[78,108,138,168].map((x,i) => (
          <g key={i}>{[0,5,10].map(dx => <circle key={dx} cx={x+dx} cy="163" r="2.8" fill={i < 3 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.9)"}/>)}</g>
        ))}
        <text x="214" y="170" fill="rgba(255,255,255,0.9)" fontSize="9.5" fontFamily="monospace" textAnchor="end">1234</text>
        {/* Name & bank */}
        <text x="78" y="192" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="DM Sans">NEXUS BANK</text>
        <text x="244" y="192" fill="url(#goldGrad)" fontSize="10" fontFamily="Playfair Display" textAnchor="end" fontWeight="bold">NEXUS</text>
      </g>

      {/* Approved badge — floating */}
      <g className="float-1" style={{transformOrigin:"322px 155px"}}>
        <rect x="276" y="120" width="110" height="70" rx="14" fill="#15803d"/>
        <rect x="276" y="120" width="110" height="70" rx="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <circle cx="303" cy="145" r="10" fill="rgba(255,255,255,0.15)"/>
        <text x="303" y="149.5" textAnchor="middle" fill="white" fontSize="11">✓</text>
        <text x="331" y="142" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="DM Sans">STATUS</text>
        <text x="331" y="156" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans">APPROVED</text>
        <text x="303" y="177" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="DM Sans">₹5,00,000</text>
      </g>

      {/* Data nodes */}
      {[
        [42, 55, "#1d4ed8", "SALARY", "₹45K"],
        [42, 235, "#7c3aed", "CIBIL", "780"],
        [355, 230, "#d97706", "EMI", "₹8.2K"],
        [370, 90,  "#16a34a", "AI", "98%"],
      ].map(([cx,cy,col,lbl,val],i) => (
        <g key={i} className={`float-${(i%3)+1}`} style={{transformOrigin:`${cx}px ${cy}px`}}>
          <circle cx={cx} cy={cy} r="26" fill={col} opacity="0.15"/>
          <circle cx={cx} cy={cy} r="20" fill={col} opacity="0.25"/>
          <circle cx={cx} cy={cy} r="14" fill={col}/>
          <text x={cx} y={cy-3} fill="white" fontSize="7.5" textAnchor="middle" fontFamily="DM Sans" opacity="0.85">{lbl}</text>
          <text x={cx} y={cy+7}  fill="white" fontSize="9.5" textAnchor="middle" fontFamily="DM Sans" fontWeight="bold">{val}</text>
        </g>
      ))}

      {/* Connector lines */}
      <path d="M62 140 L42 85"  stroke="#1d4ed8" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <path d="M62 180 L42 228" stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.8s" repeatCount="indefinite"/>
      </path>
      <path d="M266 185 L348 228" stroke="#d97706" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.3s" repeatCount="indefinite"/>
      </path>
      <path d="M266 108 L350 105" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="5,3" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
}

export default function HomePage({ navigate }) {
  const [counter, setCounter] = useState({ apps:0, rate:0, time:0 });
  useEffect(() => {
    const t = setTimeout(() => setCounter({ apps:12847, rate:78.3, time:4.2 }), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page">
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div className="hero-banner mb32">
        <div className="hero-text">
          <div className="flex-center gap8 mb16">
            <span className="badge badge-gold"><i className="fa fa-robot"/>AI-POWERED BANKING</span>
            <span className="badge badge-success"><i className="fa fa-circle blink" style={{fontSize:7}}/>Live</span>
          </div>
          <h1>Smart Loans,<br/>Instant AI Decisions</h1>
          <p style={{marginTop:12}}>Our Gemini + Groq AI agent processes your complete loan application — from eligibility to disbursement — in seconds, not days. Powered by FAISS vector RAG for policy-aware decisions.</p>
          <div className="hero-btns">
            <button className="btn btn-gold btn-lg" onClick={() => navigate("apply")}>
              <i className="fa fa-bolt"/> Apply for Loan
            </button>
            <button className="btn btn-outline-white" onClick={() => navigate("about")}>
              <i className="fa fa-play-circle"/> How It Works
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">{counter.apps.toLocaleString("en-IN")}+</div>
              <div className="hero-stat-lbl">Loans Processed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">{counter.rate}%</div>
              <div className="hero-stat-lbl">Approval Rate</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">{counter.time}s</div>
              <div className="hero-stat-lbl">Avg Decision</div>
            </div>
          </div>
        </div>
        <HeroIllustration/>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div className="g4 mb32">
        {[
          { icon:"fa-check-circle",  label:"Total Approved",    value:"12,847",   sub:"+8.4% this month",  bg:"#dbeafe", ic:"#1d4ed8", up:true },
          { icon:"fa-clock",         label:"Avg Decision Time", value:"4.2s",     sub:"AI-powered speed",  bg:"#dcfce7", ic:"#16a34a", up:true },
          { icon:"fa-chart-line",    label:"Approval Rate",     value:"78.3%",    sub:"+2.1% vs last month",bg:"#fef3c7",ic:"#d97706", up:true },
          { icon:"fa-rupee-sign",    label:"Total Disbursed",   value:"₹842 Cr",  sub:"FY 2024–25",        bg:"#f3e8ff", ic:"#7c3aed", up:true },
        ].map((s,i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{background:s.bg}}><i className={`fa ${s.icon}`} style={{color:s.ic}}/></div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-change ${s.up?"up":"down"}`}>
              <i className={`fa fa-arrow-${s.up?"up":"down"}`} style={{fontSize:10}}/> {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Applications + AI Panel ─────────────────────── */}
      <div className="g2 mb32">
        {/* Recent Applications */}
        <div className="card">
          <div className="flex-between mb16">
            <span className="card-title"><i className="fa fa-list-alt" style={{marginRight:8,color:"var(--accent)"}}/>Recent Applications</span>
            <button className="btn btn-outline btn-sm" onClick={() => navigate("apply")}>
              <i className="fa fa-plus"/> New
            </button>
          </div>
          <table className="tbl">
            <thead>
              <tr><th>App ID</th><th>Name</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {RECENT_APPS.map(a => (
                <tr key={a.id} style={{cursor:"pointer"}}>
                  <td style={{fontSize:11,color:"var(--text3)"}}>{a.id.slice(-6)}</td>
                  <td style={{fontWeight:500}}>{a.name}</td>
                  <td>{a.amount}</td>
                  <td>
                    <span className={`badge badge-${a.status==="approved"?"success":a.status==="rejected"?"danger":"warn"}`}>
                      <i className={`fa fa-${a.status==="approved"?"check":a.status==="rejected"?"times":"clock"}`}/>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Agent Card */}
        <div className="card card-navy">
          <div className="flex-center gap12 mb16">
            <div style={{width:44,height:44,borderRadius:12,background:"rgba(212,168,67,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
              🤖
            </div>
            <div>
              <div style={{color:"var(--gold)",fontFamily:"Playfair Display",fontSize:17,fontWeight:600}}>One-Click AI Agent</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.45)"}}>End-to-end automated loan processing</div>
            </div>
          </div>
          <div className="divider" style={{borderColor:"rgba(255,255,255,0.08)"}}/>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.7,margin:"14px 0"}}>
            Fill your details once. The AI agent handles everything — from KYC validation and document verification to credit scoring and disbursement planning.
          </p>
          {[
            ["fa-user-check","Identity & KYC Verification"],
            ["fa-file-shield","Mock Document Verification"],
            ["fa-chart-line","CIBIL & Credit Analysis"],
            ["fa-brain","Gemini AI Risk Assessment"],
            ["fa-bolt","Groq AI Summary Generation"],
            ["fa-database","FAISS RAG Policy Retrieval"],
            ["fa-gavel","Final Decision + Reasoning"],
            ["fa-paper-plane","Auto Email Sanction Letter"],
          ].map(([icon,label],i) => (
            <div key={i} className="flex-center gap8" style={{fontSize:13,color:"rgba(255,255,255,0.7)",marginBottom:8}}>
              <i className={`fa ${icon}`} style={{color:"var(--gold)",width:16,textAlign:"center"}}/>
              {label}
            </div>
          ))}
          <button className="btn btn-gold btn-full mt24" onClick={() => navigate("apply")}>
            <i className="fa fa-bolt"/> Start AI Loan Process
          </button>
        </div>
      </div>

      {/* ── AI Architecture ─────────────────────────────────────── */}
      <div className="card">
        <div className="flex-between mb24">
          <div>
            <div className="section-title">System Architecture</div>
            <div className="page-subtitle">How the AI agent processes your loan application</div>
          </div>
        </div>
        {/* Architecture Flow SVG */}
        <svg viewBox="0 0 860 100" style={{width:"100%",maxWidth:"100%"}} xmlns="http://www.w3.org/2000/svg">
          {[
            ["User Input","#1d4ed8","#dbeafe",40],
            ["Flask API","#7c3aed","#f3e8ff",180],
            ["FAISS RAG","#d97706","#fef3c7",320],
            ["Gemini AI","#dc2626","#fee2e2",460],
            ["Groq LLM","#b8890d","#fef9e7",600],
            ["Decision","#16a34a","#dcfce7",740],
          ].map(([label,stroke,bg,x],i,arr) => (
            <g key={i}>
              <rect x={x} y="20" width="110" height="54" rx="10" fill={bg} stroke={stroke} strokeWidth="1.5"/>
              <text x={x+55} y="51" textAnchor="middle" fontSize="12" fontFamily="DM Sans" fontWeight="500" fill={stroke}>{label}</text>
              {i < arr.length-1 && (
                <g>
                  <line x1={x+110} y1="47" x2={x+130} y2="47" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arr)"/>
                </g>
              )}
            </g>
          ))}
          <defs>
            <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8"/>
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}