import { useState } from "react";
import { Link } from "react-router-dom";
import "./MythVsFact.css";

function MythVsFact() {
  const [expandedMyth, setExpandedMyth] = useState(null);
  const [activeCategory, setActiveCategory] = useState("periods");

  const mythCategories = {
    periods: {
      name: "Period Myths",
      icon: "🩸",
      color: "myth-pink",
      myths: [
        {
          id: "period-1",
          myth: "You can't get pregnant on your period",
          fact: "False. While less likely, pregnancy CAN happen if you have unprotected sex during your period, especially if you have a shorter cycle. Sperm can survive 5 days in your reproductive tract.",
          science: "Ovulation is unpredictable in some people. If your cycle is 21 days and you bleed for 5-7 days, ovulation could happen while you're still bleeding. It's rare but 100% possible.",
          sources: ["American College of Obstetricians & Gynecologists", "Journal of Contraception"],
          tip: "Use protection every time if you're not trying to get pregnant. Period or not.",
        },
        {
          id: "period-2",
          myth: "Period blood is toxic/dirty",
          fact: "Nope. Period blood is just endometrial tissue (uterine lining) + blood + cervical mucus. It's no different than blood elsewhere in your body.",
          science: "The stigma comes from old religious ideas that periods made women 'unclean.' Scientifically? Your period blood is literally part of your body's natural cycle. Nothing toxic about it.",
          sources: ["Medical Anthropology Quarterly", "History of Menstruation Studies"],
          tip: "This myth has caused tons of shame. Your period is not gross—it's biology.",
        },
        {
          id: "period-3",
          myth: "You should avoid swimming/exercise during your period",
          fact: "False. You can exercise, swim, play sports—everything. Actually, light exercise can reduce cramps.",
          science: "Water doesn't wash out your uterus (the vagina is a one-way valve). Tampons/pads work underwater. Exercise increases blood flow and endorphins, which can ease period pain.",
          sources: ["American Medical Association", "Sports Medicine Journal"],
          tip: "Do whatever feels good. If you want to rest? Also valid. Listen to your body.",
        },
        {
          id: "period-4",
          myth: "All periods are 28 days long",
          fact: "No. Cycle length ranges from 21-35 days. 28 is just an AVERAGE. Your cycle might be totally different from your friend's.",
          science: "Every person's hormones are unique. Tracking YOUR cycle matters way more than comparing to the 'standard.'",
          sources: ["American College of Obstetricians & Gynecologists", "JAMA"],
          tip: "Apps like Clue track YOUR actual cycle so you know what's normal for YOU.",
        },
        {
          id: "period-5",
          myth: "Period pain (cramps) is just something to deal with",
          fact: "Heavy period pain can indicate underlying issues (PCOS, endometriosis, fibroids). If it's severe, get it checked.",
          science: "Mild cramping = normal (uterus contracting to shed lining). Severe pain = sign something else is happening. Don't ignore it.",
          sources: ["ACOG", "Endometriosis Association"],
          tip: "Severe pain isn't normal. Talk to a doctor if ibuprofen doesn't help.",
        },
        {
          id: "period-6",
          myth: "PMS is all in your head",
          fact: "PMS is 100% real and hormonal. Estrogen and progesterone drops trigger serotonin dips = mood changes, bloating, fatigue.",
          science: "Brain imaging shows PMDD (severe PMS) = measurable changes in serotonin sensitivity. This is biochemistry, not emotions.",
          sources: ["Nature Neuroscience", "American Psychiatric Association"],
          tip: "Tracking symptoms helps you prepare (extra sleep, movement, comfort). It's not weakness.",
        },
      ],
    },

    reproductive: {
      name: "Reproductive Health",
      icon: "🩺",
      color: "myth-purple",
      myths: [
        {
          id: "repro-1",
          myth: "Using tampons makes you lose your virginity",
          fact: "No. Virginity is a social construct. The hymen is not a 'virginity seal'—it's a stretchy tissue that can tear from exercise, medical exams, or just existing.",
          science: "Hymens naturally stretch and change over time. They don't 'break' like a cherry. This myth has been used to control women's bodies for centuries.",
          sources: ["American College of Obstetricians & Gynecologists", "The Hymen FAQ"],
          tip: "Your virginity status has nothing to do with your hymen. Use what period products feel comfortable.",
        },
        {
          id: "repro-2",
          myth: "The pill makes you infertile",
          fact: "False. You can get pregnant right after stopping the pill. Fertility returns immediately.",
          science: "The pill works by preventing ovulation temporarily. When you stop, your cycle restarts. There's no permanent damage.",
          sources: ["WHO", "Cochrane Reviews on Contraception"],
          tip: "The pill is reversible. However, it can take 2-3 months for regular cycles to return.",
        },
        {
          id: "repro-3",
          myth: "An IUD will get lost inside you",
          fact: "No. An IUD stays in your uterus. It has a string that hangs down into the vaginal canal—your doctor can always retrieve it.",
          science: "The cervix is small and only opens during menstruation and birth. The IUD can't 'float away' into your body.",
          sources: ["American College of Obstetricians & Gynecologists", "Contraceptive Technology"],
          tip: "You can check the string yourself. It's a normal part of IUD use.",
        },
        {
          id: "repro-4",
          myth: "Douching cleans your vagina",
          fact: "Douching is unnecessary and actually harmful. Your vagina is self-cleaning.",
          science: "Douching disrupts the vaginal microbiome, increasing risk of infections, BV, and pelvic inflammatory disease. The vagina naturally has the right pH balance.",
          sources: ["American College of Obstetricians & Gynecologists", "NIH"],
          tip: "Wash the outside (vulva) with water. Your vagina does the rest. Douching = not needed + risky.",
        },
        {
          id: "repro-5",
          myth: "Having multiple sexual partners damages your vagina",
          fact: "False. Sexual activity doesn't change the shape or size of your vagina.",
          science: "The vagina is elastic tissue. It doesn't 'stretch out' permanently from sex. It returns to its baseline size.",
          sources: ["OBGYN Magazine", "Sex Medicine Reviews"],
          tip: "Your body is not a commodity. More partners ≠ less worthy. Do what feels right for YOU.",
        },
        {
          id: "repro-6",
          myth: "You need to 'prepare' your vagina for sex",
          fact: "No special prep needed. Regular hygiene (wash with water) is enough. Everything else is marketing.",
          science: "Douches, sprays, and 'vaginal tightening' products are scams that disrupt your natural bacteria. Your vagina is perfect as is.",
          sources: ["ACOG", "Consumer Reports on Feminine Products"],
          tip: "Companies make BILLIONS off women's insecurity about their bodies. Don't buy the shame.",
        },
      ],
    },

    hormones: {
      name: "Hormones & Metabolism",
      icon: "⚗️",
      color: "myth-blue",
      myths: [
        {
          id: "hormone-1",
          myth: "Hormones make you crazy during your period",
          fact: "Hormones cause mood changes, but 'crazy' is stigmatizing language. Hormonal mood shifts are real and manageable, not a character flaw.",
          science: "Estrogen and progesterone drops → serotonin dips → irritability, sadness, anxiety. It's chemistry, not dramatics.",
          sources: ["JAMA Psychiatry", "Psychoneuroendocrinology"],
          tip: "If mood impacts daily life (work, school, relationships), track it + talk to a doctor. PMDD medication exists.",
        },
        {
          id: "hormone-2",
          myth: "Carbs make you fat, especially around your period",
          fact: "Carbs don't make you fat. Calorie surplus does. Before your period, you might crave carbs because progesterone raises metabolism.",
          science: "Your body NEEDS carbs for energy and serotonin. Before your period, actual calorie needs go UP by ~100-200 calories. Eat them.",
          sources: ["American Journal of Clinical Nutrition", "Appetite Journal"],
          tip: "Restrictive dieting during hormonal cycles = less energy, worse mood, lower performance. Eat normally.",
        },
        {
          id: "hormone-3",
          myth: "Testosterone is just a 'male hormone'",
          fact: "Women have testosterone too (way less, but it matters). It affects muscle, bone, libido, mood, and cognition.",
          science: "Testosterone peaks around ovulation. Low testosterone = low energy, brain fog, low libido. It's not just for men.",
          sources: ["Hormones & Behavior", "American Journal of Physiology"],
          tip: "If you feel constantly depleted, low libido, or weak—talk to a doc. Hormone imbalances are real.",
        },
        {
          id: "hormone-4",
          myth: "You'll gain weight on the pill",
          fact: "The pill doesn't cause weight gain directly, but it can increase hunger/water retention for some people.",
          science: "Estrogen in pills can increase appetite + fluid retention (not actual fat gain). Different pills have different doses.",
          sources: ["Cochrane Systematic Review", "Contraception Journal"],
          tip: "If a pill wrecks your hunger, ask your doctor for a different formulation. There are options.",
        },
        {
          id: "hormone-5",
          myth: "Irregular periods are always a problem",
          fact: "Irregular periods are common, especially in teens. Not every irregularity = bad, but some need investigation.",
          science: "Hormonal birth control, PCOS, thyroid issues, extreme exercise, low body weight, stress—all cause irregularity. Track patterns.",
          sources: ["ACOG", "Endocrine Society"],
          tip: "Track 3-6 months of data. If cycles are very irregular or skipped, see a doctor.",
        },
        {
          id: "hormone-6",
          myth: "Birth control gives you cancer",
          fact: "Hormonal birth control carries a tiny increased risk of breast/cervical cancer (which decreases after stopping) BUT decreases risk of ovarian/endometrial cancer.",
          science: "Absolute risk is still low. Your individual risk factors matter more. Talk to your doctor about YOUR risk.",
          sources: ["WHO Cancer Research", "Lancet"],
          tip: "No birth control is risk-free, but BC benefits often outweigh risks. Discuss with your doctor.",
        },
      ],
    },

    body: {
      name: "Body Image & Health",
      icon: "💪",
      color: "myth-green",
      myths: [
        {
          id: "body-1",
          myth: "You need to look a certain way to be healthy",
          fact: "False. Health spans a range of body sizes. You can be fat and healthy. You can be thin and unhealthy.",
          science: "Metabolic health (blood sugar, cholesterol, blood pressure) matters more than BMI. Some larger people have better metabolic markers than thin people.",
          sources: ["Journal of Obesity", "Health at Every Size research"],
          tip: "Focus on how you FEEL (energy, strength, mood) not just how you look.",
        },
        {
          id: "body-2",
          myth: "You shouldn't eat carbs/sugar/fat",
          fact: "All macronutrients are essential. Carbs = brain fuel. Fat = hormone production. Protein = muscle/repair.",
          science: "Completely eliminating any macronutrient = malnutrition. Restrictive eating = worse hormonal health, mood, energy.",
          sources: ["American Academy of Nutrition & Dietetics", "Journal of the Academy of Nutrition"],
          tip: "Balanced eating = all foods. Yes, pizza and ice cream included. Life is short.",
        },
        {
          id: "body-3",
          myth: "Exercise = weight loss (only)",
          fact: "Exercise builds muscle, improves mood, strengthens bones, boosts metabolism—weight loss is just one possible outcome.",
          science: "Muscle weighs more than fat. You might lose inches but gain weight. Scale ≠ health. Performance > appearance.",
          sources: ["Sports Medicine Reviews", "Medicine & Science in Sports & Exercise"],
          tip: "How you FEEL is the metric. Can you do more pushups? Run longer? That's real progress.",
        },
        {
          id: "body-4",
          myth: "Cellulite is ugly/something to fix",
          fact: "Cellulite is just how fat sits under skin. 80% of women have it. It's not a flaw—it's normal anatomy.",
          science: "Cellulite isn't preventable (genetics) and expensive treatments barely work. The 'problem' is marketing, not your body.",
          sources: ["Dermatology Journal", "Cosmetic Surgery Studies"],
          tip: "Your cellulite is not your enemy. The beauty industry profits from you thinking it is.",
        },
        {
          id: "body-5",
          myth: "You need to 'earn' food through exercise",
          fact: "Food fuels your body. You don't need to 'earn' it. This thinking = disordered eating.",
          science: "Food scarcity thinking activates stress hormones = worse metabolism, mood, hormonal health. Eat consistently without guilt.",
          sources: ["National Eating Disorders Association", "Journal of Eating Disorders"],
          tip: "If you're tracking calories/exercise obsessively, that might be a sign of disordered eating. Talk to someone.",
        },
        {
          id: "body-6",
          myth: "Stretch marks/scars are ugly",
          fact: "Stretch marks = your body adapted and grew. They're evidence of strength, not flaws.",
          science: "Stretch marks fade over time due to collagen remodeling. They're completely normal (80% of people have them).",
          sources: ["Dermatology Insights", "Skin Science"],
          tip: "Your scars are part of your story. They're not shameful—they're real.",
        },
      ],
    },

    
sex: {
  name: "Relationships & Respect",
  icon: "🤝",
  color: "myth-coral",
  myths: [
    {
      id: "sex-1",
      myth: "Jealousy means someone really loves you",
      fact: "Healthy relationships are built on trust, not jealousy.",
      science: "Excessive jealousy is linked to insecurity and controlling behavior, not stronger love.",
      sources: ["American Psychological Association", "Relationship Research Studies"],
      tip: "If someone constantly checks on you or controls who you talk to, that's a red flag.",
    },
    {
      id: "sex-2",
      myth: "You need a boyfriend/girlfriend to be happy",
      fact: "Your happiness does not depend on being in a relationship.",
      science: "Strong friendships, family support, hobbies, and self-esteem contribute significantly to well-being.",
      sources: ["Journal of Youth Studies", "Positive Psychology Research"],
      tip: "Focus on becoming the best version of yourself instead of chasing relationships.",
    },
    {
      id: "sex-3",
      myth: "Saying 'no' makes you rude",
      fact: "Setting boundaries is healthy and important.",
      science: "People with strong personal boundaries often report healthier relationships and higher self-esteem.",
      sources: ["Mental Health Foundation", "Relationship Psychology"],
      tip: "A respectful person will accept your boundaries without guilt-tripping you.",
    },
    {
      id: "sex-4",
      myth: "If someone loves you, they'll know what you're feeling",
      fact: "Healthy relationships require communication.",
      science: "Clear communication reduces misunderstandings and improves relationship satisfaction.",
      sources: ["Communication Research Reports", "Relationship Science"],
      tip: "Speak up about your feelings instead of expecting others to read your mind.",
    },
    {
      id: "sex-5",
      myth: "Everyone is dating except me",
      fact: "Many teenagers are not in relationships, and that's completely normal.",
      science: "Teens often overestimate how many of their peers are dating due to social media and peer conversations.",
      sources: ["Journal of Adolescent Health", "Youth Development Research"],
      tip: "Never rush into a relationship just because of peer pressure.",
    },
    {
      id: "sex-6",
      myth: "A healthy relationship never has disagreements",
      fact: "Disagreements are normal; respect and communication matter most.",
      science: "Conflict handled respectfully can actually strengthen relationships.",
      sources: ["Gottman Institute", "Relationship Psychology Research"],
      tip: "Focus on solving problems together instead of trying to 'win' arguments.",
    },
  ],
},



mental: {
  name: "Mental Health & Emotions",
  icon: "🧠",
  color: "myth-indigo",
  myths: [
    {
      id: "mental-1",
      myth: "Everyone else has their life together except me",
      fact: "Most people are figuring things out as they go.",
      science: "Social media often shows highlight reels, making others appear happier and more successful than they really are.",
      sources: ["American Psychological Association", "Social Media Research"],
      tip: "Don't compare your behind-the-scenes to someone else's highlight reel.",
    },
    {
      id: "mental-2",
      myth: "Anxiety is just overthinking",
      fact: "Anxiety is a real mental health condition, not a personality flaw.",
      science: "Anxiety affects how the brain processes stress and perceived threats.",
      sources: ["National Institute of Mental Health"],
      tip: "If anxiety is affecting school, sleep, or daily life, talking to someone can help.",
    },
    {
      id: "mental-3",
      myth: "Strong people don't cry",
      fact: "Showing emotions is healthy, not weak.",
      science: "Expressing emotions can reduce stress and improve emotional regulation.",
      sources: ["American Psychological Association"],
      tip: "Crying doesn't make you dramatic—it makes you human.",
    },
    {
      id: "mental-4",
      myth: "If I'm struggling, I should keep it to myself",
      fact: "Asking for help is a sign of strength.",
      science: "Support from trusted people is linked to better mental health outcomes.",
      sources: ["Mental Health Foundation"],
      tip: "Talk to a friend, parent, teacher, counselor, or trusted adult.",
    },
    {
      id: "mental-5",
      myth: "Good grades = good mental health",
      fact: "Someone can be successful and still be struggling emotionally.",
      science: "Mental health challenges can affect anyone regardless of academic performance.",
      sources: ["Journal of Adolescent Health"],
      tip: "Check in on your friends, even the ones who seem to have everything together.",
    },
    {
      id: "mental-6",
      myth: "Being stressed all the time is normal",
      fact: "Constant stress isn't something you should just accept.",
      science: "Chronic stress can affect sleep, focus, mood, and physical health.",
      sources: ["World Health Organization"],
      tip: "Rest is productive too. Your brain needs recovery time.",
    },
    {
      id: "mental-7",
      myth: "Social media is always bad for mental health",
      fact: "It depends on how you use it.",
      science: "Positive online communities can provide support, while excessive comparison can increase stress.",
      sources: ["Pew Research Center"],
      tip: "Curate your feed—unfollow accounts that make you feel worse about yourself.",
    },
    {
      id: "mental-8",
      myth: "I'm the only one who feels lonely",
      fact: "Loneliness is common, especially during the teen years.",
      science: "Many teenagers report periods of loneliness and social uncertainty.",
      sources: ["Youth Mental Health Studies"],
      tip: "Feeling lonely doesn't mean you're unlikeable or broken.",
    },
    {
      id: "mental-9",
      myth: "You have to be positive all the time",
      fact: "It's okay to have bad days.",
      science: "Suppressing negative emotions can increase emotional distress over time.",
      sources: ["Psychological Science"],
      tip: "You don't need to fake being okay 24/7.",
    },
    {
      id: "mental-10",
      myth: "Mental health problems are rare in teens",
      fact: "Many teenagers experience mental health challenges.",
      science: "Mental health concerns are among the most common health issues affecting adolescents.",
      sources: ["WHO", "CDC"],
      tip: "If you're struggling, you're not alone and support is available.",
    },
  ],
},
};


  const toggleMythExpand = (mythId) => {
    setExpandedMyth(expandedMyth === mythId ? null : mythId);
  };

  const currentMythData = mythCategories[activeCategory];

  return (
    <div className="app-viewport">
      {/* BACKGROUND ELEMENTS */}
      <div className="ambient-blur blur-pink" style={{ top: "-50px", left: "-100px" }}></div>
      <div className="ambient-blur blur-purple" style={{ bottom: "300px", right: "-100px" }}></div>

      {/* NAVIGATION */}
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ margin: 0, color: "#f4f2f6" }}>← SheCARE</h2>
        </Link>
        <h3 className="page-title">Myths vs Facts</h3>
      </nav>

      {/* HERO SECTION */}
      <header className="mvf-hero">
        <div className="mvf-badge">Module 1.5 • Myth Busting Archive</div>
        <h1>
          Debunking the <span className="gradient-myth">Myths That Got You Here</span>
        </h1>
        <p>
          Historical nonsense, old wives' tales, Instagram "wellness," and straight-up lies 
          have shaped how women think about their bodies. This is the archive of REAL science debunking 
          the harmful myths that have been circulating for centuries. No cap receipts included.
        </p>
      </header>

      {/* CATEGORY TABS */}
      <section className="mvf-tabs-section">
        <div className="mvf-tab-buttons">
          {Object.entries(mythCategories).map(([key, data]) => (
            <button
              key={key}
              className={`mvf-tab-btn ${activeCategory === key ? "active" : ""}`}
              onClick={() => setActiveCategory(key)}
            >
              <span className="mvf-tab-icon">{data.icon}</span>
              {data.name}
            </button>
          ))}
        </div>

        {/* MYTH CARDS */}
        <div className={`mvf-myth-container ${currentMythData.color}`}>
          <div className="mvf-category-header">
            <h2>{currentMythData.name}</h2>
            <p className="mvf-category-subtitle">Tap any myth to reveal the facts with actual science.</p>
          </div>

          <div className="mvf-myths-list">
            {currentMythData.myths.map((myth) => (
              <div
                key={myth.id}
                className={`mvf-myth-card ${expandedMyth === myth.id ? "expanded" : ""}`}
                onClick={() => toggleMythExpand(myth.id)}
              >
                {/* MYTH HEADER (ALWAYS VISIBLE) */}
                <div className="mvf-myth-header">
                  <div className="mvf-myth-label">MYTH</div>
                  <h3 className="mvf-myth-text">{myth.myth}</h3>
                  <div className="mvf-expand-icon">{expandedMyth === myth.id ? "−" : "+"}</div>
                </div>

                {/* FACT SECTION (EXPANDS) */}
                {expandedMyth === myth.id && (
                  <div className="mvf-fact-section animate-fade-in">
                    <div className="mvf-fact-header">
                      <div className="mvf-fact-label">THE FACTS</div>
                      <p className="mvf-fact-text">{myth.fact}</p>
                    </div>

                    <div className="mvf-science-box">
                      <strong>🔬 The Science:</strong>
                      <p>{myth.science}</p>
                    </div>

                    <div className="mvf-sources-box">
                      <strong>📚 Scientific Sources:</strong>
                      <div className="mvf-source-list">
                        {myth.sources.map((source, idx) => (
                          <span key={idx} className="mvf-source-tag">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mvf-tip-box">
                      <strong>💡 Real Talk:</strong>
                      <p>{myth.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THESE MYTHS EXIST */}
      <section className="mvf-context-section">
        <div className="mvf-context-header">
          <h2>Why Do These Myths Exist?</h2>
          <p>A brief history of how women got gaslit about their own bodies.</p>
        </div>

        <div className="mvf-context-grid">
          <div className="mvf-context-card">
            <h3>🏛️ Religion & Culture</h3>
            <p>
              Many myths come from religious texts written by men to control women. Periods = "unclean," 
              women as sexual objects = natural, women's pleasure = irrelevant. These ideas are thousands of years old.
            </p>
          </div>

          <div className="mvf-context-card">
            <h3>👨‍⚕️ Male-Dominated Medicine</h3>
            <p>
              Until recently, medicine was practiced almost entirely by men. Women's health wasn't studied. 
              Doctors literally believed uteruses caused insanity. That was considered science.
            </p>
          </div>

          <div className="mvf-context-card">
            <h3>💰 Capitalism & Shame</h3>
            <p>
              Companies profit BILLIONS from women's insecurity. Douches, "feminine" products, diet pills, 
              cosmetic surgery. The myths are profitable. Shame = sales.
            </p>
          </div>

          <div className="mvf-context-card">
            <h3>📱 Social Media</h3>
            <p>
              Instagram "wellness" spreads misinformation faster than peer-reviewed research. 
              Influencers with no credentials sell detoxes and "natural" birth control. Not all 'natural' = safe.
            </p>
          </div>
        </div>
      </section>

      {/* RED FLAGS SECTION */}
      <section className="mvf-red-flags-section">
        <h2>🚩 Red Flags: When Someone's Misinforming You</h2>
        <p className="mvf-red-flags-subtitle">
          If a health claim has these markers, it's probably BS:
        </p>

        <div className="mvf-red-flags-grid">
          <div className="mvf-flag-card">
            <h4>No peer-reviewed sources</h4>
            <p>They cite a blog post or Instagram, not published research. Real science = published in journals + reviewed by experts.</p>
          </div>

          <div className="mvf-flag-card">
            <h4>Sells a product</h4>
            <p>
              The person profiting from your belief makes them biased. A doctor prescribing medication IS regulated. 
              An influencer selling a tea cleanse is not.
            </p>
          </div>

          <div className="mvf-flag-card">
            <h4>"Cures" things</h4>
            <p>
              Real medicine treats or manages conditions. Nothing "cures" PCOS or endometriosis yet. 
              Anyone promising a cure is lying.
            </p>
          </div>

          <div className="mvf-flag-card">
            <h4>Shames your body</h4>
            <p>
              Good health info doesn't shame you for existing. If it makes you feel worse about yourself, 
              it's manipulative marketing, not medicine.
            </p>
          </div>

          <div className="mvf-flag-card">
            <h4>All-or-nothing language</h4>
            <p>
              "Never eat carbs" / "All hormones are evil" / "This ingredient is poison." Health is nuanced. 
              Absolute statements usually mean they're oversimplifying for drama.
            </p>
          </div>

          <div className="mvf-flag-card">
            <h4>Targets women specifically</h4>
            <p>
              If a product/claim targets women's insecurities ("fix your cellulite," "get tighter skin"), 
              it's exploitative, not scientific.
            </p>
          </div>
        </div>
      </section>

      {/* CRITICAL THINKING GUIDE */}
      <section className="mvf-critical-thinking">
        <div className="mvf-ct-header">
          <h2>How to Evaluate Health Information</h2>
          <p>Quick checklist before believing anything:</p>
        </div>

        <div className="mvf-ct-steps">
          <div className="mvf-ct-step">
            <div className="mvf-ct-number">1</div>
            <h4>Who said it?</h4>
            <p>Is it a doctor? A researcher? Someone selling something? A random influencer? Credibility matters.</p>
          </div>

          <div className="mvf-ct-step">
            <div className="mvf-ct-number">2</div>
            <h4>What's the evidence?</h4>
            <p>Can they cite peer-reviewed research? Or just anecdotes? One person's story ≠ proof.</p>
          </div>

          <div className="mvf-ct-step">
            <div className="mvf-ct-number">3</div>
            <h4>Could they profit?</h4>
            <p>Do they sell a product? Get sponsorships? Conflict of interest = bias.</p>
          </div>

          <div className="mvf-ct-step">
            <div className="mvf-ct-number">4</div>
            <h4>What do actual experts say?</h4>
            <p>Check ACOG, WHO, NIH, peer-reviewed journals. Not one source—multiple.</p>
          </div>

          <div className="mvf-ct-step">
            <div className="mvf-ct-number">5</div>
            <h4>Does it rely on shame?</h4>
            <p>Real health info educates. Manipulative info shames you into buying something.</p>
          </div>

          <div className="mvf-ct-step">
            <div className="mvf-ct-number">6</div>
            <h4>What would a doctor say?</h4>
            <p>When in doubt, ask a doctor. Real ones answer questions without judgment.</p>
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="mvf-resources-section">
        <h2>📚 Trusted Resources for Real Information</h2>
        <p className="mvf-resources-subtitle">Go here for science-backed info (not marketing):</p>

        <div className="mvf-resources-grid">
          <div className="mvf-resource-card">
            <h4>🏥 ACOG (American College of Obstetricians & Gynecologists)</h4>
            <p>The official source for reproductive health information. Written by doctors, peer-reviewed.</p>
          </div>

          <div className="mvf-resource-card">
            <h4>🌍 WHO (World Health Organization)</h4>
            <p>Global health standards and evidence-based recommendations on contraception, pregnancy, sexual health.</p>
          </div>

          <div className="mvf-resource-card">
            <h4>📖 Planned Parenthood</h4>
            <p>Evidence-based info on reproductive health, contraception, STIs, and sexual wellness. No shame.</p>
          </div>

          <div className="mvf-resource-card">
            <h4>🧠 NAMI (National Alliance on Mental Illness)</h4>
            <p>For mental health + cycle information. Combines psychiatry with reproductive health.</p>
          </div>

          <div className="mvf-resource-card">
            <h4>🔬 PubMed (NIH)</h4>
            <p>The actual peer-reviewed research. Search any topic + read abstracts for free.</p>
          </div>

          <div className="mvf-resource-card">
            <h4>📱 Apps: Clue, Period Tracker</h4>
            <p>Track YOUR cycle, backed by research. Clue is designed by scientists + gynecologists.</p>
          </div>
        </div>
      </section>

      {/* KEY TAKEAWAYS */}
      <section className="mvf-takeaways">
        <h2>Bottom Line</h2>
        <div className="mvf-takeaway-list">
          <div className="mvf-takeaway-item">
            <strong>1. Your body is not the problem.</strong> The myths, shame, and stigma are.
          </div>
          <div className="mvf-takeaway-item">
            <strong>2. Science &gt; Instagram.</strong> Peer-reviewed research beats influencer advice every time.
          </div>
          <div className="mvf-takeaway-item">
            <strong>3. If it relies on shame, it's marketing, not medicine.</strong> Real health info empowers you.
          </div>
          <div className="mvf-takeaway-item">
            <strong>4. Your feelings, questions, and body are valid.</strong> Doubt anyone who says otherwise.
          </div>
          <div className="mvf-takeaway-item">
            <strong>5. You deserve accurate info about your own body.</strong> No apologies for asking.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 SheCARE Bio-Education Ecosystem. All Rights Reserved.</p>
          <p className="credits">
            All myths debunked using peer-reviewed research & ACOG guidelines.
            <strong> This is education, not medical advice. Talk to your doctor.</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MythVsFact;