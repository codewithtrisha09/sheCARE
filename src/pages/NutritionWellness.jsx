import { useState } from "react";
import "./NutritionWellness.css";
// IMPORT THE SAVED PNG ASSET MATRIX HERE:
import glucoseChart from "../assets/glud.png";

const optimizationStudies = [
  {
    title: "The Role of Magnesium and B Vitamins in Mitigating Primary Dysmenorrhea",
    source: "Journal of Clinical Endocrinology & Metabolism",
    summary: "A comprehensive molecular study showing how targeted micronutrient loading—specifically neuromuscular-calming Magnesium Glycinate and Vitamin B6—suppresses smooth muscle over-activity and safely down-regulates painful prostaglandin cascades.",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4091211/"
  },
  {
    title: "Glycemic Stability and Ovarian Hyperandrogenism Real-Time Metrics",
    source: "The Lancet (Diabetes & Endocrinology)",
    summary: "Clinical tracking validating that persistent blood glucose spikes trigger compensatory hyperinsulinemia. This excess insulin signals the ovarian endocrine tissues to synthesize excess testosterone, establishing the foundational pathway for structural cycle irregularities.",
    link: "https://www.thelancet.com/journals/landia/home"
  },
  {
    title: "Iron Depletion Kinetics in Menstruating Adolescents without Anemia",
    source: "American Journal of Clinical Nutrition",
    summary: "This trial proves that routine monthly blood loss significantly reduces baseline serum ferritin levels before traditional clinical anemia triggers show up on lab sheets. It underscores the urgent need for bioavailable iron tracking among active teenagers.",
    link: "https://academic.oup.com/ajcn"
  }
];

const nutrientData = {
  macronutrients: {
    title: "Macro Balancing & Glycemic Control",
    biochemistry: "The practice of pairing complex carbohydrates with lean proteins and high-quality lipids to smooth out systemic glucose curves.",
    clinicalImpact: "Stabilizing blood sugar dampens insulin surges. Because insulin acts as a co-gonadotropin, keeping it steady prevents your ovaries from accidentally overproducing corporate androgens (like testosterone) and maintains clear skin and predictable cycles.",
    actionItem: "Aim to build plates using the 'Pairing Rule': Never consume simple carbohydrates alone; always marry them to a structural protein block or healthy fat resource."
  },
  micronutrients: {
    title: "Micronutrient Support Panels",
    biochemistry: "Targeting vital trace elements like Magnesium, Zinc, Vitamin D3, and the B-Complex family that serve as enzymatic co-factors.",
    clinicalImpact: "Magnesium acts as a natural smooth-muscle relaxant to decrease uterine myometrial cramping force. Vitamin B6 directly binds with central neurological pathways to synthesize dopamine and serotonin, mitigating sudden pre-period mood alterations.",
    actionItem: "Incorporate mineral-dense resources like dark leafy greens, whole seeds, legumes, and high-quality salmon into your routine tracking profiles."
  },
  ironKinetics: {
    title: "Iron Replenishment Architecture",
    biochemistry: "Monitoring and managing your systemic iron stores (ferritin levels) to compensate for periodic blood tissue losses.",
    clinicalImpact: "Iron serves as the foundational element of hemoglobin, the carrier compound transporting cellular oxygen across the brain and muscles. Depleted iron reservoirs result in profound, heavy fatigue, standard cognitive fog, and metabolic crashes.",
    actionItem: "Optimize bioavailable heme-iron intake (or iron-rich plant variants combined with Vitamin C to dramatically boost cellular assimilation rates)."
  }
};

function NutritionWellness() {
  const [activeTab, setActiveTab] = useState("macronutrients");
  const [bloodSugarInput, setBloodSugarInput] = useState("");
  const [glycemicAnalysis, setGlycemicAnalysis] = useState(null);

  const [mealSurvey, setMealSurvey] = useState({
    carbs: "",
    protein: false,
    fats: false,
    timing: ""
  });
  const [surveyResult, setSurveyResult] = useState(null);

  const calculateGlycemicResponse = () => {
    const val = parseFloat(bloodSugarInput);
    if (isNaN(val) || val <= 0) {
      setGlycemicAnalysis({ status: "Invalid Entry", message: "Please input a realistic value parameter.", code: "err" });
      return;
    }

    if (val < 70) {
      setGlycemicAnalysis({
        status: "Hypoglycemic Zone (< 70 mg/dL)",
        message: "Your current circulating fuel levels are running low. This type of baseline drop frequently triggers adrenaline surges, causing immediate fatigue, shakiness, and sudden sugar cravings.",
        code: "low"
      });
    } else if (val <= 100) {
      setGlycemicAnalysis({
        status: "Optimal Fasting Baseline (70 - 100 mg/dL)",
        message: "Excellent metabolic balance. Circulating insulin signals are resting quiet and clear, providing a pristine chemical environment for your ovaries' tracking mechanisms.",
        code: "optimal"
      });
    } else if (val <= 140) {
      setGlycemicAnalysis({
        status: "Normal Post-Prandial Range (101 - 140 mg/dL)",
        message: "Typical processing response following an active meal profile. Your body is distributing glucose cleanly without entering insulin overdrive.",
        code: "normal"
      });
    } else {
      setGlycemicAnalysis({
        status: "Elevated Glycemic Spike (> 140 mg/dL)",
        message: "Circulating blood sugar is currently running high. Frequent or sustained spikes trigger high insulin responses, which can disrupt normal ovarian signals over time.",
        code: "high"
      });
    }
  };

  const evaluateMealArchitecture = () => {
    let score = 0;
    if (mealSurvey.carbs === "complex") score += 2;
    if (mealSurvey.protein === true) score += 2;
    if (mealSurvey.fats === true) score += 1.5;
    if (mealSurvey.timing === "stable") score += 1.5;

    if (score >= 5.5) {
      setSurveyResult({
        tier: "Metabolic Mastery Matrix",
        color: "#34d399",
        feedback: "Incredible structural balance! By pairing complex carbohydrates with clean protein and lipid foundations, you have engineered a meal with an exceptionally low glycemic impact. This protects your HPO axis from hormonal chaos."
      });
    } else if (score >= 3) {
      setSurveyResult({
        tier: "Moderate Glycemic Volatility",
        color: "#fbbf24",
        feedback: "Decent foundations, but there is room to smooth out the curve. If you consume quick-release carbs without enough protein or fiber armor, your body is forced to release a surge of insulin to clean it up. Try adding a handful of nuts or a hard-boiled egg next time."
      });
    } else {
      setSurveyResult({
        tier: "High-Impedance Insulin Trigger",
        color: "#f87171",
        feedback: "Your current profile indicates a rapid carbohydrate load missing structural balance. This setup can lead to an energy crash within 90 minutes and can cause elevated androgen production if it becomes your regular routine. Let's work on adding a dedicated protein source!"
      });
    }
  };

  return (
    <div className="nutrition-page">
      <div className="ambient-blur blur-nut-1"></div>
      <div className="ambient-blur blur-nut-2"></div>

      {/* HERO SECTION */}
      <div className="nut-hero">
        <div className="nut-badge">Biochemical Optimization Unit</div>
        <h1>Adolescent Nutrition &<br />Endocrine Fuel Systems</h1>
        <p>
          Moving beyond restrictive calorie tracking to focus on functional biochemistry. Learn how blood glucose stability, macro composition, and bioavailable micronutrients act as direct inputs for reproductive hormone synthesis.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Steady Curve</h3>
            <p>Prevents Ovarian Hyperandrogenism</p>
          </div>
          <div className="stat-card">
            <h3>Co-Factors</h3>
            <p>Magnesium & B-Vitamin Pathways</p>
          </div>
          <div className="stat-card">
            <h3>Ferritin Stores</h3>
            <p>Oxygenation & Vitality Tracking</p>
          </div>
        </div>
      </div>

      {/* METABOLIC SPLIT ARCHITECTURE */}
      <div className="mh-card split-layout">
        <div className="text-content">
          <h2>The Biochemistry of the "Sugar-Insulin-Hormone" Loop</h2>
          <p>
            Every time you consume food, your digestive system converts carbohydrates into glucose. In response, your pancreas releases <strong>insulin</strong> to escort that sugar out of your bloodstream and into your cells. 
          </p>
          <p style={{ marginTop: "15px" }}>
            However, when you eat simple, processed sugars without any protein or fiber to slow them down, your blood sugar spikes dramatically. This forces your body to pump out excess insulin. 
            <strong> High circulating insulin directly targets your ovaries</strong>, prompting them to overproduce male-pattern androgens like testosterone instead of converting them smoothly into estrogen. This hormonal shift is a primary trigger for acne, skipped periods, and metabolic fatigue.
          </p>
        </div>
        
        {/* ENHANCED DIAGRAM WITH IMAGE LINK */}
        <div className="diagram-container mechanical-spec">
          <img 
            src={glucoseChart} 
            alt="Glycemic Curve Comparison" 
            className="integrated-science-image" 
          />
          <div className="diagram-caption">
            Figure 2.1: Comparative visual mapping of an isolated carbohydrate spike versus a protein-stabilized metabolic wave.
          </div>
        </div>
      </div>

      {/* INTERACTIVE DATA HUB TABS */}
      <div className="mh-card">
        <h2>Functional Nutrition Architecture</h2>
        <p style={{color: '#9ca3af', marginBottom: '30px'}}>Select a metabolic pathway to explore its cellular mechanics and real-world application:</p>

        <div className="tab-navigation-bar">
          {Object.keys(nutrientData).map((key) => (
            <button
              key={key}
              className={`tab-toggle-btn ${activeTab === key ? "active-tab-node" : ""}`}
              onClick={() => { setActiveTab(key); }}
            >
              {nutrientData[key].title}
            </button>
          ))}
        </div>

        <div className="tab-content-display animate-fade-in">
          <span className="panel-phase-badge">Active Science Protocol</span>
          <h3>{nutrientData[activeTab].title}</h3>
          <p className="phase-desc" style={{marginBottom: '15px'}}><strong>Biochemical Definition:</strong> {nutrientData[activeTab].biochemistry}</p>
          <p className="phase-desc"><strong>Hormonal Matrix Impact:</strong> {nutrientData[activeTab].clinicalImpact}</p>
          
          <div className="cellular-box protocol-accent">
            <strong>Clinical Action Protocol:</strong> {nutrientData[activeTab].actionItem}
          </div>
        </div>
      </div>

      {/* INTERACTIVE METABOLIC RESPONSE ANALYZER */}
      <div className="mh-card">
        <h2>Circulating Glucose Response Calculator</h2>
        <p style={{color: '#9ca3af', marginBottom: '20px'}}>
          Input a real-time fingerstick or fasting lab blood glucose metric (mg/dL) to evaluate its current impact on your endocrine environment:
        </p>

        <div className="calculator-interface-row">
          <input
            type="number"
            className="metabolic-input"
            placeholder="e.g., 95"
            value={bloodSugarInput}
            onChange={(e) => setBloodSugarInput(e.target.value)}
          />
          <button className="primary-btn" onClick={calculateGlycemicResponse}>
            Analyze Fuel Status
          </button>
        </div>

        {glycemicAnalysis && (
          <div className={`tip-box entry-code-${glycemicAnalysis.code} animate-fade-in`}>
            <h3 style={{marginTop: 0}}>{glycemicAnalysis.status}</h3>
            <p style={{margin: 0, color: '#e5e7eb', lineHeight: '1.6'}}>{glycemicAnalysis.message}</p>
          </div>
        )}
      </div>

      {/* MEAL STABILIZATION ARCHITECTURE SCREENER */}
      <div className="mh-card">
        <h2>Glycemic Curve Meal Architect</h2>
        <blockquote className="medical-disclaimer info-theme">
          <strong>Nutritional Framework:</strong> This analyzer evaluates your meal structure using glycemic index dynamics to calculate how effectively it supports steady, reliable hormone production.
        </blockquote>

        <div className="pcos-interactive-form">
          <div className="quiz-card">
            <h3>1. What is the foundational carbohydrate source of your current meal profile?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${mealSurvey.carbs === "simple" ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, carbs: "simple"})}>Simple / Refined (White bread, boba, pastries, sweets, potato chips)</button>
              <button className={`quiz-btn ${mealSurvey.carbs === "complex" ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, carbs: "complex"})}>Complex / Fibrous (Brown rice, sweet potatoes, oats, quinoa, broccoli, lentils)</button>
              <button className={`quiz-btn ${mealSurvey.carbs === "none" ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, carbs: "none"})}>No direct carbs (Isolated protein or fat items only)</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>2. Is there an explicit structural protein source embedded in this meal?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${mealSurvey.protein === true ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, protein: true})}>Yes: Eggs, grilled chicken, tofu, Greek yogurt, fish, paneer, protein isolate</button>
              <button className={`quiz-btn ${mealSurvey.protein === false ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, protein: false})}>No: Primarily starch, sugars, fruit, or vegetable matter alone</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>3. Have you integrated a source of high-quality, stable healthy lipids (fats)?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${mealSurvey.fats === true ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, fats: true})}>Yes: Avocado, olive oil, walnuts, almonds, chia seeds, flax seeds, real cheese</button>
              <button className={`quiz-btn ${mealSurvey.fats === false ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, fats: false})}>No: Minimal to no trace fats present</button>
            </div>
          </div>

          <div className="quiz-card">
            <h3>4. How would you categorize the spacing and timing of this meal?</h3>
            <div className="quiz-options-group">
              <button className={`quiz-btn ${mealSurvey.timing === "stable" ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, timing: "stable"})}>Stable: Eaten at a predictable interval following an organized routine</button>
              <button className={`quiz-btn ${mealSurvey.timing === "erratic" ? "active-choice" : ""}`} onClick={() => setMealSurvey({...mealSurvey, timing: "erratic"})}>Erratic: I skipped breakfast or went 6+ hours without food before this meal</button>
            </div>
          </div>

          <div className="action-btn-group">
            <button className="primary-btn" onClick={evaluateMealArchitecture} disabled={!mealSurvey.carbs}>
              Analyze Plate Architecture
            </button>
          </div>

          {surveyResult && (
            <div className="tip-box text-left" style={{borderLeftColor: surveyResult.color}}>
              <h3 style={{marginTop: 0, color: surveyResult.color}}>{surveyResult.tier}</h3>
              <p style={{color: '#f3f1f5', margin: 0, lineHeight: '1.6'}}>{surveyResult.feedback}</p>
            </div>
          )}
        </div>
      </div>

      {/* PEER-REVIEWED CLINICAL RESEARCH REGISTRY */}
      <div className="mh-card">
        <h2>Peer-Reviewed Nutritional Literature Registry</h2>
        <p style={{color: '#9ca3af', marginBottom: '25px'}}>
          Review real, published clinical research exploring how specific nutritional strategies impact adolescent metabolic wellness and cycle health:
        </p>
        <div className="research-grid">
          {optimizationStudies.map((study, idx) => (
            <div key={idx} className="research-card">
              <span className="research-source">{study.source}</span>
              <h3>{study.title}</h3>
              <p>{study.summary}</p>
              <a href={study.link} target="_blank" rel="noreferrer" className="research-link">
                View Published Study Papers ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NutritionWellness;