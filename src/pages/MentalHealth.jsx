import { useState } from "react";
import "./MentalHealth.css";

// IMPORTED PATH UPDATED TO MATCH YOUR ASSETS ROOT FOLDER EXACTLY
import hpoAxisChart from "../assets/hpo.png"; 

const clinicalInsights = [
  {
    title: "Allopregnanolone & The GABA Receptor Plot Twist",
    mechanism: "Progesterone breaks down into a neurosteroid called allopregnanolone (Allo). Allo normally pulls up to GABA receptors in the brain to chill you out. But during a pre-period plunge, that sudden withdrawal acts like a biological glitch, triggering high-key anxiety and panic signals.",
    takeaway: "If you feel completely overwhelmed right before your cycle, it's not a personality flaw. Your brain is literally adapting to a sudden withdrawal of its natural anti-anxiety serum."
  },
  {
    title: "Serotonin & Estrogen Partnership Crisis",
    mechanism: "Estrogen is basically the ultimate hype-man for your brain's mood chemicals. It controls how much Serotonin (the satisfaction molecule) and Dopamine (the motivation driver) your brain makes and keeps around. When estrogen bottoms out, your happy chemicals crash with it.",
    takeaway: "The pre-period depressive drop or sudden loss of motivation isn't you being lazy—it is a literal biochemical drought in your brain's reward centers."
  }
];

const phaseVibeCheck = {
  follicular: {
    title: "The Follicular Phase: High-Key Main Character Energy",
    neurochemistry: "Estrogen is steadily climbing, firing up your prefrontal cortex. Your brain is swimming in dopamine and serotonin, making you resilient, sharp, and social.",
    vibeStatus: "Low stress baseline, high cognitive bandwidth, peak verbal processing.",
    strategy: "This is your ultimate building phase. Smash hard projects, deep-dive into complex studying, and schedule intense social plans while your neurochemistry is giving you free cheat codes."
  },
  luteal: {
    title: "The Luteal Phase: The Low-Dopamine Vibe Shift",
    neurochemistry: "Estrogen takes a dive while Progesterone takes over the wheel. If your brain is sensitive to progesterone drops, your amygdala (the brain's threat-detector) goes into hyper-drive, dropping serotonin levels by up to 25%.",
    vibeStatus: "Brain fog incoming, hyper-reactivity to stress, crying over minor inconveniences.",
    strategy: "Protect your peace at all costs. Give yourself grace for needing extra sleep, reduce high-stimulus environments, switch to low-intensity movement, and do not make major life decisions when your brain chemistry is playing games."
  }
};

function MentalHealth() {
  const [activeVibe, setActiveVibe] = useState("follicular");
  const [symptomInput, setSymptomInput] = useState("");
  const [neuroAnalysis, setNeuroAnalysis] = useState(null);

  const [trackerSurvey, setTrackerSurvey] = useState({
    sleep: "",
    irritability: false,
    anxiety: false,
    cycleDay: ""
  });
  const [trackerResult, setTrackerResult] = useState(null);

  const runNeuroCheck = () => {
    const text = symptomInput.toLowerCase();
    if (!text.trim()) {
      setNeuroAnalysis({ 
        status: "Vibe Check Empty", 
        explanation: "Drop a line about what your brain is doing right now so we can scan the chemistry.", 
        code: "neutral" 
      });
      return;
    }

    if (text.includes("sad") || text.includes("cry") || text.includes("hopeless") || text.includes("fog")) {
      setNeuroAnalysis({
        status: "Estrogen Depletion & Serotonin Deficit",
        explanation: "Your text flags typical hallmarks of a neurochemical valley. As estrogen pulls back, your serotonin synthesis takes a direct hit. This impairs cognitive speed (hello, brain fog) and drops your baseline mood floor.",
        code: "depressed"
      });
    } else if (text.includes("angry") || text.includes("mad") || text.includes("snap") || text.includes("irritable")) {
      setNeuroAnalysis({
        status: "Progesterone Withdrawal & Amygdala Flare",
        explanation: "Your stress-response system is currently hyper-reactive. When progesterone drops quickly, the brain's GABA-A receptors lose their stabilization armor, causing your amygdala to flag minor inconveniences as existential threats.",
        code: "irritable"
      });
    } else {
      setNeuroAnalysis({
        status: "Fluctuating Neuro-Endocrine Feedback",
        explanation: "Your system is processing active hormonal shifts. Remember that your HPO axis (Hypothalamus-Pituitary-Ovarian axis) is constantly adjusting neurotransmitter margins. Keep charting these patterns!",
        code: "shifting"
      });
    }
  };

  const processBrainTracker = () => {
    let score = 0;
    if (trackerSurvey.sleep === "poor") score += 2;
    if (trackerSurvey.irritability === true) score += 2;
    if (trackerSurvey.anxiety === true) score += 2;
    if (trackerSurvey.cycleDay === "late") score += 3;

    if (score >= 6) {
      setTrackerResult({
        tier: "Defensive Self-Care Mode Activated",
        color: "#f87171",
        feedback: "You are heavily in your late-luteal neurochemical valley. Your brain is dealing with an intense drop in estrogen and allopregnanolone right now. Cancel non-essential high-stress tasks, prioritize magnesium intake, skip the heavy caffeine spikes, and remember: this is a temporary chemical state, not your reality."
      });
    } else if (score >= 3) {
      setTrackerResult({
        tier: "Standard Transitional Vibe Shift",
        color: "#fbbf24",
        feedback: "Your system is sliding into the pre-period wind-down. Your brain is beginning to operate with slightly lower dopamine levels. Keep your blood sugar stable to avoid doubling down on emotional instability, and get some extra rest tonight."
      });
    } else {
      setTrackerResult({
        tier: "Neurochemical Green Light",
        color: "#34d399",
        feedback: "Your brain chemistry is standing strong with high resilience. Your stress-handling pathways are well-armored right now. This is a brilliant window to tackle high-focus projects or difficult emotional conversations."
      });
    }
  };

  return (
    <div className="mental-health-page">
      <div className="ambient-blur blur-mh-1"></div>
      <div className="ambient-blur blur-mh-2"></div>

      {/* HERO MODULE */}
      <div className="mh-hero">
        <div className="mh-badge">Neuro-Endocrine Mapping Module</div>
        <h1>Your Mood Isn't Broken.<br />It's a Whole Biochemical Loop.</h1>
        <p>
          Let's completely bin the toxic narrative that people are just 'crazy' or over-emotional during their cycles. Your brain and your ovaries live in a permanent, high-speed group chat. When your hormones shift, your entire neurotransmitter profile changes. Let's look at the actual cellular data.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>KNDy Switch</h3>
            <p>Hypothalamic Command Center</p>
          </div>
          <div className="stat-card">
            <h3>GABA Circuit</h3>
            <p>The Anti-Anxiety Armor</p>
          </div>
          <div className="stat-card">
            <h3>5-HT Metrics</h3>
            <p>Serotonin & Estrogen Co-Op</p>
          </div>
        </div>
      </div>

      {/* BRAIN-BODY SPLIT LAYOUT */}
      <div className="mh-card split-layout">
        <div className="text-content">
          <h2>The HPO Axis Group Chat: How Ovaries Talk to Your Brain</h2>
          <p>
            Your reproductive cycle doesn't just happen in your uterus—it is directed entirely by your brain. The whole process kicks off in your hypothalamus via a specialized cluster of command switches called <strong>KNDy Neurons</strong>. 
          </p>
          <p style={{ marginTop: "15px" }}>
            These neurons signal the release of GnRH and LH, telling your ovaries to produce Estrogen and Progesterone. But here is the real kicker: those ovarian hormones travel right back up through the bloodstream, cross the blood-brain barrier, and completely alter your <strong>Cerebrospinal Fluid (CSF) neurochemistry</strong>. 
          </p>
          <p style={{ marginTop: "15px" }}>
            When estrogen or progesterone drop abruptly right before your period, it triggers an immediate downstream drop in your brain's <strong>Dopamine and Serotonin (5-HT)</strong> levels, while radically modifying how your inhibitory <strong>GABA pathways</strong> fire. You aren't imagining the anxiety or the dark mood shifts—it is a literal biochemical feedback loop altering your brain architecture in real-time.
          </p>
        </div>
        
        {/* DIAGRAM EMBEDDED SAFELY */}
        <div className="diagram-container mechanical-spec">
          <img 
            src={hpoAxisChart} 
            alt="Hypothalamic-Pituitary-Ovarian Axis Feedback Loop" 
            className="integrated-science-image" 
          />
          <div className="diagram-caption">
            Figure 1.2: Deep-dive cellular mapping of the HPO feedback system and hormone-induced neurotransmitter depletion.
          </div>
        </div>
      </div>

      {/* NEURO-TRANSMITTER DEEP DIVES */}
      <div className="mh-card">
        <h2>The Molecular Culprits Behind Pre-Period Drama</h2>
        <p style={{color: '#9ca3af', marginBottom: '25px'}}>The science behind why your thoughts can feel hijacked during the late luteal drop:</p>
        
        <div className="insights-heavy-stack">
          {clinicalInsights.map((insight, idx) => (
            <div key={idx} className="heavy-insight-card">
              <h3>{insight.title}</h3>
              <p className="mechanism-text"><strong>Cellular Pathway:</strong> {insight.mechanism}</p>
              <div className="layman-takeaway">
                <strong>What this actually means:</strong> {insight.takeaway}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CYCLE PHASES VIBE INTERACTIVE */}
      <div className="mh-card">
        <h2>Neurochemical Phase Matrix</h2>
        <p style={{color: '#9ca3af', marginBottom: '30px'}}>Select your current cycle phase to analyze your brain's active operating system parameters:</p>

        <div className="tab-navigation-bar">
          <button 
            className={`tab-toggle-btn ${activeVibe === "follicular" ? "active-tab-node" : ""}`} 
            onClick={() => setActiveVibe("follicular")}
          >
            Follicular (Weeks 1 & 2)
          </button>
          <button 
            className={`tab-toggle-btn ${activeVibe === "luteal" ? "active-tab-node" : ""}`} 
            onClick={() => setActiveVibe("luteal")}
          >
            Luteal (Weeks 3 & 4)
          </button>
        </div>

        <div className="tab-content-display phase-box-theme animate-fade-in">
          <span className="panel-phase-badge">System Status Scanned</span>
          <h3>{phaseVibeCheck[activeVibe].title}</h3>
          <p className="phase-desc"><strong>Neurotransmitter Layout:</strong> {phaseVibeCheck[activeVibe].neurochemistry}</p>
          <p className="phase-desc"><strong>Baseline Layman Status:</strong> {phaseVibeCheck[activeVibe].vibeStatus}</p>
          
          <div className="cellular-box strategic-accent">
            <strong>Optimal Action Protocol:</strong> {phaseVibeCheck[activeVibe].strategy}
          </div>
        </div>
      </div>

      {/* BRAIN CHEMICAL SCANNER INPUT */}
      <div className="mh-card">
        <h2>Real-Time Neurochemical Decoder</h2>
        <p style={{color: '#9ca3af', marginBottom: '20px'}}>
          Type a quick description of exactly how your mood or brain feels right now (e.g., \"I feel so sad and foggy for no reason\" or \"I want to snap at everyone\"):
        </p>

        <div className="calculator-interface-row">
          <input
            type="text"
            className="metabolic-input text-input-override"
            placeholder="Type your current brain state here..."
            value={symptomInput}
            onChange={(e) => setSymptomInput(e.target.value)}
          />
          <button className="primary-btn mh-btn-color" onClick={runNeuroCheck}>
            Decode Brain Chemistry
          </button>
        </div>

        {neuroAnalysis && (
          <div className={`tip-box entry-code-${neuroAnalysis.code} animate-fade-in`}>
            <h3 style={{marginTop: 0}}>{neuroAnalysis.status}</h3>
            <p style={{margin: 0, color: '#e5e7eb', lineHeight: '1.6'}}>{neuroAnalysis.explanation}</p>
          </div>
        )}
      </div>

      {/* CYCLICAL MENTAL RESILIENCE SCREENER */}
      <div className="mh-card">
        <h2>Cyclical Amygdala Reactivity Screener</h2>
        <blockquote className="medical-disclaimer brain-theme">
          <strong>Biomedical Framework:</strong> This tool gauges your current central nervous system vulnerability to cyclical hormone shifts based on sleep quality and amygdala trigger responses.
        </blockquote>

        <div className="pcos-interactive-form">
          <div className="quiz-card">
            <h3>1. What has your sleep health looked like over the past 48 hours?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${trackerSurvey.sleep === "poor" ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, sleep: "poor"})}>Disrupted / Tossing & turning / Hard to fall asleep / Waking up exhausted</button>
              <button className={`quiz-btn ${trackerSurvey.sleep === "good" ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, sleep: "good"})}>Deep / Restful / Solid 8-hour recovery cycle</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>2. Are minor annoyances triggers making you want to absolute drop-kick a wall?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${trackerSurvey.irritability === true ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, irritability: true})}>Yes: Baseline patience is completely at zero right now</button>
              <button className={`quiz-btn ${trackerSurvey.irritability === false ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, irritability: false})}>No: Feeling cool, collected, and ready to brush off minor drama</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>3. Are you experiencing a phantom creeping anxiety or a feeling of dread?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${trackerSurvey.anxiety === true ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, anxiety: true})}>Yes: Heart is racing a bit, feel safe but high-key edgy for no reason</button>
              <button className={`quiz-btn ${trackerSurvey.anxiety === false ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, anxiety: false})}>No: Mind feels grounded and steady</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>4. Where are you tracking relative to your expected period onset?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${trackerSurvey.cycleDay === "late" ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, cycleDay: "late"})}>Pre-Period Window: It's coming up in about 1 to 7 days</button>
              <button className={`quiz-btn ${trackerSurvey.cycleDay === "mid" ? "active-choice" : ""}`} onClick={() => setTrackerSurvey({...trackerSurvey, cycleDay: "mid"})}>Clear: My period just ended or I am right in the middle of my cycle</button>
            </div>
          </div>

          <div className="action-btn-group">
            <button className="primary-btn mh-btn-color" onClick={processBrainTracker} disabled={trackerSurvey.sleep === ""}>
              Scan Amygdala Armor Status
            </button>
          </div>

          {trackerResult && (
            <div className="tip-box text-left" style={{borderLeftColor: trackerResult.color}}>
              <h3 style={{marginTop: 0, color: trackerResult.color}}>{trackerResult.tier}</h3>
              <p style={{color: '#f3f1f5', margin: 0, lineHeight: '1.6'}}>{trackerResult.feedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MentalHealth;