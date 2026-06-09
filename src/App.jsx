import "./App.css";
import logo from "./assets/image.png";
function App() {
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
          <h3> Period Education</h3>
          <p>
            Learn about menstrual health and cycle awareness.
          </p>
        </div>

        <div className="card">
          <h3> Myths vs Facts</h3>
          <p>
            Bust common misconceptions about health and hygiene.
          </p>
        </div>

        <div className="card">
          <h3> Mental Wellness</h3>
          <p>
            Learn about stress, anxiety, confidence and self-care.
          </p>
        </div>

      </section>
    </div>
  );
}

export default App;