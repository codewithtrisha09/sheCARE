import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CharacterAvatar, DEFAULT_CHARACTER } from "../components/CharacterBuilder";
import "./CareSpace.css";

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function CareSpace() {
  const { user, authFetch } = useAuth();
  const [profile, setProfile] = useState(() => read("shecare-profile", { name: user?.name?.split(" ")[0] || "" }));
  const [character, setCharacter] = useState(() => user?.character || read("shecare-character", DEFAULT_CHARACTER));
  const [cycle, setCycle] = useState(() => read("shecare-cycle", { lastPeriod: "", length: 28, symptoms: [] }));
  const [checkIns, setCheckIns] = useState(() => read("shecare-checkins", []));
  const [reminders, setReminders] = useState(() => read("shecare-reminders", [
    { id: 1, label: "Pack a period product", enabled: true },
    { id: 2, label: "Check in with your mood", enabled: true },
  ]));
  const [newReminder, setNewReminder] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [report, setReport] = useState("");
  const [summary, setSummary] = useState("");
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [guideLoading, setGuideLoading] = useState(false);

  const persistWellness = async (payload = {}) => {
    const nextCycle = payload.cycle ?? cycle;
    const nextReminders = payload.reminders ?? reminders;
    const nextCheckIns = payload.checkIns ?? checkIns;
    const nextCharacter = payload.character ?? character;

    save("shecare-cycle", nextCycle);
    save("shecare-reminders", nextReminders);
    save("shecare-checkins", nextCheckIns);
    save("shecare-character", nextCharacter);

    try {
      const response = await authFetch("/api/wellness", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wellness: {
            cycle: nextCycle,
            reminders: nextReminders,
            checkIns: nextCheckIns,
            character: nextCharacter,
          },
        }),
      });
      if (response.ok) {
        setSaveStatus("Saved to your account");
        setTimeout(() => setSaveStatus(""), 2500);
      }
    } catch {
      setSaveStatus("Saved locally — sync when you're back online");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  useEffect(() => {
    authFetch("/api/wellness")
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.wellness?.cycle) setCycle(data.wellness.cycle);
        if (data?.wellness?.reminders) setReminders(data.wellness.reminders);
        if (data?.wellness?.checkIns) setCheckIns(data.wellness.checkIns);
        if (data?.wellness?.character) setCharacter(data.wellness.character);
      })
      .catch(() => {});
  }, [authFetch]);

  const nextPeriod = useMemo(() => {
    if (!cycle.lastPeriod) return null;
    const next = new Date(`${cycle.lastPeriod}T00:00:00`);
    next.setDate(next.getDate() + Number(cycle.length || 28));
    return next;
  }, [cycle]);

  const daysUntil = nextPeriod ? Math.ceil((nextPeriod - new Date()) / 86400000) : null;

  const updateCycle = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const entry = { date: today, symptoms: cycle.symptoms || [] };
    const nextCheckIns = [entry, ...checkIns.filter((item) => item.date !== today)].slice(0, 60);
    setCheckIns(nextCheckIns);
    persistWellness({ checkIns: nextCheckIns });
  };

  const updateProfile = (event) => {
    event.preventDefault();
    save("shecare-profile", profile);
    setSaveStatus("Profile updated");
    setTimeout(() => setSaveStatus(""), 2000);
  };

  const addReminder = (event) => {
    event.preventDefault();
    if (!newReminder.trim()) return;
    const updated = [...reminders, { id: Date.now(), label: newReminder.trim(), enabled: true }];
    setReminders(updated);
    persistWellness({ reminders: updated });
    setNewReminder("");
  };

  const toggleReminder = (id) => {
    const updated = reminders.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item));
    setReminders(updated);
    persistWellness({ reminders: updated });
  };

  const askAssistant = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    setGuideLoading(true);
    setAnswer("");
    try {
      const response = await authFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setAnswer(data.reply);
    } catch (error) {
      setAnswer(error.message || "I couldn't respond right now. Try the chat button for quick help.");
    } finally {
      setGuideLoading(false);
    }
  };

  const simplifyReport = (event) => {
    event.preventDefault();
    if (!report.trim()) return;
    const sentences = report.replace(/\s+/g, " ").match(/[^.!?]+[.!?]*/g) || [report];
    setSummary(`In simpler words: ${sentences.slice(0, 2).join(" ").trim()} This is an explanation aid, not a diagnosis—ask the clinician who ordered the report what it means for you.`);
  };

  const generateMonthlyReport = async () => {
    setReportLoading(true);
    try {
      const response = await authFetch("/api/monthly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wellness: { cycle, reminders, checkIns, character } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMonthlyReport(data.report);
    } catch (error) {
      setMonthlyReport({
        month: new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
        summary: error.message || "Could not generate report right now.",
      });
    } finally {
      setReportLoading(false);
    }
  };

  const displayName = profile.name || user?.name?.split(" ")[0] || "";

  return (
    <main className="care-space">
      <section className="care-hero">
        <div className="care-hero-row">
          <div>
            <p className="eyebrow">YOUR PRIVATE WELLNESS SPACE</p>
            <h1>{displayName ? `Hi ${displayName}, care that fits into real life.` : "Care that fits into real life."}</h1>
            <p>Track patterns, set gentle reminders, and find clear next steps—without judgement or information overload.</p>
            {saveStatus && <p className="save-status" role="status">{saveStatus}</p>}
          </div>
          <div className="care-avatar-wrap">
            <CharacterAvatar character={character} size="md" />
            <span>Your companion</span>
          </div>
        </div>
      </section>

      <section className="care-grid overview-grid">
        <article className="soft-card cycle-summary">
          <span className="card-kicker">CYCLE OVERVIEW</span>
          <h2>{nextPeriod ? (daysUntil > 0 ? `${daysUntil} days to your next period` : "Your period may be due") : "Start your cycle timeline"}</h2>
          <p>{nextPeriod ? `Estimated next period: ${nextPeriod.toLocaleDateString("en-IN", { day: "numeric", month: "long" })}` : "Add the first day of your last period to receive a gentle estimate."}</p>
          <span className="privacy-note">Synced to your secure account</span>
        </article>
        <article className="soft-card check-in-card">
          <span className="card-kicker">TODAY&apos;S CHECK-IN</span>
          <h2>A small pause counts.</h2>
          <p>Notice your energy, mood, and symptoms. Patterns are useful information, not a reason to worry.</p>
          <Link to="/mental-health">Explore mental wellness</Link>
        </article>
      </section>

      <section className="soft-card monthly-report-card">
        <span className="card-kicker">MONTHLY WELLNESS REPORT</span>
        <h2>Your month at a glance</h2>
        <p className="small-copy">A gentle summary of your check-ins, symptoms, and reminders — not a medical diagnosis.</p>
        <button type="button" onClick={generateMonthlyReport} disabled={reportLoading}>
          {reportLoading ? "Building report…" : "Generate this month's report"}
        </button>
        {monthlyReport && (
          <div className="monthly-report-body">
            <h3>{monthlyReport.month}</h3>
            <div className="report-stats">
              <div><strong>{monthlyReport.checkInsLogged ?? checkIns.length}</strong><span>Check-ins</span></div>
              <div><strong>{monthlyReport.cycleLength ?? cycle.length}</strong><span>Cycle length (days)</span></div>
              <div><strong>{monthlyReport.activeReminders ?? reminders.filter((r) => r.enabled).length}</strong><span>Active reminders</span></div>
            </div>
            {monthlyReport.topSymptoms?.length > 0 && (
              <p className="report-symptoms"><strong>Most noted:</strong> {monthlyReport.topSymptoms.join(", ")}</p>
            )}
            <p className="report-summary">{monthlyReport.summary}</p>
          </div>
        )}
      </section>

      <section className="care-grid feature-grid">
        <form className="soft-card form-card" onSubmit={updateCycle}>
          <span className="card-kicker">PERIOD TRACKER</span>
          <h2>Your cycle, your pace.</h2>
          <label htmlFor="last-period">First day of your last period
            <input id="last-period" type="date" value={cycle.lastPeriod} onChange={(e) => setCycle({ ...cycle, lastPeriod: e.target.value })} />
          </label>
          <label htmlFor="cycle-length">Usual cycle length
            <input id="cycle-length" type="number" min="15" max="60" value={cycle.length} onChange={(e) => setCycle({ ...cycle, length: e.target.value })} />
          </label>
          <div className="symptom-picker">
            <span id="symptom-label">How are you feeling today?</span>
            {["Cramps", "Low energy", "Headache", "Bloating", "Mood changes"].map((symptom) => (
              <button
                type="button"
                className={cycle.symptoms?.includes(symptom) ? "symptom-selected" : ""}
                key={symptom}
                aria-pressed={cycle.symptoms?.includes(symptom)}
                onClick={() => setCycle({
                  ...cycle,
                  symptoms: cycle.symptoms?.includes(symptom)
                    ? cycle.symptoms.filter((item) => item !== symptom)
                    : [...(cycle.symptoms || []), symptom],
                })}
              >
                {symptom}
              </button>
            ))}
          </div>
          <button type="submit">Save cycle details</button>
        </form>

        <section className="soft-card reminder-card">
          <span className="card-kicker">GENTLE REMINDERS</span>
          <h2>Little nudges, on your terms.</h2>
          <div className="reminder-list">
            {reminders.map((item) => (
              <label className="reminder" key={item.id}>
                <input type="checkbox" checked={item.enabled} onChange={() => toggleReminder(item.id)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <form className="inline-form" onSubmit={addReminder}>
            <input value={newReminder} onChange={(e) => setNewReminder(e.target.value)} placeholder="Add a reminder" aria-label="Add a reminder" />
            <button type="submit">Add</button>
          </form>
        </section>

        <form className="soft-card assistant-card" onSubmit={askAssistant}>
          <span className="card-kicker">SHECARE GUIDE</span>
          <h2>Ask a wellness question.</h2>
          <p className="small-copy">Health topics only — periods, mood, sleep, nutrition, hygiene.</p>
          <label htmlFor="guide-question" className="sr-only">Your question</label>
          <textarea id="guide-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="For example: Is it normal to feel tired before my period?" />
          <button type="submit" disabled={guideLoading}>{guideLoading ? "Thinking…" : "Get guidance"}</button>
          {answer && <p className="assistant-answer">{answer}</p>}
        </form>

        <form className="soft-card report-card" onSubmit={simplifyReport}>
          <span className="card-kicker">REPORT EXPLAINER</span>
          <h2>Make medical wording easier to read.</h2>
          <p className="small-copy">Paste a short excerpt from a report; avoid sharing names, numbers, or other personal details.</p>
          <label htmlFor="report-text" className="sr-only">Report excerpt</label>
          <textarea id="report-text" value={report} onChange={(e) => setReport(e.target.value)} placeholder="Paste a short, non-identifying excerpt here" />
          <button type="submit">Simplify this</button>
          {summary && <p className="assistant-answer">{summary}</p>}
        </form>
      </section>

      <section className="account-section soft-card">
        <div>
          <span className="card-kicker">PERSONAL PROFILE</span>
          <h2>Make this space yours.</h2>
          <p>Signed in as {user?.email}. Your wellness data is stored securely on your account.</p>
        </div>
        <form onSubmit={updateProfile} className="profile-form">
          <label htmlFor="profile-name">First name
            <input id="profile-name" value={profile.name} onChange={(e) => setProfile({ name: e.target.value })} placeholder="Your name" />
          </label>
          <button type="submit">Save profile</button>
        </form>
      </section>

      <p className="care-disclaimer">
        SheCARE supports health education and self-reflection. It does not replace medical advice, diagnosis, or emergency care.
        {" "}<Link to="/feedback">Share feedback about the site →</Link>
      </p>
    </main>
  );
}

export default CareSpace;
