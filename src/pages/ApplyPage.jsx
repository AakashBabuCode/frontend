import { useState } from "react";

const API = import.meta.env.VITE_API_URL + "/api";

const STEP_LABELS = ["Personal Info","Employment","Loan Details","Preferences","Documents"];

export default function ApplyPage({ navigate, setResult, setAppData, setAppId, showToast }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName:"", age:"", email:"", phone:"", address:"",
    employmentType:"salaried", employer:"", salary:"",
    loanType:"personal", loanAmount:"", tenure:"24", purpose:"",
    cibilScore:"720",
    preferredEMI:"", preferredRate:"", preferredTenure:"",
    panCard:"ABCDE1234F", aadhar:"", bankAccount:"",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:""})); };

  const calcEMI = () => {
    const p = parseFloat(form.loanAmount)||0, n = parseInt(form.tenure)||1;
    const rateMap = {personal:12.5,home:8.5,car:9.25,education:10.5,business:13,gold:7.5};
    const r = (rateMap[form.loanType]||12.5)/100/12;
    if(!p||!r) return 0;
    return Math.round((p*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1));
  };

  const validate = () => {
    const e = {};
    if(step===0){
      if(!form.fullName.trim())          e.fullName="Name is required";
      if(!form.age||+form.age<21||+form.age>65) e.age="Age must be 21–65";
      if(!form.email||!form.email.includes("@")) e.email="Valid email required";
      if(!form.phone||form.phone.length!==10)   e.phone="10-digit number required";
    }
    if(step===1){
      if(!form.employer.trim())          e.employer="Employer name required";
      if(!form.salary||+form.salary<1)   e.salary="Monthly income required";
    }
    if(step===2){
      if(!form.loanAmount||+form.loanAmount<1000) e.loanAmount="Minimum ₹1,000 required";
      if(!form.tenure)                            e.tenure="Tenure required";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleNext = () => { if(validate()) setStep(s=>s+1); };
  const handleBack = () => setStep(s=>s-1);

  const handleSubmit = async () => {
    if(!validate()) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API}/loan/apply`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      setAppId(data.applicationId);
      setAppData(form);
      navigate("processing");
    } catch {
      showToast("Could not connect to server. Check backend is running on port 5000.", "error");
    } finally { setLoading(false); }
  };

  const rateMap = {personal:"12.5%",home:"8.5%",car:"9.25%",education:"10.5%",business:"13%",gold:"7.5%"};
  const emi = calcEMI();

  return (
    <div className="page">
      <div className="mb24">
        <div className="page-title"><i className="fa fa-file-signature" style={{marginRight:10,color:"var(--accent)"}}/>Loan Application</div>
        <div className="page-subtitle">Fill in your details — our AI agent will evaluate your application automatically.</div>
      </div>

      {/* Step Bar */}
      <div className="step-bar">
        {STEP_LABELS.map((label,i) => (
          <div key={i} className="flex-center" style={{flex:i<STEP_LABELS.length-1?1:"auto"}}>
            <div className="step-col">
              <div className={`step-circle ${i<step?"done":i===step?"active":""}`}>
                {i<step ? <i className="fa fa-check" style={{fontSize:12}}/> : i+1}
              </div>
              <span className={`step-label ${i<step?"done":i===step?"active":""}`}>{label}</span>
            </div>
            {i<STEP_LABELS.length-1 && (
              <div className="step-line-wrap">
                <div className={`step-line ${i<step?"done":""}`}/>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        {/* ── STEP 0: Personal Info ─────────────────────────────── */}
        {step===0 && (
          <>
            <div className="card-title mb24" style={{color:"var(--accent)"}}>
              <i className="fa fa-user" style={{marginRight:8}}/>Personal Information
            </div>
            <div className="g2">
              <div className="form-group">
                <label className="form-label">Full Name <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-user"/>
                  <input className={`form-input ${errors.fullName?"error":""}`} placeholder="As per Aadhaar card" value={form.fullName} onChange={e=>set("fullName",e.target.value)}/>
                </div>
                {errors.fullName && <div className="form-error">{errors.fullName}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Age <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-calendar"/>
                  <input type="number" className={`form-input ${errors.age?"error":""}`} placeholder="21 – 65 years" value={form.age} onChange={e=>set("age",e.target.value)}/>
                </div>
                {errors.age && <div className="form-error">{errors.age}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Email Address <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-envelope"/>
                  <input type="email" className={`form-input ${errors.email?"error":""}`} placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
                </div>
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-phone"/>
                  <input type="tel" className={`form-input ${errors.phone?"error":""}`} placeholder="10-digit mobile" value={form.phone} onChange={e=>set("phone",e.target.value)}/>
                </div>
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>
              <div className="form-group" style={{gridColumn:"1/-1"}}>
                <label className="form-label">Residential Address</label>
                <textarea className="form-textarea" placeholder="House No, Street, City, State, PIN..." value={form.address} onChange={e=>set("address",e.target.value)}/>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 1: Employment ────────────────────────────────── */}
        {step===1 && (
          <>
            <div className="card-title mb24" style={{color:"var(--accent)"}}>
              <i className="fa fa-briefcase" style={{marginRight:8}}/>Employment & Income
            </div>
            <div className="g2">
              <div className="form-group">
                <label className="form-label">Employment Type</label>
                <select className="form-select" value={form.employmentType} onChange={e=>set("employmentType",e.target.value)}>
                  <option value="salaried">Salaried Employee</option>
                  <option value="self_employed">Self Employed</option>
                  <option value="business">Business Owner</option>
                  <option value="retired">Retired / Pensioner</option>
                  <option value="student">Student (co-applicant)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Employer / Business Name <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-building"/>
                  <input className={`form-input ${errors.employer?"error":""}`} placeholder="Company or business name" value={form.employer} onChange={e=>set("employer",e.target.value)}/>
                </div>
                {errors.employer && <div className="form-error">{errors.employer}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Net Monthly Income (₹) <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-rupee-sign"/>
                  <input type="number" className={`form-input ${errors.salary?"error":""}`} placeholder="Take-home salary" value={form.salary} onChange={e=>set("salary",e.target.value)}/>
                </div>
                {errors.salary && <div className="form-error">{errors.salary}</div>}
                {form.salary>0 && <div className="form-hint">Annual: ₹{(form.salary*12).toLocaleString("en-IN")}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">CIBIL Score (self-estimated)</label>
                <input type="number" className="form-input" placeholder="300 – 900" value={form.cibilScore} onChange={e=>set("cibilScore",e.target.value)} min="300" max="900"/>
                <div style={{marginTop:10}}>
                  <input type="range" min="300" max="900" step="10" value={form.cibilScore} onChange={e=>set("cibilScore",e.target.value)}/>
                  <div className="flex-between" style={{fontSize:11,marginTop:4}}>
                    <span style={{color:"var(--text3)"}}>300 Poor</span>
                    <span style={{fontWeight:600,color:+form.cibilScore>=750?"var(--success)":+form.cibilScore>=650?"var(--warn)":"var(--danger)"}}>
                      {form.cibilScore} — {+form.cibilScore>=750?"Excellent":+form.cibilScore>=650?"Good":"Poor"}
                    </span>
                    <span style={{color:"var(--text3)"}}>900 Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2: Loan Details ──────────────────────────────── */}
        {step===2 && (
          <>
            <div className="card-title mb24" style={{color:"var(--accent)"}}>
              <i className="fa fa-hand-holding-dollar" style={{marginRight:8}}/>Loan Details
            </div>
            <div className="g2">
              <div className="form-group">
                <label className="form-label">Loan Type</label>
                <select className="form-select" value={form.loanType} onChange={e=>set("loanType",e.target.value)}>
                  <option value="personal">Personal Loan — 12.5% p.a.</option>
                  <option value="home">Home Loan — 8.5% p.a.</option>
                  <option value="car">Car Loan — 9.25% p.a.</option>
                  <option value="education">Education Loan — 10.5% p.a.</option>
                  <option value="business">Business Loan — 13% p.a.</option>
                  <option value="gold">Gold Loan — 7.5% p.a.</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Loan Amount (₹) <span className="req">*</span></label>
                <div className="input-icon">
                  <i className="fa fa-rupee-sign"/>
                  <input type="number" className={`form-input ${errors.loanAmount?"error":""}`} placeholder="e.g. 500000" value={form.loanAmount} onChange={e=>set("loanAmount",e.target.value)}/>
                </div>
                {errors.loanAmount && <div className="form-error">{errors.loanAmount}</div>}
                {form.loanAmount>0 && <div className="form-hint">= ₹{Number(form.loanAmount).toLocaleString("en-IN")}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Repayment Tenure <span className="req">*</span></label>
                <select className="form-select" value={form.tenure} onChange={e=>set("tenure",e.target.value)}>
                  {[12,18,24,36,48,60,72,84,120,180,240,300,360].map(t=>(
                    <option key={t} value={t}>{t} months ({(t/12).toFixed(1)} years)</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Loan Purpose</label>
                <input className="form-input" placeholder="Brief description of purpose" value={form.purpose} onChange={e=>set("purpose",e.target.value)}/>
              </div>
            </div>
            {/* Live EMI Preview */}
            {emi>0 && (
              <div className="card card-blue card-xs mt16">
                <div className="flex-between">
                  <div>
                    <div style={{fontSize:12,color:"var(--text3)"}}>Estimated Monthly EMI @ {rateMap[form.loanType]}</div>
                    <div style={{fontSize:28,fontWeight:700,color:"var(--accent)",marginTop:4}}>
                      ₹{emi.toLocaleString("en-IN")}
                    </div>
                    <div style={{fontSize:12,color:"var(--text3)",marginTop:2}}>
                      Total payable: ₹{(emi*parseInt(form.tenure)).toLocaleString("en-IN")} over {form.tenure} months
                    </div>
                  </div>
                  <i className="fa fa-calculator" style={{fontSize:32,color:"var(--accent)",opacity:0.25}}/>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── STEP 3: Preferences ──────────────────────────────── */}
        {step===3 && (
          <>
            <div className="card-title mb16" style={{color:"var(--accent)"}}>
              <i className="fa fa-sliders" style={{marginRight:8}}/>Customer Preferences
            </div>
            <p style={{fontSize:13,color:"var(--text2)",marginBottom:22,lineHeight:1.6}}>
              Help our AI tailor the best offer for you. Leave fields blank to let AI decide.
            </p>
            <div className="g2">
              <div className="form-group">
                <label className="form-label">Max Comfortable EMI (₹/month)</label>
                <div className="input-icon">
                  <i className="fa fa-wallet"/>
                  <input type="number" className="form-input" placeholder="AI will optimize if blank" value={form.preferredEMI} onChange={e=>set("preferredEMI",e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Max Interest Rate (%)</label>
                <div className="input-icon">
                  <i className="fa fa-percent"/>
                  <input type="number" step="0.25" className="form-input" placeholder="e.g. 10.5" value={form.preferredRate} onChange={e=>set("preferredRate",e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Tenure (months)</label>
                <input type="number" className="form-input" placeholder="Leave blank for AI to decide" value={form.preferredTenure} onChange={e=>set("preferredTenure",e.target.value)}/>
              </div>
            </div>
            <div className="card card-xs mt16" style={{background:"linear-gradient(135deg,#f8f0ff,#eff6ff)",border:"1px solid #ddd6fe"}}>
              <div style={{fontSize:14,fontWeight:600,color:"var(--navy)",marginBottom:12}}>
                <i className="fa fa-robot" style={{marginRight:8,color:"var(--purple)"}}/>AI Agent Will Automatically:
              </div>
              {[
                "Evaluate income, CIBIL, and loan parameters",
                "Retrieve best-match policy from FAISS knowledge base",
                "Run Gemini AI for risk assessment with reasoning",
                "Generate Groq AI quick summary",
                "Suggest alternative if criteria not feasible",
                "Send sanction letter to your email",
              ].map((t,i)=>(
                <div key={i} className="flex-center gap8" style={{fontSize:13,color:"var(--text2)",marginBottom:7}}>
                  <i className="fa fa-check-circle" style={{color:"var(--success)",flexShrink:0}}/>
                  {t}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── STEP 4: Documents ────────────────────────────────── */}
        {step===4 && (
          <>
            <div className="card-title mb16" style={{color:"var(--accent)"}}>
              <i className="fa fa-folder-open" style={{marginRight:8}}/>Document Verification
            </div>
            <p style={{fontSize:13,color:"var(--text2)",marginBottom:20,lineHeight:1.6}}>
              The AI performs mock document verification. Enter document numbers for processing.
            </p>
            <div className="g2">
              <div className="form-group">
                <label className="form-label">PAN Card Number</label>
                <div className="input-icon">
                  <i className="fa fa-id-card"/>
                  <input className="form-input" placeholder="ABCDE1234F" value={form.panCard} onChange={e=>set("panCard",e.target.value.toUpperCase())} maxLength={10}/>
                </div>
                <div className="form-hint">Format: 5 letters + 4 digits + 1 letter</div>
              </div>
              <div className="form-group">
                <label className="form-label">Aadhaar Number</label>
                <div className="input-icon">
                  <i className="fa fa-fingerprint"/>
                  <input className="form-input" placeholder="12-digit Aadhaar" value={form.aadhar} onChange={e=>set("aadhar",e.target.value)} maxLength={12}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bank Account Number (for disbursement)</label>
                <div className="input-icon">
                  <i className="fa fa-building-columns"/>
                  <input className="form-input" placeholder="Account number" value={form.bankAccount} onChange={e=>set("bankAccount",e.target.value)}/>
                </div>
              </div>
            </div>
            {/* Mock doc status */}
            <div className="mb16" style={{marginTop:20}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:12,color:"var(--text)"}}>Document Status (AI Mock Verification)</div>
              {[
                ["PAN Card","Auto-verified","success","fa-id-card"],
                ["Aadhaar / Address Proof","Auto-verified","success","fa-address-card"],
                ["Income Proof (Salary Slips)","Rule-based check passed","success","fa-file-invoice"],
                ["Bank Statement","Pattern verified","success","fa-bank"],
                ["Credit Report","Fetched from CIBIL API","success","fa-chart-line"],
                ["Employment Letter","Employer record matched","warn","fa-briefcase"],
              ].map(([doc,status,type,icon],i)=>(
                <div key={i} className="flex-between" style={{padding:"11px 0",borderBottom:"1px solid var(--border)"}}>
                  <div className="flex-center gap12">
                    <i className={`fa ${icon}`} style={{color:"var(--text3)",width:16}}/>
                    <span style={{fontSize:14}}>{doc}</span>
                  </div>
                  <span className={`badge badge-${type}`}>
                    <i className={`fa fa-${type==="success"?"check":"clock"}`}/>
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex-between mt24" style={{paddingTop:20,borderTop:"1px solid var(--border)"}}>
          <button className="btn btn-outline" onClick={step>0?handleBack:()=>navigate("home")}>
            <i className="fa fa-arrow-left"/> {step===0?"Back to Home":"Previous"}
          </button>
          {step<4 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Continue <i className="fa fa-arrow-right"/>
            </button>
          ) : (
            <button className="btn btn-gold btn-lg" onClick={handleSubmit} disabled={loading}>
              {loading ? <><div className="spinner spinner-sm"/>&nbsp;Launching...</> : <><i className="fa fa-robot"/> Launch AI Agent</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}