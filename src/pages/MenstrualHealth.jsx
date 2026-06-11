import { useState } from "react";
import "./MenstrualHealth.css";
import hpoAxisImg from "../assets/hpo.png";

const quizQuestions = [
  {
    question: "Which hormone surges sharply to trigger the release of an egg (ovulation)?",
    options: ["Estrogen", "Luteinizing Hormone (LH)", "Progesterone", "Follicle-Stimulating Hormone (FSH)"],
    answer: "Luteinizing Hormone (LH)",
  },
  {
    question: "During which phase does the uterine lining (endometrium) thicken to prepare for a potential pregnancy?",
    options: ["Menstrual Phase", "Follicular/Proliferative Phase", "Luteal Phase", "Ovulatory Phase"],
    answer: "Follicular/Proliferative Phase",
  },
  {
    question: "What structure forms from the ruptured follicle after ovulation and secretes progesterone?",
    options: ["Corpus Luteum", "Graafian Follicle", "Endometrium", "Anterior Pituitary"],
    answer: "Corpus Luteum",
  }
];

const biologicalPhases = {
  menstruation: {
    title: "Menstrual Phase",
    days: "Days 1-5",
    description: "As the previous cycle's corpus luteum degrades, systemic progesterone and estrogen levels drop. This withdrawal of hormonal support causes spiral arteries in the endometrium to constrict, leading to the shedding of the functional endometrial layer.",
    hormoneFocus: "Low Estrogen & Progesterone",
    cellularInsight: "High local concentration of prostaglandins triggers myometrial contractions, assisting in tissue expulsion but causing clinical cramping."
  },
  follicular: {
    title: "Follicular Phase",
    days: "Days 6-13",
    description: "The anterior pituitary secretes Follicle-Stimulating Hormone (FSH), recruiting a cohort of ovarian follicles. As these follicles mature, their granulosa cells produce increasing amounts of estradiol (estrogen), stimulating the endometrium to repair and proliferate.",
    hormoneFocus: "Rising Estradiol (Estrogen)",
    cellularInsight: "Endometrial thickness increases from ~1mm to up to 5mm, creating a highly vascularized environment."
  },
  ovulation: {
    title: "Ovulation Phase",
    days: "Day 14 (Variable)",
    description: "When estradiol levels peak and remain elevated for roughly 50 hours, it triggers a dramatic switch from negative to positive feedback at the pituitary level. This causes a massive surge of Luteinizing Hormone (LH), which dissolves the follicular wall.",
    hormoneFocus: "LH Surge Peak",
    cellularInsight: "The mature oocyte (egg) is actively released from the Graafian follicle into the fallopian tube, remaining viable for 12–24 hours."
  },
  luteal: {
    title: "Luteal Phase",
    days: "Days 15-28",
    description: "The remnants of the ruptured follicle transform into a temporary endocrine gland called the corpus luteum. Driven by LH tracking, it secretes high quantities of progesterone, which remodels the uterine lining into a glandular, secretory structure optimized for embryo implantation.",
    hormoneFocus: "Peak Progesterone",
    cellularInsight: "If fertilization does not occur, the corpus luteum degenerates into the corpus albicans after roughly 14 days, resetting the tracking loop."
  }
};

const clinicalStudies = [
  {
    title: "Adolescent Presentation of PCOS & The Rotterdam Criteria",
    source: "National Institutes of Health (NIH / PMC)",
    summary: "Research shows tracking adolescent PCOS requires nuanced evaluation because features like acne and irregular cycles frequently overlap with normal pubertal delay. Diagnosis emphasizes tracking hyperandrogenism alongside long-term tracking metrics.",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5694200/"
  },
  {
    title: "The Pathophysiology of Primary Dysmenorrhea",
    source: "The Lancet (Endocrinology & Diabetes)",
    summary: "A global analysis validating that severe menstrual pain is directly linked to an overproduction of uterine prostaglandins. It highlights how anti-inflammatory tracking strategies can safely down-regulate these biochemical triggers.",
    link: "https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(23)00247-1/fulltext"
  },
  {
    title: "Adolescent Menstrual Patterns & HPO Axis Maturity",
    source: "American Academy of Pediatrics (AAP)",
    summary: "A landmark study confirming that the Hypothalamic-Pituitary-Ovarian axis takes up to 2-3 years post-menarche to establish regular ovulatory patterns, validating why irregular teenage cycles are biologically common.",
    link: "https://publications.aap.org/pediatrics/article/118/5/2245/69841/Menstruation-in-Girls-and-Adolescents-Using"
  }
];

function MenstrualHealth() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [activeWheelPhase, setActiveWheelPhase] = useState("menstruation");
  
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPcos, setShowPcos] = useState(false);

  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
  
  const [pcosData, setPcosData] = useState({
    cycleLength: "", 
    hyperAndrogenism: null, 
    metabolic: null, 
    acanthosis: null,
    familyHistory: null 
  });
  const [pcosResult, setPcosResult] = useState(null);

  const symptoms = [
    {
      title: "Dysmenorrhea (Cramps)",
      science: "Caused by elevated levels of prostaglandins, which induce myometrial (uterine muscle) contractions to help shed the endometrium.",
    },
    {
      title: "Fluid Retention (Bloating)",
      science: "Fluctuations in progesterone and estrogen alter fluid and electrolyte balance, causing temporary intercellular water retention.",
    },
    {
      title: "Progesterone Fatigue",
      science: "The natural post-ovulatory rise in progesterone acts as a central nervous system depressant, frequently inducing lethargy.",
    },
    {
      title: "Hormonal Migraines",
      science: "Triggered by a precipitous drop in systemic estrogen immediately preceding the initiation of the menstrual phase.",
    },
    {
      title: "Endocrine Acne",
      science: "A relative increase in androgenic activity relative to estrogen stimulates sebaceous glands to overproduce sebum, obstructing pores.",
    },
  ];

  const handleAnswer = (qIndex, selected, correct) => {
    if (answered[qIndex]) return;
    setAnswered({ ...answered, [qIndex]: selected });
    if (selected === correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handlePcosSelect = (field, value) => {
    setPcosData(prev => ({ ...prev, [field]: value }));
  };

  const evaluatePcosRisk = () => {
    let indicators = 0;
    if (pcosData.cycleLength === "irregular" || pcosData.cycleLength === "absent") indicators += 2;
    if (pcosData.hyperAndrogenism === true) indicators += 1.5;
    if (pcosData.metabolic === true) indicators += 1;
    if (pcosData.acanthosis === true) indicators += 1.5;
    if (pcosData.familyHistory === true) indicators += 0.5;

    if (indicators <= 1.5) {
      setPcosResult({
        status: "Low Clinical Correlation",
        message: "Your responses generally point toward normal adolescent hormone fluctuations. It is incredibly common to have unstable cycles during the first few years after your first period as your tracking systems stabilize."
      });
    } else if (indicators <= 3.5) {
      setPcosResult({
        status: "Moderate Clinical Correlation",
        message: "You have selected a few characteristics frequently noted in hormonal transitions. We recommend saving a physical symptoms log for 3 consecutive months to share with a health professional during a routine physical."
      });
    } else {
      setPcosResult({
        status: "High Clinical Correlation — Professional Screening Suggested",
        message: "Your parameters closely match foundational indicators linked with PCOS or PCOD conditions. Please don't stress—this is extremely manageable! We highly recommend showing this screen to a parent or doctor to schedule a simple endocrine panel or check-up."
      });
    }
  };

  const resetPcosTester = () => {
    setPcosData({ cycleLength: "", hyperAndrogenism: null, metabolic: null, acanthosis: null, familyHistory: null });
    setPcosResult(null);
    setShowPcos(false);
  };

  return (
    <div className="menstrual-page">
      <div className="ambient-blur blur-page-1"></div>
      <div className="ambient-blur blur-page-2"></div>

      {/* HERO SECTION */}
      <div className="mh-hero">
        <div className="mh-badge">Advanced Endocrinology Core</div>
        <h1>Menstrual Health &<br />Reproductive Endocrinology</h1>
        <p>
          De-stigmatizing human anatomy through an objective, evidence-based lens. Dive into the neurochemical pathways, cellular tracking systems, and clinical literature governing adolescent physiology.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>21–35 Days</h3>
            <p>Healthy Variation in Cycle Length</p>
          </div>
          <div className="stat-card">
            <h3>4 Distinct</h3>
            <p>Endocrine Micro-Phases</p>
          </div>
          <div className="stat-card">
            <h3>GnRH Loops</h3>
            <p>Neurological Axis Regulation</p>
          </div>
        </div>
      </div>

      {/* ANATOMICAL OVERVIEW */}
      <div className="mh-card split-layout">
        <div className="text-content">
          <h2>The Hypothalamic–Pituitary–Ovarian (HPO) Axis</h2>
          <p>
            Menstruation is orchestrated by an elegant chemical feedback loop between your brain and your ovaries. 
            The <strong>hypothalamus</strong> utilizes specialized KNDy neurons to release Gonadotropin-Releasing Hormone (GnRH) in precise pulses. This signals the <strong>anterior pituitary gland</strong> to modulate Luteinizing Hormone (LH) and Follicle-Stimulating Hormone (FSH) production. 
          </p>
          <p style={{ marginTop: "15px" }}>
            These signals travel straight down to the <strong>ovaries</strong>, stimulating the production of Progesterone, Estradiol, and Testosterone. These tracking hormones feed back up into the central nervous system, directly managing the changes in the uterine lining.
          </p>
        </div>
        <div className="diagram-container mechanical-spec">
          <img src={hpoAxisImg} alt="HPO Axis Feedback Loop Diagram" className="embedded-hpo-diagram" />
          <div className="diagram-caption">Figure 1.1: Pulsatile neurochemical communication feedback architecture of the human HPO Axis.</div>
        </div>
      </div>

      {/* INTERACTIVE WHEEL PANEL */}
      <div className="mh-card">
        <h2>Interactive Endocrine Cycle Wheel</h2>
        <p style={{color: '#9ca3af', marginBottom: '30px'}}>Select an endocrine stage to trace hormonal levels and cellular adaptations:</p>
        
        <div className="cycle-wheel-container">
          <div className="cycle-wheel">
            {Object.keys(biologicalPhases).map((phaseKey, index) => (
              <div 
                key={phaseKey}
                className={`wheel-phase wheel-phase${index + 1} ${activeWheelPhase === phaseKey ? "active-phase" : ""}`}
                onClick={() => setActiveWheelPhase(phaseKey)}
              >
                <h3>{biologicalPhases[phaseKey].title}</h3>
                <small>{biologicalPhases[phaseKey].days}</small>
              </div>
            ))}
            <div className="center-circle">
              <div>
                <strong style={{color: '#a78bfa'}}>{biologicalPhases[activeWheelPhase].hormoneFocus}</strong>
              </div>
            </div>
          </div>

          <div className="wheel-details-panel">
            <span className="panel-phase-badge">{biologicalPhases[activeWheelPhase].days}</span>
            <h3>{biologicalPhases[activeWheelPhase].title}</h3>
            <p className="phase-desc">{biologicalPhases[activeWheelPhase].description}</p>
            <div className="cellular-box">
              <strong>Cellular-Level Insight:</strong> {biologicalPhases[activeWheelPhase].cellularInsight}
            </div>
          </div>
        </div>
      </div>

      {/* SYMPTOM PHYSIOLOGY LOGIC */}
      <div className="mh-card">
        <h2>Symptom Physiology Explorer</h2>
        <p style={{color: '#9ca3af', marginBottom: '20px'}}>Click a physiological marker to identify its underlying biochemical trigger.</p>
        <div className="symptom-grid">
          {symptoms.map((item, index) => (
            <div
              key={index}
              className={`symptom-card ${selectedSymptom?.title === item.title ? "active-symptom" : ""}`}
              onClick={() => setSelectedSymptom(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
        {selectedSymptom && (
          <div className="tip-box animate-fade-in">
            <h3 style={{marginTop: 0, color: '#f472b6'}}>Biochemical Root Cause: {selectedSymptom.title}</h3>
            <p style={{fontSize: '1rem', color: '#e5e7eb'}}>{selectedSymptom.science}</p>
          </div>
        )}
      </div>

      {/* PEER-REVIEWED CLINICAL RESEARCH REGISTRY */}
      <div className="mh-card">
        <h2>Peer-Reviewed Clinical Research Registry</h2>
        <p style={{color: '#9ca3af', marginBottom: '25px'}}>
          Review real, published clinical literature regarding adolescent metabolic health and reproductive tracts:
        </p>
        <div className="research-grid">
          {clinicalStudies.map((study, idx) => (
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

      {/* OPTIONAL PCOS ASSESSMENT CORE */}
      <div className="mh-card">
        <h2>Symptom Stratification (PCOS/PCOD Educational Screener)</h2>
        <blockquote className="medical-disclaimer">
          <strong>Clinical Disclaimer:</strong> This engine references criteria from standard screening baselines (Rotterdam Criteria). It is built for self-tracking awareness and cannot replace a medical diagnosis.
        </blockquote>

        {!showPcos ? (
          <div className="module-gatekeeper">
            <p>Would you like to evaluate your symptom history for baseline patterns associated with Polycystic Ovary Syndrome / Disease?</p>
            <button className="primary-btn" onClick={() => setShowPcos(true)}>
              Initialize Assessment Module
            </button>
          </div>
        ) : (
          <div className="pcos-interactive-form">
            {/* Q1 */}
            <div className="quiz-card">
              <h3>1. How would you systematically describe your baseline period tracking patterns over the past 6 months?</h3>
              <div className="quiz-options-group">
                <button className={`quiz-btn ${pcosData.cycleLength === "normal" ? "active-choice" : ""}`} onClick={() => handlePcosSelect("cycleLength", "normal")}>Highly predictable (Arrives every 21–35 days)</button>
                <button className={`quiz-btn ${pcosData.cycleLength === "irregular" ? "active-choice" : ""}`} onClick={() => handlePcosSelect("cycleLength", "irregular")}>Irregular/Oligomenorrhea (Cycles fluctuate wildly or skip months frequently)</button>
                <button className={`quiz-btn ${pcosData.cycleLength === "absent" ? "active-choice" : ""}`} onClick={() => handlePcosSelect("cycleLength", "absent")}>Amenorrhea (I haven’t had a cycle in 3+ continuous months)</button>
              </div>
            </div>

            {/* Q2 */}
            <div className="quiz-card">
              <h3>2. Are you experiencing persistent hormonal skin challenges or unexpected hair growth patterns?</h3>
              <div className="quiz-options-group">
                <button className={`quiz-btn ${pcosData.hyperAndrogenism === true ? "active-choice" : ""}`} onClick={() => handlePcosSelect("hyperAndrogenism", true)}>Yes: Deep cystic flare-ups along jawline OR heavy terminal hair on face, chest, or stomach</button>
                <button className={`quiz-btn ${pcosData.hyperAndrogenism === false ? "active-choice" : ""}`} onClick={() => handlePcosSelect("hyperAndrogenism", false)}>No: Typical baseline acne or predictable thin body hair</button>
              </div>
            </div>

            {/* Q3 */}
            <div className="quiz-card">
              <h3>3. Do you experience rapid metabolic adjustments or unusual stamina crashes?</h3>
              <div className="quiz-options-group">
                <button className={`quiz-btn ${pcosData.metabolic === true ? "active-choice" : ""}`} onClick={() => handlePcosSelect("metabolic", true)}>Yes: Intense, stubborn fatigue shortly after processing sweet/carb-rich foods, or highly resistant weight changes</button>
                <button className={`quiz-btn ${pcosData.metabolic === false ? "active-choice" : ""}`} onClick={() => handlePcosSelect("metabolic", false)}>No: Balanced energy thresholds and predictable metabolic stability</button>
              </div>
            </div>

            {/* Q4 */}
            <div className="quiz-card">
              <h3>4. Have you observed hyper-pigmentation or structural changes in highly specific skin friction junctions?</h3>
              <div className="quiz-options-group">
                <button className={`quiz-btn ${pcosData.acanthosis === true ? "active-choice" : ""}`} onClick={() => handlePcosSelect("acanthosis", true)}>Yes: Velvety, dark patches of skin developing around the back of my neck, armpits, or groin lines</button>
                <button className={`quiz-btn ${pcosData.acanthosis === false ? "active-choice" : ""}`} onClick={() => handlePcosSelect("acanthosis", false)}>No texture alterations detected</button>
              </div>
            </div>

            {/* Q5 */}
            <div className="quiz-card">
              <h3>5. Does your direct bloodline possess recognized metabolic or endocrine health records?</h3>
              <div className="quiz-options-group">
                <button className={`quiz-btn ${pcosData.familyHistory === true ? "active-choice" : ""}`} onClick={() => handlePcosSelect("familyHistory", true)}>Yes: Direct history of PCOS, Type 2 Diabetes, or insulin issues within family lines</button>
                <button className={`quiz-btn ${pcosData.familyHistory === false ? "active-choice" : ""}`} onClick={() => handlePcosSelect("familyHistory", false)}>No known biological family history</button>
              </div>
            </div>

            <div className="action-btn-group">
              <button className="primary-btn" onClick={evaluatePcosRisk} disabled={!pcosData.cycleLength}>
                Compute Assessment Evaluation
              </button>
              <button className="cancel-btn" onClick={resetPcosTester}>
                Close Module
              </button>
            </div>

            {pcosResult && (
              <div className="tip-box text-left">
                <h3 className={pcosResult.status.includes("High") ? "high-risk-title" : "normal-risk-title"} style={{marginTop: 0}}>
                  {pcosResult.status}
                </h3>
                <p style={{color: '#f3f1f5'}}>{pcosResult.message}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* OPTIONAL KNOWLEDGE ASSESSMENT QUIZ */}
      <div className="mh-card">
        <h2>Endocrine Assessment & Recall Quiz</h2>
        
        {!showQuiz ? (
          <div className="module-gatekeeper">
            <p>Ready to validate your comprehension of reproductive hormones and physiological axis communication links?</p>
            <button className="secondary-btn" onClick={() => setShowQuiz(true)}>
              Launch Knowledge Assessment
            </button>
          </div>
        ) : (
          <div className="quiz-interactive-module">
            {quizQuestions.map((q, index) => (
              <div className="quiz-card" key={index}>
                <h3>{q.question}</h3>
                <div className="quiz-options-group">
                  {q.options.map((opt, i) => {
                    const isSelected = answered[index] === opt;
                    const isCorrect = opt === q.answer;
                    let btnStyle = "quiz-btn";
                    if (answered[index]) {
                      if (isCorrect) btnStyle += " option-correct";
                      else if (isSelected) btnStyle += " option-incorrect";
                    }
                    return (
                      <button
                        key={i}
                        className={btnStyle}
                        disabled={!!answered[index]}
                        onClick={() => handleAnswer(index, opt, q.answer)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="action-btn-group">
              <h3 className="score" style={{margin: 0, alignSelf: 'center'}}>Metrics: {score} / {quizQuestions.length}</h3>
              <button className="cancel-btn" style={{marginLeft: 'auto'}} onClick={() => { setShowQuiz(false); setAnswered({}); setScore(0); }}>
                Exit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenstrualHealth;