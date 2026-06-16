import "./App.css";
import logo from "./assets/image.png";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MenstrualHealth from "./pages/MenstrualHealth";
import NutritionWellness from "./pages/NutritionWellness";
import MentalHealth from "./pages/MentalHealth";
import DiagnosisScreener from "./pages/DiagnosisScreener";
import PhysicalHealth from "./pages/PhysicalHealth";
import PersonalHygiene from "./pages/PersonalHygiene";
import MythVsFact from "./pages/MythVsFact";
function HomePage() {
  return (
    <div className="app-viewport">
      {/* GLOBAL BACKGROUND SHAPES */}
      <div className="ambient-blur blur-pink"></div>
      <div className="ambient-blur blur-purple"></div>

      {/* TOP NAVIGATION ARCHITECTURE */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="SheCARE Logo" className="logo" />
          <h2>SheCARE</h2>
        </div>

        <ul className="nav-links">
          <li><Link to="/" className="active-nav">Home</Link></li>
          <li><Link to="/menstrual-health">Menstrual Health</Link></li>
          <li><Link to="/nutrition-wellness">Nutrition & Fuel</Link></li>
          <li><Link to="/mental-health">Mind & Neuro</Link></li>
          <li><a href="#topics-explore">Health Topics</a></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <div className="announcement-badge">
          <span>Evidence-Based Adolescent Health Education Platform // Vibe Certified</span>
        </div>
        <h1>
          Empowering Teen Girls With<br />
          <span className="brand-gradient">Absolute No-Cap Science</span>
        </h1>

        <p>
          We are completely binning the toxic medical jargon and old cultural stigmas. Welcome to a safe, tech-forward space engineered for teenagers to completely unlock how menstrual cycles, brain chemistry, and metabolic metrics actually run your internal operating system.
        </p>

        <div className="hero-buttons">
          <a href="#topics-explore" className="primary-btn-link">Explore Systems</a>
          <a href="#about-section" className="secondary-btn-link">Our Manifesto</a>
        </div>
      </header>

      {/* HIGH-IMPACT METRICS GRID */}
      <section className="features-preview">
        <div className="preview-card">
          <div className="icon-dot-purple"></div>
          <h3>Period Architecture</h3>
          <p>Deconstruct reproductive loops and cycle biology with elite clinical accuracy.</p>
        </div>

        <div className="preview-card">
          <div className="icon-dot-pink"></div>
          <h3>Myth Busting</h3>
          <p>Exposing ancient, unscientific historical narratives with real laboratory receipts.</p>
        </div>

        <div className="preview-card">
          <div className="icon-dot-blue"></div>
          <h3>Neuro-Wellness</h3>
          <p>Navigate amygdala stress thresholds, neurotransmitter dips, and mental armor codes.</p>
        </div>
      </section>

      {/* MISSION STRATIFICATION STATEMENT */}
      <section id="about-section" className="about">
        <span className="section-tag">The Main Mission</span>
        <h2>Why SheCARE hits different?</h2>
        <p>
          Adolescence forces your body through hyper-speed hormonal updates. Traditional health classes are stiff and gatekept. SheCARE translates high-level clinical biochemistry into intuitive, interactive code architectures so you can finally master your own biological data.
        </p>
      </section>

      {/* INTERACTIVE MODULE HUB */}
      <section id="topics-explore" className="topics-section">
        <h2 className="section-title">Explore Specialized Modules</h2>
        <p className="section-subtitle">Click into any unlocked framework below to patch your internal wellness protocol.</p>

        <div className="topics-grid">
          {/* MODULE 1: MENSTRUAL HEALTH */}
          <Link to="/menstrual-health" className="topic-card-wrapper">
            <div className="interactive-card core-highlight">
              <div className="card-badge-hot">Core System Unlocked</div>
              <h3>Menstrual Health</h3>
              <p>
                Analyze chemical endocrine phases, track cycle lengths, explore symptom physiology pathways, 
                and launch custom PCOS evaluation profiles.
              </p>
              <span className="card-action-trigger">Launch Application Engine →</span>
            </div>
          </Link>

          {/* MODULE 2: NUTRITION & WELLNESS */}
          <Link to="/nutrition-wellness" className="topic-card-wrapper">
            <div className="interactive-card nutrition-highlight">
              <div className="card-badge-hot nutrition-badge">Fuel Module Unlocked</div>
              <h3>Nutrition & Wellness</h3>
              <p>
                Understand macro balancing, carbohydrate armor, and how to stabilize your real-time blood sugar metrics to prevent testosterone and insulin spikes.
              </p>
              <span className="card-action-trigger nutrition-trigger">Launch Fuel Engine →</span>
            </div>
          </Link>

          {/* MODULE 3: MENTAL HEALTH (NOW COMPLETELY UNLOCKED!) */}
          <Link to="/mental-health" className="topic-card-wrapper">
            <div className="interactive-card mental-highlight">
              <div className="card-badge-hot mental-badge">Neuro Module Unlocked</div>
              <h3>Mental Health & Neuro</h3>
              <p>
                Map the HPO Axis feedback loop. See how pre-period estrogen and progesterone crashes cause real-time serotonin deficits and amygdala reactivity.
              </p>
              <span className="card-action-trigger mental-trigger">Launch Brain Matrix →</span>
            </div>
          </Link>

          {/* MODULE 4: PHYSICAL HEALTH (LOCKED) */}
          
<Link to="/physical-health" className="topic-card-wrapper">
  <div className="interactive-card physical-highlight">
    <div className="card-badge-hot physical-badge">Movement Module Unlocked</div>
    <h3>Physical Health & Movement</h3>
    <p>
      Master cycle-synced workouts, sleep architecture, and energy recovery protocols. 
      Learn when to push hard and when to rest strategically.
    </p>
    <span className="card-action-trigger physical-trigger">Launch Movement Engine →</span>
  </div>
</Link>
          

          {/* MODULE 5: MYTHS VS FACTS (LOCKED) */}
          <Link to="/myth-vs-fact" className="topic-card-wrapper">
  <div className="interactive-card myth-highlight">
    <div className="card-badge-hot myth-badge">
      Truth Module Unlocked
    </div>

    <h3>Myths vs Facts</h3>

    <p>
      Separate scientific reality from cultural myths.
      Learn evidence-based facts about periods, fertility,
      nutrition, hormones, and adolescent health.
    </p>

    <span className="card-action-trigger myth-trigger">
      Launch Truth Engine →
    </span>
  </div>
</Link>

          {/* MODULE 6: PERSONAL HYGIENE (LOCKED) */}
          <Link to="/personal-hygiene" className="topic-card-wrapper">
  <div className="interactive-card hygiene-highlight">
    <div className="card-badge-hot hygiene-badge">
      Hygiene Module Unlocked
    </div>

    <h3>Personal Hygiene</h3>

    <p>
      Learn daily hygiene habits, skincare basics, body care,
      oral health, hair care, acne management, and safe self-care
      routines designed specifically for teenagers.
    </p>

    <span className="card-action-trigger hygiene-trigger">
      Launch Hygiene Hub →
    </span>
  </div>
</Link>
        </div>
      </section>

      {/* UTILITY TILES */}
      <section className="utility-split-grid">
        <div className="utility-panel">
          <h2>Cycle Analysis & Tracking</h2>
          <p>Log period timing, record symptom clusters, and notice changes in your metabolic baseline over time.</p>
          <Link to="/diagnosis-screener" className="panel-btn">Initialize Tracker</Link>
        </div>

        <div className="utility-panel">
          <h2>Interactive Recall Modules</h2>
          <p>Challenge yourself on biological terms, testing your grasp of hormones, receptors, and ovarian systems.</p>
          <button className="panel-btn-alt">Take System Test</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 SheCARE Bio-Education Ecosystem. All Rights Reserved.</p>
          <p className="credits">Curated & Assembled by <strong>Trisha Shetty</strong> • MIT, Manipal</p>
        </div>
      </footer>
    </div>
  );
}

// ROUTER CONTROLLER COMPONENT
function App() {
  const location = useLocation();

  // Scroll to top automatically when navigating to clean up layout jumps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menstrual-health" element={<MenstrualHealth />} />
      <Route path="/nutrition-wellness" element={<NutritionWellness />} />
      <Route path="/mental-health" element={<MentalHealth />} />
      <Route path="/diagnosis-screener" element={<DiagnosisScreener />} />
      <Route path="/physical-health" element={<PhysicalHealth/>}/>
      <Route path="/myth-vs-fact" element={<MythVsFact />} />
      <Route path="/personal-hygiene" element={<PersonalHygiene />} />
    </Routes>
  );
}

export default App;