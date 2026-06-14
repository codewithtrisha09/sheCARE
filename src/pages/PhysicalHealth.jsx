import { useState } from "react";
import { Link } from "react-router-dom";
import "./PhysicalHealth.css";

function PhysicalHealth() {
  const [activeTab, setActiveTab] = useState("fitness");
  const [sleepLog, setSleepLog] = useState({
    bedTime: "",
    wakeTime: "",
    quality: 5,
  });

  const workoutTypes = {
    cardio: {
      name: "Cardio & Aerobic",
      icon: "🏃",
      benefits: ["Heart health", "Mood boost", "Energy increase", "Better sleep"],
      examples: ["Running", "Swimming", "Dancing", "Cycling", "Jump rope", "Sports"],
      frequency: "3-5x per week",
      duration: "20-45 min",
      why: "Strengthens your cardiovascular system (your heart pumps blood to every cell). Regular cardio = better endurance, less breathlessness during daily activities, improved mood from endorphins.",
    },
    strength: {
      name: "Strength & Resistance",
      icon: "💪",
      benefits: ["Muscle growth", "Bone strength", "Metabolism boost", "Injury prevention"],
      examples: ["Weight lifting", "Bodyweight circuits", "Resistance bands", "Yoga"],
      frequency: "2-4x per week",
      duration: "30-60 min",
      why: "Builds lean muscle (which burns more calories at rest) and strengthens bones. Teen years = critical for building bone density. Strong muscles = better posture, less back pain, confidence boost.",
    },
    flexibility: {
      name: "Flexibility & Mobility",
      icon: "🧘",
      benefits: ["Injury prevention", "Stress relief", "Better posture", "Mobility gains"],
      examples: ["Yoga", "Pilates", "Stretching", "Tai chi"],
      frequency: "Daily or 4-5x/week",
      duration: "15-30 min",
      why: "Keeps your joints moving smoothly and prevents tightness. Reduces muscle soreness, decreases injury risk, and activates your parasympathetic nervous system (the chill mode).",
    },
    sports: {
      name: "Team Sports & Activities",
      icon: "⚽",
      benefits: ["Social connection", "Team mentality", "Full-body workout", "Mental health"],
      examples: ["Soccer", "Basketball", "Tennis", "Volleyball", "Rock climbing"],
      frequency: "2-4x per week",
      duration: "45-90 min",
      why: "Combines physical fitness with social connection and accountability. Being part of a team = better mental health, motivation, and fun (which means you'll actually stick with it).",
    },
  };

  const sleepStages = [
    {
      stage: "Stage 1 (Light Sleep)",
      duration: "~5-10 min",
      what: "Transition from awake to asleep. Brain waves slow down but you're easily awakable.",
      importance: "Helps your brain shift modes. You might experience hypnic jerks (that falling feeling).",
    },
    {
      stage: "Stage 2 (Light Sleep)",
      duration: "~20 min",
      what: "Deeper than Stage 1. Sleep spindles help consolidate memories. Heart rate drops further.",
      importance: "Memory encoding for facts & skills. This is ~45% of your total sleep—critical.",
    },
    {
      stage: "Stage 3 (Deep Sleep)",
      duration: "~30-40 min",
      what: "Slow-wave sleep (SWS). Hardest to wake up. Delta brain waves dominate.",
      importance: "Physical restoration. Growth hormone peaks here (especially important for teens). Immune system repairs.",
    },
    {
      stage: "REM Sleep",
      duration: "~20-30 min",
      what: "Rapid Eye Movement. Dreams happen. Brain is highly active. Body is temporarily paralyzed.",
      importance: "Emotional processing. Creative problem-solving. Learning consolidation. Mental health support.",
    },
  ];

  const teenHealthIssues = [
    {
      issue: "Irregular Sleep Schedule",
      problem: "Going to bed at different times every night messes with your circadian rhythm (your body's internal clock). Teens already naturally want to sleep later—fighting it creates sleep debt.",
      solution: "Go to bed & wake up within 30 min of the same time every day (even weekends). Your body adapts to consistency.",
      impact: "Sleep debt accumulates. Miss 1 hour for a week = 7 hours of lost sleep = cognitive function drops by 10%+",
    },
    {
      issue: "Screen Time Before Bed",
      problem: "Blue light from phones suppresses melatonin (your sleep hormone). Scrolling keeps your brain alert when it should wind down.",
      solution: "No screens 60-90 min before bed. Read, journal, or chat instead.",
      impact: "Using phone before bed = 30-60 min longer to fall asleep. Over a week = massive sleep debt.",
    },
    {
      issue: "Not Moving Enough",
      problem: "Sedentary lifestyle (sitting in classes all day + more sitting at home) weakens muscles, bones, and mood. Teens need movement for mental health.",
      solution: "30 min moderate activity most days. Can be walking, dancing, sports—anything that elevates heart rate.",
      impact: "Physical inactivity linked to depression, anxiety, poor sleep, and weak bones (important now for future health).",
    },
    {
      issue: "Skipping Breakfast",
      problem: "No fuel in the morning = brain fog, crashes mid-morning, poor focus in class, energy dips.",
      solution: "Eat something within 1-2 hours of waking. Protein + carbs + fat (egg toast, yogurt granola, breakfast sandwich).",
      impact: "With breakfast: better focus, steadier energy, better mood. Without: cognitive function drops 10-15%.",
    },
    {
      issue: "Dehydration",
      problem: "Most teens are dehydrated. Even 2% dehydration = reduced strength, slower thinking, mood changes, headaches.",
      solution: "Drink water consistently. Aim for ~8-10 cups/day. More if you exercise or live somewhere hot.",
      impact: "Dehydration = 10% strength loss, headaches, worse focus. It's one of the easiest things to fix.",
    },
    {
      issue: "Ignoring Injuries",
      problem: "Pushing through pain = more damage. Small injuries become chronic problems that affect you for years.",
      solution: "If it hurts consistently, rest it for 2-3 days. Ice, compression, elevation. See a doctor if pain persists.",
      impact: "Ignoring injuries now = chronic pain in 20s-30s. Proper rest now = no long-term damage.",
    },
  ];

  const nutritionTips = [
    {
      category: "Protein",
      amount: "0.8-1g per lb of body weight (if exercising)",
      why: "Builds muscle, repairs tissues, makes hormones. Teens need MORE protein than kids because you're still growing.",
      sources: ["Chicken", "Eggs", "Greek yogurt", "Beans", "Fish", "Tofu", "Cheese"],
      tip: "Have protein at every meal. Keeps you full longer and stabilizes energy.",
    },
    {
      category: "Carbs (Whole Grains)",
      amount: "45-65% of daily calories",
      why: "Your brain's preferred fuel. Whole grains = steady energy (refined carbs = crashes).",
      sources: ["Brown rice", "Oats", "Whole wheat bread", "Quinoa", "Sweet potatoes", "Fruits"],
      tip: "Choose 'whole' versions. Your brain will thank you.",
    },
    {
      category: "Healthy Fats",
      amount: "20-35% of daily calories",
      why: "Brain development, hormone production, absorbs fat-soluble vitamins (A, D, E, K).",
      sources: ["Avocados", "Nuts", "Seeds", "Olive oil", "Salmon", "Dark chocolate"],
      tip: "Don't fear fat. Your brain is 60% fat. You NEED it.",
    },
    {
      category: "Hydration",
      amount: "Half your body weight in oz of water (150 lb = 75 oz = ~9 cups)",
      why: "Every cell needs water. Dehydration = brain fog, fatigue, poor recovery.",
      sources: ["Water", "Herbal tea", "Coconut water", "Watermelon"],
      tip: "Drink before you're thirsty. Thirst = you're already dehydrated.",
    },
  ];

  const mentalHealthConnection = [
    {
      topic: "Exercise & Mood",
      science: "Exercise releases endorphins (feel-good chemicals) AND reduces cortisol (stress hormone). Even 20 min of movement = measurable mood boost.",
      reality: "Feeling anxious or depressed? Movement is literally medicine. It's not about 'burning calories'—it's about mental health.",
    },
    {
      topic: "Sleep & Emotions",
      science: "Your amygdala (emotion center) is 60% MORE reactive when sleep-deprived. Miss sleep = everything feels worse.",
      reality: "Having a bad day? Could be sleep debt. One good night = perspective shift.",
    },
    {
      topic: "Consistency & Confidence",
      science: "Showing up for your body regularly (even small) = builds self-efficacy (belief in yourself). This transfers to other areas.",
      reality: "Regular movement = better body image, more confidence, better mental health. It's all connected.",
    },
    {
      topic: "Social Movement",
      science: "Moving with others = bonding + physical health + mental health. Triple win.",
      reality: "Joining a team or class = built-in social connection + accountability + motivation.",
    },
  ];

  const handleSleepChange = (field, value) => {
    setSleepLog({ ...sleepLog, [field]: value });
  };

  const calculateSleepQuality = () => {
    if (!sleepLog.bedTime || !sleepLog.wakeTime) return 0;
    const bed = new Date(`2024-01-01T${sleepLog.bedTime}`);
    const wake = new Date(`2024-01-01T${sleepLog.wakeTime}`);
    if (wake < bed) wake.setDate(wake.getDate() + 1);
    return Math.floor((wake - bed) / (1000 * 60 * 60));
  };

  const sleepHours = calculateSleepQuality();

  return (
    <div className="app-viewport">
      {/* BACKGROUND ELEMENTS */}
      <div className="ambient-blur blur-blue" style={{ top: "100px", left: "-150px" }}></div>
      <div className="ambient-blur blur-purple" style={{ bottom: "200px", right: "-100px" }}></div>

      {/* NAVIGATION */}
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ margin: 0, color: "#f4f2f6" }}>← SheCARE</h2>
        </Link>
        <h3 className="page-title">Teen Physical Wellness & Movement</h3>
      </nav>

      {/* HERO SECTION */}
      <header className="ph-hero">
        <div className="ph-badge">Module 1.4 • Now Unlocked</div>
        <h1>
          Your Body is Your <span className="gradient-blue">Most Powerful Tool</span>
        </h1>
        <p>
          Physical wellness isn't about looking a certain way. It's about having energy, 
          sleeping well, handling stress, and feeling strong in your own body. This module breaks down 
          the science of teen fitness, sleep, nutrition, and how it all connects to your mental health.
        </p>
      </header>

      {/* MAIN CONTENT TABS */}
      <section className="ph-tabs-section">
        <div className="ph-tab-buttons">
          <button
            className={`ph-tab-btn ${activeTab === "fitness" ? "active" : ""}`}
            onClick={() => setActiveTab("fitness")}
          >
            Fitness Basics
          </button>
          <button
            className={`ph-tab-btn ${activeTab === "sleep" ? "active" : ""}`}
            onClick={() => setActiveTab("sleep")}
          >
            Sleep Science
          </button>
          <button
            className={`ph-tab-btn ${activeTab === "nutrition" ? "active" : ""}`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition 101
          </button>
          <button
            className={`ph-tab-btn ${activeTab === "health-issues" ? "active" : ""}`}
            onClick={() => setActiveTab("health-issues")}
          >
            Common Issues
          </button>
          <button
            className={`ph-tab-btn ${activeTab === "mental" ? "active" : ""}`}
            onClick={() => setActiveTab("mental")}
          >
            Mental Health
          </button>
        </div>

        {/* TAB 1: FITNESS BASICS */}
        {activeTab === "fitness" && (
          <div className="ph-tab-content animate-fade-in">
            <div className="ph-intro-card">
              <h2>Fitness for Teens: What You Actually Need to Know</h2>
              <p>
                You don't need to spend 2 hours in a gym. You don't need a "summer body." What you NEED is:
                regular movement, strength that lets you do what you want, and endurance so you don't get 
                winded climbing stairs. Here are the different types of fitness and why each matters.
              </p>
            </div>

            {/* WORKOUT TYPES */}
            <div className="ph-workout-types">
              {Object.entries(workoutTypes).map(([key, type]) => (
                <div key={key} className="ph-workout-type-card">
                  <div className="ph-workout-type-header">
                    <span className="ph-workout-icon">{type.icon}</span>
                    <h3>{type.name}</h3>
                  </div>
                  
                  <p className="ph-workout-description">{type.why}</p>

                  <div className="ph-workout-details">
                    <div className="ph-detail-item">
                      <strong>How often:</strong>
                      <span>{type.frequency}</span>
                    </div>
                    <div className="ph-detail-item">
                      <strong>Duration:</strong>
                      <span>{type.duration}</span>
                    </div>
                  </div>

                  <div className="ph-benefits-box">
                    <strong>Benefits:</strong>
                    <ul>
                      {type.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ph-examples-box">
                    <strong>Try these:</strong>
                    <div className="ph-example-tags">
                      {type.examples.map((ex, i) => (
                        <span key={i} className="ph-example-tag">{ex}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WEEKLY SCHEDULE */}
            <div className="ph-weekly-schedule">
              <h3>A Realistic Weekly Schedule</h3>
              <p>You don't need to do everything every day. Here's a balanced approach:</p>
              
              <div className="ph-schedule-grid">
                <div className="ph-schedule-day">
                  <h4>Monday</h4>
                  <p>Strength training (30-45 min)</p>
                </div>
                <div className="ph-schedule-day">
                  <h4>Tuesday</h4>
                  <p>Cardio (20-30 min)</p>
                </div>
                <div className="ph-schedule-day">
                  <h4>Wednesday</h4>
                  <p>Rest or yoga (15-20 min)</p>
                </div>
                <div className="ph-schedule-day">
                  <h4>Thursday</h4>
                  <p>Strength training (30-45 min)</p>
                </div>
                <div className="ph-schedule-day">
                  <h4>Friday</h4>
                  <p>Cardio or sports (30-45 min)</p>
                </div>
                <div className="ph-schedule-day">
                  <h4>Saturday</h4>
                  <p>Team sport or fun activity (45-90 min)</p>
                </div>
                <div className="ph-schedule-day rest">
                  <h4>Sunday</h4>
                  <p>Rest day (or light walk)</p>
                </div>
              </div>

              <div className="ph-schedule-note">
                💡 <strong>This is flexible.</strong> Skip a day? No problem. Did 2 workouts instead of 1? Great. 
                The goal is consistency, not perfection. Starting with 3 days/week and building up is totally valid.
              </div>
            </div>

            {/* FORM TRACKER */}
            <div className="ph-fitness-tracker">
              <h3>Track Your Workouts</h3>
              <div className="ph-tracker-form">
                <div className="ph-form-group">
                  <label>What did you do?</label>
                  <input
                    type="text"
                    placeholder="e.g., went for a run, did yoga, played soccer"
                    className="metabolic-input-field"
                  />
                </div>
                <div className="ph-form-group">
                  <label>How long? (minutes)</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="metabolic-input-field"
                  />
                </div>
                <div className="ph-form-group">
                  <label>How did you feel after?</label>
                  <select className="metabolic-input-field">
                    <option>-- Select --</option>
                    <option>Exhausted (did hard work!)</option>
                    <option>Good energy</option>
                    <option>Pumped/energized</option>
                    <option>Calm & relaxed</option>
                  </select>
                </div>
                <button className="primary-btn">Log Workout</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SLEEP SCIENCE */}
        {activeTab === "sleep" && (
          <div className="ph-tab-content animate-fade-in">
            <div className="ph-intro-card">
              <h2>Sleep: The Superpower You're Probably Not Getting</h2>
              <p>
                Sleep is when your brain consolidates memories, your muscles repair, 
                hormones rebalance, and your immune system rebuilds. It's not lazy—it's essential. 
                Teens naturally need 8-10 hours. Most get 6-7. That deficit adds up FAST.
              </p>
            </div>

            {/* SLEEP STAGES */}
            <div className="ph-sleep-stages">
              {sleepStages.map((stage, idx) => (
                <div key={idx} className="ph-sleep-stage-card">
                  <div className="ph-sleep-stage-header">
                    <h3>{stage.stage}</h3>
                    <span className="ph-sleep-duration">{stage.duration}</span>
                  </div>
                  <div className="ph-sleep-section">
                    <strong>What happens:</strong>
                    <p>{stage.what}</p>
                  </div>
                  <div className="ph-sleep-section">
                    <strong>Why it matters:</strong>
                    <p>{stage.importance}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* TEEN SLEEP FACTS */}
            <div className="ph-sleep-facts">
              <h3>The Teen Sleep Crisis (And What's Actually Happening)</h3>
              <div className="ph-facts-grid">
                <div className="ph-fact-card">
                  <h4>Your brain wants to sleep LATER</h4>
                  <p>
                    It's not laziness. At puberty, your circadian rhythm shifts (delayed sleep phase). 
                    You naturally want to sleep at 11pm instead of 9pm. This is BIOLOGICAL, not character.
                  </p>
                </div>
                <div className="ph-fact-card">
                  <h4>School starts too early</h4>
                  <p>
                    Most schools start at 7-8am. Your brain is most alert at 10am. Starting school early = 
                    forcing you to function before your brain wakes up. It's not your fault you're tired.
                  </p>
                </div>
                <div className="ph-fact-card">
                  <h4>One all-nighter undoes weeks</h4>
                  <p>
                    Miss one night of sleep = cognitive function drops 30-40%. It takes 3-4 days of 8-9 hour 
                    nights to recover. Cramming = shooting yourself in the foot.
                  </p>
                </div>
                <div className="ph-fact-card">
                  <h4>Sleep debt is real</h4>
                  <p>
                    Missing 1 hour per night for a week = 7 hours of sleep debt. Your body NEEDS to pay it back. 
                    You can't "catch up" on weekends—you need consistent sleep.
                  </p>
                </div>
              </div>
            </div>

            {/* SLEEP CALCULATOR */}
            <div className="ph-sleep-tracking">
              <h3>Calculate Your Sleep Cycles</h3>
              <p className="ph-sleep-note">
                A healthy night = 4-6 full sleep cycles (90 min each). Find out how many you're getting:
              </p>
              <div className="ph-sleep-input-section">
                <div className="ph-form-group">
                  <label>Bedtime</label>
                  <input
                    type="time"
                    value={sleepLog.bedTime}
                    onChange={(e) => handleSleepChange("bedTime", e.target.value)}
                    className="metabolic-input-field"
                  />
                </div>
                <div className="ph-form-group">
                  <label>Wake time</label>
                  <input
                    type="time"
                    value={sleepLog.wakeTime}
                    onChange={(e) => handleSleepChange("wakeTime", e.target.value)}
                    className="metabolic-input-field"
                  />
                </div>
              </div>

              {sleepHours > 0 && (
                <div className="ph-sleep-result">
                  <h4>Last Night's Sleep</h4>
                  <div className="ph-sleep-stats">
                    <div className="ph-stat-box">
                      <div className="ph-stat-number">{sleepHours}</div>
                      <div className="ph-stat-label">Hours</div>
                    </div>
                    <div className="ph-stat-box">
                      <div className="ph-stat-number">{Math.floor(sleepHours / 1.5)}</div>
                      <div className="ph-stat-label">Sleep Cycles</div>
                    </div>
                  </div>
                  <div className="ph-sleep-recommendation">
                    {sleepHours >= 8 && sleepHours <= 10 ? (
                      <p>✅ <strong>Perfect!</strong> You hit the teen sleep sweet spot (8-10 hours).</p>
                    ) : sleepHours < 8 ? (
                      <p>⚠️ <strong>Sleep debt alert.</strong> You're under the recommended 8-10 hours. Aim for more tomorrow.</p>
                    ) : (
                      <p>✅ <strong>Excellent recovery.</strong> Your body is getting serious repair time.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* SLEEP HACKS */}
            <div className="ph-sleep-hacks">
              <h3>Actually Effective Sleep Hacks</h3>
              <div className="ph-hacks-grid">
                <div className="ph-hack-card">
                  <h4>💡 Morning Light</h4>
                  <p>Get bright light (sunlight) within 30 min of waking. Syncs your circadian rhythm. Earlier light = earlier bedtime = better sleep.</p>
                </div>
                <div className="ph-hack-card">
                  <h4>📵 No Screens 90 Min Before Bed</h4>
                  <p>Blue light suppresses melatonin. Phone = alert mode. Read, journal, chat instead. Sounds hard but = 1-2 hours better sleep.</p>
                </div>
                <div className="ph-hack-card">
                  <h4>🌡️ Cool Room</h4>
                  <p>Sleep happens in cool environments (60-67°F). Your core body temp needs to drop. Cold room = falling asleep faster.</p>
                </div>
                <div className="ph-hack-card">
                  <h4>🚫 No Caffeine After 2pm</h4>
                  <p>Caffeine has a 5-6 hour half-life. Afternoon coffee = still in your system at midnight. Cut off early.</p>
                </div>
                <div className="ph-hack-card">
                  <h4>🧘 Consistent Schedule</h4>
                  <p>Same bedtime + wake time every day (even weekends). Your body adapts. Consistency &gt; sleeping in.</p>
                </div>
                <div className="ph-hack-card">
                  <h4>⏰ Set a Bedtime Alarm</h4>
                  <p>Not just wake-up alarm. Alarm for 30 min before bed to START winding down. Sounds weird but works.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NUTRITION */}
        {activeTab === "nutrition" && (
          <div className="ph-tab-content animate-fade-in">
            <div className="ph-intro-card">
              <h2>Nutrition for Teens: Fuel Your Body (Not a Diet)</h2>
              <p>
                This isn't about "eating clean" or restricting. It's about eating foods that give you energy, 
                focus, and feel good. Your body is still growing—it needs proper fuel. Here's what actually matters:
              </p>
            </div>

            {/* MACRONUTRIENTS */}
            <div className="ph-nutrition-macros">
              {nutritionTips.map((tip, idx) => (
                <div key={idx} className="ph-macro-card">
                  <h3>{tip.category}</h3>
                  <p className="ph-macro-amount"><strong>Target:</strong> {tip.amount}</p>
                  <p className="ph-macro-why">{tip.why}</p>
                  
                  <div className="ph-macro-sources">
                    <strong>Good sources:</strong>
                    <div className="ph-source-tags">
                      {tip.sources.map((source, i) => (
                        <span key={i} className="ph-source-tag">{source}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ph-macro-tip">
                    <strong>💡 Tip:</strong> {tip.tip}
                  </div>
                </div>
              ))}
            </div>

            {/* MEAL IDEAS */}
            <div className="ph-meal-ideas">
              <h3>Actual Meal Ideas (Not Boring)</h3>
              <div className="ph-meals-grid">
                <div className="ph-meal-card">
                  <h4>Breakfast</h4>
                  <ul>
                    <li>Scrambled eggs + toast + avocado</li>
                    <li>Greek yogurt + granola + berries</li>
                    <li>Oatmeal + peanut butter + banana</li>
                    <li>Breakfast sandwich: egg + cheese + bread</li>
                    <li>Smoothie: banana + peanut butter + milk + oats</li>
                  </ul>
                </div>
                <div className="ph-meal-card">
                  <h4>Lunch</h4>
                  <ul>
                    <li>Chicken sandwich + veggies + fruit</li>
                    <li>Pasta with marinara + ground meat + salad</li>
                    <li>Rice bowl: rice + beans + chicken + veggies</li>
                    <li>Tuna salad + whole wheat bread</li>
                    <li>Pizza (yes, pizza) + side salad</li>
                  </ul>
                </div>
                <div className="ph-meal-card">
                  <h4>Snacks</h4>
                  <ul>
                    <li>Apple + peanut butter</li>
                    <li>String cheese + crackers</li>
                    <li>Nuts + dried fruit</li>
                    <li>Yogurt + granola</li>
                    <li>Banana + chocolate</li>
                  </ul>
                </div>
                <div className="ph-meal-card">
                  <h4>Dinner</h4>
                  <ul>
                    <li>Grilled chicken + sweet potato + broccoli</li>
                    <li>Tacos: ground beef/turkey + tortillas + toppings</li>
                    <li>Pasta + meat sauce + garlic bread + veggies</li>
                    <li>Fish + rice + asparagus</li>
                    <li>Chili with beans + cornbread</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* HYDRATION */}
            <div className="ph-hydration-section">
              <h3>Hydration: The Easiest Win</h3>
              <div className="ph-hydration-content">
                <p>
                  <strong>Most teens are dehydrated.</strong> Even mild dehydration (2%) = reduced strength, slower thinking, headaches, bad mood.
                </p>
                <div className="ph-hydration-facts">
                  <div className="ph-hydration-fact">
                    <strong>How much:</strong> Half your body weight in oz. (150 lb = 75 oz = ~9 cups/day)
                  </div>
                  <div className="ph-hydration-fact">
                    <strong>When:</strong> Drink throughout the day. By the time you're thirsty, you're already dehydrated.
                  </div>
                  <div className="ph-hydration-fact">
                    <strong>What counts:</strong> Water, tea, milk, juice, fruits (watermelon is 90% water!)
                  </div>
                  <div className="ph-hydration-fact">
                    <strong>The fix:</strong> Drink water with every meal. Carry a bottle. Drink more if you exercise.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMON ISSUES */}
        {activeTab === "health-issues" && (
          <div className="ph-tab-content animate-fade-in">
            <div className="ph-intro-card">
              <h2>Real Teen Health Issues (And How to Fix Them)</h2>
              <p>
                Here are the most common wellness problems teens face and the actual solutions 
                (not the Instagram fitness nonsense).
              </p>
            </div>

            <div className="ph-issues-list">
              {teenHealthIssues.map((item, idx) => (
                <div key={idx} className="ph-issue-card">
                  <div className="ph-issue-number">{idx + 1}</div>
                  <div className="ph-issue-content">
                    <h3>{item.issue}</h3>
                    
                    <div className="ph-issue-section">
                      <strong>🚨 The Problem:</strong>
                      <p>{item.problem}</p>
                    </div>

                    <div className="ph-issue-section">
                      <strong>✅ The Solution:</strong>
                      <p>{item.solution}</p>
                    </div>

                    <div className="ph-issue-section impact">
                      <strong>⚡ Why It Matters:</strong>
                      <p>{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MENTAL HEALTH CONNECTION */}
        {activeTab === "mental" && (
          <div className="ph-tab-content animate-fade-in">
            <div className="ph-intro-card">
              <h2>Physical Health & Mental Health: They're Connected</h2>
              <p>
                Your physical wellness directly affects your mental health. Moving your body isn't "extra"—
                it's medicine. Here's the science:
              </p>
            </div>

            <div className="ph-mental-grid">
              {mentalHealthConnection.map((item, idx) => (
                <div key={idx} className="ph-mental-card">
                  <h3>{item.topic}</h3>
                  
                  <div className="ph-mental-section">
                    <strong>The Science:</strong>
                    <p>{item.science}</p>
                  </div>

                  <div className="ph-mental-section reality">
                    <strong>In Real Life:</strong>
                    <p>{item.reality}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WHEN TO SEEK HELP */}
            <div className="ph-help-section">
              <h3>⚠️ When to Talk to Someone</h3>
              <div className="ph-help-content">
                <p>
                  Physical wellness is important, but some things need professional help. Talk to a doctor, 
                  counselor, or trusted adult if:
                </p>
                <ul className="ph-help-list">
                  <li>You consistently feel sad, anxious, or hopeless (more than just a bad day)</li>
                  <li>You're having thoughts of harming yourself</li>
                  <li>You're exercising compulsively or restricting food to unhealthy levels</li>
                  <li>You have persistent pain or injuries that don't heal</li>
                  <li>You're struggling with sleep despite trying these tips</li>
                  <li>You feel disconnected from your body or have body image issues</li>
                </ul>
                <p className="ph-help-note">
                  These are signs you need support. Physical wellness helps, but it's not a replacement for mental health care.
                </p>
              </div>
            </div>

            {/* KEY TAKEAWAYS */}
            <div className="ph-key-takeaways-section">
              <h3>Bottom Line</h3>
              <div className="ph-takeaway-list">
                <div className="ph-takeaway-item">
                  <strong>1. Move your body most days.</strong> Not for looks—for energy, focus, and mood.
                </div>
                <div className="ph-takeaway-item">
                  <strong>2. Prioritize sleep.</strong> 8-10 hours is non-negotiable. It's when the magic happens.
                </div>
                <div className="ph-takeaway-item">
                  <strong>3. Eat real food.</strong> Protein + whole grains + fat + water. Your body knows what to do with it.
                </div>
                <div className="ph-takeaway-item">
                  <strong>4. Listen to your body.</strong> Pain, fatigue, and mood are signals. Don't ignore them.
                </div>
                <div className="ph-takeaway-item">
                  <strong>5. Make it social.</strong> Team sports or moving with friends = you'll actually stick with it.
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 SheCARE Bio-Education Ecosystem. All Rights Reserved.</p>
          <p className="credits">
            All information reviewed by health professionals & sports scientists. 
            <strong> Talk to your doctor before major changes.</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PhysicalHealth;