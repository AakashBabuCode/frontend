import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL + "/api";

const STEP_META = [
  { icon:"fa-user-check",    label:"Identity Verification",  desc:"Validating KYC & PAN/Aadhaar details",      color:"#dbeafe", ic:"#1d4ed8" },
  { icon:"fa-file-shield",   label:"Document Verification",  desc:"Checking income proof & bank statements",   color:"#f3e8ff", ic:"#7c3aed" },
  { icon:"fa-chart-line",    label:"Credit Analysis",        desc:"Analyzing CIBIL score & repayment history", color:"#fef3c7", ic:"#d97706" },
  { icon:"fa-calculator",    label:"EMI Calculation",        desc:"Computing optimal EMI & FOIR ratio",        color:"#dcfce7", ic:"#16a34a" },
  { icon:"fa-brain",         label:"Gemini AI Assessment",   desc:"RAG-powered risk evaluation via Gemini 1.5",color:"#fff1f2", ic:"#dc2626" },
  { icon:"fa-bolt",          label:"Groq Summary Engine",    desc:"Generating quick summary via mixtral-8x7b", color:"#fef9e7", ic:"#b8890d" },
  { icon:"fa-gavel",         label:"Final Decision",         desc:"Compiling approval/rejection with reasoning",color:"#f0fdf4", ic:"#16a34a" },
];

export default function ProcessingPage({ navigate, appData, appId, setResult, showToast }) {
  const [steps, setSteps]       = useState([]);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState(false);
  const [groqSnippet, setGroq]  = useState("");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!appData) {
      // Demo mode — simulate without backend
      runSimulation();
      return;
    }
    runWithBackend();
    return () => clearTimeout(timerRef.current);
  }, []);

  const runSimulation = () => {
    let i = 0;
    const tick = () => {
      if (i >= STEP_META.length) {
        setDone(true); setProgress(100);
        setGroq("Demo mode: AI successfully evaluated the loan application. Results are simulated. Connect the Flask backend for real AI processing.");
        return;
      }
      setSteps(prev => [...prev, { ...STEP_META[i], status:"processing" }]);
      setProgress(Math.round((i/STEP_META.length)*90));
      timerRef.current = setTimeout(() => {
        setSteps(prev => prev.map((s,idx) => idx===i ? {...s, status:"done"} : s));
        i++;
        timerRef.current = setTimeout(tick, 600);
      }, 900);
    };
    timerRef.current = setTimeout(tick, 400);
  };

  const runWithBackend = async () => {
    // Animate steps locally while API call is in-flight
    let i = 0;
    const animTick = () => {
      if (i >= STEP_META.length - 1) return;
      setSteps(prev => {
        const next = [...prev];
        if (next[i]) next[i] = { ...next[i], status:"done" };
        if (STEP_META[i+1]) next.push({ ...STEP_META[i+1], status:"processing" });
        return next;
      });
      setProgress(Math.round(((i+1)/STEP_META.length)*85));
      i++;
      timerRef.current = setTimeout(animTick, 1100);
    };
    setSteps([{ ...STEP_META[0], status:"processing" }]);
    timerRef.current = setTimeout(animTick, 1000);

    try {
      const res  = await fetch(`${API}/loan/process`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(appData)
      });
      const data = await res.json();
      clearTimeout(timerRef.current);
      // Mark all done
      setSteps(STEP_META.map(s => ({...s, status:"done"})));
      setProgress(100);
      setGroq(data.summary?.groqSummary || "");
      setResult({ ...data, applicationId: appId });
      setDone(true);
    } catch (err) {
      clearTimeout(timerRef.current);
      setError(true);
      showToast("Backend connection failed. Running in demo mode.", "warn");
      // Still complete animation
      setSteps(STEP_META.map(s => ({...s, status:"done"})));
      setProgress(100);
      setDone(true);
      setGroq("Demo mode active — connect Flask backend for real Gemini AI processing.");
    }
  };

  return (
    <div className="page">
      <div style={{maxWidth:680,margin:"0 auto"}}>
        {/* AI Brain Header */}
        <div className="card mb24" style={{textAlign:"center",padding:"40px 40px 28px"}}>
          <svg viewBox="0 0 130 130" width="110" height="110" style={{display:"block",margin:"0 auto 18px"}}>
            <circle cx="65" cy="65" r="55" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5"/>
            {!done && (
              <circle cx="65" cy="65" r="48" fill="none" stroke="url(#procGrad)" strokeWidth="3"
                strokeLinecap="round" strokeDasharray={`${progress*3.02} 302`}
                transform="rotate(-90 65 65)" style={{transition:"stroke-dasharray 0.6s ease"}}/>
            )}
            {done && <circle cx="65" cy="65" r="48" fill="#dcfce7" stroke="#86efac" strokeWidth="2"/>}
            <text x="65" y="74" textAnchor="middle" fontSize="32">
              {done ? "✅" : error ? "⚠️" : "🤖"}
            </text>
            <defs>
              <linearGradient id="procGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>

          <div style={{fontSize:20,fontWeight:700,fontFamily:"Playfair Display",color:"var(--text)"}}>
            {done ? "AI Analysis Complete!" : "AI Agent Processing..."}
          </div>
          <div style={{fontSize:14,color:"var(--text2)",marginTop:6}}>
            {done ? "Your loan decision is ready to view." : "Please wait — Gemini + Groq AI is evaluating your application."}
          </div>

          {/* Progress bar */}
          <div style={{margin:"20px auto 0",maxWidth:360}}>
            <div style={{height:6,borderRadius:4,background:"#e2e8f0",overflow:"hidden"}}>
              <div style={{height:"100%",borderRadius:4,background:"linear-gradient(90deg,#3b82f6,#8b5cf6)",width:`${progress}%`,transition:"width 0.5s ease"}}/>
            </div>
            <div style={{fontSize:12,color:"var(--text3)",marginTop:6}}>{progress}% complete</div>
          </div>
        </div>

        {/* Step Cards */}
        <div className="mb20">
          {steps.map((s, i) => (
            <div key={i} className={`proc-step ${s.status==="done"?"done":""}`}>
              <div className="proc-step-icon" style={{background:s.color}}>
                <i className={`fa ${s.icon}`} style={{color:s.ic}}/>
              </div>
              <div className="proc-step-body">
                <div className="proc-step-title">{s.label}</div>
                <div className="proc-step-desc">{s.desc}</div>
              </div>
              <div className="proc-step-status">
                {s.status==="processing"
                  ? <div className="spinner"/>
                  : <i className="fa fa-check-circle" style={{color:"var(--success)",fontSize:20}}/>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Groq Summary */}
        {groqSnippet && (
          <div className="card card-xs mb20" style={{background:"#fffbeb",border:"1px solid #fde68a"}}>
            <div style={{fontSize:12,fontWeight:600,color:"#b8890d",marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
              <i className="fa fa-bolt"/>Groq AI — Quick Summary
            </div>
            <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.6}}>{groqSnippet}</p>
          </div>
        )}

        {/* RAG indicator */}
        {steps.length >= 5 && (
          <div className="rag-box mb20">
            <div className="rag-title"><i className="fa fa-database"/>FAISS RAG — Policy Context Retrieved</div>
            {[
              "EMI should not exceed 50% of net monthly income (FOIR rule)",
              "CIBIL score below 600 is high risk; 650+ required for most products",
              "Loan-to-income ratio evaluated against product-specific limits",
            ].map((p,i) => (
              <div key={i} className="rag-item">
                <i className="fa fa-circle" style={{fontSize:6,color:"#7c3aed",marginTop:4,flexShrink:0}}/>
                {p}
              </div>
            ))}
          </div>
        )}

        {done && (
          <button className="btn btn-gold btn-lg btn-full" onClick={() => navigate("result")}>
            <i className="fa fa-eye"/> View Decision & Full Report
          </button>
        )}
      </div>
    </div>
  );
}