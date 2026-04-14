import { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import { Topbar, Toast } from "./components/Topbar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ProcessingPage from "./pages/ProcessingPage";
import ResultPage from "./pages/ResultPage";
import { CardsPage } from "./pages/CardsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/AboutPage";
import HistoryPage from "./pages/HistoryPage";
import "./styles.css";

// Load history from localStorage on startup
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("nexus_loan_history") || "[]");
  } catch {
    return [];
  }
}

function saveHistory(hist) {
  try {
    localStorage.setItem("nexus_loan_history", JSON.stringify(hist));
  } catch {}
}

export default function App() {
  const [page, setPage]         = useState("landing");
  const [result, setResult]     = useState(null);
  const [appData, setAppData]   = useState(null);
  const [toast, setToast]       = useState(null);
  const [appId, setAppId]       = useState(null);
  const [history, setHistory]   = useState(loadHistory);

  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  // Override setResult to also record history entry
  const setResultAndRecord = useCallback((res) => {
    setResult(res);
    if (res && res.applicationData && res.summary) {
      const d = res.applicationData;
      const s = res.summary;
      const entry = {
        applicationId: res.applicationId || ("NB" + Date.now()),
        timestamp: new Date().toISOString(),
        fullName: d.fullName,
        email: d.email,
        loanType: d.loanType,
        loanAmount: d.loanAmount,
        salary: d.salary,
        cibilScore: d.cibilScore,
        tenure: d.tenure,
        approved: s.approved,
        score: s.score,
        emi: s.emi,
        interestRate: s.interestRate,
        emiRatio: s.emiRatio,
        totalPayable: s.totalPayable,
        totalInterest: s.totalInterest,
        reasons: s.reasons,
        strengths: s.strengths,
        warnings: s.warnings,
        groqSummary: s.groqSummary,
        aiResult: s.aiResult,
      };
      setHistory(prev => {
        const next = [entry, ...prev];
        saveHistory(next);
        return next;
      });
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
    showToast("History cleared.", "info");
  }, [showToast]);

  const PAGE_TITLES = {
    home: "Dashboard", apply: "New Loan Application",
    processing: "AI Agent Processing", result: "Loan Decision & Report",
    cards: "Cards, Investments & Deposits",
    about: "About Nexus Bank", contact: "Contact Us",
    history: "Application History",
  };

  const sharedProps = {
    navigate, setResult: setResultAndRecord, setAppData, setAppId,
    result, appData, appId, showToast
  };

  if (page === "landing") {
    return (
      <>
        <LandingPage navigate={navigate} />
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </>
    );
  }

  return (
    <div className="app-root">
      <Sidebar
        page={page}
        navigate={navigate}
        hasResult={!!result}
        resultApproved={result?.summary?.approved}
        onLanding={() => navigate("landing")}
        historyCount={history.length}
      />
      <div className="app-body">
        <Topbar title={PAGE_TITLES[page]} onLanding={() => navigate("landing")} />
        <main className="main-content">
          {page === "home"       && <HomePage       {...sharedProps} />}
          {page === "apply"      && <ApplyPage      {...sharedProps} />}
          {page === "processing" && <ProcessingPage {...sharedProps} />}
          {page === "result"     && <ResultPage     {...sharedProps} />}
          {page === "cards"      && <CardsPage      {...sharedProps} />}
          {page === "about"      && <AboutPage      {...sharedProps} />}
          {page === "contact"    && <ContactPage    {...sharedProps} />}
          {page === "history"    && (
            <HistoryPage
              navigate={navigate}
              history={history}
              onClearHistory={handleClearHistory}
            />
          )}
        </main>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}