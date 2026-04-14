// ═══════════════════════════════════════════════════════════
// CardsPage.jsx
// ═══════════════════════════════════════════════════════════
import { useState } from "react";

const LOANS = [
  {id:"personal",name:"Personal Loan", icon:"fa-user",     bg:"#fef3c7",ic:"#d97706",rate:"12.5%",max:"₹25 Lakh", minIncome:"₹15,000/mo", tenure:"12–60 mo", desc:"Instant unsecured loan for any personal need, medical, travel, wedding & more."},
  {id:"home",    name:"Home Loan",     icon:"fa-house",    bg:"#dbeafe",ic:"#1d4ed8",rate:"8.5%", max:"₹2 Crore", minIncome:"₹25,000/mo", tenure:"12–360 mo",desc:"Fulfill your dream of owning a home with flexible long-term repayment."},
  {id:"car",     name:"Car Loan",      icon:"fa-car",      bg:"#dcfce7",ic:"#16a34a",rate:"9.25%",max:"₹50 Lakh", minIncome:"₹20,000/mo", tenure:"12–84 mo", desc:"Drive your dream car with easy EMIs and quick on-road delivery."},
  {id:"edu",     name:"Education Loan",icon:"fa-graduation-cap",bg:"#f3e8ff",ic:"#7c3aed",rate:"10.5%",max:"₹40 Lakh",minIncome:"Co-applicant",tenure:"12–180 mo",desc:"Invest in your future with moratorium period during study."},
  {id:"biz",     name:"Business Loan", icon:"fa-briefcase",bg:"#fff1f2",ic:"#e11d48",rate:"13%",  max:"₹1 Crore", minIncome:"₹50,000/mo", tenure:"12–84 mo", desc:"Grow your business with working capital and term loans."},
  {id:"gold",    name:"Gold Loan",     icon:"fa-coins",    bg:"#fef9e7",ic:"#b8890d",rate:"7.5%", max:"₹75 Lakh", minIncome:"None",       tenure:"3–36 mo",  desc:"Instant same-day loan against gold ornaments and coins."},
];

const DEPOSITS = [
  {name:"Fixed Deposit",     icon:"fa-lock",     bg:"#dbeafe",ic:"#1d4ed8",rate:"7.5%",min:"₹1,000",tenure:"7 days – 10 yrs",desc:"Guaranteed returns on your lump-sum investment."},
  {name:"Recurring Deposit", icon:"fa-repeat",   bg:"#dcfce7",ic:"#16a34a",rate:"7.0%",min:"₹500/mo",tenure:"6 mo – 10 yrs", desc:"Save monthly and earn more than a savings account."},
  {name:"Savings Account",   icon:"fa-piggy-bank",bg:"#fef3c7",ic:"#d97706",rate:"4.0%",min:"₹0",    tenure:"Ongoing",       desc:"Zero-balance digital savings with UPI & IMPS."},
  {name:"NRI Deposits",      icon:"fa-globe",    bg:"#f3e8ff",ic:"#7c3aed",rate:"8.0%",min:"₹10,000",tenure:"1–5 yrs",       desc:"NRE/NRO deposits with repatriation benefits."},
];

const CARDS = [
  {name:"Nexus Platinum",  limit:"₹5 Lakh", reward:"5% cashback",annual:"₹999/yr", icon:"fa-gem",    bg:"#f3e8ff",ic:"#7c3aed",perks:["Airport lounge access","10X reward points","Zero forex markup","Global concierge"]},
  {name:"Nexus Gold",      limit:"₹2 Lakh", reward:"3% cashback",annual:"₹499/yr", icon:"fa-coins",  bg:"#fef9e7",ic:"#b8890d",perks:["Fuel surcharge waiver","Dining discounts","5X reward points","EMI on purchases"]},
  {name:"Nexus Classic",   limit:"₹75,000",reward:"1% cashback",annual:"No fee",   icon:"fa-credit-card",bg:"#dbeafe",ic:"#1d4ed8",perks:["Zero annual fee","Online cashback","Contactless payments","Credit limit increase"]},
];

export function CardsPage({ navigate }) {
  const [tab, setTab] = useState(0);
  return (
    <div className="page">
      <div className="mb24">
        <div className="page-title"><i className="fa fa-credit-card" style={{marginRight:10,color:"var(--accent)"}}/>Cards, Investments & Deposits</div>
        <div className="page-subtitle">Explore Nexus Bank's full range of financial products.</div>
      </div>

      <div className="tabs">
        {["🏦 Loan Products","💰 Deposits","💳 Credit Cards"].map((t,i)=>(
          <div key={i} className={`tab ${tab===i?"active":""}`} onClick={()=>setTab(i)}>{t}</div>
        ))}
      </div>

      {/* Loans */}
      {tab===0 && (
        <div className="g3">
          {LOANS.map((l,i)=>(
            <div className="product-card card-hover" key={i}>
              <div className="product-icon" style={{background:l.bg}}>
                <i className={`fa ${l.icon}`} style={{color:l.ic}}/>
              </div>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:6}}>{l.name}</h3>
              <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.5,marginBottom:6}}>{l.desc}</p>
              <div className="product-rate">{l.rate} p.a.</div>
              <div className="divider" style={{margin:"12px 0"}}/>
              <ul className="product-features">
                <li><i className="fa fa-arrow-up" style={{color:l.ic,fontSize:10}}/> Max: {l.max}</li>
                <li><i className="fa fa-wallet"   style={{color:l.ic,fontSize:10}}/> Min Income: {l.minIncome}</li>
                <li><i className="fa fa-calendar" style={{color:l.ic,fontSize:10}}/> Tenure: {l.tenure}</li>
              </ul>
              <button className="btn btn-primary btn-sm btn-full" style={{marginTop:14}} onClick={()=>navigate("apply")}>
                Apply Now <i className="fa fa-arrow-right"/>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Deposits */}
      {tab===1 && (
        <>
          {/* FD Calculator */}
          <div className="card mb24">
            <div className="card-title mb16"><i className="fa fa-calculator" style={{marginRight:8,color:"var(--accent)"}}/>FD / RD Calculator</div>
            <FDCalculator/>
          </div>
          <div className="g4">
            {DEPOSITS.map((d,i)=>(
              <div className="product-card card-hover" key={i}>
                <div className="product-icon" style={{background:d.bg}}>
                  <i className={`fa ${d.icon}`} style={{color:d.ic}}/>
                </div>
                <h3 style={{fontSize:15,fontWeight:600,marginBottom:6}}>{d.name}</h3>
                <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.5}}>{d.desc}</p>
                <div className="product-rate" style={{fontSize:22}}>{d.rate} p.a.</div>
                <div className="divider" style={{margin:"10px 0"}}/>
                <ul className="product-features">
                  <li><i className="fa fa-coins" style={{color:d.ic,fontSize:10}}/> Min: {d.min}</li>
                  <li><i className="fa fa-calendar" style={{color:d.ic,fontSize:10}}/> Tenure: {d.tenure}</li>
                </ul>
                <button className="btn btn-outline btn-sm btn-full" style={{marginTop:12}}>Open Now</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cards */}
      {tab===2 && (
        <div className="g3">
          {CARDS.map((c,i)=>(
            <div className={`card card-hover ${i===0?"":""}` } key={i} style={i===0?{border:"2px solid #ddd6fe"}:{}}>
              {i===0 && <div style={{textAlign:"center",marginBottom:12}}><span className="badge badge-purple">⭐ Premium Pick</span></div>}
              <div className="flex-center gap12 mb14">
                <div className="product-icon" style={{background:c.bg,marginBottom:0}}>
                  <i className={`fa ${c.icon}`} style={{color:c.ic}}/>
                </div>
                <div>
                  <div style={{fontSize:15,fontWeight:600}}>{c.name} Card</div>
                  <div style={{fontSize:12,color:"var(--text3)"}}>{c.annual}</div>
                </div>
              </div>
              <div className="divider"/>
              {[["Credit Limit",c.limit],["Reward",c.reward],["Annual Fee",c.annual]].map(([k,v],j)=>(
                <div className="info-row" key={j}><span className="info-key">{k}</span><span className="info-val">{v}</span></div>
              ))}
              <div style={{marginTop:14}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--text3)",marginBottom:8}}>Key Benefits</div>
                {c.perks.map((p,j)=>(
                  <div key={j} className="flex-center gap8" style={{fontSize:13,color:"var(--text2)",marginBottom:5}}>
                    <i className="fa fa-check" style={{color:"var(--success)",fontSize:10}}/>
                    {p}
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-sm btn-full" style={{marginTop:14}}>Apply for Card</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FDCalculator() {
  const [amt, setAmt] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [yrs, setYrs] = useState(2);
  const maturity = Math.round(amt * Math.pow(1+rate/100, yrs));
  const interest = maturity - amt;
  return (
    <div className="g2">
      <div>
        <div className="form-group">
          <label className="form-label">Principal Amount (₹)</label>
          <input type="range" min="10000" max="5000000" step="10000" value={amt} onChange={e=>setAmt(+e.target.value)}/>
          <div className="flex-between" style={{fontSize:12,color:"var(--text3)",marginTop:4}}>
            <span>₹10,000</span><strong style={{color:"var(--accent)"}}>₹{amt.toLocaleString("en-IN")}</strong><span>₹50L</span>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Interest Rate (%)</label>
          <input type="range" min="4" max="10" step="0.25" value={rate} onChange={e=>setRate(+e.target.value)}/>
          <div className="flex-between" style={{fontSize:12,color:"var(--text3)",marginTop:4}}>
            <span>4%</span><strong style={{color:"var(--accent)"}}>{rate}% p.a.</strong><span>10%</span>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Tenure (years)</label>
          <input type="range" min="1" max="10" step="1" value={yrs} onChange={e=>setYrs(+e.target.value)}/>
          <div className="flex-between" style={{fontSize:12,color:"var(--text3)",marginTop:4}}>
            <span>1 yr</span><strong style={{color:"var(--accent)"}}>{yrs} years</strong><span>10 yrs</span>
          </div>
        </div>
      </div>
      <div className="card card-blue card-sm" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
        <div style={{fontSize:12,color:"var(--text3)",marginBottom:6}}>Maturity Amount</div>
        <div style={{fontSize:32,fontWeight:700,color:"var(--accent)"}}>₹{maturity.toLocaleString("en-IN")}</div>
        <div style={{fontSize:13,color:"var(--success)",marginTop:8,fontWeight:500}}>
          <i className="fa fa-arrow-up" style={{fontSize:10,marginRight:4}}/>
          Interest Earned: ₹{interest.toLocaleString("en-IN")}
        </div>
        <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>on ₹{amt.toLocaleString("en-IN")} for {yrs} years @ {rate}%</div>
      </div>
    </div>
  );
}

export default CardsPage;