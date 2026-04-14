import { useState } from "react";

export default function HistoryPage({ navigate, history = [], onClearHistory }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filtered = history.filter(entry => {
    const matchSearch =
      entry.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      entry.applicationId?.toLowerCase().includes(search.toLowerCase()) ||
      entry.loanType?.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "approved" && entry.approved) ||
      (filterStatus === "rejected" && !entry.approved);
    return matchSearch && matchStatus;
  });

  const totalApproved = history.filter(e => e.approved).length;
  const totalRejected = history.filter(e => !e.approved).length;
  const avgScore = history.length
    ? Math.round(history.reduce((a, e) => a + (e.score || 0), 0) / history.length)
    : 0;

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: "linear-gradient(135deg,#1e3a5f,#2d5a9e)",
            display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20
          }}>
            <i className="fa fa-clock-rotate-left" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)" }}>Application History</div>
            <div style={{ fontSize: 13, color: "var(--text3)" }}>All loan applications processed by the AI system</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Applications", value: history.length, icon: "fa-file-lines", bg: "#dbeafe", ic: "#1d4ed8" },
          { label: "Approved", value: totalApproved, icon: "fa-circle-check", bg: "#dcfce7", ic: "#16a34a" },
          { label: "Rejected", value: totalRejected, icon: "fa-circle-xmark", bg: "#fee2e2", ic: "#dc2626" },
          { label: "Avg AI Score", value: history.length ? avgScore + "/100" : "—", icon: "fa-gauge", bg: "#fef3c7", ic: "#d97706" },
        ].map((st, i) => (
          <div key={i} style={{
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14,
            padding: "16px 18px", display: "flex", gap: 14, alignItems: "center"
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, background: st.bg,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              <i className={`fa ${st.icon}`} style={{ color: st.ic, fontSize: 18 }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)" }}>{st.value}</div>
              <div style={{ fontSize: 12, color: "var(--text3)" }}>{st.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & filter bar */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center",
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px"
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <i className="fa fa-search" style={{
            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
            color: "var(--text3)", fontSize: 13
          }} />
          <input
            placeholder="Search by name, application ID, loan type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "9px 12px 9px 34px", border: "1px solid var(--border)",
              borderRadius: 8, fontSize: 13, background: "var(--surface3)", color: "var(--text1)",
              outline: "none", boxSizing: "border-box"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "approved", "rejected"].map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              style={{
                padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none",
                background: filterStatus === f
                  ? f === "approved" ? "#16a34a" : f === "rejected" ? "#dc2626" : "var(--accent)"
                  : "var(--surface3)",
                color: filterStatus === f ? "white" : "var(--text2)",
                transition: "all 0.2s"
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        {history.length > 0 && (
          <button
            onClick={() => { if (window.confirm("Clear all history?")) onClearHistory(); }}
            style={{
              padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
              border: "1px solid #fca5a5", background: "#fff1f2", color: "#dc2626", fontWeight: 500
            }}
          >
            <i className="fa fa-trash" style={{ marginRight: 5 }} />Clear All
          </button>
        )}
      </div>

      {/* Table / Empty state */}
      {history.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px 20px",
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14
        }}>
          <i className="fa fa-inbox" style={{ fontSize: 52, color: "var(--text3)", display: "block", marginBottom: 16 }} />
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--navy)", marginBottom: 8 }}>No Applications Yet</div>
          <p style={{ color: "var(--text2)", marginBottom: 24 }}>
            Once you apply for a loan and get an AI decision, it will appear here.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("apply")}>
            <i className="fa fa-file-signature" /> Apply for Loan
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: "center", padding: 60,
          background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14
        }}>
          <i className="fa fa-magnifying-glass" style={{ fontSize: 36, color: "var(--text3)", display: "block", marginBottom: 12 }} />
          <div style={{ color: "var(--text2)" }}>No results match your search/filter.</div>
        </div>
      ) : (
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
          <table className="tbl" style={{ marginBottom: 0 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant Name</th>
                <th>Application ID</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>EMI/month</th>
                <th>AI Score</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <tr key={entry.applicationId || i} style={{ cursor: "pointer" }} onClick={() => setSelectedEntry(entry)}>
                  <td style={{ color: "var(--text3)", fontSize: 12 }}>{filtered.length - i}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "var(--navy)" }}>{entry.fullName}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{entry.email}</div>
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text2)" }}>{entry.applicationId}</td>
                  <td>
                    <span style={{
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: "#eff6ff", color: "#1d4ed8"
                    }}>
                      {entry.loanType ? entry.loanType.charAt(0).toUpperCase() + entry.loanType.slice(1) : "—"}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>Rs {Number(entry.loanAmount || 0).toLocaleString("en-IN")}</td>
                  <td style={{ color: "var(--text2)" }}>Rs {Number(entry.emi || 0).toLocaleString("en-IN")}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: (entry.score || 0) >= 70 ? "#dcfce7" : (entry.score || 0) >= 50 ? "#fef3c7" : "#fee2e2",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700,
                        color: (entry.score || 0) >= 70 ? "#16a34a" : (entry.score || 0) >= 50 ? "#d97706" : "#dc2626"
                      }}>
                        {entry.score || 0}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${entry.approved ? "success" : "danger"}`}>
                      <i className={`fa fa-${entry.approved ? "check" : "times"}`} />
                      {entry.approved ? "APPROVED" : "REJECTED"}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text3)", whiteSpace: "nowrap" }}>
                    {entry.timestamp
                      ? new Date(entry.timestamp).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                      : "—"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{ fontSize: 11, padding: "5px 10px" }}
                      onClick={e => { e.stopPropagation(); setSelectedEntry(entry); }}
                    >
                      <i className="fa fa-eye" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <HistoryDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} navigate={navigate} />
      )}
    </div>
  );
}

function HistoryDetailModal({ entry, onClose, navigate }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }} onClick={onClose}>
      <div style={{
        background: "var(--card)", borderRadius: 18, padding: 32, maxWidth: 600, width: "100%",
        maxHeight: "85vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }} onClick={e => e.stopPropagation()}>
        {/* Modal header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
              {entry.fullName}
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "monospace" }}>{entry.applicationId}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span className={`badge badge-${entry.approved ? "success" : "danger"}`} style={{ fontSize: 13 }}>
              <i className={`fa fa-${entry.approved ? "check" : "times"}`} />
              {entry.approved ? "APPROVED" : "REJECTED"}
            </span>
            <button onClick={onClose} style={{
              width: 32, height: 32, borderRadius: "50%", border: "none",
              background: "var(--surface3)", cursor: "pointer", fontSize: 15, color: "var(--text2)"
            }}>×</button>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: 18 }} />

        {/* Key metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            ["Loan Type", entry.loanType ? entry.loanType.charAt(0).toUpperCase() + entry.loanType.slice(1) + " Loan" : "—"],
            ["Amount", "Rs " + Number(entry.loanAmount || 0).toLocaleString("en-IN")],
            ["Monthly EMI", "Rs " + Number(entry.emi || 0).toLocaleString("en-IN")],
            ["Interest Rate", (entry.interestRate || "—") + "% p.a."],
            ["FOIR", (entry.emiRatio || "—") + "%"],
            ["AI Score", (entry.score || 0) + " / 100"],
            ["CIBIL Score", entry.cibilScore || "—"],
            ["Monthly Income", "Rs " + Number(entry.salary || 0).toLocaleString("en-IN")],
          ].map(([k, v], i) => (
            <div key={i} style={{
              background: "var(--surface3)", borderRadius: 9, padding: "10px 14px"
            }}>
              <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 3 }}>{k}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* AI Summary snippet */}
        {entry.groqSummary && (
          <div style={{
            background: "#fffbeb", borderRadius: 10, padding: "14px 16px",
            borderLeft: "3px solid #fde68a", marginBottom: 16
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#d97706", marginBottom: 6, textTransform: "uppercase" }}>
              <i className="fa fa-bolt" style={{ marginRight: 5 }} />AI Summary
            </div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>
              {entry.groqSummary.split(/\n\n/)[0]?.slice(0, 320)}
              {entry.groqSummary.length > 320 ? "..." : ""}
            </p>
          </div>
        )}

        <div style={{ fontSize: 12, color: "var(--text3)", textAlign: "center" }}>
          Applied on {entry.timestamp
            ? new Date(entry.timestamp).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })
            : "—"}
        </div>
      </div>
    </div>
  );
}
