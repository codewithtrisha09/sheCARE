import { useState } from "react";
import "./PersonalHygiene.css";

const hygieneTopic = {
  skinCare: {
    title: "Skin Care",
    description: "Maintain healthy skin through proper cleansing and protection",
    details: [
      "Cleanse face twice daily with gentle, appropriate cleanser",
      "Exfoliate 2-3 times weekly to remove dead skin cells",
      "Apply moisturizer suited to your skin type",
      "Use broad-spectrum SPF 30+ sunscreen daily",
      "Avoid touching face throughout the day",
      "Change pillowcases every 2-3 days"
    ],
    tips: "Different skin types require different approaches. Dry skin needs richer moisturizers, while oily skin benefits from lightweight, non-comedogenic products."
  },
  oralHealth: {
    title: "Oral Health",
    description: "Protect teeth and gums for lifelong dental wellness",
    details: [
      "Brush teeth for 2 minutes, twice daily with fluoride toothpaste",
      "Floss daily to remove food particles and plaque",
      "Use mouthwash for additional bacterial control",
      "Limit sugary foods and acidic beverages",
      "Drink water after meals when brushing isn't possible",
      "Visit dentist every 6 months for professional cleaning"
    ],
    tips: "Replace your toothbrush every 3 months or when bristles become frayed. Use a soft-bristled brush to protect gum tissue."
  },
  hairCare: {
    title: "Hair Care",
    description: "Keep hair healthy through appropriate washing and styling",
    details: [
      "Wash hair based on your hair type (daily to 2-3 times weekly)",
      "Use shampoo and conditioner suited to your hair type",
      "Condition primarily the lower half of your hair",
      "Avoid excessive heat styling; use heat protectant spray when needed",
      "Let hair air-dry when possible to reduce damage",
      "Get regular trims every 6-8 weeks to prevent split ends"
    ],
    tips: "Using cooler water for final rinse helps seal the hair cuticle, resulting in shinier, healthier-looking hair."
  },
  bodyCare: {
    title: "Body Care",
    description: "Maintain overall body cleanliness and skin health",
    details: [
      "Shower or bathe with warm water, not hot",
      "Use appropriate body wash or soap",
      "Thoroughly dry your body after showering",
      "Apply deodorant or antiperspirant daily",
      "Moisturize body skin, especially after showering",
      "Change clothes daily and wear fresh undergarments"
    ],
    tips: "Hot water can strip natural oils from skin and cause dryness. Warm water is effective for cleansing while being gentler on skin."
  },
  menstrualHygiene: {
    title: "Menstrual Hygiene",
    description: "Maintain health and comfort during menstruation",
    details: [
      "Change pads or tampons every 4-8 hours",
      "Use products appropriate for your flow level",
      "Wash external genital area gently with water daily",
      "Never use douches, powders, or scented products",
      "Dispose of menstrual products properly",
      "Maintain regular hygiene routines without any additional measures"
    ],
    tips: "There is no need for special products beyond regular hygiene. Your body is self-cleaning and doesn't require douching or special washes."
  },
  sleepHygiene: {
    title: "Sleep Hygiene",
    description: "Establish healthy sleep patterns for physical recovery",
    details: [
      "Maintain consistent sleep and wake times daily",
      "Aim for 7-9 hours of sleep per night",
      "Keep bedroom cool, dark, and quiet",
      "Avoid screens 30-60 minutes before bedtime",
      "Limit caffeine intake, especially after 2 PM",
      "Develop a relaxing bedtime routine"
    ],
    tips: "Quality sleep directly impacts skin health, immune function, and emotional wellbeing. Prioritize consistent sleep patterns."
  },
  digitalHygiene: {
    title: "Digital Hygiene",
    description: "Reduce germs and health impacts from digital devices",
    details: [
      "Clean phone, tablet, and laptop screens weekly",
      "Avoid touching face while using devices",
      "Practice proper screen posture to prevent neck strain",
      "Take 20-second breaks every 20 minutes from screens",
      "Wash hands before eating while using devices",
      "Keep devices away from bed and dining areas"
    ],
    tips: "Your phone collects more bacteria than a toilet seat. Regular cleaning prevents bacterial transfer to your face."
  },
  mentalHygiene: {
    title: "Mental & Emotional Hygiene",
    description: "Support mental health through healthy daily practices",
    details: [
      "Practice daily stress-reduction techniques like meditation",
      "Maintain social connections and spend time with friends",
      "Limit social media use to specific times daily",
      "Engage in physical activity for mental clarity",
      "Practice self-compassion and positive self-talk",
      "Seek support from trusted adults when needed"
    ],
    tips: "Mental health directly affects physical hygiene habits. Taking care of your mind is as important as taking care of your body."
  }
};

const mythsFacts = [
  {
    myth: "Washing your face more frequently will clear acne faster.",
    fact: "Overwashing damages the skin barrier and can irritate existing breakouts. Stick to twice daily cleansing."
  },
  {
    myth: "You only need sunscreen when it's sunny or during summer.",
    fact: "UV rays penetrate clouds and are present year-round. Daily sunscreen protects against aging and skin cancer."
  },
  {
    myth: "Natural or organic products are always safer for skin.",
    fact: "Safety depends on ingredients and how your skin reacts, not whether something is natural. Test all products first."
  },
  {
    myth: "Skipping meals improves digestion and helps with bloating.",
    fact: "Regular meals support healthy metabolism and energy levels. Digestion works best with consistent nutrition."
  },
  {
    myth: "You can make up for poor sleep during the week on weekends.",
    fact: "Consistent sleep patterns are essential. Irregular sleep disrupts circadian rhythms and immune function."
  },
  {
    myth: "Dry skin doesn't need sunscreen protection.",
    fact: "All skin types need sun protection regardless of moisture levels. Use hydrating SPF products if your skin is dry."
  }
];

const dailyChecklist = [
  "Wash hands before meals",
  "Brush teeth morning and night",
  "Drink adequate water (8+ glasses)",
  "Cleanse face morning and night",
  "Apply sunscreen to exposed areas",
  "Shower or bathe",
  "Change into fresh clothes",
  "Apply deodorant",
  "Trim or groom nails",
  "Practice stress-reduction technique"
];

const emergencyTips = [
  {
    situation: "Forgot deodorant",
    solution: "Wash with soap and water. Deodorant masks odor; soap removes bacteria causing odor."
  },
  {
    situation: "No time to shower before an event",
    solution: "Use dry shampoo on hair, wash face and hands, change into clean clothes, apply deodorant."
  },
  {
    situation: "Developed unexpected breakout",
    solution: "Don't panic or over-treat. Reduce products to basics: gentle cleanser, moisturizer, and targeted spot treatment."
  },
  {
    situation: "Stuck in gym clothes for extended period",
    solution: "Rinse off with water when possible. Change immediately into dry clothes to prevent bacterial growth."
  },
  {
    situation: "Menstrual product leak",
    solution: "Use cold water immediately. Soak stained items in cold salt water before washing. Wear protective backup layer."
  },
  {
    situation: "Dry, irritated skin",
    solution: "Reduce cleansing to once daily, switch to gentler products, skip exfoliation temporarily, use heavier moisturizer."
  }
];

const badges = [
  { name: "Daily Brusher", description: "Completed teeth brushing for 7 consecutive days" },
  { name: "Hydration Master", description: "Maintained proper water intake for 7 consecutive days" },
  { name: "Sun Guardian", description: "Applied sunscreen daily for 30 consecutive days" },
  { name: "Sleep Supporter", description: "Maintained consistent sleep schedule for 14 consecutive days" },
  { name: "Wellness Champion", description: "Completed all daily hygiene tasks for 30 consecutive days" },
  { name: "Habit Builder", description: "Established three new healthy habits" }
];

export default function PersonalHygiene() {
  const [selectedTopic, setSelectedTopic] = useState("skinCare");
  const [checkedItems, setCheckedItems] = useState({});
  const [streakCount, setStreakCount] = useState(7);
  const [earnedBadges, setEarnedBadges] = useState(0);

  const currentTopic = hygieneTopic[selectedTopic];

  const handleChecklistChange = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const updateStreak = () => {
    setStreakCount(prev => prev + 1);
  };

  const calculateCompletionRate = () => {
    const completed = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completed / dailyChecklist.length) * 100);
  };

  const topicsList = [
    { key: "skinCare", label: "Skin Care" },
    { key: "oralHealth", label: "Oral Health" },
    { key: "hairCare", label: "Hair Care" },
    { key: "bodyCare", label: "Body Care" },
    { key: "menstrualHygiene", label: "Menstrual Hygiene" },
    { key: "sleepHygiene", label: "Sleep Hygiene" },
    { key: "digitalHygiene", label: "Digital Hygiene" },
    { key: "mentalHygiene", label: "Mental Hygiene" }
  ];

  return (
    <div className="hygiene-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">Wellness Foundation</div>
          <h1>Physical Hygiene & Self-Care</h1>
          <p>
            Building healthy hygiene habits is an investment in your confidence, health, and wellbeing.
            Learn evidence-based practices that support your physical and mental wellness.
          </p>
        </div>
      </section>

      {/* Daily Score Card */}
      <section className="score-section">
        <div className="score-card">
          <div className="score-header">
            <h3>Daily Progress</h3>
            <span className="score-percentage">{calculateCompletionRate()}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateCompletionRate()}%` }}
            />
          </div>
          <p className="score-text">
            {calculateCompletionRate() < 50 ? "Getting started" : 
             calculateCompletionRate() < 80 ? "Good progress" : 
             "Excellent work"}
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Start</h2>
        <div className="action-buttons">
          <button className="action-btn primary">View Today's Routine</button>
          <button className="action-btn secondary">Get Personalized Tips</button>
          <button className="action-btn secondary">Find Your Product Type</button>
        </div>
      </section>

      {/* Hygiene Topics */}
      <section className="topics-section">
        <div className="topics-header">
          <h2>Hygiene Topics</h2>
          <p>Select a topic to learn detailed practices and recommendations</p>
        </div>

        <div className="topics-tabs">
          {topicsList.map(topic => (
            <button
              key={topic.key}
              className={`topic-tab ${selectedTopic === topic.key ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic.key)}
            >
              {topic.label}
            </button>
          ))}
        </div>

        <div className="topic-content">
          <div className="topic-header">
            <h3>{currentTopic.title}</h3>
            <p className="topic-description">{currentTopic.description}</p>
          </div>

          <div className="topic-details">
            <h4>Essential Practices</h4>
            <ul className="practices-list">
              {currentTopic.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="topic-tip">
            <h4>Pro Tip</h4>
            <p>{currentTopic.tips}</p>
          </div>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="myths-section">
        <div className="myths-header">
          <h2>Myths vs Facts</h2>
          <p>Separate common misconceptions from evidence-based truth</p>
        </div>

        <div className="myths-grid">
          {mythsFacts.map((item, index) => (
            <div className="myth-card" key={index}>
              <div className="myth-content">
                <div className="myth-label">Myth</div>
                <p>{item.myth}</p>
              </div>
              <div className="divider" />
              <div className="fact-content">
                <div className="fact-label">Fact</div>
                <p>{item.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Checklist */}
      <section className="checklist-section">
        <div className="checklist-header">
          <h2>Daily Hygiene Checklist</h2>
          <p>Track your daily wellness practices</p>
        </div>

        <div className="checklist-card">
          <div className="checklist-items">
            {dailyChecklist.map((task, index) => (
              <label key={index} className="check-item">
                <input
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={() => handleChecklistChange(index)}
                />
                <span>{task}</span>
                <span className="checkmark" />
              </label>
            ))}
          </div>
          <div className="checklist-footer">
            <p>{Object.values(checkedItems).filter(Boolean).length} of {dailyChecklist.length} completed</p>
          </div>
        </div>
      </section>

      {/* Streak Section */}
      <section className="streak-section">
        <div className="streak-card">
          <div className="streak-display">
            <div className="streak-number">{streakCount}</div>
            <div className="streak-label">Days of Consistent Care</div>
          </div>
          <p className="streak-description">
            Maintaining consistency builds sustainable habits. Keep going!
          </p>
          <button className="streak-btn" onClick={updateStreak}>
            Log Today's Progress
          </button>
        </div>
      </section>

      {/* Emergency Tips */}
      <section className="emergency-section">
        <div className="emergency-header">
          <h2>Emergency Hygiene Tips</h2>
          <p>Solutions for common hygiene challenges</p>
        </div>

        <div className="emergency-grid">
          {emergencyTips.map((tip, index) => (
            <div className="emergency-card" key={index}>
              <h4>{tip.situation}</h4>
              <p>{tip.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="badges-section">
        <div className="badges-header">
          <h2>Earn Wellness Badges</h2>
          <p>Unlock achievements as you build consistent habits</p>
        </div>

        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div key={index} className="badge-card">
              <div className="badge-icon-placeholder" />
              <h4>{badge.name}</h4>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-section">
        <h2>Additional Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h4>Dermatologist Recommendations</h4>
            <p>Understanding your skin type and appropriate product selection based on professional dermatology standards.</p>
          </div>
          <div className="resource-card">
            <h4>Dental Health Guidelines</h4>
            <p>Guidelines from dental associations on brushing, flossing, and professional care recommendations.</p>
          </div>
          <div className="resource-card">
            <h4>Sleep Science</h4>
            <p>Understanding circadian rhythms and evidence-based sleep improvement strategies for better health.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
