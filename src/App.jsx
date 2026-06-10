import "./App.css";
import logo from "./assets/image.png";

import { Routes, Route, Link } from "react-router-dom";
import MenstrualHealth from "./pages/MenstrualHealth";

function HomePage() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="SheCARE Logo" className="logo" />
          <h2>SheCARE</h2>
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Health</li>
          <li>Myths</li>
          <li>Mental Health</li>
        </ul>
      </nav>

      <section className="hero">
        <h1>
          Empowering Teen Girls With
          Reliable Health Knowledge
        </h1>

        <p>
          A safe educational platform designed for teenagers
          to learn about menstrual health, mental wellbeing,
          nutrition, body changes, and common misconceptions.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Topics
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>Period Education</h3>
          <p>
            Learn about menstrual health and cycle awareness.
          </p>
        </div>

        <div className="card">
          <h3>Myths vs Facts</h3>
          <p>
            Bust common misconceptions about health and hygiene.
          </p>
        </div>

        <div className="card">
          <h3>Mental Wellness</h3>
          <p>
            Learn about stress, anxiety, confidence and self-care.
          </p>
        </div>
      </section>

      <section className="about">
        <h2>Why SheCARE?</h2>
        <p>
          SheCARE aims to make health education accessible,
          reliable, and stigma-free for adolescent girls.
        </p>
      </section>

      <section className="features">
        <h2 className="section-title">Explore Health Topics</h2>

        <div className="topics-grid">

          <Link
            to="/menstrual-health"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card">
              <h3>Menstrual Health</h3>
              <p>
                Learn about the menstrual cycle, period hygiene,
                common symptoms, and healthy self-care practices.
              </p>
            </div>
          </Link>

          <div className="card">
            <h3>Nutrition & Wellness</h3>
            <p>
              Understand balanced nutrition, healthy eating habits,
              and essential nutrients for overall well-being.
            </p>
          </div>

          <div className="card">
            <h3>Mental Health</h3>
            <p>
              Explore stress management, emotional well-being,
              confidence building, and mental resilience.
            </p>
          </div>

          <div className="card">
            <h3>Physical Health</h3>
            <p>
              Learn the importance of exercise, sleep, and healthy
              lifestyle choices during adolescence.
            </p>
          </div>

          <div className="card">
            <h3>Myths vs Facts</h3>
            <p>
              Identify common misconceptions and gain access to
              scientifically accurate health information.
            </p>
          </div>

          <div className="card">
            <h3>Personal Hygiene</h3>
            <p>
              Discover best practices for maintaining personal hygiene
              and preventing common health issues.
            </p>
          </div>

        </div>
      </section>

      <section className="tracker">
        <h2>Period Tracker</h2>

        <p>
          Track menstrual cycles, monitor symptoms, and gain
          better insights into reproductive health.
        </p>

        <button className="primary-btn">
          Start Tracking
        </button>
      </section>

      <section className="quiz">
        <h2>Health Knowledge Assessment</h2>

        <p>
          Test your understanding of important health topics
          through interactive quizzes and learning activities.
        </p>

        <button className="secondary-btn">
          Take Assessment
        </button>
      </section>

      <section className="assistant">
        <h2>SheCARE Assistant</h2>

        <p>
          Access educational resources and receive guidance
          on health and wellness topics.
        </p>

        <button className="primary-btn">
          Learn More
        </button>
      </section>

      <footer className="footer">
        <p>© 2026 SheCARE. All Rights Reserved.</p>
        <p>Built by Trisha Shetty • MIT, Manipal</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/menstrual-health"
        element={<MenstrualHealth />}
      />
    </Routes>
  );
}

export default App;