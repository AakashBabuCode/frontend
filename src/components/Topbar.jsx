export function Topbar({ title }) {
    return (
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-breadcrumb">Nexus Bank</span>
          <i className="fa fa-chevron-right" style={{fontSize:9,color:"rgba(255,255,255,0.25)"}}/>
          <span className="topbar-title">{title}</span>
        </div>
        <div className="topbar-right">
          <div className="topbar-secure"><i className="fa fa-shield-halved"/>Secure Banking</div>
          <div className="topbar-icon"><i className="fa fa-bell"/></div>
          <div className="topbar-avatar">NB</div>
        </div>
      </header>
    );
  }
  
  export function Toast({ msg, type }) {
    const icons = { success:"fa-check-circle", error:"fa-times-circle", info:"fa-info-circle", warn:"fa-triangle-exclamation" };
    return (
      <div className={`toast toast-${type}`}>
        <i className={`fa ${icons[type] || "fa-info-circle"}`}/>
        {msg}
      </div>
    );
  }