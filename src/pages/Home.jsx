import logo from "../assets/image.png";

function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="SheCARE Logo" className="logo" />
          <h2>SheCARE</h2>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Empowering Young Women Through Trusted Health Education
        </h1>

        <p>
          SheCARE is a safe and inclusive platform dedicated to
          improving health awareness among adolescent girls.
        </p>
      </section>
    </div>
  );
}

export default Home;