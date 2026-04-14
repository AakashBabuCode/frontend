// ═══════════════════════════════════════════════════════════
// AboutPage.jsx
// ═══════════════════════════════════════════════════════════
export function AboutPage() {
    return (
      <div className="page">
        {/* Hero */}
        <div className="card card-navy mb32" style={{padding:"52px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-50,right:-50,width:260,height:260,borderRadius:"50%",background:"rgba(212,168,67,0.07)"}}/>
          <div style={{position:"absolute",bottom:-40,right:200,width:160,height:160,borderRadius:"50%",background:"rgba(212,168,67,0.05)"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <span style={{background:"rgba(212,168,67,0.18)",color:"var(--gold)",padding:"5px 18px",borderRadius:20,fontSize:12,fontWeight:600,letterSpacing:1}}>EST. 1987</span>
            <h1 style={{fontFamily:"Playfair Display",fontSize:46,margin:"18px 0 14px",color:"white"}}>Nexus Bank</h1>
            <p style={{color:"rgba(255,255,255,0.6)",fontSize:16,maxWidth:560,lineHeight:1.7}}>
              India's most trusted AI-powered banking institution. Serving 2.4 crore customers across 850+ branches, with a vision to make banking intelligent, instant, and inclusive.
            </p>
            <div style={{display:"flex",gap:0,marginTop:32}}>
              {[["2.4 Cr","Customers"],["850+","Branches"],["₹1.2L Cr","Total Assets"],["37 Yrs","Banking Excellence"]].map(([v,l],i)=>(
                <div key={i} style={{paddingRight:28,marginRight:28,borderRight:i<3?"1px solid rgba(255,255,255,0.12)":"none"}}>
                  <div style={{fontFamily:"Playfair Display",fontSize:26,color:"var(--gold)",fontWeight:700}}>{v}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginTop:2}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Vision + Tech */}
        <div className="g2 mb32">
          <div className="card">
            <div className="section-title mb14">Our AI Vision</div>
            <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.8,marginBottom:14}}>
              At Nexus Bank, we believe lending decisions should be fast, fair, and fully transparent. Our AI Loan Agent — powered by Google Gemini 1.5 Flash and Groq's lightning-fast inference engine — processes applications in seconds.
            </p>
            <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.8,marginBottom:14}}>
              Our FAISS vector database stores our loan policy knowledge base, enabling RAG (Retrieval-Augmented Generation) so the AI always references up-to-date bank policies when making decisions.
            </p>
            <p style={{color:"var(--text2)",fontSize:14,lineHeight:1.8}}>
              Every decision comes with detailed reasoning — not just a yes/no, but an explanation of why, what could be improved, and what alternatives are available.
            </p>
          </div>
          <div className="card">
            <div className="section-title mb20">Technology Stack</div>
            {[
              {icon:"fa-brain",     label:"Google Gemini 1.5 Flash", desc:"Primary loan decision AI with RAG",          bg:"#fff1f2",ic:"#dc2626"},
              {icon:"fa-bolt",      label:"Groq mixtral-8x7b-32768", desc:"Ultra-fast summary generation (< 1s)",       bg:"#fef3c7",ic:"#d97706"},
              {icon:"fa-database",  label:"FAISS Vector Database",    desc:"Policy RAG for context-aware decisions",     bg:"#f3e8ff",ic:"#7c3aed"},
              {icon:"fa-flask",     label:"Flask Python Backend",     desc:"REST API with AI agent orchestration",       bg:"#dbeafe",ic:"#1d4ed8"},
              {icon:"fa-atom",      label:"React + Vite Frontend",    desc:"Modern SPA with rich UI components",         bg:"#dcfce7",ic:"#16a34a"},
              {icon:"fa-shield-halved",label:"256-bit Encryption",   desc:"Bank-grade security for all data in transit",bg:"#f8fafc",ic:"#475569"},
            ].map((t,i)=>(
              <div key={i} className="flex-center gap14" style={{marginBottom:16}}>
                <div style={{width:42,height:42,borderRadius:11,background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <i className={`fa ${t.icon}`} style={{color:t.ic,fontSize:16}}/>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:500}}>{t.label}</div>
                  <div style={{fontSize:12,color:"var(--text3)"}}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Architecture */}
        <div className="card mb32">
          <div className="section-title mb16">System Architecture</div>
          <div className="g2">
            <div>
              <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Frontend (React + Vite)</div>
              {["Home Page — Hero, stats, recent apps","Apply Page — 5-step loan wizard","Processing — Live AI agent animation","Result — 4-tab decision report","Cards, About, Contact pages"].map((t,i)=>(
                <div key={i} className="flex-center gap8" style={{fontSize:13,color:"var(--text2)",marginBottom:6}}>
                  <i className="fa fa-check-circle" style={{color:"var(--success)",fontSize:11}}/>
                  {t}
                </div>
              ))}
            </div>
            <div>
              <div style={{fontWeight:600,marginBottom:12,fontSize:14}}>Backend (Flask Python)</div>
              {[
                "POST /api/loan/apply — Application submission",
                "POST /api/loan/process — Full AI agent pipeline",
                "POST /api/loan/emi-calculator — EMI compute",
                "POST /api/loan/send-email — Sanction letter email",
                "POST /api/loan/report — PDF/text report gen",
                "GET  /api/products/loans & deposits",
              ].map((t,i)=>(
                <div key={i} className="flex-center gap8" style={{fontSize:13,color:"var(--text2)",marginBottom:6}}>
                  <i className="fa fa-code" style={{color:"var(--accent)",fontSize:11}}/>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Team */}
        <div className="section-title mb20">Leadership Team</div>
        <div className="g4">
          {[
            {name:"Dr. Anand Krishnamurthy",role:"MD & CEO",emoji:"👨‍💼",dept:"Executive"},
            {name:"Priya Ramachandran",     role:"Chief Technology Officer",emoji:"👩‍💻",dept:"Technology"},
            {name:"Suresh Venkatesh",       role:"Chief Risk Officer",emoji:"👨‍⚖️",dept:"Risk"},
            {name:"Deepa Nair",            role:"Head of AI & Innovation",emoji:"👩‍🔬",dept:"AI Lab"},
          ].map((p,i)=>(
            <div className="card card-sm" key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:38,marginBottom:10}}>{p.emoji}</div>
              <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{p.name}</div>
              <div style={{fontSize:12,color:"var(--text3)",marginBottom:8}}>{p.role}</div>
              <span className="badge badge-info">{p.dept}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // ═══════════════════════════════════════════════════════════
  // ContactPage.jsx
  // ═══════════════════════════════════════════════════════════
  import { useState } from "react";
  const API = import.meta.env.VITE_API_URL + "/api";
  
  export function ContactPage({ showToast }) {
    const [form, setForm] = useState({name:"",email:"",phone:"",subject:"",message:""});
    const [sent, setSent]   = useState(false);
    const [loading, setL]   = useState(false);
  
    const handleSubmit = async () => {
      if(!form.name||!form.email||!form.message){ showToast("Please fill required fields","error"); return; }
      setL(true);
      try {
        const res = await fetch(`${API}/contact`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
        const r   = await res.json();
        setSent(true);
        showToast(`${r.message} (Ticket: ${r.ticketId})`,"success");
      } catch {
        setSent(true);
        showToast("Message received! We'll respond within 24 hours.","success");
      } finally { setL(false); }
    };
  
    return (
      <div className="page">
        <div className="mb24">
          <div className="page-title"><i className="fa fa-headset" style={{marginRight:10,color:"var(--accent)"}}/>Contact Us</div>
          <div className="page-subtitle">We're here to help — 24×7 support for all banking needs.</div>
        </div>
  
        <div className="g23">
          {/* Info */}
          <div>
            {[
              {icon:"fa-phone",         title:"Phone Support",   lines:["1800-XXX-XXXX (Toll Free)","Mon–Sat, 9AM–7PM IST"]},
              {icon:"fa-envelope",      title:"Email",           lines:["support@nexusbank.in","Response within 24 hours"]},
              {icon:"fa-location-dot",  title:"Head Office",     lines:["Nexus Tower, 42 MG Road","Bengaluru, Karnataka 560001"]},
              {icon:"fa-comments",      title:"Live Chat",       lines:["Available on website & app","Average wait: < 2 minutes"]},
            ].map((c,i)=>(
              <div key={i} className="flex-center gap14" style={{marginBottom:24,alignItems:"flex-start"}}>
                <div className="contact-info-icon"><i className={`fa ${c.icon}`}/></div>
                <div>
                  <div style={{fontWeight:600,marginBottom:4,fontSize:14}}>{c.title}</div>
                  {c.lines.map((l,j)=><div key={j} style={{fontSize:13,color:j===0?"var(--text2)":"var(--text3)"}}>{l}</div>)}
                </div>
              </div>
            ))}
  
            {/* Branch Locator */}
            <div className="card card-sm mt16">
              <div className="card-title mb12">
                <i className="fa fa-map-location-dot" style={{marginRight:8,color:"var(--accent)"}}/>Branch Locator
              </div>
              <input className="form-input mb12" placeholder="Enter city or pincode..."/>
              <button className="btn btn-primary btn-sm btn-full">
                <i className="fa fa-search"/> Find Nearest Branch
              </button>
              <div style={{marginTop:12,fontSize:12,color:"var(--text3)"}}>850+ branches across India</div>
            </div>
  
            {/* FAQs */}
            <div className="card card-sm mt16">
              <div className="card-title mb12"><i className="fa fa-circle-question" style={{marginRight:8,color:"var(--accent)"}}/>Quick FAQs</div>
              {[
                "How long does AI take to decide?",
                "Can I improve my rejected application?",
                "How is EMI calculated?",
                "What documents are needed?",
              ].map((q,i)=>(
                <div key={i} className="flex-center gap8" style={{padding:"9px 0",borderBottom:i<3?"1px solid var(--border)":"none",fontSize:13,cursor:"pointer",color:"var(--accent)"}}>
                  <i className="fa fa-chevron-right" style={{fontSize:10,color:"var(--text3)"}}/>
                  {q}
                </div>
              ))}
            </div>
          </div>
  
          {/* Form */}
          <div className="card">
            {sent ? (
              <div style={{textAlign:"center",padding:"48px 0"}}>
                <div style={{fontSize:56,marginBottom:16}}>✅</div>
                <div className="section-title mb10">Message Sent!</div>
                <p style={{color:"var(--text2)",marginBottom:24,fontSize:14}}>Our team will contact you within 24 hours.</p>
                <button className="btn btn-outline" onClick={()=>setSent(false)}>Send Another Message</button>
              </div>
            ) : (
              <>
                <div className="card-title mb20">Send a Message</div>
                <div className="g2">
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="req">*</span></label>
                    <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span className="req">*</span></label>
                    <input type="email" className="form-input" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-select" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))}>
                      <option value="">Select a topic...</option>
                      {["Loan Enquiry","Application Status","EMI Issue","Document Query","Account Opening","Complaint","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{gridColumn:"1/-1"}}>
                    <label className="form-label">Message <span className="req">*</span></label>
                    <textarea className="form-textarea" placeholder="Describe your query in detail..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{minHeight:120}}/>
                  </div>
                </div>
                <button className="btn btn-primary btn-full" onClick={handleSubmit} disabled={loading}>
                  {loading?<><div className="spinner spinner-sm"/>Sending...</>:<><i className="fa fa-paper-plane"/>Send Message</>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default AboutPage;