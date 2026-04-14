import { useState } from "react";
const API = "http://localhost:5000/api";

// ── Loan type info for the popup modal ──────────────────────────────────────
const LOAN_INFO = {
  personal: {
    icon: "fa-user",
    color: "#3b82f6",
    bg: "#eff6ff",
    name: "Personal Loan",
    tagline: "Quick cash for any personal need — no collateral required.",
    uses: [
      "Medical emergencies or hospital bills",
      "Wedding or family functions",
      "Home renovation or appliance purchase",
      "Travel or vacation expenses",
      "Debt consolidation",
    ],
    whySuggested: "A restructured personal loan at a lower amount keeps your EMI affordable while still meeting your immediate financial need. Since it is unsecured, approval is faster and documentation is minimal.",
    pros: ["No collateral needed", "Fast disbursal (1-2 days)", "Flexible usage"],
    cons: ["Higher interest rate (12.5%)", "Stricter CIBIL requirement"],
  },
  home: {
    icon: "fa-house",
    color: "#16a34a",
    bg: "#f0fdf4",
    name: "Home Loan",
    tagline: "Fulfil your dream of owning a home with long-tenure easy EMIs.",
    uses: [
      "Purchase of a new residential property",
      "Construction of a house on your own plot",
      "Home renovation or extension",
      "Balance transfer from another bank",
    ],
    whySuggested: "Home loans have the lowest interest rate (8.5%) among all loan types. The property acts as collateral which significantly reduces bank risk, allowing larger amounts and longer tenures.",
    pros: ["Lowest interest rate (8.5%)", "Tenure up to 30 years", "Tax benefits under Sec 80C & 24(b)"],
    cons: ["Property used as collateral", "Longer processing time", "High documentation"],
  },
  car: {
    icon: "fa-car",
    color: "#7c3aed",
    bg: "#f5f3ff",
    name: "Car Loan",
    tagline: "Drive your dream car with structured EMIs and quick approval.",
    uses: [
      "Purchase of a new passenger vehicle",
      "Purchase of a used/pre-owned car",
      "Two-wheeler purchase",
      "Commercial vehicle financing",
    ],
    whySuggested: "Car loans are secured against the vehicle itself, making them easier to get than personal loans. At 9.25% interest, they are a cost-effective way to finance a vehicle purchase.",
    pros: ["Lower rate than personal loan (9.25%)", "Car as collateral — easier approval", "Up to 100% on-road price financing"],
    cons: ["Only for vehicle purchase", "Hypothecation until full repayment"],
  },
  education: {
    icon: "fa-graduation-cap",
    color: "#0891b2",
    bg: "#ecfeff",
    name: "Education Loan",
    tagline: "Invest in your future — with a moratorium period during your studies.",
    uses: [
      "Tuition fees for Indian or foreign universities",
      "Hostel and living expenses",
      "Books, equipment, and study materials",
      "Exam or travel expenses related to studies",
    ],
    whySuggested: "Education loans offer a moratorium period (repayment starts after course completion), no minimum income requirement for the student, and co-applicant income can be combined to qualify for a higher amount.",
    pros: ["Repayment starts after course", "No minimum income needed", "Tax benefit under Sec 80E"],
    cons: ["Co-applicant (parent/guardian) required", "Only for educational expenses"],
  },
  business: {
    icon: "fa-briefcase",
    color: "#dc2626",
    bg: "#fff1f2",
    name: "Business Loan",
    tagline: "Fuel business growth with working capital and expansion financing.",
    uses: [
      "Working capital for day-to-day operations",
      "Purchase of machinery or equipment",
      "Business expansion or new branch setup",
      "Inventory procurement",
      "Payroll funding during lean seasons",
    ],
    whySuggested: "If you are self-employed or a business owner, a business loan is tailored for your income structure. Revenue from the business (not just salary) is considered, enabling higher eligibility.",
    pros: ["Considers business revenue", "Up to Rs 1 crore", "Flexible repayment"],
    cons: ["Highest interest rate (13%)", "Requires 3 years of business vintage + ITR"],
  },
  gold: {
    icon: "fa-coins",
    color: "#d97706",
    bg: "#fef3c7",
    name: "Gold Loan",
    tagline: "Instant cash against your gold ornaments — no CIBIL check required.",
    uses: [
      "Any emergency financial need",
      "Medical expenses",
      "Agricultural needs or crop investment",
      "Business cash flow gaps",
      "Short-term personal requirements",
    ],
    whySuggested: "Gold loans are the most accessible loan product — there is no minimum income requirement, no CIBIL check, and disbursal happens within hours. This makes it the best alternative when other loan types are rejected due to low CIBIL or insufficient income.",
    pros: ["No CIBIL minimum", "No income proof needed", "Lowest rate (7.5%)", "Same-day disbursal"],
    cons: ["Gold ornaments held as collateral", "Short tenure (3-36 months)", "Risk of gold auction on default"],
  },
};

function PlanDetailModal({ plan, planIndex, loanType, onClose }) {
  const info = LOAN_INFO[loanType] || LOAN_INFO["personal"];
  const planLabels = ["Best Fit", "Balanced", "Conservative"];

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)", borderRadius: 20, padding: 32, maxWidth: 620, width: "100%",
          maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: info.bg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
            }}>
              <i className={`fa ${info.icon}`} style={{ color: info.color }} />
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700, color: "var(--navy)" }}>{info.name}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>
                Plan {planIndex + 1} — {planLabels[planIndex] || "Alternative"}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: "50%", border: "none",
              background: "var(--surface3)", cursor: "pointer", fontSize: 17, color: "var(--text2)",
            }}
          >×</button>
        </div>

        {/* Tagline */}
        <div style={{
          background: info.bg, borderRadius: 10, padding: "12px 16px",
          borderLeft: `4px solid ${info.color}`, marginBottom: 22, fontSize: 14,
          color: "var(--text2)", fontStyle: "italic", lineHeight: 1.6,
        }}>
          {info.tagline}
        </div>

        {/* Plan numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 22 }}>
          {[
            ["Loan Amount", "Rs " + Math.round(plan.loanAmount).toLocaleString("en-IN")],
            ["Tenure", plan.tenure + " months"],
            ["Monthly EMI", "Rs " + Math.round(plan.emi).toLocaleString("en-IN")],
            ["FOIR", plan.emiRatio + "%"],
            ["Total Payable", "Rs " + Math.round(plan.totalPayable || plan.emi * plan.tenure).toLocaleString("en-IN")],
          ].map(([k, v], i) => (
            <div key={i} style={{ background: "var(--surface3)", borderRadius: 9, padding: "10px 14px" }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Why suggested */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: info.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.6px" }}>
            <i className="fa fa-lightbulb" style={{ marginRight: 6 }} />Why This Loan Is Suggested
          </div>
          <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.75, margin: 0, padding: "12px 14px", background: info.bg, borderRadius: 9 }}>
            {info.whySuggested}
          </p>
        </div>

        {/* Common uses */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.6px" }}>
            <i className="fa fa-list-check" style={{ marginRight: 6 }} />Common Uses
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {info.uses.map((u, i) => (
              <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--text2)", padding: "8px 12px", background: "var(--surface3)", borderRadius: 8 }}>
                <i className="fa fa-circle-check" style={{ color: info.color, flexShrink: 0, marginTop: 1 }} />
                {u}
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", marginBottom: 8, textTransform: "uppercase" }}>
              <i className="fa fa-thumbs-up" style={{ marginRight: 5 }} />Advantages
            </div>
            {info.pros.map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "#166534", padding: "7px 10px", background: "#f0fdf4", borderRadius: 7, marginBottom: 5 }}>
                <i className="fa fa-check" style={{ marginRight: 5, color: "#16a34a" }} />{p}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", marginBottom: 8, textTransform: "uppercase" }}>
              <i className="fa fa-triangle-exclamation" style={{ marginRight: 5 }} />Considerations
            </div>
            {info.cons.map((c, i) => (
              <div key={i} style={{ fontSize: 12, color: "#991b1b", padding: "7px 10px", background: "#fff1f2", borderRadius: 7, marginBottom: 5 }}>
                <i className="fa fa-circle-exclamation" style={{ marginRight: 5, color: "#dc2626" }} />{c}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="btn btn-primary"
            style={{ background: info.color, borderColor: info.color }}
            onClick={onClose}
          >
            <i className="fa fa-check" /> Got it — Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage({ navigate, result, appData, showToast }) {
  const [tab, setTab]         = useState(0);
  const [emailSent, setES]    = useState(false);
  const [emailLoading, setEL] = useState(false);
  const [planModal, setPlanModal] = useState(null); // { plan, planIndex }

  if (!result && !appData) return (
    <div className="page" style={{textAlign:"center",paddingTop:80}}>
      <i className="fa fa-inbox" style={{fontSize:52,color:"var(--text3)",display:"block",marginBottom:16}}/>
      <div className="section-title mb16">No Result Yet</div>
      <p style={{color:"var(--text2)",marginBottom:24}}>Apply for a loan first to see your AI decision here.</p>
      <button className="btn btn-primary" onClick={() => navigate("apply")}>
        <i className="fa fa-file-signature"/> Apply for Loan
      </button>
    </div>
  );

  const data = result || {};
  const s    = data.summary || {};
  const d    = data.applicationData || appData || {};
  const ai   = s.aiResult || {};
  const appId= data.applicationId || "N/A";
  const approved = s.approved || false;
  const loanType = d.loanType || "personal";

  const handleEmail = async () => {
    setEL(true);
    try {
      const res = await fetch(`${API}/loan/send-email`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          email: d.email,
          applicantName: d.fullName,
          approved,
          loanAmount: d.loanAmount,
          loanType: d.loanType,
          emi: s.emi,
          applicationId: appId,
          interestRate: s.interestRate,
          tenure: d.tenure,
          altLoanAmt: s.altLoanAmt,
          altEmi: s.altEmi,
          altTenure: s.altTenure,
          groqSummary: s.groqSummary,
          aiReasoning: ai.approvalRationale || ai.reasoning || "",
        })
      });
      const r = await res.json();
      setES(true);
      showToast(r.message || "Email sent!", r.success ? "success" : "warn");
    } catch {
      setES(true);
      showToast("Email request sent. Check backend SMTP configuration.", "info");
    } finally { setEL(false); }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(`${API}/loan/report`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
      });
      const r = await res.json();
      const blob = new Blob([r.report], {type:"text/plain"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = r.filename || "LoanReport.txt";
      a.click();
    } catch {
      const rpt = buildLocalReport(data, s, d, ai, appId, approved);
      const blob = new Blob([rpt],{type:"text/plain"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `NexusBank_${appId}.txt`;
      a.click();
    }
    showToast("Report downloaded!", "success");
  };

  return (
    <div className="page">
      {/* Hero */}
      <div className={`result-hero ${approved?"approved":"rejected"}`}>
        <div className="result-icon-wrap">
          <i className={`fa ${approved?"fa-circle-check":"fa-circle-xmark"}`} style={{fontSize:52,color:approved?"#16a34a":"#dc2626"}}/>
        </div>
        <div className="result-title" style={{color:approved?"#15803d":"#b91c1c"}}>
          {approved ? "Loan Application Approved" : "Loan Application Declined"}
        </div>
        <p style={{marginTop:10,fontSize:15,color:approved?"#166534":"#991b1b",maxWidth:580,margin:"10px auto 0"}}>
          {approved
            ? `Your ${d.loanType ? d.loanType.charAt(0).toUpperCase()+d.loanType.slice(1) : ""} Loan of Rs ${Number(d.loanAmount||0).toLocaleString("en-IN")} has been sanctioned at ${s.interestRate}% per annum.`
            : `The requested loan could not be approved at this time. Detailed reasoning and alternative restructured plans are provided below.`}
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:22,flexWrap:"wrap"}}>
          <button className="btn btn-success" onClick={handleEmail} disabled={emailSent||emailLoading}>
            {emailLoading ? <><div className="spinner spinner-sm"/>Sending...</> : <><i className="fa fa-envelope"/>{emailSent?"Sent to "+d.email:"Send Sanction Letter"}</>}
          </button>
          <button className="btn btn-primary" onClick={handleDownload}>
            <i className="fa fa-download"/> Download Full Report
          </button>
          <button className="btn btn-outline" onClick={() => navigate("apply")}>
            <i className="fa fa-plus"/> New Application
          </button>
        </div>
        <div style={{marginTop:14,fontSize:12,color:approved?"#166534":"#991b1b",opacity:0.65}}>
          Application ID: {appId}&nbsp;|&nbsp;{new Date().toLocaleDateString("en-IN",{dateStyle:"long"})}&nbsp;|&nbsp;AI Score: {s.score}/100
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["Overview & Summary","EMI Breakdown","Gemini AI Analysis","Groq AI Summary","Alternative Plans"].map((t,i) => (
          <div key={i} className={`tab ${tab===i?"active":""}`} onClick={()=>setTab(i)} style={{fontSize:12}}>{t}</div>
        ))}
      </div>

      {/* TAB 0: Overview */}
      {tab===0 && (
        <div className="g2">
          <div className="card">
            <div className="card-title mb20"><i className="fa fa-receipt" style={{marginRight:8,color:"var(--accent)"}}/>Loan Summary</div>
            {[
              ["Applicant",      d.fullName||"—"],
              ["Application ID", appId],
              ["Loan Type",      d.loanType ? d.loanType.charAt(0).toUpperCase()+d.loanType.slice(1)+" Loan" : "—"],
              ["Requested Amount",`Rs ${Number(d.loanAmount||0).toLocaleString("en-IN")}`],
              ["Tenure",         `${d.tenure} months (${Math.floor(d.tenure/12)} years ${d.tenure%12} months)`],
              ["Interest Rate",  `${s.interestRate}% per annum`],
              ["Monthly EMI",    <strong style={{color:"var(--accent)"}}>Rs {s.emi?.toLocaleString("en-IN")}</strong>],
              ["Total Interest", `Rs ${s.totalInterest?.toLocaleString("en-IN")}`],
              ["Total Payable",  `Rs ${s.totalPayable?.toLocaleString("en-IN")}`],
              ["FOIR",           `${s.emiRatio}%`],
              ["Decision",       <span className={`badge badge-${approved?"success":"danger"}`}><i className={`fa fa-${approved?"check":"times"}`}/>{approved?"APPROVED":"REJECTED"}</span>],
            ].map(([k,v],i) => (
              <div className="info-row" key={i}>
                <span className="info-key">{k}</span>
                <span className="info-val">{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title mb16"><i className="fa fa-gauge" style={{marginRight:8,color:"var(--accent)"}}/>Eligibility Score</div>
            <div style={{textAlign:"center",margin:"20px 0"}}>
              <svg viewBox="0 0 140 140" width="148" height="148" style={{display:"block",margin:"0 auto"}}>
                <circle cx="70" cy="70" r="56" fill="none" stroke="#e2e8f0" strokeWidth="10"/>
                <circle cx="70" cy="70" r="56" fill="none"
                  stroke={s.score>=70?"#16a34a":s.score>=50?"#d97706":"#dc2626"}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(s.score||0)*3.52} 352`}
                  transform="rotate(-90 70 70)"
                  style={{transition:"stroke-dasharray 1.2s ease"}}/>
                <text x="70" y="64" textAnchor="middle" fontSize="26" fontWeight="bold"
                  fill={s.score>=70?"#16a34a":s.score>=50?"#d97706":"#dc2626"}>{s.score}</text>
                <text x="70" y="82" textAnchor="middle" fontSize="11" fill="#94a3b8">out of 100</text>
              </svg>
              <span className={`badge badge-${s.score>=70?"success":s.score>=50?"warn":"danger"}`} style={{marginTop:8}}>
                <i className={`fa fa-${s.score>=70?"star":s.score>=50?"triangle-exclamation":"times-circle"}`}/>
                {s.score>=70?"Strong Profile":s.score>=50?"Moderate Risk":"High Risk"}
              </span>
            </div>
            {s.strengths?.length>0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--success)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.8px"}}>Strengths Identified</div>
                {s.strengths.map((st,i) => (
                  <div key={i} style={{fontSize:13,color:"#166534",marginBottom:6,padding:"8px 12px",background:"#f0fdf4",borderRadius:7,display:"flex",gap:8}}>
                    <i className="fa fa-check-circle" style={{color:"var(--success)",flexShrink:0,marginTop:1}}/>
                    {st}
                  </div>
                ))}
              </div>
            )}
            {s.reasons?.length>0 && (
              <div style={{marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--danger)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.8px"}}>Risk Factors</div>
                {s.reasons.map((r,i) => (
                  <div key={i} style={{fontSize:13,color:"#991b1b",marginBottom:6,padding:"8px 12px",background:"#fff1f2",borderRadius:7,display:"flex",gap:8}}>
                    <i className="fa fa-circle-xmark" style={{color:"var(--danger)",flexShrink:0,marginTop:1}}/>
                    {r}
                  </div>
                ))}
              </div>
            )}
            {s.warnings?.length>0 && (
              <div>
                <div style={{fontSize:12,fontWeight:600,color:"var(--warn)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.8px"}}>Warnings</div>
                {s.warnings.map((w,i) => (
                  <div key={i} style={{fontSize:13,color:"#92400e",marginBottom:6,padding:"8px 12px",background:"#fffbeb",borderRadius:7,display:"flex",gap:8}}>
                    <i className="fa fa-triangle-exclamation" style={{color:"var(--warn)",flexShrink:0,marginTop:1}}/>
                    {w}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 1: EMI Breakdown */}
      {tab===1 && (
        <div>
          <div className="g3 mb24">
            {[
              {label:"Monthly EMI",    value:`Rs ${s.emi?.toLocaleString("en-IN")}`,         icon:"fa-calendar-check",bg:"#dbeafe",ic:"#1d4ed8"},
              {label:"Total Interest", value:`Rs ${s.totalInterest?.toLocaleString("en-IN")}`,icon:"fa-percent",      bg:"#fef3c7",ic:"#d97706"},
              {label:"Total Payable",  value:`Rs ${s.totalPayable?.toLocaleString("en-IN")}`, icon:"fa-coins",        bg:"#dcfce7",ic:"#16a34a"},
            ].map((st,i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon" style={{background:st.bg}}><i className={`fa ${st.icon}`} style={{color:st.ic}}/></div>
                <div className="stat-label">{st.label}</div>
                <div className="stat-value" style={{fontSize:22}}>{st.value}</div>
              </div>
            ))}
          </div>
          <div className="card mb24">
            <div className="card-title mb20">Principal vs Interest Breakdown</div>
            {[
              ["Principal Amount", Number(d.loanAmount||0), "#3b82f6"],
              ["Total Interest",   s.totalInterest||0,    "#f59e0b"],
            ].map(([lbl,val,col],i) => (
              <div key={i} className="progress-wrap" style={{marginBottom:18}}>
                <div className="progress-label">
                  <span>{lbl}</span>
                  <span>Rs {Math.round(val).toLocaleString("en-IN")} ({Math.round(val/(s.totalPayable||1)*100)}%)</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{width:`${Math.round(val/(s.totalPayable||1)*100)}%`,background:col}}/>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title mb16">Year-wise Amortization Schedule</div>
            <table className="tbl">
              <thead><tr><th>Year</th><th>Opening Balance</th><th>Principal Paid</th><th>Interest Paid</th><th>Closing Balance</th></tr></thead>
              <tbody>
                {Array.from({length:Math.min(Math.ceil(parseInt(d.tenure||12)/12),10)},(_,yr) => {
                  const r=(s.interestRate||12.5)/100/12, n=parseInt(d.tenure||12);
                  const P=Number(d.loanAmount||0); const emi_=s.emi||0;
                  let bal=P;
                  for(let m=0;m<yr*12;m++){const int=bal*r;bal-=(emi_-int);}
                  const opening=Math.max(0,Math.round(bal));
                  let prin=0,intP=0;
                  for(let m=0;m<Math.min(12,n-yr*12);m++){const int=bal*r;const p=Math.min(emi_-int,bal);prin+=p;intP+=int;bal-=p;}
                  return(
                    <tr key={yr}>
                      <td>Year {yr+1}</td>
                      <td>Rs {opening.toLocaleString("en-IN")}</td>
                      <td>Rs {Math.round(prin).toLocaleString("en-IN")}</td>
                      <td>Rs {Math.round(intP).toLocaleString("en-IN")}</td>
                      <td>Rs {Math.max(0,Math.round(bal)).toLocaleString("en-IN")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Gemini AI Analysis */}
      {tab===2 && (
        <div>
          <div className="card mb20" style={{borderLeft:"4px solid #dc2626"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:46,height:46,borderRadius:12,background:"#fff1f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                <i className="fa fa-brain" style={{color:"#dc2626"}}/>
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:16}}>Gemini 1.5 Flash — AI Credit Assessment</div>
                <div style={{fontSize:12,color:"var(--text3)"}}>Confidence: {ai.confidence||s.score||0}% &nbsp;|&nbsp; Risk Level: {ai.riskLevel||"N/A"} &nbsp;|&nbsp; Recommendation: {ai.recommendation||"N/A"}</div>
              </div>
              <span className={`badge badge-${approved?"success":"danger"}`} style={{marginLeft:"auto"}}>
                <i className={`fa fa-${approved?"check":"times"}`}/>{ai.recommendation||"N/A"}
              </span>
            </div>
            <div className="divider"/>
            {ai.executiveSummary && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:600,color:"#dc2626",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
                  <i className="fa fa-file-lines" style={{marginRight:6}}/>Executive Summary
                </div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,background:"#fff5f5",padding:"14px 16px",borderRadius:8,borderLeft:"3px solid #fca5a5"}}>{ai.executiveSummary}</p>
              </div>
            )}
            {ai.financialAnalysis && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:600,color:"#1d4ed8",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
                  <i className="fa fa-chart-line" style={{marginRight:6}}/>Financial Analysis
                </div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,background:"#eff6ff",padding:"14px 16px",borderRadius:8,borderLeft:"3px solid #93c5fd"}}>{ai.financialAnalysis}</p>
              </div>
            )}
            {ai.creditRiskAnalysis && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:600,color:"#d97706",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
                  <i className="fa fa-shield-halved" style={{marginRight:6}}/>Credit Risk Analysis
                </div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,background:"#fffbeb",padding:"14px 16px",borderRadius:8,borderLeft:"3px solid #fde68a"}}>{ai.creditRiskAnalysis}</p>
              </div>
            )}
            {ai.approvalRationale && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:600,color:approved?"#16a34a":"#dc2626",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
                  <i className="fa fa-gavel" style={{marginRight:6}}/>{approved?"Approval Rationale":"Rejection Rationale"}
                </div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,background:approved?"#f0fdf4":"#fff1f2",padding:"14px 16px",borderRadius:8,borderLeft:`3px solid ${approved?"#86efac":"#fca5a5"}`}}>{ai.approvalRationale}</p>
              </div>
            )}
            {ai.improvementAdvice && (
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:600,color:"#7c3aed",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8}}>
                  <i className="fa fa-star" style={{marginRight:6}}/>Improvement Advice
                </div>
                <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,background:"#f5f3ff",padding:"14px 16px",borderRadius:8,borderLeft:"3px solid #c4b5fd"}}>{ai.improvementAdvice}</p>
              </div>
            )}
            {ai.keyFactors?.length>0 && (
              <div>
                <div style={{fontSize:12,fontWeight:600,color:"var(--text3)",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>Key Factors</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {ai.keyFactors.map((f,i)=>(
                    <div key={i} style={{fontSize:13,color:"var(--text2)",padding:"9px 12px",background:"var(--surface3)",borderRadius:8,display:"flex",gap:8}}>
                      <i className="fa fa-circle-check" style={{color:"var(--accent)",flexShrink:0,marginTop:1}}/>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {ai.disbursementPlan && (
            <div className="card" style={{borderLeft:"4px solid #16a34a"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#16a34a",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>
                <i className="fa fa-paper-plane" style={{marginRight:6}}/>Disbursement Plan
              </div>
              <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8}}>{ai.disbursementPlan}</p>
            </div>
          )}

          {s.ragContext?.length>0 && (
            <div className="rag-box" style={{marginTop:16}}>
              <div className="rag-title"><i className="fa fa-database"/>FAISS RAG — Policy Documents Retrieved</div>
              {s.ragContext.map((p,i)=>(
                <div key={i} className="rag-item">
                  <i className="fa fa-circle" style={{fontSize:5,color:"#7c3aed",marginTop:5,flexShrink:0}}/>
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Groq AI Summary */}
      {tab===3 && (
        <div>
          <div className="card mb20" style={{borderLeft:"4px solid #d97706"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{width:46,height:46,borderRadius:12,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                <i className="fa fa-bolt" style={{color:"#d97706"}}/>
              </div>
              <div>
                <div style={{fontWeight:600,fontSize:16}}>Groq LLaMA 3.1 — Detailed Decision Summary</div>
                <div style={{fontSize:12,color:"var(--text3)"}}>Model: llama-3.1-8b-instant &nbsp;|&nbsp; Professional 3-paragraph formal summary</div>
              </div>
            </div>
            <div className="divider"/>
            {s.groqSummary ? (
              s.groqSummary.split(/\n\n+/).filter(Boolean).map((para, i) => (
                <div key={i} style={{marginBottom:18}}>
                  <div style={{fontSize:11,fontWeight:600,color:"#d97706",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:6}}>
                    Paragraph {i + 1}
                  </div>
                  <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.85,background:"#fffbeb",padding:"14px 18px",borderRadius:8,borderLeft:"3px solid #fde68a"}}>{para}</p>
                </div>
              ))
            ) : (
              <p style={{color:"var(--text3)",fontSize:14}}>Groq summary not available. Ensure the backend is running and GROQ_API_KEY is configured correctly.</p>
            )}
          </div>
          {ai.alternativeSuggestion && (
            <div className="card" style={{borderLeft:"4px solid #7c3aed"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#7c3aed",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:10}}>
                <i className="fa fa-lightbulb" style={{marginRight:6}}/>AI Alternative Suggestion
              </div>
              <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.8}}>{ai.alternativeSuggestion}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Alternative Plans — with "See Plan Details" popup */}
      {tab===4 && (
        <div>
          <div className="card mb24" style={{background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"2px solid #fde68a"}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:18}}>
              <div style={{width:50,height:50,borderRadius:13,background:"#d97706",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:22,flexShrink:0}}>
                <i className="fa fa-lightbulb"/>
              </div>
              <div>
                <div style={{fontSize:17,fontWeight:600,color:"var(--navy)"}}>AI-Recommended Alternative Loan Plans</div>
                <div style={{fontSize:13,color:"var(--text2)",marginTop:3,lineHeight:1.6}}>
                  Based on your income of Rs {Number(d.salary||0).toLocaleString("en-IN")}/month, the AI has generated three restructured loan plans with different amount-tenure combinations. Each plan is calibrated to keep your FOIR within the permissible 50% limit.
                </div>
              </div>
            </div>

            {/* 3 Plans — with "See Plan Details" button */}
            <div className="g3 mb18">
              {(s.altPlans||[{loanAmount:s.altLoanAmt||0,tenure:s.altTenure||0,emi:s.altEmi||0,emiRatio:0,totalPayable:0}]).slice(0,3).map((plan,i) => (
                <div key={i} style={{background:"white",borderRadius:12,padding:20,border:i===0?"2px solid #d97706":"1px solid #fde68a",position:"relative"}}>
                  {i===0 && <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:"#d97706",color:"white",fontSize:10,fontWeight:700,padding:"3px 12px",borderRadius:20,letterSpacing:0.5,whiteSpace:"nowrap"}}>RECOMMENDED</div>}
                  <div style={{textAlign:"center",marginBottom:14,paddingTop:i===0?8:0}}>
                    <div style={{fontSize:11,color:"var(--text3)",marginBottom:4}}>Plan {i+1} — {["Best Fit","Balanced","Conservative"][i]}</div>
                    <div style={{fontSize:24,fontWeight:700,color:"var(--navy)"}}>Rs {Math.round(plan.loanAmount).toLocaleString("en-IN")}</div>
                  </div>
                  {[
                    ["Tenure",    `${plan.tenure} months`],
                    ["Monthly EMI",`Rs ${Math.round(plan.emi).toLocaleString("en-IN")}`],
                    ["FOIR",       `${plan.emiRatio}%`],
                    ["Total Payable",`Rs ${Math.round(plan.totalPayable||plan.emi*plan.tenure).toLocaleString("en-IN")}`],
                  ].map(([k,v],j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:j<3?"1px solid #fef9e7":"none",fontSize:13}}>
                      <span style={{color:"var(--text3)"}}>{k}</span>
                      <span style={{fontWeight:500}}>{v}</span>
                    </div>
                  ))}
                  {/* ── NEW: See Plan Details button ── */}
                  <button
                    className="btn btn-outline btn-sm btn-full"
                    style={{marginTop:10,borderColor:"#7c3aed",color:"#7c3aed",fontSize:12}}
                    onClick={() => setPlanModal({ plan, planIndex: i })}
                  >
                    <i className="fa fa-circle-info"/> See Plan Details
                  </button>
                  <button className="btn btn-outline btn-sm btn-full" style={{marginTop:8,borderColor:"#d97706",color:"#d97706"}}
                    onClick={() => showToast(`Plan ${i+1} selected. Please apply with the revised amount.`, "info")}>
                    <i className="fa fa-check"/> Select This Plan
                  </button>
                </div>
              ))}
            </div>

            {/* Why this offer */}
            <div style={{padding:"16px 18px",background:"rgba(255,255,255,0.7)",borderRadius:10,border:"1px solid #fde68a",marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:6,color:"var(--navy)"}}>
                <i className="fa fa-circle-info" style={{marginRight:6,color:"#d97706"}}/>Why These Alternative Plans?
              </div>
              <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,marginBottom:0}}>
                {ai.alternativeSuggestion || `Based on your monthly income of Rs ${Number(d.salary||0).toLocaleString("en-IN")}, these restructured plans ensure your monthly EMI obligation remains within a financially sustainable range. The requested loan amount of Rs ${Number(d.loanAmount||0).toLocaleString("en-IN")} results in a FOIR of ${s.emiRatio}% which ${s.emiRatio<=50?"is at the boundary of":"exceeds"} our policy limit. The alternative plans reduce the loan quantum while extending the repayment period to bring the FOIR below 45%, ensuring you can comfortably meet the monthly obligation without financial stress.`}
              </p>
            </div>

            {/* Other loan types */}
            <div style={{padding:"16px 18px",background:"rgba(255,255,255,0.7)",borderRadius:10,border:"1px solid #fde68a",marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:8,color:"var(--navy)"}}>
                <i className="fa fa-arrows-alt" style={{marginRight:6,color:"#7c3aed"}}/>Consider Alternative Loan Products
              </div>
              {[
                {type:"Gold Loan",icon:"fa-coins",rate:"7.5% p.a.",note:"Instant approval against gold ornaments — no minimum CIBIL requirement, same-day disbursement available"},
                {type:"Secured Loan Against Property",icon:"fa-house",rate:"9.5% p.a.",note:"Higher loan amount possible with property as collateral — lower interest rate and relaxed CIBIL norms"},
                {type:"Education Loan (if applicable)",icon:"fa-graduation-cap",rate:"10.5% p.a.",note:"Moratorium period during study, no income requirement — co-applicant can be added to strengthen the application"},
              ].map((p,i)=>(
                <div key={i} style={{display:"flex",gap:12,marginBottom:12,padding:"10px 12px",background:"white",borderRadius:8,border:"1px solid #fef3c7"}}>
                  <div style={{width:36,height:36,borderRadius:9,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <i className={`fa ${p.icon}`} style={{color:"#d97706"}}/>
                  </div>
                  <div>
                    <div style={{fontWeight:500,fontSize:13,marginBottom:3}}>{p.type} — <span style={{color:"var(--accent)"}}>{p.rate}</span></div>
                    <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.5}}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="card">
            <div className="card-title mb16">
              <i className="fa fa-road" style={{marginRight:8,color:"var(--accent)"}}/>Path to Full Loan Eligibility
            </div>
            {[
              ["fa-chart-line","Improve Your CIBIL Score","Pay all EMIs and credit card bills on time for 6 consecutive months. Avoid applying for multiple loans simultaneously. Keep credit card utilization below 30%. Dispute any incorrect entries in your credit report. A CIBIL score above 750 will dramatically improve loan eligibility and interest rates offered."],
              ["fa-coins","Reduce Existing Debt Obligations","Identify and close smaller loans or credit card balances first to reduce the overall FOIR. Prepaying an existing loan reduces monthly obligations and demonstrates financial discipline. Every reduction in current EMI directly increases the loan amount you can qualify for under the 50% FOIR rule."],
              ["fa-users","Add a Co-Applicant","Including a co-applicant such as a spouse or parent allows their income to be combined with yours, effectively doubling the eligible loan amount. The co-applicant must also have a healthy CIBIL score and stable income. This is one of the fastest ways to qualify for the originally requested amount."],
              ["fa-calendar","Extend the Loan Tenure","Selecting a longer repayment tenure directly reduces the monthly EMI and improves FOIR compliance. A 5-year extension can reduce the EMI by 15-20% on most loan types. While the total interest cost increases slightly, this approach maximizes the loan amount you qualify for at your current income level."],
            ].map(([icon,title,desc],i)=>(
              <div key={i} style={{display:"flex",gap:14,marginBottom:20,alignItems:"flex-start"}}>
                <div style={{width:42,height:42,borderRadius:11,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <i className={`fa ${icon}`} style={{color:"#d97706"}}/>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{title}</div>
                  <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,margin:0}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plan Detail Popup Modal */}
      {planModal && (
        <PlanDetailModal
          plan={planModal.plan}
          planIndex={planModal.planIndex}
          loanType={loanType}
          onClose={() => setPlanModal(null)}
        />
      )}
    </div>
  );
}

function buildLocalReport(data, s, d, ai, appId, approved) {
  return `NEXUS BANK - AI LOAN DECISION REPORT\n\nApp ID: ${appId}\nDate: ${new Date().toLocaleDateString("en-IN")}\nDecision: ${approved?"APPROVED":"REJECTED"}\nScore: ${s.score}/100\n\nAPPLICANT: ${d.fullName}\nLoan: ${d.loanType} Rs ${d.loanAmount}\nEMI: Rs ${s.emi}/month @ ${s.interestRate}% pa\nFOIR: ${s.emiRatio}%\n\nEXECUTIVE SUMMARY:\n${ai.executiveSummary||""}\n\nFINANCIAL ANALYSIS:\n${ai.financialAnalysis||""}\n\nCREDIT RISK:\n${ai.creditRiskAnalysis||""}\n\nRATIONALE:\n${ai.approvalRationale||""}\n\nGROQ SUMMARY:\n${s.groqSummary||""}\n\nALTERNATIVE PLANS:\n${(s.altPlans||[]).map((p,i)=>`Plan ${i+1}: Rs ${p.loanAmount} | ${p.tenure} months | EMI Rs ${p.emi}`).join("\n")}\n\nNexus Bank AI Loan System`;
}