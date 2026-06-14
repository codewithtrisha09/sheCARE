import { useState } from "react";
import "./DiagnosisScreener.css";

function DiagnosisScreener() {
  // ADVANCED BIOMETRIC & DIAGNOSTIC PHENOTYPE STATE
  const [biometrics, setBiometrics] = useState({
    weight: "",
    height: "",
    cycleLength: "normal", // normal (21-35 days), irregular (>35 or skipped)
    hyperAndrogenism: false, // hirsutism, cystic acne, male-pattern hair thinning
    pmddCoreSymptoms: false, // extreme mood swings, hopelessness, rage
    metabolicFatigue: false  // insulin resistance signs, intense sugar crashes
  });

  const [clinicalAssessment, setClinicalAssessment] = useState(null);

  // MULTI-SYSTEM PHENOTYPIC ASSESSMENT ENGINE
  const calculatePhenotypes = (e) => {
    e.preventDefault();
    
    const w = parseFloat(biometrics.weight);
    const h = parseFloat(biometrics.height) / 100; // convert cm to meters
    
    if (!w || !h || h <= 0) {
      alert("Please enter valid weight and height metrics for metabolic assessment.");
      return;
    }

    // Calculate BMI
    const bmi = parseFloat((w / (h * h)).toFixed(1));

    // 1. PCOS/PCOD Risk Engine (Based on Modified Rotterdam Criteria Guidelines)
    let pcosScore = 0;
    if (biometrics.cycleLength === "irregular") pcosScore += 40; // Ovulatory Dysfunction
    if (biometrics.hyperAndrogenism) pcosScore += 35;          // Hyperandrogenism
    if (biometrics.metabolicFatigue) pcosScore += 15;          // Metabolic Insulin Resistance link
    if (bmi >= 25) pcosScore += 10;                            // Adipose tissue endocrine amplification

    // 2. PMDD Risk Engine (Based on DSM-5 Criteria Diagnostic Outlines)
    let pmddScore = 0;
    if (biometrics.pmddCoreSymptoms) pmddScore += 60;
    if (biometrics.cycleLength === "normal") pmddScore += 20; 
    if (biometrics.metabolicFatigue) pmddScore += 20;

    // Generate Clinical Classifications
    let pcosTier = "Low Risk Baseline";
    let pcosColor = "#34d399";
    if (pcosScore >= 75) { pcosTier = "High Probability (Rotterdam Phenotype Match)"; pcosColor = "#f87171"; }
    else if (pcosScore >= 40) { pcosTier = "Moderate Risk (Endocrine Imbalance Detected)"; pcosColor = "#fbbf24"; }

    let pmddTier = "Low Cyclical Distress";
    let pmddColor = "#34d399";
    if (pmddScore >= 80) { pmddTier = "High Probability (Severe Luteal Neuro-Sensitivity / PMDD)"; pmddColor = "#ec4899"; }
    else if (pmddScore >= 40) { pmddTier = "Moderate Premenstrual Exacerbation (PME) Risk"; pmddColor = "#a78bfa"; }

    setClinicalAssessment({
      bmi,
      pcosScore,
      pcosTier,
      pcosColor,
      pmddScore,
      pmddTier,
      pmddColor
    });
  };

  return (
    <div className="diagnostic-screener-page">
      <div className="ambient-blur blur-ds-1"></div>
      <div className="ambient-blur blur-ds-2"></div>

      <div className="ds-card">
        <h2>Cross-System Phenotypic Assessment Tool</h2>
        <blockquote className="medical-disclaimer diagnostic-theme">
          <strong>Biomedical Framework Engine:</strong> This advanced module maps clinical correlation parameters across metabolic indices ($BMI$), peripheral androgen features, and neurosteroid vulnerabilities to evaluate risk thresholds for **PCOS/PCOD** and **PMDD/PME**.
        </blockquote>

        <form onSubmit={calculatePhenotypes} className="pcos-interactive-form">
          
          {/* BIOMETRIC INPUTS SECTION */}
          <div className="biometrics-row-inputs">
            <div className="input-field-block">
              <label>Body Mass (kg)</label>
              <input 
                type="number" 
                placeholder="e.g. 68" 
                className="metabolic-input text-input-override"
                value={biometrics.weight}
                onChange={(e) => setBiometrics({...biometrics, weight: e.target.value})}
                required
              />
            </div>
            <div className="input-field-block">
              <label>Stature Height (cm)</label>
              <input 
                type="number" 
                placeholder="e.g. 165" 
                className="metabolic-input text-input-override"
                value={biometrics.height}
                onChange={(e) => setBiometrics({...biometrics, height: e.target.value})}
                required
              />
            </div>
          </div>

          {/* SYSTEM PHENOTYPE SYMPTOM CHECKS */}
          <div className="quiz-card">
            <h3>1. Menstrual Cycle Architecture & Longevity</h3>
            <p className="field-subtext">Is your cycle regular, long/absent, or highly clipped?</p>
            <div className="quiz-options-group">
              <button 
                type="button"
                className={`quiz-btn ${biometrics.cycleLength === "normal" ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, cycleLength: "normal"})}
              >
                Regular & Eumenorrheic (21-35 days)
              </button>
              <button 
                type="button"
                className={`quiz-btn ${biometrics.cycleLength === "irregular" ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, cycleLength: "irregular"})}
              >
                Oligomenorrheic / Irregular (&gt;35 days or skipped months)
              </button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>2. Androgen / Cutaneous Markers</h3>
            <p className="field-subtext">Are you dealing with chronic cystic acne flare-ups along the jawline, unexpected facial hair growth (hirsutism), or noticeable hair thinning?</p>
            <div className="quiz-options-group">
              <button 
                type="button"
                className={`quiz-btn ${biometrics.hyperAndrogenism === true ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, hyperAndrogenism: true})}
              >
                Yes, experiencing active clinical markers of androgen elevations
              </button>
              <button 
                type="button"
                className={`quiz-btn ${biometrics.hyperAndrogenism === false ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, hyperAndrogenism: false})}
              >
                No, skin health and hair distribution parameters are normal
              </button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>3. Late-Luteal Severe Mood Disturbances</h3>
            <p className="field-subtext">Do you experience severe emotional crashes, complete hopelessness, intense rage, or panic states that totally vanish within 1-2 days after your bleeding starts?</p>
            <div className="quiz-options-group">
              <button 
                type="button"
                className={`quiz-btn ${biometrics.pmddCoreSymptoms === true ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, pmddCoreSymptoms: true})}
              >
                Yes, cyclical mental crashes disrupt work and relationship structures
              </button>
              <button 
                type="button"
                className={`quiz-btn ${biometrics.pmddCoreSymptoms === false ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, pmddCoreSymptoms: false})}
              >
                No, pre-period fatigue or light irritability is manageable
              </button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>4. Metabolic Resistance Indicators</h3>
            <p className="field-subtext">Do you struggle with intense lethargy, brain fog after meals, dark velvety skin patches (acanthosis), or sudden midline weight gain despite normal nutrition?</p>
            <div className="quiz-options-group">
              <button 
                type="button"
                className={`quiz-btn ${biometrics.metabolicFatigue === true ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, metabolicFatigue: true})}
              >
                Yes, tracking clear patterns of metabolic insulin crashes
              </button>
              <button 
                type="button"
                className={`quiz-btn ${biometrics.metabolicFatigue === false ? "active-choice" : ""}`} 
                onClick={() => setBiometrics({...biometrics, metabolicFatigue: false})}
              >
                No, metabolic energy distribution parameters remain steady
              </button>
            </div>
          </div>

          <div className="action-btn-group">
            <button type="submit" className="primary-btn ds-btn-color">
              Run Complete Diagnostic Phenotype Scan
            </button>
          </div>
        </form>

        {/* NATIVE INTERACTIVE VISUALIZATION GRAPH MODULE */}
        {clinicalAssessment && (
          <div className="clinical-analytics-dashboard animate-fade-in">
            <h3>Diagnostic Analytics Dashboard</h3>
            <p style={{color: "#9ca3af", fontSize: "0.9rem", marginBottom: "25px"}}>
              Data-visualization mapping cross-system parameters against clinical severity baselines.
            </p>

            <div className="dashboard-charts-layout">
              
              {/* BMI CHART BAR */}
              <div className="metric-chart-block">
                <div className="chart-label-row">
                  <span>Metabolic Index ($BMI$)</span>
                  <span style={{fontWeight: "bold"}}>{clinicalAssessment.bmi} $kg/m^2$</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${Math.min((clinicalAssessment.bmi / 40) * 100, 100)}%`,
                      backgroundColor: clinicalAssessment.bmi >= 25 ? "#fbbf24" : "#34d399"
                    }}
                  ></div>
                </div>
                <div className="chart-legend-row">
                  <span>18.5 Normal</span>
                  <span>25.0 Overweight Threshold</span>
                  <span>30.0+ Obese</span>
                </div>
              </div>

              {/* PCOS RISK BAR */}
              <div className="metric-chart-block">
                <div className="chart-label-row">
                  <span>PCOS / PCOD Endocrine Risk Floor</span>
                  <span style={{color: clinicalAssessment.pcosColor, fontWeight: "bold"}}>{clinicalAssessment.pcosScore}%</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${clinicalAssessment.pcosScore}%`,
                      backgroundColor: clinicalAssessment.pcosColor 
                    }}
                  ></div>
                </div>
                <div className="chart-legend-row">
                  <span>Low Risk (&lt;40%)</span>
                  <span>Moderate Phenotype</span>
                  <span>High Risk Phenotype (&gt;75%)</span>
                </div>
              </div>

              {/* PMDD RISK BAR */}
              <div className="metric-chart-block">
                <div className="chart-label-row">
                  <span>PMDD / Neuro-Sensitivity Index</span>
                  <span style={{color: clinicalAssessment.pmddColor, fontWeight: "bold"}}>{clinicalAssessment.pmddScore}%</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: `${clinicalAssessment.pmddScore}%`,
                      backgroundColor: clinicalAssessment.pmddColor 
                    }}
                  ></div>
                </div>
                <div className="chart-legend-row">
                  <span>Sub-Clinical Baseline</span>
                  <span>PME Overlay Range</span>
                  <span>Severe PMDD Match (&gt;80%)</span>
                </div>
              </div>

            </div>

            {/* SUMMARY CARDS */}
            <div className="clinical-feedback-deck">
              <div className="assessment-card-node" style={{borderLeftColor: clinicalAssessment.pcosColor}}>
                <h4>PCOS/PCOD Clinical Status</h4>
                <p className="assessment-badge-text" style={{color: clinicalAssessment.pcosColor}}>{clinicalAssessment.pcosTier}</p>
                <p className="clinical-narrative-text">
                  {clinicalAssessment.pcosScore >= 75 
                    ? "Your presentation meets the primary markers of the Rotterdam consensus framework. The conjunction of cycle irregularities alongside hyperandrogenic markers indicates high endocrine and ovarian system activity that requires matching clinical tracking and hormone blood screening panels."
                    : clinicalAssessment.pcosScore >= 40
                    ? "Mild endocrine variances detected. Mild tissue resistance or cycle fluctuations point to functional feedback delays in your HPO system, but don't establish a baseline polycystic layout pattern yet."
                    : "No baseline metabolic or cycle tracking metrics point to PCOS/PCOD pathology pathways right now. System homeostasis is well-shielded."}
                </p>
              </div>

              <div className="assessment-card-node" style={{borderLeftColor: clinicalAssessment.pmddColor}}>
                <h4>PMDD/PME Neuro-Sensitivity Status</h4>
                <p className="assessment-badge-text" style={{color: clinicalAssessment.pmddColor}}>{clinicalAssessment.pmddTier}</p>
                <p className="clinical-narrative-text">
                  {clinicalAssessment.pmddScore >= 80 
                    ? "Your symptom profile maps directly to PMDD tracking outlines. This indicates severe structural vulnerability to the post-ovulatory drop in allopregnanolone. Your GABA system functions as a trigger point for nervous system hyper-reactivity rather than a calming anchor during this window."
                    : clinicalAssessment.pmddScore >= 40
                    ? "Tracks close to Premenstrual Exacerbation metrics. Hormonal shifts are amplifying background life stress, fatigue, or mood features rather than initiating a standalone biochemical collapse."
                    : "Standard late-luteal winddown parameters. Brain serotonin processing matches normative physiological fluctuation limits."}
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnosisScreener;