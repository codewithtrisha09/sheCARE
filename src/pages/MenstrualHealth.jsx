import "./MenstrualHealth.css";

function MenstrualHealth() {
  return (
    <div className="menstrual-page">

      {/* HERO */}
      <div className="mh-hero">
        <h1>Menstrual Health</h1>
        <p>Understanding your body, cycle, and well-being 💗</p>
      </div>

      {/* WHAT IS IT */}
      <div className="mh-card">
        <h2>What is Menstruation?</h2>
        <p>
          Menstruation, commonly known as a period, is a natural biological process
          in which the uterus sheds its lining every month. It is a key part of the
          reproductive cycle and usually begins during puberty.
        </p>
      </div>

      {/* MENSTRUAL CYCLE */}
      <div className="mh-card">
        <h2>The Menstrual Cycle</h2>
        <p>
          A menstrual cycle typically lasts between 21–35 days. It is divided into four phases:
        </p>

        <div className="phase-grid">
          <div className="phase">
            <h3>Menstrual Phase</h3>
            <p>Bleeding occurs as the uterine lining sheds (3–7 days).</p>
          </div>

          <div className="phase">
            <h3>Follicular Phase</h3>
            <p>The body prepares an egg and estrogen levels rise.</p>
          </div>

          <div className="phase">
            <h3>Ovulation</h3>
            <p>An egg is released — this is the most fertile phase.</p>
          </div>

          <div className="phase">
            <h3>Luteal Phase</h3>
            <p>Hormones prepare the uterus for pregnancy or next cycle.</p>
          </div>
        </div>
      </div>

      {/* SYMPTOMS */}
      <div className="mh-card">
        <h2>Common Symptoms</h2>
        <ul>
          <li>Abdominal cramps</li>
          <li>Mood swings</li>
          <li>Bloating</li>
          <li>Fatigue</li>
          <li>Headaches</li>
          <li>Back pain</li>
          <li>Acne breakouts</li>
        </ul>
      </div>

      {/* HORMONAL CHANGES */}
      <div className="mh-card">
        <h2>What Happens in Your Body?</h2>
        <p>
          Hormones like estrogen and progesterone rise and fall during the cycle.
          These changes affect mood, energy levels, skin, and even sleep patterns.
          Understanding this helps you track your body better and reduce stress.
        </p>
      </div>

      {/* HYGIENE */}
      <div className="mh-card">
        <h2>Period Hygiene Tips</h2>
        <ul>
          <li>Change pads or tampons every 4–6 hours</li>
          <li>Maintain daily intimate hygiene</li>
          <li>Use comfortable and breathable clothing</li>
          <li>Stay hydrated</li>
          <li>Take warm baths for cramps relief</li>
        </ul>
      </div>

      {/* FOOD */}
      <div className="mh-card">
        <h2>What to Eat During Periods</h2>
        <ul>
          <li>Iron-rich foods (spinach, jaggery, beans)</li>
          <li>Fruits like bananas and oranges</li>
          <li>Warm soups and herbal teas</li>
          <li>Dark chocolate (helps mood!)</li>
        </ul>
      </div>

      {/* WHEN TO SEE DOCTOR */}
      <div className="mh-card">
        <h2>When to See a Doctor</h2>
        <ul>
          <li>Severe pain that affects daily life</li>
          <li>Very irregular cycles</li>
          <li>Excessive bleeding</li>
          <li>Periods missing for several months</li>
        </ul>
      </div>

    </div>
  );
}

export default MenstrualHealth;