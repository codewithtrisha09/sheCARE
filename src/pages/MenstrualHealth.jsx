import { useState } from "react";
import "./MenstrualHealth.css";

const quizQuestions = [
  {
    question: "Which hormone triggers ovulation?",
    options: ["Estrogen", "LH", "Progesterone", "Insulin"],
    answer: "LH",
  },
  {
    question: "Which phase comes after ovulation?",
    options: [
      "Follicular Phase",
      "Luteal Phase",
      "Menstrual Phase",
      "Puberty Phase",
    ],
    answer: "Luteal Phase",
  },
];

function MenstrualHealth() {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
const [pcosResult, setPcosResult] = useState("");
  const symptoms = [
    {
      title: "Cramps",
      science:
        "Caused by prostaglandins which trigger uterine contractions to shed the endometrium.",
    },
    {
      title: "Bloating",
      science:
        "Hormonal fluctuations (progesterone) lead to temporary water retention.",
    },
    {
      title: "Fatigue",
      science:
        "Blood loss + hormonal changes can reduce energy levels.",
    },
    {
      title: "Headache",
      science:
        "Triggered by drops in estrogen levels before menstruation.",
    },
    {
      title: "Acne",
      science:
        "Androgen hormones increase oil production in skin glands.",
    },
  ];

  const handleAnswer = (qIndex, selected, correct) => {
    if (answered[qIndex]) return;

    setAnswered({ ...answered, [qIndex]: true });

    if (selected === correct) {
      setScore(score + 1);
    }
  };
  const calculatePCOSRisk = () => {
  let risk = 0;

  if (document.getElementById("irregular")?.checked) risk++;
  if (document.getElementById("acne")?.checked) risk++;
  if (document.getElementById("hair")?.checked) risk++;
  if (document.getElementById("weight")?.checked) risk++;

  if (risk <= 1) {
    setPcosResult("Low Risk");
  } else if (risk <= 3) {
    setPcosResult("Moderate Risk");
  } else {
    setPcosResult("High Risk — consider speaking with a healthcare professional.");
  }
};

  return (
    <div className="menstrual-page">

      {/* HERO */}
      <div className="mh-hero">
        <h1>Menstrual Health & Reproductive Science</h1>
        <p>
          Understand your body through science-backed knowledge.
          Learn how hormones, organs, and biology work together.
        </p>

        <div className="mh-badge">
          Evidence-Based • Teen-Friendly • Science-Focused
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>28 Days</h3>
            <p>Average cycle length</p>
          </div>
          <div className="stat-card">
            <h3>4 Phases</h3>
            <p>Menstrual cycle stages</p>
          </div>
          <div className="stat-card">
            <h3>4 Hormones</h3>
            <p>Drive the cycle</p>
          </div>
        </div>
      </div>

      {/* WHAT IS MENSTRUATION */}
      <div className="mh-card">
        <h2>What is Menstruation?</h2>

        <p>
          Menstruation is a biological process controlled by the
          Hypothalamic–Pituitary–Ovarian (HPO) axis.
        </p>

        <p>
          The brain releases hormones that signal the ovaries to produce estrogen
          and progesterone. These hormones prepare the uterus for pregnancy.
        </p>

        <p>
          If fertilization does not occur, hormone levels drop and the
          endometrium is shed through menstrual bleeding.
        </p>
      </div>

      {/* CYCLE */}
   <div className="mh-card">
  <h2>Interactive Menstrual Cycle Wheel</h2>

  <div className="cycle-wheel">

    <div className="wheel-phase wheel-phase1">
      <h3>Menstruation</h3>
      <p>Days 1-5</p>
    </div>

    <div className="wheel-phase wheel-phase2">
      <h3>Follicular</h3>
      <p>Days 6-13</p>
    </div>

    <div className="wheel-phase wheel-phase3">
      <h3>Ovulation</h3>
      <p>Day 14</p>
    </div>

    <div className="wheel-phase wheel-phase4">
      <h3>Luteal</h3>
      <p>Days 15-28</p>
    </div>

    <div className="center-circle">
      <h3>28 Day Cycle</h3>
    </div>

  </div>

  <p>
    The menstrual cycle is regulated by communication between the brain,
    pituitary gland, ovaries, and uterus through hormonal feedback loops.
  </p>
</div>

      {/* HORMONES */}
      <div className="mh-card">
        <h2>Hormones Explained</h2>

        <div className="phase-grid">
          <div className="phase">
            <h3>Estrogen</h3>
            <p>
              Promotes growth of uterine lining, supports bone health and skin.
            </p>
          </div>

          <div className="phase">
            <h3>Progesterone</h3>
            <p>
              Prepares uterus for pregnancy after ovulation.
            </p>
          </div>

          <div className="phase">
            <h3>FSH</h3>
            <p>
              Stimulates development of ovarian follicles.
            </p>
          </div>

          <div className="phase">
            <h3>LH</h3>
            <p>
              Triggers ovulation.
            </p>
          </div>
        </div>
      </div>
<div className="mh-card">
  <h2>PCOS Awareness Checker</h2>

  <p>
    This educational tool cannot diagnose PCOS but can help identify common
    symptoms.
  </p>

  <div className="pcos-box">

    <label>
      <input type="checkbox" id="irregular" />
      Irregular periods
    </label>

    <label>
      <input type="checkbox" id="acne" />
      Persistent acne
    </label>

    <label>
      <input type="checkbox" id="hair" />
      Excess facial or body hair
    </label>

    <label>
      <input type="checkbox" id="weight" />
      Unexplained weight gain
    </label>

    <button onClick={calculatePCOSRisk}>
      Check My Risk
    </button>

    {pcosResult && (
      <div className="tip-box">
        <h3>{pcosResult}</h3>
      </div>
    )}

  </div>
</div>
      {/* SYMPTOM EXPLORER */}
      <div className="mh-card">
        <h2>Symptoms Explorer</h2>

        <p>Click to understand the science behind symptoms.</p>

        <div className="symptom-grid">
          {symptoms.map((item, index) => (
            <div
              key={index}
              className="symptom-card"
              onClick={() => setSelectedSymptom(item)}
            >
              {item.title}
            </div>
          ))}
        </div>

        {selectedSymptom && (
          <div className="tip-box">
            <h3>{selectedSymptom.title}</h3>
            <p>{selectedSymptom.science}</p>
          </div>
        )}
      </div>

      {/* PUBERTY */}
      <div className="mh-card">
  <h2>Puberty, Adolescence & Body Changes</h2>

  <div className="phase-grid">

    <div className="phase">
      <h3>Breast Development</h3>
      <p>
        Usually one of the earliest signs of puberty and driven by estrogen.
      </p>
    </div>

    <div className="phase">
      <h3>Body Hair</h3>
      <p>
        Hair growth under the arms, legs and pubic region occurs because of
        androgen hormones.
      </p>
    </div>

    <div className="phase">
      <h3>Facial Hair</h3>
      <p>
        Light facial hair is normal and varies between individuals due to
        genetics and hormones.
      </p>
    </div>

    <div className="phase">
      <h3>Acne</h3>
      <p>
        Increased oil production during puberty can clog pores and cause acne.
      </p>
    </div>

    <div className="phase">
      <h3>Body Image</h3>
      <p>
        Bodies develop at different rates. Comparing yourself to others is
        often misleading.
      </p>
    </div>

    <div className="phase">
      <h3>Growth Spurts</h3>
      <p>
        Rapid height and weight changes are normal during adolescence.
      </p>
    </div>

  </div>
</div>

      {/* DISORDERS */}
      <div className="mh-card">
        <h2>Common Disorders</h2>

        <div className="phase-grid">
          <div className="phase">
            <h3>PCOS</h3>
            <p>Hormonal disorder causing irregular cycles and excess androgens.</p>
          </div>

          <div className="phase">
            <h3>Endometriosis</h3>
            <p>Growth of endometrial tissue outside uterus causing pain.</p>
          </div>

          <div className="phase">
            <h3>Dysmenorrhea</h3>
            <p>Painful periods due to strong uterine contractions.</p>
          </div>

          <div className="phase">
            <h3>Amenorrhea</h3>
            <p>Absence of menstruation.</p>
          </div>
        </div>
      </div>

      {/* NUTRITION */}
      <div className="mh-card">
        <h2>Nutrition During Periods</h2>

        <ul>
          <li>Iron: spinach, beans</li>
          <li>Magnesium: nuts, seeds</li>
          <li>Protein: eggs, legumes</li>
          <li>Hydration is essential</li>
        </ul>
      </div>

      {/* WARNING */}
      <div className="mh-card">
        <h2>When to See a Doctor</h2>

        <ul>
          <li>Severe pain</li>
          <li>Heavy bleeding</li>
          <li>Missed periods</li>
          <li>Extreme fatigue</li>
        </ul>
      </div>

      {/* QUIZ */}
      <div className="mh-card">
        <h2>Knowledge Check</h2>

        {quizQuestions.map((q, index) => (
          <div className="quiz-card" key={index}>
            <h3>{q.question}</h3>

            {q.options.map((opt, i) => (
              <button
                key={i}
                className="quiz-btn"
                onClick={() => handleAnswer(index, opt, q.answer)}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <h3 className="score">Score: {score}</h3>
      </div>

    </div>
    
  );
  
}

export default MenstrualHealth;