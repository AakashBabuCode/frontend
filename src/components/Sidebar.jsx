export default function Sidebar({ page, navigate, hasResult, resultApproved, onLanding, historyCount }) {
  const MAIN_NAV = [
    { id:"home",       icon:"fa-gauge",           label:"Dashboard" },
    { id:"apply",      icon:"fa-file-signature",  label:"Apply for Loan" },
    { id:"processing", icon:"fa-robot",           label:"AI Processing" },
    { id:"result",     icon:"fa-chart-bar",       label:"Decision & Report" },
    { id:"history",    icon:"fa-clock-rotate-left", label:"History" },
  ];
  const PRODUCTS_NAV = [
    { id:"cards",   icon:"fa-credit-card",        label:"Cards & Investments" },
    { id:"about",   icon:"fa-building-columns",   label:"About Bank" },
    { id:"contact", icon:"fa-headset",            label:"Contact Us" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{cursor:"pointer"}} onClick={onLanding}>
        <div className="sidebar-logo-icon"><i className="fa fa-building-columns"/></div>
        <div className="sidebar-logo-text">
          <h1>Nexus Bank</h1>
          <span>AI Loan System v2.0</span>
        </div>
      </div>
      <div className="sidebar-section">Main Menu</div>
      {MAIN_NAV.map(n => (
        <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={() => navigate(n.id)}>
          <i className={`fa ${n.icon}`}/> {n.label}
          {n.id === "result" && hasResult && (
            <span className="nav-dot" style={{background: resultApproved ? "#22c55e" : "#ef4444"}}/>
          )}
          {n.id === "history" && historyCount > 0 && (
            <span style={{
              marginLeft:"auto", background:"rgba(212,168,67,0.85)", color:"#1a1a1a",
              borderRadius:20, fontSize:10, fontWeight:700,
              padding:"2px 7px", minWidth:18, textAlign:"center"
            }}>{historyCount}</span>
          )}
        </div>
      ))}
      <div className="sidebar-section">Products & Info</div>
      {PRODUCTS_NAV.map(n => (
        <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={() => navigate(n.id)}>
          <i className={`fa ${n.icon}`}/> {n.label}
        </div>
      ))}
      <div className="sidebar-footer">
        <div className="sidebar-ai-badge">
          <div className="ai-title"><i className="fa fa-robot" style={{marginRight:6}}/>AI Stack</div>
          <div className="ai-item"><i className="fa fa-brain" style={{color:"#d4a843",marginRight:6}}/>Gemini 1.5 Flash</div>
          <div className="ai-item"><i className="fa fa-bolt" style={{color:"#d4a843",marginRight:6}}/>Groq LLaMA 3.1</div>
          <div className="ai-item"><i className="fa fa-database" style={{color:"#d4a843",marginRight:6}}/>FAISS Vector RAG</div>
        </div>
        <div style={{marginTop:12}}>
          <div className="nav-item" style={{borderRadius:8,justifyContent:"center",gap:8,background:"rgba(212,168,67,0.1)",borderLeft:"none",color:"rgba(212,168,67,0.8)",fontSize:12}} onClick={onLanding}>
            <i className="fa fa-home"/> Back to Landing Page
          </div>
        </div>
      </div>
    </aside>
  );
}